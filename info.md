# OnSKILL Next.js Codebase Deep Documentation

## 1) Project Purpose
OnSKILL is a marketing + onboarding web app for a skill-certification platform.
It contains:
- a landing experience that explains the ecosystem
- an auth page with login/signup UX
- a WalkWays page that visualizes guided progression tracks
- reusable UI primitives (shadcn/Radix-based)

## 2) Stack and Runtime
- Framework: Next.js 16 (App Router)
- UI: React 19 + TypeScript + Tailwind CSS v4 + custom inline styles
- Component primitives: Radix UI + shadcn-style wrappers in `src/components/ui`
- Styling strategy: tokenized CSS variables in `src/styles.css` + per-component inline style objects
- Routing: file-based routes in `src/app/*`
- Build/lint: `npm run build`, ESLint + Prettier

## 3) Startup and Request Flow
1. `src/app/layout.tsx` loads global CSS, metadata, and font links.
2. Route entrypoints in `src/app/*/page.tsx` render view components from `src/views/*`.
3. Views compose shared components (`Navbar`, `StatsTicker`, `WalkWaysRoadmap`, etc.) and local section functions.
4. Client interactivity uses hooks (`useTypewriter`, `useScrollReveal`) and browser APIs (`IntersectionObserver`, `matchMedia`, `scrollIntoView`).

## 4) Feature Ownership Matrix

### Core user-facing features -> owning code
- Global shell + metadata + icon + fonts:
  - `src/app/layout.tsx`
- Home page route + SEO:
  - `src/app/page.tsx`
- Auth route + SEO:
  - `src/app/auth/page.tsx`
- WalkWays route + SEO:
  - `src/app/walkways/page.tsx`
- 404 handling:
  - `src/app/not-found.tsx`
- Runtime error boundary UI:
  - `src/app/error.tsx`
- Sticky navbar + desktop/mobile navigation:
  - `src/components/Navbar.tsx`
- Hero section, trusted logos, platform sections, footer:
  - `src/views/Landing.tsx`
- Ticker strip under hero:
  - `src/components/StatsTicker.tsx`
- Assessment carousel and flipping cards:
  - `src/components/AssessmentFlipCarousel.tsx`
- WalkWays animated roadmap visualization:
  - `src/components/WalkWaysRoadmap.tsx`
- Auth login/signup forms and validation UX:
  - `src/views/Auth.tsx`
- WalkWays track cards and CTA flow:
  - `src/views/WalkWays.tsx`
- Data sources for assessments/stats/roadmap:
  - `src/data/assessments.ts`
  - `src/data/stats.ts`
  - `src/data/roadmap.ts`
- Animation helper hooks:
  - `src/hooks/useTypewriter.ts`
  - `src/hooks/useScrollReveal.ts`

## 5) File-by-File Documentation (complete inventory)

## Root configuration files

### `package.json`
Responsibilities:
- Defines scripts: `dev`, `build`, `start`, `lint`, `format`.
- Declares Next/React/Tailwind/Radix dependencies.
- Declares TypeScript + ESLint + Prettier dev dependencies.

Feature impact:
- Determines build pipeline, runtime packages, and linting/formatting behavior.

### `tsconfig.json`
Responsibilities:
- Strict TypeScript mode (`strict: true`, `noEmit: true`).
- App Router-friendly settings (`moduleResolution: bundler`, `jsx: react-jsx`).
- Path alias mapping: `@/* -> ./src/*`.

Feature impact:
- Affects type safety and import ergonomics across entire app.

### `next.config.ts`
Responsibilities:
- Exports Next config object (currently minimal/empty).

Feature impact:
- Extension point for future Next runtime features.

### `eslint.config.js`
Responsibilities:
- Enables JS + TS linting, React hooks rules, refresh safety rules.
- Integrates Prettier recommended config.

Feature impact:
- Enforces code quality and consistency.

### `postcss.config.mjs`
Responsibilities:
- Enables `@tailwindcss/postcss` plugin.

Feature impact:
- Required for Tailwind CSS processing.

### `components.json`
Responsibilities:
- shadcn tooling metadata (style preset, aliases, css file path).

Feature impact:
- Governs generation/organization of reusable UI primitives.

## Global style system

### `src/styles.css`
Responsibilities:
- Defines design tokens (`--color-*`, `--radius-*`, `--shadow-*`).
- Defines keyframes: `fadeUp`, `fadeIn`, `float`, `blink`, `ticker`, `pulse-ring`, `blob-drift`.
- Global typography defaults for body/headings.
- Utility classes for animation and UX (`no-scrollbar`, `story-link`, `pg-select`).
- Reduced-motion accessibility guard via media query.

Feature impact:
- Central styling contract used by all views/components.

## App routes and entrypoints

### `src/app/layout.tsx`
Responsibilities:
- Global metadata (title/description/OpenGraph/Twitter/icon).
- Loads Google fonts via `<link>` tags.
- Wraps all pages in root html/body.

Feature impact:
- Global SEO, browser tab identity, and typography loading.

### `src/app/page.tsx`
Responsibilities:
- Home metadata override.
- Renders `Landing` view.

Feature impact:
- Homepage composition + SEO.

### `src/app/auth/page.tsx`
Responsibilities:
- Auth page metadata.
- Renders `Auth` view.

Feature impact:
- Auth entry UX + SEO.

### `src/app/walkways/page.tsx`
Responsibilities:
- WalkWays metadata.
- Renders `WalkWays` view.

Feature impact:
- WalkWays page UX + SEO.

### `src/app/error.tsx`
Responsibilities:
- Client-side error boundary screen.
- Logs error in development.
- Allows reset/retry and home navigation.

Feature impact:
- Runtime resilience and fallback UX.

### `src/app/not-found.tsx`
Responsibilities:
- 404 screen with return-home action.

Feature impact:
- Better user recovery for unknown paths.

## Data modules

### `src/data/assessments.ts`
Responsibilities:
- Types: `Difficulty`, `Assessment`.
- `ASSESSMENTS` array backing carousel content.

Feature impact:
- Controls assessment names, difficulty badges, pricing, outcomes proven, duration.

### `src/data/roadmap.ts`
Responsibilities:
- Type: `RoadmapNode`.
- `ROADMAP_NODES` coordinates, labels, states.
- `ROADMAP_PATH` SVG bezier path string.

Feature impact:
- Drives rendered roadmap geometry and node metadata.

### `src/data/stats.ts`
Responsibilities:
- `STATS_DATA` list consumed by ticker.

Feature impact:
- Controls ticker text content and cadence payload.

## Hooks and utility

### `src/hooks/useTypewriter.ts`
Responsibilities:
- Cycles through provided words on interval.
- Brief hide/show transition before switching word.

Feature impact:
- Hero animated keyword text effect.

### `src/hooks/useScrollReveal.ts`
Responsibilities:
- `IntersectionObserver`-powered fade-up reveal.
- Adds animation once when element enters viewport.

Feature impact:
- Product section entrance motion behavior.

### `src/hooks/use-mobile.tsx`
Responsibilities:
- Detects mobile viewport using `matchMedia`.

Feature impact:
- Responsive state helper (currently not central in main views).

### `src/lib/utils.ts`
Responsibilities:
- `cn(...)` utility combining `clsx` + `tailwind-merge`.

Feature impact:
- Classname composition utility for UI primitives.

## Shared functional components

### `src/components/Navbar.tsx`
Responsibilities:
- Sticky top nav with blur/glass effect.
- Desktop nav links + section scrolling behavior.
- Mobile menu toggle and overlay drawer.
- Auth navigation buttons.

Feature impact:
- Global primary navigation and route/section jumps.

### `src/components/StatsTicker.tsx`
Responsibilities:
- Repeating horizontal ticker of stat pills.
- Pause animation on hover.

Feature impact:
- Continuous social-proof and platform-metrics strip.

### `src/components/AssessmentFlipCarousel.tsx`
Responsibilities:
- Difficulty color map.
- Icon selection by assessment keyword.
- Flip cards with front/back states.
- Auto-advance with pause-on-hover.
- Prev/next controls and pagination dots.

Feature impact:
- Interactive assessment showcase and conversion UX.

### `src/components/WalkWaysRoadmap.tsx`
Responsibilities:
- Animated SVG path drawing using measured path length.
- Node rendering and hover descriptions.
- Intersection-based one-time draw trigger.

Feature impact:
- Visual progression narrative for WalkWays journey.

## View files (page-level compositions)

### `src/views/Landing.tsx`
Major sections:
- `Hero()`
- `TagPill()`
- `ProductSection()` template
- `BaseGroundMockup()`
- `ProvingGroundMockup()`
- `XoneMockup()`
- `WalkWaysMiniMockup()`
- `CountUp()` + `WhyStats()`
- `FinalCTA()`
- `Footer()`
- `Landing()` root composition

Feature impact:
- Entire home experience and multi-section storytelling funnel.

### `src/views/Auth.tsx`
Major functions:
- `getStrength()` password scoring
- `FloatingInput()`, `FloatingSelect()` form controls
- `Toast()` success notice
- `LoginForm()`, `SignupForm()`
- `Auth()` two-column page shell and tab switching

Feature impact:
- Authentication onboarding UX and local form validation flows.

### `src/views/WalkWays.tsx`
Major parts:
- `TRACKS` static list of role tracks
- `WalkWays()` composition with header, roadmap, CTA, track cards

Feature impact:
- Dedicated walkways explainer and track discovery experience.

## UI primitives (`src/components/ui/*`)
These are reusable shadcn/Radix wrappers and are infrastructure for future feature building.

### Navigation and overlays
- `accordion.tsx`: collapsible content sections.
- `alert-dialog.tsx`: destructive/confirmation modal dialogs.
- `context-menu.tsx`: right-click context menu.
- `dialog.tsx`: modal dialog primitives.
- `drawer.tsx`: bottom/side drawer overlays.
- `dropdown-menu.tsx`: anchored menu popovers.
- `hover-card.tsx`: hover-triggered card popovers.
- `menubar.tsx`: desktop app-style menubar.
- `navigation-menu.tsx`: nav menu primitives.
- `popover.tsx`: generic floating popover.
- `sheet.tsx`: sheet/drawer panel.
- `tooltip.tsx`: hover tooltip primitives.

### Inputs and forms
- `button.tsx`: button variants and styles.
- `checkbox.tsx`: checkbox input.
- `form.tsx`: form context + field helpers.
- `input.tsx`: text input control.
- `input-otp.tsx`: OTP segmented input.
- `label.tsx`: form label primitive.
- `radio-group.tsx`: radio group input.
- `select.tsx`: select/dropdown input.
- `slider.tsx`: range slider input.
- `switch.tsx`: toggle switch input.
- `textarea.tsx`: multiline input.
- `toggle.tsx`: single toggle button.
- `toggle-group.tsx`: grouped toggles.

### Layout, display, and feedback
- `alert.tsx`: inline alert banners.
- `aspect-ratio.tsx`: fixed aspect container.
- `avatar.tsx`: image avatar primitive.
- `badge.tsx`: status/category badges.
- `breadcrumb.tsx`: breadcrumb navigation.
- `calendar.tsx`: date-picker/calendar UI.
- `card.tsx`: card container primitives.
- `carousel.tsx`: embla-based carousel wrappers.
- `chart.tsx`: chart wrapper helper components.
- `collapsible.tsx`: open/close content regions.
- `command.tsx`: command palette UI.
- `pagination.tsx`: pagination control components.
- `progress.tsx`: progress bar.
- `resizable.tsx`: resizable panel groups.
- `scroll-area.tsx`: custom scrollable area.
- `separator.tsx`: horizontal/vertical separators.
- `sidebar.tsx`: sidebar scaffold primitives.
- `skeleton.tsx`: loading skeleton placeholders.
- `sonner.tsx`: toast notification wrapper.
- `table.tsx`: table markup primitives.
- `tabs.tsx`: tabbed interface primitives.

Note:
- In the current product pages (`Landing`, `Auth`, `WalkWays`), most UI behavior is custom-styled directly and does not heavily consume these primitives yet.

## 6) Grouped line-by-line walkthrough (core runtime files)
This section documents what each meaningful code block does in execution order, approximating line-level intent.

### `src/views/Landing.tsx` block walkthrough
1. Imports (top of file): wire router, shared components, and animation hooks.
2. `Hero`:
   - Initializes router and animated typewriter state.
   - Creates full-screen intro section with animated gradient/blob background.
   - Renders message hierarchy (badge -> headline -> subtext -> CTA).
   - Trusted logo strip renders brand list and hover opacity behavior.
3. `TagPill`: helper for section labels.
4. `ProductSection`: reusable two-column section renderer with reveal animation.
5. `BaseGroundMockup`: learning progress module cards and milestone bar.
6. `ProvingGroundMockup`: simulated coding test with timer, prompt, code editor, actions.
7. `XoneMockup`: verified skill chips and matched opportunities list.
8. `WalkWaysMiniMockup`: mini timeline of progression states and percent completion.
9. `CountUp`: intersection-triggered animated counter.
10. `WhyStats`: value proposition panel + metric cards using `CountUp`.
11. `FinalCTA`: dark high-contrast conversion section.
12. `Footer`: links, social buttons, copyright, legal links.
13. `Landing` root:
   - Composes full page in sequence:
     `Navbar` -> `Hero` -> `StatsTicker` -> `AssessmentFlipCarousel` -> platform sections -> `WalkWaysRoadmap` -> stats -> CTA -> footer.

### `src/views/Auth.tsx` block walkthrough
1. Imports and `Tab` union define login/signup mode.
2. `getStrength`: scores password against 4 rules.
3. `FloatingInput`: animated label input primitive.
4. `FloatingSelect`: animated label select primitive.
5. `Toast`: temporary success notification lifecycle.
6. `LoginForm`:
   - Controls username/password state.
   - Password visibility toggle.
   - Social sign-in placeholders.
   - Tab-switch action to signup.
7. `SignupForm`:
   - Captures profile/contact/track/password/terms state.
   - Shows password strength meter and confirmation mismatch feedback.
   - Disables submit until terms accepted and passwords match.
8. `Auth` page:
   - Left pane: back navigation + tab switch + chosen form.
   - Right pane (desktop): marketing card with progress visualization.
   - Toast mounted globally.

### `src/views/WalkWays.tsx` block walkthrough
1. Defines `Track` interface and `TRACKS` dataset.
2. `WalkWays`:
   - Renders `Navbar`.
   - Header with mission copy and smooth-scroll button to tracks.
   - Renders full `WalkWaysRoadmap` visualization.
   - Primary CTA to auth page.
   - Track-card grid with tech badges and per-track CTA.

### `src/components/AssessmentFlipCarousel.tsx` block walkthrough
1. Difficulty-style map chooses badge colors.
2. `IconForAssessment` chooses SVG glyph by keyword matching.
3. `FlipCard`:
   - Front face: summary, difficulty, tagline, price.
   - Back face: proven skills, duration, purchase CTA.
   - Click flips card with 3D transform.
4. Carousel root:
   - Keeps centered index state.
   - Auto-rotates every 3.5s unless hovered.
   - Renders only center +/-1 cards for focus/perf.
   - Prev/next controls and clickable pagination dots.

### `src/components/WalkWaysRoadmap.tsx` block walkthrough
1. Measures SVG path length after mount.
2. Starts draw animation once section enters viewport.
3. Renders ghost path + animated colored path.
4. Renders nodes from `ROADMAP_NODES` with staggered appearance.
5. Hovering node reveals descriptive microcopy and changes label emphasis.

## 7) Feature-to-functionality responsibility list

### Navigation and routing
- Route pages: `src/app/*/page.tsx`
- Top-level nav and section jumps: `src/components/Navbar.tsx`

### Marketing/storytelling surfaces
- Landing hero and product sections: `src/views/Landing.tsx`
- Metrics ticker: `src/components/StatsTicker.tsx`
- Footer and final CTA: `src/views/Landing.tsx`

### Skill proof experience simulation
- Assessment interaction carousel: `src/components/AssessmentFlipCarousel.tsx`
- Assessment source data: `src/data/assessments.ts`

### Learning roadmap visualization
- Main roadmap visual component: `src/components/WalkWaysRoadmap.tsx`
- Roadmap coordinates/copy/path: `src/data/roadmap.ts`
- WalkWays page orchestration: `src/views/WalkWays.tsx`

### Auth and account onboarding UX
- Login/signup forms + validation: `src/views/Auth.tsx`
- Auth route entry and metadata: `src/app/auth/page.tsx`

### Animations and reveal behavior
- Global keyframes/utilities: `src/styles.css`
- Typewriter effect: `src/hooks/useTypewriter.ts`
- Scroll-triggered reveal: `src/hooks/useScrollReveal.ts`

### Design system foundation
- Theme tokens + spacing/radius/shadows: `src/styles.css`
- Reusable utility helper: `src/lib/utils.ts`
- UI primitive library: `src/components/ui/*`

## 8) Current architectural notes
- Most product pages use explicit inline styling for precise brand control.
- `src/components/ui/*` is available as a scalable component library but currently under-utilized by top-level views.
- The app is entirely client-rendered for these views (`"use client"` in major files), favoring rich interactive behavior.

## 9) Suggested maintenance workflow
1. Update `src/data/*` when changing content payloads.
2. Keep shared visual tokens in `src/styles.css` to avoid style drift.
3. Keep route-level metadata current in each `src/app/*/page.tsx`.
4. When adding new interactive sections, prefer extracting local helper functions inside the relevant `src/views/*` file first, then promote to `src/components/*` if reused.

---
This document is intended to be exhaustive for the current repository state and maps all existing files to responsibilities and features.