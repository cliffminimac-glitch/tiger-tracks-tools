# BOT-SETUP-HISTORY.md
## Sage — Full Setup History and Architecture Decisions
*Compiled 2026-03-23 | Pre-transfer reference*

---

## Origin

**First session: 2026-02-27.**
Cliff Simmons (VP Partnerships & Growth, Tiger Tracks) started OpenClaw and bootstrapped the agent. Named the bot **Sage** (🌿). The first session was interrupted by BD tool brainstorming — the naming/vibe conversation was never completed in full. BOOTSTRAP.md was later deleted (2026-03-23).

Initial context set in that first session:
- Tiger Tracks company profile, services, ICP, team structure
- Revenue target: $80K/mo net new MRR in 2026
- Two existing tools: Prowl (LinkedIn content) and Pounce v1 (cold outreach), both on Surge
- Immediate goal: rebuild Pounce as a proper web app (Pounce v3)

---

## Identity Files

All live in `/Users/cliffsimmons/.openclaw/workspace/`:

| File | Purpose | Last significant update |
|---|---|---|
| `SOUL.md` | Core identity, values, build philosophy, engineering standards, CGO role | 2026-03-16 (Ashley's Executive Guardrails added) |
| `IDENTITY.md` | Name (Sage), role, vibe, emoji | Created early March |
| `USER.md` | Cliff's profile, role, context | Updated March 2026 |
| `AGENTS.md` | Session startup sequence, memory rules, heartbeat rules, group chat rules | Standard OpenClaw template, customized |
| `TOOLS.md` | Local setup notes (empty by default, no special entries) | Not heavily used |
| `BUILD_STANDARDS.md` | Full engineering standards for all tools | Created mid-March |
| `HEARTBEAT.md` | Periodic check task list | Empty (no active heartbeat tasks) |
| `MEMORY.md` | Long-term curated memory | Created 2026-03-23 (was missing for entire prior history) |

### SOUL.md history
- Created during bootstrap with core identity/values
- **2026-03-13:** Peter Corbett skill-vision build philosophy added ("Build skills, not answers", "Stack iteratively", etc.) — derived from a Manus AI session Cliff shared
- **2026-03-16:** Ashley added three sections at her explicit direction:
  - "My Role at Tiger Tracks" — Lead Engineer + CGO, engineering standards (zero hardcoding, validation first, idempotency, architect's bias)
  - "Executive Guardrails" — autonomous monitoring, TT UI standards (Ink/Teal palette), ICP guardrail
  - These sections use Ashley-voice language throughout

### MEMORY.md
- **Was entirely absent until 2026-03-23.** No MEMORY.md existed in the workspace for the entire history of this instance. Created fresh on 2026-03-23 from synthesized daily session notes during the pre-transfer cleanup.
- This is a risk: if a new session compacts before MEMORY.md is populated, earlier history may not be surfaced. The daily memory files are the backup.

---

## OpenClaw Configuration (`openclaw.json`)

**Location:** `/Users/cliffsimmons/.openclaw/openclaw.json`

### Slack setup
- **Main bot token:** `[REDACTED — see openclaw.json]` (Sage / main bot)
- **Main app token:** `[REDACTED — see openclaw.json]`
- **Account name:** `default` (main Sage bot)
- **Second bot:** `tt-mockup-bot` (App ID `A0ALQNQ6S91`) — dedicated bot for Eliz's site creation/QA work
- **Allowed senders (both bots):** `U0AJ7TS64V6` (Cliff), `U0AH6B1Q1HV` (Ashley), `U0AJGQDTGLR` (Eliz)
- **DM policy:** `allowlist` (only allow listed senders)
- **Group policy:** `open` (main), `allowlist` (per-account)

### Agents
- `main` — Sage, primary agent, uses main Sage Slack bot
- `tt-mockup-bot` — Mockup Bot, secondary agent, uses tt-mockup-bot Slack credentials
- `eliz` — shell only, no Slack binding, never active
- `linkedin-bot` — legacy, used for one LinkedIn recruiting session (March 2026)

### Gateway
- **Port:** 18789
- **External URL:** https://openclaw.cliffeliz.ai
- **Token:** `0fa8e90e9ef8d187eb6b4cca719723a842f16449b03979e7`

---

## Infrastructure History

### Phase 1: Python HTTP servers (abandoned)
**Feb-early March 2026.** All tools were served by Python HTTP servers on the Mac mini (ports 3001-3006), tunneled via Cloudflare Named Tunnel to `*.cliffeliz.ai` subdomains. pm2 managed the processes, launchd handled restarts.

**Why abandoned:** Mac mini as single point of failure. Any crash, sleep, or power cycle kills all tools. No redundancy, no zero-downtime deploys, no serverless APIs. Cloudflare tunnel leaked local IP if misconfigured.

**Decommissioned 2026-03-23:**
- Killed 4 orphaned Python HTTP servers (PIDs 1047, 1056, 1050, 1051)
- Unloaded 4 launchd plists: `ai.cliffeliz.checkins.plist`, `ai.cliffeliz.eliz.plist`, `ai.cliffeliz.recruiting.plist`, `ai.cliffeliz.treehouse.plist`
- Plists were auto-respawning killed processes; `launchctl unload` was required, not just `kill`

### Phase 2: Vercel deployment (current)
**2026-03-09 onward.** All tools migrated to Vercel under `tiger-tracks` team (`team_iNYISOilQiNMo3Kwxdb19K8h`).

**Why Vercel:** Zero-downtime deploys, serverless API routes, Vercel Blob for persistence, automatic HTTPS, global CDN, git-connected deploys, Vercel Cron for automation. Tools are now Mac-independent.

**Vercel CLI auth:** `cliffminimac-glitch` GitHub account. CLI token: `vca_10oiS71DHWo2TMg5IcrRr1EG8739yJPGVEkisUdSyx1Ykhhh332pqIBY`.

### Phase 3: Cloudflare DNS
**2026-03-09.** All `*.cliffeliz.ai` subdomains updated from A records (Mac mini IP) to CNAME records (`cname.vercel-dns.com`, proxy OFF). Done via Cloudflare API.
- Zone ID: `8ea56b38d02362966806b5013a012f1e`
- API token: `dgRADRsKjKQM6XVXwOWmumizszwVkhTBaSNO6h4X`

`tigertracks.ai` subdomains use SiteGround DNS (no API access — all changes require manual SiteGround login).

---

## Key Architectural Decisions and Why

### 1. Vercel Blob timestamped keys (never overwrite)
**Decision:** Every save writes a new key (`{baseKey}__{Date.now()}.json`). GET deduplicates by sorting descending and taking first.
**Why:** Vercel CDN caches blob public URLs for ~5 minutes after overwrite. If you write to the same key, users get stale data for 5 minutes. Timestamped keys bypass the cache entirely.
**Where this applies:** tt-checkins (all feedback/sync/eval saves), tiger-tracks-resources (same).

### 2. `createClient()` per-request in Supabase serverless
**Decision:** Never use a singleton/module-level Supabase client in Vercel serverless functions. Always call `createClient()` inside the handler.
**Why:** Module-level singletons are cached across invocations in serverless environments. In Pounce, this caused the dashboard to return only 112 of 187 prospects (partial stale data from an earlier invocation). Fixed by calling `createClient()` directly in the route handler.
**Where this applies:** All Pounce API routes.

### 3. No `@vercel/node@3` in `vercel.json` functions config
**Decision:** Never specify `"runtime": "@vercel/node@3"` in the `functions` block of `vercel.json`.
**Why:** Vercel rejects it with "Function Runtimes must have a valid version." Use default Node.js runtime (omit the `runtime` key). Discovered during peoplemetrics rebuild; wasted one deploy cycle.
**Where this applies:** Any `vercel.json` with a `functions` block.

### 4. Git author email must be `cliffminimac@gmail.com`
**Decision:** All git commits must use `cliffminimac@gmail.com` as author email.
**Why:** Vercel checks the commit author against team members. The Mac mini's system default is `cliffsimmons@Cliffs-Mac-mini.local` which is not a Vercel team member. Vercel rejects deployment with "Git author must have access to the team." This caused multiple failed deploys (tt-retreat, tt-checkins) before the pattern was identified.
**Fix:** `git config user.email "cliffminimac@gmail.com"` per repo, or globally.

### 5. Resend `batch.send()` for email reminders
**Decision:** `send-reminders.js` uses `resend.batch.send()` to send all 22 reminder emails in a single API call.
**Why:** Sequential sends timed out at ~10/22 emails on Vercel's 10-second serverless limit. `batch.send()` parallelizes all 22 in one call. `maxDuration: 60` set in `vercel.json` for this function.

### 6. peoplemetrics server-side auth
**Decision:** Rebuilt from CSS-overlay-only auth to proper server-side auth (api/verify, api/data, api/logout).
**Why:** Original design had all salary/comp data in the page source. Any unauthenticated request returned full employee data. This is a critical security vulnerability for a tool with 25 employees' salaries, performance actions, and comp bands.
**Session cookie:** `tt_pm_sess`, HttpOnly, Secure, SameSite=Lax, 8hr, HMAC-SHA256 signed with SESSION_SECRET.

### 7. No inline employee data anywhere
**Decision:** Employee names, emails, salaries, and org chart data are never in the page source of public-facing tools.
**Why:** After the peoplemetrics audit found salary data in source, a standing rule was established: all sensitive data must be served by authenticated API routes only.

### 8. TT UI standards (Ink/Teal palette)
**Decision:** All Tiger Tracks tools use: Ink (#0A1119) backgrounds, Tiger Teal (#229FA1) accents, Charcoal (#1B2126) panels, White (#FFFFFF) text, Georgia serif for headlines, Calibri/sans for body.
**Why:** Ashley established this as a non-negotiable standard on 2026-03-16. Tools built outside this palette have been rebuilt. "Every page should look like it belongs to the same executive-grade product."

---

## Things That Were Tried and Abandoned

| Thing | Why abandoned |
|---|---|
| Python HTTP servers + pm2 + launchd | Mac mini SPOF; all tools go offline if Mac sleeps/crashes. Replaced by Vercel. |
| Cloudflare Named Tunnel for Python servers | Replaced when tools moved to Vercel. Tunnel still exists for openclaw.cliffeliz.ai gateway. |
| LinkedIn enrichment via Proxycurl | Proxycurl shut down → rebranded as NinjaPear. Also: LinkedIn ban concern. Code built in `src/lib/linkedin.ts` but never activated. |
| OpenAI GPT-4o for Pounce sequences | Replaced with Claude Sonnet on 2026-03-09. Claude tone was closer to Ashley Voice. |
| Pixel/tracking signal detection in Pounce intelligence | Removed 2026-03-11. Generated unverifiable claims in email copy ("no retargeting setup detected"). |
| Surge.sh hosting (Prowl v1, Pounce v1) | Legacy hosting platform. Pounce rebuilt from scratch on Vercel as Pounce v3. Prowl v1 abandoned. |
| OpenClaw cron for Pounce alerts | Migrated to Vercel Cron 2026-03-23. Mac mini was SPOF for Ashley's lead alerts. |
| TT Website Daily Delta cron | Deleted 2026-03-23. Was comparing tt-website-mockup against March 16 baseline and reporting to Eliz daily. Mockup hasn't been updated since March 16; was sending noise. |
| Resend `tigertracks.ai` domain | Added to Resend account, then deleted per Cliff's request (2026-03-11). Added again (by mistake) and removed. `tigertracks.ai` is in Resend and verified as of 2026-03-23 — no further changes needed. |
| `vercel.json` `@vercel/node@3` runtime spec | Caused "Function Runtimes must have a valid version" error. Removed from all `vercel.json` files. |

---

## Cron History

| Job | State | Notes |
|---|---|---|
| Pounce alert cron (OpenClaw) | Deleted 2026-03-23 | Migrated to Vercel `/api/cron/pounce-alerts` (every 15 min) |
| TT Website Daily Delta (OpenClaw) | Deleted 2026-03-23 | Was sending noise; mockup not updated since March 16 |
| Retreat weather (OpenClaw) | Deleted 2026-03-23 | Was already disabled; Vercel Cron handles it |
| Pounce alert (Vercel, `/api/cron/pounce-alerts`) | Active | Every 15 min; state in Supabase `settings` table; Slack webhook to Ashley |
| Retreat weather (Vercel, `/api/weather`) | Active | Should be disabled after April 3, 2026 |
| **OpenClaw crons total** | **Zero** | No OpenClaw cron jobs exist as of 2026-03-23 |

---

## All Integrations and Credentials

| Service | Account | Key/Token | Notes |
|---|---|---|---|
| Vercel | tiger-tracks team | CLI token in config | team_iNYISOilQiNMo3Kwxdb19K8h |
| GitHub | cliffminimac-glitch | Git auth via SSH/HTTPS | All repos private |
| Cloudflare | cliffminimac@gmail.com | `dgRADRsKjKQM6XVXwOWmumizszwVkhTBaSNO6h4X` | cliffeliz.ai zone only |
| Google OAuth | tigertracks.ai workspace | Client ID `1010698547754-h3pfeegsn3tkemksjjtjlcgccoqtqbt6` | All tools except peoplemetrics use this |
| Resend | cliffminimac account | Admin: `re_DH2UAk87_D6DNKZx8HFjyxgxssGk8XDWc` | Both tigertracks.ai and cliffeliz.ai verified |
| Supabase | Pounce project | URL: `https://bautxwvcewhqrcicfgfr.supabase.co` | Ashley owns all Pounce/Supabase decisions |
| Apollo | TT account | `XzYubR5F8JtBlbPkQ0398w` | Pounce lead sourcing |
| MillionVerifier | TT account | `8cb5ov6uH9ASVQkLZNP1Icq11` | Pounce email verification |
| Instantly | TT accounts | 4 accounts, trytigertracks.ai domain | Pounce email sending |
| Slack (Sage bot) | EKOCRS workspace | Bot: `[REDACTED — see openclaw.json]` | Main Sage bot |
| Slack (Mockup Bot) | EKOCRS workspace | Bot: `[REDACTED — see openclaw.json]` | Eliz's dedicated mockup bot |
| HubSpot | TT portal | Portal ID `44278456` | CRM |
| GTM | TT container | `GTM-TGZKSQMT` | Installed on audit landing pages |

---

## Transfer Checklist (Completed 2026-03-23)

- [x] Killed 4 orphaned Python servers + unloaded 4 launchd plists
- [x] Deleted both BOOTSTRAP.md files
- [x] Cleared stale log files
- [x] MEMORY.md created (was entirely missing)
- [x] All 3 repos with unpushed commits pushed (tt-audit-landing, tt-comp-analysis, workspace root)
- [x] node_modules deleted from pounce-v3 (415MB) and tiger-tracks-recruiting (30MB)
- [x] pounce-v3/.next build cache deleted (396MB)
- [x] pounce-alert-state.json deleted (orphaned)
- [x] Stale QA reports and temp files archived
- [x] peoplemetrics server-side auth rebuilt and deployed
- [x] peoplemetrics.tigertracks.ai CNAME added to SiteGround — live
- [x] Pounce alert cron migrated from OpenClaw to Vercel
- [x] OpenClaw cron jobs: zero remaining
- [x] Self-eval toast notification deployed
- [x] tt-website-mockup given own GitHub repo
- [x] tt-tools refreshed with current URLs, deployed
- [x] linkedin-bot memory archived
- [x] All git repos clean (zero unpushed commits)
- [x] Workspace size: 215MB (down from 1.0GB)
- [x] Full backup created: `/Users/cliffsimmons/Desktop/sage-backup-2026-03-23/` (404MB)
- [x] Pounce ownership formally transferred to Ashley
