# ELIZ-SAGE-MASTER.md
## Elizabeth Ogilvie — Complete Technical Handoff
*Compiled 2026-03-23 | Pre-transfer master reference for new bot instance*

---

## Who Eliz Is

**Elizabeth (Eliz) Ogilvie** — Director of People Operations, Talent Acquisition, HR, and Operational Infrastructure at Tiger Tracks.
- **Slack ID:** `U0AJGQDTGLR`
- **Email:** elizabeth@tigertracks.ai
- **Calendly:** calendly.com/elizabeth-tigertracks/15min
- **Role on this bot:** Authorized sender. De facto admin of all Tiger Tracks internal tools. Primary requester of every HR/ops tool built on this system.

**How she communicates:**
- Action-oriented, direct. Wants things done, not narrated.
- No screenshots unless explicitly asked.
- No em dashes. Ever.
- Estimate duration before starting anything over 5 minutes.
- Progress updates every 3-5 minutes on long tasks.
- Verify the thing is live before saying it's done.
- One task at a time. Batch commits. Report before fixing.

---

## Tools Built for Eliz — Full Inventory

### 1. Team Resource Hub
**Live URL:** https://resources.tigertracks.ai
**Vercel project:** `tiger-tracks-resources` (`prj_9b5Cd1wgJLIawARPaa20d7uaJWio`)
**GitHub:** `cliffminimac-glitch/tiger-tracks-resources`
**Local:** `/Users/cliffsimmons/.openclaw/workspace/tiger-tracks-resources/`
**Built:** 2026-03-03

#### What it is
Single-file SPA (`index.html`) with 13 content sections for the full Tiger Tracks team. Deployed on Vercel as a static site with serverless API routes.

#### Sections
1. Role Expectations (AC through Senior Director, R&R matrix)
2. Management Playbook (North Star, pod model, philosophy)
3. Manager Operating System (weekly/monthly/quarterly rhythms)
4. Templates & Tools (1:1, delegation, capacity check-in, underperformance)
5. Micro-Training (4 modules: feedback, delegation, prioritization, 1:1s)
6. Org Chart (Account Mgmt + BD full reporting lines)
7. Escalation & Performance (3 C's, paths, manager culture)
8. Performance Self-Evaluation (role-specific tasks, 1-5 rating, auto-save, toast confirmation)
9. Weekly Syncs & Monthly Reviews (weekly sync doc + monthly feedback review, manager/employee RBAC)
10. Team Specialties (23 team members, skills matrix, editable by self)
11. Benefits & Health Plan (Florida Blue 14002, dental/vision, 401k, Teladoc)
12. Referral Bonus (employee $2K/hire, client 100% month 1)
13. Employee Handbook (5 sections, collapsible)

#### Architecture rules (critical)
- **No `<script>` or `<style>` tags in injected HTML on this domain.** All JS must live in `index.html` or `api/_app-scripts-bundle.js`.
- Single-file SPA. No npm build step. Vanilla JS only.
- Vercel Blob for all data persistence (`BLOB_READ_WRITE_TOKEN` env var).
- **Always write new timestamped Blob key — never overwrite existing.** CDN caches blobs for ~5 min after overwrite; timestamped keys bypass this.
  - Key format: `feedback/{type}/{employee}/{period}__{timestamp}.json`
- API routes: `/api/save-sync.js`, `/api/get-sync.js`, `/api/save-self-eval.js`, `/api/self-eval.js`, `/api/give-feedback.js`, `/api/get-feedback.js`, `/api/send-reminders.js`
- Send-reminders uses `resend.batch.send()` — all 22 emails in one API call (was sequential, timed out). `maxDuration: 60` in `vercel.json`.

#### Env vars (Vercel, Production)
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token
- `RESEND_API_KEY` — Resend send-only key
- `RESEND_FROM_EMAIL` — `feedback@tigertracks.ai`
- `SESSION_SECRET` — set 2026-03-16, HMAC signing

#### Auth
- Google OAuth via GSI. Any `@tigertracks.ai` email allowed.
- Exceptions: `megank@tigertracks.ai`, `meganb@tigertracks.ai` (non-standard addresses).
- RBAC: employees see/edit own data. Managers see/edit direct reports. Admins (cliff, henry, elizabeth) see everything.
- `GLOBAL_ADMINS`: cliff@, henry@, elizabeth@tigertracks.ai

#### Known issues / fragile items
- **Good Standing collapsibles**: Were broken (not opening by default). Code at line 1061-1065 explicitly opens `.collapsible-content` in `cul-standing` on navigation. Cliff confirmed clean on 2026-03-23 — marked resolved.
- **RESEND_API_KEY and RESEND_FROM_EMAIL**: Added to Vercel 2026-03-23. Previously missing — feedback form couldn't send emails.

#### Changelog
| Date | Change |
|---|---|
| 2026-03-03 | Initial build — all 13 sections, full SPA, Cloudflare tunnel on port 3001 |
| 2026-03-06 | Manager visibility filtering for Active Meeting Links |
| 2026-03-09 | Python server → Vercel deployment; Google OAuth replacing password gate |
| 2026-03-09 | Cloudflare DNS set to `cname.vercel-dns.com` for `eliz.cliffeliz.ai` and `resources.tigertracks.ai` |
| 2026-03-11 | CDN stale-content architecture fix (timestamped keys); null-check crash fix |
| 2026-03-16 | Version-history baseline created for mockup bot v1.0 |
| 2026-03-23 | RESEND_API_KEY + RESEND_FROM_EMAIL added to Vercel; Good Standing confirmed clean |

---

### 2. Performance Platform (Check-Ins + Self-Eval)
**Live URL:** https://performance.tigertracks.ai
**Vercel project:** `tt-checkins` (`prj_ymEQv4xQDDNjMlx8VEXt0w68tkf5`)
**GitHub:** `cliffminimac-glitch/tt-checkins`
**Local:** `/Users/cliffsimmons/.openclaw/workspace/tt-checkins/`
**Built:** 2026-03-03 through 2026-03-23

#### What it is
Single-file SPA with 6 main sections: Weekly Sync, Monthly Feedback, Active Meeting Links, Give Feedback, Submissions, Self-Evaluation. Vercel serverless API backend.

#### Architecture
- Vanilla JS SPA, no build step.
- Vercel Blob for all data persistence.
- Timestamped key architecture — NEVER overwrite a Blob key.
- API routes: `/api/save-sync.js`, `/api/get-sync.js`, `/api/self-eval.js`, `/api/give-feedback.js`, `/api/send-reminders.js`
- `send-reminders.js` uses `resend.batch.send()` with `maxDuration: 60` in `vercel.json`.

#### Self-Eval section
- All role surveys rendered on one page. User's own role is editable, all others are view-only.
- Auto-saves 2 seconds after last input. Shows toast "Saved ✓" (bottom-right, 1.5s) on success.
- Manager "My Team" section: direct reports in dropdown, view their submitted eval.
- RBAC: employee edits own. Manager edits direct report supervisor fields only. Admin sees all.

#### RBAC details
- `GLOBAL_ADMINS`: cliff@, henry@, elizabeth@tigertracks.ai
- `SUBMISSION_VISIBILITY` maps manager emails to visible direct reports
- `MANAGER_REPORTS_CLIENT` maps manager to direct report email list (client-side nav)
- All 24 team members in EMAIL_MAP with org chart linkages

#### Manager assignments (as of 2026-03-23)
- Evin Leclerc: weekly manager = Daren Kalkoffen, monthly manager = Gretchen Hess
- Charlotte: reports = Kiyana, Tate, Billy, Sanad
- Rachael: reports = Riley, Hannah, Charlotte, Allison, Shelby, Owen, Megan B, Seth, Mary, Will, Gretchen, Megan K, Daren, Evin, Kiyana, Billy, Tate, Sanad
- Daren added to SUBMISSION_VISIBILITY for Ashley

#### Name spellings (verified)
- Riley Abercrombie (no middle name)
- Billy Bevevino (not "Bevenino")
- Rachael Scharett (not "Rachel")
- Megan Brenneke → megan.b@tigertracks.ai
- Megan Klein → megan.k@tigertracks.ai
- Daren Kalkoffen (not "Kalkoffend")
- Shelby Nations → shelby@tigertracks.ai (was bouncing in Resend; Cliff confirmed email is accurate; may be in Resend suppression list — check dashboard)

#### Env vars (Vercel)
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` — `checkins@tigertracks.ai`
- `APP_URL` — `https://performance.tigertracks.ai`

#### Changelog
| Date | Change |
|---|---|
| 2026-03-03 | Initial build |
| 2026-03-06 | Manager visibility fixes; pod visibility; pm2 setup |
| 2026-03-09 | Vercel deployment; RBAC hardened |
| 2026-03-11 | Timestamped Blob key architecture (CDN fix); null-check crash; Resend email setup |
| 2026-03-16 | Resend batch send (replaced sequential); SUBMISSION_VISIBILITY expanded |
| 2026-03-23 | Evin manager split (weekly=Daren, monthly=Gretchen); meganb/megank email fix; Rachel→Rachael fix; Ashley SUBMISSION_VISIBILITY added; send-reminders switched to batch send |
| 2026-03-23 | Self-eval auto-save toast (showToast "Saved ✓") — deployed |

---

### 3. People Metrics (Comp Analysis)
**Live URLs:** https://peoplemetrics.tigertracks.ai (primary) / https://peoplemetrics.cliffeliz.ai (also works)
**Vercel project:** `tt-peoplemetrics` (`prj_i9ZBzkgtAuCKepIvbgcYqtrq6W1E`)
**GitHub:** inside `cliffminimac-glitch/tiger-tracks-tools` at `/tt-comp-analysis/`
**Local:** `/Users/cliffsimmons/.openclaw/workspace/tt-peoplemetrics/`
**Restricted to:** cliff@, elizabeth@, henry@tigertracks.ai only

#### What it is
Compensation analysis tool with 8 tabs: Home, Team Roster, Change Log, Promotions, Performance Actions, Hiring Forecast, Band Overview, Q2-Q4 Planning.

#### Critical security rebuild — 2026-03-23
**Background:** Original version was a single-file HTML with a CSS overlay as the auth gate. All employee salary data was in the page source. Any unauthenticated `curl` returned full data.

**Rebuild:** Full server-side auth via 3 Vercel serverless functions:
- `api/verify.js` — POST. Verifies Google ID token via `https://oauth2.googleapis.com/tokeninfo`. Restricts to cliff@, elizabeth@, henry@tigertracks.ai. Sets `tt_pm_sess` cookie (HttpOnly, Secure, SameSite=Lax, 8hr, HMAC-SHA256 signed with SESSION_SECRET).
- `api/data.js` — GET. Verifies cookie HMAC + expiry. Returns employee JSON. Returns 401 if invalid or expired.
- `api/logout.js` — GET/POST. Clears `tt_pm_sess` cookie.
- ALL inline employee data arrays removed from `index.html`. App fetches `/api/data` on load.
- `/api/data` returns 401 unauthenticated — verified live 2026-03-23.

#### Env vars
- `GOOGLE_CLIENT_ID` — `1010698547754-h3pfeegsn3tkemksjjtjlcgccoqtqbt6.apps.googleusercontent.com`
- `SESSION_SECRET` — HMAC signing key for session cookie

#### Key data facts (internal reference)
- 25 employees total
- Actual payroll: $2,844,750 (stated $2,980,000 in old version was wrong — $135K discrepancy fixed)
- Part-time: Allison Long (SrAM, $95K, `partTime:true`) — excluded from charts/promo scenarios
- Not-in-good-standing: Bruno Milalaf, Steven Jatich, Alex Blumberg
- Approved promo: Megan Brenneke (AC→AS, $75K→$85K, eff. March 9, 2026)
- Recommended: Gretchen Hess (AM→SrAM, $117K→$122–130K)

#### peoplemetrics.tigertracks.ai custom domain
- CNAME added to SiteGround by Cliff on 2026-03-23.
- Returns 200. Fully live.

#### Changelog
| Date | Change |
|---|---|
| 2026-03-06 | Initial comp analysis tool (client-side only) |
| 2026-03-09 | Spun out as standalone Vercel project `tt-peoplemetrics` |
| 2026-03-11 | QA pass; found CSS-overlay-only auth (critical security issue flagged) |
| 2026-03-23 | Full server-side auth rebuild (api/verify, api/data, api/logout). Employee data removed from page source. GOOGLE_CLIENT_ID + SESSION_SECRET set. Deployed. Verified /api/data returns 401. |
| 2026-03-23 | peoplemetrics.tigertracks.ai CNAME added to SiteGround. Live. |

---

### 4. Recruiting Dashboard
**Live URL:** https://recruiting.cliffeliz.ai
**Vercel project:** `tiger-tracks-recruiting` (`prj` — in tiger-tracks team)
**GitHub:** `cliffminimac-glitch/tiger-tracks-recruiting`
**Local:** `/Users/cliffsimmons/.openclaw/workspace/tiger-tracks-recruiting/`

#### What it is
ATS and recruiting pipeline. Roles: BD Director (primary), EA for Cliff. Features: candidate pipeline by stage, AI-assisted resume review, video screening, interview question bank, candidate scoring, interviewer assignment.

#### RBAC
- `ADMIN_EMAILS`: cliff@, henry@, rachael@, elizabeth@, ashley@tigertracks.ai — full platform access
- `INTERVIEWER_EMAILS`: charlotte@, riley@, hannah@, kersten@tigertracks.ai — AI Review tab only, assigned candidates only
- EA role: visible to elizabeth@ only — hidden from all others

#### Video screening
- Candidates submit video responses at `/screen.html`
- Videos saved to Vercel Blob
- Email notification to Eliz with transcript (if OPENAI_API_KEY set — intentionally not set; Eliz doesn't want transcripts)
- `OPENAI_API_KEY` intentionally skipped per Cliff's direction 2026-03-23

#### Key architectural notes
- `archive-mkt.json` in repo — full MKT role archive (removed from UI 2026-03-16 per Eliz)
- Interviewers panel: collapsible in candidate detail modal, admin-only
- `interviewers[]` field on candidates; AI Review tab filters by assigned email for interviewers

#### Changelog
| Date | Change |
|---|---|
| 2026-03-09 | Initial build — ATS pipeline, candidate scoring, AI review |
| 2026-03-09 | 100 BD + 100 MKT candidates injected from LinkedIn scoring |
| 2026-03-11 | Resend email setup for video screening |
| 2026-03-16 | MKT role removed (archived to archive-mkt.json); Candidates tab removed |
| 2026-03-16 | RBAC (admin/interviewer split); EA restriction (elizabeth@ only); Edit Interviewers panel |
| 2026-03-23 | Ashley restored as admin (was accidentally dropped during RBAC split) |

---

### 5. Miami Retreat Site
**Live URL:** https://retreat.tigertracks.ai
**Vercel project:** `tiger-tracks-retreat`
**GitHub:** `cliffminimac-glitch/tiger-tracks-retreat`
**Local:** `/Users/cliffsimmons/.openclaw/workspace/tiger-tracks-retreat/`
**Retreat dates:** March 30 – April 3, 2026 | SLS LUX Brickell | 305-239-1300

#### What it is
Full retreat information site: agenda, contacts, area guide, packing, food/restaurants, recognition form, OST topic board.

#### Key details
- Recognition board admin unlock code: `ElizMiami2026`
- Submissions email to elizabeth@tigertracks.ai via Resend
- Vercel Cron at `/api/weather` (Open-Meteo) — should be disabled after April 3
- `tt_retreat_qa_guide_v2.docx` committed to repo 2026-03-23
- 27 contacts in site
- Leaflet.js map with 7 pinned locations

#### Post-retreat action
- Disable Vercel Cron on `retreat.tigertracks.ai/api/weather` after April 3.

---

### 6. TT Mockup Bot
**Slack App ID:** `A0ALQNQ6S91`
**Bot Token:** `[REDACTED — see openclaw.json]`
**App Token:** `[REDACTED — see openclaw.json]`
**Signing Secret:** `5f9cdf9aba1d3a1d4fa5cd002a9bb1f4`
**OpenClaw account key:** `tt-mockup-bot`
**Workspace:** `/Users/cliffsimmons/.openclaw/workspaces/tt-mockup-bot/`

#### What it is
A second Slack bot (separate from Sage) created at Eliz's request for site creation and QA work. Eliz wanted a dedicated bot she could DM for mockup/design tasks separate from the main Sage bot.

#### Current state
- Bot is installed in EKOCRS workspace.
- App token confirmed valid (auth.test OK) as of 2026-03-23.
- `message.im` event subscription: uncertain. Was being added when session flushed on 2026-03-16. May or may not be fully subscribed. If bot doesn't respond to DMs, check `app.slack.com/app-settings/T0AHBHX9W78/A0ALQNQ6S91/event-subscriptions` and verify `message.im` is listed and saved.
- Socket Mode: ON.
- OpenClaw binding: `accountId: tt-mockup-bot` → `agentId: tt-mockup-bot`.

---

## Open Items — As of 2026-03-23 Transfer

| # | Item | Status | Action needed |
|---|---|---|---|
| 1 | TT Mockup Bot `message.im` event | Uncertain | Check Slack App settings, verify event is saved |
| 2 | Shelby Nations bounce in Resend | Open | Check resend.com dashboard → Suppressions, remove shelby@tigertracks.ai if present |
| 3 | Retreat Vercel Cron weather | Active | Disable after April 3, 2026 |
| 4 | Self-Eval redesign | Complete | Deployed 2026-03-23 — toast on save, all roles on page |
| 5 | Eliz agent shell | Unresolved | `/workspaces/eliz/` exists with identity files but no Slack app wired. Either provision (new Slack app) or remove from config. |

---

## Fragile Things — New Machine Attention Required

1. **Git author email.** Must be `cliffminimac@gmail.com` for Vercel CI deployments. If commits use system default (`cliffsimmons@Cliffs-Mac-mini.local`), Vercel rejects them with "Git author must have access to the team." Set per-repo: `git config user.email "cliffminimac@gmail.com"`. Set globally: `git config --global user.email "cliffminimac@gmail.com"`.

2. **Vercel Blob CDN caching.** Never overwrite a Blob key. Always write new timestamped key. CDN caches for ~5 min after overwrite — old data will be served to users. Key format: `{baseKey}__{Date.now()}.json`. Dedup in GET by sorting descending and taking first per base key.

3. **Supabase client in serverless.** Always call `createClient()` per-request. Never use singleton/cached client. Singleton returns stale/partial data in Vercel serverless.

4. **`vercel.json` `functions` runtime spec.** Do NOT include `"runtime": "@vercel/node@3"` in functions config — Vercel rejects it. Use default Node.js runtime (omit the runtime key).

5. **No `<script>` or `<style>` in injected HTML on resources.tigertracks.ai.** All JS must be in `index.html` or `api/_app-scripts-bundle.js`. This is an architectural constraint baked into how the app serves injected HTML snippets.

6. **Eliz agent workspace.** `/Users/cliffsimmons/.openclaw/workspaces/eliz/` has SOUL.md, USER.md, IDENTITY.md, AGENTS.md, HEARTBEAT.md, TOOLS.md but NO Slack app binding. It's inert. Do not confuse with the main Sage bot. If Eliz DMs the main Sage bot (U0AJ7TS64V6 Slack app), that's Sage responding. The eliz agent workspace is for a potential future dedicated bot.
