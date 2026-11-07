import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { useGetProductsQuery } from "../api/commerceApi.js";
import { DEPARTMENTS, departmentBySlug } from "../data/departments.js";
import ProductGrid from "../components/products/ProductGrid.jsx";

export default function ShopPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const department = slug ? departmentBySlug(slug) : null;
  const search = searchParams.get("q") || "";
  const [sort, setSort] = useState(searchParams.get("sort") || "featured");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const queryArgs = useMemo(() => ({
    department: department?.slug,
    search,
    sort,
    page: 1,
    pageSize: 200
  }), [department?.slug, search, sort]);
  const { data, isLoading, isFetching, error } = useGetProductsQuery(queryArgs);
  let products = data?.products || [];

  if (category) products = products.filter((product) => product.category === category);
  if (maxPrice) products = products.filter((product) => product.price <= Number(maxPrice));

  const categories = department
    ? [...new Set((data?.products || []).map((product) => product.category))]
    : [...new Set((data?.products || []).map((product) => product.category))];

  function updateSort(value) {
    setSort(value);
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (value === "featured") next.delete("sort");
      else next.set("sort", value);
      return next;
    });
  }

  const title = department?.name || (search ? `Search results for “${search}”` : "Shop all the good things");

  return (
    <div className="page-container shop-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>{department?.name || "Shop"}</span></div>
      <section className="shop-heading">
        <div>
          <span className="section-eyebrow">{department?.eyebrow || "THE MORROW COLLECTION"}</span>
          <h1>{title}</h1>
          <p>{department?.description || "A considered mix of fresh favourites, home comforts and everyday style."}</p>
        </div>
        {department && <span className={`shop-department-mark mark-${department.accent}`}>{department.name.slice(0, 1)}</span>}
      </section>

      <div className="shop-toolbar">
        <div className="shop-results-count">{isFetching ? "Updating collection..." : `${products.length} finds to explore`}</div>
        <div className="shop-toolbar-actions">
          <button className="filter-toggle" type="button" onClick={() => setFiltersOpen((open) => !open)}><SlidersHorizontal size={15} /> Filters</button>
          <label className="sort-control">Sort by
            <select value={sort} onChange={(event) => updateSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="newest">New arrivals</option>
              <option value="priceLow">Price: low to high</option>
              <option value="priceHigh">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>
      </div>

      <div className={`shop-layout ${filtersOpen ? "filters-visible" : ""}`}>
        <aside className="filter-sidebar">
          <div className="filter-heading"><h3>Refine your edit</h3><button type="button" onClick={() => { setCategory(""); setMaxPrice(""); }}><X size={13} /> Clear</button></div>
          <div className="filter-group">
            <strong>Departments</strong>
            {DEPARTMENTS.map((item) => <Link className={department?.slug === item.slug ? "filter-link active" : "filter-link"} key={item.slug} to={`/category/${item.slug}`}>{item.name}</Link>)}
            <Link className="filter-link" to="/shop">All products</Link>
          </div>
          {categories.length > 1 && <div className="filter-group">
            <strong>Category</strong>
            {categories.map((item) => <label className="filter-option" key={item}><input type="radio" name="category" checked={category === item} onChange={() => setCategory(item)} /> <span>{item.replaceAll("-", " ")}</span></label>)}
          </div>}
          <div className="filter-group">
            <strong>Price range</strong>
            <label className="filter-option"><input type="radio" name="price" checked={maxPrice === ""} onChange={() => setMaxPrice("")} /> Any price</label>
            <label className="filter-option"><input type="radio" name="price" checked={maxPrice === "1000"} onChange={() => setMaxPrice("1000")} /> Under ₹1,000</label>
            <label className="filter-option"><input type="radio" name="price" checked={maxPrice === "2500"} onChange={() => setMaxPrice("2500")} /> Under ₹2,500</label>
            <label className="filter-option"><input type="radio" name="price" checked={maxPrice === "5000"} onChange={() => setMaxPrice("5000")} /> Under ₹5,000</label>
          </div>
        </aside>
        <div className="shop-products">
          {isLoading ? <div className="loading-block"><span className="loader" /> Loading the collection...</div> : (
            <>
              {error && <p className="inline-notice">The product service could not be reached. Local sample products are available where possible.</p>}
              <ProductGrid products={products} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
