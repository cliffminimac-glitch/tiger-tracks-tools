# Manus AI — Skill-Vision Replication Guide
**Source:** TT.3of2.sm.mov (13 min recording)  
**Date reviewed:** March 13, 2026  
**What he does:** Uses Manus AI to build and deploy a reusable "skill-vision" agent for expert trend analysis with DARPA-style cascading effects and scenario planning — producing full PDF reports in 10–20 minutes.

---

## What This Is

Peter Corbett (logged in as "corbert3000") demonstrates building a reusable AI agent skill in **Manus AI** (manus.im) that performs professional-grade trend analysis. The skill — called "skill-vision" — replicates the kind of analysis a top viral marketing agency would take a full day to produce, and does it in 10–20 minutes.

He also briefly tests the same prompt in Perplexity Computer (requires Max plan) as a comparison, then ends by connecting the agent to Notion to automatically organize all outputs.

---

## Platform

**Manus AI** — https://manus.im  
- Browser-based AI agent platform
- Credit-based (he had ~12,332 credits visible)
- Has a connectors library with 72+ integrations (GitHub, Gmail, Meta Ads Manager, Google Calendar, etc.)
- Has an "Agents" feature for persistent, named agents with custom skills
- Referral program: 500 credits each for sharing

---

## Step 1: Initialize the Agent

Go to **https://manus.im/agents**

In the opening conversation, establish identity:
```
Call me [your name]. You're [agent name]
```
He used: `"Call me Peter. You're Corbot"`

The agent confirms the names and is now personalized for the session. All subsequent conversations reference these names.

---

## Step 2: Create the Skill-Vision Skill

**Exact prompt used:**
```
I want you to become an expert trend analysis and prediction bot. Like the task I gave you for x.com I want you to help me predict the future with this skill. We'll call it skill vision
```

**What Manus does with this prompt:**
- Takes 10–15 minutes to build the skill
- Confirms a 5-step workflow:
  1. **Define the trend** (scope, framing)
  2. **Collect data** from SimilarWeb, TikTok, web scraping
  3. **Analyze** using trend pattern recognition
  4. **Map cascading effects** using the Futures Wheel framework (first, second, third-order effects)
  5. **Scenario planning** using DARPA/ARPA-style 2x2 scenario matrices with multiple futures, wild cards, and strategic implications

**What the full skill includes:**
- Trend definition
- Multi-source data collection
- Breakout signal identification
- Dominant player mapping
- Cascading effects analysis (Futures Wheel)
- Structured scenario planning (2x2 matrices)
- Charts, graphs, visualizations
- Output as both PDF and Markdown

---

## Step 3: Upgrade the Skill (what he added later)

He then asked Manus to recap how the skill evolved. The iterations were:

1. **V1 — Baseline:** Trend analysis and prediction bot ("skill-vision")
2. **V2 — Cascading effects:** Added ability to extrapolate what other trends are influenced by a given trend, using the Futures Wheel framework (first, second, third-order effects)
3. **V3 — Scenario planning:** Added DARPA/ARPA-style 2x2 scenario matrices with multiple futures, wild cards, strategic implications
4. **V4 — X.com publishing:** Added direct posting to X.com account from the agent

**To upgrade to V2+, prompt:**
```
Upgrade skill-vision so you can extrapolate what other trends are influenced by a given trend, and predict what could happen next using a scenario-based approach like what ARPA and DARPA might produce. Add cascading effects analysis using a Futures Wheel framework mapping first, second, and third-order effects. Add structured scenario planning using 2x2 scenario matrices with multiple futures, wild cards, and strategic implications.
```

---

## Step 4: Run an Analysis

**Prompt format:**
```
Use your skillvision skill to analyze the current trend of [TOPIC].
```

**Example he used:**
```
Use your skillvision skill to analyze the current trend of using AI agents to optimize online ad spend.
```

**What the output includes (verified from PDF):**
- Title like "Cascading Effects: The Agentic Shift"
- Futures Wheel diagram showing:
  - Central node: the trend (e.g., "AI Tools Adoption")
  - 3 first-order branches (e.g., Autonomous Campaign Management, Real-time Personalization, AI-Powered Creative Assets)
  - 2nd-order effects per branch (e.g., Reduced Manual Labor, Higher Conversion Rates, Lower Content Costs)
  - 3rd-order effects (e.g., Shift in Job Roles, Democratization of Creative Services)
- DARPA-style scenario matrix
- Charts showing trend signals
- Competitive landscape
- Strategic recommendations

**Output format:**
- PDF report (~912 KB)
- Markdown file (~21 KB)
- Both downloadable from the Manus task view

**Time to complete:** 15–20 minutes per analysis

---

## Step 5: Request a Second Analysis

He ran a second skill-vision report on a different topic:
```
I want you to skill vision another report related to what brand managers are currently interested in with regard to new tools and technology specific to AI and agentic implementations. Use as many resources as possible and give me some awesome charts and graphs so I can understand how that's changed over the past 5 to 10 years.
```

Key additions to the prompt:
- "Use as many resources as possible"
- Explicitly request charts and graphs
- Specify the timeframe for trend evolution (5–10 years)

---

## Step 6: Generate Promotional Content

After each analysis, he asked for tweet copy:
```
Great. Give me copy for a pity tweet that will excite people. Explain I used to run a top viral marketing agency and this type of analysis would have taken at least a day to create for our campaigns and it took Manus 10mins
```

Manus generates 3 tweet options:
- Option A: Punchy
- Option B: Spicy
- Option C: Short and sweet

All hit the same beats: viral agency background + day of work → 10 minutes + credibility hook.

---

## Step 7: Connect to Notion (Final Step)

He asked Manus to post all analyses to a Notion hub. Manus walked him through creating a Notion integration:

**Step-by-step Notion setup (as shown on screen):**
1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name it (he named it "Corbot")
4. Select the workspace ("Peter's Notion")
5. Fill in: Company name = "Still Rush", Website = "https://stillrush.co"
6. Click Submit → get Internal Integration Token (starts with `ntn_` or `secret_`)
7. Copy the token and send it to Manus
8. In Notion, open the page/database, click "..." → Connections → add "Corbot"

**Manus then creates:** A clean Notion hub organizing all four analyses

---

## Step 8: Comparison — Perplexity Computer

He navigated to https://perplexity.ai/computer and typed the same skill-vision prompt:
```
I'd like you to develop a skill called skill vision that allows you to do expert trend analysis and to understand the second and third order effects of specific trends that we analyze. Within that skill, I'd like you to use DARPA and ARPA-style scenario planning. Draw on vast resources across the web for your charts, graphs...
```

**Key difference:** Perplexity Computer requires a **Max plan** (he saw the upgrade banner). He's showing the comparison, not necessarily completing it.

---

## Summary: The Exact Workflow

| Step | Action | Time |
|------|--------|------|
| 1 | Go to manus.im/agents, name yourself and the agent | 1 min |
| 2 | Create skill-vision with the exact prompt above | 10–15 min |
| 3 | Upgrade skill with cascading effects + DARPA scenarios | 5 min |
| 4 | Run an analysis: "Use your skillvision skill to analyze [TOPIC]" | 15–20 min |
| 5 | Download PDF + Markdown outputs | instant |
| 6 | Ask for tweet copy to promote the output | 2 min |
| 7 | Set up Notion integration for a centralized hub | 10 min |

**Total time for first analysis:** ~35–45 min including setup  
**Subsequent analyses:** 15–20 min each

---

## Key Phrases / Exact Language to Copy

- **Skill creation:** "I want you to become an expert trend analysis and prediction bot... We'll call it skill vision"
- **Running analysis:** "Use your skillvision skill to analyze the current trend of [TOPIC]"
- **For second+ analyses:** "I want you to skill vision another report related to [TOPIC]"
- **For more depth:** "Use as many resources as possible and give me some awesome charts and graphs"
- **For promo copy:** "Give me copy for a pity tweet that will excite people. Explain I used to run [ROLE] and this type of analysis would have taken at least a day..."

---

## Notes

- Manus has a sandbox that occasionally resets, but previous tasks and files are preserved
- Skills are persistent across the agent session — once "skill-vision" is built, just reference it by name
- He had multiple prior tasks in the sidebar showing repeated use: scraping exhibitor data, extracting LinkedIn profiles, contact info extraction, longevity conferences research
- Credit cost: each analysis task likely costs ~500–1,000 credits (he had 12,332)
- The agent is called "Corbot" — this is Peter Corbett's personal instance of Manus
