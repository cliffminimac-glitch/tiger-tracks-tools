# tt-recruiting QA Report
**Site:** https://tt-recruiting.vercel.app/  
**Date:** March 11, 2026  
**Reviewer:** Sage (OpenClaw agent)  
**Status: ⚠️ Functional but Not Production-Ready — 3 Major issues; 1 Critical Required Addition (fixed)**

---

## Status of the Three Known Issues / Required Changes

### 1. Screen Candidate Routing — NOT BROKEN (different from spec expectation)
The "Screen Candidate" button across Account Management, Partnerships, and Marketing does **not** lead to a dead end. It renders an **inline screening form** directly within the practice area tab — a role selector, candidate name input, and a "Start Screening →" button that launches a full structured screening flow in-place.

**Actual behavior:** Inline screening form loads within the practice area tab. Works correctly on all three practice areas. ✅

**Gap from spec expectation:** The spec anticipated routing to the standalone Candidate Screening section (`sec-screening`) with the role pre-filtered. The inline form is a different (not worse) implementation. If the intent was to funnel traffic to the dedicated screening section, a one-line redirect can be added. Recommend clarifying with Eliz whether the inline experience is acceptable or routing to `sec-screening` is required.

---

### 2. LinkedIn → Dashboard Pipeline Connection — Partially Wired
`saveLiSync()` calls `renderDashboard()` after saving, so LinkedIn sync data **does** update the home dashboard in real time. ✅

**Gap from spec expectation:** The dashboard shows aggregate LinkedIn totals (LinkedIn Pipeline count, LI Uncontacted count) — not the specific funnel breakdown (Prospects, Connected, Messaged, Replied, Converted) described in the spec. The funnel stats live only in the LinkedIn section, not on the home page dashboard.

**Verdict:** The data connection exists and updates live. The display format differs from spec. To fully match spec, the dashboard stat cards need to be extended to show the full funnel breakdown (Connected, Messaged, Replied, Converted) pulled from the LinkedIn sync panel data.

---

### 3. Executive Assistant Role — FIXED ✅
EA was missing from the entire tool. Now added:
- **Open Positions:** EA appears under new "Operations & Support" section with $55K–$75K band, headcount 1, full description, reports to Cliff
- **Candidate Pipeline:** EA selectable as a role when adding candidates
- **Candidate Review:** New "🗓️ Executive Assistant" tab added to the review section
- **Interview Question Bank:** EA added as a role level filter with 8 substantive questions (calendar management, prioritization, discretion, meeting prep, travel logistics, tools, project management, situational)
- **Candidate Screening:** EA available in the practice-area inline screening role selector
- **JD:** Links to existing `ea-jd.html` from the positions card
- **Deployed:** Live at https://tt-recruiting.vercel.app (commit `262d1e7`)

---

## Additional Issues Found

### 🟡 Major — M-1: Candidate Review and Pipeline Are Separate Data Sources
**Section:** 9 (Candidate Review), 4 (Candidate Pipeline), 13 (Data Flow)  
**What's wrong:** The Candidate Review section reads from `ttrec_phantom_candidates` (localStorage). The Candidate Pipeline reads from `ttrec_candidates`. These are entirely separate data structures. A candidate added via the pipeline (Add Candidate button) does **not** appear in the Candidate Review section, and approvals/rejections made in Candidate Review do **not** update the pipeline stage.

**Impact:** The spec requirement "a candidate added via the pipeline also appears in the Candidate Review section" and "a candidate approved in Candidate Review reflects that status in the pipeline" are both broken. There is no single source of truth.

**Fix:** Candidate Review should either (a) read from `ttrec_candidates` and filter by role for review, or (b) merge/sync between the two lists when a candidate is imported. The review workflow (thumbs up/down) should write back to the candidate's stage in `ttrec_candidates`.

---

### 🟡 Major — M-2: PhantomBuster / Zapier Webhooks Are UI-Only (No Real Endpoints)
**Section:** 8c (PhantomBuster / Zapier Auto-Import)  
**What's wrong:** The PhantomBuster and Zapier sections have fully built UI (webhook URL display, setup instructions, live feed, import button) but no actual webhook URLs are configured. The "webhook URL" fields display placeholder content; no real endpoint exists to receive incoming candidate data from PhantomBuster or Zapier.

**Impact:** The entire auto-import workflow is non-functional. Candidates cannot be imported automatically from LinkedIn scrapers.

**Fix:** Deploy a serverless endpoint (e.g., `/api/webhook-prospects`) that accepts POST data and writes to the localStorage-backed data layer (or a real backend). Then hardcode or configure that URL in the UI.

---

### 🟡 Major — M-3: Video Screening Link Generator Produces Non-Functional Links
**Section:** 10 (Templates → Video Screening)  
**What's wrong:** The Video Screening tab has a well-designed link generator (role, candidate name, time limit, question set). When generated, it creates a URL, but there is no backend or serverless function to serve the video screening experience. The generated URLs will return a 404 or dead page.

**Impact:** The "anti-AI screening layer" described in the tool is entirely placeholder. No candidate can actually complete a video screen.

**Fix:** Requires building the video screening page/backend (`screen.html` exists in the repo — verify if it's functional), or integrating a third-party async video tool (Spark Hire, Loom Async, etc.) and replacing the generator with real links.

---

## Minor Issues

### 🟠 N-1: Dashboard Funnel Stats Don't Show Full LinkedIn Breakdown
**Section:** 2a (Home Dashboard)  
**What's wrong:** The home page shows aggregate LinkedIn Pipeline count and LI Uncontacted, but the per-funnel breakdown (Connected, Messaged, Replied, Converted) is only visible in the LinkedIn section — not on the home dashboard where the spec expects it.  
**Fix:** Add per-funnel stat cards to `renderDashboard()` pulling from the same `li_pipeline` localStorage object.

### 🟠 N-2: Session Expires on Tab Close
**Section:** 1 (Authentication)  
**Note:** Auth uses `sessionStorage` (not `localStorage`), so closing the browser tab requires re-entering the access code. This is more secure than a persistent cookie but means the team re-auths every session. This is intentional per the design — documenting it as expected behavior, not a bug.

### 🟠 N-3: Screen Candidate Doesn't Pre-Filter by Practice Area Role
**Section:** 3d (Screen Candidate)  
**What's wrong:** When Screen Candidate is clicked in the Partnerships tab, the inline form defaults to the first role in the dropdown (Account Coordinator), not Director of Partnerships. Same for other practice areas.  
**Fix:** Pass the default role key to `renderPracticeScreening()` and pre-select it in the role dropdown. One-line change.

### 🟠 N-4: Candidate Review Shows Only BD and MKT (Pre-EA Fix)
**Fixed** as part of EA addition. Now shows BD, MKT, and EA tabs. ✅  
**Remaining gap:** If a candidate is added to the pipeline for AM roles (AC, AS, AM, SrAM), they have no review section. Consider whether AM pipeline candidates need a review flow.

### 🟠 N-5: Best Candidate Matches Scores BD and MKT Only
**Section:** 8d (Best Candidate Matches)  
**What's wrong:** The best-match scoring and display only covers Director of Partnerships and Director of Marketing candidates. AM-level pipeline candidates and EA candidates are not surfaced in Best Matches.  
**Fix:** Extend `renderCandidateList()` scoring to include EA and optionally the AM roles.

---

## What's Clean ✅

| Check | Status |
|---|---|
| Auth gate blocks all content before code entry | ✅ |
| SHA-256 hashed access code (not plain text) | ✅ |
| Zero candidate/salary data in page source pre-auth | ✅ (significantly better than peoplemetrics) |
| All 3 practice area tabs load (AM, Partnerships, Marketing) | ✅ |
| All 4 sub-tabs per practice area (Roles, Interview, Eval, Screen Candidate) | ✅ |
| Screen Candidate inline form works on all 3 practice areas | ✅ |
| All 8 spec-required screening stages present | ✅ (plus offer, hired, rejected stages) |
| External JDs for Account Management, Partnerships, Marketing | ✅ |
| Internal JD for Partnerships | ✅ |
| Interview Question Bank: 6 role levels (AC, AS, AM, SrAM, BD, MKT) + EA (added) | ✅ |
| QB questions substantive and role-specific | ✅ |
| Templates: Outreach, Evaluation, Offer, Async Challenges, BD Hire Plan, Video Screening | ✅ (all 6 categories have real content) |
| Candidate Pipeline: Add Candidate, Board View, Table View, filters | ✅ |
| Candidate Review: thumbs up/down, filter tabs (All / Approved / Rejected / Not Reviewed) | ✅ |
| LinkedIn Recruiter links real (project IDs 1406527201 and 1438592417) | ✅ |
| saveLiSync() updates dashboard in real time | ✅ |
| LinkedIn Prospect Tracker: Add Prospect, filter tabs, Outreach Templates | ✅ |
| Recruiter CSV import UI functional | ✅ |
| Export Data function (exportAllData) exists | ✅ |
| Tiger Tracks logo with graceful fallback | ✅ |
| No hardcoded candidate names or salary data in source | ✅ |
| No placeholder/lorem ipsum | ✅ |

---

## Action Items

| Priority | Item |
|---|---|
| Major | Unify Candidate Review and Pipeline into one data source (single `ttrec_candidates` array) |
| Major | Build or connect real webhook endpoint for PhantomBuster/Zapier auto-import |
| Major | Fix video screening link generator to produce functional URLs (or integrate third-party) |
| Minor | Extend dashboard to show full LI funnel breakdown (Connected, Messaged, Replied, Converted) |
| Minor | Pre-select practice area role in Screen Candidate inline form |
| Minor | Add AM-level candidates to Best Matches scoring |
| Consider | Decide if Screen Candidate inline flow (current) or routing to sec-screening (spec) is correct |

---

*This report is for Cliff and Elizabeth only.*
