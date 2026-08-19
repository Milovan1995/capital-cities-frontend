# Frontend Functional Implementation Roadmap

## Purpose and scope

This is the implementation checklist for unfinished **frontend behaviour** in Capital Cities Quiz Game. It deliberately excludes the separate visual/UI redesign roadmap. Every item is tied to observed code or the product claims in `README.md` and the About-page copy.

Repository: `capital-cities-frontend` (`/home/milovan/Desktop/frontCapitals`)  
Baseline inspected: `main` at `ad3739d` (the current README update was included; it remains a generated Angular CLI README)  
Verification baseline: `npm run build` passes; `npm test -- --watch=false --browsers=ChromeHeadless` has **10 failing / 29 total** tests.

## Current product flow

1. A visitor can browse capital cities, choose a region and duration, and play a timed country-to-capital quiz.
2. A registered user receives a token in `localStorage`, can see profile summary data, and is intended to have scores saved and shown on a leaderboard.
3. The API already supplies capitals, game configuration, public highscores, current-user profile data, and aggregate user statistics.

The profile's achievements, feedback, game history, and personal highscores are not implemented beyond placeholders. The roadmap below turns the existing product promise into explicit, testable increments.

## P0 — Correctness and access control

### F-01: Save authenticated games in the World mode

**Evidence:** `PlayGameComponent.handleGameOver()` exits when `!this.gameSettings?.regionId`. The World option intentionally has no region ID, so an authenticated World game never calls `saveGameScore()`.

- [ ] Agree the score API contract: represent World as an omitted/null `regionId` (preferred) or give World a real backend region ID.
- [ ] Change `HighscoresService.saveGameScore` and the backend request contract consistently so a World score is valid without inventing a client-side ID.
- [ ] Change the game-over guard to require only an authenticated user and a selected duration; retain the one-save-per-game protection.
- [ ] Show a non-blocking success/saved state only after the score-save request succeeds; retain a retryable error state when it fails.
- [ ] Test authenticated World, regional, anonymous, duplicate-finalization, and failed-save cases.

**Acceptance:** a logged-in player can finish either World or any regional round and exactly one legitimate score is persisted; anonymous rounds remain playable and are not persisted.

### F-02: Protect account-only routes and recover from an invalid session

**Evidence:** `/pages/user`, `/pages/user/feedback`, `/pages/user/play`, and `/pages/user/highscores` have no route guard. `AuthService.isLoggedIn()` only checks whether the local-storage key exists, while `getUserData()` blindly decodes/parses the token.

- [ ] Add one route guard for the `pages/user` route tree; redirect unauthenticated or malformed/expired-token users to login with a return URL.
- [ ] Make token decoding defensive: invalid token structure, invalid base64, invalid JSON, and expired tokens must clear the token and result in a logged-out state rather than throwing.
- [ ] Centralize authenticated HTTP handling in one interceptor (Bearer header and 401/403 session expiry handling) instead of each service manually building headers.
- [ ] Remove the client-provided `userId` from score-save requests once the API derives identity from the Bearer token. Until the API changes, treat it as compatibility-only and never as authorization.
- [ ] On login, registration, logout, and expired session, update navigation state and send the user to the appropriate route.
- [ ] Test direct navigation to every protected path, malformed/expired token recovery, 401 handling, and logout.

**Acceptance:** protected views are never rendered for a bad session, and no frontend request can claim another user's ID as its authority.

### F-03: Make the game lifecycle race-safe

**Evidence:** `handleAnswer()` can process an emitted answer after the round finishes, and a new start only cancels the capitals request—not a prior pending score-save request. Countdown and answer state are held in multiple mutable fields.

- [ ] Guard answer handling and capital loading once `isGameFinished` is true.
- [ ] Define a single game state transition sequence: settings → loading questions → active → finishing → finished/error.
- [ ] Disable or hide the answer control while questions load and after a submitted answer; prevent a stale Enter event or rapid submit from advancing/scoring twice.
- [ ] Cancel/ignore stale capital-load responses when the player restarts or changes settings.
- [ ] Clarify the intended end condition when every regional capital is answered before time expires, then test it.
- [ ] Unit-test timer expiry, final-question completion, rapid repeated Enter, request failure, restart during load, and component destruction.

**Acceptance:** one answer produces at most one score change and next question; a completed/restarted round cannot be mutated by late timer or HTTP events.

## P1 — Finish documented account features

### F-04: Replace placeholder achievements with real progress

**Evidence:** `AchievementsComponent` renders the hard-coded `['Achievement 1', 'Achievement 2']`, although models for `Achievement` and `AchievementAcquired` already exist.

- [ ] Confirm or add a read-only authenticated API endpoint that returns achievement definition, acquisition status/date, and progress where applicable.
- [ ] Add a typed service method and render acquired/locked states from the response; show loading, empty, and request-error states.
- [ ] Define the first minimal achievement set in the backend rules (for example first completed game, score threshold, or number of regions played) and ensure it is awarded server-side.
- [ ] Add component/service tests for empty, acquired, locked, and error responses.

**Acceptance:** profile achievements contain real data and are awarded from trusted server-side game data, never static strings or client claims.

### F-05: Implement feedback submission and user feedback history

**Evidence:** `/pages/user/feedback` displays `Nesto feedback bla bla`; the `Feedback` model exists but is unused.

- [ ] Confirm the feedback API contract: authenticated create, optional list of the current user's submissions, validation limits, and server-generated timestamp.
- [ ] Add a reactive form with required trimmed comment, length limit, disabled submit while pending, and inline success/error result.
- [ ] Do not send `user_id` from the browser; derive it from authentication on the server.
- [ ] Render submitted feedback only if the API provides it; otherwise ship the submit form alone as the smallest useful version.
- [ ] Add tests for invalid input, successful submit/reset, API validation error, and network failure.

**Acceptance:** a logged-in user can submit validated feedback once and sees an accurate completion/error state without page reload.

### F-06: Deliver game history and personal highscores, or remove their empty routes

**Evidence:** the product copy promises quiz-history tracking and personal high scores. `UserGamesComponent` shows only aggregate stats while labelled “Game History”; `UserHighscoresComponent` shows only best/average values; `/pages/user/play` renders `user-play works!`.

- [ ] Decide the smallest product slice: implement personal game history and personal highscore list, or remove the three unused profile child routes until the API exists. Do not keep dead navigation.
- [ ] For history, request server-authoritative rows (score, region, duration, completed time) with page/cursor metadata; do not fetch an unbounded list.
- [ ] For personal highscores, request a bounded, ordered list and show rank, score, region, duration, and date.
- [ ] Add loading, empty (“no games yet”), and error states; preserve the existing aggregate summary as a separate summary, not a mislabeled history.
- [ ] Either give `/pages/user/play` a defined purpose (for example a shortcut back to game setup) or delete the route/component and link to `/capitals/play-game` directly.
- [ ] Test pagination/filter behaviour only after the API exposes it; initially test one page, empty, and error states.

**Acceptance:** every profile link leads to a usable feature, and “history”/“highscores” display the data their labels promise.

## P2 — Reliable public flows and production readiness

### F-07: Complete highscores and capital browsing states

**Evidence:** public highscores has no loading or empty state and keeps old entries on an API error; the capitals table has no explicit loading/empty state. Both hard-code several visible labels.

- [ ] Add explicit loading, empty, and error states to public highscores and capital search; clear stale highscores when a duration request fails.
- [ ] Keep the existing duration filter; add region filtering only if the backend already supports it and there is a defined user need.
- [ ] Use `track highscore` with a stable server key when the API exposes one; until then document that rows cannot be reliably keyed across refreshes.
- [ ] Translate all new and existing visible error/status text, including game-over and form errors.
- [ ] Test initial config failure, empty durations, scores failure after a successful request, empty search result, and capitals request failure.

**Acceptance:** a public-data failure is understandable and recoverable, and stale data is not presented as current.

### F-08: Replace browser alerts with form-level validation and request feedback

**Evidence:** login and registration use `alert()` for required fields, password mismatch, and API errors. They accept any non-empty credentials and use `any` response types.

- [ ] Add typed auth response/error models and form-level error rendering.
- [ ] Apply agreed username/password constraints in the form and mirror the server's validation messages safely.
- [ ] Use native form submission (`ngSubmit`) so Enter submits and button state reflects pending/invalid state.
- [ ] Prevent double submit while login/registration is pending.
- [ ] Test invalid credentials, duplicate username/server validation error, successful redirect, and in-flight disabled state.

**Acceptance:** authentication is keyboard-operable, receives clear inline feedback, and never uses blocking browser alerts.

### F-09: Persist language preference and finish localization coverage

**Evidence:** `AppComponent` unconditionally sets English on each initialization; `NavbarComponent` switches language only in memory. Large parts of account, game-result, highscores, and error messages are English literals.

- [ ] Store a validated language selection and initialize translation service from it, with English as fallback.
- [ ] Move all user-facing literals into both `en-EN.json` and `me-ME.json`; include dynamic status/error messages and aria labels introduced by implementation work.
- [ ] Preserve the selected language through logout and reload; do not store it in the auth token.
- [ ] Test default fallback, persisted language reload, language switch, and catalog key parity.

**Acceptance:** language selection survives reload and neither supported locale displays untranslated application text.

### F-10: Make API configuration deployable

**Evidence:** both `environment.ts` and `environment.development.ts` hard-code `http://localhost:3000`; services import `environment.development` directly, bypassing Angular file replacement.

- [ ] Change all services to import `environment` only.
- [ ] Define a production API URL through the standard production environment/build deployment configuration; never hard-code localhost into production output.
- [ ] Document the required API URL and CORS/auth expectations in README or an environment setup document.
- [ ] Smoke-test a production build against the deployed API URL before release.

**Acceptance:** development and production use their intended API endpoints without source edits.

## P3 — Quality gate and maintenance

### F-11: Restore a trustworthy automated test gate

**Evidence:** current head fails 10 tests: `CapitalsList`, `Login`, `Register`, `Highscores`, and `UserProfile` lack HTTP/service test providers; `About`, `Hero`, `Feedback`, and `Home` lack required declared/imported child components; `Button` has no required `route` input in its spec.

- [ ] Fix each spec with the smallest correct TestBed dependency: mock service dependencies for component tests and provide required inputs; avoid `NO_ERRORS_SCHEMA` where a real child/import is easy to provide.
- [ ] Add `HttpClientTestingModule`/the current Angular HTTP testing provider only in service tests that exercise HTTP request construction.
- [ ] Retain existing focused theme/game-options tests and add tests alongside every P0/P1 change above.
- [ ] Make `npm test -- --watch=false --browsers=ChromeHeadless` a required CI check once it is green.

**Acceptance:** all tests pass locally and CI blocks regressions in game completion, authentication, and profile data flows.

### F-12: Update the project documentation to match the application

**Evidence:** `README.md` remains the stock Angular CLI README and does not describe the game, API contract, local setup, supported paths, authentication behaviour, or verification commands.

- [ ] Replace the generated README with concise product/setup documentation: prerequisites, frontend start/build/test commands, API URL setup, backend dependency, routes, language/theme support, and known feature boundaries.
- [ ] Link this roadmap and the separate UI roadmap as living implementation sources of truth.
- [ ] Update the README whenever an API contract or a visible capability in this roadmap changes.

**Acceptance:** a contributor can run, test, and understand the actual product without reading component source.

## Recommended delivery order

1. F-01 and F-02 — prevent lost World scores and insecure/broken account entry.
2. F-03 and F-11 — make the core loop deterministic and restore the test safety net.
3. F-05 and F-06 — turn the visible profile placeholders into real features (or delete unused routes).
4. F-04 — add achievements once backend achievement rules/data are available.
5. F-07 through F-10 — public-flow resilience, auth usability, localization, and deployability.
6. F-12 — keep setup/product documentation synchronized at each delivery.

## Explicitly deferred (not unfinished by itself)

- New quiz modes, streaks, hints, maps, social competition, achievements beyond the first minimal set, and new filters are product expansion, not required to complete the current promise.
- CSS/theme polish, layout rework, animation, typography, and visual accessibility are covered by the separate UI roadmap.
- A client-side data cache already exists for capital browsing; do not add another cache until a measured need appears.
