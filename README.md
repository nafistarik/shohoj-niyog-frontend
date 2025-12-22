# Shohoj Niyog — Frontend (Next.js + TypeScript + Tailwind CSS)

## 1. Quick story — *why this exists*

Imagine you're a recruiter at a growing company. You run dozens of interviews weekly and want a consistent, fast, and objective way to shortlist candidates. Manually writing questions, collecting video answers, transcribing, and scoring takes too long and produces inconsistent results.

This app solves that pain: interviewers create sessions (they give AI a short brief), AI generates question/ideal-answer pairs, candidates submit short video answers, the app transcribes and scores automatically, and recruiters review summarized scores to decide whether a candidate is `interested` or `not_interested`.

The frontend's job is to be small, testable, and API-ready: build components with static payloads that exactly mirror backend responses so you can later swap in real API calls with minimal changes.

---

## 2. Goals for this repository

* **Tech stack:** Next.js (App Router), TypeScript, Tailwind CSS
* **Theming:** Global CSS variables + Tailwind;
* **Forms & validation:** react-hook-form + Zod
* **Data:** Static fixtures that mirror backend payloads (easy API swap later)
* **Component design:** Tiny, reusable components (Button, Input, Card, Loading, Empty, Error, etc.)
* **Pages:** Public, Interviewer, Candidate routes
* **Accessibility & responsiveness** from the start

---

## 3. Pages & Routes (app/ directory, App Router)

### Public

* `/` — Landing page (hero, login as Candidate / Interviewer, About, FAQ, Contact, footer)
* `/signup` — Unified signup page: choose role (candidate/interviewer)
* `/login` — Login page

### Interviewer (authenticated & role-guarded)

* `/interviewer/dashboard` — Interviewer dashboard (sidebar + topbar)
* `/interviewer/sessions/create` — Create interview session (form + scheduled time)
* `/interviewer/sessions/[id]` — Session details (QA pairs, allowed candidates, scheduled, status)
* `/interviewer/sessions/[id]/results` — All candidate responses & scores for the session

### Candidate (authenticated & role-guarded)

* `/candidate/dashboard` — Candidate dashboard
* `/candidate/interview/[id]` — Participate page: see questions and record video answers (one-by-one or sequential UX)
* `/candidate/results` — Candidate's interview results and decisions

---

## 4. Theme & Design

* Global CSS variables (in `styles/globals.css`) provide light/dark tokens.
* Toggle switch saves preference in `localStorage` and uses a root class (`.dark`).
* Primary color palette: `0891b2` (blue), sky-blue tints and very light-white background shades.
* Tailwind config extends colors using tokens mapped to CSS variables; use utility classes + small component-level classes.

---

## 6. API layer: DataProvider & hooks

Create a thin API abstraction so switching from static to real API is a one-line change.

* `lib/api/client.ts` — exports `useStatic: boolean` and two implementations:

  * `StaticClient` reads from `/data/*.json` using `fetch()` (served from `public/`) or imports.
  * `HttpClient` performs real `fetch`/`axios` calls to `process.env.NEXT_PUBLIC_API_BASE`.
* `hooks/` — small hooks like `useAuth()`, `useSessions()`, `useSession(id)`, `useResults(sessionId)` that call the client.

This pattern keeps components tiny and focused.

---

## 7. Reusable components (tiny & composable)

Create an atomic component library in `components/ui/` and `components/layout/`.

**UI atoms** (`components/ui`):

* `Button.tsx` — supports variants: `primary | secondary | ghost` and `size: sm | md | lg`
* `IconButton.tsx`
* `Input.tsx` — integrates with `react-hook-form` via `forwardRef`
* `Textarea.tsx`
* `Select.tsx`
* `Checkbox.tsx` / `ToggleSwitch.tsx` (for dark mode)
* `Avatar.tsx`
* `Badge.tsx`
* `Spinner.tsx` — for loading
* `Empty.tsx` — empty state with CTA
* `ErrorAlert.tsx` — error messages

**Molecules / Organisms** (`components/`):

* `Card.tsx` — small card wrapper
* `SessionCard.tsx` — used in lists (show position, scheduled, status, Participate button)
* `SessionList.tsx` — virtualized or paginated list
* `Sidebar.tsx` — collapsible with links
* `Topbar.tsx` — shows username + theme toggle + logout

**Forms**:

* `forms/SessionCreateForm.tsx` — uses react-hook-form + Zod
* `forms/LoginForm.tsx`
* `forms/SignupForm.tsx`

**Pages/Flows-specific**:

* `InterviewPlayer.tsx` — video-recording component (uses MediaRecorder API) and form submit helper
* `QuestionStep.tsx` — small component for a single question (question text, record, preview, re-record)

---

## 8. Validation & Forms

* Use `react-hook-form` with `zodResolver`.
* Keep Zod schemas in `lib/schemas/*` and export both `TypeOf<typeof schema>` as TS types.
* Validate on submit, show field-level errors inline with `ErrorAlert` or `Input` helper text.

Example (SessionCreate) fields: `position`, `stacks`, `level`, `allowed_candidates`, `num_questions`, `scheduled`.

---

## 9. Video recording & submission UX (candidate)

* Record per-question short video clips (recommended: 30–90s). Store each as `File` in `FormData` and POST to `/api/response/`.
* Use MediaRecorder API with fallback message for unsupported browsers.
* Show local preview, allow re-record, then `Submit All`.
* While uploading, show progress and optimistic UI (local saved state)

**Important UX decisions**

* Present questions one-at-a-time (recommended): reduces candidate anxiety and simplifies recording.
* Show modal with conditions before starting (privacy, camera/mic access, time per question).
* Block refresh or warn user during recording/submit.

---

## 10. State management

* Use local React state & context for auth and theme.
* Keep API cache short-lived. Optionally add React Query/ SWR later if you want caching, retries, and optimistic updates.

---

## 11. Folder structure (suggested)

```
/app
  /candidate
  /interviewer
  /auth
  layout.tsx
  globals.css
/components
  /ui
  /forms
  /layout
/lib
  api
  client.ts
  schemas
/hooks
/styles
  tokens.css
/data
  auth
  sessions
  results
/public
  illustrations
  data (if you want to serve static JSON)
/tests
  unit
  e2e
```

---

## 12. Static data examples (short)

Place JSON files in `public/data` or `data/` and import them in the StaticClient. Make sure IDs and fields match the backend examples you provided (use ISO strings for dates).

Example `public/data/auth/login.json` (exact fields):

```json
{
  "access": "<JWT>",
  "refresh": "<JWT>",
  "username": "nafis",
  "role": "interviewer",
  "user_id": "d65e733b-6690-4c2a-9fc2-396c495e5afd"
}
```

---

## 13. Environment & Scripts

`.env.local` should contain:

```
NEXT_PUBLIC_API_BASE=https://your-api.example.com
NEXT_PUBLIC_STATIC_MODE=true # toggle for local dev between static and http client
```

NPM scripts:

```json
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint"
```

---

## 14. Accessibility

* All interactive controls must have `aria-label` / `aria-describedby` where applicable.
* Ensure keyboard focus states and visible focus outlines.
* Use semantic HTML: `main`, `header`, `nav`, `section`, `form`, `button`.
* Video recorder: provide captions/transcript once AI transcribes (for accessibility).

---

## 15. Testing & QA

* Unit test UI components (Jest + React Testing Library)
* e2e tests for main flows (Playwright)
* Tests for forms, validation, and recorder fallback

---

## 16. Deployment

* Use Vercel for seamless Next.js deployment. Ensure `NEXT_PUBLIC_API_BASE` is set in environment.
* Serve static JSON (if using) from `public/data` so they work on production too.

---

## 17. Illustration & design assets

* Place generated illustrations in `public/illustrations/`.
* Landing page illustration prompt (for your image tool):

  * **Prompt:** "An illustration of an interview session. A dark-haired woman in her early thirties (recruiter) sitting with a laptop, facing a dark-haired male candidate wearing spectacles. Primary color #0891b2, soft flat 2D vector, friendly modern style, office background, subtle gradients."

---

## 18. Next steps (developer action list)

1. Initialize repo with `npx create-next-app@latest --typescript --app`.
2. Add Tailwind and configure CSS tokens.
3. Create `data/` static JSON fixtures that exactly match backend payloads.
4. Scaffold `lib/api/client.ts` with `StaticClient` that reads `data/` and `HttpClient` behind a toggle.
5. Implement Auth context and role-guarded route wrappers.
6. Build tiny UI atoms (Button, Input, Spinner).
7. Build Session creation page & use react-hook-form + Zod.
8. Build Candidate recording flow (QuestionStep + InterviewPlayer).
9. Wire results page and decision PATCH UI.
10. Add tests and accessibility checks.

---

## 20. Contributing

Please create feature branches and open PRs. Keep commits small and self-contained.

---

## License

MIT

---
