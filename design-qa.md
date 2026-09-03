# UPINKING Design QA

## Comparison target

- Source visual truth: `D:\code\blog-website\design-reference.png`
- Rendered implementation: `D:\code\blog-website\qa-home-desktop-final.png`
- Full-view comparison: `D:\code\blog-website\qa-comparison-final.jpg`
- Focused title/hero comparison: `D:\code\blog-website\qa-focus-title-final.jpg`
- Responsive evidence: `qa-home-mobile-final.png`, `qa-articles-mobile.png`, `qa-article-mobile.png`, `qa-lab-mobile-final.png`
- Route/state: `/`, initial desktop state; additional mobile checks for `/`, `/articles`, `/articles/maxwell-equations`, and `/lab`

## Viewport and normalization

- Source: 1487×1058 px, density 1× reference artwork.
- Desktop browser viewport: 1440×1024 CSS px, device scale factor 1. The in-app browser capture excludes its surrounding UI and produced 1426×937 px page evidence.
- Mobile browser viewport: 390×844 CSS px, device scale factor 1; captured content area is 375×812 px after browser chrome/scrollbar exclusion.
- For the combined comparison, the source was normalized to the implementation capture size, 1426×937 px. Both halves are presented in one 2852×937 px input.
- The focused comparison uses the same normalized images and the same 900×320 px hero crop from each half.

## Required fidelity surfaces

- Fonts and typography: Noto Serif SC reproduces the strong editorial Chinese display treatment; Inter handles labels and metadata. Final title scale, wrapping, leading, and label tracking align with the reference hierarchy.
- Spacing and layout rhythm: fixed navigation rail, hero/notes split, paper transition, dividers, and compact metadata match the reference structure. Short desktop heights receive a compact hero/notes treatment; mobile becomes a single readable flow.
- Colors and tokens: graphite `#070d14`, warm paper `#f0ede4`, blueprint blue `#3f8cff`, and signal orange `#ff8a1f` are consistently tokenized and preserve contrast.
- Image quality and asset fidelity: the hero, architecture field, and project texture are generated raster assets rather than CSS/SVG substitutes. Article/public copies are compressed WebP; Astro optimizes source imports responsively.
- Copy and content: UPINKING identity, field-note framing, project descriptions, tool privacy copy, and seven article summaries are coherent and specific to the product.
- Icons and controls: one Phosphor family is used across project and laboratory controls; focus rings, active states, and semantic labels are present.

## Findings and comparison history

### Iteration 1 — blocked

- [P1] Desktop hero title wrapped into three lines and changed the first-screen hierarchy.
  - Fix: widened the copy layer, reduced the display scale, and kept the desktop title on one line while preserving the intentional two-line mobile title.
- [P2] At short desktop heights the fixed hero occupied too much of the fold.
  - Fix: added a height-aware 56vh compact state and condensed Field Notes without removing content.
- [P2] The mobile laboratory tab strip showed browser scrollbars and hid the fourth module.
  - Fix: fitted four equal-width modules into the available row and removed overflow.
- [P2] Chinese table-of-contents IDs produced an invalid selector and stopped the article enhancement script.
  - Fix: resolved headings with decoded `getElementById`; a fresh article tab then reported no console errors and code copy worked.

### Iteration 2 — passed

- Post-fix full-view evidence: `qa-comparison-final.jpg`.
- Post-fix focused evidence: `qa-focus-title-final.jpg`.
- No actionable P0/P1/P2 visual differences remain.
- Acceptable/P3 difference: the featured paper panel favors live article summary and reading CTA over the reference's decorative progress micro-chart. The hierarchy, palette, and paper transition remain faithful, and no fake diagram was introduced.

## Interaction and resilience checks

- Article search returned exactly one Maxwell result; category/search states remain keyboard reachable.
- KaTeX rendered five math groups; React article exposed four code-copy buttons and showed successful copy feedback.
- GitHub project cards exposed the three specified repository URLs and used live data during the check; snapshot merge behavior is unit-tested.
- Todo and notes persisted after reload; color copy returned `#3F8CFF`; timer continued across route changes and returned `00:00:02`.
- `/blog/1` redirected to the stable React slug and `/tools` redirected to `/lab`.
- Mobile navigation exposes Articles, Projects, Lab, and About. No horizontal document overflow was observed.
- Reduced-motion and coarse-pointer fallbacks are enforced in the implementation; hero transforms are disabled under `prefers-reduced-motion`.
- Fresh post and laboratory tabs reported no console errors after the TOC fix.

## Follow-up polish

- [P3] A future purpose-made pale blueprint line asset could add more scientific annotation to the featured paper without reducing readability.

## Hero revision — selected direction 3

- Source visual truth: `D:\code\blog-website\src\assets\hero-field-map-v2.png` (1487×1058 px).
- Browser-rendered implementation: `D:\code\blog-website\qa-home-motion-v2-final.png` (1426×937 px) at a 1440×1024 CSS viewport and device scale factor 1.
- Mobile evidence: `D:\code\blog-website\qa-home-motion-mobile-v2.png` (375×812 px) at a 390×844 CSS viewport.
- Active-motion evidence: `qa-home-motion-active-a.png` and `qa-home-motion-active-b.png` at the desktop viewport.
- Full-view comparison input: `D:\code\blog-website\qa-comparison-motion-v2.jpg`; source and implementation were normalized to 1440×1024 halves in a single 2880×1024 comparison image.
- State: `/`, top of page. The active-motion evidence also includes a pointer position over the field-map area.
- Focused region comparison was not needed: the selected target is a single full-bleed hero asset, and its crop, negative space, focal point, image sharpness, title contrast, and sidebar boundary are all large and readable in the full-view comparison.

### Findings and comparison history

- Earlier [P1] image-quality mismatch: the literal black sphere and orange vortex dominated the headline and read as generic science wallpaper.
  - Fix: replaced it with the selected direction 3 field-map asset, preserved the quiet left copy field, and aligned the aperture and orange waveform with the right-side focal area.
- Earlier [P2] behavior mismatch: the hero exposed only shallow image translation and one title reveal, so the intended blueprint-depth experience was not sufficiently perceptible.
  - Fix: added independently moving raster, Canvas orbital/wave, grid, scan-light, title-slice, signal-pulse, Field Notes, and section-reveal layers. Pointer movement produced `--depth-x: 5.69px`; two captures 900 ms apart had different frame hashes, proving the active field animation advanced.
- Post-fix visual evidence: `qa-comparison-motion-v2.jpg` and `qa-home-motion-active-b.png`.
- Post-fix result: no actionable P0/P1/P2 differences remain. The existing Noto Serif SC/Inter typography, graphite/blue/orange tokens, paper transition, copy, and navigation hierarchy remain unchanged.

### Interaction, responsiveness, and accessibility

- Desktop field motion, pointer response, animated orbital points, waveform, scan pass, and frame progression were browser-tested; the console reported no errors or warnings.
- The in-app browser advertises `prefers-reduced-motion: reduce`; the normal-motion path was checked in an isolated QA pass, then the production reduced-motion guard was restored and visually rechecked.
- Under reduced motion the Canvas and scan layer are removed and transforms/entrance animations stop. Coarse-pointer devices receive the same static treatment.
- At 390×844 the art uses a mobile focal crop, the title remains fully visible, Field Notes becomes a linear reading flow, and no document-width overflow was observed.

## Site-wide motion revision

- Added Astro client-side route transitions with a short outgoing lift/blur and a softer incoming reveal; navigation state and document metadata still update per route.
- Added viewport-triggered hierarchy reveals to article lists, project/about sections, laboratory framing, article heroes, reading surfaces, and 404 content.
- Added purpose-specific motion: project rows stagger, project imagery resolves from depth, laboratory modules slide into place, and article pages preserve a restrained reading-focused transition.
- Browser route checks covered `/` → `/articles` → article detail → `/articles` → `/projects` → `/lab`. Search remained functional after returning to the article index, the React article recreated all four code-copy controls, and the laboratory retained all four modules.
- A hydration mismatch found during the first pass was fixed by keeping global DOM annotations away from React island markup. A fresh route sequence then reported no warnings or errors.
- Mobile evidence: `D:\code\blog-website\qa-route-motion-mobile.png` at 390×844 CSS px; no horizontal document overflow was observed.
- Reduced-motion continues to suppress route, reveal, list, and module animations while preserving all content and controls.

## Project hero motion revision

- Source visual truth: `D:\code\blog-website\qa-project-reference.png` (2356×1199 px).
- Browser-rendered implementation: `D:\code\blog-website\qa-project-motion-final.png` at the 1280×720 browser viewport.
- Same-input comparison: `D:\code\blog-website\qa-project-comparison.jpg`; both halves normalized to 1280×720.
- Added a project-specific Canvas field layer with rotating calibration ellipses, moving blue/orange signal points, a live waveform, pointer depth, and scroll convergence. The original blueprint remains the raster foundation rather than being replaced with code-drawn artwork.
- First QA pass found a P0 layout feedback loop between the responsive Canvas buffer and the Astro island wrapper, expanding the page to millions of pixels. The motion island was placed inside a fixed absolute layer; the final hero and Canvas both measure 1153.5×570 CSS px and frame progression was confirmed between two timed captures.
- Final browser pass reported no warnings or errors. At 390×844 the motion layer is removed, the static focal crop remains intact, and document width does not overflow.

final result: passed
