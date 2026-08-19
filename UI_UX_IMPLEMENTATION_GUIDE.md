# UI/UX implementation guide

## Purpose and boundary

This is the implementation backlog for the visual and interaction layer of Capital Cities. It is deliberately separate from the functional roadmap: it does not redefine API contracts, scoring rules, authentication, or database work. Each item below is grounded in the current Angular source and can be completed independently in the listed order.

The product should feel like a quick, trustworthy geography challenge: a player understands the next action immediately, can answer without a mouse, sees progress while playing, and can review results without visual noise.

## Current UI inventory

| Surface | Existing implementation | Strength | Gap to close |
| --- | --- | --- | --- |
| App shell | `src/styles.css`, `app.component.*` | Three coherent colour themes and shared CSS tokens already exist. | No shared spacing/type/control primitives; the footer is absolutely positioned. |
| Navigation | `util/navbar/*` | Clear brand, theme picker, language selector, responsive wrapping. | No active-route state, no compact mobile navigation, flag images are not keyboard controls. |
| Home | `components/app/home/*` | Globe gives the product a recognisable geographic motif. | The clock is the visual focal point, but does not lead to a task; it can overlap the globe on small screens. |
| Game setup | `components/game/game-options/*` | Best-developed current screen: clear cards, responsive layout, selected-value summary. | Selected duration has no strong visual selected state beyond the radio input; setup lacks an expectation of game flow. |
| In-game answer | `components/game/play-game/*`, `capital/*` | Score, region, and timer are present. | The question and answer field are visually bare, input has no visible label/submit button, and there is no feedback transition between questions. |
| Results | `game-results/*` | Existing restart path is simple. | It only renders two lines, with no success hierarchy, performance context, or next action besides replay. |
| Explore and high scores | `capitals-list/*`, `highscores/*` | Data is available and search already filters client-side. | The table/search/filter are visually inconsistent and do not handle narrow screens, empty states, or loading states. |
| Account | `pages/login/*`, `pages/register/*`, `user-profile/*` | Existing validation rules and profile stats give useful content. | Forms are unframed and feedback uses browser alerts; profile cards and sections lack hierarchy/responsiveness. |
| Informational/feedback routes | `about/*`, `user-profile/feedback/*`, `user-play/*` | Routes are available. | About is dense prose; feedback and user-play are placeholders, so do not polish them before their functional content exists. |

The `ideas/idea1.png` through `ideas/idea4.png` files are logo-exploration screenshots, not application-screen designs. They establish useful themes—globe/city iconography, an audiowide wordmark, and blue/teal or charcoal palettes—but should not be treated as screens to reproduce.

## Design direction to keep

- Keep the existing `Aurora`, `Sunset`, and `Midnight` theme model in `src/styles.css`; extend its tokens rather than adding a theme package or per-component hard-coded colours.
- Keep the global-map/globe motif, but use it as a restrained decorative background or empty-state visual. It should never compete with an answer field or timer.
- Keep one clear primary action per screen: **Start game**, **Submit answer**, **Play again**, or **Sign in**.
- Use native HTML controls, Angular templates, and CSS. Bootstrap 3 is already installed; no new UI dependency is required for this backlog.
- Treat `Audiowide` as display/brand type only. Use the existing sans-serif fallback for long paragraphs, labels, tables, and form controls to improve scanning.

## Delivery order

### P0 — make the live game clear, fast, and accessible

#### 1. Build a reusable visual foundation

**Files:** `src/styles.css`; then only the component CSS files named below.

Add a small token layer, not a component library:

```css
:root {
  --page-max-width: 1120px;
  --content-gutter: clamp(1rem, 3vw, 2rem);
  --space-1: .5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --radius-card: 1.5rem;
  --radius-control: .75rem;
}
```

Also add shared baseline rules for `button`, `input`, and `select` with a minimum 44px interactive height; a visible `:focus-visible` outline using `--secondTextColor`; and `@media (prefers-reduced-motion: reduce)` that disables the home/hero animations and shortens transitions. Do not duplicate button/input styling in every component.

Change the app shell to a flex column with a growing route content area, then render the footer in normal flow. This removes the current `position: absolute` overlap risk in `util/footer/footer.component.css` on long and short pages.

**Done when:** keyboard focus is obvious in all themes, controls meet the 44px touch-target baseline, reduced-motion users do not receive entrance animations, and the footer never overlays page content.

#### 2. Make the question card the focal point

**Files:** `components/game/capital/capital.component.html`, `.css`, and `.ts`; `components/game/play-game/play-game.component.html`, `.css`; translation JSON files.

Replace the bare question content with one card inside the existing `capital-stage`:

```text
Question N                         region badge
What is the capital of
COUNTRY NAME?

[ Capital city answer                         ] [Submit]
Press Enter to submit
```

Implementation details:

1. Use a real `<form (ngSubmit)="onUserAnswer()">`, a visible `<label>` associated with the input, and `<button type="submit">`. Keep Enter submission; do not add a second answer path.
2. Mark the country name as the card's `<h1>`/main prompt; the smaller "Guess the capital" text becomes an eyebrow. Add `autocomplete="off"`, `autocapitalize="words"`, and a meaningful translated placeholder.
3. Autofocus the answer input after each question with `@ViewChild` plus `ngAfterViewChecked` only if needed; prefer a template reference and a focused method after `form.reset()` if it does not cause repeated focus changes. Never steal focus while results/error content is displayed.
4. Add a short, non-blocking feedback area (`aria-live="polite"`) for correct/incorrect answers. It should announce the outcome before the next prompt; use a 350–500ms CSS transition, and respect reduced motion. This requires a small `lastAnswerState` input/output addition between `CapitalComponent` and `PlayGameComponent`, but must not change scoring logic.
5. Give `game-status-card` a semantic status role/label. Render timer as a large tabular-number value and add a simple CSS progress bar whose width derives from `timer / configured duration`. Use a CSS custom property bound from the template; do not introduce a chart library.

**Done when:** a keyboard-only player can start, type, submit, hear/see answer feedback, and answer the next question without hunting for focus; the remaining time is legible at a glance in all themes.

#### 3. Turn game completion into a useful end state

**Files:** `components/game/game-results/*`, `components/game/play-game/*`, translations.

Replace the unstyled `Game over! / Your score` fragment with a result card:

```text
Round complete
Score: 12                           [personal best badge, only when known]
Europe · 60 seconds

[Play again]  [Change settings]  [View high scores]
```

- Keep score saving in `PlayGameComponent`; the result component remains presentational and receives score/settings (and later optional rank/personal-best values) as inputs.
- Make **Play again** the primary button. **Change settings** should call the existing restart/reset flow; **View high scores** is a normal router link.
- Move save failure/success into a small status message near the result rather than placing a large `h1` error below the entire game screen.
- Focus the result heading when the game ends so screen-reader and keyboard users get a clear state change.

**Done when:** end-of-round information and available next actions are visible without scrolling on a typical laptop viewport, and score-save feedback does not obscure the result.

#### 4. Finish setup-screen interaction states

**Files:** `components/game/game-options/*`, translations.

The setup screen already has a strong card layout. Keep it and make selected state unmistakable:

- Style `.duration-option:has(input:checked)` with `--secondTextColor` border and `--interactive-hover` fill; include an Angular class fallback if browser support for `:has()` is not sufficient for the project support target.
- Put a concise "You will answer as many countries as possible before time expires" helper text beside the existing summary.
- Disable start only while configuration is unavailable; pair it with an `aria-live` loading/status message so a disabled button is not the only explanation.
- Keep region and duration selections as native controls. Do not replace them with custom radio/select widgets.

**Done when:** a player can identify the active duration from more than the small radio dot, understands the objective, and receives a clear loading/error explanation.

### P1 — make navigation and data screens consistent

#### 5. Fix navigation hierarchy and mobile usability

**Files:** `util/navbar/navbar.component.html`, `.css`, `.ts`; routing links where needed; translations.

- Add `routerLinkActive` and `ariaCurrentWhenActive="page"` to primary links; distinguish the active destination with border/background, not colour alone.
- Replace clickable flag `<img>` elements with two small native `<button type="button">` controls. Preserve flag images as decorative content (`alt=""`) and give buttons translated accessible names (for example, "Switch language to English").
- At `max-width: 767px`, use one native disclosure button to toggle the link list. It must expose `aria-expanded` and should close after navigation. The existing flex-wrap version remains an acceptable tablet layout; do not build a custom drawer or add a menu library.
- Keep theme selector in the header. Move utility controls below primary links on compact screens so the game/play link is encountered first.

**Done when:** active page is apparent; all header actions are reachable using Tab/Enter/Space; narrow screens do not become a tall wall of equal-weight controls.

#### 6. Reframe Explore and High Scores as responsive data views

**Files:** `game/capitals-list/*`, `game/highscores/*`, translations.

**Explore:** add a labelled search field with a result count and clear-empty state. Keep the table on desktop, wrap it in a horizontal scroll container with a visible focusable/scrollable affordance on phones, and use `scope="col"` headers. The existing client-side filter remains the right solution for the current dataset.

**High Scores:** use the existing duration select in a labelled filter bar. Render entries as a ranked list/card rows with rank, player, score, region, and played date—rather than unstyled list text. Use a compact table only at wider widths if it makes comparison easier. Add loading, empty, and error states; keep an error within the screen's content area and use `role="alert"` only for the failure.

**Done when:** both pages work at 320px without clipped essential data, an empty response explains itself, and the filters have labels and keyboard focus styles.

#### 7. Make account screens feel intentional

**Files:** `pages/login/*`, `pages/register/*`, `user-profile/*`, child profile component styles, translations.

- Use one narrow `auth-card` style for both login and register: heading, helper link, labelled controls, inline validation/error region, full-width primary action.
- Replace `alert()` visual feedback with translated inline error text linked to inputs through `aria-describedby`. Functional validation rules already exist; this is a presentation change, not new validation policy.
- Convert profile totals into the existing `.statsCard` grid with labels, prominent numbers, and explanatory empty values. Make `.userContainer` a grid that stacks on small screens. Remove fixed `height: 70vh`, which currently creates unnecessary blank space/overflow risk.
- Do not style `feedback` or `user-play` beyond a basic container until their functional screens exist; they currently contain placeholder content.

**Done when:** form failures are discoverable without a browser dialog, profile cards stack correctly on mobile, and a long profile does not collide with the footer.

### P2 — improve discovery and perceived polish after P0/P1

#### 8. Give Home an actionable landing composition

**Files:** `components/app/home/*`, `hero-component/*` (or choose one home composition and delete the unused one), translations.

The current `HomeComponent` presents a full-screen clock over a globe, while `HeroComponentComponent` has unused game marketing copy and a Start Now button. Select one route composition after confirming routing usage:

- Preferred: retain the globe as a low-contrast illustration, replace the dominant clock with the already-written hero copy, and make **Play now** route directly to game setup.
- Add two secondary plain-text links: Explore capitals and View high scores.
- Keep the clock only as a small optional timezone/detail element if it serves a game purpose; otherwise remove it. It is decorative and currently distracts from the core action.

**Done when:** the first visible screen states what the game is and offers a primary action above the fold at 320px and desktop widths.

#### 9. Reduce visual debt in content pages

**Files:** `components/app/about/*`, translations.

Break the long translated paragraphs into short sections/cards with headings, readable measure (`max-width: 70ch`), and 1.5–1.7 line-height. Use a concise project description, how-to-play list, and technology disclosure; do not add illustrations or animations unless final copy needs them.

**Done when:** a reader can scan the purpose and how to play in under ten seconds.

## Implementation rules

1. Add every new visible string to both `src/assets/i18n/en-EN.json` and `me-ME.json` in the same change. Never hard-code a new English UI string in templates.
2. Use semantic elements first: `nav`, `main`, `section`, `form`, `label`, `button`, `table`, headings. ARIA supplements semantics; it does not replace them.
3. Maintain colour contrast of at least 4.5:1 for normal text and 3:1 for large text/interactive boundaries in each existing theme. Verify the urgent timer and secondary text in Midnight explicitly.
4. Test at 320px, 768px, 1024px, and 1440px; test mouse, keyboard only, and touch emulation. Do not make layout decisions from a single desktop viewport.
5. Preserve the existing token naming convention (`--surface-*`, `--textColor`, `--secondTextColor`) when adding CSS variables. Avoid a new CSS framework, icon set, or component library for this scope.
6. Do not change service endpoints, score payloads, or route paths inside a UI-only pull request. If a UI item requires new data (for example player rank), document it as a dependency and leave its visual state graceful when absent.

## QA checklist for each UI pull request

- [ ] `npm run build` succeeds.
- [ ] The changed screen was checked in Aurora, Sunset, and Midnight.
- [ ] Tab order follows the visual reading order; focus is always visible.
- [ ] Inputs have programmatic labels; icon-only controls have accessible names.
- [ ] Error, loading, empty, success, and disabled states are represented where the screen makes a request or submission.
- [ ] No horizontal page scrolling at 320px (data tables may scroll inside their own labelled wrapper).
- [ ] Motion is suppressed or reduced under `prefers-reduced-motion`.
- [ ] Existing translated strings remain intact and all new strings have EN/ME equivalents.

## Suggested small pull-request sequence

1. `ui: establish layout, motion, and control accessibility baseline` — global styles and footer flow only.
2. `ui: improve active game question, timer, and results` — P0 game surfaces plus translations.
3. `ui: make navigation and data screens responsive` — P1 navigation/explore/high scores.
4. `ui: refine authentication and profile presentation` — P1 account screens.
5. `ui: make landing and about pages task-focused` — P2, after confirming which current home component is routed.

This sequence limits each change to a visible journey and keeps the current application functional throughout. It also intentionally postpones placeholder routes and speculative gamification (maps, avatars, badges, sounds, or new animations) until their product requirements exist.
