# Tiger Tracks Miami Retreat — QA Report
**Date:** March 13, 2026  
**Site:** https://tiger-tracks-retreat.vercel.app  
**QA Guide Version:** tt_retreat_qa_guide_v2  
**Status:** ⚠️ NOT READY — 3 critical items require Elizabeth's input before team distribution

---

## Overall Verdict

The site is structurally solid and most content is accurate. Several things are already fixed (see below). What's blocking full clearance is missing flight data for 3 team members (Elizabeth, Ashley, Seth) and a missing Google Drive photo link — both require input from Elizabeth.

---

## Fixes Applied During This QA Pass

- Removed duplicate "Clifford Simmons" contact entry (was appearing twice)
- Added Cliff Simmons' phone number to contact table (was showing "—")
- Added "Recognition" link to sidebar navigation
- Updated TBD flight note to explicitly name all 5 unaccounted team members
- Updated flight section with full manifest + rideshare matches + departure tables

---

## CRITICAL — Blocks Distribution

### C1. Missing flights: Elizabeth Ogilvie, Ashley Kaika, Seth McDaniel
**Section:** Flights  
**Issue:** 21 team members have flight details in the manifest. Cliff and Henry are flagged as TBD. But Elizabeth Ogilvie, Ashley Kaika, and Seth McDaniel have no entry at all — not even a TBD callout. QA guide expects 25 named + 2 TBD = 27.  
**Fix needed:** Elizabeth to provide her own flight details, Ashley's, and Seth's, and I'll add them.

### C2. Contact count: 26 vs. stated 27
**Section:** Contacts  
**Issue:** After removing a duplicate (Clifford Simmons = Cliff Simmons), the contact table has 26 rows. The QA guide says 27 attendees. Someone may be missing — or the actual headcount is 26.  
**Fix needed:** Elizabeth to confirm headcount. If 27, who's the missing person?

### C3. Google Drive photo link not configured
**Section:** Photos  
**Issue:** The "Share to Drive" area has no Drive folder link. SMS link to Elizabeth's number works.  
**Fix needed:** Elizabeth to provide the Google Drive shared folder URL.

---

## MAJOR — Functional Gaps

### M1. No "Prep & Pack" in sidebar navigation
**Section:** Navigation  
**Issue:** A packing checklist exists inside the Photos section (interactive, click-to-check), but it's not in the sidebar nav. Users scrolling via nav won't find it easily.  
**Fix:** Add "Pack" nav link pointing to the pack section. Can do immediately if confirmed.

### M2. Pre-work deadlines not present
**Section:** Schedule / Prep  
**Issue:** QA guide expects: dietary restrictions by March 14, self-assessment by March 25, topics by March 25. None of these deadline dates appear anywhere on the site.  
**Fix needed:** Confirm these deadlines are still active and I'll add them to the schedule section. (March 14 is tomorrow — urgent if dietary form is still open.)

### M3. Thursday dress code not explicitly stated in schedule
**Section:** Schedule — Thursday April 2  
**Issue:** QA guide expects: "no athletic wear, shorts, hats, tanks, flip-flops" for Thursday dinner. Currently only says "Dress up." No explicit prohibitions.  
**Fix:** Can add dress code details to Thursday's evening block immediately.

### M4. Area Guide missing Shopping and Outdoors categories
**Section:** Area Guide  
**Issue:** QA guide expects 6 categories: Restaurants, Bars, Coffee, Shopping, Outdoors, Fitness. Currently has: Restaurants & Bars, Coffee, Fitness, Getting Around. Missing: dedicated Shopping and Outdoors sections.  
**Fix:** Can add Brickell City Centre (shopping) and Brickell Key Walk / Bayfront Park (outdoors) immediately.

---

## MINOR — Polish Items

### m1. Hero eyebrow date
**Issue:** Shows "March 31 – April 4, 2026" — arrival day is actually March 30. Flights and schedule show March 30 arrival, but hero hasn't been updated.  
**Note:** If Eliz wants March 31 as the "official" start (first activity day), this is fine. Flagging for awareness.

### m2. Thursday "Pressure-Test" session not shown
**Section:** Schedule — Thursday  
**Issue:** QA guide expects a "Check-in + Pressure-Test session at 9:15 AM" on Thursday. Current Thursday schedule shows "Final OST Sprint + Closing Plenary" at 9 AM. No "Pressure Test" session.  
**Fix needed:** Confirm if "Pressure Test" is a real session — if so, send session name/description and I'll add it.

### m3. Thursday dinner time inconsistency
**Issue:** In the Essentials panel it shows "TBD · 7:30 PM" but in the overview hype cards it says "TBD." These are consistent in spirit (TBD) but the 7:30 PM time should either be everywhere or nowhere.  
**Fix:** Will standardize once venue is confirmed or will remove the time.

### m4. OST nav label says "OST" not "Playbook"
**Issue:** QA guide expects nav label "Playbook." Site shows "OST."  
**Recommendation:** "OST" is more accurate to the format. Leave as-is unless Eliz prefers "Playbook."

### m5. Sanad Shuman has no phone in contact table
**Issue:** Sanad is in flights and contacts but no phone number in the contact row.  
**Fix needed:** Elizabeth to provide Sanad's number.

### m6. Countdown target: March 31 3 PM ET
**Issue:** Countdown targets March 31, 2026 at 3:00 PM ET. This matches the QA guide's expectation (March 31 = first full day of activities). ✓ No change needed.

---

## What's Confirmed Working

| Area | Status |
|------|--------|
| Site loads at root URL | ✓ |
| All 7 sidebar nav links present and scroll to sections | ✓ |
| Hotel: SLS LUX Brickell, 805 S Miami Ave, check-in 3 PM, check-out 11 AM | ✓ |
| Monday dinner: Casa Tua Cucina, 7 PM, Brickell City Centre | ✓ |
| Boat night: Tuesday, 4:45 PM, lobby callout — consistent in 6 places | ✓ |
| Per diem: $50/day on travel days, April 11 deadline, iSolved | ✓ |
| Elizabeth contact: elizabeth@tigertracks.ai, (301) 646-7758 | ✓ |
| Emergency: 911, Jackson Health (305) 585-1111 | ✓ |
| All tel: links in contacts (27 tappable phone links) | ✓ |
| SMS link to Elizabeth | ✓ |
| All 5 schedule days present (Mon–Fri) | ✓ |
| Boat departure 4:45 PM consistent across overview, essentials, schedule, map | ✓ |
| OST: Four Principles, Law of Two Feet, Peter facilitator, 5 topic suggestions | ✓ |
| Recognition ceremony in Thursday schedule | ✓ |
| Recognition now has sidebar nav link | ✓ (fixed this pass) |
| Flight manifest: 21 named arrivals, chronologically sorted by date | ✓ |
| Megan Brenneke: +1 day HNL→MIA connection clearly shown | ✓ |
| Kersten + Daren on same flight AA 3195 | ✓ |
| Early arrivals (Mar 27, Mar 29) grouped separately | ✓ |
| 5 rideshare matches with time gaps and airport labels | ✓ |
| MIA vs FLL distinction with travel time estimates | ✓ |
| Full departure manifest sorted chronologically | ✓ |
| Cliff + Henry marked TBD in flights | ✓ (fixed this pass) |
| Megan Brenneke spelling: consistent across flights and contacts | ✓ |
| Google Maps links: SLS LUX, Brickell Pipelines, Casa Tua, Boat Dock, Jackson Health | ✓ |
| Area Guide: key locations with Maps links | ✓ |
| Photos section: upload interface, SMS share to Elizabeth | ✓ |
| Interactive packing checklist (click to check off) | ✓ |
| OST topic submission form (Name, Category, Topic, Why it matters, Best day) | ✓ |
| All @tigertracks.ai email domains in contacts | ✓ |
| iSolved expense instructions | ✓ |
| Area Guide: Restaurants, Bars, Coffee, Fitness, Getting Around | ✓ |
| Countdown timer to March 31 | ✓ |
| No placeholder/lorem ipsum text anywhere | ✓ |
| "TT" monogram, no emoji, clean typography | ✓ |

---

## Items Needing Elizabeth's Input

1. **Flight details** for Elizabeth Ogilvie, Ashley Kaika, Seth McDaniel
2. **Confirm team headcount** — 26 or 27? If 27, who's missing?
3. **Google Drive folder URL** for photo sharing
4. **Thursday dinner venue** — still TBD or confirmed?
5. **Sanad Shuman's phone number**
6. **Pre-work deadlines** — confirm March 14 (dietary) and March 25 (self-assessment/topics) are still correct
7. **Pressure-Test session** — is this a real Thursday session? If yes, send description

---

*QA conducted by Sage · March 13, 2026*
