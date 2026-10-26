# Akash R — Neural Odyssey

A cinematic, responsive portfolio for Akash R, an aspiring Machine Learning Engineer. The experience pairs a red-led 20-color system with CSS/SVG motion, an interactive technical map, verified project case studies, and an educational machine-learning workflow. It does not use WebGL or a 3D renderer.

## Technology

- React 19 and TypeScript
- Vite 8 and TanStack Start
- Tailwind CSS 4
- Netlify TanStack Start adapter

## Requirements

- Node.js 22 or newer
- npm

## Development and production

```sh
npm install
npm run dev
npm test
npm run build
```

The Netlify adapter writes the server function to `.netlify/v1/functions/server.mjs`. Static client assets are emitted to `dist/client`. The production build command is `npm run build`; Netlify publishes `dist/client`. `netlify.toml` sets the Lambda runtime to Node.js 22.

## Project structure

- `src/content/portfolio.ts` — profile, section copy, skills, projects, education, and navigation data
- `src/components/universe/Sections.tsx` — portfolio sections and interactions
- `src/routes/index.tsx` — portfolio composition and lightweight SVG/CSS backdrop
- `src/components/universe/VideoModal.tsx` — on-demand Used Car demo player
- `src/components/universe/BootLoader.tsx` — short, skippable portrait-aware intro
- `src/lib/theme-engine.ts` — 20-color ambient palette and reduced-motion-aware cycling
- `src/lib/sound.ts` — optional interface sound controls
- `assets-originals/` — original portrait and Used Car demo media
- `netlify.toml` — Netlify build, publish, and Node runtime settings

## Updating portfolio content

Edit `src/content/portfolio.ts`:

- Update `profile` and `portfolioCopy` for profile and section text.
- Update `skills` with technologies and methods supported by your actual experience.
- Update `projects` with verified summaries, details, and repository URLs. Only the Used Car project currently has a demo video.
- Update `education` with accurate qualifications and dates. There is no certification data in this project.
- Update `sections` if you add or rename a page section; keep its IDs in sync with the section components.
- Update `portfolioCopy.pipeline.stages` to edit the interactive machine-learning workflow.

## Replacing local media

- Replace `assets-originals/akash-optimized.webp` to update the optimized genuine profile photo. Keep the filename, or update the Vite `?url` import in `src/components/universe/Sections.tsx`. The original `akash.png` is retained in `assets-originals/`.
- Replace `assets-originals/used-car-demo.mp4` and `assets-originals/used-car-poster.jpg` to update the Used Car demo. Keep the filenames, or update their Vite `?url` imports in `src/components/universe/VideoModal.tsx` and `Sections.tsx`.
- Vite emits imported assets into `dist/client/assets` with content-hashed filenames. Do not use Lovable-only asset metadata URLs for Netlify.

## Colors, motion, and audio

- Modify the 20-color palette in `src/styles.css` and its ambient rotation in `src/lib/theme-engine.ts`. Crimson remains the primary action color; the ambient color rotation is disabled for users who request reduced motion.
- `src/styles.css` contains the dark visual theme, typography, shared utilities, and reduced-motion styles.
- The site has no background music. Interface sounds are off by default and have a volume control; browser audio restrictions should not prevent the site from working.
- Background lighting and network lines use CSS gradients and SVG. There is no suitable cinematic background video in the supplied assets; the 14 MB Used Car demo stays an on-demand project video rather than being reused as a background. No WebGL check, canvas scene, or 3D renderer is required.

## Checks and troubleshooting

- `npm test` runs the Vitest suite.
- `npm run build` runs the Vite client and SSR production builds through the Netlify adapter.
- For a missing photo or demo, verify the original file exists in `assets-originals/`, rebuild, and check the generated request under `dist/client/assets`.
- Add a verified resume file and contact email before adding those links to the portfolio. The project currently contains neither.
- A Movie Success Prediction project is not present in the current portfolio data or verified repository list; add it only after confirming its repository and details.
- The original portrait files are opaque RGB images rather than transparent cutouts. The portfolio preserves and frames the genuine optimized portrait; no automated background removal has been applied.
