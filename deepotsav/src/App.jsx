import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Flower2,
  Heart,
  Menu,
  Sparkles,
  X
} from "lucide-react";
import Countdown from "./components/Countdown.jsx";
import DiyaStudio from "./components/DiyaStudio.jsx";
import GreetingStudio from "./components/GreetingStudio.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import { formatFestivalDate, festivalDays, getUpcomingDiwali } from "./data/festivalCalendar.js";
import { galleryCategories, galleryPhotos, photoCredits } from "./data/photos.js";

function SiteHeader({ year }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["Moments", "#moments"],
    ["The traditions", "#traditions"],
    ["Light a diya", "#light"],
    ["Send a wish", "#greeting"]
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Deepotsav home">
        <span className="brand-mark">दीप</span>
        <span className="brand-word">deepotsav<span>THE FESTIVAL OF LIGHTS</span></span>
      </a>
      <nav className={"main-nav" + (menuOpen ? " is-open" : "")} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a className="nav-greeting" href="#greeting" onClick={() => setMenuOpen(false)}>Send a greeting <ArrowUpRight size={14} /></a>
      </nav>
      <div className="header-year">
        <span className="header-year-dot" />
        <span>DIWALI {year}</span>
      </div>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All moments");
  const filtered = activeCategory === "All moments"
    ? galleryPhotos
    : galleryPhotos.filter((photo) => photo.category === activeCategory);

  return (
    <section className="moments-section section-shell" id="moments">
      <div className="section-intro">
        <div>
          <span className="eyebrow"><Sparkles size={15} /> THE FESTIVAL IN FRAMES</span>
          <h2>Little moments.<br /><em>Lasting memories.</em></h2>
        </div>
        <p>From the first diya at the doorway to the glow of a shared celebration, explore the details that make Deepavali feel like home.</p>
      </div>
      <div className="gallery-toolbar">
        <div className="gallery-filters" role="group" aria-label="Filter celebration photographs">
          {galleryCategories.map((category) => (
            <button
              type="button"
              key={category}
              className={"filter-chip" + (activeCategory === category ? " active" : "")}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="gallery-count">{filtered.length} MOMENTS</span>
      </div>
      <div className="photo-grid">
        {filtered.map((photo, index) => (
          <article className={"photo-card photo-card-" + (index % 4)} key={photo.id}>
            <a className="photo-card-image" href={photo.source} target="_blank" rel="noreferrer" aria-label={"View source photograph: " + photo.title}>
              <img src={photo.image} alt={photo.alt} loading="lazy" decoding="async" />
              <span className="photo-open"><ArrowUpRight size={17} /></span>
            </a>
            <div className="photo-card-copy">
              <div><span className="photo-category">{photo.category}</span><span className="photo-credit">PHOTO · {photo.credit}</span></div>
              <h3>{photo.title}</h3>
              <p>{photo.caption}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="gallery-footnote">Photographs are linked to their original Wikimedia Commons file pages. Creator and licence details appear in the image credits below.</p>
    </section>
  );
}

function TraditionsSection() {
  return (
    <section className="traditions-section" id="traditions">
      <div className="section-shell">
        <div className="traditions-heading">
          <span className="eyebrow eyebrow-light"><Flower2 size={15} /> FIVE DAYS · MANY MEANINGS</span>
          <h2>One festival.<br /><em>Many beautiful traditions.</em></h2>
          <p>Diwali is celebrated in different ways across India and the wider diaspora. This is a common five-part sequence; names, dates and observances vary by region and community.</p>
        </div>
        <div className="tradition-timeline">
          {festivalDays.map((day, index) => (
            <article className={"tradition-card" + (index === 2 ? " tradition-featured" : "")} key={day.number}>
              <div className="tradition-top"><span>{day.number}</span><b>{day.symbol}</b></div>
              <h3>{day.title}</h3>
              <h4>{day.subtitle}</h4>
              <p>{day.description}</p>
              <span className="tradition-line" />
            </article>
          ))}
        </div>
        <div className="traditions-note"><span>✳</span> The festival's lunar-calendar dates can vary by local Panchang and regional practice.</div>
      </div>
    </section>
  );
}

function StoryBand() {
  return (
    <section className="story-band section-shell">
      <div className="story-symbol">✺</div>
      <div className="story-copy">
        <span className="eyebrow">A THOUGHT TO CARRY</span>
        <h2>Light is not only what we see.<br /><em>It is what we share.</em></h2>
      </div>
      <p>Across homes and communities, a lamp can be a symbol of hope, welcome and a fresh beginning. May this season bring a little more kindness into the world.</p>
    </section>
  );
}

function PhotoCredits() {
  return (
    <details className="photo-credits">
      <summary>Photography credits & licences <span>Open credits</span></summary>
      <div className="credits-list">
        {photoCredits.map((credit) => (
          <p key={credit.name}>
            <strong>{credit.name}</strong> — {credit.author}.{" "}
            <a href={credit.source} target="_blank" rel="noreferrer">Original photograph</a>
            {" · "}
            <a href={credit.licenseUrl} target="_blank" rel="noreferrer">{credit.license}</a>.
            {" "}Displayed from Wikimedia Commons thumbnails.
          </p>
        ))}
      </div>
    </details>
  );
}

function Footer({ year }) {
  return (
    <footer className="site-footer">
      <div className="footer-top section-shell">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">दीप</span>
          <span className="brand-word">deepotsav<span>THE FESTIVAL OF LIGHTS</span></span>
        </a>
        <div className="footer-message"><span>WITH LIGHT, LOVE & GRATITUDE</span><strong>Shubh Deepawali {year}</strong></div>
        <a className="back-to-top" href="#top">Back to top ↑</a>
      </div>
      <div className="section-shell">
        <PhotoCredits />
        <div className="footer-bottom">
          <span>© {year} Deepotsav · A small celebration made with care.</span>
          <span>Made for the joy of light <Heart size={13} fill="currentColor" /></span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [festival, setFestival] = useState(() => getUpcomingDiwali());

  useEffect(() => {
    const updateFestival = () => setFestival(getUpcomingDiwali());
    const timer = window.setInterval(updateFestival, 60000);
    return () => window.clearInterval(timer);
  }, []);

  const dateLabel = festival.date ? formatFestivalDate(festival.date) : "DATE TO BE ANNOUNCED";

  return (
    <div className="deepotsav-app" id="top">
      <div className="top-ribbon"><span>✦</span> MAY YOUR HOME BE FILLED WITH LIGHT, PEACE & JOY <span>✦</span></div>
      <SiteHeader year={festival.year} />
      <main>
        <HeroCarousel year={festival.year} festivalDate={dateLabel} />
        <Countdown festival={festival} />
        <GallerySection />
        <TraditionsSection />
        <StoryBand />
        <DiyaStudio />
        <GreetingStudio year={festival.year} />
      </main>
      <Footer year={festival.year} />
    </div>
  );
}
