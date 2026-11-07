import { Link, useParams } from "react-router-dom";
import { Check, PackageCheck, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../utils/commerce.js";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const order = useSelector((state) => state.orders.items.find((item) => item.id === orderId));

  if (!order) {
    return <div className="page-container not-found"><h1>Order not found</h1><p>This order may have been created in another browser or cleared from local storage.</p><Link className="button button-primary" to="/orders">View order history</Link></div>;
  }

  return (
    <div className="page-container confirmation-page">
      <div className="confirmation-icon"><Check size={29} /></div>
      <span className="section-eyebrow">THAT'S A GOOD CHOICE</span>
      <h1>Your order is in.</h1>
      <p className="confirmation-message">Thanks for shopping with Morrow Market. This is a simulated order confirmation for your frontend prototype.</p>
      <div className="confirmation-card">
        <div className="confirmation-card-head"><span><PackageCheck size={18} /> Order confirmed</span><small>{new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}</small></div>
        <div className="confirmation-order-id"><small>ORDER NUMBER</small><strong>{order.id}</strong></div>
        {order.items?.map((item) => <div className="review-item" key={item.productId}><img src={item.thumbnail} alt="" /><span><b>{item.title}</b><small>Qty {item.quantity}</small></span><strong>{formatCurrency(item.unitPrice * item.quantity)}</strong></div>)}
        <div className="review-divider" />
        <div className="summary-line"><span>Order total</span><strong>{formatCurrency(order.total)}</strong></div>
        <div className="summary-line"><span>Payment</span><strong>{order.paymentStatus}</strong></div>
      </div>
      <div className="confirmation-actions"><Link className="button button-primary" to="/shop">Keep exploring <ArrowRight size={16} /></Link><Link className="button button-outline" to="/orders">View all orders</Link></div>
    </div>
  );
}
