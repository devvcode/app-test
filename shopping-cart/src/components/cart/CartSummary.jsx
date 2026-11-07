import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { formatCurrency } from "../../utils/commerce.js";

export default function CartSummary({ summary, checkout = true }) {
  return (
    <aside className="cart-summary-card">
      <h2>Order summary</h2>
      <div className="summary-line"><span>Subtotal</span><strong>{formatCurrency(summary.subtotal)}</strong></div>
      {summary.discount > 0 && <div className="summary-line discount-line"><span>Discount ({summary.coupon.code})</span><strong>-{formatCurrency(summary.discount)}</strong></div>}
      <div className="summary-line"><span>Delivery</span><strong>{summary.shipping === 0 ? "FREE" : formatCurrency(summary.shipping)}</strong></div>
      <div className="shipping-progress">
        <Truck size={16} />
        {summary.subtotal >= 1499
          ? "You've unlocked complimentary delivery."
          : `Add ${formatCurrency(1499 - summary.subtotal)} more for free delivery.`}
      </div>
      <div className="summary-total"><span>Estimated total</span><strong>{formatCurrency(summary.total)}</strong></div>
      <p className="tax-note">Inclusive of applicable taxes. Final charges are simulated.</p>
      {checkout && (
        <Link className="button button-primary button-wide" to="/checkout">Continue to checkout <ArrowRight size={17} /></Link>
      )}
      <div className="secure-note"><ShieldCheck size={15} /> Secure checkout experience (demo)</div>
    </aside>
  );
}
