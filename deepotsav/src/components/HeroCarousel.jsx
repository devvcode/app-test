import { useEffect, useState } from "react";
import { ArrowDown, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";
import { heroSlides } from "../data/photos.js";

export default function HeroCarousel({ year, festivalDate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroSlides.length);
    }, 7600);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  function moveSlide(direction) {
    setActiveIndex((index) => (index + direction + heroSlides.length) % heroSlides.length);
  }

  return (
    <section
      className={"hero hero-" + activeSlide.theme}
      aria-label="Diwali highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="hero-image-stack" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <img
            className={"hero-photo" + (index === activeIndex ? " is-active" : "")}
            src={slide.image}
            alt=""
            key={slide.id}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="hero-grain" />
      <div className="hero-content">
        <div className="hero-kicker"><span className="kicker-line" /> {activeSlide.eyebrow} <span className="kicker-line" /></div>
        <div className="hero-season"><Sparkles size={14} /> DEEPAVALI · {year}</div>
        <p className="hero-title">{activeSlide.title}</p>
        <h1>{activeSlide.emphasis}</h1>
        <p className="hero-description">{activeSlide.description}</p>
        <div className="hero-actions">
          <a className="button button-gold" href="#moments">Explore the celebration <ArrowDown size={17} /></a>
          <a className="hero-date-link" href="#countdown">{festivalDate}</a>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-pagination" aria-label="Choose a slide">
          {heroSlides.map((slide, index) => (
            <button
              type="button"
              className={"pagination-dot" + (index === activeIndex ? " active" : "")}
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              aria-label={"Show slide " + (index + 1) + ": " + slide.eyebrow}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <div className="hero-slide-number"><strong>0{activeIndex + 1}</strong><span />0{heroSlides.length}</div>
        <div className="hero-controls">
          <button type="button" className="hero-control" onClick={() => moveSlide(-1)} aria-label="Previous slide"><ChevronLeft size={20} /></button>
          <button type="button" className="hero-control" onClick={() => moveSlide(1)} aria-label="Next slide"><ChevronRight size={20} /></button>
          <button
            type="button"
            className="hero-control pause-control"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Resume automatic slideshow" : "Pause automatic slideshow"}
            aria-pressed={paused}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        </div>
      </div>
      <div className="hero-vertical-note">A FESTIVAL OF LIGHT · JOY · NEW BEGINNINGS</div>
    </section>
  );
}
