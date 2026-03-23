// LinkedIn message sender script
// Inject into page context, then call window.sendLinkedInMessage(firstName, message)

window.linkedInMessages = {
  "Charlotte": "Hi Charlotte, I wanted to follow up on my note from a few weeks ago. Given your background closing deals at Digital Media Solutions and now leading partnerships at TurboDebt, this Director of Partnerships role at Tiger Tracks feels like a natural fit. You already know how to operate on both the agency and client side. The JD is here if you have a moment: ",
  "Lynnette": "Hi Lynnette, circling back on my earlier message. With your track record building BD from the ground up and your depth in strategic relationship management, the opportunity at Tiger Tracks to own the full revenue cycle from audit to close is one I think you would find genuinely compelling. Full details here: ",
  "Will": "Hi William, following up on my earlier note. Your partnerships work at GroundTruth sits right at the intersection of what we are building: a performance marketing agency where the BD leader owns the full client lifecycle, not just the handoff. If you are open to a quick call, here is the full picture: ",
  "William": "Hi William, following up on my earlier note. Your partnerships work at GroundTruth sits right at the intersection of what we are building: a performance marketing agency where the BD leader owns the full client lifecycle, not just the handoff. If you are open to a quick call, here is the full picture: ",
  "John": "Hi John, wanted to revisit my earlier outreach. Tiger Tracks is a different kind of opportunity: full ownership of BD at a PE/VC-focused performance agency ranked #123 on the Inc. 5000. Details here: ",
  "Julian": "Hi Julian, circling back on my earlier note. Tiger Tracks is building a partnerships function to match your caliber. Full role here: ",
  "Sisian": "Hi Sisian, wanted to follow up on my earlier message. Your programmatic and mobile BD background at Verve and Prebid is exactly the technical-commercial profile we are looking for: someone who can build an audit and close the room. If you are open to a conversation: ",
  "Siri": "Hi Siri, following up on my earlier outreach. You have built sales at two of the more respected media brands in the space and you clearly know how to run a full cycle. This role is a step into pure performance: PE/VC clients, paid media strategy, full ownership. Thought it might be worth a second look: ",
  "Serena": "Hi Serena, circling back on my previous note. Your partnerships leadership at TIME and digital sales background at USA TODAY show you can operate at the enterprise level across complex media environments. Tiger Tracks is specifically looking for that kind of seniority in a BD role with full cycle ownership. JD here: ",
  "Neil": "Hi Neil, wanted to follow up. Your search, mobile and display sales background at YP combined with VP BD at Digiday maps cleanly onto what Tiger Tracks needs: someone who speaks the language of performance and can close senior stakeholders. Take a look when you have a second: ",
  "Michelle": "Hi Michelle, following up on my earlier note. Your work at Digible building strategy and partnerships inside a digital marketing agency is exactly the kind of hybrid profile we are looking for at Tiger Tracks. This role has real ownership and a direct line to leadership. Take a look: ",
  "Sara": "Hi Sara, circling back on my previous message. Your partnerships and operations background at an advertising solutions company like Nimbus is a solid foundation for what we are building. Tiger Tracks is looking for someone who can own BD end to end: ",
  "Alexander": "Hi Alexander, wanted to follow up on my earlier outreach. Your eCommerce partnerships background at DemandPDX working across platforms is an interesting fit for a performance marketing BD role that touches retail media and paid channels. Full details: ",
  "Jason": "Hi Jason, following up on my note from a few weeks ago. Your GroupM background combined with leading mobile user acquisition sales at Radian gives you a strong mix of agency-side and performance-side credibility. That is exactly what Tiger Tracks is hiring for. Worth a look: ",
  "Dan": "Hi Dan, following up on my earlier note. Leading integrated partnerships at Initiative and Mediahub puts you at the center of exactly the agency ecosystem Tiger Tracks is trying to build around. This is a chance to own that function from the other side. Full picture here: ",
  "May": "Hi May, wanted to revisit my earlier outreach. Running sales, marketing and accounts at a creative agency like Splashlight while staying active in the startup community tells me you are someone who builds real relationships. Tiger Tracks needs exactly that at the Director level: ",
  "Brendon": "Hi Brendon, following up on my previous message. Your BD work at Snipp Interactive in the marketing and advertising space is a good foundation for what we are building at Tiger Tracks. This is a full-cycle role with real autonomy and strong OTE. Take a look: ",
  "Richard": "Hi Richard, circling back on my earlier note. Your sales background at two digital marketing agencies, SmartSites and PushDigital, is exactly the agency-side experience we need at Tiger Tracks. We are building a Director of Partnerships role where you would own the full BD cycle. Details here: ",
  "Jad": "Hi Jad, following up on my earlier message. Combining agency BD at Flex Marketing with strategic partnerships experience at GeistM is a compelling profile for what we are building at Tiger Tracks. This role has full ownership from first conversation to signed contract: ",
  "Patrick": "Hi Patrick, wanted to follow up on my earlier outreach. Leading BD for a marketing agency at the US level and closing accounts through Neoscape shows you can operate across the full commercial cycle. Tiger Tracks is building exactly this kind of role with strong comp: ",
  "Anthony": "Hi Anthony, circling back on my previous message. Running sales at a marketing agency in New York is solid experience for what we are building at Tiger Tracks. This is a Director-level BD role with a clear path and strong OTE ($160-175K). Worth a conversation: ",
  "Melanie": "Hi Melanie, following up on my earlier note. Building partnerships at 160over90, an Endeavor agency, is about as strong an agency background as it gets for this role. Tiger Tracks is looking for exactly this profile to lead our Director of Partnerships function. Full details: ",
  "Michael": "Hi Michael, circling back on my earlier message. You have built and scaled sales teams at high-growth software companies and clearly know how to run full-cycle deals with enterprise buyers. Tiger Tracks is bringing that discipline into performance marketing: ",
  "Leanna": "Hi Leanna, following up on my previous note. Leading sales at Arsenal New York puts you squarely in the marketing and media agency world we are hiring from. Tiger Tracks is looking for a Director of Partnerships who has done this at the agency level and is ready to own a bigger seat: ",
  "Maureen": "Hi Maureen, circling back on my earlier outreach. Your programmatic background at OpenX and Sovrn gives you the technical depth to credibly pitch performance marketing at the executive level. That is a core requirement for this role at Tiger Tracks: ",
  "Diana": "Hi Diana, following up on my earlier note. Nine-plus years in marketing and advertising BD, building and managing client relationships across the Northeast, is a strong foundation for what Tiger Tracks needs. This is a full-cycle BD leadership role commutable to NYC: ",
  "Elizabeth": "Hi Elizabeth, circling back on my previous message. Your VP-level sales experience at Sightly in the advertising and brand intelligence space is a strong fit for a performance marketing BD role. Tiger Tracks is building this function with real ownership and upside: ",
  "Madeline": "Hi Madeline, following up on my earlier note. Serino Coyne is a real advertising agency with real client relationships, and your partnerships work there is exactly the kind of agency-side background we are hiring for at Tiger Tracks. Take a look at the role: ",
  "Marissa": "Hi Marissa, following up on my earlier outreach. Building senior partnerships at Voltus while coming from a product strategy background at ChargePoint shows you can operate both commercially and technically. Tiger Tracks needs exactly that combination. Full JD here: ",
  "Kevin": "Hi Kevin, circling back on my previous note. Your BD and strategic partnerships background across brand marketing gives you a commercial toolkit that translates well to performance marketing sales. Tiger Tracks is building this role with full-cycle ownership: ",
  "Tommy": "Hi Tommy, following up on my earlier message. Leading partnerships at two recognized names in influencer and content marketing shows you know how to close agency-side deals at the senior level. Tiger Tracks is a step into performance marketing with real ownership: ",
  "Francesco": "ALREADY_SENT",
  "Ilya": "Hi Ilya, following up on my previous note. Building partnerships around AI commercialization at Altoros is an interesting match for a performance marketing agency that is actively integrating AI-driven growth narratives into client pitches. Worth a conversation: ",
  "Ahmed": "Hi Ahmed, circling back on my earlier message. Your Stanford MBA combined with leading strategic partnerships at Worldpay tells me you can navigate complex deal structures and close at the executive level. Tiger Tracks is a different kind of opportunity but the commercial profile maps well: ",
  "Lora": "Hi Lora, following up on my earlier note. VP Sales at PubMatic and now leading programmatic sales at Seedtag gives you deep contextual and performance advertising credibility. That is exactly the technical-commercial profile Tiger Tracks is looking for in a Director of Partnerships: ",
  "Lana": "Hi Lana, circling back on my earlier outreach. Your VP-level sales experience and track record managing high-value accounts in a fast-moving consumer brand environment shows strong commercial instincts. Tiger Tracks is a performance marketing agency looking for someone who can own a BD seat with real autonomy: ",
  "Sam": "Hi Sam, following up on my earlier message. Building a full partnership strategy around advertising and sponsorships at Moby from scratch is exactly the kind of ownership mindset Tiger Tracks is hiring for. This role has the same full-cycle BD structure with a performance marketing focus: ",
  "Tracy": "Hi Tracy, circling back on my earlier note. Your integrated sales background at Teen Vogue and now leading partnerships and sales at goop shows you can close at the senior level across complex media and brand environments. Tiger Tracks is a performance marketing agency looking for exactly that: "
};

window.JD_URL = 'https://recruiting.cliffeliz.ai/bd-jd.html';
window.JD_LABEL = 'Job Description';

window.sendLinkedInFollowup = async function(firstName) {
  const msgText = window.linkedInMessages[firstName];
  if (!msgText) return {error: 'No message for ' + firstName};
  if (msgText === 'ALREADY_SENT') return {error: 'Already sent to ' + firstName};
  
  // Find and click the Message button
  const spans = Array.from(document.querySelectorAll('button.artdeco-button span'));
  const btn = spans.find(s => s.textContent.trim() === 'Message ' + firstName);
  if (!btn) return {error: 'Message button not found for ' + firstName};
  btn.closest('button').click();
  
  // Wait for compose box
  await new Promise(r => setTimeout(r, 2500));
  
  const box = document.querySelector('[role=textbox][contenteditable=true]');
  if (!box) return {error: 'No compose box found'};
  
  // Clear existing content
  box.focus();
  box.innerHTML = '';
  
  // Type the message text
  document.execCommand('insertText', false, msgText);
  
  // Insert hyperlinked URL
  document.execCommand('insertHTML', false, 
    '<a href="' + window.JD_URL + '">' + window.JD_URL + '</a>');
  
  box.dispatchEvent(new Event('input', {bubbles: true}));
  
  // Wait for send button to activate
  await new Promise(r => setTimeout(r, 1000));
  
  const sendBtn = Array.from(document.querySelectorAll('button'))
    .find(b => (b.getAttribute('aria-label') || b.textContent || '').includes('Send this message'));
  
  if (!sendBtn || sendBtn.disabled) {
    return {error: 'Send button not found or disabled', boxContent: box.textContent.slice(0, 100)};
  }
  
  sendBtn.click();
  await new Promise(r => setTimeout(r, 1500));
  return {success: true, sent: firstName, preview: msgText.slice(0, 80) + '...'};
};

console.log('LinkedIn sender loaded. Call window.sendLinkedInFollowup(firstName) to send.');
