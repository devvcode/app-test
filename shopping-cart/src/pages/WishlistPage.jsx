import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlistItem } from "../features/wishlist/wishlistSlice.js";
import { addItem } from "../features/cart/cartSlice.js";
import ProductGrid from "../components/products/ProductGrid.jsx";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  return (
    <div className="page-container wishlist-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Saved things</span></div>
      <div className="page-title-block"><span className="section-eyebrow">THE KEEPERS</span><h1>Your saved things <small>({items.length})</small></h1><p>A little list of things you loved. Come back to them whenever you're ready.</p></div>
      {items.length ? (
        <>
          <div className="wishlist-toolbar"><span>{items.length} saved {items.length === 1 ? "item" : "items"}</span><button type="button" onClick={() => items.forEach((item) => dispatch(removeWishlistItem(item.id)))}>Clear saved list</button></div>
          <ProductGrid products={items} />
        </>
      ) : (
        <div className="empty-cart-page compact-empty"><div className="empty-state-icon"><Heart size={27} /></div><h2>Nothing saved just yet.</h2><p>Tap the little heart on anything that catches your eye.</p><Link className="button button-primary" to="/shop"><ShoppingBag size={16} /> Explore the collection</Link></div>
      )}
    </div>
  );
}
