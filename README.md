# EIDOS Design Studio

Website for EIDOS Design Studio — architecture, interior design and BIM services.

Built with Next.js 16 (App Router), React 19 and Tailwind v4.

## Running locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

Node 20.9 or newer.

## Deploying

The project is a standard Next.js app, so Vercel needs no configuration —
import the repository and it will detect the framework, run `next build`, and
deploy. No environment variables are required.

## Brand

Eight colours, defined once as CSS custom properties at the top of
`app/globals.css`. Nothing outside this set is used anywhere in the build.

| Role | Colour | Hex |
| --- | --- | --- |
| Primary dark | Charcoal Black | `#222222` |
| Deep dark | Midnight Charcoal | `#15171B` |
| Primary accent | EIDOS Orange | `#F98111` |
| Secondary accent | Deep Burgundy | `#661724` |
| Earth accent | Burnt Terracotta | `#A05327` |
| Light neutral | Warm Cream | `#F4DECA` |
| Muted neutral | Warm Taupe | `#8F5D50` |
| Text neutral | Warm Off-White | `#F5F0E8` |

Decorative shapes are drawn in CSS from these tokens rather than shipped as
images, so the palette cannot drift out of sync with the brand.

## Motion

Pacing lives in one place: `app/motionConfig.ts`.

The file separates two things that are easy to conflate:

- **Response** — how quickly the interface reacts to a touch. Kept instant
  (100ms press feedback) and not tuned as a matter of taste.
- **Narrative** — how long a story beat takes to play. This is the
  `home.*ViewportHeights` values and the duration fields, and it is where
  pacing is adjusted.

The homepage chapters are scroll-scrubbed rather than time-based: the
animation is driven by scroll position through `requestAnimationFrame`, so
raising a chapter's `ViewportHeights` spreads the same beats over more scroll
and the story reads slower without anything being cut. The matching `svh`
overrides in the `globals.css` media queries must move with them.

`app/useSpring.ts` is a small interruptible spring used by the mobile menu.
Unlike a CSS transition, it can be reversed mid-flight — it carries both
position and velocity through a re-target, so tapping the menu button while
the panel is still moving reverses from wherever it is instead of finishing
first.

## Accessibility

- `prefers-reduced-motion` — the pinned horizontal chapters reflow into
  stacked vertical panels rather than simply freezing.
- `prefers-reduced-transparency` — frosted surfaces become solid.
- `prefers-contrast: more` — solid backgrounds with defined borders.
- The type scale is in `rem`, so browser text-size settings scale the layout.
- Touch targets meet the 44px minimum via hit-area padding that does not
  change the visual size.

## Still to replace

- `app/contact-us/page.tsx` — the email address is a placeholder.
- `public/images/projects/` — placeholder photography.
- `app/data.ts` — projects, awards and press entries are placeholder content.
