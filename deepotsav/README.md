# Deepotsav — A Celebration of Light

An independent React + Vite workspace for a Diwali celebration microsite. The experience includes a cinematic photo carousel, a year-aware Diwali date and countdown, a filtered photo gallery, a five-part festival overview, interactive diyas and a shareable greeting.

## Run from the repository root

\`\`\`bash
npm install
npm run dev --workspace=deepotsav
\`\`\`

Build this workspace directly:

\`\`\`bash
npm run build --workspace=deepotsav
\`\`\`

The repository's root build automatically discovers this workspace and publishes it at \`/deepotsav/\`. Its homepage card is generated from the \`appTestLab\` metadata in \`package.json\`; no root homepage edit is required.

## Diwali date logic

The app uses a published India festival date table for 2026–2036 and the \`Asia/Kolkata\` timezone. It selects the next Diwali date relative to the current Indian calendar date. On Diwali itself, it displays the current year's celebration; after the date passes, it moves to the next year's celebration.

Festival dates are tied to the lunar calendar and local Panchang observance can vary by location and tradition. The dates shown are an India-wide reference, not a location-specific muhurat or ritual timing. Dates after 2036 are left as to-be-announced rather than guessed.

Reference calendars:
- [India Diwali observances — timeanddate](https://www.timeanddate.com/holidays/india/diwali)
- [Diwali dates 2025–2036 — Udaya](https://udaya.app/festival/diwali/)
- [Central Government holiday list for 2027 — Department of Personnel & Training order](https://dearcolleague.in/official-orders/61c0af4eb476d7696d14cd3771ce944aa00805ac9084ce26026c3e2f280436f7)

## Photography credits

The photographs are served as Wikimedia Commons thumbnails. They remain linked to their original file pages. Credits and licence details are also displayed in the site footer.

- **Diwali Celebration 01.jpg** — Arnav, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). [Original file](https://commons.wikimedia.org/wiki/File:Diwali_Celebration_01.jpg).
- **The Diwali Diya.jpg** — Ramesh NG, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/). [Original file](https://commons.wikimedia.org/wiki/File:The_Diwali_Diya.jpg).
- **Diwali Fireworks.jpg** — Wind Hashira, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). [Original file](https://commons.wikimedia.org/wiki/File:Diwali_Fireworks.jpg).
- **Rangoli during diwali.jpg** — Sunidhi243, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). [Original file](https://commons.wikimedia.org/wiki/File:Rangoli_during_diwali.jpg).
- **Rangoli and Diya.jpg** — Kushal Patel 07, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). [Original file](https://commons.wikimedia.org/wiki/File:Rangoli_and_Diya.jpg).

No image is represented as our original work. The gallery captions are editorial descriptions written for this project. Share-alike terms apply to the licensed photographs and adaptations of them.

## Accessibility and behaviour

- The carousel provides previous/next controls, slide selection and pause/resume.
- Automatic transitions stop for reduced-motion preferences and while the carousel is hovered or keyboard-focused.
- All gallery photographs have descriptive alternative text.
- Interactive diyas and greeting controls are keyboard accessible.
- No sound or rapid flashing effects are used.
