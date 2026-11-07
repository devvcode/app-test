import { Link } from "react-router-dom";
import { PackageCheck, ArrowUpRight, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../utils/commerce.js";

export default function OrdersPage() {
  const orders = useSelector((state) => state.orders.items);

  return (
    <div className="page-container orders-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Your orders</span></div>
      <div className="page-title-block"><span className="section-eyebrow">YOUR MORROW MOMENTS</span><h1>Order history</h1><p>All your demo orders, neatly in one place.</p></div>
      {orders.length ? (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card-top"><span><PackageCheck size={17} /> {order.status || "Confirmed"}</span><small>{new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</small></div>
              <div className="order-card-main"><div><small>ORDER NUMBER</small><strong>{order.id}</strong></div><div><small>ITEMS</small><strong>{order.items?.reduce((count, item) => count + item.quantity, 0) || 0}</strong></div><div><small>ORDER TOTAL</small><strong>{formatCurrency(order.total)}</strong></div><Link to={`/order-confirmation/${order.id}`}>View order <ArrowUpRight size={15} /></Link></div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-cart-page compact-empty"><div className="empty-state-icon"><ShoppingBag size={27} /></div><h2>Your next good find is out there.</h2><p>Once you place a demo order, it will show up here.</p><Link className="button button-primary" to="/shop">Start shopping</Link></div>
      )}
    </div>
  );
}
