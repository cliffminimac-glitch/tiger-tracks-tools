# tt-peoplemetrics QA Report
**Site:** https://tt-peoplemetrics.vercel.app/  
**Date:** March 11, 2026  
**Reviewer:** Sage (OpenClaw agent)  
**Audience:** Cliff and Henry only  
**Status: ⚠️ NOT READY — 1 Critical, 3 Major data accuracy issues require resolution**

---

## Overall Assessment

The tool is functional and well-structured. All 8 tabs load, auth logic is correct, performance-flagged employees are cleanly separated from the promotions pipeline, and most calculations are accurate. However, there is one critical security vulnerability and three data accuracy errors that must be resolved before this tool is used for live compensation decisions.

---

## Critical Issues

### 🔴 C-1: All Sensitive Data Is Visible in Page Source Without Authentication

**Section:** 13 (Data Security)  
**What's wrong:** The entire dataset — all employee salaries, band positions, performance actions, incident logs, and promotion details — is hardcoded directly into the HTML/JavaScript of the page. The login gate is a CSS overlay (z-index:9999) that hides the dashboard visually, but all data is present in the page source. Anyone who opens `view-source:https://tt-peoplemetrics.vercel.app/` or uses browser DevTools while unauthenticated can read every piece of sensitive data in the tool.  
**Verified:** Unauthenticated `curl https://tt-peoplemetrics.vercel.app/` returns the full employee dataset, all salary figures, and the complete performance action content.  
**Severity:** Critical — This is a confidential HR tool containing salary data, active performance improvement details, and incident logs. The current implementation provides no actual data protection.  
**Fix required:** Move all sensitive data to server-side API endpoints protected by session authentication. The page should load an auth shell only; data should be fetched via authenticated API calls after login is verified server-side. Alternatively, use a backend-for-frontend pattern where the Vercel serverless function validates the Google session token before returning any data.  
**Security note:** An API calls check via network tab would currently show data returned without auth headers because there are no API calls — everything is in the initial HTML payload.

---

## Major Issues

### 🟡 M-1: Total Payroll and Average Salary Stats Are Incorrect

**Section:** 1 (Home Dashboard), 9 (Q2–Q4 Planning — Current State Assessment)  
**What's wrong:** The home dashboard displays $2.98M total payroll and $119K average salary. The actual sum of all 25 employee salaries in the data is $2,844,750 (avg: $113,790). The discrepancy is $135,250 for payroll and $5,210 for average salary. The Q2–Q4 section also references "~$2.98M across 25 employees" in the Current State Assessment.  
**Both stats need to be corrected wherever they appear.** Either the data or the stats are wrong.

### 🟡 M-2: Phase 3 Shows Megan Brenneke at Pre-Promotion Salary

**Section:** 9 (Q2–Q4 Planning — Phase 3)  
**What's wrong:** Phase 3 (Q3–Q4 2026) lists Megan Brenneke with her current salary of $75,000 and a Phase 3 promo target that implies +$13,000. However, Phase 1 already promotes her to $85,000 effective March 9, 2026. By the time Phase 3 runs (Q3–Q4), her salary will be $85,000.  
**Impact on math:**
- Phase 3 individual entry should read $85,000 → $88,000 (+$3,000), not $75,000 → $88,000 (+$13,000)
- Phase 3 total budget should be $44,000, not $54,000
- Year 1 total investment should be $65,000–$73,000, not $75,000–$83,000
- The stated Phase 3 total of $54,000 and Year 1 total of $75K–$83K are both overstated by $10,000

### 🟡 M-3: Allison Long's Band Position Will Render as Broken

**Section:** 2 (Team Roster), 8 (Salary Band Visualizations)  
**What's wrong:** Allison Long is listed as Senior Account Manager at a salary that is $27,000 below the SrAM band minimum. Her `partTime:true` flag explains the compensation structure, but the band % calculation renders as a large negative number, which will appear visually broken in the compensation table and band position chart.  
**Fix:** Either (a) add a visual note on her row flagging her as part-time with a non-standard band treatment, (b) assign her to the band appropriate for her actual hours/scope, or (c) exclude part-time employees from the band position chart. As-is, the chart dot and table row for her band% will show a nonsensical value.

---

## Minor Issues

### 🟠 N-1: Director of Client Success Band Is Degenerate (Low = High)

**Section:** 2 (Team Roster), 8 (Band Visualizations)  
**What's wrong:** The Director of Client Success salary band has the same value for both low and high ends. This makes band % meaningless for the one employee at this level and will render the band as a single point rather than a range in the visualization.  
**Fix:** Set a proper band range (e.g., $155K–$175K) consistent with the next-level Senior Director band.

### 🟠 N-2: Change Log Count Off by 1

**Section:** 3 (Change Log)  
**What's wrong:** The change log header states "42 changes across 25 employees" but the sum of individual employee change counts in the data is 43.  
**Fix:** Audit and reconcile to either 42 or 43.

### 🟠 N-3: Hiring Forecast New Payroll Estimate Doesn't Reconcile

**Section:** 6 (Hiring Forecast)  
**What's wrong:** The forecast summary states "$537K–$795K est. new payroll (excl. referral partner)" but adding the stated salary band floors and caps for the 5 salaried roles (with 1–2 ACs) yields $437K–$695K. The $100K gap on both ends is unexplained.  
**Fix:** Either verify the calculation methodology or add a note explaining what's included (e.g., if a mid-band estimate is used rather than band floor/cap).

### 🟠 N-4: No Search Engine Protection

**Section:** 13 (Data Security)  
**What's wrong:** The page has no `<meta name="robots" content="noindex,nofollow">` tag and no `robots.txt` protection. While the URL is not publicly promoted, it could be indexed.  
**Fix:** Add `<meta name="robots" content="noindex,nofollow">` to `<head>`.

---

## What's Clean ✅

| Check | Status |
|---|---|
| All 8 tabs load without errors (home, table, changelog, promoactions, hiring, performance, overview, q2q4) | ✅ |
| Tab navigation with active state highlight | ✅ |
| Employee count: 25 | ✅ |
| Auth: Google OAuth with email allowlist (cliff@, henry@, elizabeth@) | ✅ |
| Session persistence via localStorage with expiry check | ✅ |
| Performance-flagged employees absent from promotions pipeline | ✅ (Bruno ✅, Steven ✅, Alex ✅) |
| Megan Brenneke approved promo: AC → AS, $75K → $85K, +$10K (13.3%), AS Band $85K–$95K | ✅ All correct |
| Gretchen Hess promo: current $117K, range $122K–$130K, increase $5K–$13K (4.3%–11.1%), SrAM Band $122K–$140K | ✅ All math verified |
| Phase 1 budget: $15K–$23K | ✅ |
| Phase 2 budget: $6K | ✅ |
| Phase 2 employees and amounts (two individuals at $85K → $88K each) | ✅ |
| Phase 3 entries for Tate Dewey, Seth McDaniel, Daren Kalkoffen: role, salary, target, cost | ✅ |
| Promo targets at 25th–40th percentile of next band | ✅ (verified Daren Kalkoffen: $107K is in range) |
| Bruno Milalaf: title, salary, reporting line, $4,500 LFG refund, client names (LFG, Tenex, Cleavage Clinic) | ✅ |
| Steven Jatich: title, salary, all 11 clients in incident log accounted for | ✅ |
| Alex Blumberg: title, salary, documented issues | ✅ |
| Hiring forecast: all 6–7 positions listed | ✅ |
| Dir of Partnerships note (replaces 2 roles consolidated into 1) | ✅ |
| Hiring priority labels (High Priority, Open, Pipeline) | ✅ |
| Projected team size: 25 + 6–7 = 31–32 | ✅ |
| Band ranges: Account Coordinator through VP of Partnerships all defined | ✅ |
| HTTPS | ✅ |
| No placeholder text or dev artifacts | ✅ |
| Gretchen Hess timing: "before retreat" — retreat is March 31, still actionable | ✅ |

---

## Action Items Before Active Use

1. **[Critical]** Rebuild data layer to serve from authenticated API endpoint — no data in HTML source
2. **[Major]** Correct payroll total and average salary stats (appears in home dashboard + Q2–Q4 Current State)
3. **[Major]** Fix Phase 3 Megan Brenneke entry: salary → post-Phase-1 figure; recalculate Phase 3 budget and Year 1 total
4. **[Major]** Add visual flag for Allison Long part-time status in band chart and table
5. **[Minor]** Fix DCS band range (low ≠ high)
6. **[Minor]** Reconcile change log count (42 or 43)
7. **[Minor]** Verify or document hiring estimate methodology
8. **[Minor]** Add `<meta name="robots" content="noindex,nofollow">`

---

*This report is for Cliff and Henry only. Do not distribute.*
