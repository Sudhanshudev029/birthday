# A Birthday Surprise 💝

A premium, animated birthday surprise website — password-locked, photo gallery,
memory timeline, flip-card reasons, a secret letter, a wish wall, a blow-out-the-candles
cake, a gift box reveal, and a grand finale. Built with React, Vite, Tailwind CSS,
and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

To build for production / deploy to Vercel:

```bash
npm run build
```

This outputs a static site in `dist/`, ready to drag-and-drop onto Vercel, Netlify,
or any static host.

## Personalize everything in one place

Open `src/config.js` — every piece of content on the site is driven from this single
`CONFIG` object:

- `name` — the birthday person's name
- `password` — the word needed to unlock the site (Page 1)
- `music` — path to a background song, dropped into `public/music/`
- `video` — path to a birthday video, dropped into `public/video/`
- `favoriteSong` — text shown inside the gift box
- `photos` — the polaroid gallery, each with a `src`, `caption`, and `date`
- `timeline` — the memory timeline cards
- `reasons` — the flip cards on the "reasons you're amazing" page
- `letter` — the secret letter text
- `wishes` — the sticky notes on the wish wall
- `candleCount` — how many candles appear on the cake
- `finalMessage` — the closing birthday message

Drop your own photos into `public/photos/` (matching the filenames referenced in
`config.js`, e.g. `1.jpg`, `2.jpg`...) and your song into `public/music/music.mp3`.
If an image is missing, the gallery gracefully falls back to a placeholder icon so
nothing breaks.

## Project structure

```
src/
  components/       one file per page/section
  config.js         all editable content lives here
  App.jsx           orchestrates the step-by-step journey
  index.css         Tailwind + shared utility classes
```

## Notes

- No backend, no database — everything runs client-side.
- Music never autoplays; the floating player in the corner waits for a tap.
- Respects `prefers-reduced-motion` for anyone who has that turned on.
