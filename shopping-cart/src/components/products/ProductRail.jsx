import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

export default function ProductRail({ title, eyebrow, products = [], link = "/shop", linkLabel = "Shop the edit" }) {
  if (!products.length) return null;

  return (
    <section className="product-rail-section">
      <div className="section-heading-row">
        <div>
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          <h2 className="section-title">{title}</h2>
        </div>
        <Link className="text-link" to={link}>{linkLabel} <ArrowRight size={15} /></Link>
      </div>
      <div className="product-grid rail-grid">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
