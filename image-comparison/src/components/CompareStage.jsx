import { useEffect, useState } from "react";
import { Image as ImageIcon, LoaderCircle, Pause, Play, ScanLine } from "lucide-react";

function StageLabel({ letter, name }) {
  return (
    <div className="stage-image-label">
      <span>{letter}</span><strong title={name}>{name}</strong>
    </div>
  );
}

export default function CompareStage({
  imageA, imageB, mode, diffResult, diffLoading, zoom, fit, wipe,
  opacity, blinkPlaying, blinkSpeed, showGuides, background, onToggleBlink
}) {
  const [blinkSideB, setBlinkSideB] = useState(false);

  useEffect(() => {
    setBlinkSideB(false);
  }, [imageA?.url, imageB?.url, mode]);

  useEffect(() => {
    if (mode !== "blink" || !blinkPlaying || !imageA || !imageB) return undefined;
    const interval = window.setInterval(() => setBlinkSideB((current) => !current), Math.max(150, 1000 / blinkSpeed));
    return () => window.clearInterval(interval);
  }, [mode, blinkPlaying, blinkSpeed, imageA, imageB]);

  const imageStyle = { objectFit: fit, transform: "scale(" + (zoom / 100) + ")" };
  const stageClass = "stage-canvas stage-background-" + background + (showGuides ? " show-guides" : "");

  if (!imageA && !imageB) {
    return (
      <div className={stageClass + " stage-empty"}>
        <div className="empty-art"><ImageIcon size={30} /><ScanLine size={22} /></div>
        <h3>Your comparison canvas</h3>
        <p>Add an image to each slot above to start inspecting the details.</p>
        <span className="empty-shortcut">LOCAL WORKSPACE <i /> NO UPLOADS</span>
      </div>
    );
  }

  if (!imageA || !imageB) {
    const image = imageA || imageB;
    const letter = imageA ? "A" : "B";
    return (
      <div className={stageClass + " stage-empty"}>
        <div className="single-preview"><img src={image.url} alt={"Image " + letter} style={imageStyle} /></div>
        <h3>One more image to go</h3>
        <p>Image {letter} is ready. Add the other image to unlock comparison modes.</p>
      </div>
    );
  }

  if (mode === "difference") {
    return (
      <div className={stageClass + " stage-result"}>
        {diffLoading || !diffResult ? (
          <div className="stage-loading"><LoaderCircle size={26} className="spin" /><span>Analysing pixel differences…</span></div>
        ) : (
          <>
            <img className="difference-image" src={diffResult.url} alt="Pixel difference heatmap. Red areas indicate changed pixels." style={{ transform: "scale(" + (zoom / 100) + ")" }} />
            <div className="heatmap-legend"><span><i className="legend-red" /> Changed pixels</span><span><i className="legend-dark" /> Within threshold</span></div>
          </>
        )}
      </div>
    );
  }

  if (mode === "side-by-side") {
    return (
      <div className={stageClass + " stage-pair"}>
        <div className="stage-image-panel">
          <StageLabel letter="A" name={imageA.name} />
          <img src={imageA.url} alt={"Image A: " + imageA.name} style={imageStyle} />
        </div>
        <div className="stage-image-panel">
          <StageLabel letter="B" name={imageB.name} />
          <img src={imageB.url} alt={"Image B: " + imageB.name} style={imageStyle} />
        </div>
      </div>
    );
  }

  if (mode === "wipe") {
    return (
      <div className={stageClass + " stage-wipe"}>
        <img className="stage-layer" src={imageA.url} alt={"Image A: " + imageA.name} style={imageStyle} />
        <div className="wipe-reveal" style={{ clipPath: "inset(0 " + (100 - wipe) + "% 0 0)" }}>
          <img className="stage-layer" src={imageB.url} alt={"Image B: " + imageB.name} style={imageStyle} />
        </div>
        <div className="wipe-divider" style={{ left: wipe + "%" }}><span><i /><i /></span></div>
        <div className="wipe-label wipe-label-a">B · REVEALED</div>
        <div className="wipe-label wipe-label-b">A · BASE</div>
      </div>
    );
  }

  if (mode === "overlay") {
    return (
      <div className={stageClass + " stage-overlay"}>
        <img className="stage-layer" src={imageA.url} alt={"Image A: " + imageA.name} style={imageStyle} />
        <img className="stage-layer" src={imageB.url} alt={"Image B: " + imageB.name} style={{ ...imageStyle, opacity: opacity / 100 }} />
        <div className="overlay-indicator">B OVER A · {opacity}% OPACITY</div>
      </div>
    );
  }

  return (
    <div className={stageClass + " stage-blink"}>
      <img className="stage-layer" src={(blinkSideB ? imageB : imageA).url} alt={(blinkSideB ? "Image B: " : "Image A: ") + (blinkSideB ? imageB.name : imageA.name)} style={imageStyle} />
      <div className="blink-indicator">
        <span className={blinkSideB ? "slot-b" : "slot-a"}>{blinkSideB ? "B" : "A"}</span>
        {blinkSideB ? imageB.name : imageA.name}
      </div>
      <button className="blink-play-button" type="button" onClick={onToggleBlink} title={blinkPlaying ? "Pause blink" : "Play blink"}>
        {blinkPlaying ? <Pause size={15} /> : <Play size={15} />}
        {blinkPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
