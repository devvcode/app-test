import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Heart, Search, ShoppingBag, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../features/cart/cartSelectors.js";

export default function SiteHeader() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const navigate = useNavigate();

  function submitSearch(event) {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
    setMenuOpen(false);
  }

  return (
    <>
      <div className="announcement">
        <span><Sparkles size={13} /> A little something for your everyday</span>
        <span className="announcement-right">Complimentary delivery on orders over ₹1,499 <ArrowRight size={13} /></span>
      </div>
      <header className="site-header">
        <div className="header-main page-container">
          <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
          <Link className="wordmark" to="/" onClick={() => setMenuOpen(false)}>
            <span className="wordmark-symbol">m</span>
            <span>morrow<span className="wordmark-light"> market</span></span>
          </Link>

          <form className="header-search" onSubmit={submitSearch}>
            <Search size={17} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search for something lovely..." aria-label="Search products" />
            <button type="submit">Search</button>
          </form>

          <div className="header-actions">
            <Link to="/wishlist" className="header-icon-link" aria-label="Wishlist">
              <Heart size={20} />
              <span className="action-label">Saved</span>
              {wishlistCount > 0 && <b className="count-badge">{wishlistCount}</b>}
            </Link>
            <Link to="/cart" className="header-icon-link cart-link" aria-label="Shopping bag">
              <ShoppingBag size={20} />
              <span className="action-label">Bag</span>
              <b className="count-badge">{cartCount}</b>
            </Link>
          </div>
        </div>

        <nav className={`department-nav ${menuOpen ? "is-open" : ""}`} aria-label="Departments">
          <div className="page-container nav-inner">
            <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop all</Link>
            <Link to="/category/groceries" onClick={() => setMenuOpen(false)}>Groceries</Link>
            <Link to="/category/home-living" onClick={() => setMenuOpen(false)}>Home & Living</Link>
            <Link to="/category/fashion" onClick={() => setMenuOpen(false)}>Fashion</Link>
            <Link to="/shop?sort=newest" onClick={() => setMenuOpen(false)}>New arrivals</Link>
            <Link to="/orders" onClick={() => setMenuOpen(false)}>My orders</Link>
          </div>
        </nav>
      </header>
    </>
  );
}
