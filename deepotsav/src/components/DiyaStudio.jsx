import { useState } from "react";
import { Flame, Sparkles } from "lucide-react";

const lampCount = 12;

export default function DiyaStudio() {
  const [litLamps, setLitLamps] = useState([]);
  const allLit = litLamps.length === lampCount;

  function toggleLamp(index) {
    setLitLamps((current) =>
      current.includes(index)
        ? current.filter((lamp) => lamp !== index)
        : [...current, index]
    );
  }

  function lightAll() {
    setLitLamps(allLit ? [] : Array.from({ length: lampCount }, (_, index) => index));
  }

  return (
    <section className="diya-section" id="light">
      <div className="diya-copy">
        <span className="eyebrow"><Sparkles size={15} /> A MOMENT OF LIGHT</span>
        <h2>Light a little joy.</h2>
        <p>Tap a diya and watch your corner of the celebration glow. A small light can make a beautiful difference.</p>
        <div className="diya-progress">
          <div className="diya-progress-track"><span style={{ width: (litLamps.length / lampCount) * 100 + "%" }} /></div>
          <span>{litLamps.length} of {lampCount} diyas lit</span>
        </div>
        <button type="button" className="button button-dark" onClick={lightAll}>
          <Flame size={17} /> {allLit ? "Let the lamps rest" : "Light every diya"}
        </button>
      </div>
      <div className="diya-artboard">
        <div className="diya-halo halo-one" />
        <div className="diya-halo halo-two" />
        <div className="diya-lamp-grid">
          {Array.from({ length: lampCount }, (_, index) => {
            const isLit = litLamps.includes(index);
            return (
              <button
                key={index}
                type="button"
                className={"diya-button" + (isLit ? " is-lit" : "")}
                onClick={() => toggleLamp(index)}
                aria-label={(isLit ? "Extinguish" : "Light") + " diya " + (index + 1)}
                aria-pressed={isLit}
              >
                <span className="diya-flame"><i /></span>
                <span className="diya-bowl"><i /></span>
                <span className="diya-base" />
              </button>
            );
          })}
        </div>
        <p className="diya-art-caption">TAP TO LIGHT A DIYA</p>
      </div>
    </section>
  );
}
