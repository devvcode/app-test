import { useState } from "react";
import { Heart, Plus, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../features/cart/cartSlice.js";
import { toggleWishlistItem } from "../../features/wishlist/wishlistSlice.js";
import { formatCurrency } from "../../utils/commerce.js";

const departmentEmoji = {
  groceries: "🥬",
  "home-living": "✳",
  fashion: "✦"
};

export default function ProductCard({ product, index = 0 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);
  const saved = useSelector((state) => state.wishlist.items.some((item) => item.id === product.id));
  const hasOptions = Boolean(product.variantOptions?.sizes?.length || product.variantOptions?.colors?.length);
  const image = product.thumbnail || product.images?.[0];
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : product.discountPercentage;

  function addToBag(event) {
    event.preventDefault();
    event.stopPropagation();
    if (hasOptions) {
      navigate(`/product/${product.id}`);
      return;
    }
    dispatch(addItem({ product, quantity: 1 }));
  }

  return (
    <article className="product-card" style={{ "--card-index": index }}>
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`} className="product-image-link" aria-label={`View ${product.title}`}>
          {image && !imageFailed ? (
            <img src={image} alt={product.title} loading="lazy" onError={() => setImageFailed(true)} />
          ) : (
            <span className={`product-placeholder placeholder-${product.department || "home-living"}`}>{departmentEmoji[product.department] || "✦"}</span>
          )}
        </Link>
        {discount > 0 && <span className="discount-tag">-{discount}%</span>}
        {product.isFeatured && <span className="product-editor-tag">THE EDIT</span>}
        <button className={`wishlist-button ${saved ? "is-saved" : ""}`} type="button" onClick={() => dispatch(toggleWishlistItem(product))} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}>
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        <button className="quick-add-button" type="button" onClick={addToBag}>
          {hasOptions ? "Choose options" : <><Plus size={15} /> Add to bag</>}
        </button>
      </div>
      <div className="product-card-info">
        <span className="product-brand">{product.brand || "Morrow Edit"}</span>
        <Link to={`/product/${product.id}`} className="product-title">{product.title}</Link>
        <div className="product-card-bottom">
          <div className="product-prices">
            <strong>{formatCurrency(product.price)}</strong>
            {product.originalPrice > product.price && <del>{formatCurrency(product.originalPrice)}</del>}
          </div>
          {product.rating > 0 && <span className="product-rating"><Star size={12} fill="currentColor" /> {product.rating.toFixed(1)}</span>}
        </div>
      </div>
    </article>
  );
}
