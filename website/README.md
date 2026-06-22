# Dear Akka — Marketing Website

The public marketing / content website for **Dear Akka**, a women's health
companion app by **Sundaram Medical Foundation (SMF)**, Chennai. This is the
"front door" that markets the app and links into it — separate from the app
product itself (which lives in the parent Expo project and deploys to
`nikth007.github.io/dearakka/`).

## Stack

- **React 18** + **Vite 5**
- **React Router v6** (multi-page, client-side routing)
- **Framer Motion** for scroll/enter animations
- **react-helmet-async** for per-page SEO
- All logos, icons and illustrations are **inline SVG** (no image placeholders)
- Bilingual scaffolding: **English / தமிழ் (Tamil)** via a lightweight context

## Develop

```bash
cd website
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to website/dist
npm run preview  # preview the production build
```

## Pages

- `/` — Home (flagship: hero, features, product tabs, privacy, science,
  testimonials, plans, mission, CTA)
- `/products/{period-tracking,mood-mind,symptom-tracking,predictions,ask-akka}`
- `/health-library` + `/health-library/:category` + `/health-library/:category/:article`
  (6 categories, 18 full articles)
- `/about` — About Akka
- `/login`, `/signup` — Auth (full-screen; see backend note below)
- `/privacy`, `/terms`, `/cookies`, `/medical-disclaimer` — Legal

## Deployment

- **Vercel / Netlify:** SPA rewrites are configured in `vercel.json`
  (Netlify: add a `_redirects` file with `/* /index.html 200`). Default
  Vite `base` is `/`.
- **GitHub Pages project site:** build with a base path and the `404.html`
  SPA fallback (in `public/`) handles deep links:
  ```bash
  SITE_BASE=/your-repo/ npm run build
  ```

## To wire up later

- **Logo:** `src/components/Logo.jsx` contains a placeholder wordmark + symbol
  designed to be swapped for the user's own Claude-designed logo. Keep the same
  props (`size`, `tone`, `variant`) and the whole site picks up the new mark.
- **Auth backend:** `src/pages/Auth.jsx` → `submitAuth()` is a clearly-marked
  stub. Replace it with real `fetch` calls to the Neon/Postgres auth endpoints
  (`POST /api/auth/signup`, `POST /api/auth/login`). Until then it validates
  input and routes the user into the on-device app.
- **App screenshots:** `src/components/PhoneMockup.jsx` renders on-brand
  representations of the app UI inside device frames. Swap in real screenshots
  later if desired by replacing the inner screen components.
