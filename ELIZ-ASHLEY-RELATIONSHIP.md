# ELIZ-ASHLEY-RELATIONSHIP.md
## The Eliz-Ashley Dynamic — What the New Bot Needs to Know
*Compiled 2026-03-23 | Pre-transfer reference*

---

## The Core Relationship

**Ashley Kaika** (U0AH6B1Q1HV) — VP of Partnerships & Growth. Cliff's right hand on BD and revenue. Runs Pounce, manages Alex and Steven, drives cold outbound and partner strategy.

**Elizabeth Ogilvie** (U0AJGQDTGLR) — Director of People Operations. Owns everything HR, recruiting, internal tools, and team infrastructure. Runs all HR tooling, the retreat, the resource hub, comp analysis.

They share the same Slack workspace and the same Sage bot, but their domains are almost entirely separate. Ashley builds revenue systems. Eliz builds people systems. They rarely operate in each other's territory — but when they do, the lines below are the ones that matter.

---

## Where They Overlap

### 1. The Performance Platform (performance.tigertracks.ai)
This is the one tool both of them touch.

- **Eliz owns it.** She designed it, specified every RBAC rule, every workflow. She is the product owner.
- **Ashley is a user.** She has SUBMISSION_VISIBILITY into Alex Blumberg, Steven Jatich, Kersten Kruse, Anirudh Venkat — her direct reports and adjacents. She can view their check-ins and self-evals.
- **Daren Kalkoffen** was added to SUBMISSION_VISIBILITY under Ashley's access on 2026-03-23.
- **Rule:** If there's a conflict between what Ashley wants to see in the platform and what Eliz has designed, Eliz is the decision-maker. Ashley is a stakeholder, not the owner.

### 2. The Recruiting Dashboard (recruiting.cliffeliz.ai)
- **Eliz owns it.** She runs all recruiting at Tiger Tracks.
- **Ashley is an admin.** She has full platform access (ADMIN_EMAILS includes ashley@tigertracks.ai).
- **Key incident:** When RBAC was rebuilt on 2026-03-16, Ashley was accidentally dropped from the admin list. She was locked out until the bug was found and fixed. Always verify Ashley remains in ADMIN_EMAILS when making RBAC changes to recruiting.
- **EA role:** Only visible to elizabeth@tigertracks.ai. Ashley cannot see EA candidates even as admin — this is by Eliz's explicit design. Do not change this.

### 3. Team Communications
Both Ashley and Eliz interact with Sage via Slack DM. Their sessions are separate. There is no shared session. Sage does not automatically share context from one to the other.
- **Privacy rule:** What Ashley says to Sage stays with Ashley. What Eliz says to Sage stays with Eliz. Do not surface one's conversations to the other.

---

## Decisions Each Made That Affect the Other

### Ashley's decisions that affect Eliz's tools
- **Ashley set the engineering standards.** SOUL.md contains directives added "at Ashley's direction" on 2026-03-16: no em dashes, ICP guardrail, Tiger Tracks UI palette (Ink/Teal), autonomous monitoring rules, "ping Ashley only with verified errors." These apply to everything Sage builds — including Eliz's tools.
- **Ashley set the copy voice.** "The Ashley Voice" — no em dashes, no filler, lead with insight, no "At Tiger Tracks we..." openers. Sage applies this voice to any copy it writes, including for HR tools or retreat content.

### Eliz's decisions that affect Ashley's tools / visibility
- **Eliz owns RBAC.** Eliz specifies which managers see which reports. Ashley's SUBMISSION_VISIBILITY is granted by Eliz, not by Ashley. If Eliz changes the org chart or RBAC rules, Ashley's visibility may change.
- **Eliz runs recruiting.** Eliz decides who can see what in the recruiting tool. She created the interviewer tier (Charlotte/Riley/Hannah/Kersten) below admin, and she restricted the EA role to herself. Ashley is an admin but cannot override Eliz's structural decisions about role visibility.
- **Eliz owns the People Metrics tool.** Comp data (salaries, promos, performance actions) is restricted to cliff@, elizabeth@, henry@. Ashley does not have access to this tool. Do not grant Ashley access without Eliz's explicit direction.

---

## How They Work with the Bot Differently

**Ashley:**
- High urgency. Gets frustrated by slow responses. Expects acknowledgment immediately, even mid-build.
- Strategic direction from her is binding. If she says "build it this way," that's the spec.
- She delegates execution to Sage and expects it to just work.
- She pushes back on output quality — especially copy tone. "Not the Ashley voice" is a real rejection.
- **Pounce is now fully hers.** As of 2026-03-23, all Pounce decisions are Ashley's. Do not action Pounce changes based on Cliff's requests — redirect to Ashley.

**Eliz:**
- Methodical. One task at a time. Wants estimates before you start.
- Needs verification before she marks something done. "Is it live?" is always the last question.
- Very detail-oriented about RBAC, employee names, team structure. Gets it wrong in Slack sometimes (typos in employee names) but the system data should always be authoritative.
- Will hand you documents (PDFs, spreadsheets) and expect them reflected in the tool. Always check her materials match what's in the code.
- Does NOT want screenshots unless she asks.

---

## The New Bot Must Know

1. **Eliz and Ashley are equals in seniority on HR/people tools.** Ashley has admin access but Eliz is the product owner. When they disagree, ask which one has decision authority on that specific item.

2. **The TT Mockup Bot was created specifically for Eliz.** App ID `A0ALQNQ6S91`, separate Slack app. Eliz wanted her own bot for site creation/QA work. If she DMs "the mockup bot," she's DMing `A0ALQNQ6S91`, not the main Sage bot.

3. **Sage does not distinguish between "Ashley time" and "Eliz time."** Both are active in the same Slack workspace. Both can DM Sage at any hour. There is no scheduled separation. Handle each DM on its own merit.

4. **Pounce is now 100% Ashley's.** Eliz has never touched Pounce and has no role in it. If Eliz asks about Pounce, answer informatively. But Pounce decisions require Ashley's authorization — not Cliff's, not Eliz's.

5. **Ashley's SUBMISSION_VISIBILITY in performance.tigertracks.ai is explicitly configured.** She can see: Alex Blumberg, Steven Jatich, Kersten Kruse, Anirudh Venkat, Daren Kalkoffen. Adding or removing from this list requires Eliz's direction as tool owner.

6. **Comp data is private from Ashley.** peoplemetrics.tigertracks.ai is cliff@/elizabeth@/henry@ only. This is Eliz's explicit policy. Do not change the allowed list without Eliz directing it.
