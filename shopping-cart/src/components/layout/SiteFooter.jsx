import { ArrowUpRight, Camera, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="wordmark footer-wordmark" to="/">
              <span className="wordmark-symbol">m</span>
              <span>morrow<span className="wordmark-light"> market</span></span>
            </Link>
            <p>Thoughtful little things for the life you live every day.</p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={17} /></a>
              <a href="mailto:hello@morrowmarket.example" aria-label="Email"><Mail size={17} /></a>
            </div>
          </div>
          <div className="footer-column">
            <strong>Explore</strong>
            <Link to="/shop">Shop all</Link>
            <Link to="/category/groceries">Groceries</Link>
            <Link to="/category/home-living">Home & Living</Link>
            <Link to="/category/fashion">Fashion</Link>
          </div>
          <div className="footer-column">
            <strong>Your account</strong>
            <Link to="/wishlist">Saved items</Link>
            <Link to="/cart">Shopping bag</Link>
            <Link to="/orders">Order history</Link>
          </div>
          <div className="footer-note">
            <span className="footer-kicker">A NOTE FROM MORROW</span>
            <h3>Good things,<br />chosen thoughtfully.</h3>
            <p>This is a frontend prototype. Product availability, prices, payments and orders are simulated.</p>
            <Link to="/shop">Find your everyday edit <ArrowUpRight size={15} /></Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Morrow Market. Prototype storefront.</span>
          <span>Made for everyday discovery <span className="footer-heart">♥</span></span>
        </div>
      </div>
    </footer>
  );
}
