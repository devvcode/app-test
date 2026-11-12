import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftRight, Check, Columns, Download, Eye, Grid2X2, ImagePlus,
  Info, Layers, LoaderCircle, Maximize2, Pause, Play, RotateCcw,
  ScanLine, ShieldCheck, SlidersHorizontal, Sparkles, ZoomIn, ZoomOut
} from "lucide-react";
import ImageUploadCard from "./components/ImageUploadCard.jsx";
import CompareStage from "./components/CompareStage.jsx";
import {
  buildDifferenceMap, createImageRecord, formatBytes, formatDimensions,
  formatRatio, makeComparisonExport
} from "./utils/imageProcessing.js";

const MODES = [
  { id: "side-by-side", label: "Side by side", Icon: Columns },
  { id: "wipe", label: "Wipe", Icon: ScanLine },
  { id: "overlay", label: "Overlay", Icon: Layers },
  { id: "difference", label: "Difference", Icon: Grid2X2 },
  { id: "blink", label: "Blink", Icon: Eye }
];

function RangeControl({ label, value, min, max, suffix = "", onChange, helper }) {
  return (
    <div className="range-control">
      <div className="control-label-row">
        <label>{label}</label><output>{value}{suffix}</output>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      {helper ? <p className="control-helper">{helper}</p> : null}
    </div>
  );
}

function App() {
  const [imageA, setImageA] = useState(null);
  const [imageB, setImageB] = useState(null);
  const [mode, setMode] = useState("side-by-side");
  const [wipe, setWipe] = useState(50);
  const [opacity, setOpacity] = useState(50);
  const [threshold, setThreshold] = useState(18);
  const [zoom, setZoom] = useState(100);
  const [fit, setFit] = useState("contain");
  const [background, setBackground] = useState("checker");
  const [showGuides, setShowGuides] = useState(false);
  const [blinkPlaying, setBlinkPlaying] = useState(true);
  const [blinkSpeed, setBlinkSpeed] = useState(2);
  const [diffResult, setDiffResult] = useState(null);
  const [diffLoading, setDiffLoading] = useState(false);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  const hasPair = Boolean(imageA && imageB);
  const dimensionMatch = useMemo(() => {
    if (!imageA || !imageB) return null;
    return imageA.width === imageB.width && imageA.height === imageB.height;
  }, [imageA, imageB]);

  useEffect(() => {
    let cancelled = false;
    if (!imageA || !imageB) {
      setDiffResult(null);
      setDiffLoading(false);
      return undefined;
    }
    setDiffResult(null);
    setDiffLoading(true);
    buildDifferenceMap(imageA.url, imageB.url, threshold)
      .then((result) => { if (!cancelled) setDiffResult(result); })
      .catch((reason) => { if (!cancelled) setError(reason.message || "Could not calculate the pixel difference."); })
      .finally(() => { if (!cancelled) setDiffLoading(false); });
    return () => { cancelled = true; };
  }, [imageA?.url, imageB?.url, threshold]);

  async function handleFile(slot, file) {
    setError("");
    try {
      const record = await createImageRecord(file);
      const previous = slot === "A" ? imageA : imageB;
      if (previous?.url) URL.revokeObjectURL(previous.url);
      if (slot === "A") setImageA(record);
      else setImageB(record);
      setZoom(100);
    } catch (reason) {
      setError(reason.message || "Could not open that image.");
    }
  }

  function removeImage(slot) {
    const previous = slot === "A" ? imageA : imageB;
    if (previous?.url) URL.revokeObjectURL(previous.url);
    if (slot === "A") setImageA(null);
    else setImageB(null);
  }

  function swapImages() {
    setImageA(imageB);
    setImageB(imageA);
    setZoom(100);
  }

  function resetView() {
    setZoom(100);
    setFit("contain");
    setWipe(50);
    setOpacity(50);
    setThreshold(18);
    setBlinkSpeed(2);
    setBlinkPlaying(true);
    setShowGuides(false);
    setBackground("checker");
  }

  async function handleExport() {
    if (!hasPair || exporting) return;
    setExporting(true);
    setError("");
    try {
      const dataUrl = mode === "difference" && diffResult
        ? diffResult.url
        : await makeComparisonExport(imageA, imageB, { mode, wipe, opacity });
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = mode === "difference" ? "pixel-difference.png" : "image-comparison-" + mode + ".png";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } catch (reason) {
      setError(reason.message || "Could not export this comparison.");
    } finally {
      setExporting(false);
    }
  }

  const diffPercent = diffResult ? diffResult.changedPercent.toFixed(1) + "%" : "—";

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="./" aria-label="PixelCompare home">
          <span className="brand-mark"><Grid2X2 size={19} /></span>
          <span className="brand-name">PIXEL<span>COMPARE</span></span>
          <span className="brand-edition">IMAGE LAB</span>
        </a>
        <div className="topbar-right">
          <span className="privacy-pill"><ShieldCheck size={14} /> PRIVATE BY DESIGN</span>
          <a className="topbar-link" href="https://github.com/devvcode/react-collections" target="_blank" rel="noreferrer">PROJECT <span>↗</span></a>
        </div>
      </header>

      <main className="page-container">
        <section className="hero">
          <div>
            <p className="eyebrow"><Sparkles size={13} /> IMAGE ANALYSIS WORKSPACE</p>
            <h1>See what <em>changed.</em></h1>
            <p className="hero-description">A precise, flexible workspace for comparing two images. Inspect composition, reveal subtle edits and find pixel-level differences.</p>
          </div>
          <div className="hero-note">
            <span className="hero-note-icon"><ShieldCheck size={19} /></span>
            <div><strong>Your images stay on this device</strong><span>All processing happens locally in your browser.</span></div>
          </div>
        </section>

        <section className="upload-section" aria-label="Upload images to compare">
          <ImageUploadCard slot="A" image={imageA} onFile={(file) => handleFile("A", file)} onRemove={() => removeImage("A")} />
          <div className="swap-connector">
            <button className="swap-button" type="button" disabled={!hasPair} onClick={swapImages} title="Swap images" aria-label="Swap images"><ArrowLeftRight size={17} /></button>
            <span>VS</span>
          </div>
          <ImageUploadCard slot="B" image={imageB} onFile={(file) => handleFile("B", file)} onRemove={() => removeImage("B")} />
        </section>

        {error ? <div className="error-banner" role="alert"><Info size={16} /> {error}<button type="button" onClick={() => setError("")}>Dismiss</button></div> : null}

        <section className="workspace">
          <div className="workspace-top">
            <div className="workspace-heading">
              <div className="workspace-heading-icon"><SlidersHorizontal size={17} /></div>
              <div><h2>Comparison workspace</h2><span>{hasPair ? "2 IMAGES LOADED · READY TO INSPECT" : "UPLOAD TWO IMAGES TO BEGIN"}</span></div>
            </div>
            <div className="workspace-top-actions">
              <button className="text-button" type="button" onClick={resetView}><RotateCcw size={14} /> Reset view</button>
              <button className="export-button" type="button" disabled={!hasPair || exporting || (mode === "difference" && !diffResult)} onClick={handleExport}>
                {exporting ? <LoaderCircle size={15} className="spin" /> : <Download size={15} />}
                {exporting ? "Preparing…" : "Export PNG"}
              </button>
            </div>
          </div>

          <div className="mode-tabs" role="tablist" aria-label="Comparison modes">
            {MODES.map(({ id, label, Icon }) => (
              <button key={id} type="button" role="tab" aria-selected={mode === id}
                className={"mode-tab" + (mode === id ? " active" : "")} disabled={!hasPair}
                onClick={() => setMode(id)}>
                <Icon size={15} /><span>{label}</span>
              </button>
            ))}
            <div className="mode-tabs-spacer" />
            <span className="mode-hint"><span className="live-dot" /> {hasPair ? "LIVE PREVIEW" : "AWAITING INPUT"}</span>
          </div>

          <div className="workspace-layout">
            <div className="stage-column">
              <div className="stage-toolbar">
                <div className="stage-toolbar-left">
                  <span className="stage-kicker">PREVIEW CANVAS</span>
                  {hasPair ? <span className="stage-resolution">{formatDimensions(imageA)} <b>↔</b> {formatDimensions(imageB)}</span> : null}
                </div>
                <div className="stage-toolbar-right">
                  <div className="fit-toggle" aria-label="Image fitting mode">
                    <button type="button" className={fit === "contain" ? "selected" : ""} disabled={!hasPair} onClick={() => setFit("contain")}>Fit</button>
                    <button type="button" className={fit === "cover" ? "selected" : ""} disabled={!hasPair} onClick={() => setFit("cover")}>Fill</button>
                  </div>
                  <button className={"toolbar-icon-button" + (showGuides ? " selected" : "")} type="button" disabled={!hasPair}
                    onClick={() => setShowGuides((value) => !value)} title="Toggle alignment guides" aria-label="Toggle alignment guides"><Grid2X2 size={15} /></button>
                </div>
              </div>

              <CompareStage
                imageA={imageA} imageB={imageB} mode={mode} diffResult={diffResult} diffLoading={diffLoading}
                zoom={zoom} fit={fit} wipe={wipe} opacity={opacity} blinkPlaying={blinkPlaying}
                blinkSpeed={blinkSpeed} showGuides={showGuides} background={background}
                onToggleBlink={() => setBlinkPlaying((value) => !value)}
              />

              <div className="stage-bottom-bar">
                <div className="zoom-controls">
                  <button type="button" disabled={!hasPair || zoom <= 50} onClick={() => setZoom((value) => Math.max(50, value - 10))} title="Zoom out"><ZoomOut size={15} /></button>
                  <span>{zoom}%</span>
                  <button type="button" disabled={!hasPair || zoom >= 200} onClick={() => setZoom((value) => Math.min(200, value + 10))} title="Zoom in"><ZoomIn size={15} /></button>
                  <input aria-label="Zoom level" type="range" min="50" max="200" step="10" value={zoom} disabled={!hasPair} onChange={(event) => setZoom(Number(event.target.value))} />
                  <button type="button" disabled={!hasPair} onClick={() => setZoom(100)} title="Reset zoom"><Maximize2 size={14} /></button>
                </div>
                <span className="stage-bottom-hint">{mode === "wipe" ? "Adjust the reveal position in controls" : mode === "difference" ? "Red highlights indicate changed pixels" : "Zoom is synchronised across both images"}</span>
              </div>
            </div>

            <aside className="inspector">
              <div className="inspector-title">
                <div><SlidersHorizontal size={16} /><h3>Fine controls</h3></div><span>ADJUST</span>
              </div>

              {!hasPair ? (
                <div className="inspector-empty"><ImagePlus size={20} /><p>Upload both images to unlock comparison controls.</p></div>
              ) : (
                <>
                  {mode === "wipe" ? <RangeControl label="Reveal position" value={wipe} min={0} max={100} suffix="%" onChange={setWipe} helper="Reveal image B over image A." /> : null}
                  {mode === "overlay" ? <RangeControl label="Image B opacity" value={opacity} min={0} max={100} suffix="%" onChange={setOpacity} helper="Blend the comparison image over the reference." /> : null}
                  {mode === "difference" ? (
                    <>
                      <RangeControl label="Difference threshold" value={threshold} min={0} max={100} onChange={setThreshold} helper="Ignore small per-channel changes below this level. Lower values reveal more subtle differences." />
                      <div className="diff-summary">
                        <div><span>PIXELS ABOVE THRESHOLD</span><strong>{diffPercent}</strong></div>
                        <div><span>PIXELS MARKED</span><strong>{diffResult ? diffResult.changedPixels.toLocaleString() : "—"}</strong></div>
                      </div>
                      <p className="precision-note"><Info size={13} /> Both images are fitted to a shared canvas before pixel comparison. Different aspect ratios can affect the result.</p>
                    </>
                  ) : null}
                  {mode === "blink" ? (
                    <>
                      <div className="blink-control">
                        <div><span className="control-caption">BLINK PLAYBACK</span><strong>{blinkPlaying ? "Running" : "Paused"}</strong></div>
                        <button type="button" onClick={() => setBlinkPlaying((value) => !value)}>{blinkPlaying ? <Pause size={15} /> : <Play size={15} />}{blinkPlaying ? "Pause" : "Play"}</button>
                      </div>
                      <RangeControl label="Switching speed" value={blinkSpeed} min={1} max={4} suffix=" Hz" onChange={setBlinkSpeed} helper="Higher values switch between A and B more frequently." />
                    </>
                  ) : null}

                  <div className="inspector-divider" />
                  <div className="control-section">
                    <span className="control-caption">CANVAS</span>
                    <label className="select-label" htmlFor="background-select">Background</label>
                    <select id="background-select" value={background} onChange={(event) => setBackground(event.target.value)}>
                      <option value="checker">Checkerboard</option><option value="dark">Dark</option><option value="light">Light</option>
                    </select>
                  </div>
                  <div className="inspector-divider" />
                  <div className="control-section">
                    <span className="control-caption">IMAGE INFORMATION</span>
                    <div className="metadata-pair">
                      <div className="metadata-title"><span className="slot-letter slot-a">A</span><strong>Reference</strong></div>
                      <div className="metadata-line"><span>Dimensions</span><b>{formatDimensions(imageA)}</b></div>
                      <div className="metadata-line"><span>Aspect ratio</span><b>{formatRatio(imageA)}</b></div>
                      <div className="metadata-line"><span>File size</span><b>{formatBytes(imageA.size)}</b></div>
                      <div className="metadata-line"><span>Format</span><b>{imageA.type.split("/")[1]?.toUpperCase() || "IMAGE"}</b></div>
                    </div>
                    <div className="metadata-pair">
                      <div className="metadata-title"><span className="slot-letter slot-b">B</span><strong>Comparison</strong></div>
                      <div className="metadata-line"><span>Dimensions</span><b>{formatDimensions(imageB)}</b></div>
                      <div className="metadata-line"><span>Aspect ratio</span><b>{formatRatio(imageB)}</b></div>
                      <div className="metadata-line"><span>File size</span><b>{formatBytes(imageB.size)}</b></div>
                      <div className="metadata-line"><span>Format</span><b>{imageB.type.split("/")[1]?.toUpperCase() || "IMAGE"}</b></div>
                    </div>
                    <div className={"dimension-status" + (dimensionMatch ? " is-match" : "")}>
                      {dimensionMatch ? <Check size={13} /> : <Info size={13} />}
                      {dimensionMatch ? "Same image dimensions" : "Different image dimensions"}
                    </div>
                  </div>
                </>
              )}
            </aside>
          </div>
        </section>

        <section className="tips-strip">
          <div className="tip-icon"><Info size={17} /></div>
          <div><strong>Quick tip</strong><span>Use <b>Wipe</b> to inspect alignment, <b>Overlay</b> to spot shifts, or <b>Difference</b> to locate changed pixels. Increase the threshold to reduce compression noise.</span></div>
        </section>
      </main>

      <footer className="app-footer">
        <span>PIXELCOMPARE <i /> IMAGE LAB</span>
        <span><ShieldCheck size={13} /> Images are processed locally and are never uploaded.</span>
        <span>BUILT FOR PRECISE VISUAL REVIEW</span>
      </footer>
    </div>
  );
}

export default App;
