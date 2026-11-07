export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(value || 0));

export function getProductVariant(product, selections = {}) {
  if (!product?.variantOptions) return null;
  return Object.fromEntries(
    Object.entries(selections).filter(([, value]) => Boolean(value))
  );
}

export function getProductDepartmentLabel(product, departments) {
  return departments.find((department) => department.slug === product?.department)?.name || "Everyday finds";
}
