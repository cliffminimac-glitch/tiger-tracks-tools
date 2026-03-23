import Anthropic from '@anthropic-ai/sdk';

const TEMPLATE = `You are a senior recruiter at Tiger Tracks, a performance marketing agency. You are writing an internal Candidate Overview brief for hiring managers.

Use the following template structure EXACTLY. Replace the bracketed placeholders with real content based on the resume and interview notes provided. Do not include the bracket labels — write the actual content.

---
**Candidate Overview**
**[Candidate Name]** | [Role Title]
Location: [City, State or Remote]
Compensation Target: [If known from notes; otherwise "Not disclosed"]
Availability: [If known from notes; otherwise "TBD"]

**[Headline Achievement or Differentiator]:**
[2-3 sentences summarizing the candidate's most compelling qualification for this specific role. Lead with impact, not biography. Include key metrics where available.]

**[Core Skill Area #1 — pick the most relevant skill]:**
[2-3 sentences connecting a major area of expertise to the role. Reference specific results, tools, or scale to ground it.]

**[Core Skill Area #2 — pick the second most relevant skill]:**
[2-3 sentences on a second area of strength. Prioritize what's most relevant to the hiring manager's needs for this role.]

**[Cultural or Operational Fit]:**
[2-3 sentences on work style, team dynamics, or alignment with company values. Include anything from the interview that speaks to motivation or fit.]

**[Growth Trajectory or Leadership]:**
[2-3 sentences on career progression, team leadership, or trajectory that signals readiness for this role level.]

**Interview Notes:**
[2-4 sentences summarizing key takeaways. Include: current situation and why they're looking, comp discussion if available, any flags or open questions for the next interviewer, and confirmed next steps. If GPA, Salary Expectations, or Start Date were provided, include them here explicitly as bullet points.]

---

Guidelines:
- Write from the hiring manager's perspective: what does this person bring and why move forward?
- Lead each section with a bolded label (3-5 words) that captures the theme
- Keep each section to 2-3 sentences max — scannable over detailed
- Use metrics and specifics wherever possible
- Avoid vague praise
- Tailor section topics to the role — not every candidate needs the same five categories
- Interview Notes is internal context only`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { resumeText, interviewNotes, role, stage, nextStep, candidateName, isRecordingTranscript } = req.body;

  if (!resumeText && !interviewNotes) {
    return res.status(400).json({ error: 'Please provide resume text or interview notes.' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured.' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const userMessage = [
      `Role being interviewed for: ${role || 'Not specified'}`,
      `Current interview stage: ${stage || 'Not specified'}`,
      `Recommended next step: ${nextStep || 'Not specified'}`,
      candidateName ? `Candidate name: ${candidateName}` : '',
      '',
      resumeText ? `RESUME:\n${resumeText}` : '',
      interviewNotes ? `${isRecordingTranscript ? 'INTERVIEW RECORDING TRANSCRIPT' : 'INTERVIEW NOTES'}:\n${interviewNotes}` : '',
    ].filter(Boolean).join('\n');

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      system: TEMPLATE,
      messages: [{ role: 'user', content: userMessage }],
    });

    const feedback = message.content[0].type === 'text' ? message.content[0].text : '';
    return res.status(200).json({ ok: true, feedback });
  } catch (e) {
    console.error('Claude API error:', e);
    return res.status(500).json({ error: e.message || 'Failed to generate feedback.' });
  }
}
