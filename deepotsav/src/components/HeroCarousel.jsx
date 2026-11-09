import { useEffect, useRef, useState } from "react";
import { ArrowDown, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";
import { heroSlides } from "../data/photos.js";

const IMAGE_DURATION = 7600;

export default function HeroCarousel({ year, festivalDate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRef = useRef(null);
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  // Still images use the regular carousel interval. The video advances on playback time.
  useEffect(() => {
    if (paused || reducedMotion || activeSlide.type === "video") return undefined;
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % heroSlides.length);
    }, IMAGE_DURATION);
    return () => window.clearTimeout(timer);
  }, [activeIndex, activeSlide.type, paused, reducedMotion]);

  // Keep the background video in step with hover/focus pause and reduced-motion settings.
  useEffect(() => {
    if (activeSlide.type !== "video") return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    if (paused || reducedMotion) {
      video.pause();
      return undefined;
    }

    const playRequest = video.play();
    if (playRequest && typeof playRequest.catch === "function") {
      playRequest.catch(() => {
        setActiveIndex((current) =>
          current === activeIndex ? (activeIndex + 1) % heroSlides.length : current
        );
      });
    }

    return undefined;
  }, [activeIndex, activeSlide.type, paused, reducedMotion]);

  function moveSlide(direction) {
    setActiveIndex((index) => (index + direction + heroSlides.length) % heroSlides.length);
  }

  function advanceFromVideo() {
    setActiveIndex((current) =>
      current === activeIndex ? (activeIndex + 1) % heroSlides.length : current
    );
  }

  function handleImageError(index, fallbackImage, event) {
    const image = event.currentTarget;
    if (fallbackImage && image.dataset.fallbackAttempted !== "true") {
      image.dataset.fallbackAttempted = "true";
      image.src = fallbackImage;
      return;
    }
    setActiveIndex((current) =>
      current === index ? (index + 1) % heroSlides.length : current
    );
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
        {heroSlides.map((slide, index) => {
          if (slide.type === "video") {
            if (index !== activeIndex) return null;
            return (
              <video
                ref={videoRef}
                key={slide.id}
                className="hero-photo hero-video is-active"
                src={slide.src}
                poster={slide.poster}
                muted
                playsInline
                autoPlay={!paused && !reducedMotion}
                preload="auto"
                aria-hidden="true"
                onTimeUpdate={(event) => {
                  if (
                    !paused &&
                    !reducedMotion &&
                    event.currentTarget.currentTime >= slide.duration / 1000
                  ) {
                    advanceFromVideo();
                  }
                }}
                onEnded={advanceFromVideo}
                onError={advanceFromVideo}
              />
            );
          }

          return (
            <img
              className={"hero-photo" + (index === activeIndex ? " is-active" : "")}
              src={slide.image}
              alt=""
              key={slide.id}
              referrerPolicy="no-referrer"
              fetchPriority={index === 1 ? "high" : "auto"}
              loading={index === 1 || index === activeIndex ? "eager" : "lazy"}
              onError={(event) => handleImageError(index, slide.fallbackImage, event)}
            />
          );
        })}
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
