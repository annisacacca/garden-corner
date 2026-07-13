# Annisa's Little World 🌿

A cozy, scrapbook-style personal website — built with React, Vite, Tailwind CSS,
and Framer Motion. Soft green & cream cottagecore theme, floating paper navigation,
a custom leaf cursor, a frog loading screen, and ten fully themed pages.

## Getting started

This project was generated without network access, so dependencies are **not**
installed yet. On your own machine, with internet access:

```bash
cd annisa-world
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Deploying to Vercel

This project is Vercel-ready out of the box (`vercel.json` handles SPA routing
for React Router). Push to a GitHub repo and import it in Vercel, or run:

```bash
npx vercel
```

## What's inside

```
src/
  components/
    layout/       FloatingNav, MusicPlayer, Footer, PageTransition
    ui/            CustomCursor, LoadingScreen, FloatingDecor, StickyNote,
                    PolaroidCard, WashiTape, SectionHeading
  context/         MusicContext (global background-music state)
  data/            Placeholder content for projects, experience, certificates,
                    gallery, hobbies, playlist — edit these files first
  lib/             useLenis.js (smooth scroll)
  pages/           Home, About, Projects, Experience, Certificates, Gallery,
                    Hobbies, Music, Guestbook, Contact, NotFound
```

## Things to customize before publishing

1. **Photos** — replace the placeholder boxes in `Home.jsx`, `Gallery.jsx`,
   `Certificates.jsx` with real `<img>` sources (drop files in `public/` or
   `src/assets/` and import/reference them).
2. **Text** — every page pulls placeholder copy either inline or from
   `src/data/*.js`. Search for "placeholder" to find every spot.
3. **Music**
   - Floating mini-player: add real audio files to `public/audio/` and update
     `src/data/playlist.js`.
   - Music Room page: swap `spotifyEmbedUrl` in `src/data/playlist.js` for your
     own playlist's embed URL (Spotify → Share → Embed playlist).
4. **Social links** — update `href`s in `Footer.jsx` and `Contact.jsx`.
5. **Guestbook** — currently stores messages in local component state only
   (resets on refresh). Wire it to a real backend (Supabase, Firebase, or a
   small serverless API route) to persist entries.
6. **Colors/fonts** — all theme tokens live in `tailwind.config.js` under
   `theme.extend.colors` / `fontFamily` if you want to nudge the palette.

## Notes on browser autoplay

Browsers block audio with sound from autoplaying until the visitor interacts
with the page. The site starts background music on the very first click/tap
anywhere, which satisfies that requirement while still feeling automatic.

## Accessibility & performance

- Respects `prefers-reduced-motion` (custom cursor, ambient decorations, and
  CSS animations shorten automatically).
- Custom cursor is disabled on touch devices.
- Routes are ready for `React.lazy` code-splitting if the site grows further.
- Images should be lazy-loaded (`loading="lazy"` already set on gallery/polaroid
  images) — do the same for any photos you add.
