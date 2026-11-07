import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products = [] }) {
  if (!products.length) {
    return (
      <div className="empty-products">
        <span>✳</span>
        <h3>Nothing on this shelf just yet</h3>
        <p>Try a different search or clear a filter to see more finds.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
