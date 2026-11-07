import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, LockKeyhole, MapPin, PackageCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice.js";
import { selectCartSummary } from "../features/cart/cartSelectors.js";
import { orderAdded } from "../features/orders/ordersSlice.js";
import { orderService } from "../services/orderService.js";
import { formatCurrency } from "../utils/commerce.js";
import CartSummary from "../components/cart/CartSummary.jsx";

const initialAddress = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: ""
};

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const summary = useSelector(selectCartSummary);
  const [address, setAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!items.length) {
    return (
      <div className="page-container empty-cart-page">
        <div className="empty-state-icon"><PackageCheck size={28} /></div>
        <span className="section-eyebrow">READY WHEN YOU ARE</span>
        <h1>Your bag is empty.</h1>
        <p>Add a few good things to your bag before heading to checkout.</p>
        <Link className="button button-primary" to="/shop">Back to the shop</Link>
      </div>
    );
  }

  function updateAddress(event) {
    const { name, value } = event.target;
    setAddress((current) => ({ ...current, [name]: value }));
  }

  async function submitOrder(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const order = await orderService.createOrder({
        items: items.map((item) => ({
          productId: item.product.id,
          title: item.product.title,
          thumbnail: item.product.thumbnail,
          unitPrice: item.product.price,
          quantity: item.quantity,
          variant: item.variant
        })),
        subtotal: summary.subtotal,
        discount: summary.discount,
        shipping: summary.shipping,
        total: summary.total,
        couponCode: summary.coupon?.code || null,
        shippingAddress: address,
        paymentMethod
      });

      dispatch(orderAdded(order));
      dispatch(clearCart());
      navigate(`/order-confirmation/${order.id}`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "We couldn't place the demo order.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-container checkout-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/cart">Your bag</Link><span>/</span><span>Checkout</span></div>
      <div className="page-title-block"><span className="section-eyebrow">JUST A FEW MORE DETAILS</span><h1>Checkout</h1><p>Almost yours. Add your delivery details below.</p></div>

      <form className="checkout-layout" onSubmit={submitOrder}>
        <div className="checkout-main">
          <section className="checkout-panel">
            <div className="checkout-section-heading"><span className="step-number">01</span><div><h2>Delivery details</h2><p>Where should we send your good things?</p></div><MapPin size={19} /></div>
            <div className="checkout-fields">
              <label className="field-full">Full name<input autoComplete="name" name="fullName" onChange={updateAddress} value={address.fullName} required placeholder="Your full name" /></label>
              <label>Email address<input autoComplete="email" type="email" name="email" onChange={updateAddress} value={address.email} required placeholder="you@example.com" /></label>
              <label>Phone number<input autoComplete="tel" name="phone" inputMode="tel" pattern="[0-9+() -]{8,16}" onChange={updateAddress} value={address.phone} required placeholder="10-digit mobile number" /></label>
              <label className="field-full">Address<input autoComplete="street-address" name="address" onChange={updateAddress} value={address.address} required placeholder="House number, street and locality" /></label>
              <label>City<input autoComplete="address-level2" name="city" onChange={updateAddress} value={address.city} required placeholder="City" /></label>
              <label>State<input autoComplete="address-level1" name="state" onChange={updateAddress} value={address.state} required placeholder="State" /></label>
              <label>PIN code<input autoComplete="postal-code" name="pincode" inputMode="numeric" pattern="[0-9]{6}" maxLength="6" onChange={updateAddress} value={address.pincode} required placeholder="6-digit PIN code" /></label>
            </div>
          </section>

          <section className="checkout-panel">
            <div className="checkout-section-heading"><span className="step-number">02</span><div><h2>Payment method</h2><p>Choose how you would like to pay.</p></div><LockKeyhole size={19} /></div>
            <div className="payment-options">
              <label className={paymentMethod === "cod" ? "payment-option selected" : "payment-option"}><input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} /><span><b>Cash on delivery</b><small>Pay when your order arrives</small></span><em>COD</em></label>
              <label className={paymentMethod === "upi" ? "payment-option selected" : "payment-option"}><input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} /><span><b>UPI payment</b><small>Simulated payment confirmation</small></span><em>UPI</em></label>
              <label className={paymentMethod === "card" ? "payment-option selected" : "payment-option"}><input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /><span><b>Credit / debit card</b><small>Demo selection only — no card details collected</small></span><em>VISA</em></label>
            </div>
            <p className="demo-payment-note"><CheckCircle2 size={15} /> All payment methods are simulated. No payment will be collected.</p>
          </section>
          {error && <p className="form-error">{error}</p>}
          <button className="button button-primary button-wide place-order-button" type="submit" disabled={submitting}>
            {submitting ? "Placing your demo order..." : `Place order · ${formatCurrency(summary.total)}`}
          </button>
          <Link className="continue-shopping" to="/cart"><ArrowLeft size={15} /> Return to bag</Link>
        </div>

        <aside className="checkout-review">
          <div className="checkout-panel review-panel">
            <h2>Your order</h2>
            {items.map((item) => <div className="review-item" key={item.lineId}><img src={item.product.thumbnail} alt="" /><span><b>{item.product.title}</b><small>Qty {item.quantity}{item.variant ? ` · ${Object.values(item.variant).join(" / ")}` : ""}</small></span><strong>{formatCurrency(item.product.price * item.quantity)}</strong></div>)}
            <div className="review-divider" />
            <div className="summary-line"><span>Subtotal</span><strong>{formatCurrency(summary.subtotal)}</strong></div>
            {summary.discount > 0 && <div className="summary-line discount-line"><span>Discount</span><strong>-{formatCurrency(summary.discount)}</strong></div>}
            <div className="summary-line"><span>Delivery</span><strong>{summary.shipping ? formatCurrency(summary.shipping) : "FREE"}</strong></div>
            <div className="summary-total"><span>Total</span><strong>{formatCurrency(summary.total)}</strong></div>
          </div>
          <p className="checkout-privacy">Your details are stored only in this browser prototype. Connect a backend before using real customer information.</p>
        </aside>
      </form>
    </div>
  );
}
