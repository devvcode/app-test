import { useRef, useState } from "react";
import { FileImage, ImagePlus, RefreshCw, X } from "lucide-react";
import { formatBytes, formatDimensions } from "../utils/imageProcessing.js";

export default function ImageUploadCard({ slot, image, onFile, onRemove }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(files) {
    const file = files && files[0];
    if (file) onFile(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    handleFiles(event.dataTransfer.files);
  }

  return (
    <section
      className={"upload-card" + (dragging ? " is-dragging" : "") + (image ? " has-image" : "")}
      onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false);
      }}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        accept="image/*"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <div className="upload-card-top">
        <div className="upload-slot">
          <span className={"slot-letter slot-" + slot.toLowerCase()}>{slot}</span>
          <div>
            <span className="upload-overline">{slot === "A" ? "REFERENCE" : "COMPARISON"}</span>
            <h2>Image {slot}</h2>
          </div>
        </div>
        {image ? (
          <button className="icon-button subtle" type="button" title="Remove image" aria-label={"Remove image " + slot} onClick={onRemove}>
            <X size={16} />
          </button>
        ) : <span className="upload-empty-status">EMPTY SLOT</span>}
      </div>
      {image ? (
        <div className="uploaded-file">
          <div className="uploaded-thumb"><img src={image.url} alt={"Preview of " + image.name} /></div>
          <div className="uploaded-details">
            <strong title={image.name}>{image.name}</strong>
            <span><FileImage size={13} /> {formatDimensions(image)} px</span>
            <span>{formatBytes(image.size)} <i /> {image.type.split("/")[1]?.toUpperCase() || "IMAGE"}</span>
          </div>
          <button className="replace-button" type="button" onClick={() => inputRef.current?.click()}>
            <RefreshCw size={14} /> Replace
          </button>
        </div>
      ) : (
        <button className="upload-dropzone" type="button" onClick={() => inputRef.current?.click()}>
          <span className="upload-icon"><ImagePlus size={23} /></span>
          <span className="upload-main">Drop an image here or <b>browse</b></span>
          <span className="upload-hint">PNG, JPG, WebP, GIF · Up to 30 MB</span>
        </button>
      )}
    </section>
  );
}
