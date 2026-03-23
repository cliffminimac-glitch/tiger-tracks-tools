# Tiger Tracks Miami Summit — QA Report
**Site:** https://tiger-tracks-retreat.vercel.app  
**Date:** March 11, 2026  
**Spec:** tt_retreat_qa_directions.docx  
**Status: ⚠️ NOT READY — 1 Critical, 2 Major issues require resolution before team distribution**

---

## Overall Assessment
The site is visually polished, content-complete, and fully navigable. All fixes within reach (no credentials, no DNS access, no external systems) have been implemented and deployed. One critical blocker remains that requires DNS access to Resend.

---

## Issues Found

### 🔴 CRITICAL

**C-1 — Topic & Recognition forms don't save data**
- **Section:** 7 (Interactive Forms)
- **What's wrong:** `tigertracks.ai` is not verified as a sending domain in Resend. Both the Open Space Topic form and the Recognition pre-submit form appear to succeed (show ✅ message) but the data is never actually delivered. The forms POST to `/api/submit-topic` and `/api/submit-recognition` which send via Resend to `elizabeth@tigertracks.ai` — but Resend rejects all sends from unverified domains.
- **Fix required:** Log into https://resend.com/domains and add/verify `tigertracks.ai`. Requires adding DNS records (TXT for SPF, CNAME for DKIM) in whoever manages tigertracks.ai DNS. Once verified, both forms work end-to-end. Backend code is complete and deployed.
- **Also affects:** tt-checkins.vercel.app email reminders — those report 22/22 sent but are silently failing for the same reason. Fix in Resend covers both.

---

### 🟡 MAJOR

**M-1 — SPA routing: direct path URLs returned 404** *(FIXED — deployed)*
- **Section:** Known Issues / Section 13
- **What was wrong:** No `vercel.json` existed. Navigating directly to `/agenda`, `/map`, `/submit`, `/recognition` etc. returned Vercel 404.
- **Fix applied:** Added `vercel.json` with SPA rewrite rule. All paths now return HTTP 200. ✅
- **Commit:** `6765081`

**M-2 — Team count inconsistency** *(FIXED — deployed)*
- **Section:** Known Issues / Section 9 / Section 14
- **What was wrong:** Overview stat said "25 People". Contact list has 27 people. TEAM recognition array has 27 members. Recognition section said "25 team members" and "45 minutes for 25 people."
- **Fix applied:** All instances updated to 27 throughout. ✅
- **Commit:** `6765081`

---

### 🟠 MINOR

**N-1 — Recognition ceremony "being finalized" placeholder** *(FIXED — deployed)*
- **Section:** Known Issues / Section 10
- **What was wrong:** Two instances of "⚠️ Ceremony details are being finalized - stay tuned for updates." Looks like a dev placeholder.
- **Fix applied:** Both notices removed. ✅
- **Commit:** `6765081`

**N-2 — Thursday dinner consistently TBD** *(Acceptable — verified)*
- **Section:** Known Issues / Sections 3, 4, 5, 14
- All references to Thursday dinner say "TBD" consistently. No broken links. Map section shows "Thursday Dinner - TBD" with "Location to be announced." This is intentional and consistent — not a bug.

**N-3 — Thursday Open Space facilitator TBD** *(Acceptable — verified)*
- **Section:** Known Issues / Section 4
- Thursday sessions: "facilitator: Team Member TBD" in one instance and "Thursday's sessions will be team-led (facilitator TBD)" in another. Consistent and intentional.

**N-4 — Email address capitalization in contacts** *(Cosmetic)*
- **Section:** Section 9
- Several mailto links use mixed case: `Billy@tigertracks.ai`, `Kersten@tigertracks.ai`, `Rachael@tigertracks.ai`, `Megan.Klein@tigertracks.ai`, etc. Email is case-insensitive so functionally fine, but inconsistent with others using lowercase.

**N-5 — Sanad Shuman phone missing** *(Intentional or data gap)*
- **Section:** Section 9
- Phone listed as "-". Either intentional or the number wasn't available.

**N-6 — Retreat objectives count** *(Minor content note)*
- **Section:** Section 6
- Site has 5 objectives (Build Real Team Culture, Strategic Alignment, Celebrate Wins, Q2 Planning, Surface the Hard Conversations) — spec says to verify the count is 5. ✅ Confirmed 5.

---

## What's Clean ✅

| Section | Status |
|---------|--------|
| Site loading & first impression | ✅ Loads fast, countdown accurate (Mar 31 2026), branding clean |
| Navigation | ✅ All 7 tabs work, scroll to sections, active state highlights |
| Logistics & essentials | ✅ Hotel, coworking, Monday dinner, boat night, per diem, Elizabeth's contact all correct |
| Agenda | ✅ All 5 days listed Mar 31–Apr 4, themes correct, no scheduling conflicts, facilitators named |
| Google Maps links | ✅ SLS LUX, Brickell Pipelines, Casa Tua, Boat dock (25.799762,-80.249234), Jackson Health all resolve |
| tel: links | ✅ 28 tel: links present including Elizabeth's (301) 646-7758 |
| mailto: links | ✅ All 27 team member emails present |
| sms: link | ✅ `sms:3016467758` present in photo upload section |
| Open Space Playbook | ✅ 4 principles, Law of Two Feet, marketplace format, suggested topics all present |
| Topic form UI | ✅ All fields render: Name, Category (8 options), Topic, Why it matters, Best day (4 options) |
| Recognition form UI | ✅ All fields render: Your Name, Who are you recognizing, What to say |
| Photo upload | ✅ File picker works, shows count, directs to Google Drive + text to Elizabeth |
| Prep & packing | ✅ All pre-work deadlines present, packing list complete, dress code table, expense instructions |
| Team contacts | ✅ 27 entries, all @tigertracks.ai emails, phone links tappable |
| Recognition ceremony | ✅ 5-step flow, tips, live tracking toggle works, resets on refresh, "finalized" notice removed |
| Local recommendations | ✅ All 6 categories present (Restaurants, Bars, Coffee, Shopping, Outdoors, Fitness) |
| Code of conduct | ✅ 5 items present (Phones Away, Respect Every Voice, Be Present, Confidentiality, Have Fun) |
| Daily norms | ✅ 5 norms present (9AM start, Working Lunches, Client Work Blocks, Daily Reflection, Downtime is Real) |
| Responsive layout | ✅ Nav scrollable, content reflows at 375px; no horizontal overflow |
| Placeholder text | ✅ Zero lorem ipsum or TODO items |
| Console errors | ✅ None observed |
| SPA routing | ✅ Fixed — all paths return 200 |
| Team count | ✅ Fixed — 27 throughout |

---

## Action Required Before Team Distribution

1. **[BLOCKING] Verify `tigertracks.ai` in Resend** — Log into https://resend.com/domains, add domain, add DNS records. Cliff or whoever manages tigertracks.ai DNS needs to add:
   - TXT record for SPF
   - CNAME records for DKIM
   - Once verified, both retreat forms AND tt-checkins email reminders will work.

2. **[OPTIONAL] Confirm Thursday dinner venue** — If a venue is now booked, update the 8 TBD references across the site. If still TBD, current state is clean.

3. **[OPTIONAL] Sanad Shuman phone** — Add if available.

---

## Commits This Session
| Commit | Description |
|--------|-------------|
| `6765081` | SPA routing, team count 25→27, remove "being finalized" placeholder, wire forms to backend |
| `37a440a` | Use Resend email for form persistence |
| `0cf2654` | Use resend SDK (vs raw fetch) for email delivery |
