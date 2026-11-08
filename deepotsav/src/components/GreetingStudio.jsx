import { useState } from "react";
import { Check, Copy, Send, Sparkles } from "lucide-react";

export default function GreetingStudio({ year }) {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const cleanName = name.trim();
  const greeting = (cleanName ? "Dear " + cleanName + ", " : "") +
    "may the light of Diwali " + year +
    " bring peace to your home, warmth to your heart and joy to every new beginning. Happy Diwali!";

  async function shareGreeting() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "A Diwali wish for you",
          text: greeting,
          url: window.location.href
        });
        return;
      }
      await navigator.clipboard.writeText(greeting);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      if (error?.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(greeting);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2200);
        } catch {
          setCopied(false);
        }
      }
    }
  }

  async function copyGreeting() {
    try {
      await navigator.clipboard.writeText(greeting);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="greeting-section" id="greeting">
      <div className="greeting-heading">
        <span className="eyebrow eyebrow-light"><Sparkles size={15} /> PASS THE LIGHT ALONG</span>
        <h2>A little wish can brighten a day.</h2>
        <p>Create a personal Diwali greeting and share a little warmth with someone you love.</p>
      </div>
      <div className="greeting-builder">
        <div className="greeting-form">
          <label htmlFor="greeting-name">Who are you sending a wish to?</label>
          <input
            id="greeting-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter a name (optional)"
            maxLength={40}
          />
          <div className="greeting-form-note">Your greeting updates as you type.</div>
          <div className="greeting-actions">
            <button type="button" className="button button-gold" onClick={shareGreeting}><Send size={16} /> Share greeting</button>
            <button type="button" className="button button-outline-light" onClick={copyGreeting}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy message"}
            </button>
          </div>
        </div>
        <div className="greeting-card" aria-live="polite">
          <div className="greeting-card-frame">
            <span className="greeting-card-top">A WISH FOR YOU · {year}</span>
            <span className="greeting-card-lamp">🪔</span>
            <p className="greeting-card-title">Happy<br /><em>Diwali</em></p>
            <span className="greeting-card-name">{cleanName || "With love & light"}</span>
            <p className="greeting-card-message">May your home glow with happiness, your heart be filled with peace, and the year ahead bring beautiful beginnings.</p>
            <span className="greeting-card-bottom">SHUBH DEEPAWALI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
