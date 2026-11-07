import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Star, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../api/commerceApi.js";
import { addItem } from "../features/cart/cartSlice.js";
import { toggleWishlistItem } from "../features/wishlist/wishlistSlice.js";
import { formatCurrency } from "../utils/commerce.js";
import ProductRail from "../components/products/ProductRail.jsx";
import { useGetProductsQuery } from "../api/commerceApi.js";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [validation, setValidation] = useState("");
  const saved = useSelector((state) => state.wishlist.items.some((item) => item.id === product?.id));
  const relatedQuery = useGetProductsQuery(
    { department: product?.department, page: 1, pageSize: 5, sort: "featured" },
    { skip: !product?.department }
  );
  const images = product?.images?.length ? product.images : [product?.thumbnail].filter(Boolean);
  const variants = useMemo(() => {
    if (!product?.variantOptions) return null;
    return Object.keys(product.variantOptions).length ? product.variantOptions : null;
  }, [product]);

  function addToCart(buyNow = false) {
    if (!product) return;
    if (variants?.sizes?.length && !size) {
      setValidation("Please choose a size before adding this item.");
      return;
    }
    if (variants?.colors?.length && !color) {
      setValidation("Please choose a colour before adding this item.");
      return;
    }
    const variant = variants ? { ...(size ? { size } : {}), ...(color ? { color } : {}) } : null;
    dispatch(addItem({ product, variant, quantity }));
    setValidation("");
    if (buyNow) navigate("/checkout");
    else navigate("/cart");
  }

  if (isLoading) return <div className="page-container loading-block"><span className="loader" /> Finding this lovely thing...</div>;
  if (error || !product) return <div className="page-container not-found"><h1>We couldn't find that item.</h1><Link className="button button-primary" to="/shop">Back to the shop</Link></div>;

  return (
    <div className="page-container product-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><span>{product.title}</span></div>
      <Link to={`/category/${product.department}`} className="back-link"><ArrowLeft size={14} /> Back to {product.department === "home-living" ? "Home & Living" : product.department}</Link>
      <div className="product-detail-layout">
        <div className="product-gallery">
          <div className="product-main-image">
            {images[activeImage] ? <img src={images[activeImage]} alt={product.title} /> : <span className="product-placeholder">✦</span>}
          </div>
          {images.length > 1 && <div className="product-thumbnails">{images.slice(0, 5).map((image, index) => <button className={activeImage === index ? "active" : ""} key={image} onClick={() => setActiveImage(index)} type="button"><img src={image} alt={`${product.title} view ${index + 1}`} /></button>)}</div>}
        </div>
        <div className="product-detail-info">
          <span className="section-eyebrow">{product.brand || "MORROW EDIT"} · {product.categoryName}</span>
          <h1>{product.title}</h1>
          <div className="detail-rating"><Star size={15} fill="currentColor" /> {product.rating?.toFixed(1) || "New"} <span>·</span> {product.reviewCount || 0} sample reviews</div>
          <div className="detail-price"><strong>{formatCurrency(product.price)}</strong>{product.originalPrice > product.price && <del>{formatCurrency(product.originalPrice)}</del>}</div>
          <p className="detail-description">{product.description}</p>

          {variants?.sizes?.length > 0 && <div className="variant-group"><div className="variant-heading"><strong>Choose a size</strong><span>Size guide</span></div><div className="variant-options">{variants.sizes.map((option) => <button type="button" className={size === option ? "selected" : ""} key={option} onClick={() => { setSize(option); setValidation(""); }}>{option}</button>)}</div></div>}
          {variants?.colors?.length > 0 && <div className="variant-group"><div className="variant-heading"><strong>Colour</strong><span>{color || "Select a colour"}</span></div><div className="color-options">{variants.colors.map((option, index) => <button type="button" key={option} className={color === option ? "selected" : ""} onClick={() => { setColor(option); setValidation(""); }}><i className={`swatch swatch-${index}`} />{option}</button>)}</div></div>}

          <div className="quantity-row"><strong>Quantity</strong><div className="quantity-stepper"><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={14} /></button><span>{quantity}</span><button type="button" onClick={() => setQuantity((value) => Math.min(product.stock || 20, value + 1))} aria-label="Increase quantity"><Plus size={14} /></button></div><small>{product.stock > 0 ? `${product.stock} available in this demo` : "Availability may vary"}</small></div>
          {validation && <p className="form-error">{validation}</p>}
          <div className="detail-actions">
            <button className="button button-primary" type="button" onClick={() => addToCart(false)}><ShoppingBag size={17} /> Add to bag</button>
            <button className="button button-dark" type="button" onClick={() => addToCart(true)}>Buy now</button>
            <button className={`detail-save-button ${saved ? "is-saved" : ""}`} type="button" onClick={() => dispatch(toggleWishlistItem(product))} aria-label="Toggle wishlist"><Heart size={19} fill={saved ? "currentColor" : "none"} /></button>
          </div>
          <div className="delivery-info"><Truck size={18} /><span><b>Delivery, made easy</b><small>Complimentary delivery over ₹1,499. Orders are simulated in this prototype.</small></span></div>
          <div className="detail-demo-note">Product information and prices are sample data for frontend prototyping.</div>
        </div>
      </div>
      <ProductRail eyebrow="KEEP DISCOVERING" title="More from this edit." products={(relatedQuery.data?.products || []).filter((item) => item.id !== product.id).slice(0, 4)} />
    </div>
  );
}
