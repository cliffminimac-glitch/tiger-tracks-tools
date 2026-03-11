# TT Check-Ins QA Report
**App:** https://tt-checkins.vercel.app/
**Date:** 2026-03-11
**QA By:** Sage (AI Agent)
**Status:** 🔴 Issues Found — See Report

---

## Summary

Pre-auth QA completed. Found **1 Critical bug** and **1 Minor bug** that need fixes before rollout. The majority of QA (Sections 2–10 from the spec) requires actual Tiger Tracks Google accounts (employee + manager roles) and cannot be completed by an AI agent without credentials.

---

## ✅ PASSED (Pre-Auth Checks)

| # | Check | Result |
|---|-------|--------|
| 1.1 | Login screen loads at app URL with Tiger Tracks logo + Google sign-in button | ✅ Pass |
| 1.1 | No broken images or layout issues on login screen | ✅ Pass |
| 1.1 | Login card shows correct branding and subtitle | ✅ Pass |
| Responsive | Mobile (375px) — login renders cleanly, no overflow or cut-off | ✅ Pass |
| Responsive | Tablet (768px) — login renders cleanly | ✅ Pass |
| Responsive | Desktop (1440px) — login renders cleanly | ✅ Pass |
| Auth guard | Hash-based protected route (`/#/weekly-sync`) correctly shows login screen | ✅ Pass |

---

## 🔴 CRITICAL BUGS

### BUG-001 — Direct URL navigation breaks with Vercel 404 (Critical)

**Section:** Section 5 (Active Meeting Links) + Section 1 (Authentication)
**Severity:** Critical — blocks core workflow

**Steps to reproduce:**
1. Navigate directly to `https://tt-checkins.vercel.app/weekly-sync` (or `/dashboard`, `/home`, `/monthly-feedback`, etc.)
2. Observe: Raw Vercel "404: NOT_FOUND" error page appears

**Expected:** User should be redirected to the login screen (or shown an auth-gated page)
**Actual:** Vercel throws a `NOT_FOUND` error, displaying a bare error page with no Tiger Tracks branding

**Why this is Critical:**
The "Active Meeting Links" feature (Section 5) generates unique links for each team member. If those links use path-based routing (e.g., `/weekly-sync?user=alex`), every recipient who clicks the link will see a Vercel 404 instead of their form. This would completely break the link-sharing workflow that the tool is designed around.

**Root cause:** The Vercel deployment is missing a `vercel.json` rewrite rule for the SPA (Single Page Application). Without it, Vercel can't resolve client-side routes.

**Fix (5 minutes):** Add a `vercel.json` file at the project root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Browser/Device:** Chrome (desktop 1440px)
**Screenshot:** Vercel 404 page with `Code: NOT_FOUND` and request ID

---

## 🟡 MINOR BUGS

### BUG-002 — Missing favicon (Minor)

**Section:** Section 10 (Error Handling) / Section 11 Console Errors
**Severity:** Minor (cosmetic)

**Details:** `https://tt-checkins.vercel.app/favicon.ico` returns a 404. The browser tab shows no icon.
**Fix:** Add a Tiger Tracks favicon to the project's `public/` folder.

---

## ⚠️ CANNOT TEST WITHOUT CREDENTIALS

The following sections from the QA spec require actual Tiger Tracks Google accounts with employee and manager roles. I cannot complete these as an AI agent:

- Section 1.2–1.5: Sign-in, redirect to dashboard, non-TT account rejection, sign-out
- Section 2: Navigation, sidebar, all page loads, Quick Reference contact link
- Section 3: Weekly Manager Sync Form (both employee and supervisor views)
- Section 4: Monthly Feedback Review Form
- Section 5: Active Meeting Links (link generation, copy, email reminders)
- Section 6: Give Feedback (routing, anonymity, validation)
- Section 7: Submissions / History (filters, role-based visibility)
- Section 8: Role-Based Access Control (all boundary tests)
- Section 9: Data Integrity & Auto-Save
- Section 10: Error handling, special characters, offline behavior

**Recommendation:** To complete the QA, we need:
1. One test account with employee-level access
2. One test account with manager-level access (with at least one direct report configured)
3. A human tester who can sign in and walk through Sections 2–10

If Eliz can provide credentials or arrange for a team member to do a live walkthrough, I can guide them through each test case and document results.

---

## 🔢 Issue Log (for dev team)

| ID | Severity | Section | Description | Fix |
|----|----------|---------|-------------|-----|
| BUG-001 | Critical | Routing / Active Meeting Links | All direct path URLs return Vercel 404 | Add `vercel.json` SPA rewrites |
| BUG-002 | Minor | Cosmetic | Missing favicon (404) | Add favicon.ico to public/ |

---

## Final Sign-Off

**Status:** ❌ Issues Found — NOT ready for team rollout until BUG-001 is fixed

**Completed by:** Sage (AI Agent)
**Date:** 2026-03-11

*Note: Full sign-off requires completion of Sections 2–10 with real user accounts.*
