import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, setCouponCode, setQuantity } from "../features/cart/cartSlice.js";
import { selectCartSummary } from "../features/cart/cartSelectors.js";
import { formatCurrency } from "../utils/commerce.js";
import CartSummary from "../components/cart/CartSummary.jsx";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const couponCode = useSelector((state) => state.cart.couponCode);
  const summary = useSelector(selectCartSummary);
  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponMessage, setCouponMessage] = useState("");

  function applyCoupon(event) {
    event.preventDefault();
    const code = couponInput.trim().toUpperCase();
    dispatch(setCouponCode(code));
    if (!code) setCouponMessage("Enter a code to apply.");
    else if (["MORROW10", "FREESHIP"].includes(code)) setCouponMessage(`${code} applied.`);
    else setCouponMessage("That code isn't available in this demo. Try MORROW10 or FREESHIP.");
  }

  if (!items.length) {
    return (
      <div className="page-container empty-cart-page">
        <div className="empty-state-icon"><ShoppingBag size={28} /></div>
        <span className="section-eyebrow">YOUR BAG IS WAITING</span>
        <h1>A little room for good things.</h1>
        <p>Your bag is empty for now. Take a look around and find something for your everyday.</p>
        <Link className="button button-primary" to="/shop">Explore the collection <ArrowLeft size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="page-container cart-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Your bag</span></div>
      <div className="page-title-block"><span className="section-eyebrow">YOUR MORROW BAG</span><h1>Your bag <small>({summary.itemCount} items)</small></h1><p>Good choices. Let's make them yours.</p></div>
      <div className="cart-layout">
        <section className="cart-items-panel">
          {items.map((item) => (
            <article className="cart-item" key={item.lineId}>
              <Link to={`/product/${item.product.id}`} className="cart-item-image">{item.product.thumbnail ? <img src={item.product.thumbnail} alt={item.product.title} /> : <span>✦</span>}</Link>
              <div className="cart-item-details">
                <span className="product-brand">{item.product.brand}</span>
                <Link to={`/product/${item.product.id}`} className="cart-item-title">{item.product.title}</Link>
                {item.variant && <small className="cart-variant">{Object.entries(item.variant).map(([key, value]) => `${key}: ${value}`).join(" · ")}</small>}
                <span className="cart-item-unit">{item.product.unit || "Everyday find"}</span>
                <button className="remove-item" type="button" onClick={() => dispatch(removeItem(item.lineId))}><Trash2 size={13} /> Remove</button>
              </div>
              <div className="cart-item-end">
                <strong>{formatCurrency(item.product.price * item.quantity)}</strong>
                <div className="quantity-stepper small-stepper">
                  <button type="button" onClick={() => dispatch(setQuantity({ lineId: item.lineId, quantity: item.quantity - 1 }))} aria-label="Decrease quantity"><Minus size={12} /></button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => dispatch(setQuantity({ lineId: item.lineId, quantity: item.quantity + 1 }))} aria-label="Increase quantity"><Plus size={12} /></button>
                </div>
              </div>
            </article>
          ))}
          <Link className="continue-shopping" to="/shop"><ArrowLeft size={15} /> Continue shopping</Link>
          <form className="coupon-form" onSubmit={applyCoupon}>
            <label htmlFor="coupon">Have a little code?</label>
            <div><input id="coupon" value={couponInput} onChange={(event) => setCouponInput(event.target.value)} placeholder="Enter coupon code" /><button type="submit">Apply</button></div>
            {couponMessage && <small className={summary.couponValid ? "success-text" : "error-text"}>{couponMessage}</small>}
            <small>Demo codes: MORROW10 for 10% off · FREESHIP for free delivery.</small>
          </form>
        </section>
        <CartSummary summary={summary} />
      </div>
    </div>
  );
}
