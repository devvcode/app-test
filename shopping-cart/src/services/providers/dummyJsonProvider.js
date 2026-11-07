import { seedProducts } from "../../data/seedProducts.js";
import { DEPARTMENTS, departmentForCategory } from "../../data/departments.js";

const API_ROOT = "https://dummyjson.com";
let cataloguePromise;

function normalizeProduct(raw) {
  const department = departmentForCategory(raw.category);
  if (!department) return null;

  // DummyJSON is fictional sample data with USD-like sample prices. The fixed
  // multiplier only makes a plausible INR-looking prototype price; it is not FX.
  const price = Math.max(29, Math.round(Number(raw.price || 1) * 83));
  const discount = Math.max(0, Number(raw.discountPercentage || 0));
  const fashionCategory = ["womens-dresses", "tops", "mens-shirts"].includes(raw.category);

  return {
    id: String(raw.id),
    title: raw.title || "Untitled product",
    slug: String(raw.title || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    description: raw.description || "",
    category: raw.category,
    categoryName: raw.category.replaceAll("-", " "),
    department: department.slug,
    price,
    originalPrice: discount > 0 ? Math.round(price / (1 - discount / 100)) : price,
    currency: "INR",
    discountPercentage: Math.round(discount),
    images: Array.isArray(raw.images) && raw.images.length ? raw.images : [raw.thumbnail].filter(Boolean),
    thumbnail: raw.thumbnail || raw.images?.[0] || "",
    rating: Number(raw.rating || 0),
    reviewCount: Array.isArray(raw.reviews) ? raw.reviews.length : 0,
    stock: Number(raw.stock ?? 10),
    brand: raw.brand || "Morrow Edit",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    isFeatured: Number(raw.rating || 0) >= 4.7,
    unit: raw.category === "groceries" ? "each" : undefined,
    variantOptions: fashionCategory
      ? { sizes: ["XS", "S", "M", "L", "XL"], colors: ["Ivory", "Sage", "Black"] }
      : null,
    dataSource: "dummyjson"
  };
}

async function loadCatalogue() {
  if (!cataloguePromise) {
    cataloguePromise = fetch(`${API_ROOT}/products?limit=0`)
      .then(async (response) => {
        if (!response.ok) throw new Error(`Product API returned ${response.status}`);
        const payload = await response.json();
        return (payload.products || []).map(normalizeProduct).filter(Boolean);
      })
      .then((products) => products.length ? products : seedProducts)
      .catch((error) => {
        console.warn("DummyJSON unavailable; using local sample products.", error);
        return seedProducts;
      });
  }
  return cataloguePromise;
}

export async function getProducts(params = {}) {
  let products = [...await loadCatalogue()];
  const { department, category, search, minPrice, maxPrice, sort = "featured" } = params;

  if (department) products = products.filter((product) => product.department === department);
  if (category) products = products.filter((product) => product.category === category);
  if (search) {
    const needle = search.trim().toLowerCase();
    products = products.filter((product) =>
      [product.title, product.description, product.brand, product.category].join(" ").toLowerCase().includes(needle)
    );
  }
  if (Number.isFinite(Number(minPrice)) && minPrice !== "" && minPrice != null) {
    products = products.filter((product) => product.price >= Number(minPrice));
  }
  if (Number.isFinite(Number(maxPrice)) && maxPrice !== "" && maxPrice != null) {
    products = products.filter((product) => product.price <= Number(maxPrice));
  }

  const comparators = {
    priceLow: (a, b) => a.price - b.price,
    priceHigh: (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
    newest: (a, b) => String(b.id).localeCompare(String(a.id), undefined, { numeric: true }),
    featured: (a, b) => Number(b.isFeatured) - Number(a.isFeatured) || b.rating - a.rating
  };
  products.sort(comparators[sort] || comparators.featured);

  const total = products.length;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.max(1, Number(params.pageSize) || 24);
  const start = (page - 1) * pageSize;

  return {
    products: products.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
    source: products.some((product) => product.dataSource === "dummyjson") ? "dummyjson" : "seed"
  };
}

export async function getProductById(id) {
  const products = await loadCatalogue();
  const product = products.find((item) => String(item.id) === String(id));
  if (!product) throw new Error("We couldn't find that product.");
  return product;
}

export async function getDepartments() {
  return DEPARTMENTS;
}
