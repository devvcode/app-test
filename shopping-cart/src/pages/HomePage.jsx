import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Leaf, PackageCheck, Sparkles } from "lucide-react";
import { useGetProductsQuery } from "../api/commerceApi.js";
import { DEPARTMENTS } from "../data/departments.js";
import ProductRail from "../components/products/ProductRail.jsx";

const departmentCopy = {
  groceries: { title: "Good food, good mood.", caption: "The pantry staples and fresh favourites that make everyday meals feel special.", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85" },
  "home-living": { title: "Make yourself at home.", caption: "Thoughtful little details for corners, tables and slow mornings.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85" },
  fashion: { title: "A little more you.", caption: "Easy silhouettes and finishing touches for wherever the day takes you.", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85" }
};

export default function HomePage() {
  const { data, isLoading, isError } = useGetProductsQuery({ page: 1, pageSize: 180, sort: "featured" });
  const products = data?.products || [];
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="home-page">
      <section className="hero-section page-container">
        <div className="hero-copy">
          <span className="hero-kicker"><Sparkles size={14} /> THE EVERYDAY EDIT</span>
          <h1>Everyday,<br /><em>considered.</em></h1>
          <p>From the first coffee to the last little detail at home. Discover things that make the everyday feel a bit more lovely.</p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/shop">Explore the collection <ArrowRight size={17} /></Link>
            <Link className="hero-secondary-link" to="/category/home-living">A slower kind of living</Link>
          </div>
          <div className="hero-perks">
            <span><Leaf size={15} /> Thoughtful finds</span>
            <span><PackageCheck size={15} /> Easy everyday delivery</span>
          </div>
        </div>
        <div className="hero-visual">
          <img className="hero-image-main" src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=88" alt="A considered edit of everyday fashion and accessories" />
          <div className="hero-floating-note">
            <span className="note-mark">m.</span>
            <span><b>Little things,</b><small>chosen with care.</small></span>
          </div>
          <div className="hero-image-caption">THE MORROW COLLECTION <span>01 / 03</span></div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="page-container trust-strip-inner">
          <span>GOOD FINDS FOR REAL LIFE</span><i />
          <span>GROCERIES</span><i />
          <span>HOME & LIVING</span><i />
          <span>FASHION</span><i />
          <span>MADE FOR YOUR EVERYDAY</span>
        </div>
      </section>

      <section className="page-container department-section">
        <div className="section-heading-row">
          <div><span className="section-eyebrow">A LITTLE BIT OF EVERYTHING</span><h2 className="section-title">Find your kind of everyday.</h2></div>
          <Link className="text-link" to="/shop">Browse everything <ArrowRight size={15} /></Link>
        </div>
        <div className="department-grid">
          {DEPARTMENTS.map((department, index) => {
            const copy = departmentCopy[department.slug];
            return (
              <Link className={`department-card department-${department.accent}`} to={`/category/${department.slug}`} key={department.slug}>
                <img src={copy.image} alt="" loading="lazy" />
                <div className="department-overlay" />
                <span className="department-number">0{index + 1} / 03</span>
                <div className="department-card-copy">
                  <span>{department.eyebrow}</span>
                  <h3>{copy.title}</h3>
                  <p>{copy.caption}</p>
                  <b>Explore {department.name} <ArrowUpRight size={15} /></b>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {!isLoading && <div className="page-container">
        <ProductRail eyebrow="A FEW GOOD THINGS" title="Picked for you." products={featured.length ? featured : products.slice(0, 4)} />
        <section className="campaign-banner">
          <div className="campaign-copy">
            <span className="section-eyebrow">THE LITTLE UPGRADES</span>
            <h2>Make room for<br /><em>good things.</em></h2>
            <p>Pieces that bring a little more ease, warmth and personality to your everyday spaces.</p>
            <Link className="button button-light" to="/category/home-living">Explore home & living <ArrowRight size={16} /></Link>
          </div>
          <div className="campaign-image"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85" alt="Warm neutral home interior" loading="lazy" /></div>
          <span className="campaign-stamp">LIVE<br />A LITTLE<br />LIGHTER</span>
        </section>
        <ProductRail eyebrow="LOVED A LITTLE MORE" title="The good-list favourites." products={bestSellers} link="/shop?sort=rating" linkLabel="See best rated" />
      </div>}

      {isLoading && <div className="page-container loading-block"><span className="loader" /> Finding the good things...</div>}
      {isError && <p className="page-container demo-note">Showing the sample collection where the product service is available.</p>}

      <section className="newsletter-section">
        <div className="page-container newsletter-inner">
          <div><span className="section-eyebrow">A NOTE FROM MORROW</span><h2>Good things in your inbox.</h2><p>New arrivals, seasonal edits and a little inspiration for the everyday.</p></div>
          <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="Your email address" aria-label="Email address" />
            <button type="submit">Keep me posted <ArrowRight size={15} /></button>
            <small>Prototype only. Newsletter sign-up is not connected to a mailing service.</small>
          </form>
        </div>
      </section>
    </div>
  );
}
