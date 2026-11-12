# PixelCompare — Image Lab

A browser-based image comparison workspace in the React Collections monorepo.

## Features

- Drag-and-drop or file-picker upload for two local images (up to 30 MB each).
- Side-by-side, wipe, opacity overlay, blink and pixel-difference heatmap modes.
- Adjustable wipe position, overlay opacity, difference threshold and blink speed.
- Synchronized zoom, fit/fill, alignment guides and configurable canvas background.
- Image metadata: dimensions, aspect ratio, format and file size.
- Export the current comparison or the difference heatmap as a PNG.
- No backend, account, upload endpoint or remote image storage. Image files are processed locally in the browser.

## Run

From the repository root:

    npm install
    npm run dev --workspace=image-comparison

To build only this app:

    npm run build --workspace=image-comparison

The root workspace build discovers this app automatically and deploys it under the image-comparison path.

## Difference mode

Both images are decoded locally and drawn, using contain-fit, onto a shared canvas. The app calculates the maximum per-channel pixel delta and marks pixels above the chosen threshold in red. The heatmap canvas is capped at approximately 1.8 million pixels to keep browser memory use bounded.

The difference view is a visual comparison aid, not a forensic image-authenticity or colour-managed analysis tool.
