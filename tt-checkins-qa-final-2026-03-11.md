# tt-checkins QA Report — Final
**Date:** March 11, 2026  
**App:** https://tt-checkins.vercel.app (alias: https://checkins.cliffeliz.ai)  
**Method:** localStorage auth injection (riley@tigertracks.ai + rachael@tigertracks.ai)  
**OAuth flow:** Deferred to live team rollout per Eliz

---

## ✅ PASS — All Critical & Major Items

### Section 2: Navigation & General UI
| Item | Result |
|------|--------|
| All 6 nav items render and are clickable | ✅ |
| Active nav link highlights correctly | ✅ |
| Logo renders in header | ✅ |
| Login gate shows before auth | ✅ |
| Auth user email shown top-right with Sign out | ✅ |
| Home page loads with correct role descriptions | ✅ |
| Contact email link present in Quick Reference | ✅ |
| No JS console errors on any page | ✅ |

### Section 3: Weekly Sync Form
| Item | Result |
|------|--------|
| Employee dropdown populates all 24 names | ✅ |
| Role and Manager auto-fill on selection | ✅ |
| Week-of date defaults to today | ✅ |
| Employee section fields editable for employee | ✅ |
| Supervisor section fields disabled (read-only) for employee | ✅ |
| Supervisor section fields editable for manager (direct reports only) | ✅ |
| Save shows ✅ banner for 2s | ✅ |
| "Auto-saves as you type" label present | ✅ |
| Data loads back on re-select (Blob persistence) | ✅ |
| Data survives full page reload | ✅ |

### Section 4: Monthly Feedback Form
| Item | Result |
|------|--------|
| Employee dropdown populates | ✅ |
| Role-specific template loads (Associate Director template confirmed) | ✅ |
| Month dropdown present with March 2026 | ✅ |
| Manager auto-fills | ✅ |
| Employee section editable for employee | ✅ |
| Supervisor section disabled for employee | ✅ |

### Section 5: Active Meeting Links
| Item | Result |
|------|--------|
| Monthly Feedback tab loads | ✅ |
| Weekly Check-In tab loads | ✅ |
| Monthly links use `?section=monthly` | ✅ |
| Weekly links use `?section=weekly` | ✅ |
| All links include employee, manager, role, period params | ✅ |
| Copy All Links button present | ✅ |
| Email All Reminders button present | ✅ |
| Links are role-scoped (employee sees their sub-team only) | ✅ |
| Opening a meeting link navigates to correct form pre-filled | ✅ |

### Section 6: Give Feedback
| Item | Result |
|------|--------|
| All 24 team members in recipient dropdown | ✅ |
| 3 delivery options (individual / manager / both) | ✅ |
| 4 feedback types (Praise / Constructive / Suggestion / Concern) | ✅ |
| Anonymous vs. named radio works | ✅ |
| Empty submit shows validation toast | ✅ |

### Section 7: Submissions
| Item | Result |
|------|--------|
| Employee sees only their sub-team (5 for Riley) | ✅ |
| Senior Director sees full org (19 for Rachel) | ✅ |
| Badge counts correct (W/M/P) | ✅ |
| Card expands to show submission detail | ✅ |
| Filter (All Types / Weekly / Monthly / Peer) works | ✅ |
| Search by name works | ✅ |
| Unreleased records show 🔒 lock message for employee | ✅ |
| Released records show full manager notes for employee | ✅ |

### Section 8: Role-Based Access Control
| Item | Result |
|------|--------|
| Employee cannot edit supervisor section | ✅ (disabled:true) |
| Manager cannot edit employee section | ✅ (disabled:true) |
| Manager can edit supervisor section for direct reports | ✅ |
| Manager can VIEW but not EDIT non-direct-reports | ✅ |
| Senior Director can view all 19 in org | ✅ |
| Release button only appears for direct report's manager | ✅ |

### Section 9: Data Integrity & Auto-Save
| Item | Result |
|------|--------|
| Data persists across nav away/return | ✅ |
| Data persists across full page reload | ✅ |
| Manager notes saved under correct `savedBy` email | ✅ |
| Release marks record `released:true` immediately | ✅ |
| Employee sees manager notes after release | ✅ |

### Section 10: Error Handling
| Item | Result |
|------|--------|
| Give Feedback empty submit shows toast validation | ✅ |
| Submissions page does not crash without `#subEmployee` element | ✅ (fixed) |

---

## Bugs Found & Fixed This Session

| # | Severity | Description | Fix | Commit |
|---|----------|-------------|-----|--------|
| BUG-006 | Major | `loadSubmissions()` crashed on missing `#subEmployee` element → "Could not load submissions" | Null-check before `.value` access | `8670e29` |
| BUG-007 | Critical | Release button returned `ok:true` but `released` stayed `false` — Vercel Blob CDN caches public URLs ~5min after overwrite | Changed save/release architecture: every write goes to a new timestamped key; dedup in GET sorts by `releasedAt \|\| savedAt` | `c17a1fb` |
| BUG-008 | Minor | Old `_delete:true` smoke test stubs showed as "Invalid Date" entries in Submissions | Filter `_delete:true` records in GET endpoint | `d156508` |

---

## Deferred to Live Rollout
- **Google OAuth flow**: Eliz confirmed actual managers/employees will test sign-in during rollout
- **Tablet (768px) responsive**: Functional — minor nav crowding at 375px mobile

---

## Latest Commits
| Commit | Description |
|--------|-------------|
| `d156508` | Filter `_delete` stubs from GET |
| `c17a1fb` | Timestamped key architecture (CDN fix) |
| `8670e29` | Null-check `subEmployee` |
| `11f167a` | Fix meeting link nav + onChange handlers |
| `6efb85e` | Fix double-`?` in meeting link URLs |
| `7b54c5d` | sessionStorage fix for OAuth redirect |

**All critical and major QA items: PASS ✅**
