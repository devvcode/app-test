export const DEPARTMENTS = [
  {
    slug: "groceries",
    name: "Groceries",
    eyebrow: "FRESH PICKS FOR EVERY DAY",
    description: "Good things for the pantry, the fridge and everything in between.",
    categories: ["groceries"],
    accent: "sage",
    icon: "shopping-basket"
  },
  {
    slug: "home-living",
    name: "Home & Living",
    eyebrow: "MAKE ROOM FOR GOOD THINGS",
    description: "Small details and useful pieces that make a space feel like yours.",
    categories: ["home-decoration", "furniture", "kitchen-accessories"],
    accent: "clay",
    icon: "house"
  },
  {
    slug: "fashion",
    name: "Fashion",
    eyebrow: "THE EVERYDAY EDIT",
    description: "Easy pieces, thoughtful accessories and outfits worth reaching for.",
    categories: ["womens-dresses", "tops", "mens-shirts", "mens-shoes", "womens-shoes", "womens-bags", "womens-jewellery", "womens-watches", "sunglasses"],
    accent: "rose",
    icon: "shirt"
  }
];

export function departmentForCategory(category) {
  return DEPARTMENTS.find((department) => department.categories.includes(category)) ?? null;
}

export function departmentBySlug(slug) {
  return DEPARTMENTS.find((department) => department.slug === slug) ?? null;
}
