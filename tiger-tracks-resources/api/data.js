// api/data.js - authenticated app content endpoint
const verify = require('./_auth');

module.exports = async function handler(req, res) {
  const user = await verify(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required. @tigertracks.ai only.' });
  }
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(200).json({ html: APP_HTML, user: user.email });
};

const APP_HTML = `

<!-- NAV -->
<nav class="topnav">
  <a href="https://tigertracks.ai" target="_blank" rel="noopener" style="text-decoration:none;" class="logo"><img src="logo.png" alt="Tiger Tracks" style="height:36px;vertical-align:middle;margin-right:8px;filter:invert(1);">TIGER <span>TRACKS</span></a>
  <button class="mobile-toggle" onclick="document.querySelector('.nav-links').classList.toggle('open')">☰</button>
  <div class="nav-links">
    <a href="#" onclick="event.preventDefault();navigateTo('home');">Home</a>

    <div class="nav-dropdown">
      <a href="#org" onclick="event.preventDefault();navigateTo('org');">About Tiger Tracks</a>
      <div class="nav-dropdown-menu">
        <a href="#org" onclick="event.preventDefault();navigateTo('org');">🏗️ Org Chart</a>
        <a href="#offerings" onclick="event.preventDefault();navigateTo('offerings');">🚀 TT Offerings</a>
        <a href="#org" onclick="event.preventDefault();navigateTo('org');setTimeout(function(){var el=document.getElementById('org-pyramid');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">🔺 Problem-Solving Pyramid</a>
      </div>
    </div>

    <div class="nav-dropdown">
      <a href="#playbook" onclick="event.preventDefault();navigateTo('playbook');">Management Playbook</a>
      <div class="nav-dropdown-menu">
        <a href="#playbook" onclick="event.preventDefault();navigateTo('playbook');">📘 Overview &amp; Philosophy</a>
        <a href="#playbook" onclick="event.preventDefault();navigateTo('playbook');setTimeout(function(){document.querySelector('#playbook [data-sub=delegation]').scrollIntoView({behavior:'smooth',block:'start'})},100);">🎯 Delegation Principles</a>
        <a href="#playbook" onclick="event.preventDefault();navigateTo('playbook');setTimeout(function(){document.querySelector('#playbook [data-sub=escalation]').scrollIntoView({behavior:'smooth',block:'start'})},100);">🚨 Escalation Principles</a>
        <a href="#playbook" onclick="event.preventDefault();navigateTo('playbook');setTimeout(function(){document.querySelector('#playbook [data-sub=mos]').scrollIntoView({behavior:'smooth',block:'start'})},100);">⚙️ Manager Operating System</a>
        <div class="nav-sub">
          <a href="#templates" onclick="event.preventDefault();navigateTo('templates');">📋 Templates &amp; Tools</a>
          <div class="nav-sub-menu">
            <a href="#templates" onclick="event.preventDefault();navigateTo('templates');">📋 All Templates</a>
            <a href="#templates" class="tpl-nav" data-tpl="dr-1on1">👤 Direct Report: Weekly 1:1</a>
            <a href="#templates" class="tpl-nav" data-tpl="mgr-1on1">📋 Manager: Weekly 1:1</a>
            <a href="#templates" class="tpl-nav" data-tpl="expectations">🎯 Expectations-Setting</a>
            <a href="#templates" class="tpl-nav" data-tpl="delegation">✅ Delegation Checklist</a>
            <a href="#templates" class="tpl-nav" data-tpl="capacity">📊 Capacity Check-In</a>
            <a href="#templates" class="tpl-nav" data-tpl="underperformance">⚠️ Underperformance Correction</a>
            <a href="#templates" class="tpl-nav" data-tpl="underperf-rhythm">🔄 Weekly Rhythm (Underperformers)</a>
          </div>
        </div>
      </div>
    </div>

    <div class="nav-dropdown">
      <a href="#culture" onclick="event.preventDefault();navigateTo('culture');">Culture &amp; Standards</a>
      <div class="nav-dropdown-menu">
        <a href="#culture" onclick="event.preventDefault();navigateTo('culture');setTimeout(function(){var el=document.getElementById('cul-standing');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">✅ Good Standing</a>
        <a href="#culture" onclick="event.preventDefault();navigateTo('culture');setTimeout(function(){var el=document.getElementById('cul-feedback');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">💬 Feedback Form</a>
      </div>
    </div>

    <div class="nav-dropdown">
      <a href="#best-practices" onclick="event.preventDefault();navigateTo('best-practices');">Platform Training</a>
      <div class="nav-dropdown-menu">
        <a href="#best-practices" onclick="event.preventDefault();navigateTo('best-practices');setTimeout(function(){var el=document.getElementById('bp-google');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">🔍 Google</a>
        <a href="#best-practices" onclick="event.preventDefault();navigateTo('best-practices');setTimeout(function(){var el=document.getElementById('bp-meta');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">📱 Meta</a>
        <a href="#best-practices" onclick="event.preventDefault();navigateTo('best-practices');setTimeout(function(){var el=document.getElementById('bp-linkedin');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">💼 LinkedIn</a>
        <a href="#best-practices" onclick="event.preventDefault();navigateTo('best-practices');setTimeout(function(){var el=document.getElementById('bp-asana');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">📋 Asana</a>
        <a href="#best-practices" onclick="event.preventDefault();navigateTo('best-practices');setTimeout(function(){var el=document.getElementById('bp-slack');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">💬 Slack</a>
        <a href="#best-practices" onclick="event.preventDefault();navigateTo('best-practices');setTimeout(function(){var el=document.getElementById('bp-otter');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">🦦 Otter.ai</a>
        <a href="#best-practices" onclick="event.preventDefault();navigateTo('best-practices');setTimeout(function(){var el=document.getElementById('bp-newhire');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">🎓 New Hire Training</a>
      </div>
    </div>

    <div class="nav-dropdown">
      <a href="#team-resources" onclick="event.preventDefault();navigateTo('team-resources');">Team Resources</a>
      <div class="nav-dropdown-menu">
        <a href="#roles" onclick="event.preventDefault();navigateTo('roles');">🎯 Roles &amp; Responsibilities</a>
        <a href="#evaluation" onclick="event.preventDefault();navigateTo('evaluation');">📊 Self-Evaluation Survey</a>
        <a href="#specialties" onclick="event.preventDefault();navigateTo('specialties');">🧠 Team Specialties Chart</a>
        <div class="nav-sub">
          <a href="#reviews" onclick="event.preventDefault();navigateTo('reviews');">📝 Meeting Agendas</a>
          <div class="nav-sub-menu">
            <a href="#reviews" onclick="event.preventDefault();navigateTo('reviews');setTimeout(function(){switchReviewTab('weekly')},100);">📅 Weekly Manager Sync</a>
            <a href="#reviews" onclick="event.preventDefault();navigateTo('reviews');setTimeout(function(){switchReviewTab('monthly')},100);">📋 Monthly Feedback Review</a>
            <a href="#reviews" onclick="event.preventDefault();navigateTo('reviews');setTimeout(function(){switchReviewTab('history')},100);">📂 Past Reviews</a>
          </div>
        </div>
      </div>
    </div>

    <div class="nav-dropdown">
      <a href="#benefits" onclick="event.preventDefault();navigateTo('benefits');">Benefits &amp; PTO</a>
      <div class="nav-dropdown-menu">
        <a href="#benefits" onclick="event.preventDefault();navigateTo('benefits');setTimeout(function(){var el=document.getElementById('ben-overview');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">📋 Insurance Overview</a>
        <a href="#benefits" onclick="event.preventDefault();navigateTo('benefits');setTimeout(function(){var el=document.getElementById('ben-medical');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">🏥 Medical</a>
        <a href="#benefits" onclick="event.preventDefault();navigateTo('benefits');setTimeout(function(){var el=document.getElementById('ben-dental');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">🦷 Dental</a>
        <a href="#benefits" onclick="event.preventDefault();navigateTo('benefits');setTimeout(function(){var el=document.getElementById('ben-vision');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">👓 Vision</a>
        <a href="#benefits" onclick="event.preventDefault();navigateTo('benefits');setTimeout(function(){var el=document.getElementById('ben-401k');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">💰 401(k)</a>
        <a href="#benefits" onclick="event.preventDefault();navigateTo('benefits');setTimeout(function(){var el=document.getElementById('ben-pto');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">🏖️ Paid Time Off</a>
        <a href="#pto-request" onclick="event.preventDefault();navigateTo('pto-request');">📝 PTO Policy &amp; Requests</a>
      </div>
    </div>

    <div class="nav-dropdown">
      <a href="#bonuses" onclick="event.preventDefault();navigateTo('bonuses');">Finance &amp; Invoicing</a>
      <div class="nav-dropdown-menu">
        <a href="#bonuses" onclick="event.preventDefault();navigateTo('bonuses');setTimeout(function(){var el=document.getElementById('bonus-quarterly');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">📊 Quarterly Bonus</a>
        <a href="#bonuses" onclick="event.preventDefault();navigateTo('bonuses');setTimeout(function(){var el=document.getElementById('bonus-referral');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">🤝 Referral Bonuses</a>
        <a href="#invoicing" onclick="event.preventDefault();navigateTo('invoicing');setTimeout(function(){var el=document.getElementById('inv-ar');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">📋 AR Procedures</a>
        <a href="#invoicing" onclick="event.preventDefault();navigateTo('invoicing');setTimeout(function(){var el=document.getElementById('inv-process');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150);">🧾 Invoicing Process</a>
      </div>
    </div>

    <div class="nav-dropdown">
      <a href="#handbook" onclick="event.preventDefault();navigateTo('handbook');">Handbook &amp; IT</a>
      <div class="nav-dropdown-menu">
        <a href="#handbook" onclick="event.preventDefault();navigateTo('handbook');">📖 Employee Handbook</a>
        <a href="#it-support" onclick="event.preventDefault();navigateTo('it-support');">🖥️ IT Support</a>
        <a href="#security-policy" onclick="event.preventDefault();navigateTo('security-policy');">🔒 Security Policy</a>
      </div>
    </div>
  </div>
</nav>

<!-- HERO -->
<div class="hero" style="padding: 70px 2rem 50px; position: relative; overflow: hidden; background: transparent;">
  <!-- Animated gradient orbs -->
  <div style="position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle at center,rgba(34,159,161,0.13) 0%,transparent 65%);top:-250px;left:-150px;animation:orbFloat1 14s ease-in-out infinite;pointer-events:none;z-index:0;"></div>
  <div style="position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle at center,rgba(94,212,200,0.08) 0%,transparent 65%);bottom:-150px;right:-100px;animation:orbFloat2 18s ease-in-out infinite;pointer-events:none;z-index:0;"></div>
  <div style="position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle at center,rgba(34,159,161,0.07) 0%,transparent 65%);top:30%;right:15%;animation:orbFloat3 22s ease-in-out infinite;pointer-events:none;z-index:0;"></div>
  <!-- Subtle grid overlay -->
  <div style="position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(34,159,161,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,159,161,0.03) 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(to bottom,rgba(0,0,0,0.4),transparent 90%);-webkit-mask-image:linear-gradient(to bottom,rgba(0,0,0,0.4),transparent 90%);"></div>


  <div style="position:relative;z-index:1;text-align:center;max-width:800px;width:100%;margin:0 auto;">
    <div style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(34,159,161,0.08);border:1px solid rgba(34,159,161,0.2);border-radius:999px;padding:.3rem .9rem;margin-bottom:1.25rem;">
      <span style="width:6px;height:6px;border-radius:50%;background:#229FA1;display:inline-block;animation:gradientShift 2s ease-in-out infinite;color:#FFFFFF"></span>
      <span style="color:#5ED4C8;font-family:Inter,system-ui,sans-serif;font-size:0.84rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Tiger Tracks Internal Platform</span>
    </div>
    <h1 style="font-family:'DM Serif Display',serif;font-size:3.84rem;font-weight:700;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.75rem;">
      <span style="color:#FFFFFF;">Team </span><span class="gradient-text">Resource Hub</span>
    </h1>
    <p style="color:#9E9E9E;font-size:1.08rem;letter-spacing:0.02em;font-family:Inter,system-ui,sans-serif;margin:0 0 2rem;text-align:center;width:100%;max-width:500px;margin-left:auto;margin-right:auto;">Your command center for playbooks, templates, benefits, and team standards.</p>

    <!-- Command Bar -->
    <div id="cmd-bar-wrap" style="max-width:640px;margin:0 auto;position:relative;">
      <div style="position:absolute;left:1.25rem;top:50%;transform:translateY(-50%);color:#229FA1;font-size:1.2rem;pointer-events:none;">⌘</div>
      <input id="cmdBar" type="text" placeholder="Search resources, playbooks, templates..."
        style="width:100%;padding:0.875rem 3.5rem 0.875rem 3rem;background:rgba(27,33,38,0.6);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid #229FA1;border-radius:12px;color:#FFFFFF;font-family:Inter,system-ui,sans-serif;font-size:1.14rem;outline:none;transition:box-shadow 0.2s,border-color 0.2s;"
        onfocus="this.style.boxShadow='0 0 20px rgba(34,159,161,0.15)';this.style.borderColor='#5ED4C8'"
        onblur="this.style.boxShadow='';this.style.borderColor='#229FA1'">
      <!-- ⌘K badge -->
      <div style="position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);background:#1B2126;color:#FFFFFF;font-family:Inter,system-ui,sans-serif;font-size:0.84rem;padding:0.2rem 0.5rem;border-radius:999px;border:1px solid rgba(255,255,255,0.1);pointer-events:none;white-space:nowrap;">⌘K</div>
    </div>
  </div>
  <p class="hero-sub" style="display:none;">Tiger Tracks · Internal Platform</p>
</div>

<div class="container">

<!-- BENTO GRID -->
<div id="bento-grid" style="max-width:min(90vw,1400px);width:100%;margin:0 auto;padding:0 1.5rem;">
  
  <!-- STANDARD TILES: 12 tiles, 4 cols desktop -->
  <div id="tile-grid">
    <!-- 1: Management Playbook -->
    <div class="tile" style="--tile-accent:#229FA1;border-left:3px solid #229FA1;" onclick="navigateTo('playbook')" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      <div class="tile-title">Management Playbook</div>
      <div class="tile-desc">Delegation, escalation frameworks & the Manager OS</div>
    </div>
    <!-- 2: About Tiger Tracks -->
    <div class="tile" style="--tile-accent:#1F807E;border-left:3px solid #1F807E;" onclick="navigateTo('org')" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1F807E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <div class="tile-title">About Tiger Tracks</div>
      <div class="tile-desc">Company overview, mission & leadership</div>
    </div>
    <!-- 3: Culture -->
    <div class="tile" style="--tile-accent:#1F807E;border-left:3px solid #1F807E;" onclick="navigateTo('culture')" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1F807E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <div class="tile-title">Culture & Standards</div>
      <div class="tile-desc">Good standing, feedback form & team values</div>
    </div>
    <!-- 4: Best Practices -->
    <div class="tile" style="--tile-accent:#229FA1;border-left:3px solid #229FA1;" onclick="navigateTo('best-practices')" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
      <div class="tile-title">Platform Training</div>
      <div class="tile-desc">Platform playbooks — Google, Meta, LinkedIn, Asana, Slack</div>
    </div>
    <!-- 5: Team Resources (templates section) -->
    <div class="tile" style="--tile-accent:#1A7477;border-left:3px solid #1A7477;" onclick="navigateTo('templates')" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A7477" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
      <div class="tile-title">Team Resources</div>
      <div class="tile-desc">Templates, tools, 1:1 agendas & capacity checks</div>
    </div>
    <!-- 6: Roles & Responsibilities -->
    <div class="tile" style="--tile-accent:#1A7477;border-left:3px solid #1A7477;" onclick="navigateTo('roles')" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A7477" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      <div class="tile-title">Roles &amp; Responsibilities</div>
      <div class="tile-desc">Clear ownership at every level — AC through Director</div>
    </div>
    <!-- 7: Org Chart -->
    <div class="tile" style="--tile-accent:#1A7477;border-left:3px solid #1A7477;" onclick="navigateTo('org')" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A7477" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><rect x="1" y="16" width="6" height="4" rx="1"/><rect x="9" y="16" width="6" height="4" rx="1"/><rect x="17" y="16" width="6" height="4" rx="1"/><path d="M4 16v-4h16v4"/><path d="M12 6v6"/></svg>
      <div class="tile-title">Org Chart</div>
      <div class="tile-desc">Reporting structure & team hierarchy</div>
    </div>
    <!-- 8: Benefits -->
    <div class="tile" style="--tile-accent:#1F807E;border-left:3px solid #1F807E;" onclick="navigateTo('benefits')" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1F807E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      <div class="tile-title">Benefits</div>
      <div class="tile-desc">Medical, dental, vision, 401(k) & PTO</div>
    </div>
    <!-- 9: Finance & Invoicing -->
    <div class="tile" style="--tile-accent:#1F807E;border-left:3px solid #1F807E;" onclick="navigateTo('bonuses')" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1F807E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      <div class="tile-title">Finance & Invoicing</div>
      <div class="tile-desc">Bonuses, referrals, AR procedures & invoicing</div>
    </div>
    <!-- 10: PTO -->
    <div class="tile" style="--tile-accent:#1F807E;border-left:3px solid #1F807E;" onclick="navigateTo('pto-request')" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1F807E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="10" y1="14" x2="8" y2="14"/><line x1="10" y1="18" x2="8" y2="18"/></svg>
      <div class="tile-title">PTO Policy &amp; Requests</div>
      <div class="tile-desc">Unified policy, request portal & balance tracker</div>
    </div>
    <!-- 11: Handbook -->
    <div class="tile" style="--tile-accent:#1A7477;border-left:3px solid #1A7477;" onclick="navigateTo('handbook')" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A7477" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="11" y2="16"/></svg>
      <div class="tile-title">Handbook & IT</div>
      <div class="tile-desc">Employee handbook, IT support & security policies</div>
    </div>
    <!-- 12: Feedback Form -->
    <div class="tile" style="--tile-accent:#229FA1;border-left:3px solid #229FA1;" onclick="navigateTo('culture');setTimeout(function(){var el=document.getElementById('cul-feedback');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});},200);" tabindex="0">
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <div class="tile-title">Feedback Form</div>
      <div class="tile-desc">Submit anonymous feedback to leadership</div>
    </div>
  </div>

  <!-- FEATURE TILES: 3 wider tiles, full-width row -->
  <div id="tile-grid-feature">
    <!-- 13: Performance Management (external) -->
    <div class="tile" style="--tile-accent:#229FA1;border-left:3px solid #229FA1;" onclick="window.open('https://performance.tigertracks.ai/','_blank','noopener,noreferrer')" tabindex="0">
      <svg class="tile-ext" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
      <div class="tile-title">Performance Management</div>
      <div class="tile-desc">Weekly syncs, monthly reviews & peer feedback</div>
    </div>
    <!-- 14: Retreat & Events (external) -->
    <div class="tile" style="--tile-accent:#229FA1;border-left:3px solid #229FA1;" onclick="window.open('https://retreat.tigertracks.ai/','_blank','noopener,noreferrer')" tabindex="0">
      <svg class="tile-ext" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      <div class="tile-title">Retreat &amp; Events</div>
      <div class="tile-desc">Miami 2026 retreat — schedule, logistics & team info</div>
    </div>
    <!-- 15: AI Policy (external) -->
    <div class="tile" style="--tile-accent:#229FA1;border-left:3px solid #229FA1;" onclick="window.open('https://security.tigertracks.ai/','_blank','noopener,noreferrer')" tabindex="0">
      <svg class="tile-ext" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      <svg class="tile-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
      <div class="tile-title">AI Policy</div>
      <div class="tile-desc">Responsible AI guidelines & data security standards</div>
    </div>
  </div>
</div>

<!-- SECTION DIVIDER -->
<div style="margin-top:100px;margin-bottom:40px;">
  <div style="max-width:60%;margin:0 auto;height:1px;background:linear-gradient(90deg,transparent,rgba(34,159,161,0.2) 20%,rgba(34,159,161,0.2) 80%,transparent);"></div>
</div>

<!-- ===================== ROLES ===================== -->
<div class="section" id="team-resources">
  <div class="section-header"><span class="emoji">👥</span><h2>Team Resources</h2></div>
  <p style="color:#9E9E9E;font-family:Inter,system-ui,sans-serif;font-size:1.14rem;margin-bottom:2rem;line-height:1.7;">
    Everything you need to understand your role, track your growth, and engage with your team — all in one place.
    Select a section below to get started.
  </p>

  <div id="tr-landing-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;">

    <div onclick="navigateTo('roles')" style="background:linear-gradient(135deg,#1B2126,#1E2830);border:1px solid rgba(34,159,161,0.15);border-left:4px solid #229FA1;border-radius:14px;padding:1.5rem;cursor:pointer;transition:transform .2s,box-shadow .2s;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(34,159,161,0.12)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
      <div style="font-size:1.8rem;margin-bottom:.75rem;">🎯</div>
      <div style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.2rem;font-weight:700;margin-bottom:.4rem;">Roles &amp; Responsibilities</div>
      <div style="color:#9E9E9E;font-family:Inter,system-ui,sans-serif;font-size:1.02rem;line-height:1.5;">Job expectations, promotion criteria, and what success looks like at each level.</div>
    </div>

    <div onclick="navigateTo('evaluation')" style="background:linear-gradient(135deg,#1B2126,#1E2830);border:1px solid rgba(34,159,161,0.15);border-left:4px solid #1F807E;border-radius:14px;padding:1.5rem;cursor:pointer;transition:transform .2s,box-shadow .2s;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(34,159,161,0.12)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
      <div style="font-size:1.8rem;margin-bottom:.75rem;">📊</div>
      <div style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.2rem;font-weight:700;margin-bottom:.4rem;">Self-Evaluation Survey</div>
      <div style="color:#9E9E9E;font-family:Inter,system-ui,sans-serif;font-size:1.02rem;line-height:1.5;">Reflect on your performance across core competencies. Supports your monthly review conversations.</div>
    </div>

    <div onclick="navigateTo('specialties')" style="background:linear-gradient(135deg,#1B2126,#1E2830);border:1px solid rgba(34,159,161,0.15);border-left:4px solid #1A7477;border-radius:14px;padding:1.5rem;cursor:pointer;transition:transform .2s,box-shadow .2s;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(34,159,161,0.12)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
      <div style="font-size:1.8rem;margin-bottom:.75rem;">🧠</div>
      <div style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.2rem;font-weight:700;margin-bottom:.4rem;">Team Specialties Chart</div>
      <div style="color:#9E9E9E;font-family:Inter,system-ui,sans-serif;font-size:1.02rem;line-height:1.5;">See what each team member specializes in — great for staffing decisions and collaboration.</div>
    </div>

    <div onclick="navigateTo('reviews')" style="background:linear-gradient(135deg,#1B2126,#1E2830);border:1px solid rgba(34,159,161,0.15);border-left:4px solid #1F807E;border-radius:14px;padding:1.5rem;cursor:pointer;transition:transform .2s,box-shadow .2s;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(34,159,161,0.12)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
      <div style="font-size:1.8rem;margin-bottom:.75rem;">📝</div>
      <div style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.2rem;font-weight:700;margin-bottom:.4rem;">Meeting Agendas</div>
      <div style="color:#9E9E9E;font-family:Inter,system-ui,sans-serif;font-size:1.02rem;line-height:1.5;">Weekly sync and monthly review question guides — organized by role. Links to Performance Check-Ins.</div>
    </div>

  </div>
</div>

<!-- ===================== ROLES ===================== -->
<div class="section" id="roles">
  <div class="section-header"><span class="emoji">🎯</span><h2>Roles & Responsibilities</h2></div>

  <div class="callout">
    <strong>Purpose:</strong> This defines what is expected at each level. It provides role clarity, reinforces swim lanes, supports performance conversations, and anchors all roles to the North Star: <strong>Customer Success</strong> (measured by sustained managed revenue growth).
  </div>

  <!-- AC -->
  <div class="card">
    <div class="role-header">
      <h3>Account Coordinator (AC)</h3>
      <div><span class="badge badge-accounts">6–10 accounts</span> <span class="badge badge-revenue">$12K+/mo MR</span></div>
    </div>
    <p><em>Early-career execution and operational support role focused on building strong paid media fundamentals, accuracy, and professional confidence.</em></p>
    <h4 class="collapsible" onclick="toggle(this)">Core Responsibilities</h4>
    <div class="collapsible-content">
      <ul>
        <li>Build campaigns and ad sets under strategist guidance</li>
        <li>Execute basic optimizations and bid adjustments</li>
        <li>Rotate and traffic creative assets</li>
        <li>Prepare reporting screenshots and slides</li>
        <li>Maintain UTMs, change logs, and tracking documentation</li>
        <li>QA campaign setups and data accuracy</li>
        <li>Support pacing checks and budget tracking</li>
        <li>Take notes on internal and client calls</li>
        <li>Update task management tools and timelines</li>
        <li>Organize assets and documentation</li>
        <li>Support testing execution</li>
        <li>Validate links, tracking, and conversions</li>
        <li>Assist with ad copy updates</li>
        <li>Monitor alerts and platform notifications</li>
        <li>Flag issues or errors immediately</li>
        <li>Follow documented processes and templates</li>
        <li>Communicate task status proactively</li>
        <li>Support strategist workload during high-volume periods</li>
      </ul>
    </div>
    <h4 class="collapsible" onclick="toggle(this)">Success Metrics</h4>
    <div class="collapsible-content">
      <ul>
        <li>Build error-free campaign components with &lt;1% QA rework</li>
        <li>Improve turnaround time on assigned tasks</li>
        <li>Demonstrate readiness for increased ownership</li>
        <li>Task completion accuracy &amp; on-time delivery rate</li>
        <li>Reduction in rework</li>
        <li>Manager/strategist feedback</li>
      </ul>
    </div>
  </div>

  <!-- AS -->
  <div class="card">
    <div class="role-header">
      <h3>Account Strategist (AS)</h3>
      <div><span class="badge badge-accounts">3–6 accounts</span> <span class="badge badge-revenue">$15K+/mo MR</span></div>
    </div>
    <p><em>Owner of in-platform performance and channel execution. Strategists translate strategy into results through daily optimization and testing.</em></p>
    <h4 class="collapsible" onclick="toggle(this)">Core Responsibilities</h4>
    <div class="collapsible-content">
      <ul>
        <li>Build, launch, and optimize Google and Meta campaigns</li>
        <li>Own daily pacing and performance monitoring</li>
        <li>Execute bid, audience, and budget adjustments</li>
        <li>Develop testing hypotheses and roadmaps</li>
        <li>Analyze performance data and trends</li>
        <li>QA tracking, conversions, and UTMs</li>
        <li>Troubleshoot performance or tracking issues</li>
        <li>Surface proactive insights and risks</li>
        <li>Prepare insights for reporting and calls</li>
        <li>Support technical discussions on client calls</li>
        <li>Delegate execution tasks to ACs</li>
        <li>Review AC output for quality and accuracy</li>
        <li>Maintain testing and performance documentation</li>
        <li>Stay current on platform updates</li>
        <li>Recommend strategic adjustments to AMs</li>
        <li>Support onboarding of new accounts</li>
        <li>Escalate risks early</li>
      </ul>
    </div>
    <h4 class="collapsible" onclick="toggle(this)">Success Metrics</h4>
    <div class="collapsible-content">
      <ul>
        <li>Improve CPA / ROAS against client targets</li>
        <li>Launch X tests per quarter with documented learnings</li>
        <li>Reduce pacing or performance surprises</li>
        <li>Channel performance vs goals</li>
        <li>Pacing accuracy &amp; testing velocity</li>
        <li>Insight quality</li>
      </ul>
    </div>
  </div>

  <!-- AM -->
  <div class="card">
    <div class="role-header">
      <h3>Account Manager (AM)</h3>
      <div><span class="badge badge-accounts">3–6 accounts</span> <span class="badge badge-revenue">$22K+/mo MR</span> <span class="badge badge-tier">Tier 3–4 primary</span></div>
    </div>
    <p><em>Communication and execution alignment leader. AMs own client communication, timelines, and coordination across the pod, with growing responsibility for revenue expansion and account health.</em></p>
    <h4 class="collapsible" onclick="toggle(this)">Core Responsibilities</h4>
    <div class="collapsible-content">
      <ul>
        <li>Serve as primary POC for Tier 3–4 clients</li>
        <li>Co-lead Tier 2–3 client meetings</li>
        <li>Create agendas, recaps, and action items</li>
        <li>Own client reporting preparation and QA</li>
        <li>Manage timelines, deliverables, and workflows</li>
        <li>Delegate work to AS and AC roles</li>
        <li>Run weekly 1:1s with direct reports</li>
        <li>Escalate delivery or performance risks early</li>
        <li>Identify upsell and expansion opportunities</li>
        <li>Pitch budget increases and new initiatives</li>
        <li>Document pitches and outcomes in Client Success Trix</li>
        <li>Coordinate with ADs on Tier 1–2 accounts</li>
        <li>Maintain client documentation and notes</li>
        <li>Ensure internal alignment before client communication</li>
        <li>Flag account health risks</li>
        <li>Track and report on revenue growth</li>
      </ul>
    </div>
    <h4 class="collapsible" onclick="toggle(this)">Success Metrics</h4>
    <div class="collapsible-content">
      <ul>
        <li>Client trust and clarity</li>
        <li>Smooth execution flow</li>
        <li>Revenue protection and growth</li>
        <li>Proactive communication</li>
        <li>Professional presence</li>
      </ul>
    </div>
  </div>

  <!-- Sr AM -->
  <div class="card">
    <div class="role-header">
      <h3>Senior Account Manager (Sr AM)</h3>
      <div><span class="badge badge-tier">Tier 2–3 primary</span></div>
    </div>
    <p><em>Manages AMs + client experience. Coaches AMs on leadership, client management, and communication. First escalation point for AMs.</em></p>
    <h4 class="collapsible" onclick="toggle(this)">Core Responsibilities</h4>
    <div class="collapsible-content">
      <ul>
        <li>Own Tier 2–3 client experience; supports ADs on Tier 1</li>
        <li>Coach AMs on leadership, client management, communication</li>
        <li>Review strategy, insights, and roadmaps</li>
        <li>Ensure consistency across pod standards</li>
        <li>First escalation point for AMs</li>
        <li>Participate in performance reviews (per pod structure)</li>
        <li>Maintain high-quality reporting and client deliverables</li>
        <li>Monitor pod workload and flag capacity risks to AD</li>
        <li>Support onboarding of new AMs and set initial expectations</li>
        <li>Drive proactive communication and risk mitigation on Tier 2–3 accounts</li>
      </ul>
    </div>
    <h4 class="collapsible" onclick="toggle(this)">Success Metrics</h4>
    <div class="collapsible-content">
      <ul>
        <li>Tier 2–3 client retention and relationship health</li>
        <li>AM development: measurable skill growth and reduced escalations over time</li>
        <li>Pod execution consistency — deliverables on time, QA accuracy</li>
        <li>Escalation quality: issues surface early with context and proposed solutions</li>
        <li>Client satisfaction signals: renewal rate, upsell participation, positive feedback</li>
        <li>Manager and AD feedback on coaching effectiveness</li>
      </ul>
    </div>
  </div>

  <!-- AD -->
  <div class="card">
    <div class="role-header">
      <h3>Associate Director (AD)</h3>
      <div><span class="badge badge-tier">Tier 1–2 primary</span></div>
    </div>
    <p><em>Leads teams of Sr AMs + AMs, ensures operational excellence. ADs must spend the majority of time client-facing, not internally project-managing.</em></p>
    <h4 class="collapsible" onclick="toggle(this)">Core Responsibilities</h4>
    <div class="collapsible-content">
      <ul>
        <li>Own Tier 1–2 relationships and executive-level communication</li>
        <li>Drive strategic vision, narrative, and roadmap execution</li>
        <li>Oversee pod performance: revenue protection, retention, growth</li>
        <li>Capacity planning and resourcing</li>
        <li>Final escalation point before Ops/Leadership</li>
        <li>Lead QBRs and define success metrics with client leadership</li>
        <li>Conduct performance reviews for Sr AMs</li>
        <li>Translate business goals into clear team priorities and delivery plans</li>
        <li>Build executive-level trust and client confidence on strategic accounts</li>
        <li>Own churn prevention and managed revenue growth across the pod</li>
        <li>Partner with leadership on staffing, pod structure, and account assignments</li>
      </ul>
    </div>
    <h4 class="collapsible" onclick="toggle(this)">Success Metrics</h4>
    <div class="collapsible-content">
      <ul>
        <li>Tier 1–2 client retention rate and managed revenue growth</li>
        <li>QBR quality: client confidence, strategic clarity, actionable roadmaps</li>
        <li>Pod performance: team hitting goals, low rework, strong delivery rhythm</li>
        <li>Revenue protection: early identification and resolution of at-risk accounts</li>
        <li>Direct report development: Sr AMs growing toward AD-readiness</li>
        <li>Leadership feedback: strategic thinking, communication upward, and pod accountability</li>
      </ul>
    </div>
    <div class="callout red" style="margin-top:1rem">
      <strong>No-Fly Zone:</strong> ADs and Sr AMs should not be doing tactical work that sits with AS/AC. When exceptions happen, communicate early so the pod can support.
    </div>
  </div>


  <div class="card">
    <h3>📹 Tiger Tracks Reorg Announcement</h3>
    <video controls style="width:100%;border-radius:8px;margin-top:.5rem;" preload="metadata">
      <source src="/reorg-announcement.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</div>

<!-- ===================== PLAYBOOK ===================== -->
<div class="section" id="playbook">
  <div class="section-header"><span class="emoji">📘</span><h2>Management Playbook</h2></div>

  <div class="card">
    <h3>Our North Star</h3>
    <div class="callout green">
      <strong>Customer Success</strong> is the North Star for every role, decision, and priority. It means: protecting and growing managed revenue, delivering clear and confident communication, providing strategic insight that builds trust, and creating stable, scalable client relationships.
    </div>
  </div>

  <div class="card">
    <h3>The Organizational Philosophy</h3>
    <p>Tiger Tracks' leadership model prioritizes:</p>
    <ul>
      <li><strong>Ownership</strong> over tasks and outcomes</li>
      <li><strong>Clear expectations</strong> over assumptions</li>
      <li><strong>Fast feedback</strong> over delayed course-correction</li>
      <li><strong>Simplicity</strong> over bureaucracy</li>
      <li><strong>Coaching</strong> over directing</li>
      <li><strong>High performance with humanity</strong></li>
      <li><strong>Customer success</strong> above everything</li>
    </ul>
  </div>

  <div class="card">
    <h3>What It Means to Be a Manager Here</h3>
    <p>You are accountable for five outcomes:</p>
    <div class="table-wrap">
      <table>
        <tr><th>Outcome</th><th>What It Means</th></tr>
        <tr><td><strong>Clarity</strong></td><td>Your report knows what success looks like, why it matters, and how it ties to customer success</td></tr>
        <tr><td><strong>Communication</strong></td><td>Information flows down (expectations, priorities) and up (risks, blockers) early</td></tr>
        <tr><td><strong>Coaching</strong></td><td>You develop people through structured touchpoints - weekly tactical, monthly coaching</td></tr>
        <tr><td><strong>Consistency</strong></td><td>Your report experiences a predictable rhythm. Calm comes from routine</td></tr>
        <tr><td><strong>Quality</strong></td><td>You ensure work is client-ready and meets Tiger Tracks standards</td></tr>
      </table>
    </div>

    <h4>You are NOT expected to:</h4>
    <ul>
      <li>Act as a therapist</li>
      <li>Spend hours a week in 1:1s</li>
      <li>Resolve every problem personally</li>
      <li>Carry all the workload yourself</li>
    </ul>

    <h4>You ARE expected to:</h4>
    <ul>
      <li>Set expectations early</li>
      <li>Provide direction and guardrails</li>
      <li>Give feedback quickly (not late)</li>
      <li>Delegate appropriately</li>
      <li>Escalate early</li>
      <li>Develop people over time</li>
    </ul>

    <p style="margin-top:1rem"><strong>Leadership tone:</strong> Warmth + Standards (clear, direct, supportive, customer-first)</p>
  </div>

  <div class="card">
    <h3>The Pod Model</h3>
    <p>Pods are designed to have clear reporting lines, maintain healthy manager ratios (1–2 direct reports per layer), stay intact as the business grows, and flex cross-functionally during high-volume periods.</p>
    <div class="callout blue">
      <strong>Pods are benches, not families.</strong> When someone levels up, they move to a new bench. The existing bench stays intact. Open roles are backfilled intentionally. Growth is based on business need and performance, not tenure alone.
    </div>
  </div>

  <div class="card">
    <h3>Role Swim Lanes</h3>
    <p>As you move up, you shift away from tactical execution and toward strategic leadership:</p>
    <div class="table-wrap">
      <table>
        <tr><th>Role</th><th>Focus</th></tr>
        <tr><td><strong>AC</strong></td><td>Pipeline + execution support. High coaching needs.</td></tr>
        <tr><td><strong>AS</strong></td><td>In-platform performance, optimization, insights, testing. Delegates to ACs.</td></tr>
        <tr><td><strong>AM</strong></td><td>Tier 3–4 communication, workflow, reporting, QA. Manages downward.</td></tr>
        <tr><td><strong>Sr AM</strong></td><td>Tier 2–3 client experience. Coaches AMs. First escalation point.</td></tr>
        <tr><td><strong>AD</strong></td><td>Tier 1–2 strategic leadership. Revenue, narrative, QBRs, performance reviews.</td></tr>
      </table>
    </div>
  </div>

  <!-- MOS subsection -->
  <div class="section-header" data-sub="mos" style="margin-top:2rem;"><span class="emoji">⚙️</span><h2>Manager Operating System (MOS)</h2></div>

  <div class="card">
    <h3>Weekly Rhythm (30–45 min per direct report)</h3>
    <ul>
      <li><strong>15-minute 1:1</strong></li>
      <li><strong>5-min expectations check</strong></li>
      <li><strong>5-min priorities + delegation</strong> (what moves this week?)</li>
      <li><strong>5-min blockers/risk</strong> (what needs escalation?)</li>
      <li><strong>Mid-week Slack pulse:</strong> "Any blockers?" (short + consistent)</li>
    </ul>
  </div>

  <div class="card">
    <h3>Monthly Cadence</h3>
    <p>Structured coaching, not constant criticism.</p>
    <ul>
      <li>Performance pulse check</li>
      <li>Review goals / growth tracking</li>
      <li>Identify support needs</li>
      <li>Flag any concerns early</li>
      <li>15-minute 1:1 dedicated to feedback</li>
    </ul>
    <p style="margin-top:.5rem"><strong>Led by:</strong> AD for Sr AM → Sr AM for AM → AM for AS and AC</p>
  </div>

  <div class="card">
    <h3>Quarterly (Led by Pod AD)</h3>
    <ul>
      <li>Pod-based review</li>
      <li>Deep-dive development conversation</li>
      <li>Reset expectations</li>
      <li>Review goals + stretch opportunities</li>
    </ul>
  </div>

  <div class="card">
    <h3>Q1 Success Measures</h3>
    <ul>
      <li>Account health</li>
      <li>Revenue protection &amp; expansion</li>
      <li>Client trust signals</li>
      <li>Reduced escalations</li>
      <li>Improved delegation + workload balance</li>
      <li>Manager adherence to MOS</li>
    </ul>
  </div>

  <!-- Delegation subsection -->
  <div class="section-header" data-sub="delegation" style="margin-top:2rem;"><span class="emoji">🎯</span><h2>Delegation Principles</h2></div>

  <div class="card">
    <h3>The #1 Delegation Rule: Issue Commands, Don't Ask</h3>
    <div class="callout red" style="margin-bottom:1rem;">
      <strong>Stop asking "Who has bandwidth?"</strong>: This leads to imbalanced workloads. The same people volunteer every time and the same people hide behind "busy."
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1rem 0;">
      <div style="background:#F4F1EB;color:#1A1A1A;padding:1rem;border-radius:12px;border-left:4px solid var(--danger);">
        <h4 style="color:#7f1d1d;margin:0 0 .5rem;">❌ Don't Say</h4>
        <ul style="margin:0;font-size:1.02rem;">
          <li>"Who has bandwidth to help with ____?"</li>
          <li>"Who has time to create XYZ deliverable?"</li>
          <li>"When can you have this done by?"</li>
        </ul>
      </div>
      <div style="background:#1A7477;color:#FFFFFF;padding:1rem;border-radius:12px;border-left:4px solid var(--success);">
        <h4 style="color:var(--success);margin:0 0 .5rem;">✅ Do Say</h4>
        <p style="margin:0;font-size:1.02rem;"><em>"[Team member], I need XYZ done by EOD today. Please email me the draft by 4pm so I can review and share feedback before shipping to client."</em></p>
      </div>
    </div>
    <p style="font-size:1.08rem;margin-top:.75rem;"><strong>Why this matters:</strong> Being "busy" is synonymous with working, <em>everyone</em> is busy every day. The real question is: <strong>what are they busy with, and is it the best use of their time?</strong></p>
  </div>

  <div class="card">
    <h3>When They Push Back, That's a Good Thing</h3>
    <p>When you issue a clear command and the person says they don't have bandwidth, <strong>this is not a problem, it's an opportunity.</strong></p>
    <div class="callout green">
      <strong>Ask genuinely:</strong> "What higher-priority work do you have today that's getting in the way?"<br>
      <em>This is NOT a "gotcha" question.</em> This is you learning about their priorities and where your delegated work stacks up.
    </div>
    <h4 style="margin-top:1rem;">The Prioritization Conversation</h4>
    <p>You are now engaged in a <strong>highly productive prioritization conversation</strong>: and a teaching moment. Two outcomes:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1rem 0;">
      <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
        <h4 style="margin:0 0 .35rem;font-size:1.08rem;">📌 Their work is lower priority</h4>
        <p style="margin:0;font-size:1.02rem;">Issue a clear command: <em>"I need you to deprioritize that in favor of this more urgent work."</em> You can and should reprioritize your team's time to focus on high-priority work. <strong>This is you helping your team win.</strong></p>
      </div>
      <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
        <h4 style="margin:0 0 .35rem;font-size:1.08rem;">✅ Their work is actually higher priority</h4>
        <p style="margin:0;font-size:1.02rem;">Great, now you know! Reassign the task or adjust the deadline. You've had a productive conversation either way.</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>⚠️ Watch for the "Calendar Shield"</h3>
    <p>Often, a lack of bandwidth is <strong>not about prioritization at all.</strong> Some team members use whatever is on their calendar, regardless of what it is, as an excuse to avoid taking on delegated work.</p>
    <div class="callout">
      <strong>Key insight:</strong> They may not realize this practice will actually <strong>hurt them long term</strong>. It signals a lack of flexibility, initiative, and team orientation, all of which are critical for advancement.
    </div>
    <p style="margin-top:.75rem;">As a manager, it's your job to identify when this is happening and coach through it, not let it slide. A simple <em>"Walk me through your calendar today"</em> can surface the reality quickly.</p>
  </div>

  <div class="card">
    <h3>Delegation Checklist (Quick Reference)</h3>
    <ol class="steps">
      <li><strong>Define the outcome</strong>: What does "good" look like?</li>
      <li><strong>Issue the command clearly</strong>: Name, deliverable, deadline. No ambiguity.</li>
      <li><strong>Clarify ownership</strong>: "You own this from start to finish."</li>
      <li><strong>Check understanding</strong>: "Repeat back what you're delivering and by when."</li>
      <li><strong>Define check-in level</strong>: None (autonomy) / One (accountability) / Multiple (coaching)</li>
      <li><strong>Provide context or links</strong></li>
      <li><strong>Invite pushback</strong>: "What could get in your way?" (then have the prioritization conversation)</li>
      <li><strong>Confirm priority level</strong></li>
      <li><strong>Log it</strong> in your manager notes</li>
    </ol>
    <div class="callout blue">
      <strong>Questions?</strong> Reach out to Elizabeth (People Operations) for coaching on delegation techniques or navigating pushback conversations.
    </div>
  </div>

  <!-- Escalation & Performance subsection -->
  <div class="section-header" data-sub="escalation" style="margin-top:2rem;"><span class="emoji">🚨</span><h2>Escalation Principles</h2></div>

  <div class="card">
    <h3>When to Escalate</h3>
    <ul>
      <li>Risk of delay</li>
      <li>Repeated quality issues</li>
      <li>Client tension</li>
      <li>Workload imbalance</li>
      <li>Missed expectations</li>
      <li>Behavioral issues</li>
      <li>Anything that threatens customer success or managed revenue growth</li>
    </ul>
    <div class="callout red">
      <strong>Escalate early, not when it's urgent.</strong> If a problem has been escalated twice without resolution, the team member can bring it to the next level.
    </div>
  </div>

  <div class="card">
    <h3>Escalation Path</h3>
    <div style="display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; font-size:1.14rem; font-weight:600; margin:.75rem 0;">
      <span style="background:#1B2126;color:#FFFFFF;padding:.3rem .7rem;border-radius:6px;">AS</span> →
      <span style="background:#1B2126;color:#FFFFFF;padding:.3rem .7rem;border-radius:6px;">AM</span> →
      <span style="background:#1B2126;color:#FFFFFF;padding:.3rem .7rem;border-radius:6px;">Sr AM</span> →
      <span style="background:#1B2126;color:#FFFFFF;padding:.3rem .7rem;border-radius:6px;">AD</span> →
      <span style="background:#1B2126;color:#FFFFFF;padding:.3rem .7rem;border-radius:6px;">Leadership</span>
    </div>
    <p><strong>Any level → HR</strong> for behavior, repeated underperformance, documentation needs, harassment, or discrimination.</p>
  </div>

  <div class="card">
    <h3>Evaluating Performance: The 3 C's</h3>
    <div class="table-wrap">
      <table>
        <tr><th>C</th><th>Question</th></tr>
        <tr><td><strong>Competence</strong></td><td>Is the work accurate, strategic, and client-ready?</td></tr>
        <tr><td><strong>Communication</strong></td><td>Are updates timely, clear, and proactive?</td></tr>
        <tr><td><strong>Consistency</strong></td><td>Are they reliable day-to-day and week-to-week?</td></tr>
      </table>
    </div>
    <h4>When a report is struggling:</h4>
    <ol>
      <li>Clarify the expectation</li>
      <li>Provide examples of good vs. not-good</li>
      <li>Create a simple improvement plan (1–3 items)</li>
      <li>Follow up weekly using MOS</li>
      <li>Escalate if it doesn't improve</li>
    </ol>
  </div>

  <div class="card">
    <h3>Manager Culture</h3>
    <p>Managers contribute to a culture of:</p>
    <ul>
      <li>Psychological safety + high performance</li>
      <li>Transparency</li>
      <li>Accountability with compassion</li>
      <li>Direct communication without harshness</li>
      <li>Growth and development</li>
      <li>Ownership at every level</li>
      <li>Predictable routines</li>
    </ul>
    <div class="callout green">
      We care deeply about people <strong>and</strong> about the quality of work. This hybrid tone is the backbone of our leadership philosophy.
    </div>
  </div>
</div>

<!-- ===================== TEMPLATES ===================== -->
<div class="section" id="templates">
  <div class="section-header"><span class="emoji">📋</span><h2>Templates & Tools</h2></div>

  <div class="callout blue" style="margin-bottom:1.5rem;">
    <strong>💡 How to use:</strong> Click <strong>📝 Use Template</strong> to create an editable copy. Fill it out, assign it to a team member, and copy or email it when ready. Your saved copies are stored in <strong>📂 My Saved Templates</strong> below.
  </div>

  <!-- Saved Templates -->
  <div class="card" id="savedTemplatesCard">
    <h3 class="collapsible" onclick="toggle(this)">📂 My Saved Templates</h3>
    <div class="collapsible-content">
      <div id="savedTemplatesList"></div>
    </div>
  </div>

  <!-- Template cards rendered by JS -->
  <div id="templateCardsContainer"></div>
</div>

<!-- ===================== TT OFFERINGS ===================== -->
<div class="section" id="offerings">
  <div class="section-header"><span class="emoji">🚀</span><h2>Tiger Tracks Offerings</h2></div>

  <div class="card">
    <h3>Why This Matters to You</h3>
    <div class="callout green" style="margin-bottom:1rem;">
      <strong>We have more ways than ever before to support our clients and grow their businesses.</strong> As an agency that started with Media Buying, it can be easy to default to only focusing on this. But the opportunity in front of us is massive.
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin:1rem 0;">
      <div style="background:#1A7477;color:#FFFFFF;padding:1rem;border-radius:12px;border-left:4px solid var(--success);">
        <h4 style="margin:0 0 .35rem;font-size:1.08rem;">💪 Stronger Client Relationships</h4>
        <p style="margin:0;font-size:1.02rem;">The more value you add in different ways, the deeper the trust and partnership becomes.</p>
      </div>
      <div style="background:#1A7477;color:#FFFFFF;padding:1rem;border-radius:12px;border-left:4px solid var(--info);">
        <h4 style="margin:0 0 .35rem;font-size:1.08rem;">🔒 Less Client Churn</h4>
        <p style="margin:0;font-size:1.02rem;">"Switching cost" increases the more we do for a client, we become harder to replace.</p>
      </div>
      <div style="background:#1B2126;color:#FFFFFF;padding:1rem;border-radius:12px;border-left:4px solid var(--warning);">
        <h4 style="margin:0 0 .35rem;font-size:1.08rem;">📈 Performance Synergies</h4>
        <p style="margin:0;font-size:1.02rem;">Each offering amplifies the others. The whole is greater than the sum of its parts.</p>
      </div>
      <div style="background:#1B2126;color:#FFFFFF;padding:1rem;border-radius:12px;border-left:4px solid #d946ef;">
        <h4 style="margin:0 0 .35rem;font-size:1.08rem;">💰 Higher Earnings for You</h4>
        <p style="margin:0;font-size:1.02rem;">More offerings = more revenue per client = higher bonus outcomes for everyone.</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>⚡ How Our Offerings Amplify Each Other</h3>
    <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Every offering we sell makes the others perform better:</p>
    <div style="display:flex;flex-direction:column;gap:.5rem;">
      <div style="display:flex;align-items:center;gap:.75rem;padding:.6rem .75rem;background:#0A1119;color:#FFFFFF;border-radius:6px;font-size:1.02rem;">
        <span style="font-size:1.32rem;">📺</span> <strong>Upper-funnel spend</strong> → improves lower-funnel conversion rates
      </div>
      <div style="display:flex;align-items:center;gap:.75rem;padding:.6rem .75rem;background:#0A1119;color:#FFFFFF;border-radius:6px;font-size:1.02rem;">
        <span style="font-size:1.32rem;">🎨</span> <strong>Better creative</strong> → improves paid social performance
      </div>
      <div style="display:flex;align-items:center;gap:.75rem;padding:.6rem .75rem;background:#0A1119;color:#FFFFFF;border-radius:6px;font-size:1.02rem;">
        <span style="font-size:1.32rem;">🌐</span> <strong>Better website + LPs</strong> → improves campaign conversion rates → grows ad spend
      </div>
      <div style="display:flex;align-items:center;gap:.75rem;padding:.6rem .75rem;background:#0A1119;color:#FFFFFF;border-radius:6px;font-size:1.02rem;">
        <span style="font-size:1.32rem;">📧</span> <strong>Lifecycle (email + SMS)</strong> → increases customer LTV → increases CaC tolerance → easier to grow ad spend
      </div>
      <div style="display:flex;align-items:center;gap:.75rem;padding:.6rem .75rem;background:#0A1119;color:#FFFFFF;border-radius:6px;font-size:1.02rem;">
        <span style="font-size:1.32rem;">📊</span> <strong>Better MMM / measurement</strong> → increases client confidence in ROI → drives budget increases
      </div>
      <div style="display:flex;align-items:center;gap:.75rem;padding:.6rem .75rem;background:#0A1119;color:#FFFFFF;border-radius:6px;font-size:1.02rem;">
        <span style="font-size:1.32rem;">🔍</span> <strong>More organic traffic (SEO + GEO)</strong> → increases organic conversions → lowers blended CaC
      </div>
    </div>
  </div>

  <div class="card">
    <h3>🏆 Real Wins Happening Now</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin:.75rem 0;">
      <div style="background:#0A1119;color:#FFFFFF;padding:1.25rem;border-radius:12px;text-align:center;">
        <div style="font-size:2.4rem;font-weight:800;color:var(--success);">$60K/mo</div>
        <div style="font-size:1.02rem;font-weight:600;">Creative-Only Contract</div>
        <div style="font-size:0.96rem;color:var(--text-light);margin-top:.25rem;">Making this a top-3 client by revenue, <em>just for creative</em></div>
      </div>
      <div style="background:#0A1119;color:#FFFFFF;padding:1.25rem;border-radius:12px;text-align:center;">
        <div style="font-size:2.4rem;font-weight:800;color:var(--info);">$170K</div>
        <div style="font-size:1.02rem;font-weight:600;">Website Rebuild Contract</div>
        <div style="font-size:0.96rem;color:var(--text-light);margin-top:.25rem;">Transitions to $30K/mo recurring for maintenance + LP A/B testing</div>
      </div>
    </div>
    <div class="callout" style="margin-top:1rem;">
      <strong>The momentum is there.</strong> We just need to commit as a group to helping our clients in more ways than ever before, and you and your clients will all begin to reap the benefits. We have specialists and experts ready to be tapped in to deliver on any of these offerings.
    </div>
  </div>

  <!-- MEDIA BUYING -->
  <div class="card">
    <h3 style="border-bottom:2px solid var(--accent);padding-bottom:.5rem;">📡 Media Buying</h3>

    <h4 class="collapsible" onclick="toggle(this)">🔍 Paid Search</h4>
    <div class="collapsible-content">
      <p>Capture high-intent demand through disciplined keyword strategy, bidding, and full-funnel optimization to maximize efficient growth.</p>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">📱 Paid Social</h4>
    <div class="collapsible-content">
      <p>Generate demand and scale customer acquisition through audience-driven creative testing and platform-native performance strategy on channels including Meta, TikTok, Snap, and more.</p>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">🎯 Programmatic</h4>
    <div class="collapsible-content">
      <p>Expand reach beyond walled gardens using data-driven targeting and measurement to support brand and performance goals.</p>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">🛒 Retail Media Advertising</h4>
    <div class="collapsible-content">
      <p>Drive incremental revenue across retail networks (Amazon, Walmart, Instacart, etc.) by optimizing product visibility, bidding strategy, and creative performance.</p>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">📺 Connected TV (CTV)</h4>
    <div class="collapsible-content">
      <p>Drive incremental reach and measurable performance through data-driven CTV strategy, audience targeting, and cross-channel attribution beyond linear TV.</p>
    </div>
  </div>

  <!-- CREATIVE -->
  <div class="card">
    <h3 style="border-bottom:2px solid var(--accent);padding-bottom:.5rem;">🎨 Creative</h3>

    <h4 class="collapsible" onclick="toggle(this)">🖼️ Image & Video Ad Creative</h4>
    <div class="collapsible-content">
      <p>Develop engaging content that delivers a powerful message and sets the foundation for success across all digital touchpoints.</p>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">📸 UGC / Influencer</h4>
    <div class="collapsible-content">
      <p>Produce and scale authentic, platform-native user-generated and/or allowlisting content that drives trust, engagement, and performance across channels.</p>
    </div>
  </div>

  <!-- WEBSITE -->
  <div class="card">
    <h3 style="border-bottom:2px solid var(--accent);padding-bottom:.5rem;">🌐 Website</h3>

    <h4 class="collapsible" onclick="toggle(this)">💻 Website Development & Management</h4>
    <div class="collapsible-content">
      <p>Build conversion-focused web experiences designed to support testing, analytics, and sustained performance at scale.</p>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">🔬 Landing Page CRO</h4>
    <div class="collapsible-content">
      <p>Build and A/B test landing pages to augment conversion rate of both paid campaigns and organic traffic.</p>
    </div>
  </div>

  <!-- ORGANIC -->
  <div class="card">
    <h3 style="border-bottom:2px solid var(--accent);padding-bottom:.5rem;">🌱 Organic</h3>

    <h4 class="collapsible" onclick="toggle(this)">🔍 SEO + ASO</h4>
    <div class="collapsible-content">
      <p>Improve conversion efficiency and discoverability across web and app touchpoints to increase ROI from existing traffic.</p>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">🤖 GEN AI Optimization (GEO)</h4>
    <div class="collapsible-content">
      <p>Optimize brand visibility and performance within AI-powered discovery environments and emerging search experiences.</p>
    </div>
  </div>

  <!-- LIFECYCLE -->
  <div class="card">
    <h3 style="border-bottom:2px solid var(--accent);padding-bottom:.5rem;">📧 Lifecycle Marketing</h3>

    <h4 class="collapsible" onclick="toggle(this)">📬 Email + SMS</h4>
    <div class="collapsible-content">
      <p>Increase LTV and retention through data-driven messaging, automation, and behavioral segmentation.</p>
    </div>
  </div>

  <!-- ANALYTICS -->
  <div class="card">
    <h3 style="border-bottom:2px solid var(--accent);padding-bottom:.5rem;">📊 Analytics</h3>

    <h4 class="collapsible" onclick="toggle(this)">📈 Analytics & Measurement</h4>
    <div class="collapsible-content">
      <p>Improve your tracking setup & tech stack. Start with a free audit and work together to take your analytics to the next level.</p>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">🧮 Media Mix Modeling (MMM)</h4>
    <div class="collapsible-content">
      <p>Quantify true channel impact and guide smarter budget allocation through advanced statistical modeling.</p>
    </div>
  </div>

  <!-- PARTNERSHIPS -->
  <div class="card">
    <h3 style="border-bottom:2px solid var(--accent);padding-bottom:.5rem;">🤝 Partnerships & Business Development</h3>
    <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:1rem;">How Tiger Tracks grows: our sales motion, who we sell to, and the partner ecosystem that drives our pipeline.</p>

    <h4 class="collapsible" onclick="toggle(this)">🎯 Who We Sell To</h4>
    <div class="collapsible-content">
      <div class="table-wrap"><table style="font-size:1.02rem;">
        <tr style="background:var(--accent-light);"><th>Tier</th><th>Monthly Ad Spend</th><th>Est. Monthly Fee</th><th>Brand Size</th></tr>
        <tr><td><strong>Tier 1</strong></td><td>$1M - $5M</td><td>$100K - $500K</td><td>Enterprise ($250M - $2B)</td></tr>
        <tr><td><strong>Tier 2</strong></td><td>$500K - $1M</td><td>$50K - $100K</td><td>Growth ($50M - $250M)</td></tr>
        <tr><td><strong>Tier 3</strong></td><td>$100K - $500K</td><td>$10K - $50K</td><td>Mid-Market ($10M - $50M)</td></tr>
        <tr><td><strong>Tier 4</strong></td><td>&lt;$100K</td><td>$3K - $10K</td><td>Emerging (&lt;$10M)</td></tr>
      </table></div>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">🔄 How We Sell (Sales Motion)</h4>
    <div class="collapsible-content">
      <div style="display:flex;flex-direction:column;gap:.4rem;">
        <div style="padding:.5rem .75rem;background:#f0fafa;border-radius:6px;font-size:1.02rem;border-left:3px solid var(--accent);color:#1A1A1A"><strong>1. Discovery</strong> - Understand brand goals, current spend, pain points, and decision-making process</div>
        <div style="padding:.5rem .75rem;background:#f0fafa;border-radius:6px;font-size:1.02rem;border-left:3px solid var(--accent);color:#1A1A1A"><strong>2. Audit</strong> - Build a comprehensive performance audit identifying gaps and growth levers</div>
        <div style="padding:.5rem .75rem;background:#f0fafa;border-radius:6px;font-size:1.02rem;border-left:3px solid var(--accent);color:#1A1A1A"><strong>3. Proposal</strong> - Present findings, strategy, and pricing; handle objections</div>
        <div style="padding:.5rem .75rem;background:#f0fafa;border-radius:6px;font-size:1.02rem;border-left:3px solid var(--accent);color:#1A1A1A"><strong>4. Close</strong> - Contract execution, clean handoff to Client Success / AM team</div>
        <div style="padding:.5rem .75rem;background:#f0fafa;border-radius:6px;font-size:1.02rem;border-left:3px solid var(--accent);color:#1A1A1A"><strong>5. Kickoff</strong> - SWAT channel, intake sheet, discovery recording, AM team briefed</div>
      </div>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">🌐 Referral Partner Ecosystem</h4>
    <div class="collapsible-content">
      <p style="font-size:1.02rem;margin-bottom:.5rem;">One of Tiger Tracks' most important growth levers. Referral-sourced opportunities produce higher quality prospects, shorter sales cycles, and stronger long-term partnerships.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.75rem;margin:.5rem 0;">
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;font-size:0.984rem;text-align:center;"><strong>PE/VC Investors</strong><br>Portfolio companies needing marketing scale</div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;font-size:0.984rem;text-align:center;"><strong>Strategic Agencies</strong><br>Non-performance marketing agencies</div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;font-size:0.984rem;text-align:center;"><strong>Consultants & Advisors</strong><br>Working with growth-stage brands</div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;font-size:0.984rem;text-align:center;"><strong>Fractional CMOs</strong><br>Advising multiple companies</div>
        <div style="background:#f0fafa;padding:.75rem;border-radius:8px;font-size:0.984rem;text-align:center;color:#1A1A1A"><strong>Tech Partners</strong><br>Serving ecommerce / marketing teams</div>
      </div>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">📏 Pipeline Rules & Standards</h4>
    <div class="collapsible-content">
      <ul style="font-size:1.02rem;padding-left:1.25rem;">
        <li><strong>No deal goes 7+ days without a touch</strong> - hard SOP rule</li>
        <li><strong>Same-day or 24-hour max responsiveness</strong> to all prospects</li>
        <li><strong>Every deal must have an owner and next step</strong> at all times</li>
        <li><strong>HubSpot is the single source of truth</strong> for all pipeline activity</li>
        <li><strong>Deals &lt;$30K:</strong> owned end-to-end by the assigned BD team member</li>
        <li><strong>Deals &gt;$30K:</strong> owned by senior BD + leadership on select deals</li>
        <li><strong>Audit and kickoff rigor is mandatory</strong> - zero friction for Ops/AM</li>
        <li><strong>Routing discipline is non-negotiable</strong></li>
      </ul>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">📊 Metrics That Matter</h4>
    <div class="collapsible-content">
      <div class="table-wrap"><table style="font-size:1.02rem;">
        <tr style="background:var(--accent-light);"><th>Metric</th><th>Target</th></tr>
        <tr><td>Net New MRR</td><td>$80K - $100K / month</td></tr>
        <tr><td>Brand Discovery Meetings</td><td>40 / month</td></tr>
        <tr><td>Audits Presented</td><td>20 / month</td></tr>
        <tr><td>Qualified Pipeline</td><td>$500K+</td></tr>
        <tr><td>Partner Meetings</td><td>8 / month</td></tr>
        <tr><td>Net New Referral Partners</td><td>5 / month</td></tr>
        <tr><td>Discovery-to-Audit Conversion</td><td>70%</td></tr>
        <tr><td>Audit-to-Close Conversion</td><td>70%</td></tr>
      </table></div>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">🏛️ Culture & Expectations</h4>
    <div class="collapsible-content">
      <ul style="font-size:1.02rem;padding-left:1.25rem;">
        <li><strong>We are not a vendor.</strong> We operate as an extension of our partners' teams, accountable to outcomes, not activity.</li>
        <li><strong>Professionalism is non-negotiable.</strong> Every interaction reflects on the brand.</li>
        <li><strong>Urgency without panic.</strong> Deals move forward daily with discipline, not chaos.</li>
        <li><strong>HubSpot is not optional.</strong> If it is not in HubSpot, it did not happen.</li>
        <li><strong>Own it completely.</strong> No half-ownership. If you touch a deal, you own the next step.</li>
        <li><strong>Protect trust.</strong> Partner and client trust is the most valuable asset we have.</li>
      </ul>
    </div>
  </div>
</div>

<!-- ===================== CULTURE ===================== -->
<div class="section" id="culture">
  <div class="section-header"><span class="emoji">🏛️</span><h2>Culture & Standards</h2></div>

  <div style="display:flex;gap:.5rem;margin:1rem 0;flex-wrap:wrap;">
    <button class="rv-tab active" data-cultab="standing" onclick="switchCultureTab('standing')">✅ Good Standing</button>
    <button class="rv-tab" data-cultab="feedback" onclick="switchCultureTab('feedback')">💬 Feedback Form</button>
  </div>

  <div id="cul-standing" class="cul-tab-content">
  <div class="card">
    <h3>✅ Good Standing Requirement, Bonus & Commission Eligibility</h3>
    <div class="callout red" style="margin-bottom:1rem;">
      <strong>Key takeaway:</strong> Eligibility for bonuses, commissions, and all incentive compensation requires being in <strong>good standing</strong> at the time compensation is earned and paid. It is not guaranteed.
    </div>

    <h4 class="collapsible open" onclick="toggle(this)">📋 What "Good Standing" Means</h4>
    <div class="collapsible-content show">
      <p>An employee is in good standing if they are:</p>
      <ul>
        <li><strong>Actively employed</strong> and not under notice of resignation or termination</li>
        <li><strong>Not subject to disciplinary action</strong>: PIPs, written warnings, or ongoing investigations</li>
        <li><strong>Compliant</strong> with all Company policies, procedures, and standards of conduct</li>
        <li><strong>Meeting role-specific operational expectations</strong>, including communication and availability</li>
      </ul>
    </div>

    <h4 class="collapsible open" onclick="toggle(this)">💬 Communication Standards</h4>
    <div class="collapsible-content show">
      <ul>
        <li>Maintain <strong>professional, timely, and respectful</strong> communication with clients, team members, and leadership</li>
        <li>Respond to messages within <strong>reasonable and role-appropriate timeframes</strong></li>
        <li>Notify stakeholders <strong>in advance</strong> of delays, absences, or availability changes</li>
      </ul>
    </div>

    <h4 class="collapsible open" onclick="toggle(this)">⏰ Working Hours & Availability</h4>
    <div class="collapsible-content show">
      <ul>
        <li>Be <strong>online, reachable, and actively working</strong> during established working hours (unless PTO is approved or alternative arrangements made)</li>
        <li>Attend required meetings and calls unless excused</li>
        <li>Maintain reliable access to required systems and communication tools</li>
      </ul>
    </div>

    <h4 class="collapsible open" onclick="toggle(this)">🏖️ PTO Compliance</h4>
    <div class="collapsible-content show">
      <ul>
        <li>Accurately request, record, and log all PTO per Company policy</li>
        <li>Receive approval <strong>prior to</strong> taking time off (except emergencies)</li>
        <li>Avoid misrepresentation of availability or working time</li>
      </ul>
      <div class="callout" style="margin-top:.5rem;">
        <strong>⚠️ Important:</strong> Failure to properly log PTO or misrepresenting working hours may result in loss of good standing.
      </div>
    </div>

    <h4 class="collapsible open" onclick="toggle(this)">📹 Video Presence & Calendar Requirements</h4>
    <div class="collapsible-content show">
      <p><strong>Camera on expected for:</strong></p>
      <ul>
        <li>Client-facing meetings</li>
        <li>Internal team meetings</li>
        <li>Training sessions and reviews</li>
      </ul>
      <p style="margin-top:.5rem;"><strong>Safeguards:</strong></p>
      <ul>
        <li>Video is <em>not</em> required outside of scheduled meetings</li>
        <li>One-off technical issues will be accommodated</li>
        <li>Reasonable accommodations available for medical, disability, or religious reasons, approved accommodations will <strong>not</strong> impact good standing</li>
      </ul>
    </div>

    <h4 class="collapsible open" onclick="toggle(this)">📊 Company Procedures & Logging</h4>
    <div class="collapsible-content show">
      <ul>
        <li>Follow established processes, tools, and documentation requirements</li>
        <li>Accurately log required activity (CRM updates, deal tracking, reporting)</li>
        <li>Comply with role-specific operational or compliance requirements</li>
      </ul>
    </div>

    <h4 class="collapsible open" onclick="toggle(this)">💰 Impact on Incentive Compensation</h4>
    <div class="collapsible-content show">
      <p>Failure to remain in good standing may result in:</p>
      <div style="display:flex;flex-direction:column;gap:.5rem;margin:.75rem 0;">
        <div style="display:flex;align-items:center;gap:.5rem;padding:.5rem .75rem;background:#0A1119;color:#FFFFFF;border-radius:6px;font-size:1.02rem;">
          <span style="font-size:1.32rem;">🚫</span> <strong>Ineligibility</strong> for current or future bonus/commission payouts
        </div>
        <div style="display:flex;align-items:center;gap:.5rem;padding:.5rem .75rem;background:#0A1119;color:#FFFFFF;border-radius:6px;font-size:1.02rem;">
          <span style="font-size:1.32rem;">📉</span> <strong>Reduction or forfeiture</strong> of incentive compensation, as permitted by law
        </div>
        <div style="display:flex;align-items:center;gap:.5rem;padding:.5rem .75rem;background:#0A1119;color:#FFFFFF;border-radius:6px;font-size:1.02rem;">
          <span style="font-size:1.32rem;">⏳</span> <strong>Delay of payout</strong> until good standing is restored, at Company discretion
        </div>
      </div>
    </div>

    <div style="margin-top:1rem;padding:.75rem 1rem;background:#0A1119;color:#FFFFFF;border-radius:12px;font-size:0.96rem;color:var(--text-light);">
      <strong>Note:</strong> This policy does not alter at-will employment status. All incentive compensation decisions are made in compliance with applicable federal, state, and local laws. Participation in any bonus or commission plan constitutes acknowledgment and acceptance of this Good Standing Requirement.
    </div>
  </div>
  </div><!-- end cul-standing -->

  <div id="cul-feedback" class="cul-tab-content" style="display:none;">
  <h2 class="section-title">💬 Feedback Form</h2>
  <p style="color:var(--text-light);margin-bottom:1.5rem;">Share constructive feedback with your teammates anonymously. You choose where it goes: directly to them, to their manager, or both. All feedback is stored locally and cannot be traced back to you.</p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;max-width:100%;margin:0 auto;border:3px solid #229FA1;border-radius:12px;padding:1rem;">
    <!-- LEFT: Submit Feedback -->
    <div class="card" style="padding:1.5rem;">
      <h3 style="margin-bottom:1rem;font-size:1.26rem;">📝 Give Feedback</h3>

      <div style="margin-bottom:1rem;">
        <label style="font-size:0.984rem;font-weight:600;display:block;margin-bottom:.3rem;">Who is this feedback for?</label>
        <select id="fbRecipient" onchange="updateFbRecipientInfo()" style="width:100%;padding:.75rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;">
          <option value="">-- Select team member --</option>
        </select>
        <div id="fbRecipientInfo" style="font-size:0.9rem;color:var(--text-light);margin-top:.25rem;"></div>
      </div>

      <div style="margin-bottom:1rem;">
        <label style="font-size:0.984rem;font-weight:600;display:block;margin-bottom:.3rem;">Your identity</label>
        <div style="display:flex;gap:.5rem;margin-bottom:.4rem;">
          <label style="font-size:1.02rem;display:flex;align-items:center;gap:.4rem;cursor:pointer;"><input type="radio" name="fbIdentity" value="anonymous" checked onchange="document.getElementById('fbSenderWrap').style.display='none'"> 🕶️ Anonymous</label>
          <label style="font-size:1.02rem;display:flex;align-items:center;gap:.4rem;cursor:pointer;"><input type="radio" name="fbIdentity" value="named" onchange="document.getElementById('fbSenderWrap').style.display=''"> 👤 Include my name</label>
        </div>
        <div id="fbSenderWrap" style="display:none;">
          <select id="fbSender" style="width:100%;padding:.75rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;">
            <option value="">-- Select your name --</option>
          </select>
        </div>
      </div>

      <div style="margin-bottom:1rem;">
        <label style="font-size:0.984rem;font-weight:600;display:block;margin-bottom:.3rem;">Feedback type</label>
        <select id="fbType" style="width:100%;padding:.75rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;">
          <option value="praise">🌟 Praise / Recognition</option>
          <option value="constructive">🔧 Constructive Feedback</option>
          <option value="suggestion">💡 Suggestion</option>
          <option value="concern">⚠️ Concern</option>
        </select>
      </div>

      <div style="margin-bottom:1rem;">
        <label style="font-size:0.984rem;font-weight:600;display:block;margin-bottom:.3rem;">Your feedback</label>
        <textarea id="fbMessage" rows="8" placeholder="Be specific and constructive. What did you observe? What impact did it have? What would you suggest?" style="width:100%;padding:.75rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;resize:vertical;font-family:inherit;"></textarea>
      </div>

      <div style="margin-bottom:1.25rem;">
        <label style="font-size:0.984rem;font-weight:600;display:block;margin-bottom:.5rem;">Where should this be sent?</label>
        <div style="display:flex;flex-direction:column;gap:.4rem;">
          <label style="font-size:1.02rem;display:flex;align-items:center;gap:.5rem;cursor:pointer;">
            <input type="radio" name="fbDelivery" value="direct" checked> 📩 Directly to <span id="fbDirectLabel">them</span>
          </label>
          <label style="font-size:1.02rem;display:flex;align-items:center;gap:.5rem;cursor:pointer;">
            <input type="radio" name="fbDelivery" value="manager"> 👔 To their manager (<span id="fbManagerLabel">--</span>)
          </label>
          <label style="font-size:1.02rem;display:flex;align-items:center;gap:.5rem;cursor:pointer;">
            <input type="radio" name="fbDelivery" value="both"> 📩👔 Both the person and their manager
          </label>
        </div>
      </div>

      <button class="btn" onclick="submitFeedback()" style="width:100%;background:var(--accent);color:#fff;padding:.65rem;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:1.08rem;">Submit Feedback</button>
      <div id="fbSuccess" style="display:none;margin-top:.75rem;padding:.6rem;background:#0A1119;color:#FFFFFF;color:#059669;border-radius:6px;font-size:1.02rem;text-align:center;font-weight:600;">✅ Feedback submitted anonymously!</div>
    </div>

    <!-- RIGHT: View Feedback -->
    <div class="card" style="padding:1.5rem;">
      <h3 style="margin-bottom:1rem;font-size:1.26rem;">📬 View Feedback</h3>
      <div style="margin-bottom:1rem;">
        <label style="font-size:0.984rem;font-weight:600;display:block;margin-bottom:.3rem;">I am...</label>
        <select id="fbViewer" onchange="renderFeedbackInbox()" style="width:100%;padding:.75rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;">
          <option value="">-- Select your name --</option>
        </select>
      </div>
      <div class="tab-bar" style="margin-bottom:.75rem;">
        <div class="tab active" onclick="switchFbView('mine',this)" id="fbViewMine">For Me <span id="fbCountMine" style="font-size:0.84rem;opacity:.7;"></span></div>
        <div class="tab" onclick="switchFbView('team',this)" id="fbViewTeam">My Reports <span id="fbCountTeam" style="font-size:0.84rem;opacity:.7;"></span></div>
      </div>
      <div id="fbInbox" style="max-height:400px;overflow-y:auto;"></div>
    </div>
  </div>
  </div><!-- end cul-feedback -->
</div>

<!-- ===================== TRAINING (HIDDEN) ===================== -->
<div class="section" id="training" style="display:none !important;">
  <div class="section-header"><span class="emoji">🎓</span><h2>Micro-Training Modules</h2></div>

  <!-- Module 1 -->
  <div class="card">
    <h3>Module 1: Giving Feedback Quickly & Kindly</h3>

    <h4>The Tiger Tracks 3-Step Feedback Model</h4>
    <ol class="steps">
      <li><strong>Observation</strong>: State what happened, factually.<br><em>"Yesterday's performance update didn't include pacing context."</em></li>
      <li><strong>Impact</strong>: Explain why it matters.<br><em>"That made it hard for the client to understand what the numbers meant."</em></li>
      <li><strong>Next Step</strong>: Give the future behavior you want.<br><em>"Next time, add a 1–2 sentence interpretation with each key metric."</em></li>
    </ol>

    <h4>Tone & Delivery Tips</h4>
    <ul>
      <li>Keep voice calm + warm</li>
      <li>Assume positive intent</li>
      <li>Don't apologize for giving feedback</li>
      <li>Be direct but human</li>
      <li>Give one note at a time</li>
      <li>Praise publicly, course-correct privately</li>
    </ul>

    <h4>Phrases That Work</h4>
    <ul>
      <li>"One thing that would level this up is…"</li>
      <li>"A small adjustment will make a big difference…"</li>
      <li>"To help you be successful here…"</li>
    </ul>

    <h4>10 Ready-to-Use Feedback Scripts</h4>
    <div class="table-wrap">
      <table>
        <tr><th>Topic</th><th>Script</th></tr>
        <tr><td>Communication</td><td>"Your updates are clear, but they're coming in later than we need. Moving forward, send them by 10am so the team can adjust plans."</td></tr>
        <tr><td>Quality</td><td>"The deliverable was 80% strong, but we need the data validated more thoroughly. Let's build a quick checklist you can follow before sending."</td></tr>
        <tr><td>Proactiveness</td><td>"If you see something that could impact revenue or performance, flag it immediately. Customer success is the bar."</td></tr>
        <tr><td>Ownership</td><td>"When something slips, I want to hear from you before the client does."</td></tr>
        <tr><td>Prioritization</td><td>"When many tasks hit at once, pick your top 2 and communicate them. I'll help with the rest."</td></tr>
        <tr><td>Resourcefulness</td><td>"Before coming to me, take 10 minutes to try solving it yourself. If still unclear, come to me with two possible options."</td></tr>
        <tr><td>Delegation</td><td>"When passing a task to the team, make sure you state ownership, deadline, and the expected outcome."</td></tr>
        <tr><td>Meeting Readiness</td><td>"Your client calls are solid. Next step is arriving with a 1-page agenda and expected outcomes."</td></tr>
        <tr><td>Accountability</td><td>"If we commit to a date, I need you to either deliver or flag early that it won't happen."</td></tr>
        <tr><td>Emotional Regulation</td><td>"When things get stressful, take a breath, assess the facts, and then respond with clarity. You set the tone."</td></tr>
      </table>
    </div>
  </div>

  <!-- Module 2 -->
  <div class="card">
    <h3>Module 2: Delegation Without Micromanaging</h3>
    <p>Your job as a manager is not to do more, it's to elevate the team.</p>
    <div class="callout">
      <strong>Micromanaging</strong> happens when the outcome isn't clear.<br>
      <strong>Laissez-faire</strong> happens when ownership isn't clear.<br>
      We want the middle: <strong>structured autonomy.</strong>
    </div>
    <h4>Common Delegation Mistakes</h4>
    <ul>
      <li>Over-explaining → micromanaging</li>
      <li>Under-explaining → confusion</li>
      <li>Assuming someone knows your standard</li>
      <li>Assigning tasks without context</li>
      <li>Delegating too much at once</li>
      <li>Not aligning on "done", <strong>Fix: define DONE.</strong></li>
    </ul>
  </div>

  <!-- Module 3 -->
  <div class="card">
    <h3>Module 3: Prioritization & Protecting Your Team</h3>
    <h4>The Priority Pyramid</h4>
    <ol class="steps">
      <li><strong>Level 1: Client commitments</strong>: Anything promised with a date → non-negotiable</li>
      <li><strong>Level 2: Account health</strong>: Pacing, performance, reporting</li>
      <li><strong>Level 3: Internal tasks</strong>: Decks, analysis, documentation</li>
      <li><strong>Level 4: Nice-to-haves</strong>: Stretch projects, optional improvements</li>
    </ol>
    <h4>When everything feels urgent, rank by:</h4>
    <ul><li>Impact → Effort → Deadlines → Risk</li></ul>
    <h4>Manager's Weekly Questions</h4>
    <ul>
      <li>"What's your #1 priority?"</li>
      <li>"What deadlines are at risk?"</li>
      <li>"What can we drop/defer?"</li>
      <li>"Do you have capacity?"</li>
    </ul>
    <p><em>Normalize renegotiating deadlines early. Managers must model this.</em></p>
  </div>

  <!-- Module 4 -->
  <div class="card">
    <h3>Module 4: Running Clean, Effective 1:1s</h3>
    <p>1:1s are the most important tool you have as a manager. They are not status meetings, they're coaching conversations.</p>
    <div class="table-wrap">
      <table>
        <tr><th>Minutes</th><th>Focus</th></tr>
        <tr><td>1–3</td><td><strong>Wins & Progress</strong>: "What went well this week?"</td></tr>
        <tr><td>4–7</td><td><strong>Priorities & Workload</strong>: #1 priority, deadlines at risk, capacity %</td></tr>
        <tr><td>8–11</td><td><strong>Coaching Moment</strong>: One clear piece of feedback (Observation → Impact → Next Step)</td></tr>
        <tr><td>12–14</td><td><strong>Support Needed</strong>: "How can I support you? What blockers?"</td></tr>
        <tr><td>15</td><td><strong>Alignment</strong>: Summarize top 1–2 priorities</td></tr>
      </table>
    </div>
    <h4>What NOT to Do</h4>
    <ul>
      <li>Turn it into a status dump</li>
      <li>Skip coaching</li>
      <li>Make the meeting all about problems</li>
      <li>Reschedule it weekly</li>
      <li>Let them walk away unclear</li>
    </ul>
  </div>
</div>

<!-- ===================== ORG ===================== -->
<div class="section" id="org" style="width:100%;max-width:none;overflow:visible;">
  <div class="section-header"><span class="emoji">🏗&#xFE0F;</span><h2>Org Chart</h2></div>
  <div style="background:#0A1119;border-radius:16px;border:1px solid rgba(34,159,161,0.15);padding:1.5rem;overflow:visible;margin-bottom:1.5rem;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2149 580" preserveAspectRatio="xMidYMid meet" style="width:100%;display:block;">
<rect width="2149" height="580" rx="16" fill="#0A1119"/>
<defs>
  <linearGradient id="sg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="transparent"/>
    <stop offset="20%" stop-color="#229FA1" stop-opacity="0.5"/>
    <stop offset="80%" stop-color="#229FA1" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="transparent"/>
  </linearGradient>
</defs>
<rect x="40" y="70" width="2069" height="1" fill="url(#sg)"/>
<line x1="725" y1="126" x2="725" y2="139" stroke="#229FA1" stroke-width="2"/>
<line x1="725" y1="139" x2="725" y2="139" stroke="#229FA1" stroke-width="2"/>
<line x1="725" y1="139" x2="725" y2="152" stroke="#229FA1" stroke-width="2"/>
<line x1="725" y1="198" x2="725" y2="211" stroke="#229FA1" stroke-width="2"/>
<line x1="281" y1="211" x2="1170" y2="211" stroke="#229FA1" stroke-width="2"/>
<line x1="281" y1="211" x2="281" y2="224" stroke="#229FA1" stroke-width="2"/>
<line x1="740" y1="211" x2="740" y2="224" stroke="#229FA1" stroke-width="2"/>
<line x1="1170" y1="211" x2="1170" y2="224" stroke="#229FA1" stroke-width="2"/>
<line x1="281" y1="270" x2="281" y2="296" stroke="#229FA1" stroke-width="2"/>
<line x1="281" y1="342" x2="281" y2="391" stroke="#229FA1" stroke-width="2"/>
<line x1="96" y1="391" x2="281" y2="391" stroke="#229FA1" stroke-width="2"/>
<line x1="96" y1="391" x2="96" y2="440" stroke="#229FA1" stroke-width="2"/>
<line x1="281" y1="391" x2="281" y2="440" stroke="#229FA1" stroke-width="2"/>
<line x1="281" y1="391" x2="466" y2="391" stroke="#229FA1" stroke-width="2"/>
<line x1="466" y1="391" x2="466" y2="440" stroke="#229FA1" stroke-width="2"/>
<line x1="740" y1="270" x2="740" y2="283" stroke="#229FA1" stroke-width="2"/>
<line x1="640" y1="283" x2="840" y2="283" stroke="#229FA1" stroke-width="2"/>
<line x1="640" y1="283" x2="640" y2="296" stroke="#229FA1" stroke-width="2"/>
<line x1="840" y1="283" x2="840" y2="296" stroke="#229FA1" stroke-width="2"/>
<line x1="640" y1="342" x2="640" y2="368" stroke="#229FA1" stroke-width="2"/>
<line x1="840" y1="342" x2="840" y2="368" stroke="#229FA1" stroke-width="2"/>
<line x1="640" y1="414" x2="640" y2="440" stroke="#229FA1" stroke-width="2"/>
<line x1="640" y1="486" x2="640" y2="512" stroke="#229FA1" stroke-width="2"/>
<line x1="1170" y1="270" x2="1170" y2="319" stroke="#229FA1" stroke-width="2"/>
<line x1="1075" y1="283" x2="1170" y2="283" stroke="#229FA1" stroke-width="2"/>
<line x1="1075" y1="283" x2="1075" y2="296" stroke="#229FA1" stroke-width="2"/>
<line x1="1170" y1="319" x2="1265" y2="319" stroke="#229FA1" stroke-width="2"/>
<line x1="1265" y1="319" x2="1265" y2="368" stroke="#229FA1" stroke-width="2"/>
<line x1="1265" y1="414" x2="1265" y2="427" stroke="#229FA1" stroke-width="2"/>
<line x1="1175" y1="427" x2="1355" y2="427" stroke="#229FA1" stroke-width="2"/>
<line x1="1175" y1="427" x2="1175" y2="440" stroke="#229FA1" stroke-width="2"/>
<line x1="1355" y1="427" x2="1355" y2="440" stroke="#229FA1" stroke-width="2"/>
<line x1="1175" y1="486" x2="1175" y2="512" stroke="#229FA1" stroke-width="2"/>
<line x1="1805" y1="126" x2="1805" y2="139" stroke="#229FA1" stroke-width="2"/>
<line x1="1746" y1="139" x2="1805" y2="139" stroke="#229FA1" stroke-width="2"/>
<line x1="1746" y1="139" x2="1746" y2="152" stroke="#229FA1" stroke-width="2"/>
<line x1="1746" y1="198" x2="1746" y2="211" stroke="#229FA1" stroke-width="2"/>
<line x1="1646" y1="211" x2="1846" y2="211" stroke="#229FA1" stroke-width="2"/>
<line x1="1646" y1="211" x2="1646" y2="224" stroke="#229FA1" stroke-width="2"/>
<line x1="1846" y1="211" x2="1846" y2="224" stroke="#229FA1" stroke-width="2"/>
<line x1="1646" y1="270" x2="1646" y2="296" stroke="#229FA1" stroke-width="2"/>
<line x1="1846" y1="270" x2="1846" y2="296" stroke="#229FA1" stroke-width="2"/>
<rect x="50" y="14" width="265" height="46" rx="7" fill="#152426" stroke="rgba(34,159,161,0.45)" stroke-width="1.5"/>
<rect x="50" y="14" width="265" height="3" rx="1.5" fill="#229FA1"/>
<text x="63" y="32" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Elizabeth Ogilvie</text>
<text x="63" y="47" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#5ED4C8">People Operations</text>
<rect x="899" y="14" width="265" height="46" rx="7" fill="#152426" stroke="rgba(34,159,161,0.45)" stroke-width="1.5"/>
<rect x="899" y="14" width="265" height="3" rx="1.5" fill="#229FA1"/>
<text x="912" y="32" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Cliff Simmons</text>
<text x="912" y="47" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#5ED4C8">Co-Founder</text>
<rect x="1501" y="14" width="265" height="46" rx="7" fill="#152426" stroke="rgba(34,159,161,0.45)" stroke-width="1.5"/>
<rect x="1501" y="14" width="265" height="3" rx="1.5" fill="#229FA1"/>
<text x="1514" y="32" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Henry Kittle</text>
<text x="1514" y="47" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#5ED4C8">Co-Founder</text>
<rect x="545" y="84" width="360" height="42" rx="8" fill="#152426" stroke="rgba(34,159,161,0.45)" stroke-width="1.5"/>
<rect x="545" y="84" width="360" height="3" rx="1.5" fill="#229FA1"/>
<text x="725" y="110" text-anchor="middle" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Account Management</text>
<rect x="1665" y="84" width="280" height="42" rx="8" fill="#152426" stroke="rgba(34,159,161,0.45)" stroke-width="1.5"/>
<rect x="1665" y="84" width="280" height="3" rx="1.5" fill="#229FA1"/>
<text x="1805" y="110" text-anchor="middle" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Partnerships</text>
<rect x="638" y="152" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="638" y="156" width="3" height="38" rx="2" fill="#1F807E"/>
<text x="651" y="170" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Rachael Scharett</text>
<text x="651" y="185" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#5EC4BF">Sr. Director of Client Success</text>
<rect x="1659" y="152" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="1659" y="156" width="3" height="38" rx="2" fill="#229FA1"/>
<text x="1672" y="170" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Ashley Kaika</text>
<text x="1672" y="185" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#229FA1">VP of Partnerships</text>
<rect x="194" y="224" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="194" y="228" width="3" height="38" rx="2" fill="#1A7477"/>
<text x="207" y="242" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Riley Abercrombie</text>
<text x="207" y="257" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#7DD4D0">Associate Director</text>
<rect x="653" y="224" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="653" y="228" width="3" height="38" rx="2" fill="#1A7477"/>
<text x="666" y="242" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Hannah Price</text>
<text x="666" y="257" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#7DD4D0">Associate Director</text>
<rect x="1083" y="224" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="1083" y="228" width="3" height="38" rx="2" fill="#1A7477"/>
<text x="1096" y="242" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Charlotte Pohl</text>
<text x="1096" y="257" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#7DD4D0">Associate Director</text>
<rect x="1559" y="224" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="1559" y="228" width="3" height="38" rx="2" fill="#1A7477"/>
<text x="1572" y="242" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Kersten Kruse</text>
<text x="1572" y="257" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#7DD4D0">Dir. Client Success</text>
<rect x="1759" y="224" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="1759" y="228" width="3" height="38" rx="2" fill="#1A7477"/>
<text x="1772" y="242" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Alex Blumberg</text>
<text x="1772" y="257" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#7DD4D0">Head of Partnerships</text>
<rect x="1949" y="224" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="1949" y="228" width="3" height="38" rx="2" fill="rgba(255,255,255,0.15)"/>
<text x="1962" y="242" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Camryn Hershman</text>
<text x="1962" y="257" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Executive Assistant</text>
<rect x="194" y="296" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="194" y="300" width="3" height="38" rx="2" fill="#155E5B"/>
<text x="207" y="314" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Shelby Nations</text>
<text x="207" y="329" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Sr. Account Manager</text>
<rect x="553" y="296" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="553" y="300" width="3" height="38" rx="2" fill="#155E5B"/>
<text x="566" y="314" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Mary McCambridge</text>
<text x="566" y="329" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Sr. Account Manager</text>
<rect x="753" y="296" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="753" y="300" width="3" height="38" rx="2" fill="#155E5B"/>
<text x="766" y="314" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Will Sokol</text>
<text x="766" y="329" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Sr. Account Manager</text>
<rect x="988" y="296" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="988" y="300" width="3" height="38" rx="2" fill="#155E5B"/>
<text x="1001" y="314" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Allison Long</text>
<text x="1001" y="329" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Sr. Account Manager</text>
<rect x="1559" y="296" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="1559" y="300" width="3" height="38" rx="2" fill="rgba(255,255,255,0.15)"/>
<text x="1572" y="314" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Anirudh Venkat</text>
<text x="1572" y="329" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Strategist</text>
<rect x="1759" y="296" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="1759" y="300" width="3" height="38" rx="2" fill="#1A7477"/>
<text x="1772" y="314" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Steven Jatich</text>
<text x="1772" y="329" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#7DD4D0">Dir. Partnerships</text>
<rect x="553" y="368" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="553" y="372" width="3" height="38" rx="2" fill="#155E5B"/>
<text x="566" y="386" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Gretchen Hess</text>
<text x="566" y="401" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Manager</text>
<rect x="753" y="368" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="753" y="372" width="3" height="38" rx="2" fill="#155E5B"/>
<text x="766" y="386" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Megan Klein</text>
<text x="766" y="401" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Manager</text>
<rect x="1178" y="368" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="1178" y="372" width="3" height="38" rx="2" fill="#155E5B"/>
<text x="1191" y="386" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Kiyana Saidi-Nejad</text>
<text x="1191" y="401" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Manager</text>
<rect x="9" y="440" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="9" y="444" width="3" height="38" rx="2" fill="rgba(255,255,255,0.15)"/>
<text x="22" y="458" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Seth McDaniel</text>
<text x="22" y="473" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Strategist</text>
<rect x="194" y="440" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="194" y="444" width="3" height="38" rx="2" fill="rgba(255,255,255,0.15)"/>
<text x="207" y="458" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Megan Brenneke</text>
<text x="207" y="473" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Strategist</text>
<rect x="379" y="440" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="379" y="444" width="3" height="38" rx="2" fill="rgba(255,255,255,0.15)"/>
<text x="392" y="458" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Owen Phipps</text>
<text x="392" y="473" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Strategist</text>
<rect x="553" y="440" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="553" y="444" width="3" height="38" rx="2" fill="rgba(255,255,255,0.15)"/>
<text x="566" y="458" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Daren Kalkoffen</text>
<text x="566" y="473" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Strategist</text>
<rect x="1088" y="440" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="1088" y="444" width="3" height="38" rx="2" fill="rgba(255,255,255,0.15)"/>
<text x="1101" y="458" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Billy Bevevino</text>
<text x="1101" y="473" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Strategist</text>
<rect x="1268" y="440" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="1268" y="444" width="3" height="38" rx="2" fill="rgba(255,255,255,0.15)"/>
<text x="1281" y="458" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Tate Dewey</text>
<text x="1281" y="473" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Strategist</text>
<rect x="553" y="512" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="553" y="516" width="3" height="38" rx="2" fill="rgba(255,255,255,0.15)"/>
<text x="566" y="530" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Evin Leclerc</text>
<text x="566" y="545" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Coordinator</text>
<rect x="1088" y="512" width="175" height="46" rx="7" fill="#1B2126" stroke="rgba(34,159,161,0.18)" stroke-width="1"/>
<rect x="1088" y="516" width="3" height="38" rx="2" fill="rgba(255,255,255,0.15)"/>
<text x="1101" y="530" font-family="DM Serif Display,Georgia,serif" font-size="15" fill="#FFFFFF">Sanad Shuman</text>
<text x="1101" y="545" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#9E9E9E">Account Coordinator</text>
    </svg>
  </div>

  <!-- Problem-Solving Pyramid (moved from Culture) -->
  <div id="org-pyramid" style="margin-top:2rem;">

  <div class="card">
    <h3>🔺 The Problem-Solving Pyramid</h3>
    <p>At Tiger Tracks, how you surface problems matters just as much as spotting them. We expect every team member to climb the pyramid, don't just flag issues, bring solutions.</p>

    <!-- Visual Pyramid -->
    <div style="max-width:550px;margin:1.5rem auto;position:relative;">
      <div style="display:flex;flex-direction:column;align-items:center;gap:0;">
        <!-- Level 5 -->
        <div style="width:20%;background:linear-gradient(135deg,#229FA1,#1A7477);color:#fff;text-align:center;padding:.75rem .5rem;clip-path:polygon(50% 0%,100% 100%,0% 100%);min-height:70px;display:flex;align-items:center;justify-content:center;flex-direction:column;">
          <strong style="font-size:1.8rem;">5</strong>
          <span style="font-size:0.78rem;font-weight:600;">MOST HELPFUL</span>
        </div>
        <!-- Level 4 -->
        <div style="width:40%;background:#1F807E;color:#FFFFFF;text-align:center;padding:.6rem .5rem;margin-top:-1px;">
          <strong style="font-size:1.5rem;">4</strong>
        </div>
        <!-- Level 3 -->
        <div style="width:60%;background:#229FA1;color:#FFFFFF;text-align:center;padding:.6rem .5rem;margin-top:-1px;">
          <strong style="font-size:1.5rem;">3</strong>
        </div>
        <!-- Level 2 -->
        <div style="width:80%;background:#9E9E9E;color:#1A1A1A;text-align:center;padding:.6rem .5rem;margin-top:-1px;">
          <strong style="font-size:1.5rem;">2</strong>
        </div>
        <!-- Level 1 -->
        <div style="width:100%;background:#0A1119;color:#FFFFFF;text-align:center;padding:.6rem .5rem;margin-top:-1px;border-radius:0 0 8px 8px;">
          <strong style="font-size:1.5rem;">1</strong>
          <span style="font-size:0.78rem;font-weight:600;display:block;">LEAST HELPFUL</span>
        </div>
      </div>
    </div>

    <!-- Level descriptions -->
    <div style="display:flex;flex-direction:column;gap:1rem;margin-top:1.5rem;">

      <div style="display:flex;gap:1rem;align-items:start;">
        <div style="min-width:36px;height:36px;background:#0A1119;color:#FFFFFF;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.2rem;">1</div>
        <div>
          <p style="margin:0;font-weight:700;color:var(--danger);">"There is a problem." Then you walk away.</p>
          <p style="margin:.25rem 0 0;font-size:1.02rem;color:var(--text-light);">You flag it and leave someone else to deal with it. This adds work to your manager's plate without contributing anything.</p>
          <div style="background:#F4F1EB;color:#1A1A1A;padding:.6rem .8rem;border-radius:6px;margin-top:.5rem;font-size:1.02rem;border-left:3px solid var(--danger);">
            <strong>🚫 TT Example:</strong> <em>"Hey, the client's ROAS dropped."</em>: No context, no investigation, no ownership.
          </div>
        </div>
      </div>

      <div style="display:flex;gap:1rem;align-items:start;">
        <div style="min-width:36px;height:36px;background:#9E9E9E;color:#1A1A1A;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.2rem;">2</div>
        <div>
          <p style="margin:0;font-weight:700;color:var(--warning);">"There is a problem, and I've found some causes."</p>
          <p style="margin:.25rem 0 0;font-size:1.02rem;color:var(--text-light);">You've started digging but stopped short of solutions. Better than Level 1, but still leaves the heavy lifting to someone else.</p>
          <div style="background:#1B2126;color:#FFFFFF;padding:.6rem .8rem;border-radius:6px;margin-top:.5rem;font-size:1.02rem;border-left:3px solid var(--warning);">
            <strong>⚠️ TT Example:</strong> <em>"Client ROAS dropped 30% this week. I think it's because CPCs spiked on the brand campaigns and the new audience targeting isn't converting."</em>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:1rem;align-items:start;">
        <div style="min-width:36px;height:36px;background:#229FA1;color:#FFFFFF;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.2rem;">3</div>
        <div>
          <p style="margin:0;font-weight:700;color:var(--accent);">"Here's the problem, here are some possible causes, and here are some possible solutions."</p>
          <p style="margin:.25rem 0 0;font-size:1.02rem;color:var(--text-light);">Now you're contributing real value. You've diagnosed and are offering paths forward.</p>
          <div style="background:#1A7477;color:#FFFFFF;padding:.6rem .8rem;border-radius:6px;margin-top:.5rem;font-size:1.02rem;border-left:3px solid var(--accent);">
            <strong>✅ TT Example:</strong> <em>"Client ROAS dropped 30%. CPCs spiked on brand + new audiences aren't converting. We could: (A) pause the underperforming audiences and reallocate budget, (B) tighten keyword match types on brand, or (C) A/B test new creative on the prospecting campaigns."</em>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:1rem;align-items:start;">
        <div style="min-width:36px;height:36px;background:#1F807E;color:#FFFFFF;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.2rem;">4</div>
        <div>
          <p style="margin:0;font-weight:700;color:#1F807E;">"Here's the problem, what I think caused it, possible solutions, and here's the one I recommend."</p>
          <p style="margin:.25rem 0 0;font-size:1.02rem;color:var(--text-light);">You've done the analysis AND formed a recommendation. Your manager just needs to approve or adjust.</p>
          <div style="background:#1A7477;color:#FFFFFF;padding:.6rem .8rem;border-radius:6px;margin-top:.5rem;font-size:1.02rem;border-left:3px solid #1F807E;">
            <strong>💪 TT Example:</strong> <em>"Client ROAS dropped 30%, CPCs spiked on brand and new audiences aren't converting. I recommend we pause the 3 lowest-performing audiences immediately and shift that budget to our top-performing lookalikes. I'll also queue new creative variants for next week. Can I go ahead?"</em>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:1rem;align-items:start;">
        <div style="min-width:36px;height:36px;background:linear-gradient(135deg,#229FA1,#1A7477);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.2rem;">5</div>
        <div>
          <p style="margin:0;font-weight:700;color:#1A7477;">"I identified a problem, figured out the cause, researched how to fix it, and I fixed it. Just keeping you in the loop."</p>
          <p style="margin:.25rem 0 0;font-size:1.02rem;color:var(--text-light);">Full ownership. You solved it and informed your manager after the fact. This is what senior operators do.</p>
          <div style="background:#1A7477;color:#FFFFFF;padding:.6rem .8rem;border-radius:6px;margin-top:.5rem;font-size:1.02rem;border-left:3px solid #1A7477;">
            <strong>🏆 TT Example:</strong> <em>"Heads up, client ROAS dipped 30% yesterday. CPCs spiked on brand from a competitor bidding on our terms. I already negated the competitor terms, paused the 3 weakest audiences, reallocated $2K to top-performing lookalikes, and submitted new creative. ROAS is already recovering. Client update going out at 3pm."</em>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="card">
    <h3>Why This Matters at Tiger Tracks</h3>
    <div class="callout green">
      <strong>Our clients pay us to be the experts.</strong> They don't want to hear "there's a problem", they want to hear "we spotted it, we fixed it, here's what's next." The pyramid isn't just internal culture, it's how we deliver client value.
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-top:1rem;">
      <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
        <h4 style="margin:0 0 .35rem;font-size:1.08rem;">📈 For Account Teams</h4>
        <p style="margin:0;font-size:1.02rem;">When performance shifts, don't wait for your manager to ask. Investigate, form a POV, and act. Client QBRs should showcase Level 4-5 thinking.</p>
      </div>
      <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
        <h4 style="margin:0 0 .35rem;font-size:1.08rem;">🤝 For Managers</h4>
        <p style="margin:0;font-size:1.02rem;">Coach your reports up the pyramid. When someone comes to you at Level 1-2, ask: <em>"What do you think we should do?"</em> Push them to Level 3+.</p>
      </div>
      <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
        <h4 style="margin:0 0 .35rem;font-size:1.08rem;">🚀 For Career Growth</h4>
        <p style="margin:0;font-size:1.02rem;">Consistently operating at Level 4-5 is one of the strongest signals for promotion readiness. It proves you can own outcomes, not just tasks.</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>🎯 More Real-World Examples</h3>
    <div class="table-wrap">
      <table>
        <tr><th>Scenario</th><th>Level 1-2 ❌</th><th>Level 4-5 ✅</th></tr>
        <tr>
          <td><strong>Client churn risk</strong></td>
          <td>"The client seems unhappy."</td>
          <td>"Client expressed frustration about reporting cadence. I've restructured their dashboard, moved to weekly automated reports, and scheduled a realignment call for Thursday. Sharing the updated report template with you for review."</td>
        </tr>
        <tr>
          <td><strong>Campaign launch delay</strong></td>
          <td>"Creative assets aren't ready."</td>
          <td>"Creative is 2 days behind. I've pulled 3 proven ad variants from similar accounts as backups, briefed the design team on a rush timeline, and adjusted the launch plan to Phase 1 (proven creative Day 1) → Phase 2 (new creative Day 3). Client is aligned."</td>
        </tr>
        <tr>
          <td><strong>Budget pacing issue</strong></td>
          <td>"We're overspending on this account."</td>
          <td>"Account is 15% over pace for the month. I've already pulled back daily budgets on the 2 campaigns driving the overspend, set automated rules to cap spend, and sent the client a pacing update with a recovery plan for the remaining 10 days."</td>
        </tr>
        <tr>
          <td><strong>New platform request</strong></td>
          <td>"The client wants to try TikTok."</td>
          <td>"Client asked about TikTok. I researched their vertical's performance benchmarks, drafted a test-and-learn proposal with $5K budget, identified 3 competitor examples, and have a media plan ready for your review before I present to the client."</td>
        </tr>
      </table>
    </div>
  </div>

  <div class="card">
    <h3>📏 Self-Check: Where Do You Typically Operate?</h3>
    <p>Be honest with yourself. Think about the last 3 times you brought a problem to your manager.</p>
    <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin:1rem 0;">
      <div style="flex:1;min-width:140px;padding:1rem;background:#0A1119;color:#FFFFFF;border-radius:12px;text-align:center;border:2px solid transparent;cursor:pointer;" onclick="this.style.borderColor=this.style.borderColor?'':'var(--danger)'">
        <div style="font-size:1.8rem;font-weight:800;">1-2</div>
        <div style="font-size:0.9rem;font-weight:600;">Problem flagger</div>
        <div style="font-size:0.84rem;color:var(--text-light);margin-top:.25rem;">Time to level up</div>
      </div>
      <div style="flex:1;min-width:140px;padding:1rem;background:#0A1119;color:#FFFFFF;border-radius:12px;text-align:center;border:2px solid transparent;cursor:pointer;" onclick="this.style.borderColor=this.style.borderColor?'':'var(--warning)'">
        <div style="font-size:1.8rem;font-weight:800;">3</div>
        <div style="font-size:0.9rem;font-weight:600;">Problem analyzer</div>
        <div style="font-size:0.84rem;color:var(--text-light);margin-top:.25rem;">Good, now recommend</div>
      </div>
      <div style="flex:1;min-width:140px;padding:1rem;background:#0A1119;color:#FFFFFF;border-radius:12px;text-align:center;border:2px solid transparent;cursor:pointer;" onclick="this.style.borderColor=this.style.borderColor?'':'var(--success)'">
        <div style="font-size:1.8rem;font-weight:800;">4-5</div>
        <div style="font-size:0.9rem;font-weight:600;">Problem solver</div>
        <div style="font-size:0.84rem;color:var(--text-light);margin-top:.25rem;">This is the standard 💪</div>
      </div>
    </div>
    <div class="callout blue">
      <strong>Goal:</strong> Every team member should be operating at <strong>Level 3 minimum</strong>, with senior team members and managers consistently at <strong>Level 4-5</strong>. If you're not there yet, talk to your manager about how to get there.
    </div>
  </div>
  <div class="card">
    <h3>📹 Driving Customer Success</h3>
    <video controls style="width:100%;border-radius:8px;margin-top:.5rem;" preload="metadata">
      <source src="/org-structure-reveal.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  </div><!-- end org-pyramid -->

</div><!-- end #org -->

<!-- ===================== EVALUATION ===================== -->
<div class="section" id="evaluation">
  <div class="section-header"><span class="emoji">📊</span><h2>Self-Evaluation Survey</h2></div>
  <div style="margin-bottom:1.5rem;">
    <a href="https://performance.tigertracks.ai/" target="_blank" rel="noopener noreferrer"
      style="display:inline-flex;align-items:center;gap:.5rem;background:linear-gradient(135deg,#229FA1,#1A7477);color:#FFFFFF;font-family:Inter,system-ui,sans-serif;font-size:1.08rem;font-weight:700;padding:.75rem 1.5rem;border-radius:8px;text-decoration:none;white-space:nowrap;"
      onmouseover="this.style.background='linear-gradient(135deg,#1F807E,#155f62)'" onmouseout="this.style.background='linear-gradient(135deg,#229FA1,#1A7477)'">
      Go to Performance Platform
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </a>
  </div>


  <!-- CTA Banner -->
  <div style="background:linear-gradient(135deg,rgba(34,159,161,0.12),rgba(34,159,161,0.06));border:1px solid rgba(34,159,161,0.3);border-radius:12px;padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;margin-bottom:1.5rem;">
    <div>
      <div style="font-family:'DM Serif Display',serif;font-size:1.14rem;font-weight:700;color:#FFFFFF;margin-bottom:.2rem;">Reference Templates</div>
      <div style="font-family:Inter,system-ui,sans-serif;font-size:1.02rem;color:#9E9E9E;">These are reference templates. To complete your self-evaluation, use the performance platform.</div>
    </div>
    <a href="https://performance.tigertracks.ai" target="_blank" style="display:inline-flex;align-items:center;gap:.4rem;background:#229FA1;color:#FFFFFF;font-family:Inter,system-ui,sans-serif;font-size:1.056rem;font-weight:700;padding:.6rem 1.1rem;border-radius:8px;text-decoration:none;white-space:nowrap;transition:background .2s;" onmouseover="this.style.background='#1F807E'" onmouseout="this.style.background='#229FA1'">Go to Self-Evaluation →</a>
  </div>

  <div class="callout">
    <strong>How to use:</strong> Select your role below to preview the evaluation questions for that role. These are the exact questions used in the self-evaluation on the performance platform. Use this as a reference when preparing your evaluation.
  </div>

  <div class="card">
    <h3>Rating Scale</h3>
    <div class="table-wrap">
      <table>
        <tr><th>Rating</th><th>Meaning</th></tr>
        <tr><td><strong>-</strong></td><td>Does not possess this skill</td></tr>
        <tr><td><strong>1</strong></td><td>Entry level. Beginning to learn, still requires training and/or oversight</td></tr>
        <tr><td><strong>2</strong></td><td>Fully trained, occasionally requires QAs or oversight, executes with accuracy over 80% of the time</td></tr>
        <tr><td><strong>3</strong></td><td>Meets standards. Skill fully learned, executed with accuracy over 95% of the time</td></tr>
        <tr><td><strong>4</strong></td><td>Mastered. Requires no oversight or QAs</td></tr>
        <tr><td><strong>5</strong></td><td>Exceptional. Subject matter expert. Could teach this skill to others</td></tr>
      </table>
    </div>
  </div>

  <div class="card">
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:end;margin-bottom:1rem;">
      <div style="flex:2;min-width:220px;">
        <label style="font-size:0.96rem;font-weight:700;color:var(--text-light);text-transform:uppercase;letter-spacing:.5px;">Your Name</label>
        <select id="evalName" onchange="evalAutoFillRole(this)" style="width:100%;padding:.5rem .75rem;border:1px solid var(--border);border-radius:8px;font-family:Inter,system-ui,sans-serif;font-size:1.08rem;background:#1B2126;color:#FFFFFF;margin-top:.25rem;cursor:pointer;">
          <option value="">— Select your name —</option>
          <option value="Alex Blumberg" data-role="Associate Director">Alex Blumberg</option>
          <option value="Allison Long" data-role="Senior Account Manager">Allison Long</option>
          <option value="Anirudh Venkat" data-role="Account Strategist">Anirudh Venkat</option>
          <option value="Billy Bevevino" data-role="Account Strategist">Billy Bevevino</option>
          <option value="Camryn" data-role="Account Coordinator">Camryn</option>
          <option value="Charlotte Pohl" data-role="Associate Director">Charlotte Pohl</option>
          <option value="Daren Kalkoffen" data-role="Account Strategist">Daren Kalkoffen</option>
          <option value="Evin Leclerc" data-role="Account Coordinator">Evin Leclerc</option>
          <option value="Gretchen Hess" data-role="Account Manager">Gretchen Hess</option>
          <option value="Hannah Price" data-role="Associate Director">Hannah Price</option>
          <option value="Kersten Kruse" data-role="Associate Director">Kersten Kruse</option>
          <option value="Kiyana Saidi-Nejad" data-role="Account Manager">Kiyana Saidi-Nejad</option>
          <option value="Mary McCambridge" data-role="Senior Account Manager">Mary McCambridge</option>
          <option value="Megan Brenneke" data-role="Account Strategist">Megan Brenneke</option>
          <option value="Megan Klein" data-role="Account Manager">Megan Klein</option>
          <option value="Owen Phipps" data-role="Account Strategist">Owen Phipps</option>
          <option value="Rachel Scharett" data-role="Senior Director">Rachel Scharett</option>
          <option value="Riley Abercrombie" data-role="Associate Director">Riley Abercrombie</option>
          <option value="Sanad Shuman" data-role="Account Coordinator">Sanad Shuman</option>
          <option value="Seth McDaniel" data-role="Account Strategist">Seth McDaniel</option>
          <option value="Shelby Nations" data-role="Senior Account Manager">Shelby Nations</option>
          <option value="Steven Jatich" data-role="Associate Director">Steven Jatich</option>
          <option value="Tate Dewey" data-role="Account Strategist">Tate Dewey</option>
          <option value="Will Sokol" data-role="Senior Account Manager">Will Sokol</option>
        </select>
      </div>
      <div style="flex:2;min-width:200px;">
        <label style="font-size:0.96rem;font-weight:700;color:var(--text-light);text-transform:uppercase;letter-spacing:.5px;">Role</label>
        <select id="evalRole" onchange="renderEval()" style="width:100%;padding:.5rem .75rem;border:1px solid var(--border);border-radius:8px;font-family:Inter,system-ui,sans-serif;font-size:1.08rem;background:#1B2126;color:#FFFFFF;margin-top:.25rem;cursor:pointer;">
          <option value="">— Role auto-fills from name —</option>
          <option value="Account Coordinator">Account Coordinator</option>
          <option value="Account Strategist">Account Strategist</option>
          <option value="Account Manager">Account Manager</option>
          <option value="Senior Account Manager">Senior Account Manager</option>
          <option value="Associate Director">Associate Director</option>
          <option value="Director">Director</option>
          <option value="Senior Director">Senior Director</option>
        </select>
      </div>

    </div>
  </div>

  <!-- Evaluation tasks render here -->
  <div id="evalContainer"></div>


</div>

<!-- ===================== REVIEWS ===================== -->
<div class="section" id="reviews">
  <div class="section-header"><span class="emoji">📝</span><h2>Meeting Agendas</h2></div>
  <div style="margin-bottom:1.5rem;">
    <a href="https://performance.tigertracks.ai/" target="_blank" rel="noopener noreferrer"
      style="display:inline-flex;align-items:center;gap:.5rem;background:linear-gradient(135deg,#229FA1,#1A7477);color:#FFFFFF;font-family:Inter,system-ui,sans-serif;font-size:1.08rem;font-weight:700;padding:.75rem 1.5rem;border-radius:8px;text-decoration:none;white-space:nowrap;"
      onmouseover="this.style.background='linear-gradient(135deg,#1F807E,#155f62)'" onmouseout="this.style.background='linear-gradient(135deg,#229FA1,#1A7477)'">
      Go to Performance Platform
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </a>
  </div>


  <!-- Role Selector -->
  <div class="card" id="reviewSetup" style="margin-bottom:1.5rem;">
    <h3 style="font-family:'DM Serif Display',serif;color:#FFFFFF;margin-bottom:1rem;">Select Your Role</h3>
    <div style="max-width:360px;">
      <label class="rv-label">Role</label>
      <select id="rvRoleSelect" class="rv-input" onchange="populateReviewerInfo(this.value)">
        <option value="">— Select your role —</option>
        <option value="ic">Account Coordinator / Account Strategist</option>
        <option value="ic">Digital Marketing Specialist</option>
        <option value="manager">Account Manager</option>
        <option value="manager">Senior Account Manager</option>
        <option value="manager">Associate Director</option>
        <option value="director">Director / Director of Marketing</option>
        <option value="director">Senior Director</option>
        <option value="director">Partnerships Director</option>
        <option value="leadership">Head of Partnerships</option>
        <option value="leadership">VP of Partnerships</option>
      </select>
    </div>
  </div>
  

  <!-- CTA Banner -->
  <div style="background:linear-gradient(135deg,rgba(34,159,161,0.12),rgba(26,116,119,0.08));border:1px solid rgba(34,159,161,0.25);border-radius:12px;padding:1.25rem 1.5rem;margin-bottom:2rem;display:flex;flex-wrap:wrap;align-items:center;gap:1rem;justify-content:space-between;">
    <p style="color:#F4F1EB;font-family:Inter,system-ui,sans-serif;font-size:1.08rem;margin:0;line-height:1.6;">Review the questions below, then click to complete your check-in on the performance platform.</p>
    <a href="https://performance.tigertracks.ai" target="_blank" rel="noopener noreferrer"
      style="display:inline-flex;align-items:center;gap:.5rem;background:#229FA1;color:#FFFFFF;font-family:Inter,system-ui,sans-serif;font-size:1.08rem;font-weight:700;padding:.75rem 1.5rem;border-radius:8px;text-decoration:none;white-space:nowrap;transition:background .2s;"
      onmouseover="this.style.background='#1F807E'" onmouseout="this.style.background='#229FA1'">
      Go to Performance Check-Ins
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </a>
  </div>

  <!-- Two-column question reference (populated dynamically by role) -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;" id="rv-question-grid">

    <!-- LEFT: Weekly Syncs -->
    <div>
      <h3 id="rv-weekly-header" style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.2rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid #229FA1;">Weekly Syncs</h3>
      <div id="rv-weekly-col">
        <p style="color:#9E9E9E;font-family:Inter,system-ui,sans-serif;font-size:1.02rem;padding:.5rem 0;">Select your name above to see your questions.</p>
      </div>
    </div>

    <!-- RIGHT: Monthly Feedback Reviews -->
    <div>
      <h3 id="rv-monthly-header" style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.2rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid #1F807E;">Monthly Feedback Reviews</h3>
      <div id="rv-monthly-col">
        <p style="color:#9E9E9E;font-family:Inter,system-ui,sans-serif;font-size:1.02rem;padding:.5rem 0;">Select your name above to see your questions.</p>
      </div>
    </div>

  </div>
</div>

<!-- ===================== SPECIALTIES ===================== -->
<div class="section" id="specialties">
  <div class="section-header"><span class="emoji">🧠</span><h2>Team Specialties Chart</h2></div>

  <div class="callout">
    <strong>Rating Scale:</strong> 1 = No idea where to start · 2 = Need guidance · 3 = Proficient with basics · 4 = Comfortable with edge cases, can help others · 5 = Expert, comfortable teaching others
  </div>

  <!-- View Mode Tabs -->
  <div style="display:flex;gap:.5rem;margin:1rem 0;flex-wrap:wrap;">
    <button class="rv-tab active" data-stab="chart" onclick="switchSpecTab('chart')">📊 Skills Chart</button>
    <button class="rv-tab" data-stab="person" onclick="switchSpecTab('person')">👤 View by Person</button>
    <button class="rv-tab" data-stab="skill" onclick="switchSpecTab('skill')">🔍 Find Expert by Skill</button>
    <button class="rv-tab" data-stab="interests" onclick="switchSpecTab('interests')">🌱 Growth Interests</button>
  </div>

  <!-- CHART VIEW -->
  <div id="spec-chart" class="spec-tab-content">
    <div class="card">
      <h3>📊 Team Skills Overview</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Select a skill category to see who's strongest. Bar length = skill rating (1-5).</p>
      <select id="chartCatSelect" class="rv-input" style="max-width:300px;margin-bottom:1rem;" onchange="renderSkillChart()">
        <option value="search">🔍 Search Platforms</option>
        <option value="social">📱 Social Platforms</option>
        <option value="ecom">🛒 eCommerce</option>
        <option value="retail">🏪 Retail</option>
        <option value="app">📲 App Platforms</option>
        <option value="additional">⚡ Additional Skills</option>
        <option value="clientType">🏢 Client Type Experience</option>
      </select>
      <div id="skillChartContainer"></div>
    </div>
  </div>

  <!-- BY PERSON -->
  <div id="spec-person" class="spec-tab-content" style="display:none;">
    <div class="callout green" style="margin-bottom:1rem;">
      <strong>📈 Keep Your Skills Updated!</strong> Select your name below, click <strong>✏️ Edit My Skills</strong>, update your ratings as you improve, then click <strong>💾 Save</strong>. Your updates are saved locally and will persist across visits on this device.
    </div>
    <div class="card">
      <h3>👤 Select a Team Member</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:end;">
        <select id="specPerson" class="rv-input" style="max-width:350px;">
          <option value="">- Choose your name -</option>
        </select>
        <button id="specEditBtn" onclick="toggleSpecEdit()" class="print-btn" style="display:none;background:var(--accent);color:#fff;">✏️ Edit My Skills</button>
        <button id="specSaveBtn" onclick="saveSpecEdits()" class="print-btn" style="display:none;background:var(--success);color:#fff;">💾 Save Changes</button>
        <button id="specCancelBtn" onclick="cancelSpecEdit()" class="print-btn" style="display:none;background:var(--danger);color:#fff;">✕ Cancel</button>
      </div>
      <div id="specPersonResult" style="margin-top:1rem;"></div>
    </div>
  </div>

  <!-- FIND EXPERT -->
  <div id="spec-skill" class="spec-tab-content" style="display:none;">
    <div class="card">
      <h3>🔍 Who's the Expert?</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Select a platform or skill to see who's strongest.</p>
      <select id="specSkillPicker" class="rv-input" style="max-width:350px;">
        <option value="">- Choose a skill/platform -</option>
      </select>
      <div id="specSkillResult" style="margin-top:1rem;"></div>
    </div>
  </div>

  <!-- INTERESTS -->
  <div id="spec-interests" class="spec-tab-content" style="display:none;">
    <div class="card">
      <h3>🌱 Growth Interest Areas</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:1rem;">Skills each team member wants to develop, ranked by priority. Plus skills they've mastered and could teach.</p>
      <div id="specInterestsResult"></div>
    </div>
  </div>
</div>

<!-- ===================== BENEFITS ===================== -->
<div class="section" id="benefits">
  <div class="section-header"><span class="emoji">🏥</span><h2>Benefits & PTO</h2></div>

  <!-- Benefits Landing Page -->
  <div id="ben-landing">
    <p style="color:#9E9E9E;font-family:Inter,system-ui,sans-serif;font-size:1.08rem;margin-bottom:1.5rem;">Select a topic below to view your benefits details.</p>
    <div class="ben-landing-grid">
      <div class="ben-landing-card" onclick="switchBenTab('overview')">
        <div class="blc-icon">📋</div>
        <div class="blc-title">Insurance Overview</div>
        <div class="blc-desc">Plan summary, contacts &amp; quick reference</div>
      </div>
      <div class="ben-landing-card" onclick="switchBenTab('medical')">
        <div class="blc-icon">🏥</div>
        <div class="blc-title">Medical</div>
        <div class="blc-desc">Florida Blue BlueOptions PPO/EPO details</div>
      </div>
      <div class="ben-landing-card" onclick="switchBenTab('dental')">
        <div class="blc-icon">🦷</div>
        <div class="blc-title">Dental</div>
        <div class="blc-desc">Coverage tiers, copays &amp; network</div>
      </div>
      <div class="ben-landing-card" onclick="switchBenTab('vision')">
        <div class="blc-icon">👓</div>
        <div class="blc-title">Vision</div>
        <div class="blc-desc">EyeMed coverage &amp; in-network providers</div>
      </div>
      <div class="ben-landing-card" onclick="switchBenTab('401k')">
        <div class="blc-icon">💰</div>
        <div class="blc-title">401(k)</div>
        <div class="blc-desc">Retirement plan, employer match &amp; enrollment</div>
      </div>
      <div class="ben-landing-card" onclick="switchBenTab('pto')">
        <div class="blc-icon">🏖️</div>
        <div class="blc-title">Paid Time Off</div>
        <div class="blc-desc">PTO policy, accrual &amp; how to request</div>
      </div>
      <div class="ben-landing-card" onclick="event.preventDefault();navigateTo('pto-request')">
        <div class="blc-icon">📝</div>
        <div class="blc-title">PTO Policy &amp; Requests</div>
        <div class="blc-desc">Submit PTO requests &amp; review policy details</div>
      </div>
    </div>
  </div>

    <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.5rem;">
    <button class="rv-tab active" data-bentab="overview" onclick="switchBenTab('overview')">📋 Insurance Overview</button>
    <button class="rv-tab" data-bentab="medical" onclick="switchBenTab('medical')">🏥 Medical</button>
    <button class="rv-tab" data-bentab="dental" onclick="switchBenTab('dental')">🦷 Dental</button>
    <button class="rv-tab" data-bentab="vision" onclick="switchBenTab('vision')">👓 Vision</button>
    <button class="rv-tab" data-bentab="401k" onclick="switchBenTab('401k')">💰 401(k)</button>
    <button class="rv-tab" data-bentab="pto" onclick="switchBenTab('pto')">🏖️ Paid Time Off</button>
  </div>

  <!-- MEDICAL TAB -->
  <!-- INSURANCE OVERVIEW TAB -->
  <div id="ben-overview" class="ben-tab-content">

  <!-- Important Contacts -->
  <div class="card">
    <h3>📞 Important Contacts</h3>
    <div class="table-wrap">
      <table>
        <tr><th>Service</th><th>Phone</th><th>Website</th></tr>
        <tr><td><strong>Florida Blue Member Services</strong></td><td>1-800-352-2583</td><td><a href="https://www.floridablue.com" target="_blank">floridablue.com</a></td></tr>
        <tr><td><strong>Teladoc (24/7 Virtual Visits)</strong></td><td>1-800-835-2362</td><td><a href="https://teladoc.com" target="_blank">teladoc.com</a></td></tr>
        <tr><td><strong>Guardian Dental & Vision</strong></td><td>1-800-541-7846</td><td><a href="https://www.guardiananytime.com" target="_blank">guardiananytime.com</a></td></tr>
        <tr><td><strong>Care Consultants</strong></td><td>1-888-476-2227</td><td>-</td></tr>
        <tr><td><strong>CareCentrix (DME)</strong></td><td>1-866-776-4617</td><td>-</td></tr>
        <tr><td><strong>Accredo Specialty Pharmacy</strong></td><td>1-888-425-5970</td><td>-</td></tr>
        <tr><td><strong>Express Scripts (Mail Order)</strong></td><td>-</td><td><a href="https://express-scripts.com" target="_blank">express-scripts.com</a></td></tr>
        <tr><td><strong>Find a Doctor</strong></td><td>-</td><td><a href="https://providersearch.floridablue.com" target="_blank">Provider Search</a></td></tr>
        <tr><td><strong>EKA Planning (401k/Benefits)</strong></td><td>(516) 944-0200</td><td>-</td></tr>
      </table>
    </div>
    <div class="callout" style="margin-top:.5rem;">
      <strong>Benefits Broker Contacts:</strong><br>
      📞 <strong>Tim Moran</strong>: tim@ekaplanning.com · (516) 944-0200 x112<br>
      📞 <strong>Susan Glaser</strong>: susan@ekaplanning.com · (516) 944-0200 x119
    </div>
    <p style="font-size:0.96rem;color:var(--text-light);margin-top:.5rem;">⚠️ CVS-owned pharmacies are excluded from the network (includes Target Pharmacy, Navarro, Longs).</p>
  </div>

  <!-- Where to Go -->
  <div class="card">
    <h3>🗺️ Where to Go for Care: Quick Guide</h3>
    <div class="table-wrap">
      <table>
        <tr><th>Situation</th><th>Where to Go</th><th>Approx. Cost</th></tr>
        <tr><td>Non-emergency illness (cold, flu, rash)</td><td>🖥️ <strong>Teladoc</strong></td><td>$0</td></tr>
        <tr><td>Routine checkup / preventive</td><td>🏥 <strong>PCP (In-Network)</strong></td><td>$0</td></tr>
        <tr><td>Minor illness / injury, can't wait</td><td>🏪 <strong>Urgent Care</strong></td><td>$35</td></tr>
        <tr><td>Need a specialist</td><td>👨‍⚕️ <strong>Specialist (In-Network)</strong></td><td>$30</td></tr>
        <tr><td>Life-threatening emergency</td><td>🚨 <strong>Nearest ER</strong></td><td>$150</td></tr>
      </table>
    </div>
    <div class="callout green" style="margin-top:.75rem;">
      <strong>Save money tip:</strong> Always try Teladoc or urgent care before the ER for non-emergencies. An ER visit costs $150+ vs. $0-$35.
    </div>
  </div>

  <!-- Cost Examples -->
  <div class="card">
    <h3>📊 Real Cost Examples</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin:.75rem 0;">
      <div style="background:#0A1119;color:#FFFFFF;padding:1.25rem;border-radius:12px;">
        <h4 style="font-size:1.08rem;">🤰 Having a Baby</h4>
        <p style="font-size:0.96rem;color:var(--text-light);">9 months prenatal + hospital delivery (in-network)</p>
        <p style="font-size:1.02rem;">Total cost: $12,700</p>
        <p style="font-size:1.32rem;font-weight:700;color:var(--success);">You pay: ~$2,100</p>
        <p style="font-size:0.96rem;color:var(--text-light);">Plan pays: ~$10,600</p>
      </div>
      <div style="background:#0A1119;color:#FFFFFF;padding:1.25rem;border-radius:12px;">
        <h4 style="font-size:1.08rem;">🦴 Simple Fracture</h4>
        <p style="font-size:0.96rem;color:var(--text-light);">ER visit + follow-up care (in-network)</p>
        <p style="font-size:1.02rem;">Total cost: $2,000</p>
        <p style="font-size:1.32rem;font-weight:700;color:var(--success);">You pay: ~$400</p>
        <p style="font-size:0.96rem;color:var(--text-light);">Plan pays: ~$1,600</p>
      </div>
      <div style="background:#0A1119;color:#FFFFFF;padding:1.25rem;border-radius:12px;">
        <h4 style="font-size:1.08rem;">💉 Managing Type 2 Diabetes</h4>
        <p style="font-size:0.96rem;color:var(--text-light);">1 year routine care, well-controlled (in-network)</p>
        <p style="font-size:1.02rem;">Total cost: $5,600</p>
        <p style="font-size:1.32rem;font-weight:700;color:var(--success);">You pay: ~$900</p>
        <p style="font-size:0.96rem;color:var(--text-light);">Plan pays: ~$4,700</p>
      </div>
    </div>
  </div>

  <!-- Teladoc -->
  <div class="card">
    <h3>📱 Teladoc: Virtual Care 24/7</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin:.75rem 0;">
      <div style="text-align:center;padding:1rem;background:#0A1119;color:#FFFFFF;border-radius:12px;">
        <div style="font-size:1.8rem;">📞</div>
        <div style="font-weight:700;font-size:1.08rem;">1-800-TELADOC</div>
        <div style="font-size:0.96rem;color:var(--text-light);">(1-800-835-2362)</div>
      </div>
      <div style="text-align:center;padding:1rem;background:#0A1119;color:#FFFFFF;border-radius:12px;">
        <div style="font-size:1.8rem;">💻</div>
        <div style="font-weight:700;font-size:1.08rem;">Teladoc.com</div>
        <div style="font-size:0.96rem;color:var(--text-light);">or download the app</div>
      </div>
      <div style="text-align:center;padding:1rem;background:#0A1119;color:#FFFFFF;border-radius:12px;">
        <div style="font-size:1.8rem;">💚</div>
        <div style="font-weight:700;font-size:1.08rem;">$0 Cost</div>
        <div style="font-size:0.96rem;color:var(--text-light);">In-network virtual visits</div>
      </div>
    </div>
    <p style="font-size:1.02rem;margin-top:.5rem;">Teladoc can help with: sinus infections, flu, cough, sore throat, rash, allergies, upset stomach, nausea, and more. Available 24/7 via phone, video, or app. Register at <a href="https://teladoc.com" target="_blank">Teladoc.com</a>.</p>
    <h4>How to Register for Teladoc</h4>
    <ol style="font-size:1.02rem;">
      <li>Go to <a href="https://teladoc.com" target="_blank">Teladoc.com</a> or download the Teladoc app</li>
      <li>Create an account using your Florida Blue member ID</li>
      <li>Add your medical history and pharmacy preference</li>
      <li>When you need care, request a visit - a doctor will call within minutes</li>
    </ol>
  </div>

  <!-- How to Enroll -->
  <div class="card">
    <h3>📋 How to Enroll: Open Enrollment in isolved</h3>
    <ol style="font-size:1.02rem;">
      <li>Log in to <strong>isolved</strong> with your Employee Self-Service credentials</li>
      <li>Select <strong>Benefit Enrollment</strong> or <strong>Open Enrollment</strong></li>
      <li>Review the <strong>Welcome</strong> screen for enrollment dates and employer messages</li>
      <li>Add or update <strong>Beneficiaries and Dependents</strong></li>
      <li>Review the <strong>Cost Analysis</strong> to compare plans</li>
      <li>Make your <strong>Plan Selections</strong> (Medical, Dental, Vision, 401k, Life, HSA/FSA)</li>
      <li>Select dependents to add to each plan</li>
      <li>Review the <strong>Benefit Confirmation</strong> page</li>
      <li>Click <strong>Submit My Benefits</strong></li>
      <li><strong>Print your confirmation</strong> for your records</li>
    </ol>
    <div class="callout blue" style="margin-top:.75rem;">
      <strong>Tip:</strong> A copy of your enrollment confirmation will be available in the Documents section of isolved.
    </div>
  </div>

  </div><!-- /ben-overview -->

  <!-- MEDICAL TAB -->
  <div id="ben-medical" class="ben-tab-content" style="display:none;">

  <div class="callout green">
    <strong>Coverage Period:</strong> February 1, 2026 – January 31, 2027<br>
    <strong>Plan:</strong> Florida Blue, BlueOptions 14002 All Copay (PPO/EPO): Fully Insured<br>
    <strong>Provider:</strong> <a href="https://www.floridablue.com" target="_blank">FloridaBlue.com</a> · <strong>Find a Doctor:</strong> <a href="https://providersearch.floridablue.com/providersearch/pub/index.htm" target="_blank">Provider Search</a><br>
    <strong>Member Services:</strong> 1-800-352-2583 · <strong>Teladoc:</strong> 1-800-835-2362
  </div>

  <!-- Plan Highlights -->
  <div class="card">
    <h3>✨ Plan Highlights</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin:.75rem 0;">
      <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
        <div style="font-size:2.1rem;">$0</div>
        <div style="font-size:0.96rem;font-weight:600;color:var(--text-light);">In-Network Deductible</div>
      </div>
      <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
        <div style="font-size:2.1rem;">$3,500</div>
        <div style="font-size:0.96rem;font-weight:600;color:var(--text-light);">Out-of-Pocket Max (Individual)</div>
      </div>
      <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
        <div style="font-size:2.1rem;">$15</div>
        <div style="font-size:0.96rem;font-weight:600;color:var(--text-light);">PCP Visit Copay</div>
      </div>
      <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
        <div style="font-size:2.1rem;">$0</div>
        <div style="font-size:0.96rem;font-weight:600;color:var(--text-light);">Virtual Visits (In-Network)</div>
      </div>
    </div>
    <ul style="margin-top:.75rem;">
      <li>Largest network of doctors, hospitals, and pharmacies in Florida</li>
      <li>$0 wellness checkups with in-network doctors</li>
      <li>$0 virtual visits with PCP, specialist, or behavioral health via Teladoc</li>
      <li>$4 generic drugs for chronic conditions (diabetes, asthma, high cholesterol, high blood pressure, depression)</li>
      <li>Coverage when traveling worldwide</li>
      <li>Blue365® discounts up to 50% on gym memberships, nutrition programs, and more</li>
      <li>24/7 care consultant and nurse support</li>
    </ul>
  </div>

  <!-- Cost Summary -->
  <div class="card">
    <h3>💰 Cost Summary, What You Pay</h3>
    <div class="table-wrap">
      <table>
        <tr><th style="width:40%">Category</th><th>In-Network</th><th>Out-of-Network</th></tr>
        <tr><td><strong>Deductible (Individual / Family)</strong></td><td>$0 / $0</td><td>$500 / $1,000</td></tr>
        <tr><td><strong>Out-of-Pocket Max (Individual / Family)</strong></td><td>$3,500 / $7,000</td><td>$7,000 / $14,000</td></tr>
        <tr><td><strong>Coinsurance</strong></td><td>0%</td><td>50%</td></tr>
      </table>
    </div>
  </div>

  <!-- Doctor Visits -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🩺 Doctor Visits & Office Care</h3>
    <div class="collapsible-content">
      <div class="table-wrap">
        <table>
          <tr><th style="width:40%">Service</th><th>In-Network</th><th>Out-of-Network</th></tr>
          <tr><td>Primary Care Visit</td><td><strong>$15</strong> copay (Value Choice: $0)</td><td>Deductible + 50%</td></tr>
          <tr><td>Virtual Visit (PCP)</td><td><strong>$0</strong></td><td>Not covered</td></tr>
          <tr><td>Specialist Visit</td><td><strong>$30</strong> copay</td><td>Deductible + 50%</td></tr>
          <tr><td>Virtual Visit (Specialist)</td><td><strong>$30</strong> copay</td><td>Not covered</td></tr>
          <tr><td>Preventive Care / Screenings</td><td><strong>$0</strong></td><td>50% coinsurance</td></tr>
          <tr><td>Urgent Care</td><td><strong>$35</strong> copay (Value Choice: $0 first 2)</td><td>Deductible + $35</td></tr>
        </table>
      </div>
    </div>
  </div>

  <!-- Tests & Imaging -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🔬 Tests & Imaging</h3>
    <div class="collapsible-content">
      <div class="table-wrap">
        <table>
          <tr><th style="width:40%">Service</th><th>In-Network</th><th>Out-of-Network</th></tr>
          <tr><td>Lab Work (Independent Lab)</td><td><strong>$0</strong></td><td>Deductible + 50%</td></tr>
          <tr><td>Diagnostic Testing Center</td><td><strong>$75</strong> copay</td><td>Deductible + 50%</td></tr>
          <tr><td>Imaging, Office (CT/MRI/PET)</td><td><strong>$30</strong> copay</td><td>Deductible + 50%</td></tr>
          <tr><td>Imaging, Freestanding Center</td><td><strong>$150</strong> copay</td><td>Deductible + 50%</td></tr>
        </table>
      </div>
      <p style="font-size:0.96rem;color:var(--text-light);margin-top:.5rem;">⚠️ Prior Authorization may be required for imaging. Tests in hospitals may have higher cost share.</p>
    </div>
  </div>

  <!-- Prescriptions -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">💊 Prescription Drugs</h3>
    <div class="collapsible-content">
      <div class="table-wrap">
        <table>
          <tr><th style="width:35%">Drug Type</th><th>Retail (30-day)</th><th>Mail Order (90-day)</th></tr>
          <tr><td>Preventive Generic</td><td><strong>$0</strong></td><td><strong>$0</strong></td></tr>
          <tr><td>Condition Care Rx (Generic)</td><td><strong>$4</strong></td><td>$8</td></tr>
          <tr><td>All Other Generic</td><td><strong>$10</strong></td><td>$20</td></tr>
          <tr><td>Condition Care Rx (Brand)</td><td><strong>$15</strong></td><td>$30</td></tr>
          <tr><td>Preferred Brand</td><td><strong>$30</strong></td><td>$60</td></tr>
          <tr><td>Non-Preferred Brand</td><td><strong>$50</strong></td><td>$100</td></tr>
          <tr><td>Specialty</td><td><strong>$150</strong></td><td>N/A</td></tr>
        </table>
      </div>
      <p style="font-size:0.96rem;color:var(--text-light);margin-top:.5rem;">Out-of-network Rx: Not covered. Specialty drugs: 30-day retail only, no mail order.</p>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>$4 generics</strong> available for chronic conditions: diabetes, asthma, high cholesterol, high blood pressure, and depression, no deductible!
      </div>
    </div>
  </div>

  <!-- Emergency & Hospital -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🚑 Emergency & Hospital</h3>
    <div class="collapsible-content">
      <div class="table-wrap">
        <table>
          <tr><th style="width:40%">Service</th><th>In-Network</th><th>Out-of-Network</th></tr>
          <tr><td>Emergency Room (Facility)</td><td><strong>$150</strong> copay</td><td>$150 copay</td></tr>
          <tr><td>ER Physician Services</td><td><strong>$0</strong></td><td>$0</td></tr>
          <tr><td>Emergency Medical Transport</td><td><strong>$400</strong> copay</td><td>$400 copay</td></tr>
          <tr><td>Hospital Stay (Facility/day)</td><td><strong>$300</strong>/day ($900 max)</td><td>Deductible + 50%</td></tr>
          <tr><td>Hospital Physician/Surgeon</td><td><strong>$0</strong></td><td>$0</td></tr>
          <tr><td>Outpatient Surgery (ASC)</td><td><strong>$200</strong> copay</td><td>Deductible + 50%</td></tr>
          <tr><td>Outpatient Surgery (Hospital)</td><td><strong>$250</strong> copay</td><td>Deductible + 50%</td></tr>
        </table>
      </div>
    </div>
  </div>

  <!-- Mental Health -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🧠 Mental Health & Behavioral Health</h3>
    <div class="collapsible-content">
      <div class="table-wrap">
        <table>
          <tr><th style="width:40%">Service</th><th>In-Network</th><th>Out-of-Network</th></tr>
          <tr><td>Outpatient, Office Visit</td><td><strong>$15</strong> copay</td><td>Deductible + 50%</td></tr>
          <tr><td>Outpatient, Virtual Visit</td><td><strong>$0</strong></td><td>Not covered</td></tr>
          <tr><td>Outpatient, Hospital</td><td><strong>$250</strong> copay</td><td>Deductible + 50%</td></tr>
          <tr><td>Inpatient (Facility/day)</td><td><strong>$300</strong>/day ($900 max)</td><td>Deductible + 50%</td></tr>
          <tr><td>Inpatient Physician</td><td><strong>$0</strong></td><td>$0</td></tr>
        </table>
      </div>
    </div>
  </div>

  <!-- Maternity -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🤰 Maternity & Pregnancy</h3>
    <div class="collapsible-content">
      <div class="table-wrap">
        <table>
          <tr><th style="width:40%">Service</th><th>In-Network</th><th>Out-of-Network</th></tr>
          <tr><td>Initial Office Visit</td><td><strong>$30</strong> copay</td><td>Deductible + 50%</td></tr>
          <tr><td>Delivery, Professional Services</td><td><strong>$0</strong></td><td>$0</td></tr>
          <tr><td>Delivery, Facility</td><td><strong>$300</strong>/day ($900 max)</td><td>Deductible + 50%</td></tr>
        </table>
      </div>
      <div class="callout green" style="margin-top:.5rem;">
        <strong>Reminder:</strong> Tiger Tracks also provides up to <strong>12 weeks paid parental leave</strong> after 9 months of employment. See the Employee Handbook Section 3-3.
      </div>
    </div>
  </div>

  <!-- Recovery & Rehab -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🩹 Recovery, Rehab & Special Needs</h3>
    <div class="collapsible-content">
      <div class="table-wrap">
        <table>
          <tr><th style="width:40%">Service</th><th>In-Network</th><th>Limit</th></tr>
          <tr><td>Home Health Care</td><td><strong>$0</strong></td><td>60 visits</td></tr>
          <tr><td>Rehabilitation (PT/OT)</td><td><strong>$30</strong> copay</td><td>35 visits (incl. manipulations)</td></tr>
          <tr><td>Habilitation Services</td><td><strong>$30</strong> copay</td><td>35 visits</td></tr>
          <tr><td>Skilled Nursing</td><td><strong>$0</strong></td><td>60 days</td></tr>
          <tr><td>Hospice</td><td><strong>$0</strong></td><td>-</td></tr>
          <tr><td>Durable Medical Equipment</td><td><strong>$0</strong> (Motorized wheelchair: $400)</td><td>-</td></tr>
        </table>
      </div>
    </div>
  </div>

  <!-- Children's Coverage -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">👶 Children's Dental & Vision</h3>
    <div class="collapsible-content">
      <div class="table-wrap">
        <table>
          <tr><th style="width:40%">Service</th><th>In-Network</th><th>Limit</th></tr>
          <tr><td>Eye Exam</td><td><strong>$0</strong></td><td>1 per calendar year</td></tr>
          <tr><td>Glasses</td><td><strong>$0</strong></td><td>1 pair per calendar year</td></tr>
          <tr><td>Dental Check-Up</td><td><strong>$0</strong></td><td>Cleanings every 6 months + 1 set bitewing x-rays</td></tr>
        </table>
      </div>
    </div>
  </div>

  </div><!-- /ben-medical -->

  <!-- 401K TAB -->
  <div id="ben-401k" class="ben-tab-content" style="display:none;">

  <!-- Plan Overview -->
  <div class="card">
    <h3>💰 Tiger Tracks 401(k) Plan</h3>
    <p style="margin-bottom:1rem;">Tiger Tracks established the 401(k) Plan effective <strong>01/01/2026</strong>, administered through the <strong>Vestwell Platform</strong>. The plan includes pre-tax and Roth contributions, a Safe Harbor employer match, and automatic enrollment.</p>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.75rem;margin-bottom:1.25rem;">
      <div style="background:var(--accent-light);padding:1rem;border-radius:10px;text-align:center;">
        <div style="font-size:1.8rem;font-weight:900;color:var(--accent);">100%</div>
        <div style="font-size:0.9rem;font-weight:600;">Match on first 1%</div>
      </div>
      <div style="background:var(--accent-light);padding:1rem;border-radius:10px;text-align:center;">
        <div style="font-size:1.8rem;font-weight:900;color:var(--accent);">50%</div>
        <div style="font-size:0.9rem;font-weight:600;">Match on next 1-6%</div>
      </div>
      <div style="background:var(--accent-light);padding:1rem;border-radius:10px;text-align:center;">
        <div style="font-size:1.8rem;font-weight:900;color:var(--accent);">3.5%</div>
        <div style="font-size:0.9rem;font-weight:600;">Max employer match</div>
      </div>
      <div style="background:var(--accent-light);padding:1rem;border-radius:10px;text-align:center;">
        <div style="font-size:1.8rem;font-weight:900;color:var(--accent);">2 yrs</div>
        <div style="font-size:0.9rem;font-weight:600;">Cliff vesting</div>
      </div>
    </div>
  </div>

  <!-- Eligibility -->
  <div class="card">
    <h4 style="margin-bottom:.5rem;">📋 Eligibility</h4>
    <ul style="font-size:1.056rem;line-height:1.8;">
      <li>Must be <strong>age 21 or older</strong></li>
      <li>Must complete <strong>3 months of service</strong></li>
      <li>Enter the plan on the <strong>first day of the calendar month</strong> after meeting both criteria</li>
    </ul>
    <div class="callout" style="margin-top:.75rem;">
      <strong>Excluded employees:</strong> Employees covered by a collective bargaining agreement, leased employees, and non-resident aliens with no U.S.-sourced income.
    </div>
  </div>

  <!-- Contributions -->
  <div class="card">
    <h4 style="margin-bottom:.5rem;">💵 Your Contributions</h4>
    <p style="font-size:1.056rem;margin-bottom:.75rem;">You may elect to defer up to <strong>100% of your Plan Compensation</strong> on a pre-tax or Roth (after-tax) basis. You can change your elections each pay period.</p>

    <table class="rv-table" style="font-size:1.02rem;">
      <tr><th>Contribution Type</th><th>2025 Limit</th></tr>
      <tr><td>Standard annual limit</td><td><strong>$23,500</strong></td></tr>
      <tr><td>Age 50+ catch-up</td><td><strong>+ $7,500</strong> (total $31,000)</td></tr>
      <tr><td>Ages 60-63 enhanced catch-up (NEW 2025)</td><td><strong>+ $11,250</strong> (total $34,750)</td></tr>
    </table>
    <p style="font-size:0.936rem;color:var(--text-light);margin-top:.5rem;">These limits are indexed for inflation and may increase annually.</p>
  </div>

  <!-- Employer Match -->
  <div class="card">
    <h4 style="margin-bottom:.5rem;">🤝 Safe Harbor Employer Match</h4>
    <p style="font-size:1.056rem;margin-bottom:.75rem;">Tiger Tracks matches your contributions using a <strong>Safe Harbor formula</strong>. This match is allocated to your account each pay period.</p>

    <table class="rv-table" style="font-size:1.02rem;">
      <tr style="background:var(--accent-light);"><th>Your Contribution</th><th>Employer Match</th><th>Effective Match Rate</th></tr>
      <tr><td>First 1% of pay</td><td>100% match</td><td>1.0%</td></tr>
      <tr><td>Next 1-6% of pay</td><td>50% match</td><td>2.5%</td></tr>
      <tr><td colspan="2" style="font-weight:700;">Maximum employer match</td><td style="font-weight:700;color:var(--accent);">3.5% of pay</td></tr>
    </table>

    <div class="callout blue" style="margin-top:.75rem;">
      <strong>Example:</strong> If you earn $80,000/year and contribute 6% ($4,800), Tiger Tracks will match <strong>$2,800</strong> (3.5% of $80,000). That is free money toward your retirement. To get the full match, contribute at least 6% of your pay.
    </div>

    <p style="font-size:1.02rem;margin-top:.75rem;"><strong>Non-Elective Contributions:</strong> The Employer may also make additional discretionary Non-Elective Contributions, allocated pro rata to all eligible participants. These are not guaranteed each year.</p>
  </div>

  <!-- Automatic Enrollment -->
  <div class="card">
    <h4 style="margin-bottom:.5rem;">🔄 Automatic Enrollment (QACA)</h4>
    <p style="font-size:1.056rem;margin-bottom:.75rem;">If you do not make an active election, you will be <strong>automatically enrolled</strong> at the rates below. Automatic contributions are designated as <strong>pre-tax</strong>.</p>

    <table class="rv-table" style="font-size:1.02rem;">
      <tr><th>Period</th><th>Automatic Deferral Rate</th></tr>
      <tr><td>Initial period</td><td><strong>3%</strong> of compensation</td></tr>
      <tr><td>Year 2</td><td><strong>4%</strong></td></tr>
      <tr><td>Year 3</td><td><strong>5%</strong></td></tr>
      <tr><td>Year 4</td><td><strong>6%</strong></td></tr>
      <tr><td>Each year after</td><td>+1% annually, up to <strong>10%</strong> max</td></tr>
    </table>

    <div class="callout" style="margin-top:.75rem;">
      <strong>Opt-out window:</strong> If automatic contributions begin before you submit a form, you can <strong>withdraw automatic contributions within 90 days</strong> by submitting a refund form to the Plan Administrator. The withdrawal will be adjusted for gains/losses and subject to income tax (but not the 10% early withdrawal penalty).
    </div>
    <p style="font-size:1.02rem;margin-top:.5rem;">You can always change, increase, or stop your contributions at any time by submitting a new election.</p>
  </div>

  <!-- Vesting -->
  <div class="card">
    <h4 style="margin-bottom:.5rem;">🔒 Vesting Schedule</h4>
    <p style="font-size:1.056rem;margin-bottom:.75rem;">Vesting determines how much of the employer contributions you keep if you leave Tiger Tracks.</p>

    <table class="rv-table" style="font-size:1.02rem;">
      <tr><th>Account Type</th><th>Vesting</th></tr>
      <tr><td>Your Elective Deferrals (pre-tax & Roth)</td><td style="color:var(--accent);font-weight:700;">Always 100% vested</td></tr>
      <tr><td>Rollover Contributions</td><td style="color:var(--accent);font-weight:700;">Always 100% vested</td></tr>
      <tr><td>Qualified Non-Elective Contributions</td><td style="color:var(--accent);font-weight:700;">Always 100% vested</td></tr>
      <tr><td>Safe Harbor Matching Contributions</td><td><strong>2-year cliff:</strong> 0% until 2 years, then 100%</td></tr>
      <tr><td>Non-Elective Contributions</td><td><strong>2-year cliff:</strong> 0% until 2 years, then 100%</td></tr>
    </table>

    <div class="callout blue" style="margin-top:.75rem;">
      <strong>What does 2-year cliff mean?</strong> If you leave before completing 2 years of vesting service, you forfeit the employer match. After 2 years of service, you are <strong>100% vested</strong> and keep all of it.
    </div>
  </div>

  <!-- Distributions -->
  <div class="card">
    <h4 style="margin-bottom:.5rem;">📤 Distributions (Withdrawals)</h4>
    <p style="font-size:1.056rem;margin-bottom:.75rem;">You can receive a distribution from your account under the following circumstances:</p>

    <table class="rv-table" style="font-size:1.02rem;">
      <tr><th>Circumstance</th><th>Details</th></tr>
      <tr><td><strong>Termination of employment</strong></td><td>Immediately after leaving Tiger Tracks</td></tr>
      <tr><td><strong>Age 59-1/2</strong></td><td>In-service withdrawals from all fully vested sources</td></tr>
      <tr><td><strong>Hardship</strong></td><td>Must meet IRS hardship criteria</td></tr>
      <tr><td><strong>Rollover Account</strong></td><td>Withdraw from your Rollover Account at any time</td></tr>
      <tr><td><strong>Qualified birth or adoption</strong></td><td>Up to $5,000 per event</td></tr>
      <tr><td><strong>Disability</strong></td><td>As defined by the plan</td></tr>
      <tr><td><strong>Death</strong></td><td>Paid to designated beneficiary</td></tr>
    </table>

    <div class="callout" style="margin-top:.75rem;">
      <strong>Small balance force-out:</strong> Accounts under <strong>$7,000</strong> may be automatically distributed to a default IRA for former employees who do not timely elect a distribution.
    </div>

    <p style="font-size:1.02rem;margin-top:.5rem;"><strong>Normal Retirement Age:</strong> 65. Distributions are available in lump sum or installments as permitted by the plan.</p>
  </div>

  <!-- Investments -->
  <div class="card">
    <h4 style="margin-bottom:.5rem;">📊 Investments</h4>
    <ul style="font-size:1.056rem;line-height:1.8;">
      <li><strong>Platform:</strong> Vestwell</li>
      <li><strong>Investment options:</strong> Mutual funds, ETFs, and asset allocation models</li>
      <li><strong>Valuation:</strong> Daily</li>
      <li>You may direct the investment of <strong>all of your accounts</strong> among available funds</li>
      <li>The plan is an <strong>ERISA 404(c) plan</strong>, meaning fiduciaries may be relieved of liability for losses resulting from your investment choices</li>
    </ul>
    <p style="font-size:1.02rem;margin-top:.5rem;"><strong>Rollovers accepted:</strong> Direct rollovers from qualified plans and traditional IRAs (no after-tax rollovers). Available to all employees, even those not yet participating.</p>
  </div>

  <!-- How to Enroll -->
  <div class="card">
    <h4 style="margin-bottom:.5rem;">✅ How to Enroll</h4>
    <ol class="steps" style="font-size:1.056rem;">
      <li>Log in to <strong>isolved</strong> using your ESS login credentials</li>
      <li>Select <strong>Benefit Enrollment</strong> or <strong>Open Enrollment</strong></li>
      <li>Navigate to the <strong>401(k)</strong> plan section</li>
      <li>Choose <strong>pre-tax</strong>, <strong>Roth</strong>, or both contribution types</li>
      <li>Enter your <strong>contribution amount</strong> (percentage or dollar amount)</li>
      <li>Designate your <strong>beneficiary</strong> and percentage (must equal 100%)</li>
      <li>Review and click <strong>Submit My Benefits</strong></li>
    </ol>
    <div class="callout blue" style="margin-top:.75rem;">
      <strong>Tip:</strong> To get the full employer match, contribute at least <strong>6% of your pay</strong>. Print your enrollment confirmation for your records.
    </div>
  </div>

  <!-- Plan Admin & Contact -->
  <div class="card">
    <h4 style="margin-bottom:.5rem;">📞 Plan Administration & Contacts</h4>
    <table class="rv-table" style="font-size:1.02rem;">
      <tr><td><strong>Plan Administrator</strong></td><td>Tiger Tracks</td></tr>
      <tr><td><strong>Plan Year End</strong></td><td>December 31</td></tr>
      <tr><td><strong>Address</strong></td><td>3200 S. Ocean Boulevard, Palm Beach, FL 33480</td></tr>
      <tr><td><strong>Phone</strong></td><td>(301) 646-7758</td></tr>
      <tr><td><strong>Email</strong></td><td>elizabeth@tigertracks.ai</td></tr>
    </table>

    <div class="callout" style="margin-top:.75rem;">
      <strong>Benefits Administrators (EKA Planning):</strong><br>
      📞 <strong>Tim Moran</strong>: tim@ekaplanning.com · (516) 944-0200 x112<br>
      📞 <strong>Susan Glaser</strong>: susan@ekaplanning.com · (516) 944-0200 x119
    </div>

    <p style="font-size:0.936rem;color:var(--text-light);margin-top:.75rem;font-style:italic;">This is a summary of the Tiger Tracks 401(k) Plan. For full details, refer to the Summary Plan Description or contact the Plan Administrator. In the event of any discrepancy, the legal plan document controls.</p>
  </div>

  </div><!-- /ben-401k -->

  <!-- DENTAL TAB -->
  <div id="ben-dental" class="ben-tab-content" style="display:none;">
  <div class="card">
    <h3>🦷 Dental Insurance, Guardian PPO</h3>
      <div class="callout green" style="margin-bottom:1rem;">
        <strong>Provider:</strong> Guardian DentalGuard Preferred Network (PPO)<br>
        <strong>Group #:</strong> 00078614<br>
        <strong>Find a Dentist:</strong> <a href="https://www.guardianlife.com" target="_blank">Guardianlife.com</a> → Find A Provider<br>
        <strong>Customer Service:</strong> (888) 600-1600 · M-F 8am-8:30pm ET
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin:.75rem 0;">
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;">$50</div>
          <div style="font-size:0.96rem;font-weight:600;color:var(--text-light);">Deductible (Individual)</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;">$2,500</div>
          <div style="font-size:0.96rem;font-weight:600;color:var(--text-light);">Annual Maximum</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;">100%</div>
          <div style="font-size:0.96rem;font-weight:600;color:var(--text-light);">Preventive Covered</div>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <tr><th style="width:35%">Service Type</th><th>Coverage</th><th>Examples</th></tr>
          <tr><td><strong>Preventive (100%)</strong></td><td>100%</td><td>Cleanings (every 6 mos), exams, X-rays, fluoride (under 14), sealants (under 16)</td></tr>
          <tr><td><strong>Basic (80%)</strong></td><td>80%</td><td>Fillings, root canals, simple extractions, perio surgery, scaling & root planing</td></tr>
          <tr><td><strong>Major (50%)</strong></td><td>50%</td><td>Crowns, bridges, dentures, implants, surgical extractions, inlays/onlays/veneers</td></tr>
        </table>
      </div>

      <h4 style="margin-top:.75rem;">🎁 Maximum Rollover, Oral Health Rewards</h4>
      <p style="font-size:1.02rem;">If your claims stay under $900 in a year, Guardian automatically rolls over unused benefits:</p>
      <ul>
        <li><strong>Rollover Amount:</strong> $450/year (or $700 if you use only in-network)</li>
        <li><strong>Account Limit:</strong> Up to $1,500 banked for future years</li>
      </ul>

      <h4 style="margin-top:.75rem;">💵 Monthly Rates</h4>
      <div class="table-wrap">
        <table>
          <tr><th>Coverage Level</th><th>Monthly Rate</th></tr>
          <tr><td>Employee Only</td><td>$23.49</td></tr>
          <tr><td>Employee + Spouse</td><td>$48.18</td></tr>
          <tr><td>Employee + Child(ren)</td><td>$86.29</td></tr>
          <tr><td>Full Family</td><td>$91.92</td></tr>
        </table>
      </div>

      <p style="font-size:0.96rem;color:var(--text-light);margin-top:.5rem;">Orthodontia: Not covered. Deductible waived for preventive care. Dependent age limit: 26.</p>

      <div class="callout blue" style="margin-top:.75rem;">
        <strong>🚭 Bonus:</strong> Guardian includes a free <strong>Tobacco Cessation Program</strong> through Pelago, personalized coaching, nicotine replacement therapy (gum & patches), and digital tracking tools. Included with your dental benefits at no extra cost.
      </div>
  </div>

  </div><!-- /ben-dental -->

  <!-- VISION TAB -->
  <div id="ben-vision" class="ben-tab-content" style="display:none;">
  <div class="card">
    <h3>👓 Vision Insurance, Guardian VSP</h3>
      <div class="callout green" style="margin-bottom:1rem;">
        <strong>Provider:</strong> VSP Choice Network (Full Feature Plan)<br>
        <strong>Find a Provider:</strong> <a href="https://www.vsp.com" target="_blank">VSP.com</a> · Also available at Visionworks & Pearle Vision<br>
        <strong>Online Shopping:</strong> <a href="https://eyeconic.com" target="_blank">Eyeconic.com</a>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;margin:.75rem 0;">
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;">$10</div>
          <div style="font-size:0.96rem;font-weight:600;color:var(--text-light);">Exam Copay</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;">$25</div>
          <div style="font-size:0.96rem;font-weight:600;color:var(--text-light);">Materials Copay</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;">$150</div>
          <div style="font-size:0.96rem;font-weight:600;color:var(--text-light);">Frame Allowance</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;font-weight:800;">15%</div>
          <div style="font-size:0.96rem;font-weight:600;color:var(--text-light);">LASIK Discount</div>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <tr><th style="width:35%">Service</th><th>In-Network (after copay)</th><th>Out-of-Network</th></tr>
          <tr><td>Eye Exam</td><td><strong>$0</strong></td><td>Up to $39</td></tr>
          <tr><td>Single Vision Lenses</td><td><strong>$0</strong></td><td>Up to $23</td></tr>
          <tr><td>Bifocal Lenses</td><td><strong>$0</strong></td><td>Up to $37</td></tr>
          <tr><td>Trifocal Lenses</td><td><strong>$0</strong></td><td>Up to $49</td></tr>
          <tr><td>Frames</td><td>$150 allowance + 20% off rest</td><td>Up to $46</td></tr>
          <tr><td>Frames (Costco/Walmart/Sam's)</td><td>$80 allowance</td><td>-</td></tr>
          <tr><td>Contacts (Elective)</td><td>$150 allowance</td><td>Up to $100</td></tr>
          <tr><td>Contacts (Medically Necessary)</td><td><strong>$0</strong></td><td>Up to $210</td></tr>
          <tr><td>LASIK/PRK</td><td>Up to 15% off usual charge</td><td>-</td></tr>
        </table>
      </div>

      <h4 style="margin-top:.75rem;">📅 How Often</h4>
      <ul>
        <li><strong>Eye Exams:</strong> Every calendar year</li>
        <li><strong>Lenses</strong> (glasses or contacts): Every calendar year</li>
        <li><strong>Frames:</strong> Every 2 calendar years</li>
      </ul>

      <h4 style="margin-top:.75rem;">💵 Monthly Rates</h4>
      <div class="table-wrap">
        <table>
          <tr><th>Coverage Level</th><th>Monthly Rate</th></tr>
          <tr><td>Employee Only</td><td>$5.49</td></tr>
          <tr><td>Employee + Spouse</td><td>$10.39</td></tr>
          <tr><td>Employee + Child(ren)</td><td>$10.58</td></tr>
          <tr><td>Full Family</td><td>$16.76</td></tr>
        </table>
      </div>

      <p style="font-size:0.96rem;color:var(--text-light);margin-top:.5rem;">Dependent age limit: 26. Vision is sold with Dental. Extra $20 on select frame brands in-network.</p>

      <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;margin-top:.75rem;font-size:1.02rem;">
        <strong>💡 Example Savings:</strong> David gets an eye exam ($171) and new glasses ($350). Total cost: $521. With Guardian Vision, he pays just $131, <strong>saving $390</strong>.
      </div>
  </div>

  </div><!-- /ben-vision -->

  <!-- PTO TAB -->
  <div id="ben-pto" class="ben-tab-content" style="display:none;">
    <div class="callout green" style="margin-bottom:1rem;">
      <strong>Policy:</strong> Tiger Tracks offers flexible unlimited PTO with a 10-15 day/year benchmark.<br>
      <strong>Requirements:</strong> Must be employed 60+ days before requesting time off.
    </div>

    <div class="card">
      <h3>🏖️ PTO Guidelines</h3>
      <h4 style="margin-top:.5rem;">Request Requirements</h4>
      <ul>
        <li>Request <strong>2 weeks in advance</strong> for 1-2 days off</li>
        <li>Request <strong>1 month in advance</strong> for 3+ consecutive days</li>
        <li>Create a <strong>coverage plan</strong> (reassign client tasks, update shared docs, brief your team)</li>
        <li>Submit through the <strong>PTO Request</strong> tool on this site OR through <strong>isolved</strong> (Time → Dashboard → Leave Request)</li>
        <li>Manager must approve within <strong>2 business days</strong></li>
      </ul>

      <h4 style="margin-top:.75rem;">Types of Leave</h4>
      <div class="table-wrap">
        <table>
          <tr><th>Type</th><th>Details</th></tr>
          <tr><td><strong>🏖️ Vacation</strong></td><td>Flexible unlimited PTO. 10-15 days/year benchmark. Manager approval required.</td></tr>
          <tr><td><strong>🤒 Sick Days</strong></td><td>Notify manager ASAP. No advance notice needed for emergencies.</td></tr>
          <tr><td><strong>🧠 Mental Health</strong></td><td>Treated same as sick days. No stigma. Take care of yourself.</td></tr>
          <tr><td><strong>💐 Bereavement</strong></td><td>14 days (immediate family) or 7 days (extended family). Paid.</td></tr>
          <tr><td><strong>👶 Parental Leave</strong></td><td>12 weeks paid after 9 months of employment (birth/adoption/foster).</td></tr>
          <tr><td><strong>⚖️ Jury Duty</strong></td><td>Paid time off for duration of service.</td></tr>
          <tr><td><strong>🗳️ Voting</strong></td><td>Reasonable time off to vote if polls conflict with work hours.</td></tr>
        </table>
      </div>

      <h4 style="margin-top:.75rem;">15 Paid Holidays (2026)</h4>
      <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem;">
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">New Year's Day</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">MLK Day</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Presidents' Day</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Good Friday</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Memorial Day</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Juneteenth</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Independence Day</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Labor Day</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Columbus Day</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Veterans Day</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Thanksgiving</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Day After Thanksgiving</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Christmas Eve</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Christmas Day</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">New Year's Eve</span>
      </div>

      <div style="margin-top:1rem;">
        <button onclick="navigateTo('pto-request')" style="background:var(--accent);color:#fff;border:none;padding:.6rem 1.5rem;border-radius:8px;font-size:1.02rem;font-weight:700;cursor:pointer;">📝 Submit a PTO Request →</button>
      </div>
    </div>
  </div><!-- /ben-pto -->


</div>

<!-- ===================== BONUS STRUCTURES ===================== -->
<div class="section" id="bonuses">
  <div class="section-header"><span class="emoji">💰</span><h2>Bonus Structures</h2></div>

  <div style="display:flex;gap:.5rem;margin:0 0 1.5rem;flex-wrap:wrap;">
    <button class="rv-tab active" data-btab="quarterly" onclick="switchBonusTab('quarterly')">📊 Quarterly Bonus Policy</button>
    <button class="rv-tab" data-btab="referral" onclick="switchBonusTab('referral')">🎁 Referral Bonuses</button>
  </div>

  <!-- QUARTERLY BONUS -->
  <div id="bonus-quarterly" class="bonus-tab-content">
    <div class="card">
      <h3>📊 Tiger Tracks Quarterly Bonus Policy</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:1rem;">Effective Q4 2025</p>

      <div class="callout green" style="margin-bottom:1rem;">
        <strong>Purpose:</strong> Incentivize and reward those who go above and beyond in client revenue stewardship to deliver impact to the business.
      </div>

      <h4>Who's Eligible</h4>
      <ul>
        <li>All <strong>account team members who manage revenue</strong>: the plan does not depend on job title</li>
        <li>Eligible after <strong>30 calendar days</strong> in role</li>
        <li>Prorated by calendar days active during the quarter</li>
        <li>Standard company leave policies apply to proration</li>
        <li>Managers have final signoff on eligibility/amount (including increases and discretionary bonuses)</li>
      </ul>
    </div>

    <div class="card">
      <h3>💵 Bonus Tiers, Based on Quarterly Managed Revenue</h3>

      <!-- Visual tier chart -->
      <div style="display:flex;align-items:end;gap:4px;height:200px;margin:1.5rem 0;padding:0 1rem;">
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
          <div style="font-size:0.84rem;font-weight:700;margin-bottom:4px;">$0</div>
          <div style="width:100%;background:#e5e7eb;border-radius:4px 4px 0 0;height:20px;;color:#1A1A1A"></div>
          <div style="font-size:0.78rem;margin-top:4px;text-align:center;">$0–60K</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
          <div style="font-size:0.84rem;font-weight:700;margin-bottom:4px;">$1,000</div>
          <div style="width:100%;background:var(--accent);border-radius:4px 4px 0 0;height:40px;"></div>
          <div style="font-size:0.78rem;margin-top:4px;text-align:center;">$60–90K</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
          <div style="font-size:0.84rem;font-weight:700;margin-bottom:4px;">$3,000</div>
          <div style="width:100%;background:var(--accent-light);border-radius:4px 4px 0 0;height:100px;"></div>
          <div style="font-size:0.78rem;margin-top:4px;text-align:center;">$90–120K</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
          <div style="font-size:0.84rem;font-weight:700;margin-bottom:4px;">$5,000</div>
          <div style="width:100%;background:var(--accent-dark);border-radius:4px 4px 0 0;height:150px;"></div>
          <div style="font-size:0.78rem;margin-top:4px;text-align:center;">$120–150K</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
          <div style="font-size:0.84rem;font-weight:700;margin-bottom:4px;">$5K + 18%</div>
          <div style="width:100%;background:linear-gradient(180deg,#1A7477,var(--accent));border-radius:4px 4px 0 0;height:190px;"></div>
          <div style="font-size:0.78rem;margin-top:4px;text-align:center;">>$150K</div>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <tr><th>Tier</th><th>Quarterly Managed Revenue</th><th>Bonus</th></tr>
          <tr><td><strong>1</strong></td><td>$0 – $60,000</td><td>$0</td></tr>
          <tr><td><strong>2</strong></td><td>$60,000 – $90,000</td><td><strong>$1,000</strong></td></tr>
          <tr><td><strong>3</strong></td><td>$90,001 – $120,000</td><td><strong>$3,000</strong></td></tr>
          <tr><td><strong>4</strong></td><td>$120,001 – $150,000</td><td><strong>$5,000</strong></td></tr>
          <tr><td><strong>5</strong></td><td>> $150,000</td><td><strong>$5,000 + 18%</strong> of amount above $150K</td></tr>
        </table>
      </div>
    </div>

    <div class="card">
      <h3>🧮 Calculation Examples</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin:.75rem 0;">
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
          <h4 style="margin:0 0 .5rem;font-size:1.08rem;">Example 1: $103,000 Managed Revenue</h4>
          <p style="margin:0;font-size:1.02rem;">Falls in Tier 3 ($90,001–$120,000)</p>
          <div style="font-size:1.8rem;font-weight:800;color:var(--success);margin-top:.5rem;">Bonus: $3,000</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
          <h4 style="margin:0 0 .5rem;font-size:1.08rem;">Example 2: $158,000 Managed Revenue</h4>
          <p style="margin:0;font-size:1.02rem;">Tier 5: $5,000 + 18% × ($158K − $150K)</p>
          <p style="margin:.25rem 0 0;font-size:1.02rem;">= $5,000 + (18% × $8,000) = $5,000 + $1,440</p>
          <div style="font-size:1.8rem;font-weight:800;color:var(--success);margin-top:.5rem;">Bonus: $6,440</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>⚠️ Quality Guardrails</h3>
      <ul>
        <li>Revenue for an account month <strong>only counts if it meets the client health threshold</strong> defined by the operations team</li>
        <li>If a client <strong>churns due to the team's performance</strong>, that month's revenue is excluded from their managed revenue total</li>
        <li>If performance is deemed <strong>negligent</strong> by teammates or leadership, that month's bonus is forfeited</li>
      </ul>
      <div class="callout blue" style="margin-top:.75rem;">
        <strong>Payment:</strong> Paid within <strong>60 days</strong> of quarter close. Discretionary bonuses may be paid at any time per leadership's decision.
      </div>
    </div>

    <div class="card">
      <h3>📋 Governance</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;">
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">🧮</div>
          <div style="font-size:1.02rem;font-weight:700;margin-top:.25rem;">Finance</div>
          <div style="font-size:0.96rem;color:var(--text-light);">Owns calculations</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">📣</div>
          <div style="font-size:1.02rem;font-weight:700;margin-top:.25rem;">People Operations</div>
          <div style="font-size:0.96rem;color:var(--text-light);">Communicates payouts</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">✍️</div>
          <div style="font-size:1.02rem;font-weight:700;margin-top:.25rem;">Exceptions</div>
          <div style="font-size:0.96rem;color:var(--text-light);">Require COO + CFO written approval</div>
        </div>
      </div>
    </div>
  </div>

  <!-- REFERRAL BONUSES -->
  <div id="bonus-referral" class="bonus-tab-content" style="display:none;">
    <div class="section-header" style="margin-top:0;"><span class="emoji">🎁</span><h2>Referral Bonus Program</h2></div>

    <div style="display:flex;gap:.5rem;margin:0 0 1.5rem;flex-wrap:wrap;">
      <button class="rv-tab active" data-rtab="employee" onclick="switchRefTab('employee')">👥 Employee Referrals</button>
      <button class="rv-tab" data-rtab="client" onclick="switchRefTab('client')">🤝 Client Referrals</button>
    </div>

  <!-- EMPLOYEE REFERRALS -->
  <div id="ref-employee" class="ref-tab-content">
    <div class="card">
      <h3>👥 Employee Referral Bonus, $2,000</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin:.75rem 0;">
        <div style="background:#0A1119;color:#FFFFFF;padding:1.25rem;border-radius:12px;text-align:center;">
          <div style="font-size:2.4rem;font-weight:800;color:var(--success);">$2,000</div>
          <div style="font-size:1.02rem;font-weight:600;">Per Qualified Hire</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1.25rem;border-radius:12px;text-align:center;">
          <div style="font-size:2.4rem;">90</div>
          <div style="font-size:1.02rem;font-weight:600;">Days to Qualify</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1.25rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">📝</div>
          <div style="font-size:1.02rem;font-weight:600;margin-top:.25rem;"><a href="https://forms.gle/5gFaRTSHr7sc5iGY9" target="_blank">Submit Referral →</a></div>
        </div>
      </div>

      <p style="margin:.75rem 0;">Tiger Tracks is always seeking talented individuals. Research shows new hires through employee referrals are often top contributors, stay longer, and are more cost-effective.</p>

      <h4>How It Works</h4>
      <ol class="steps">
        <li><strong>Submit the referral</strong> via the <a href="https://forms.gle/5gFaRTSHr7sc5iGY9" target="_blank">designated referral form</a> with complete, accurate candidate info</li>
        <li><strong>Candidate is evaluated</strong> through Tiger Tracks' standard hiring procedures</li>
        <li><strong>If hired</strong>, the referred candidate must complete 90 days of continuous employment</li>
        <li><strong>Bonus paid</strong> in the pay period following the 90-day completion</li>
      </ol>

      <h4>Eligibility</h4>
      <ul>
        <li>All full-time Tiger Tracks employees are eligible</li>
        <li>Referrals must be submitted through the official form</li>
        <li>Candidates already in the company database or previously considered are not eligible</li>
      </ul>
    </div>

    <!-- Outreach Templates -->
    <div class="card">
      <h3 class="collapsible" onclick="toggle(this)">📧 Ready-to-Use Outreach Templates</h3>
      <div class="collapsible-content">
        <h4>Email Template</h4>
        <div class="template-box">
          <div class="label">Copy & Customize</div>
          <p><strong>Subject:</strong> Exciting Opportunity at Tiger Tracks - Account Manager Role</p>
          <p>Hi [Name],</p>
          <p>I hope you're doing well! I wanted to share an exciting opportunity with you. Tiger Tracks, a fast-growing digital marketing agency founded by former Google marketing leaders, is looking to expand our team with talented Account Managers. We've grown rapidly, earning us a spot on the 2025 Inc 5000 list of the fastest-growing private companies in America and are looking for professionals to help scale our success.</p>
          <p>As a team member at Tiger Tracks, you will be the strategic advisor for a diverse portfolio of top clients, leveraging your digital marketing expertise to drive their business growth. We're seeking someone with 5+ years of hands-on experience in paid media, strong Google Ads and Meta Ads knowledge, and a passion for client success.</p>
          <p>If you or someone you know might be a great fit, I'd love to connect and discuss further. Let me know if you're interested!</p>
          <p>Best,<br>[Your Name]</p>
        </div>

        <h4 style="margin-top:1rem;">LinkedIn Template</h4>
        <div class="template-box">
          <div class="label">Copy & Customize</div>
          <p>We're hiring! 🚀</p>
          <p>Tiger Tracks, a digital marketing agency founded by former Google marketing leaders, is hiring Account Managers! We've grown rapidly, earning us a spot on the 2025 Inc 5000 list of the fastest-growing private companies in America and are looking for professionals to help scale our success.</p>
          <p>As a team member at Tiger Tracks, you will be the strategic advisor for a diverse portfolio of top clients, leveraging your digital marketing expertise to drive their business growth. We're seeking someone with 5+ years of hands-on experience in paid media, strong Google Ads and Meta Ads knowledge, and a passion for client success.</p>
          <p>If you have experience in paid media and are ready to join a fast-growing team focused on excellence, let's connect!</p>
        </div>

        <h4 style="margin-top:1rem;">Text Message Template</h4>
        <div class="template-box">
          <div class="label">Copy & Customize</div>
          <p>Hi [Name], I wanted to let you know about an exciting opportunity at Tiger Tracks! We're looking for experienced digital marketers to join our team and help manage top-tier digital marketing clients. If you have 5+ years of paid media experience and are looking for a new challenge, let me know!</p>
        </div>
      </div>
    </div>
  </div>

  <!-- CLIENT REFERRALS -->
  <div id="ref-client" class="ref-tab-content" style="display:none;">
    <div class="card">
      <h3>🤝 Client Referral Bonus, 100% of Month 1 Revenue</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin:.75rem 0;">
        <div style="background:#0A1119;color:#FFFFFF;padding:1.25rem;border-radius:12px;text-align:center;">
          <div style="font-size:2.1rem;font-weight:800;color:var(--success);">100%</div>
          <div style="font-size:1.02rem;font-weight:600;">of First Month's Revenue</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1.25rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">💰</div>
          <div style="font-size:1.02rem;font-weight:600;">Paid Upon Month 1 Invoice</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1.25rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">📝</div>
          <div style="font-size:1.02rem;font-weight:600;margin-top:.25rem;"><a href="https://forms.gle/oTcvDTsXykmcnSmg9" target="_blank">Submit Referral →</a></div>
        </div>
      </div>

      <p style="margin:.75rem 0;">Tiger Tracks partners with ambitious brands and investor-backed companies that want measurable improvements in paid media performance. Our strongest growth has consistently come through trusted introductions.</p>

      <h4>How It Works</h4>
      <ol class="steps">
        <li><strong>Reach out directly</strong> to a potential new client via email, text, or call</li>
        <li><strong>Submit the referral</strong> via the <a href="https://forms.gle/oTcvDTsXykmcnSmg9" target="_blank">designated referral form</a></li>
        <li><strong>Client signs a contract</strong> with Tiger Tracks</li>
        <li><strong>Bonus paid</strong> once the first month's invoice is received</li>
      </ol>

      <h4>Eligibility</h4>
      <ul>
        <li>All full-time Tiger Tracks employees are eligible</li>
        <li>Clients already in discussions with Tiger Tracks or current clients are not eligible</li>
        <li>Subject to management team approval</li>
      </ul>

      <div class="callout green" style="margin-top:1rem;">
        <strong>🎯 Unique Offering:</strong> Tiger Tracks offers a <strong>complimentary Digital Marketing Audit</strong> to prospective clients, a detailed analysis of their Google Ads, Meta Ads, and TikTok Ads strategies. This is a powerful door-opener when making referrals!
      </div>
    </div>

    <!-- Client Outreach Templates -->
    <div class="card">
      <h3 class="collapsible" onclick="toggle(this)">📧 Ready-to-Use Outreach Templates</h3>
      <div class="collapsible-content">
        <h4>About Tiger Tracks (Background for Conversations)</h4>
        <div class="template-box">
          <div class="label">Context</div>
          <p>Tiger Tracks is a digital marketing agency with 20+ years of combined experience working at Google amongst its founding team. At Google they managed the ad campaigns for the highest-spending brands in the world (Verizon, Etsy, Dell, Snapchat, AT&T, Under Armor, etc.), and now help select companies improve digital marketing performance. They also work directly with PE funds (e.g. General Catalyst) and VC funds (e.g. Thiel Capital) to help specific portfolio companies, with a specialization in Direct-to-Consumer businesses in services, e-commerce, and more. Their CEO was also formerly Chief Growth Officer for a D2C company where he leveraged digital marketing to scale them from $40MM to over a $350MM valuation.</p>
        </div>

        <h4 style="margin-top:1rem;">Email Template, New Client</h4>
        <div class="template-box">
          <div class="label">Copy & Customize</div>
          <p>Tiger Tracks was founded by former Google marketing leaders with decades of experience managing top-tier digital ad campaigns for top brands like Verizon, Etsy, and Dell. We partner with companies ranging from private equity firms to publicly traded corporations, relentlessly pursuing excellence in the digital marketing space.</p>
          <p>We have a proven track record of helping businesses significantly improve their marketing performance, often reducing customer acquisition costs by over 50% while increasing ad-driven revenue. We have also partnered with notable private equity and venture capital funds like Tenex Capital and Thiel Capital to assist portfolio companies in achieving outstanding results.</p>
          <p>One of the unique services Tiger Tracks offers is a <strong>complimentary Digital Marketing Audit</strong>. This audit is an in-depth analysis of your current digital marketing setup across platforms like Google Ads, Meta Ads, and TikTok Ads. The audit aims to uncover gaps, highlight untapped opportunities, and provide a tailored plan to enhance your marketing efforts. The findings are shared via a screenshare, providing actionable insights to enhance your marketing performance.</p>
          <p>Please let me know if you are interested in a formal introduction.</p>
        </div>

        <h4 style="margin-top:1rem;">LinkedIn Template, New Client</h4>
        <div class="template-box">
          <div class="label">Copy & Customize</div>
          <p>We've helped businesses cut customer acquisition costs by 50% while boosting ad-driven revenue - and we'd love to do the same for you!</p>
          <p>As part of our mission to help businesses succeed, we're offering a complimentary Digital Marketing Audit. This audit is an in-depth look at your current Google Ads, Meta Ads, and TikTok Ads strategy, identifying gaps and opportunities. We'll then share tailored recommendations to help you unlock your full marketing potential.</p>
          <p>Want to learn more? Feel free to reach out, and I'd be happy to connect you with our team for a formal introduction.</p>
        </div>

        <h4 style="margin-top:1rem;">Digital Marketing Audit Pitch</h4>
        <div class="template-box">
          <div class="label">Use This When Introducing the Audit</div>
          <p>Whenever meeting with new companies, a helpful first step Tiger Tracks offers is to perform a <strong>free digital marketing audit</strong>. During the audit we deep-dive your current digital marketing setup (Google Ads, Meta Ads, TikTok Ads, more) to identify gaps, highlight untapped opportunities, and provide a customized plan to improve performance. We then present the specific findings over screen share along with a go-forward recommendation, it makes for very helpful analysis at no cost.</p>
          <p>Typical outcomes include uncovering significant wasted ad spend due to incorrect targeting/settings, improving conversion rates of ad creative and landing pages, fixing key tracking issues, and more. As a result, companies are often able to <strong>reduce their CaC by more than 50%</strong> while increasing ads-driven revenue.</p>
        </div>
      </div>
    </div>
  </div>
  </div><!-- /bonus-referral -->
</div><!-- /bonuses -->

<!-- ===================== INVOICING ===================== -->
<div class="section" id="invoicing">
  <div class="section-header"><span class="emoji">🧾</span><h2>Invoicing</h2></div>

  <div style="display:flex;gap:.75rem;margin-bottom:1.5rem;flex-wrap:wrap;">
    <button class="inv-tab-btn active" onclick="switchInvTab('ar')" id="inv-btn-ar" style="padding:.5rem 1.25rem;border:none;border-radius:6px;cursor:pointer;font-family:inherit;font-size:1.02rem;font-weight:600;background:var(--accent);color:#fff;">📋 AR Procedures</button>
    <button class="inv-tab-btn" onclick="switchInvTab('process')" id="inv-btn-process" style="padding:.5rem 1.25rem;border:none;border-radius:6px;cursor:pointer;font-family:inherit;font-size:1.02rem;font-weight:600;background:var(--card);color:#94a3b8;">🧾 Invoicing Process</button>
  </div>

  <!-- AR Procedures -->
  <div id="inv-ar">
    <h3 style="color:var(--accent);margin-bottom:1rem;">Accounts Receivable Procedures</h3>
    <div class="card" style="padding:1.25rem;">
      <p style="margin-bottom:1rem;">Receivables are billed as close to the first day of the month as possible, for the previous month. QuickBooks Online is being utilized for receivables. Recurring invoices are established and will be used for the invoice template for the month.</p>

      <h4 style="color:var(--accent);margin:1.25rem 0 .75rem;">Account Manager Procedures</h4>
      <ul style="padding-left:1.5rem;">
        <li style="margin-bottom:.5rem;">Account Managers use the <strong>Invoice Calculation Spreadsheet (ICS)</strong> for the month the revenue was earned to calculate the amount to appear on the invoice.</li>
        <li style="margin-bottom:.5rem;">The amounts for each service managed are entered into the spreadsheet for each of their clients. Make sure to include all spend for each channel under TT management, including paused or deleted campaigns. When complete, this is initialed on the Summary Tab.</li>
        <li style="margin-bottom:.5rem;">A secondary reviewer QA's the invoice. When complete, this is initialed on the Summary Tab.</li>
        <li style="margin-bottom:.5rem;">Screenshots are used to verify the amount entered into the spreadsheet.</li>
        <li style="margin-bottom:.5rem;">Invoice calculation percentages are updated if there is a change in the contract. Do not hard key numbers in any space that is not blue. Let the person invoicing know if there is an issue with the calculation.</li>
        <li style="margin-bottom:.5rem;">If there is something to note for the invoicer (waiting on contact info, change in terms, unsure of calculator, wording change, etc.), <strong>highlight the tab in RED</strong> and on the summary page <strong>highlight the name in RED</strong>.</li>
        <li style="margin-bottom:.5rem;">Completing the Invoicing Calculation workbook is <strong>due by the 2nd business day</strong> of the subsequent month and <strong>QA'd by the 3rd business day</strong>.</li>
        <li style="margin-bottom:.5rem;">All general questions should be added to the <strong>#TT-client-invoicing</strong> channel.</li>
      </ul>

      <h4 style="color:var(--accent);margin:1.25rem 0 .75rem;">New Client During the Month</h4>
      <p style="margin-bottom:.5rem;">If there is a new client during the month, the Primary adds <strong>Dawn DiPirro</strong> to the channel and provides the following information:</p>
      <ul style="padding-left:1.5rem;">
        <li style="margin-bottom:.35rem;">Invoice Calculation percentages and minimums (the contract)</li>
        <li style="margin-bottom:.35rem;">Client name and physical address</li>
        <li style="margin-bottom:.35rem;">Terms (how many days after the invoice is sent the invoice is due)</li>
        <li style="margin-bottom:.35rem;">Email(s) to send the invoices</li>
      </ul>

      <h4 style="color:var(--accent);margin:1.25rem 0 .75rem;">Client Churn During the Month</h4>
      <p>Calculate the amount due for the period of management on that month's invoicing sheet and let <strong>Dawn DiPirro</strong> know that an invoice needs to be sent to the client. Please do this as close to the churn date as possible.</p>
    </div>
  </div>

  <!-- Invoicing Process -->
  <div id="inv-process" style="display:none;">
    <h3 style="color:var(--accent);margin-bottom:1rem;">Invoicing Process</h3>

    <!-- Drive folder card -->
    <a href="https://drive.google.com/drive/folders/11ym1440ckzxxJ2WdQkcuJ4PXXejwfvr2?usp=drive_link" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:1rem;background:#1B2126;border:1px solid rgba(34,159,161,0.3);border-left:4px solid #229FA1;border-radius:12px;padding:1rem 1.25rem;margin-bottom:1.25rem;text-decoration:none;transition:border-color .2s,box-shadow .2s;" onmouseover="this.style.boxShadow='0 0 16px rgba(34,159,161,0.18)';this.style.borderColor='rgba(34,159,161,0.6)';" onmouseout="this.style.boxShadow='';this.style.borderColor='rgba(34,159,161,0.3)';">
      <div style="flex-shrink:0;width:44px;height:44px;background:rgba(34,159,161,0.12);border-radius:10px;display:flex;align-items:center;justify-content:center;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-family:Inter,system-ui,sans-serif;font-size:1.08rem;font-weight:700;color:#FFFFFF;margin-bottom:.2rem;">Invoicing Templates &amp; Resources</div>
        <div style="font-family:Inter,system-ui,sans-serif;font-size:0.96rem;color:#9E9E9E;">Shared Google Drive folder &mdash; ICS workbooks, invoice templates &amp; reference files</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
    </a>

    <div class="card" style="padding:1.25rem;">
      <p style="margin-bottom:1rem;">Receivables are billed as close to the first day of the month as possible, for the previous month. QuickBooks Online is being utilized for receivables. Recurring invoices are established and will be used for the invoice template for the month.</p>

      <h4 style="color:var(--accent);margin:1.25rem 0 .75rem;">Account Manager Procedures</h4>
      <ul style="padding-left:1.5rem;">
        <li style="margin-bottom:.5rem;">Account Managers use the <strong>Invoice Calculation Spreadsheet (ICS)</strong> for the month the revenue was earned to calculate the amount to appear on the invoice.</li>
        <li style="margin-bottom:.5rem;">The amounts for each service managed are entered into the spreadsheet for each of their clients. Make sure to include all spend for each channel under TT management, including paused or deleted campaigns. When complete, this is initialed on the Summary Tab.</li>
        <li style="margin-bottom:.5rem;">A secondary reviewer QA's the invoice. When complete, this is initialed on the Summary Tab.</li>
        <li style="margin-bottom:.5rem;">Screenshots are used to verify the amount entered into the spreadsheet.</li>
        <li style="margin-bottom:.5rem;">Invoice calculation percentages are updated if there is a change in the contract. Do not hard key numbers in any space that is not blue. Let the person invoicing know if there is an issue with the calculation.</li>
      </ul>

      <h4 style="color:var(--accent);margin:1.25rem 0 .75rem;">New Client Setup</h4>
      <p style="margin-bottom:.5rem;">If there is a new client during the month, the Primary uses the <strong>"New Clients"</strong> channel to provide all required information:</p>
      <ul style="padding-left:1.5rem;">
        <li style="margin-bottom:.35rem;">Invoice Calculation percentages and minimums</li>
        <li style="margin-bottom:.35rem;">Client name (and address if applicable)</li>
        <li style="margin-bottom:.35rem;">Terms</li>
        <li style="margin-bottom:.35rem;">Email(s) to send the invoices</li>
      </ul>
      <p style="margin-top:.5rem;">The EA will add that client to QuickBooks and the Invoicing Calculation workbook.</p>

      <h4 style="color:var(--accent);margin:1.25rem 0 .75rem;">Important Notes</h4>
      <ul style="padding-left:1.5rem;">
        <li style="margin-bottom:.5rem;">If there is something to note for the invoicer (waiting on contact info, change in terms, unsure of calculator, wording change, add wording even though minimum billed, etc.), <strong>highlight the tab in RED</strong> and on the summary page <strong>highlight the name in RED</strong>.</li>
        <li style="margin-bottom:.5rem;">Completing the Invoicing Calculation workbook is <strong>due by the 2nd business day</strong> of the subsequent month and <strong>QA'd by the 3rd business day</strong>.</li>
      </ul>
    </div>
  </div>

</div><!-- /invoicing -->

<!-- ===================== HANDBOOK ===================== -->
<div class="section" id="handbook">
<div class="section-header" style="margin-bottom:1.5rem;"><span class="emoji">📖</span><h2>Employee Handbook</h2></div>
<p style="color:var(--text-light);margin-bottom:1.5rem;font-style:italic;">Tiger Tracks Employee Handbook — February 4, 2026</p>
<div class="callout" style="margin-bottom:1.5rem;">
<strong>About This Handbook/Disclaimer</strong>
<p style="font-size:0.96rem;">This handbook is designed to provide employees with general information about policies, practices, and expectations at Tiger Tracks. It is intended to serve as a helpful reference and guide.</p>
<p style="font-size:0.96rem;">This handbook does not create a contract of employment, express or implied, nor does it guarantee employment for any specific duration. Employment with Tiger Tracks is at will. This means that either the employee or the Company may terminate the employment relationship at any time, with or without cause or notice, subject to applicable law.</p>
<p style="font-size:0.96rem;">No Company representative other than the CEOs may modify at-will status and/or provide any special arrangement concerning terms or conditions of employment in an individual case or generally and any such modification must be in a signed writing.</p>
<p style="font-size:0.96rem;">The Company reserves the right to interpret, modify, suspend, amend, or terminate any policies, benefits, or practices described in this handbook at any time, with or without notice, except where prohibited by law.</p>
<p style="font-size:0.96rem;">Where other Company documents, benefit plans, or policies address the same subject matter, those documents govern.</p>
</div>
<div class="card" style="margin-bottom:1.5rem;">
<h3 style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.26rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid #229FA1;">Section 1- Governing Principles of Employment</h3>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">1-1 Introduction</h4>
<div class="collapsible-content">
<p>For employees commencing employment with Tiger Tracks, we extend a warm and sincere welcome.</p>
<p>For employees who have been with us, thank you for your continued contributions and dedication.</p>
<p>We wish you success and fulfillment at Tiger Tracks. Our employees are central to the services we provide, the relationships we build with clients, and the opportunities we create for the future.</p>
<p>Cliff Simmons &amp; Henry Kittle</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">1-2 Equal Employment Opportunity</h4>
<div class="collapsible-content">
<p>Tiger Tracks is an Equal Opportunity Employer. The Company does not discriminate against applicants or employees on the basis of actual or perceived race, color, creed, religion, national origin, ancestry, citizenship status, age, sex or gender (including pregnancy, childbirth, pregnancy-related conditions, and lactation), gender identity or expression (including transgender status), sexual orientation, marital status, military service or veteran status, physical or mental disability, genetic information, or any other characteristic protected by applicable federal, state, or local law.</p>
<p>This policy applies to all employment decisions, including recruitment, hiring, placement, promotion, transfer, training, compensation, benefits, discipline, and termination.</p>
<p>Employees with questions or concerns regarding equal employment opportunity or discrimination are encouraged to report those concerns to their Manager or People Operations. Retaliation against any individual for raising a concern or participating in an investigation is strictly prohibited.</p>
<p>Violations of this policy, including retaliation, may result in disciplinary action up to and including termination.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">1-3 Reasonable Accommodations &amp; Interactive Dialogue</h4>
<div class="collapsible-content">
<p>Tiger Tracks complies with applicable federal, New York State, and local laws governing reasonable accommodations, including the Americans with Disabilities Act (ADA), the New York State Human Rights Law, and the Pregnant Workers Fairness Act (PWFA).</p>
<p>The Company will engage in a timely, good-faith interactive dialogue with applicants or employees who request an accommodation or where the Company becomes aware that an accommodation may be needed due to:</p>
<ul>
<li>Disability, meaning any physical, medical, mental, or psychological impairment, or a history or record of such impairment;</li>
<li>Sincerely held religious beliefs and practices;</li>
<li>Needs as a victim of domestic violence, sex offenses, or stalking;</li>
<li>Needs related to pregnancy, childbirth, or related medical conditions; and/or</li>
<li>Any other reason required by applicable law, unless the accommodation would impose an undue hardship on the operation of our business.</li>
</ul>
<p>Reasonable accommodations will be provided unless doing so would impose an undue hardship on business operations.</p>
<p>Accommodation requests should be directed to People Operations. The Company may request reasonable documentation where permitted by law. All medical or accommodation-related information will be kept confidential to the extent required by law.</p>
<p>Tiger Tracks prohibits retaliation against any individual who requests an accommodation or participates in the interactive dialogue process.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">1-4 Non-Harassment</h4>
<div class="collapsible-content">
<p>Tiger Tracks is committed to maintaining a work environment free from unlawful harassment, including harassment based on any protected characteristic under federal, New York State, or local law.</p>
<p>Harassment is defined as unwelcome conduct that has the purpose or effect of creating an intimidating, hostile, or offensive working environment or unreasonably interfering with an individual’s work performance.</p>
<p>This policy applies to conduct occurring:</p>
<ul>
<li>In the workplace</li>
<li>While working remotely</li>
<li>During Company-sponsored events</li>
<li>In any work-related context involving employees, clients, vendors, or third parties</li>
</ul>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Reporting</p>
<p>Employees who experience or witness harassment must promptly report the conduct to their Manager or People Operations. If the complaint involves a Manager, employees may escalate the concern to People Operations or senior leadership.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Investigation &amp; Confidentiality</p>
<p>All reports will be investigated promptly and impartially. Information will be shared only on a need-to-know basis. Confidentiality cannot be guaranteed, but discretion will be maintained to the extent practicable.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">No Retaliation</p>
<p>Retaliation against individuals who report harassment or participate in an investigation is strictly prohibited and will result in disciplinary action.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">1-5 Drug-Free And Alcohol-Free Workplace</h4>
<div class="collapsible-content">
<p>Tiger Tracks maintains a drug-free and alcohol-free workplace in accordance with applicable law. Employees may not use, possess, distribute, or be under the influence of illegal drugs or alcohol while performing Company work or representing the Company.</p>
<p>This policy applies regardless of work location, including remote work environments, where impairment could impact job performance or safety.</p>
<p>Nothing in this policy prohibits lawful off-duty conduct that does not impact work performance, safety, or Company obligations, to the extent protected by applicable law.</p>
<p>Violations may result in disciplinary action up to and including termination.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">1-6 Workplace Violence</h4>
<div class="collapsible-content">
<p>Tiger Tracks is strongly committed to providing a safe work environment, including remote workspaces. The purpose of this policy is to minimize the risk of personal injury to employees and damage to Company and personal property.</p>
<p>Tiger Tracks prohibits threats, intimidation, or acts of violence in any work-related context, including remote work environments.</p>
<p>Employees should immediately report any threats or concerning behavior to management or People Operations. Reports will be investigated promptly, and retaliation for good-faith reporting is prohibited.</p>
<p>The Company reserves the right to take appropriate corrective action to protect employee safety.</p>
</div>
</div></div>
<div class="card" style="margin-bottom:1.5rem;">
<h3 style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.26rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid #229FA1;">Section 2- Operational Policies</h3>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-1 Employee Classifications</h4>
<div class="collapsible-content">
<p>For purposes of this handbook, all Tiger Tracks employees fall within one of the classifications below.</p>
<ul>
<li>Full-Time Employees - Employees who regularly work at least 40 hours per week.</li>
<li>Part-Time Employees - Employees who regularly work fewer than 40 hours per week.</li>
<li>Short-Term Employees - Employees who were hired for a specific short-term project, or on a short-term freelance, per diem or temporary basis. Short-Term employees generally are not eligible for Company benefits, but are eligible to receive statutory benefits.</li>
</ul>
<p>Employees are also classified as exempt or non-exempt under applicable wage and hour laws. Exempt employees are generally paid a salary and are not eligible for overtime. Employees will be informed of their classification at hire and of any changes.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">At-Will Employment</p>
<p>Employment with Tiger Tracks is at-will. This means either the employee or Tiger Tracks may end the employment relationship at any time, with or without cause or notice, subject to applicable law. No policy, statement, practice, or supervisor communication alters at-will employment unless in a written agreement signed by an authorized executive of Tiger Tracks.</p>
<p>Nothing in this handbook limits employees’ rights under Section 7 of the National Labor Relations Act.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">General Expectations</p>
<p>Employees are expected to comply with Company policies, meet role expectations, and communicate proactively regarding availability and work status. Failure to meet expectations may result in corrective action, up to and including termination, subject to applicable law.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-2 Introductory  Period</h4>
<div class="collapsible-content">
<p>Upon joining Tiger Tracks, team members enter a ninety (90) day introductory period to learn the role, working style, and performance expectations, and to ensure mutual alignment. All team members remain at-will during and after the introductory period. Completion of the introductory period does not change at-will status and does not guarantee continued employment.</p>
<p>During this period, employees should expect regular check-ins with their manager and People Operations. At the end of the introductory period, People Operations will meet with the employee to review the experience and performance to date.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-3 Working Hours And Schedule</h4>
<div class="collapsible-content">
<p>Tiger Tracks operates as a remote-first organization. Standard business hours are generally Monday through Friday, 9:00 a.m. to 5:00 p.m. Eastern Time. Depending on role and client needs, employees may be required to maintain availability during specific core hours or attend meetings outside of these hours.</p>
<p>Employees are expected to:</p>
<ul>
<li>Be reasonably reachable during agreed-upon working hours</li>
<li>Attend required meetings and client calls</li>
<li>Communicate proactively regarding availability, delays, or schedule changes</li>
</ul>
<p>Nothing in this policy guarantees a fixed schedule or limits management’s ability to adjust working hours based on business needs, subject to applicable law.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-4 Paid Time Off (PTO) – Operational Expectations</h4>
<div class="collapsible-content">
<p>Tiger Tracks offers a flexible paid time off policy designed to support employee well-being while maintaining client service continuity.</p>
<p>Employees are expected to:</p>
<ul>
<li>Request PTO in advance when foreseeable</li>
<li>Obtain manager approval prior to taking PTO, except where prohibited by law</li>
<li>Ensure appropriate coverage and communication for client and team responsibilities</li>
</ul>
<p>The Company reserves the right to deny or reschedule PTO requests based on business needs, staffing levels, or client obligations, subject to applicable law.</p>
<p>Nothing in this policy limits or replaces legally required paid sick leave, paid family leave, or other statutory leave entitlements.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-5 Remote Work &amp; Telecommuting</h4>
<div class="collapsible-content">
<p>Remote work is a condition of employment at Tiger Tracks. Employees are responsible for maintaining a professional work environment, including reliable internet access and a workspace appropriate for client-facing work.</p>
<p>Employees must comply with all Company security, confidentiality, and data protection requirements and must prevent access to Company systems or confidential information by unauthorized individuals, including household members.</p>
<p>Tiger Tracks may modify, suspend, or revoke remote work privileges based on business needs, performance, security concerns, or compliance obligations, subject to applicable law.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Work Location and Travel Compliance</p>
<p>Employees must maintain an approved primary work location on file with People Operations. Written approval is required before performing work from a new state or country, whether temporarily or permanently. Employees are responsible for compliance with applicable tax, employment, immigration, and data access laws tied to their work location and for maintaining role-aligned availability. Failure to obtain approval or disclose location changes may result in corrective action, including suspension of remote work privileges or unpaid leave, where permitted by law.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Video Presence and Remote Professionalism</p>
<p>Tiger Tracks operates as a fully remote, highly collaborative, and client-facing organization. Video presence is a core component of how team members communicate, collaborate, and represent the Company.</p>
<p>Employees are expected to join scheduled meetings with video enabled when reasonably possible, particularly for:</p>
<ul>
<li>Client-facing meetings</li>
<li>Internal team meetings</li>
<li>Training, onboarding, and performance discussions</li>
</ul>
<p>Employees must maintain a professional appearance and environment during video meetings, consistent with a client-facing workplace. This includes appropriate attire, a distraction-free setting, adequate lighting, clear audio, and a stable camera position. Employees are expected to participate from a stationary location and refrain from multitasking during meetings.</p>
<p>Temporary exceptions may be permitted due to technical issues, illness, or other reasonable circumstances. Employees must proactively notify their manager when video participation is not possible. Reasonable accommodations will be considered as required by law and will not negatively impact good standing, performance evaluations, or incentive eligibility.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-6 Employee Safety and Workspace Safety</h4>
<div class="collapsible-content">
<p>Tiger Tracks is committed to employee safety in a remote work environment. Employees are responsible for maintaining a safe, secure, and nonhazardous work area and for taking reasonable precautions to prevent injury and protect Company information.</p>
<p>Employees must promptly report safety concerns, threats, or emergencies that could affect their ability to work safely or that may impact Company operations. Employees must also keep emergency contact information current so the Company can respond appropriately in urgent situations.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-7 Confidentiality and Client Data Handling</h4>
<div class="collapsible-content">
<p>Employees are entrusted with sensitive Company and client information. Protecting this information is a fundamental condition of employment.</p>
<p>Employees must safeguard confidential information and use it only for legitimate business purposes. Employees must store Company and client data only in Company-approved systems and prevent unauthorized access, including by household members or third parties.</p>
<p>Employees may not store Company or client data on personal devices or drives, transmit data through unapproved channels, retain data beyond business necessity, or access Company systems through unsecured networks without required safeguards.</p>
<p>Any suspected data breach, loss of data, or unauthorized access must be reported immediately. Where laws differ, the standard providing greater protection will apply.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-8 Information Security and Acceptable Use of Company Systems</h4>
<div class="collapsible-content">
<p>Compliance with Company security requirements is a condition of access to Company systems, tools, and information. Employees and contractors must use only Company-approved systems to store, manage, and share work credentials and must follow required safeguards, including strong unique passwords and multi-factor authentication where required. Credentials and access keys may not be shared through email, chat, documents, browsers, notes, or other unapproved methods.</p>
<p>Employees must promptly report suspected security incidents, credential compromise, suspicious activity, or lost/stolen devices to People Operations and/or the Company’s IT partner.</p>
<p>Company systems and tools are provided for legitimate business purposes. Limited personal use is permitted only if it does not interfere with work, violate Company policy, or expose the Company to risk. Employees may not engage in unlawful, unethical, or harassing conduct; install unauthorized software or extensions; circumvent security controls; or use Company systems for outside employment or competitive work.</p>
<p>System usage may be monitored for security, compliance, and operational purposes, consistent with applicable law and limited to legitimate business needs. Detailed technical standards and setup instructions are maintained in the Tiger Tracks Security Policy/Guide, incorporated by reference and updated from time to time.</p>
<p>Tiger Tracks Security Policymay be updated from time to time to reflect evolving security standards and business needs. Detailed security requirements, technical standards, and setup instructions are maintained in the. Questions or concerns should be directed to your supervisor, People Operations, or the Company’s IT partner.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-9 Company Equipment, IT Compliance, and Return of Property</h4>
<div class="collapsible-content">
<p>Tiger Tracks may issue Company equipment through its IT partner to protect Company data and operational consistency. Employees issued Company equipment must perform Company work exclusively on the issued device, comply with required security and configuration controls, and avoid conducting Company business on personal devices unless expressly approved in writing.</p>
<p>All Company equipment and software remain Company property. Employees are responsible for reasonable care, prompt reporting of loss, theft, or damage, and allowing required updates and security measures.</p>
<p>Upon separation, employees must return all Company property in accordance with Company instructions. Failure to return Company property may result in delayed final pay, recovery of replacement costs, or legal action, to the extent permitted by law.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-10 Business Expense Reimbursement</h4>
<div class="collapsible-content">
<p>The Company will reimburse employees for certain preapproved business expenses in accordance with the Business Expense Reimbursement policy and upon submission of required documentation.</p>
<p>Regular household utility charges (e.g., electricity, water, phone, internet service, auto expenses, homeowners’ insurance) are not reimbursable unless required by applicable state or local law.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-11 Pay Administration and Direct Deposit</h4>
<div class="collapsible-content">
<p>Employees are paid bi-weekly for time worked during the prior pay period. Payroll statements itemize earnings and deductions, including required withholdings and any court-ordered garnishments.</p>
<p>Employees must promptly report suspected payroll errors to People Operations so the Company can investigate and resolve issues.</p>
<p>Tiger Tracks strongly encourages direct deposit. Direct deposit may be required where permitted by law and operationally necessary.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-12 Safe Harbor for Exempt Employees</h4>
<div class="collapsible-content">
<p>Tiger Tracks intends to comply with all applicable wage and hour laws. Exempt employees are paid on a salary basis and generally will not have pay reduced due to variations in the quantity or quality of work performed, except as permitted by law.</p>
<p>If an employee believes an improper deduction has been made, the employee must promptly report it to a manager or People Operations so the Company can investigate and correct any error consistent with applicable law.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-13 Performance Management, Reviews, and Professional Standards</h4>
<div class="collapsible-content">
<p>Tiger Tracks may conduct performance reviews periodically, which may include an annual review depending on role and business needs. A positive review does not guarantee a raise, promotion, or continued employment. Compensation and employment decisions remain within management discretion, subject to applicable law.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Professionalism</p>
<p>Employees are expected to communicate clearly and respectfully, take ownership of responsibilities, meet deadlines, deliver accurate and high-quality work, and represent the Company’s values in all business interactions. Failure to meet professionalism expectations may result in coaching, performance discussions, or corrective action.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Performance Improvement Plans (PIP)</p>
<p>Tiger Tracks may, at its discretion, use performance coaching and/or a Performance Improvement Plan (“PIP”) to address performance concerns. A PIP is not required prior to any employment action. Tiger Tracks may address performance or conduct issues with or without a PIP, up to and including termination of employment, consistent with applicable law.</p>
<p>A PIP does not change an employee’s at-will employment status, does not guarantee continued employment, and does not guarantee completion of the full PIP period. Tiger Tracks reserves the right to modify, shorten, extend, or discontinue a PIP at any time based on business needs, employee performance, or evolving circumstances.</p>
<p>Employees may request reasonable accommodations as required by law by contacting People Operations.</p>
<p>PIPs typically:</p>
<ul>
<li>Identify specific performance concerns and role expectations</li>
<li>Set a general improvement timeframe (often 4-6 weeks, but may vary)</li>
<li>Provide reasonable guidance, check-ins, and measurable goals</li>
<li>Document progress and outcomes</li>
</ul>
<p>Employee Expectations During a PIP</p>
<ul>
<li>During a PIP, the team member is expected to:</li>
<li>Prioritize core responsibilities and deadlines</li>
<li>Communicate status proactively and meet agreed check-ins</li>
<li>Seek clarification and support early when blocked</li>
<li>Follow documented processes and quality standards</li>
</ul>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-14 Incentive Eligibility and Good Standing Requirements</h4>
<div class="collapsible-content">
<p>Eligibility for bonuses, commissions, or other incentive compensation is contingent upon the employee being in good standing at the time such compensation is earned and paid, unless otherwise required by law.</p>
<p>Good standing generally requires that the employee:</p>
<ul>
<li>Is actively employed and not under notice of resignation or termination</li>
<li>Is not subject to active disciplinary action or performance improvement measures</li>
<li>Is complying with Company policies and performance expectations</li>
</ul>
<p>Incentive compensation is discretionary and not guaranteed. Nothing in this Good Standing Requirementpolicy creates a vested right to compensation.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-15 Conflicts of Interest, Outside Work, and Public Representation</h4>
<div class="collapsible-content">
<p>Employees must avoid outside activities that conflict with Company interests, performance expectations, client relationships, or required availability. Employees must disclose outside employment, consulting, freelance work, or ownership interests that may create an actual or potential conflict of interest.</p>
<p>Employees may not work for competitors or Tiger Tracks clients, use Company resources for outside work, or allow outside commitments to interfere with performance or availability.</p>
<p>Employees’ public communications may affect Tiger Tracks’ reputation. Employees may not share confidential Company or client information; publicly discuss client strategies or performance; represent themselves as Company spokespeople without authorization; or use Company branding without approval. Employees referencing their work experience publicly must do so accurately and professionally.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-16 Artificial Intelligence &amp; Automation Use Policy</h4>
<div class="collapsible-content">
<p>Tiger Tracks supports responsible use of AI and automation to improve efficiency and performance. AI must be used ethically and in a manner that protects client confidentiality, data integrity, and the Company’s reputation.</p>
<p>Employees may use Company-approved AI tools for business purposes such as research, ideation, drafting internal materials, workflow automation, and summarization, provided confidential, proprietary, or client-identifiable information is not entered unless expressly approved.</p>
<p>All AI-assisted work must be reviewed, validated, and approved by a human before internal or external distribution. Employees may not fabricate results or reporting, rely on AI without independent verification, use unapproved tools for client deliverables, or present AI-generated work as final without review.</p>
<p>AI-assisted work created in the course of employment is Company property. Employees remain fully accountable for accuracy, quality, and compliance.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-17 Your Employment Records and Internal Opportunities</h4>
<div class="collapsible-content">
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Employment Records</p>
<p>In order to obtain their position, employees have provided personal information, such as address and telephone number. This information is contained in their personnel file.</p>
<p>Employees should keep their personnel file up to date by informing Human Resources of any changes. Employees also should inform Human Resources of any specialized training or skills they acquire, as well as any changes to any required visas. Unreported changes of address, marital status, etc. can affect withholding tax and benefit coverage. Further, an &quot;out of date&quot; emergency contact or an inability to reach employees in a crisis could cause a severe health or safety risk or other significant problem.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Job Postings</p>
<p>Tiger Tracks may post internal opportunities to support career growth. Eligibility requirements and posting practices may be established and modified by the Company. Not all positions are guaranteed to be posted, and the Company may recruit internally, externally, or both.</p>
<p>To be eligible to apply for an open position, the employee must meet the following requirements:</p>
<ul>
<li>Be a current, regular, full-time or part-time employee;</li>
<li>Have been in current position for at least six (6) months;</li>
<li>Maintain a performance rating of satisfactory or above;</li>
<li>Not be on conduct/performance-related probation or warning;</li>
<li>Meet the job qualifications listed on the job posting; and</li>
<li>Provide their current manager with notice prior to applying for the position.</li>
</ul>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-18 Open Door Policy</h4>
<div class="collapsible-content">
<p>All employees have the opportunity to express ideas and opinions to management. The Company believes that open communication is essential to a successful work environment, as well as to the Company&#x27;s success. All employees may express ideas and opinions directly to Company management. Employees who would like to bring an idea or suggestion to the Company&#x27;s attention, or just simply wishes to discuss an issue not covered by a separate reporting procedure, are always welcome to send an email or make a call to People Operations.</p>
<p>This policy does not replace reporting channels for harassment, discrimination, retaliation, or other concerns covered by Company policy.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">2-19 Operating Standards, Roles, and Management Structure</h4>
<div class="collapsible-content">
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Client Service and Operating Expectations</p>
<p>Tiger Tracks maintains a high standard of service and accountability in all client relationships. Employees are expected to communicate proactively regarding performance and risks, maintain accurate internal documentation, follow required processes for tracking and reporting, and promptly report errors, near-misses, or process gaps using Company protocols.</p>
<p>Failure to adhere to these standards may be addressed through performance management processes.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Roles and Responsibilities</p>
<p>Role descriptions and responsibilities outlined in this handbook are intended to provide general guidance regarding expectations, scope, and areas of ownership.</p>
<p>Job responsibilities, scope of work, and expectations are listed Tiger Tracks - Roles, Responsibilities and Resources may evolve over time based on business needs, client requirements, or organizational changes. Employees may be asked to perform additional or different duties consistent with their role, skills, and experience.</p>
<p>Nothing in this section alters the at-will nature of employment with Tiger Tracks.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Management Structure and Reporting Lines</p>
<p>Tiger Tracks operates under a structured management model designed to promote clarity, accountability, and consistent support across teams. Each employee is assigned a primary manager based on role, organizational needs, and business priorities.</p>
<p>Reporting lines may be adjusted at any time to support client needs, team health, or company growth. Changes to reporting structure do not alter an employee’s at-will employment status.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Management Authority</p>
<p>Managers at Tiger Tracks are authorized to:</p>
<ul>
<li>Assign and prioritize work</li>
<li>Provide feedback and coaching</li>
<li>Document performance and conduct concerns</li>
<li>Escalate risks, issues, or concerns as appropriate</li>
<li>Participate in performance management discussions</li>
</ul>
<p>While managers play a critical role in day-to-day leadership, final decisions related to discipline, compensation changes, performance improvement plans, or termination of employment remain with senior leadership and/or People Operations.</p>
<p>Employees are expected to follow the lawful directions of their assigned manager and to escalate concerns through the appropriate channels when clarification or support is needed.</p>
</div>
</div></div>
<div class="card" style="margin-bottom:1.5rem;">
<h3 style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.26rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid #229FA1;">Section 3- Benefits and Time Off</h3>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">3-1 Benefits Overview</h4>
<div class="collapsible-content">
<p>At Tiger Tracks, we are committed to fostering a supportive and rewarding work environment by providing competitive pay and a range of supplemental benefits to eligible employees. These benefits may include time-off benefits, such as vacations and holidays, salary matching programs, technology stipends, insurance options, and other plan benefits.</p>
<p>Our benefits programs and policies are continually reviewed and refined to align with the evolving needs of our team and the demands of the times. Tiger Tracks is dedicated to ensuring that these programs reflect both the company&#x27;s values and the well-being of our employees.</p>
<p>If employees have any questions about their benefits, they are encouraged to reach out to People Operations for more information and assistance.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">3-2 Paid Time Off</h4>
<div class="collapsible-content">
<p>Tiger Tracks provides a flexible PTO program intended to support rest and personal needs while maintaining client and team coverage. PTO under this policy is not accrued or earned wages. Unless required by applicable law or expressly provided in a written agreement, unused PTO is not paid out upon separation.</p>
<p>Please review the most recent policy here PTO Guidelines We encourage all employees to plan for 10-15 days off per year. This benchmark promotes a healthy balance without impacting project continuity or client service.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Eligibility and Use</p>
<p>PTO may be used for vacation, personal matters, and rest. Employees are not required to disclose the reason for PTO, except where needed to administer legally protected leave or benefits (e.g., statutory sick leave, disability, family leave), consistent with applicable law.</p>
<p>Employees must be employed for at least 60 days before taking PTO, unless otherwise required by law or approved by the Company.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Approval and Coverage Expectations</p>
<p>PTO must be requested in advance when foreseeable and is subject to manager approval based on business needs and coverage. Employees are expected to take reasonable steps to ensure continuity of work by coordinating coverage, rescheduling meetings where appropriate, and communicating planned absences in advance.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Unforeseeable Absences</p>
<p>For unforeseeable absences (including illness or emergencies), employees must notify their manager as soon as practicable. Notice and approval requirements will be applied in a manner consistent with applicable law, including state and local paid sick leave laws.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Process and Administration</p>
<p>Time off requests must be submitted through the Company’s timekeeping/payroll system. Detailed procedures (including scheduling guidance, coverage planning templates, and communication steps) may be maintained separately and updated from time to time.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Documentation</p>
<p>To the extent permitted by law, the Company may request reasonable documentation when an employee is absent for an extended period, when necessary to administer leave benefits, or where there is an objective basis to investigate suspected misuse of time off. Documentation should not require disclosure of the underlying diagnosis or details beyond what is permitted by law.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Coordination with Other Leave and Wage Replacement Benefits</p>
<p>PTO is not intended to serve as a long-term leave program. Where an absence may qualify for protected leave (e.g., FMLA or state equivalents) or wage replacement benefits (e.g., short-term disability or paid family leave), the Company may require the employee to apply for those benefits and may designate the leave appropriately, consistent with applicable law. PTO, protected leave, and wage replacement benefits may run concurrently where permitted.</p>
<p>Nothing in this policy is intended to delay, discourage, or condition the use of legally protected leave, including paid sick leave.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">3-3 Parental and Family leave</h4>
<div class="collapsible-content">
<p>Tiger Tracks provides parental leave to support bonding with a new child by birth, adoption, or foster placement, subject to the eligibility requirements and coordination rules below.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Eligibility and Benefit</p>
<p>Eligible employees may receive up to twelve (12) weeks of Company-paid parental leave after nine (9) months of employment. The Company may consider requests from employees who do not meet the eligibility threshold or who need additional leave on a case-by-case basis, subject to business needs and applicable law.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Coordination with Law and Other Benefits</p>
<p>Parental leave will run concurrently with any applicable federal, state, or local leave entitlements (including FMLA and state paid family leave) to the extent permitted by law. For employees who give birth, medical leave related to pregnancy or childbirth may be covered under disability benefits and/or applicable law and may run concurrently with parental leave where permitted. People Operations will provide guidance on required notices, documentation, and benefit coordination.</p>
<p>Parental leave must be taken within twelve (12) months of the birth, adoption, or placement.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">3-4 Workers&#x27; Compensation</h4>
<div class="collapsible-content">
<p>Work-related injuries and illnesses are covered by Workers’ Compensation insurance in accordance with applicable law. Employees must report any work-related injury or illness to their manager as soon as possible, regardless of severity, so the Company can provide appropriate support and comply with reporting obligations.</p>
<p>Workers’ Compensation provides wage replacement and medical benefits as determined by the applicable program and does not automatically constitute approval of a leave of absence. Employees who need time away from work due to a work-related injury must coordinate with People Operations regarding leave designation and benefit administration.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">3-5 Jury Duty</h4>
<div class="collapsible-content">
<p>Tiger Tracks realizes that it is the obligation of all U.S. citizens to serve on a jury when summoned to do so. All employees will be allowed time off to perform such civic service as required by law. Employees are expected, however, to provide proper notice of a request to perform jury duty and verification of their service.</p>
<p>Employees also are expected to keep management informed of the expected length of jury duty service and to report to work for the major portion of the day if excused by the court. If the required absence presents a serious conflict for management, employees may be asked to try to postpone jury duty.</p>
<p>Employees on jury duty leave will be paid for their jury duty service in accordance with state law; however, exempt employees will be paid their full salary for any week in which time is missed due to jury duty if work is performed for the Company during such week.</p>
<p>Tiger Tracks will provide time off for jury duty and other court-required civic service in accordance with applicable law. Employees must provide notice as soon as practicable and provide documentation of service upon request.</p>
<p>Where permitted by law and consistent with exempt salary rules, the Company will administer pay during jury duty and may require employees to report to work when excused for a substantial portion of the workday or when service is postponed.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">3-6 Voting Leave</h4>
<div class="collapsible-content">
<p>Tiger Tracks will provide voting leave as required by applicable law. Where possible, employees should provide advance notice to their manager and coordinate timing to minimize business disruption, consistent with legal requirements.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">3-7 Bereavement Leave</h4>
<div class="collapsible-content">
<p>Tiger Tracks provides bereavement leave to support employees following a death in the employee’s family or household.</p>
<p>Eligible employees may receive up to fourteen (14) days of paid bereavement leave for the death of an immediate family member (spouse or domestic partner, child/stepchild, parent/stepparent, sibling, grandparent, or grandchild). With People Operations approval, employees may receive up to seven (7) days of paid bereavement leave for the death of another significant relationship.</p>
<p>Bereavement leave is subject to manager notification as soon as practicable and may require reasonable documentation where permitted by law. Additional unpaid time off may be available under other leave policies or applicable law.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">3-8 Employee Referral Awards</h4>
<div class="collapsible-content">
<p>Tiger Tracks may offer an employee referral program to encourage qualified referrals. Except for People Operations personnel and managers in the direct line of authority for the role, eligible employees may receive a referral bonus for qualifying hires, subject to the terms below.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Program Terms</p>
<p>Referral bonuses are paid in two installments: $1,500 following the referred employee’s start date and $1,500 after the referred employee completes ninety (90) days of continuous employment, subject to payroll processing. To receive payment, the referring employee must be actively employed and in good standing at the time each installment is paid.</p>
<p>A referral is not eligible if the candidate is already in the Company’s recruiting database, has previously applied or been considered, is referred by multiple employees (in which case the Company will determine eligibility), or is sourced through a third-party recruiter or agency. Referral bonuses are taxable and will be processed through payroll with applicable withholdings.</p>
<p>Tiger Tracks reserves the right to modify, suspend, or terminate the referral program at any time.</p>
</div>
</div></div>
<div class="card" style="margin-bottom:1.5rem;">
<h3 style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.26rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid #229FA1;">Section 4- Leaves of Absence</h3>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">4-1 Personal Leave</h4>
<div class="collapsible-content">
<p>When an employee is not eligible for another Company leave and where business needs allow, Tiger Tracks may approve an unpaid personal leave of absence at its discretion.</p>
<p>Requests must be submitted in writing to the employee’s manager at least two (2) weeks before the requested start date when foreseeable. Approval depends on business and staffing needs, the reason for leave, and the employee’s performance and attendance record. Personal leave is generally limited to up to eight (8) weeks, unless an extension is approved in writing before the leave ends.</p>
<p>During an unpaid personal leave, employees do not accrue PTO or other paid leave. Group health insurance coverage may be continued during the leave only if the employee timely pays their required share of premiums, subject to plan terms and any applicable law.</p>
<p>Employees must confirm their expected return-to-work date at least one (1) week before the approved leave ends. Reinstatement to the same or a comparable position is not guaranteed and depends on business needs at the time of return.</p>
<p>Failure to return to work as scheduled, request an approved extension, or communicate availability to return may be treated as a voluntary resignation, to the extent permitted by law.</p>
<p>Personal leave will run concurrently with any applicable Company-provided or legally required leave where permitted.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">4-2 Military Leave</h4>
<div class="collapsible-content">
<p>Tiger Tracks will provide leave for military service in accordance with applicable federal and state law, including the Uniformed Services Employment and Reemployment Rights Act (USERRA) and any applicable state requirements.</p>
<p>Employees must provide advance notice of service obligations when practicable, unless military necessity or circumstances make notice impossible or unreasonable. Eligible employees will be provided unpaid leave for the period of service and will receive reemployment rights, seniority, and benefit treatment as required by law.</p>
<p>Employees who need leave for National Guard or Reserve training should provide as much advance notice as possible to support coverage planning.</p>
</div>
</div></div>
<div class="card" style="margin-bottom:1.5rem;">
<h3 style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.26rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid #229FA1;">Section 5 - General Standards of Conduct</h3>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">5-1 Code of Conduct &amp; Ethical Standards</h4>
<div class="collapsible-content">
<p>Tiger Tracks expects all employees to act with integrity, professionalism, and accountability in all work-related interactions. Employees must exercise good judgment, follow Company policies, and conduct themselves in a manner that protects the Company, our clients, and our teammates.</p>
<p>Employees are expected to:</p>
<ul>
<li>Act honestly and ethically</li>
<li>Communicate respectfully and professionally</li>
<li>Take ownership of responsibilities, outcomes, and mistakes</li>
<li>Follow lawful manager direction and Company procedures</li>
<li>Escalate risks, issues, or errors promptly and appropriately</li>
<li>Protect client trust, confidentiality, and the Company’s reputation</li>
</ul>
<p>Violations may result in corrective or disciplinary action, up to and including termination, subject to applicable law. Nothing in this policy alters at-will employment.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">5-2 Client-Facing Standards</h4>
<div class="collapsible-content">
<p>Because Tiger Tracks is a client-facing organization, employees representing the Company externally must:
Be prepared, punctual, and fully engaged in client interactions
 Communicate accurately and avoid speculation or misrepresentation
Proactively disclose risks, delays, or errors to appropriate internal stakeholders
Maintain a calm, professional demeanor, particularly during high-pressure situations</p>
<p>Conduct that jeopardizes client trust or misrepresents Company capabilities may result in immediate corrective action.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">5-3 Workplace Conduct and Prohibited Behavior</h4>
<div class="collapsible-content">
<p>Tiger Tracks expects employees to follow basic rules of conduct based on honesty, common sense, and fair dealing. Unacceptable conduct includes, but is not limited to:</p>
<ul>
<li>Obtaining employment through false or misleading information</li>
<li>Falsifying or misreporting time records or asking another employee to do so</li>
<li>Theft, misuse, or intentional damage to Company or another person’s property</li>
<li>Unauthorized disclosure, removal, or misuse of confidential information</li>
<li>Violations of Company safety, security, or technology requirements</li>
<li>Threatening, intimidating, or disruptive conduct</li>
<li>Failure to follow lawful manager direction or required processes</li>
<li>Repeated unresponsiveness or refusal to collaborate that undermines team effectiveness</li>
<li>Unlawful, unethical, or harassing activity</li>
</ul>
<p>Because not every situation can be anticipated, the Company will address issues based on the facts and retains discretion to determine appropriate action, subject to applicable law. Nothing in this handbook promises specific treatment in any particular situation.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">5-4 Confidential Company Information</h4>
<div class="collapsible-content">
<p>During the course of work, employees may become aware of confidential information about Tiger Tracks&#x27;s business, including but not limited to information regarding Company finances, pricing, products, and new product development, software, and computer programs, marketing strategies, suppliers, and customers and potential customers. Employees also may become aware of similar confidential information belonging to the Company&#x27;s clients. It is extremely important that all such information remain confidential, and particularly not be disclosed to Tiger Tracks&#x27;s competitors. Any employee who improperly copies, removes (whether physically or electronically), uses, or discloses confidential information to anyone outside of the Company may be subject to disciplinary action up to and including termination. Employees may be required to sign an agreement reiterating these obligations.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">5-5 Conflict of Interest and Business Ethics</h4>
<div class="collapsible-content">
<p>Employees must avoid actual or perceived conflicts of interest and must disclose potential conflicts promptly to People Operations. Employees may not use Company time, resources, or information for unauthorized outside work or activities that compete with the Company or conflict with client interests.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">5-6 Health and Safety</h4>
<div class="collapsible-content">
<p>The health and safety of employees and others are important to Tiger Tracks. Employees are expected to work safely, maintain a reasonably safe work environment (including in remote settings), and promptly report hazards, threats, injuries, or work-related illness to their manager as soon as practicable.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">5-7 Publicity/Statements to the Media</h4>
<div class="collapsible-content">
<p>All media inquiries seeking the Company’s official position must be referred to the CEO. Only the CEO (or an authorized designee) may make or approve public statements on behalf of Tiger Tracks. Employees may not represent themselves as Company spokespersons without written authorization.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">5-8 Business Expense Reimbursement</h4>
<div class="collapsible-content">
<p>Employees will be reimbursed for reasonable, approved business expenses in accordance with the Company’s expense policy. Expenses must be approved by the employee’s manager and submitted with required documentation in a timely manner.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">5-9 If You Must Leave Us</h4>
<div class="collapsible-content">
<p>If an employee decides to resign, Tiger Tracks requests at least two (2) weeks’ advance notice when practicable. Upon separation, employees must return all Company property and Confidential Information in accordance with Company instructions and applicable policies.</p>
</div>
<h4 class="collapsible" onclick="toggle(this)" style="margin-top:1rem;">5-10 A Few Closing Words</h4>
<div class="collapsible-content">
<p>This handbook provides general guidance about Company policies and practices. Tiger Tracks may amend, modify, or discontinue policies at its discretion, subject to applicable law. Employees should contact their manager or People Operations with questions.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">GENERAL HANDBOOK ACKNOWLEDGMENT</p>
<p>This Employee Handbook is an important document intended to help employees become acquainted with Tiger Tracks. This document is intended to provide guidelines and general descriptions only; it is not the final word in all cases. Individual circumstances may call for individual attention.</p>
<p>Because the Company&#x27;s operations may change, the contents of this Handbook may be changed at any time, with or without notice, in an individual case or generally, at the sole discretion of management.</p>
<p>Please read the following statements and sign below to indicate your receipt and acknowledgment of this Handbook.</p>
<ul>
<li>I have received and read a copy of Tiger Tracks&#x27;s Employees Handbook. I understand that the policies, rules and benefits described in it are subject to change at the sole discretion of the Company at any time.</li>
<li>I further understand that my employment is terminable at will, either by myself or the Company, with or without cause or notice, regardless of the length of my employment or the granting of benefits of any kind.</li>
<li>I understand that no representative of Tiger Tracks other than the CEO and/or COO may alter &quot;at will&quot; status and any such modification must be in a signed writing.</li>
<li>I understand that my signature below indicates that I have read and understand the above statements and that I have received a copy of the Company&#x27;s Employee Handbook.</li>
</ul>
<p>Employee&#x27;s Printed Name:</p>
<p>Employee&#x27;s Signature:</p>
<p>Date:</p>
<p>The signed original copy of this acknowledgment should be given to management - it will be filed in your personnel file.</p>
</div>
</div></div>
<div class="card" style="margin-bottom:1.5rem;">
<h3 style="font-family:'DM Serif Display',serif;color:#FFFFFF;font-size:1.26rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid #229FA1;">RECEIPT OF NON-HARASSMENT POLICY</h3>
<p>It is Tiger Tracks&#x27;s policy to prohibit intentional and unintentional harassment of or against job applicants, contractors, interns, volunteers or employees by another employee, manager, vendor, customer or any third party on the basis of actual or perceived race, color, creed, religion, national origin, ancestry, citizenship status, age, sex or gender (including pregnancy, childbirth and pregnancy-related conditions), gender identity or expression (including transgender status), sexual orientation, marital status, military service and veteran status, physical or mental disability, genetic information or any other characteristic protected by applicable federal, state or local laws (referred to as “protected characteristics”). Such conduct will not be tolerated by Tiger Tracks.</p>
<p>The purpose of this policy is not to regulate our employees&#x27; personal morality, but to ensure that no one harasses another individual in the workplace, including while on Company premises, while on Company business (whether or not on Company premises) or while representing the Company. In addition to being a violation of this policy, harassment or retaliation based on any protected characteristic as defined by applicable federal, state, or local laws also is unlawful. For example, sexual harassment and retaliation against an individual because the individual filed a complaint of sexual harassment or because an individual aided, assisted or testified in an investigation or proceeding involving a complaint of sexual harassment as defined by applicable federal, state, or local laws are unlawful.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Harassment Defined</p>
<p>Harassment generally is defined in this policy as unwelcome verbal, visual or physical conduct that denigrates or shows hostility or aversion towards an individual because of any actual or perceived protected characteristic or has the purpose or effect of unreasonably interfering with an individual’s work performance or creating an intimidating, hostile or offensive working environment.</p>
<p>Harassment can be verbal (including slurs, jokes, insults, epithets, gestures or teasing), visual (including offensive posters, symbols, cartoons, drawings, computer displays, text messages, social media posts or e-mails) or physical conduct (including physically threatening another, blocking someone’s way, etc.). Such conduct violates this policy, even if it does not rise to the level of a violation of applicable federal, state or local laws. Because it is difficult to define unlawful harassment, employees are expected to behave at all times in a manner consistent with the intended purpose of this policy.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Sexual Harassment Defined</p>
<p>Sexual harassment can include all of the above actions, as well as other unwelcome conduct, such as unwelcome or unsolicited sexual advances, requests for sexual favors, conversations regarding sexual activities and other verbal, visual or physical conduct of a sexual nature when:</p>
<ul>
<li>submission to that conduct or those advances or requests is made either explicitly or implicitly a term or condition of an individual&#x27;s employment; or</li>
<li>submission to or rejection of the conduct or advances or requests by an individual is used as the basis for employment decisions affecting the individual; or</li>
<li>the conduct or advances or requests have the purpose or effect of unreasonably interfering with an individual’s work performance or creating an intimidating, hostile or offensive working environment.</li>
</ul>
<p>Examples of conduct that violate this policy include:</p>
<ul>
<li>unwelcome flirtations, leering, whistling, touching, pinching, assault, blocking normal movement;</li>
<li>requests for sexual favors or demands for sexual favors in exchange for favorable treatment;</li>
<li>obscene or vulgar gestures, posters or comments;</li>
<li>sexual jokes or comments about a person’s body, sexual prowess or sexual deficiencies;</li>
<li>propositions or suggestive or insulting comments of a sexual nature;</li>
<li>derogatory cartoons, posters and drawings;</li>
<li>sexually-explicit e-mails, text messages or voicemails;</li>
<li>uninvited touching of a sexual nature;</li>
<li>unwelcome sexually-related comments;</li>
<li>conversation about one’s own or someone else’s sex life;</li>
<li>conduct or comments consistently targeted at only one gender, even if the content is not sexual; and</li>
<li>teasing or other conduct directed toward a person because of the person’s gender.</li>
</ul>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Reporting Procedures</p>
<p>If the employee has been subjected to or witnessed conduct which violates this policy, the employee should immediately report the matter to Employee&#x27;s Manager. If the employee is unable for any reason to contact this person, or if the employee has not received an initial response within five (5) business days after reporting any incident of what the employee perceives to be harassment, the employee should contact Human Resources. If the person toward whom the complaint is directed is one of the individuals indicated above, the employee should contact any higher-level manager in the reporting hierarchy.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Investigation Procedures</p>
<p>Every report of perceived harassment will be fully investigated, and corrective action will be taken where appropriate. All complaints will be kept confidential to the extent possible, but confidentiality cannot be guaranteed. All employees must cooperate with all investigations conducted pursuant to this policy.</p>
<p style="font-weight:700;color:#FFFFFF;margin-top:.75rem;margin-bottom:.25rem;">Retaliation Prohibited</p>
<p>In addition, the Company will not allow any form of retaliation against individuals who report unwelcome conduct to management or who cooperate in the investigations of such reports in accordance with this policy. If the employee has been subjected to any such retaliation, the employee should report it in the same manner in which the employee would report a claim of perceived harassment under this policy.</p>
<p>Violation of this policy including any improper retaliatory conduct will result in disciplinary action, up to and including termination.</p>
</div></div>

<div class="section" id="pto-guidelines">
  <div class="section-header"><span class="emoji">🏖️</span><h2>PTO Guidelines</h2></div>

  <div class="card">
    <h3>📅 Paid Holidays (15 Days)</h3>
    <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin:.75rem 0;">
      <span class="badge badge-tier">New Year's Day</span>
      <span class="badge badge-tier">MLK Jr. Day</span>
      <span class="badge badge-tier">President's Day</span>
      <span class="badge badge-tier">Memorial Day</span>
      <span class="badge badge-tier">Juneteenth</span>
      <span class="badge badge-tier">Independence Day</span>
      <span class="badge badge-tier">Day after July 4th</span>
      <span class="badge badge-tier">Labor Day</span>
      <span class="badge badge-tier">Indigenous People's Day</span>
      <span class="badge badge-tier">Veterans' Day</span>
      <span class="badge badge-tier">Thanksgiving</span>
      <span class="badge badge-tier">Day after Thanksgiving</span>
      <span class="badge badge-tier">Christmas Eve</span>
      <span class="badge badge-tier">Christmas Day</span>
      <span class="badge badge-tier">New Year's Eve</span>
    </div>
    <p style="font-size:1.02rem;color:var(--text-light);">When holidays fall on a regular workday, eligible employees receive one day's pay at regular straight-time rate.</p>
  </div>

  <div class="card">
    <h3>🌴 Flexible Unlimited PTO</h3>
    <div class="callout green" style="margin-bottom:1rem;">
      <strong>Benchmark:</strong> We encourage all employees to plan for <strong>10–15 days off per year</strong>. This promotes a healthy balance without impacting project continuity or client service.
    </div>
    <ul>
      <li>PTO may be used for vacation, personal matters, or rest, <strong>no justification needed</strong></li>
      <li>All planned PTO must be arranged in advance</li>
      <li>Subject to manager approval based on team and client coverage</li>
      <li>Must be employed <strong>60+ days</strong> before requesting time off</li>
    </ul>
  </div>

  <div class="card">
    <h3>📋 How to Request PTO, Step by Step</h3>

    <h4 class="collapsible" onclick="toggle(this)">1️⃣ Advance Planning & Notice</h4>
    <div class="collapsible-content">
      <ul>
        <li>Submit PTO <strong>at least 2 weeks</strong> in advance</li>
        <li><strong>1 month preferred</strong> for longer requests (3+ days) or peak periods (campaign launches, audits, reporting)</li>
        <li>Foreseeable sick leave (e.g., surgery): at least <strong>7 days' notice</strong></li>
        <li>Unforeseeable: notify your manager <strong>as soon as practicable</strong></li>
      </ul>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">2️⃣ Team Coordination & Coverage</h4>
    <div class="collapsible-content">
      <p>If working on an active project, discuss with your manager <strong>before submitting</strong>:</p>
      <ul>
        <li>How your responsibilities will be covered</li>
        <li>Whether you can adjust dates for project timelines</li>
        <li>Any work you'll pre-schedule or hand off</li>
      </ul>
      <p style="margin-top:.5rem;"><strong>You are responsible for zero disruption to client service.</strong> Once approved, create a <strong>PTO Tracker Template</strong> to:</p>
      <ul>
        <li>Identify coverage owners for each account and task</li>
        <li>Brief backups on context and deliverables</li>
        <li>Shift meetings as needed</li>
        <li>Communicate changes with clients proactively</li>
      </ul>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">3️⃣ Submit in iSolved</h4>
    <div class="collapsible-content">
      <ol class="steps">
        <li>Go to <strong>Time → Dashboard</strong></li>
        <li>Click <strong>"Leave Request"</strong></li>
        <li>Enter your date range</li>
        <li>In the Comment field, link your <strong>coverage plan</strong></li>
        <li>Use "Additional Email Notifications" to notify your project lead/manager</li>
      </ol>
      <p style="font-size:1.02rem;margin-top:.5rem;">Your manager will review and confirm within <strong>2 business days</strong>. For unforeseeable sick time, just submit with the date range, no explanation required.</p>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">4️⃣ Notify the Team</h4>
    <div class="collapsible-content">
      <ul>
        <li><strong>Planned PTO:</strong> Remind your team in Slack, during standup, or via email</li>
        <li><strong>Unplanned sick time:</strong> Send a Slack message or email to your manager/team. Submit in iSolved ASAP. Add to Slack/Google calendar and mark as OOO.</li>
      </ul>
    </div>

    <h4 class="collapsible" onclick="toggle(this)">5️⃣ Update Calendar, Gmail & Slack</h4>
    <div class="collapsible-content">
      <ul>
        <li><strong>Google Calendar:</strong> Create an "Out of Office" event (auto-declines meeting invites)</li>
        <li><strong>Gmail:</strong> Set auto-reply: <em>"I am out of the office starting [date], returning [date]. If you need immediate assistance, please reach out to [backup] via [email]."</em></li>
        <li><strong>Slack:</strong> Click profile → "Update your status" → <strong>🏖️ OOO – back [date]</strong></li>
      </ul>
    </div>
  </div>

  <div class="card">
    <h3>⚠️ When PTO May Be Declined</h3>
    <ul>
      <li>Client deliverables overlap with your planned time off</li>
      <li>Inadequate coverage on key accounts or projects</li>
      <li>Multiple team members supporting the same client request off concurrently</li>
    </ul>
    <div class="callout">
      <strong>Complete your PTO Coverage Plan</strong> no later than <strong>2 business days</strong> before your first day off.
    </div>
  </div>

  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">📅 Schedule Shifts</h3>
    <div class="collapsible-content">
      <p>If you need to adjust your schedule (weekly appointments, conferences, swapping days), follow a similar process: understand the impact on your team, get coverage, move meetings, and discuss with your manager.</p>
    </div>
  </div>

  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">💻 Personal Tech Issues</h3>
    <div class="collapsible-content">
      <ol class="steps">
        <li><strong>Notify immediately:</strong> Tell your manager/project lead ASAP</li>
        <li><strong>Resolve promptly:</strong> Contact ISP, arrange alternatives</li>
        <li><strong>24-48 hour window:</strong> Expected resolution time; notify manager if longer</li>
        <li><strong>Have a backup plan:</strong> Mobile hotspot, secondary device, nearby coworking space</li>
        <li><strong>Maintain proactively:</strong> Keep software updated, antivirus active</li>
      </ol>
    </div>
  </div>

  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">📄 Extended Leave, Disability & FMLA</h3>
    <div class="collapsible-content">
      <ul>
        <li>PTO is not intended for long-term leave (30+ days)</li>
        <li>Employees on paid leave (e.g., parental leave) do not receive additional PTO</li>
        <li>Absent <strong>7+ calendar days</strong> due to illness/injury → apply for short-term disability via elizabeth@tigertracks.ai</li>
        <li>Absent <strong>3+ consecutive workdays</strong> for serious health condition → contact People Ops for FMLA</li>
        <li>Tiger Tracks will bridge up to 30 days of otherwise unpaid FMLA leave with paid time off</li>
      </ul>
      <p style="font-size:1.02rem;margin-top:.5rem;">For questions about leave policies, contact <strong>elizabeth@tigertracks.ai</strong></p>
    </div>
  </div>
</div>

<!-- ===================== IT SUPPORT / PTG ===================== -->
<div class="section" id="it-support">
  <div class="section-header"><span class="emoji">🖥️</span><h2>IT Support &amp; Cybersecurity</h2></div>

  <div class="callout" style="margin-bottom:1.5rem;background:#1B2126;color:#FFFFFF;border-left:4px solid #3b82f6;">
    <strong>Tiger Tracks IT is managed by ProActive Technology Group (PTG)</strong> — our Managed Service Provider. PTG handles everything from laptop issues and software setup to cybersecurity, network infrastructure, and disaster recovery. <strong>When in doubt, call or email PTG first.</strong>
  </div>

  <!-- HOW TO GET HELP -->
  <div class="card">
    <h3>🚀 How to Get Help — Fastest First</h3>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin:.75rem 0;">
      <div style="background:#1A7477;color:#FFFFFF;padding:1rem;border-radius:12px;border-top:3px solid #229FA1;text-align:center;">
        <div style="font-size:1.8rem;margin-bottom:.4rem;">📞</div>
        <div style="font-weight:700;margin-bottom:.3rem;">Call (Fastest)</div>
        <div style="font-size:1.02rem;color:var(--text-light);margin-bottom:.5rem;">Use for emergencies &amp; urgent issues</div>
        <a href="tel:5168768200" style="font-size:1.2rem;font-weight:700;color:#10b981;text-decoration:none;">516-876-8200</a>
        <div style="font-size:0.9rem;color:var(--text-light);margin-top:.3rem;">Available 24 × 7 × 365</div>
        <div style="font-size:0.9rem;color:var(--text-light);">Standard hours: 5 AM – 8 PM ET</div>
      </div>
      <div style="background:#1B2126;color:#FFFFFF;padding:1rem;border-radius:12px;border-top:3px solid #1F807E;text-align:center;">
        <div style="font-size:1.8rem;margin-bottom:.4rem;">📧</div>
        <div style="font-weight:700;margin-bottom:.3rem;">Email Support</div>
        <div style="font-size:1.02rem;color:var(--text-light);margin-bottom:.5rem;">Auto-logged — you'll get a confirmation</div>
        <a href="mailto:support@ptg.co" style="font-size:1.2rem;font-weight:700;color:#3b82f6;text-decoration:none;">support@ptg.co</a>
      </div>
      <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;border-top:3px solid #9E9E9E;text-align:center;">
        <div style="font-size:1.8rem;margin-bottom:.4rem;">🌐</div>
        <div style="font-weight:700;margin-bottom:.3rem;">Self-Service Portal</div>
        <div style="font-size:1.02rem;color:var(--text-light);margin-bottom:.5rem;">Log in with Microsoft 365 account</div>
        <a href="https://myitportal.net/login" target="_blank" style="font-size:1.08rem;font-weight:700;color:#8b5cf6;text-decoration:none;">myitportal.net/login ↗</a>
      </div>
    </div>
    <div class="callout red" style="margin-top:.75rem;font-size:1.02rem;">
      ⚠️ <strong>Do not</strong> email or call PTG staff on their personal addresses or cell phones — it bypasses the ticketing system and slows your response down significantly.
    </div>
  </div>

  <!-- RESPONSE TIME SLAs -->
  <div class="card">
    <h3>⏱️ Response Time SLAs</h3>
    <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">PTG prioritizes tickets by severity. Here's what to expect:</p>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:1.02rem;">
        <thead>
          <tr style="background:var(--bg);">
            <th style="padding:.6rem .75rem;text-align:left;border-bottom:2px solid var(--border);font-weight:700;">Priority</th>
            <th style="padding:.6rem .75rem;text-align:left;border-bottom:2px solid var(--border);font-weight:700;">Target Response</th>
            <th style="padding:.6rem .75rem;text-align:left;border-bottom:2px solid var(--border);font-weight:700;">Guaranteed</th>
            <th style="padding:.6rem .75rem;text-align:left;border-bottom:2px solid var(--border);font-weight:700;">Examples</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background:#1B2126;color:#FFFFFF;">
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-weight:700;color:#dc2626;">🚨 Emergency</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-weight:600;">15 minutes</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);">Up to 1 hour</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-size:0.96rem;">Server down, all users unable to work, primary internet failure</td>
          </tr>
          <tr style="background:#1B2126;color:#FFFFFF;">
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-weight:700;color:#ea580c;">⚡ Urgent</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-weight:600;">Up to 1 hour</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);">2 business hours</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-size:0.96rem;">VIP/management computer down, user locked out, critical access point offline</td>
          </tr>
          <tr style="background:#1B2126;color:#FFFFFF;">
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-weight:700;color:#ca8a04;">👍 Preferred</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-weight:600;">2 business hours</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);">4 business hours</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-size:0.96rem;">Single user issues, non-critical printer down, sporadic WiFi</td>
          </tr>
          <tr>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-weight:700;color:#2563eb;">📋 Standard</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-weight:600;">4 business hours</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);">8 business hours</td>
            <td style="padding:.6rem .75rem;border-bottom:1px solid var(--border);font-size:0.96rem;">Slow performance, single user scanning issues, general questions</td>
          </tr>
          <tr style="background:var(--bg);">
            <td style="padding:.6rem .75rem;font-weight:700;color:#6b7280;">📅 Scheduled</td>
            <td style="padding:.6rem .75rem;">By appointment</td>
            <td style="padding:.6rem .75rem;">By appointment</td>
            <td style="padding:.6rem .75rem;font-size:0.96rem;">New user setup, new computer install, pro-active maintenance, software updates</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- PTG TEAM CONTACTS -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">👥 Your PTG Contacts</h3>
    <div class="collapsible-content">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem;margin-top:.5rem;">
        <div style="padding:.85rem;border:1px solid var(--border);border-radius:8px;background:var(--bg);">
          <div style="font-size:0.84rem;font-weight:700;text-transform:uppercase;color:var(--text-light);margin-bottom:.3rem;">Service Coordinator</div>
          <div style="font-weight:700;margin-bottom:.2rem;">Diana Miranda</div>
          <div style="font-size:0.984rem;"><a href="mailto:service@ptg.co">service@ptg.co</a></div>
          <div style="font-size:0.984rem;"><a href="tel:5168768200">516-876-8200</a></div>
        </div>
        <div style="padding:.85rem;border:1px solid var(--border);border-radius:8px;background:var(--bg);">
          <div style="font-size:0.84rem;font-weight:700;text-transform:uppercase;color:var(--text-light);margin-bottom:.3rem;">Service Manager (Escalation)</div>
          <div style="font-weight:700;margin-bottom:.2rem;">Eduardo Bustos</div>
          <div style="font-size:0.984rem;"><a href="mailto:eb@ptg.co">eb@ptg.co</a></div>
          <div style="font-size:0.984rem;"><a href="tel:5162523802">516-252-3802</a></div>
        </div>
        <div style="padding:.85rem;border:1px solid var(--border);border-radius:8px;background:var(--bg);">
          <div style="font-size:0.84rem;font-weight:700;text-transform:uppercase;color:var(--text-light);margin-bottom:.3rem;">Account Manager</div>
          <div style="font-weight:700;margin-bottom:.2rem;">Christine Purcaro</div>
          <div style="font-size:0.984rem;"><a href="mailto:cp@ptg.co">cp@ptg.co</a></div>
          <div style="font-size:0.984rem;"><a href="tel:5162523820">516-252-3820</a></div>
        </div>
        <div style="padding:.85rem;border:1px solid var(--border);border-radius:8px;background:var(--bg);">
          <div style="font-size:0.84rem;font-weight:700;text-transform:uppercase;color:var(--text-light);margin-bottom:.3rem;">Account Manager</div>
          <div style="font-weight:700;margin-bottom:.2rem;">Matthew Duran</div>
          <div style="font-size:0.984rem;"><a href="mailto:md@ptg.co">md@ptg.co</a></div>
          <div style="font-size:0.984rem;"><a href="tel:5162523822">516-252-3822</a></div>
        </div>
        <div style="padding:.85rem;border:1px solid var(--border);border-radius:8px;background:var(--bg);">
          <div style="font-size:0.84rem;font-weight:700;text-transform:uppercase;color:var(--text-light);margin-bottom:.3rem;">Project Manager</div>
          <div style="font-weight:700;margin-bottom:.2rem;">Benjamin Roush</div>
          <div style="font-size:0.984rem;"><a href="mailto:br@ptg.co">br@ptg.co</a></div>
        </div>
        <div style="padding:.85rem;border:1px solid var(--border);border-radius:8px;background:var(--bg);">
          <div style="font-size:0.84rem;font-weight:700;text-transform:uppercase;color:var(--text-light);margin-bottom:.3rem;">Managing Partner</div>
          <div style="font-weight:700;margin-bottom:.2rem;">Stuart Ebner</div>
          <div style="font-size:0.984rem;"><a href="mailto:se@ptg.co">se@ptg.co</a></div>
          <div style="font-size:0.984rem;"><a href="tel:5168745089">516-874-5089</a></div>
        </div>
      </div>
      <div style="font-size:0.96rem;color:var(--text-light);margin-top:.75rem;padding:.5rem .75rem;background:var(--bg);border-radius:6px;">
        💡 <strong>For hardware/software orders:</strong> email <a href="mailto:sales@ptg.co">sales@ptg.co</a> or call 516-876-8200. Quotes back within 1 business day. Orders over $5,000 require a 50% deposit before PTG proceeds.
      </div>
    </div>
  </div>

  <!-- WHAT PTG CAN HELP WITH -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🛠️ What PTG Can Help With</h3>
    <div class="collapsible-content">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem .75rem;margin-top:.5rem;font-size:1.02rem;">
        <div>✅ Microsoft 365 / Office 365</div>
        <div>✅ Microsoft Azure &amp; Cloud Hosting</div>
        <div>✅ Hardware &amp; Software Procurement</div>
        <div>✅ Software Licensing</div>
        <div>✅ Internet &amp; Private Data Connections</div>
        <div>✅ Hosted Phone Systems</div>
        <div>✅ Office Setups &amp; Equipment Moves</div>
        <div>✅ Server Deployments</div>
        <div>✅ IT Consulting &amp; Strategic Planning</div>
        <div>✅ Disaster Recovery &amp; Business Continuity Planning</div>
        <div>✅ Backup Monitoring</div>
        <div>✅ DNS / Domain Name Hosting &amp; Renewals</div>
      </div>
      <div style="margin-top:.75rem;padding:.75rem;background:#1B2126;color:#FFFFFF;border-radius:12px;border-left:3px solid #8b5cf6;">
        <div style="font-size:0.96rem;font-weight:700;color:#6d28d9;margin-bottom:.4rem;">🔐 Cybersecurity Services</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.3rem .75rem;font-size:0.996rem;">
          <div>🛡️ Cybersecurity Awareness Training</div>
          <div>🎣 Phishing Simulation Tests</div>
          <div>🔍 Penetration Testing</div>
          <div>🔎 Internal Vulnerability Scanning</div>
          <div>🦠 Next-Gen Antivirus &amp; Threat Hunting</div>
          <div>📋 Policy &amp; Procedure Creation</div>
        </div>
      </div>
      <p style="font-size:0.984rem;color:var(--text-light);margin-top:.75rem;">Need something not on this list? Ask your Account Manager — PTG has a network of trusted partners for Cyber Insurance, Legal, Web Services, and more.</p>
    </div>
  </div>

  <!-- CYBERSECURITY BEST PRACTICES -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🔐 Cybersecurity Best Practices for TT Employees</h3>
    <div class="collapsible-content">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:.75rem 0;">
        <div style="background:#1B2126;color:#FFFFFF;padding:.85rem;border-radius:12px;border-left:4px solid #10b981;">
          <h4 style="color:#065f46;margin:0 0 .5rem;font-size:1.08rem;">✅ Do</h4>
          <ul style="margin:0;font-size:0.984rem;padding-left:1.2rem;">
            <li>Store all credentials in <strong>LastPass</strong></li>
            <li>Enable <strong>MFA</strong> on every account</li>
            <li>Keep devices and software <strong>updated</strong></li>
            <li>Use <strong>VPN or mobile hotspot</strong> on public WiFi</li>
            <li>Verify sender identity before clicking links</li>
            <li>Report anything suspicious to <strong>#tt-security</strong></li>
            <li>Lock your screen when stepping away</li>
          </ul>
        </div>
        <div style="background:#F4F1EB;color:#1A1A1A;padding:.85rem;border-radius:12px;border-left:4px solid #ef4444;">
          <h4 style="color:#0A1119;margin:0 0 .5rem;font-size:1.08rem;">🚫 Never</h4>
          <ul style="margin:0;font-size:0.984rem;padding-left:1.2rem;">
            <li>Share passwords via Slack, email, or docs</li>
            <li>Reuse passwords across services</li>
            <li>Access company systems on open/public WiFi without VPN</li>
            <li>Plug in unknown USB drives</li>
            <li>Click links in suspicious emails without verifying</li>
            <li>Install unauthorized software</li>
          </ul>
        </div>
      </div>
      <div class="callout red" style="font-size:1.02rem;">
        🚨 <strong>Suspect a breach or phishing attempt?</strong> Call PTG immediately at <a href="tel:5168768200"><strong>516-876-8200</strong></a>, notify Elizabeth, and post in <strong>#tt-security</strong> on Slack. Change the affected password right away in LastPass.
      </div>
    </div>
  </div>

  <!-- ORDERING HARDWARE/SOFTWARE -->
  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🛒 Ordering Hardware or Software</h3>
    <div class="collapsible-content">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:.75rem 0;">
        <div style="padding:.85rem;border:1px solid var(--border);border-radius:8px;">
          <div style="font-weight:700;margin-bottom:.4rem;">📦 Small Orders</div>
          <div style="font-size:0.996rem;color:var(--text-light);">Few computers, accessories, licenses — call <a href="tel:5168768200">516-876-8200</a> or email <a href="mailto:sales@ptg.co">sales@ptg.co</a>. Quote back within 1 business day.</div>
        </div>
        <div style="padding:.85rem;border:1px solid var(--border);border-radius:8px;">
          <div style="font-weight:700;margin-bottom:.4rem;">🏢 Large Orders / Projects</div>
          <div style="font-size:0.996rem;color:var(--text-light);">Office moves, migrations, large deployments — contact your Account Manager for a full proposal.</div>
        </div>
      </div>
      <div style="font-size:0.984rem;color:var(--text-light);">Quotes &gt; $5,000 require a 50% deposit before PTG orders. All approvals done electronically via the Order Porter link in their email.</div>
    </div>
  </div>

  <div style="margin-top:1.5rem;padding:1rem 1.25rem;background:#0A1119;color:#FFFFFF;border-radius:10px;border:1px solid #c7d2fe;display:flex;align-items:center;gap:1rem;">
    <div style="font-size:2.4rem;">🤝</div>
    <div>
      <div style="font-weight:700;margin-bottom:.2rem;">PTG — ProActive Technology Group</div>
      <div style="font-size:0.996rem;color:var(--text-light);">"Building relationships, humanizing technology" · <a href="tel:5168768200">516-876-8200</a> · <a href="mailto:support@ptg.co">support@ptg.co</a> · <a href="https://myitportal.net/login" target="_blank">myitportal.net/login ↗</a></div>
    </div>
  </div>
</div>

<!-- ===================== SECURITY POLICY ===================== -->
<div class="section" id="security-policy">
  <div class="section-header"><span class="emoji">🔒</span><h2>Security Policy</h2></div>

  <div class="callout red" style="margin-bottom:1.5rem;">
    <strong>All employees and contractors must comply with this policy.</strong> Tiger Tracks uses <strong>LastPass</strong> as the organization-wide password manager. All work credentials must be stored exclusively in LastPass.
  </div>

  <div class="card">
    <h3>🎯 Primary Goals</h3>
    <ul>
      <li>Protect confidential, client, and personal data</li>
      <li>Ensure secure credential management across the organization</li>
      <li>Simplify managing complex passwords</li>
      <li>Reduce risk of phishing and password reuse attacks</li>
      <li>Support secure collaboration through safe credential sharing</li>
    </ul>
  </div>

  <div class="card">
    <h3>🔑 Credential Storage Rules</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:.75rem 0;">
      <div style="background:#1A7477;color:#FFFFFF;padding:1rem;border-radius:12px;border-left:4px solid var(--success);">
        <h4 style="color:var(--success);margin:0 0 .35rem;">✅ Do</h4>
        <ul style="margin:0;font-size:1.02rem;">
          <li>Store all credentials in LastPass</li>
          <li>Use LastPass Password Generator</li>
          <li>Share via LastPass "Share Item"</li>
          <li>Use "Share without viewing" when possible</li>
          <li>Enable Multi-Factor Authentication</li>
        </ul>
      </div>
      <div style="background:#F4F1EB;color:#1A1A1A;padding:1rem;border-radius:12px;border-left:4px solid var(--danger);">
        <h4 style="color:#7f1d1d;margin:0 0 .35rem;">🚫 Never</h4>
        <ul style="margin:0;font-size:1.02rem;">
          <li>Share passwords via email, Slack, or docs</li>
          <li>Store credentials in browsers or sticky notes</li>
          <li>Reuse passwords across services</li>
          <li>Store passwords in Google Docs or Notion</li>
          <li>Write passwords in Sheets</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>🔐 Password Requirements</h3>
    <p>All passwords must either be generated by LastPass, or meet <strong>all</strong> of the following:</p>
    <ul>
      <li>At least <strong>16 characters</strong> long</li>
      <li>Include uppercase, lowercase, numbers, and symbols</li>
      <li>No dictionary words, names, or service-related terms</li>
      <li>Unique per service</li>
    </ul>
  </div>

  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">📱 Device & Access Security</h3>
    <div class="collapsible-content">
      <ul>
        <li>Keep operating systems, browsers, and software <strong>updated</strong></li>
        <li>Protect devices with <strong>strong passwords or biometrics</strong></li>
        <li>Enable <strong>automatic screen lock after 5 minutes</strong></li>
        <li>Do not access LastPass on public or untrusted devices</li>
      </ul>
      <h4 style="margin-top:.75rem;">Mobile Devices</h4>
      <ul>
        <li>Enable biometric login</li>
        <li>Auto-lock within 5 minutes</li>
        <li>Do not jailbreak or root the device</li>
        <li>Install apps only from official stores</li>
      </ul>
    </div>
  </div>

  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">✈️ Remote Access & Travel</h3>
    <div class="collapsible-content">
      <ul>
        <li>Use <strong>company-approved VPNs</strong> on public/semi-public networks</li>
        <li>If VPN unavailable, use a <strong>personal mobile hotspot</strong></li>
        <li>Never access company systems over open, unsecured networks</li>
        <li>Verify Wi-Fi network names to avoid "evil twin" attacks</li>
        <li>Enable local firewalls outside the office</li>
      </ul>
    </div>
  </div>

  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🎣 Phishing & Social Engineering</h3>
    <div class="collapsible-content">
      <ul>
        <li><strong>Verify sender identity</strong> before clicking links or opening attachments</li>
        <li><strong>Hover over links</strong> to inspect URLs</li>
        <li>When in doubt, consult Elizabeth or <strong>#tt-security</strong> via Slack</li>
        <li>Be cautious of unexpected support calls or urgent requests</li>
        <li>Avoid plugging in unknown USBs or media</li>
      </ul>
    </div>
  </div>

  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🚨 Incident Response</h3>
    <div class="collapsible-content">
      <p><strong>If you suspect a credential has been compromised:</strong></p>
      <ol class="steps">
        <li><strong>Immediately change</strong> the password using LastPass</li>
        <li><strong>Revoke shared access</strong> if applicable</li>
        <li><strong>Notify</strong> Elizabeth and <strong>#tt-security</strong></li>
        <li><strong>Document</strong> the incident and review with IT/security</li>
      </ol>
    </div>
  </div>

  <div class="card">
    <h3 class="collapsible" onclick="toggle(this)">🛠️ LastPass Setup Instructions</h3>
    <div class="collapsible-content">
      <ol class="steps">
        <li><strong>Create your account</strong> at <a href="https://www.lastpass.com/" target="_blank">lastpass.com</a> with your Tiger Tracks email. Choose a strong master password (passphrase recommended).</li>
        <li><strong>Install extensions & apps</strong>: Browser extension (Chrome/Firefox/Edge) + mobile apps (iOS/Android)</li>
        <li><strong>Enable MFA</strong>: Account Settings → Multifactor Options. Recommended: LastPass Authenticator, Authy, or YubiKey</li>
        <li><strong>Import existing credentials</strong>: Use the import tool, review duplicates, create folders per client</li>
        <li><strong>Run the Security Challenge</strong>: Vault → Security Challenge. Aim for <strong>80%+ score</strong></li>
      </ol>
    </div>
  </div>

  <div class="card">
    <h3>📊 When to Use LastPass</h3>
    <div class="table-wrap">
      <table>
        <tr><th>Scenario</th><th>Use LastPass?</th></tr>
        <tr><td>Client onboarding</td><td><strong>✅ Yes</strong></td></tr>
        <tr><td>Accessing client platforms</td><td><strong>✅ Yes</strong></td></tr>
        <tr><td>Sharing logins with team</td><td><strong>✅ Yes</strong></td></tr>
        <tr><td>Storing passwords in Slack/Docs</td><td><strong>🚫 No</strong></td></tr>
        <tr><td>Receiving new passwords</td><td><strong>✅ Update in LastPass</strong></td></tr>
      </table>
    </div>
  </div>
</div>

<!-- ===================== BEST PRACTICES ===================== -->
<div class="section" id="best-practices">
  <div class="section-header"><span class="emoji">📚</span><h2>Platform Training</h2></div>
  <p style="color:var(--text-light);margin-bottom:1.5rem;">Platform-specific campaign best practices, updated March 2026. Download the full decks or browse inline below.</p>

  <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.5rem;">
    <button class="rv-tab active" data-bptab="overview" onclick="switchBpTab('overview')">📖 Overview</button>
    <button class="rv-tab" data-bptab="google" onclick="switchBpTab('google')">🔍 Google</button>
    <button class="rv-tab" data-bptab="meta" onclick="switchBpTab('meta')">📱 Meta</button>
    <button class="rv-tab" data-bptab="linkedin" onclick="switchBpTab('linkedin')">💼 LinkedIn</button>
    <button class="rv-tab" data-bptab="asana" onclick="switchBpTab('asana')">📋 Asana</button>
    <button class="rv-tab" data-bptab="slack" onclick="switchBpTab('slack')">💬 Slack</button>
    <button class="rv-tab" data-bptab="otter" onclick="switchBpTab('otter')">🦦 Otter.ai</button>
    <button class="rv-tab" data-bptab="newhire" onclick="switchBpTab('newhire')">🎓 New Hire Training</button>
  </div>

  <!-- OVERVIEW TAB -->
  <div id="bp-overview" class="bp-tab-content">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2.5rem;">

      <div class="card" style="cursor:pointer;transition:transform .2s;" onclick="switchBpTab('google')" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;">
          <div style="font-size:2.4rem;">🔍</div>
          <div><h3 style="margin:0;">Google Ads</h3><p style="font-size:0.96rem;color:var(--accent);margin:0;font-weight:600;">16 Slides / Updated March 2026</p></div>
        </div>
        <p style="font-size:1.02rem;color:var(--text-light);">Search campaign structure, ad copy best practices, Shopping/GMC feed optimization, Performance Max, Demand Gen, naming conventions, conversion setup, and keyword management.</p>
        <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem;">
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Search</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Shopping</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">PMax</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Demand Gen</span>
        </div>
      </div>

      <div class="card" style="cursor:pointer;transition:transform .2s;" onclick="switchBpTab('meta')" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;">
          <div style="font-size:2.4rem;">📱</div>
          <div><h3 style="margin:0;">Meta Ads</h3><p style="font-size:0.96rem;color:var(--accent);margin:0;font-weight:600;">13 Slides / Updated March 2026</p></div>
        </div>
        <p style="font-size:1.02rem;color:var(--text-light);">Launch checklist, full-funnel approach, bidding strategy, audience targeting, creative best practices, ad specs, Advantage+ campaigns, and when to pause or refresh ads.</p>
        <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem;">
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Advantage+</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">CAPI</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Creative</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Full-Funnel</span>
        </div>
      </div>

      <div class="card" style="cursor:pointer;transition:transform .2s;" onclick="switchBpTab('linkedin')" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;">
          <div style="font-size:2.4rem;">💼</div>
          <div><h3 style="margin:0;">LinkedIn Ads</h3><p style="font-size:0.96rem;color:var(--accent);margin:0;font-weight:600;">11 Slides / Updated March 2026</p></div>
        </div>
        <p style="font-size:1.02rem;color:var(--text-light);">B2B advertising strategy, full-funnel targeting, reporting and attribution, multi-platform opportunities (Microsoft + CTV), campaign structure, creative specs, and key benchmarks.</p>
        <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem;">
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">B2B</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">ABM</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">CTV</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Lead Gen</span>
        </div>
      </div>

      <div class="card" style="cursor:pointer;transition:transform .2s;" onclick="switchBpTab('asana')" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;">
          <div style="font-size:2.4rem;">📋</div>
          <div><h3 style="margin:0;">Asana</h3><p style="font-size:0.96rem;color:var(--accent);margin:0;font-weight:600;">Project Management</p></div>
        </div>
        <p style="font-size:1.02rem;color:var(--text-light);">How to use Asana at Tiger Tracks. Week 1 training plan, Slack integration, team norms, daily workflows, and adoption best practices for the account management team.</p>
        <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem;">
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Task Management</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Slack Integration</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Team Norms</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Training Plan</span>
        </div>
      </div>

      <div class="card" style="cursor:pointer;transition:transform .2s;" onclick="switchBpTab('slack')" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;">
          <div style="font-size:2.4rem;">💬</div>
          <div><h3 style="margin:0;">Slack</h3><p style="font-size:0.96rem;color:var(--accent);margin:0;font-weight:600;">Team Communication</p></div>
        </div>
        <p style="font-size:1.02rem;color:var(--text-light);">How to use Slack effectively at Tiger Tracks. Channel structure, naming conventions, communication norms, status usage, thread etiquette, and integrations with Asana and other tools.</p>
        <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem;">
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Channels</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Etiquette</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Integrations</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Notifications</span>
        </div>
      </div>

      <div class="card" style="cursor:pointer;transition:transform .2s;" onclick="switchBpTab('otter')" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;">
          <div style="font-size:2.4rem;">🦦</div>
          <div><h3 style="margin:0;">Otter.ai</h3><p style="font-size:0.96rem;color:var(--accent);margin:0;font-weight:600;">AI Meeting Notes & Transcription</p></div>
        </div>
        <p style="font-size:1.02rem;color:var(--text-light);">How to use Otter.ai for automatic meeting transcription, note-taking, and action item tracking. Setup, best practices, and integration with your workflow.</p>
        <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem;">
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Transcription</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Meeting Notes</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Action Items</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">AI-Powered</span>
        </div>
      </div>

      <div class="card" style="cursor:pointer;transition:transform .2s;" onclick="switchBpTab('newhire')" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;">
          <div style="font-size:2.4rem;">🎓</div>
          <div><h3 style="margin:0;">New Hire Training</h3><p style="font-size:0.96rem;color:var(--accent);margin:0;font-weight:600;">Account Coordinator Onboarding</p></div>
        </div>
        <p style="font-size:1.02rem;color:var(--text-light);">12-week training plan for entry-level hires with zero performance marketing experience. Takes them from industry basics through platform certification to independent account execution.</p>
        <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem;">
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">12 Weeks</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Google + Meta</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Zero to AC</span>
          <span class="badge" style="background:#1B2126;color:#FFFFFF;font-size:0.84rem;">Certifications</span>
        </div>
      </div>
    </div>

    <div class="card"><h3>📝 Asana Knowledge Quiz</h3><div id="quizAsana"></div></div>
  </div>

  <!-- SLACK TAB -->
  <div id="bp-slack" class="bp-tab-content" style="display:none;">

    <div class="callout green" style="margin-bottom:1.5rem;">
      <strong>Slack is Tiger Tracks' primary real-time communication tool.</strong> These best practices ensure everyone stays aligned, responsive, and organized. Slack is for quick communication; Asana is for task tracking. If it requires work, it belongs in Asana.
    </div>

    <!-- CHANNEL STRUCTURE -->
    <div class="card"><h3>📁 Channel Structure & Naming Conventions</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Consistent channel naming makes everything findable. Follow these prefixes:</p>
      <div class="table-wrap">
        <table>
          <tr><th style="width:20%">Prefix</th><th style="width:30%">Purpose</th><th>Examples</th></tr>
          <tr><td><code>#client-</code></td><td>Client-specific channels</td><td><code>#client-acme</code>, <code>#client-brandx-social</code></td></tr>
          <tr><td><code>#team-</code></td><td>Team or pod channels</td><td><code>#team-pod1</code>, <code>#team-creative</code></td></tr>
          <tr><td><code>#proj-</code></td><td>Project-specific work</td><td><code>#proj-q2-audit</code>, <code>#proj-migration</code></td></tr>
          <tr><td><code>#dept-</code></td><td>Department-wide channels</td><td><code>#dept-operations</code>, <code>#dept-growth</code></td></tr>
          <tr><td><code>#announce-</code></td><td>Announcements (limited posting)</td><td><code>#announce-company</code>, <code>#announce-wins</code></td></tr>
          <tr><td><code>#help-</code></td><td>Q&A and support</td><td><code>#help-tech</code>, <code>#help-hr</code></td></tr>
          <tr><td><code>#social-</code></td><td>Non-work, culture building</td><td><code>#social-random</code>, <code>#social-food</code></td></tr>
        </table>
      </div>
      <div class="callout" style="margin-top:.75rem;">
        <strong>Rule:</strong> Before creating a new channel, check if one already exists. Duplicate channels fragment conversations. When in doubt, ask in <code>#help-tech</code>.
      </div>
    </div>

    <!-- COMMUNICATION NORMS -->
    <div class="card"><h3>📏 Communication Norms</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;">

        <div style="background:var(--bg);border-radius:8px;padding:1rem;border-left:4px solid var(--accent);">
          <h4 style="color:var(--accent);margin-bottom:.5rem;">Response Time Expectations</h4>
          <ul style="font-size:1.02rem;">
            <li><strong>DMs:</strong> Respond within 1-2 hours during business hours</li>
            <li><strong>Channel mentions (@you):</strong> Respond within 2-4 hours</li>
            <li><strong>@here / @channel:</strong> Acknowledge within 30 minutes if relevant</li>
            <li><strong>Non-urgent:</strong> End of business day is fine</li>
            <li><strong>After hours:</strong> Next business day (use scheduled send)</li>
          </ul>
        </div>

        <div style="background:var(--bg);border-radius:8px;padding:1rem;border-left:4px solid var(--accent);">
          <h4 style="color:var(--accent);margin-bottom:.5rem;">When to Use What</h4>
          <ul style="font-size:1.02rem;">
            <li><strong>Slack DM:</strong> Quick questions, 1:1 check-ins, sensitive topics</li>
            <li><strong>Slack Channel:</strong> Team updates, client context, FYIs, questions for the group</li>
            <li><strong>Slack Huddle:</strong> Quick 5-min verbal sync (faster than typing)</li>
            <li><strong>Asana:</strong> Anything that requires work, has a deadline, or needs tracking</li>
            <li><strong>Email:</strong> External client communication, formal requests, contracts</li>
            <li><strong>Google Meet:</strong> Scheduled meetings, client calls, presentations</li>
          </ul>
        </div>

        <div style="background:var(--bg);border-radius:8px;padding:1rem;border-left:4px solid var(--accent);">
          <h4 style="color:var(--accent);margin-bottom:.5rem;">Message Writing Tips</h4>
          <ul style="font-size:1.02rem;">
            <li><strong>Lead with context:</strong> "Re: Acme Q2 budget -" not just "Hey quick question"</li>
            <li><strong>One message, not five:</strong> Compose your full thought before hitting Enter</li>
            <li><strong>Use formatting:</strong> Bold for emphasis, bullets for lists, code blocks for data</li>
            <li><strong>Tag people explicitly:</strong> Don't assume they'll see it</li>
            <li><strong>Include deadlines:</strong> "Need by EOD Thursday" not "when you get a chance"</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- THREAD ETIQUETTE -->
    <div class="card"><h3>🧵 Thread Etiquette</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div>
          <h4 style="color:var(--success);font-size:1.08rem;">✅ Do</h4>
          <ul style="font-size:1.02rem;">
            <li>Reply in threads to keep channels clean</li>
            <li>Use "Also send to channel" for important thread conclusions</li>
            <li>Start a thread for multi-step discussions</li>
            <li>React with ✅ to acknowledge you've seen something</li>
            <li>Use 👀 to signal "I'm looking into this"</li>
            <li>Pin important messages in client channels</li>
          </ul>
        </div>
        <div>
          <h4 style="color:var(--danger);font-size:1.08rem;">❌ Don't</h4>
          <ul style="font-size:1.02rem;">
            <li>Reply to a thread in the main channel (creates confusion)</li>
            <li>Use @channel or @here for non-urgent messages</li>
            <li>Send "Hi" and wait for a reply before asking your question</li>
            <li>Have long back-and-forth conversations in a channel (use a thread or huddle)</li>
            <li>Leave questions unanswered - even "I don't know, try asking X" is helpful</li>
            <li>Delete messages without explanation (edit and note the change instead)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- STATUS & AVAILABILITY -->
    <div class="card"><h3>🟢 Status & Availability</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Your Slack status tells the team your availability without them having to ask.</p>
      <div class="table-wrap">
        <table>
          <tr><th style="width:15%">Status</th><th style="width:25%">When to Use</th><th>What It Signals</th></tr>
          <tr><td>🟢 Active</td><td>Working and available</td><td>Reachable, normal response times</td></tr>
          <tr><td>🔴 In a meeting</td><td>On a call or in a meeting</td><td>Will respond after, don't expect immediate reply</td></tr>
          <tr><td>🎯 Focus time</td><td>Deep work, building campaigns</td><td>Available for urgent items only, slower response</td></tr>
          <tr><td>🍽️ Lunch / Break</td><td>Stepping away</td><td>Back within the hour</td></tr>
          <tr><td>🏖️ PTO</td><td>Vacation or time off</td><td>Set auto-response, include backup contact</td></tr>
          <tr><td>🤒 Sick</td><td>Out sick</td><td>Limited availability, contact manager if urgent</td></tr>
          <tr><td>🌙 Away</td><td>End of day / offline</td><td>Next business day response</td></tr>
        </table>
      </div>
      <div class="callout" style="margin-top:.75rem;">
        <strong>Tip:</strong> Set a status duration so it auto-clears. Nothing worse than showing "In a meeting" for 3 days.
      </div>
    </div>

    <!-- NOTIFICATIONS -->
    <div class="card"><h3>🔔 Notification Management</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;">
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
          <h4 style="margin:0 0 .5rem;font-size:1.08rem;">Recommended Settings</h4>
          <ul style="font-size:1.02rem;">
            <li>Notify for: DMs + mentions + keywords</li>
            <li>Add your name and client names as keywords</li>
            <li>Mute high-volume channels you check manually</li>
            <li>Set Do Not Disturb hours (match your working hours)</li>
            <li>Enable mobile notifications for DMs only</li>
          </ul>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
          <h4 style="margin:0 0 .5rem;font-size:1.08rem;">Keyword Alerts</h4>
          <p style="font-size:1.02rem;">Set up keyword notifications for things you need to catch:</p>
          <ul style="font-size:1.02rem;">
            <li>Your client names</li>
            <li>Your name variations</li>
            <li>"Urgent", "ASAP", "blocker"</li>
            <li>Platform alerts: "overspend", "disapproved"</li>
          </ul>
          <p style="font-size:0.96rem;color:var(--text-light);margin-top:.5rem;">Settings > Notifications > My Keywords</p>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
          <h4 style="margin:0 0 .5rem;font-size:1.08rem;">Schedule Send</h4>
          <p style="font-size:1.02rem;">Working late or on weekends? Use <strong>Schedule Send</strong> (click the arrow next to the send button) to deliver messages during business hours. Respect your teammates' off-hours.</p>
        </div>
      </div>
    </div>

    <!-- CLIENT CHANNEL BEST PRACTICES -->
    <div class="card"><h3>🏢 Client Channel Best Practices</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div>
          <h4 style="font-size:1.08rem;color:var(--accent);">Channel Setup</h4>
          <ul style="font-size:1.02rem;">
            <li>Name: <code>#client-[clientname]</code> (lowercase, no spaces)</li>
            <li>Add all pod members working on the account</li>
            <li>Pin: SOW, media plan, reporting links, key contacts</li>
            <li>Set channel topic: "Client Name | AM: [Name] | AS: [Name] | Tier: X"</li>
            <li>Set channel description with key links</li>
          </ul>
        </div>
        <div>
          <h4 style="font-size:1.08rem;color:var(--accent);">What Goes in Client Channels</h4>
          <ul style="font-size:1.02rem;">
            <li>Performance alerts and updates</li>
            <li>Client email summaries ("Just got off a call with [Client], here's what we discussed...")</li>
            <li>Creative approvals and feedback</li>
            <li>Launch confirmations</li>
            <li>Pacing flags</li>
            <li>Internal prep notes before client calls</li>
          </ul>
        </div>
      </div>
      <div class="callout red" style="margin-top:.75rem;">
        <strong>Never:</strong> Share client-confidential information in public channels. If the client shouldn't see it, it belongs in a DM or private channel.
      </div>
    </div>

    <!-- INTEGRATIONS -->
    <div class="card"><h3>🔗 Key Integrations</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;">
        <div style="background:var(--bg);padding:1rem;border-radius:8px;text-align:center;">
          <div style="font-size:1.8rem;">📋</div>
          <h4 style="font-size:1.08rem;margin:.25rem 0;">Asana</h4>
          <p style="font-size:0.96rem;color:var(--text-light);">Create tasks from messages, get task notifications. See the Asana tab for full setup guide.</p>
        </div>
        <div style="background:var(--bg);padding:1rem;border-radius:8px;text-align:center;">
          <div style="font-size:1.8rem;">📅</div>
          <h4 style="font-size:1.08rem;margin:.25rem 0;">Google Calendar</h4>
          <p style="font-size:0.96rem;color:var(--text-light);">Auto-updates your Slack status during meetings. Shows "In a meeting" when you have a calendar event.</p>
        </div>
        <div style="background:var(--bg);padding:1rem;border-radius:8px;text-align:center;">
          <div style="font-size:1.8rem;">📧</div>
          <h4 style="font-size:1.08rem;margin:.25rem 0;">Gmail</h4>
          <p style="font-size:0.96rem;color:var(--text-light);">Forward important emails to Slack channels. Use the Gmail add-on to send messages to channels.</p>
        </div>
        <div style="background:var(--bg);padding:1rem;border-radius:8px;text-align:center;">
          <div style="font-size:1.8rem;">📊</div>
          <h4 style="font-size:1.08rem;margin:.25rem 0;">Google Drive</h4>
          <p style="font-size:0.96rem;color:var(--text-light);">Share Drive files directly in Slack. Get notifications when shared docs are updated.</p>
        </div>
      </div>
    </div>

    <!-- SLACK SHORTCUTS -->
    <div class="card"><h3>⚡ Keyboard Shortcuts & Power Tips</h3>
      <div class="table-wrap">
        <table>
          <tr><th style="width:30%">Shortcut</th><th>What It Does</th></tr>
          <tr><td><kbd>Cmd/Ctrl + K</kbd></td><td>Quick switcher - jump to any channel or DM instantly</td></tr>
          <tr><td><kbd>Cmd/Ctrl + Shift + K</kbd></td><td>Open a new DM</td></tr>
          <tr><td><kbd>Cmd/Ctrl + Shift + M</kbd></td><td>Open your mentions & reactions</td></tr>
          <tr><td><kbd>Cmd/Ctrl + Shift + A</kbd></td><td>Open All Unreads view</td></tr>
          <tr><td><kbd>Cmd/Ctrl + Shift + S</kbd></td><td>Open Saved Items (bookmarks)</td></tr>
          <tr><td><kbd>Cmd/Ctrl + Shift + \</kbd></td><td>React to last message with an emoji</td></tr>
          <tr><td><kbd>Cmd/Ctrl + Shift + Enter</kbd></td><td>Create a code/text snippet</td></tr>
          <tr><td><kbd>Up Arrow</kbd></td><td>Edit your last message</td></tr>
          <tr><td><code>/remind</code></td><td>Set a reminder: <code>/remind me to check pacing in 2 hours</code></td></tr>
          <tr><td><code>/status</code></td><td>Set your status: <code>/status :dart: Focus time</code></td></tr>
        </table>
      </div>
    </div>

    <!-- TIGER TRACKS SLACK RULES -->
    <div class="card"><h3>🐯 Tiger Tracks Slack Rules</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.75rem;margin-top:.5rem;">
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">🧵</div><strong style="font-size:0.96rem;">Always use threads</strong><br><span style="font-size:0.84rem;color:var(--text-light);">Keep channels scannable</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">📋</div><strong style="font-size:0.96rem;">Action items → Asana</strong><br><span style="font-size:0.84rem;color:var(--text-light);">If it needs work, make a task</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">🟢</div><strong style="font-size:0.96rem;">Keep status updated</strong><br><span style="font-size:0.84rem;color:var(--text-light);">Team needs to know availability</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">⏰</div><strong style="font-size:0.96rem;">Respond same day</strong><br><span style="font-size:0.84rem;color:var(--text-light);">Even if just to acknowledge</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">🔒</div><strong style="font-size:0.96rem;">Protect client data</strong><br><span style="font-size:0.84rem;color:var(--text-light);">Right channel, right audience</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">🌙</div><strong style="font-size:0.96rem;">Schedule send after hours</strong><br><span style="font-size:0.84rem;color:var(--text-light);">Respect off-hours boundaries</span>
        </div>
      </div>
    </div>

    <div class="card"><h3>📝 Slack Knowledge Quiz</h3><div id="quizSlack"></div></div>
  </div>

  <!-- GOOGLE TAB -->
  <div id="bp-google" class="bp-tab-content" style="display:none;">
    <a href="/best-practices/TT_Google_Best_Practices_2026.pptx" download style="display:flex;align-items:center;gap:1rem;background:#1B2126;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:1rem 1.25rem;text-decoration:none;transition:all .2s ease;margin-bottom:.75rem;color:#FFFFFF" onmouseover="this.style.borderColor='#229FA1';this.style.background='#1A7477'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)';this.style.background='#1B2126'">
      <div style="width:36px;height:36px;border-radius:8px;background:rgba(34,159,161,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      </div>
      <div>
        <div style="color:#FFFFFF;font-family:'DM Serif Display',serif;font-size:1.08rem;font-weight:600;">Google Ads Best Practices 2026</div>
        <div style="color:#9E9E9E;font-family:Inter,system-ui,sans-serif;font-size:0.936rem;margin-top:2px;">PowerPoint · Slide Deck</div>
      </div>
      <svg style="margin-left:auto;flex-shrink:0;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </a>

    <div class="card"><h3>🔍 Search: Campaign Structure</h3>
      <ul>
        <li><strong>Consolidated structure:</strong> Brand + NonBrand campaigns</li>
        <li>Split NonBrand only for different conversion events, geo targeting, or budget allocation</li>
        <li>Competitor/Conquest within NonBrand unless separate budget needed</li>
        <li>Ad Groups organized by theme with combined match types (Exact + Broad)</li>
        <li><strong>No Broad Match</strong> for brand names (including competitors)</li>
        <li>Avoid keyword-level Final URLs</li>
      </ul>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>2026 Update:</strong> Broad Match now benefits from AI-powered intent matching. Always pair with Smart Bidding for best results. Google recommends 50+ conversions in 30 days for optimal performance.
      </div>
    </div>

    <div class="card"><h3>📝 Search: Ad Copy</h3>
      <ul>
        <li><strong>Dynamic Keyword Insertion:</strong> Use sparingly, NEVER with intentional misspellings</li>
        <li><strong>Thematic RSAs:</strong> 3 RSAs per Ad Group, each with a different theme/value prop</li>
        <li><strong>Ad Customizers:</strong> Use for frequent promotions or seasonal copy (schedule uploads)</li>
        <li>Great for restricted verticals (avoids triggering policy review on entire ad)</li>
      </ul>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>2026 Updates:</strong> Automatically Created Assets (ACA) now available for all search campaigns: review weekly. Image extensions serve more broadly. Conversational AI campaign creation in Google Ads.
      </div>
    </div>

    <div class="card"><h3>🚀 Search: New Campaign Launch</h3>
      <ul>
        <li>Launch with <strong>Max Conversions</strong> or <strong>Max Conversion Value</strong></li>
        <li>After 30 conversions in 2 weeks, implement tCPA or tROAS</li>
        <li>Initial target within 20% of current efficiency, adjust over 2 weeks</li>
        <li><strong>Budget capping:</strong> Search lost due to rank is fine (bids control spend, not budget)</li>
        <li>If client won't increase spend, lower bids gradually until 0% limited by budget</li>
      </ul>
    </div>

    <div class="card"><h3>🛒 Shopping Campaigns</h3>
      <ul>
        <li>Separate Ad Groups for products with different margins</li>
        <li>Bid adjustments at Ad Group level, not Product Group</li>
        <li>Start single campaign; split Brand/NonBrand when volume warrants</li>
        <li><strong>GMC Feed:</strong> Optimize titles (brand, color, size, gender), use Feed Rules, Custom Labels</li>
        <li>Exclude Gift Cards from all PLAs</li>
      </ul>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>2026 Update:</strong> Merchant Center Next is now standard with automatic product insights, AI-generated descriptions, and enhanced free listings integration.
      </div>
    </div>

    <div class="card"><h3>⚡ Performance Max</h3>
      <ul>
        <li>Split Asset Groups only for different Creative or Audience</li>
        <li>PMax targets always higher than Search targets</li>
        <li>Use maximum assets per Ad Set; allow 3-4 weeks before changes</li>
      </ul>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>2026 Updates:</strong> Search term reports + negative KWs now in UI. Channel-level reporting (Search vs Shopping vs Display vs Video). Brand exclusions expanded. Asset Group-level conversion goals. URL exclusions to prevent low-quality placements.
      </div>
    </div>

    <div class="card"><h3>🎯 Demand Gen</h3>
      <ul>
        <li>Better than PMax for clients with zero Shopping presence</li>
        <li>Ad Groups segmented by <strong>Audience, not Creative</strong></li>
        <li>Prospecting + Retargeting can share one campaign</li>
        <li>Opt in to all channels; use Optimized Targeting</li>
        <li><strong>Video:</strong> Max 3 per ad (vertical: Shorts, square: In-stream/In-feed, horizontal: In-stream/In-feed)</li>
        <li>Opt out of Video Enhancements</li>
      </ul>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>2026 Updates:</strong> Shorts-only placements now available. Lookalike segments expanded. Product feeds support dynamic remarketing. AI tools generate video from images.
      </div>
    </div>

    <div class="card"><h3>⚙️ Account-Wide Standards</h3>
      <ul>
        <li><strong>Naming:</strong> Intuitive, underscores, no spaces. Update UTMs to match.</li>
        <li><strong>Conversions:</strong> Clear names, correct categories, 30/3/1 attribution, Enhanced Conversions always on</li>
        <li><strong>Tracking:</strong> GTM over GA4 where possible; connect CRM/offline data</li>
        <li><strong>Keywords:</strong> Scrub biweekly. Don't remove low-spend KWs. Brand Safety + Brand Term negative lists.</li>
        <li><strong>Extensions:</strong> Use ALL possible. Prioritize account-level first.</li>
      </ul>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>2026 Updates:</strong> Consent mode v2 now mandatory in many markets. Google Ads Data Manager simplifies first-party data connections. Auto-generated sitelinks and callouts: review weekly.
      </div>
    </div>

    <div class="card"><h3>📝 Google Ads Knowledge Quiz</h3><div id="quizGoogle"></div></div>
  </div>

  <!-- META TAB -->
  <div id="bp-meta" class="bp-tab-content" style="display:none;">
    <a href="/best-practices/TT_Meta_Best_Practices_2026.pptx" download style="display:flex;align-items:center;gap:1rem;background:#1B2126;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:1rem 1.25rem;text-decoration:none;transition:all .2s ease;margin-bottom:.75rem;color:#FFFFFF" onmouseover="this.style.borderColor='#229FA1';this.style.background='#1A7477'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)';this.style.background='#1B2126'">
      <div style="width:36px;height:36px;border-radius:8px;background:rgba(34,159,161,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      </div>
      <div>
        <div style="color:#FFFFFF;font-family:'DM Serif Display',serif;font-size:1.08rem;font-weight:600;">Meta Ads Best Practices 2026</div>
        <div style="color:#9E9E9E;font-family:Inter,system-ui,sans-serif;font-size:0.936rem;margin-top:2px;">PowerPoint · Slide Deck</div>
      </div>
      <svg style="margin-left:auto;flex-shrink:0;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </a>

    <div class="card"><h3>✅ Launch Checklist</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:.75rem;margin:.75rem 0;">
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">1</div><strong>Tracking</strong><br><span style="font-size:0.96rem;">CAPI audit complete</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">2</div><strong>Creative</strong><br><span style="font-size:0.96rem;">4:5, 1:1, 9:16 assets</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">3</div><strong>Approval</strong><br><span style="font-size:0.96rem;">Written strategy + budget</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">4</div><strong>QA</strong><br><span style="font-size:0.96rem;">Account checklist done</span>
        </div>
      </div>
    </div>

    <div class="card"><h3>🎯 Full-Funnel Approach</h3>
      <div class="table-wrap">
        <table>
          <tr><th>Stage</th><th>Objective</th><th>Audience</th><th>Creative</th></tr>
          <tr><td><strong>Awareness</strong></td><td>Reach, LP views, video views</td><td>Broad interest, 5% LAL</td><td>Brand intro, video</td></tr>
          <tr><td><strong>Prospecting</strong></td><td>Advantage+, conversions</td><td>1% LAL, interest</td><td>Social proof, UGC</td></tr>
          <tr><td><strong>Retargeting</strong></td><td>Conversions</td><td>30-day visitors, engagers</td><td>DPA, testimonials</td></tr>
          <tr><td><strong>Retention</strong></td><td>Re-engagement</td><td>Past converters</td><td>Loyalty, upsell</td></tr>
        </table>
      </div>
      <p style="font-size:1.02rem;margin-top:.5rem;">Concentrate budget at bottom of funnel. Exclude previous purchasers from all stages except Retention.</p>
    </div>

    <div class="card"><h3>⚙️ General Best Practices</h3>
      <ul>
        <li>Opt in to <strong>ALL placements</strong> (Advantage+ Placements)</li>
        <li>4-6 ads per ad set (10+ for Advantage+ Shopping)</li>
        <li>4-6 week creative refresh cycle</li>
        <li>Implement CAPI for accurate measurement</li>
        <li>Don't make calls too early: ensure enough data first</li>
      </ul>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>2026 Updates:</strong> Advantage+ campaigns are Meta's primary recommendation. CBO now standard. AI creative tools in Ads Manager for text variations and image generation. Performance 5 framework for campaign setup.
      </div>
    </div>

    <div class="card"><h3>💰 Bidding Strategy</h3>
      <div class="table-wrap">
        <table>
          <tr><th>Strategy</th><th>When to Use</th><th>Notes</th></tr>
          <tr><td><strong>Lowest Cost</strong></td><td>Default start for all campaigns</td><td>Maximize conversions automatically</td></tr>
          <tr><td><strong>Cost Cap</strong></td><td>Specific CPA targets</td><td>More reliable in 2026 with larger data pools</td></tr>
          <tr><td><strong>Target CPA</strong></td><td>Dramatic seasonality/spikes</td><td>Limiting but consistent</td></tr>
          <tr><td><strong>Target ROAS</strong></td><td>NOT recommended</td><td>Meta conversions are modeled, data not 1:1</td></tr>
        </table>
      </div>
    </div>

    <div class="card"><h3>🎨 Creative Best Practices</h3>
      <ul>
        <li>Assets in <strong>4:5, 1:1, and 9:16</strong> for all placements</li>
        <li>Do NOT add faux-CTA buttons</li>
        <li>9:16: add text overlays (copy doesn't pull through)</li>
        <li>Videos under 15 seconds, sound-off optimized</li>
        <li>2-4 creative types per ad set</li>
        <li>Text under 25% of image area</li>
        <li>Use DPA/Catalog for retargeting</li>
      </ul>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>2026:</strong> UGC/creator content outperforms polished 2-3x. Reels-first strategy (vertical video is primary). Advantage+ Creative replaces Dynamic Creative Testing. Carousels now support 20 cards.
      </div>
    </div>

    <div class="card"><h3>📐 Ad Specs (March 2026)</h3>
      <div class="table-wrap">
        <table>
          <tr><th>Format</th><th>Size</th><th>File Type</th><th>Limits</th></tr>
          <tr><td>Image</td><td>1080x1080 (1:1) or 1080x1920 (9:16)</td><td>JPG, PNG</td><td>30MB max, 600x600 min</td></tr>
          <tr><td>Video</td><td>1080x1080 (1:1) or 1080x1920 (9:16)</td><td>MP4, MOV, GIF</td><td>4GB max, 15s recommended</td></tr>
          <tr><td>Body text</td><td colspan="3">125 characters (include on 9:16 overlay)</td></tr>
          <tr><td>Headline</td><td colspan="3">25 characters</td></tr>
          <tr><td>Description</td><td colspan="3">30 characters</td></tr>
        </table>
      </div>
    </div>

    <div class="card"><h3>⏸️ When to Pause or Refresh</h3>
      <div class="table-wrap">
        <table>
          <tr><th>Action</th><th>Trigger</th></tr>
          <tr><td><strong>Pause ad</strong></td><td>Frequency > 3.0 prospecting / 5.0 retargeting</td></tr>
          <tr><td><strong>Pause ad</strong></td><td>CTR < 0.5% for 7+ consecutive days</td></tr>
          <tr><td><strong>Pause ad</strong></td><td>CPA > 50% above target for 2+ weeks</td></tr>
          <tr><td><strong>Refresh creative</strong></td><td>Every 4-6 weeks (standard cadence)</td></tr>
          <tr><td><strong>DON'T pause</strong></td><td>Still in learning phase (< 50 conversions)</td></tr>
          <tr><td><strong>DON'T pause</strong></td><td>Budget changes made in last 3-5 days</td></tr>
        </table>
      </div>
    </div>

    <div class="card"><h3>📝 Meta Ads Knowledge Quiz</h3><div id="quizMeta"></div></div>
  </div>

  <!-- LINKEDIN TAB -->
  <div id="bp-linkedin" class="bp-tab-content" style="display:none;">
    <a href="/best-practices/TT_LinkedIn_Best_Practices_2026.pptx" download style="display:flex;align-items:center;gap:1rem;background:#1B2126;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:1rem 1.25rem;text-decoration:none;transition:all .2s ease;margin-bottom:.75rem;color:#FFFFFF" onmouseover="this.style.borderColor='#229FA1';this.style.background='#1A7477'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)';this.style.background='#1B2126'">
      <div style="width:36px;height:36px;border-radius:8px;background:rgba(34,159,161,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      </div>
      <div>
        <div style="color:#FFFFFF;font-family:'DM Serif Display',serif;font-size:1.08rem;font-weight:600;">LinkedIn Ads Best Practices 2026</div>
        <div style="color:#9E9E9E;font-family:Inter,system-ui,sans-serif;font-size:0.936rem;margin-top:2px;">PowerPoint · Slide Deck</div>
      </div>
      <svg style="margin-left:auto;flex-shrink:0;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#229FA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </a>

    <div class="card"><h3>📊 Why LinkedIn Advertising</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.75rem;margin:.75rem 0;">
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;">63M</div><div style="font-size:0.9rem;">Decision-makers</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;">80%</div><div style="font-size:0.9rem;">B2B leads from LinkedIn</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;">2-5x</div><div style="font-size:0.9rem;">Higher ROAS vs others</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;">+33%</div><div style="font-size:0.9rem;">Purchase intent lift</div>
        </div>
      </div>
    </div>

    <div class="card"><h3>🎯 Full-Funnel Strategy</h3>
      <div class="table-wrap">
        <table>
          <tr><th>Stage</th><th>Objectives</th><th>Audiences</th><th>Creative</th><th>KPIs</th></tr>
          <tr><td><strong>Awareness</strong></td><td>Reach, Traffic, Video Views</td><td>Job title, industry, Predictive</td><td>Static, Carousel, Video, Document</td><td>Reach, CTR, Views</td></tr>
          <tr><td><strong>Consideration</strong></td><td>Lead Gen, Engagement</td><td>Retargeting, ABM lists</td><td>Document Ads, Thought Leadership</td><td>Leads, Conv Rate</td></tr>
          <tr><td><strong>Conversion</strong></td><td>High-Intent Leads</td><td>Content DLers, high-intent pages</td><td>Message, Lead Form, Website Conv</td><td>CPL, SQL Rate</td></tr>
        </table>
      </div>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>2026 Updates:</strong> Company engagement targeting, Click-to-Message ads, Newsletter Ads, Live Event Ads, Conversions API (CAPI) for server-side tracking, multi-touch attribution modeling.
      </div>
    </div>

    <div class="card"><h3>🔗 Multi-Platform Opportunities</h3>
      <ul>
        <li><strong>Microsoft Search:</strong> Apply LinkedIn audience signals to search campaigns</li>
        <li><strong>Microsoft Display:</strong> Target LinkedIn audiences 1:1 across Display Network</li>
        <li><strong>CTV:</strong> LinkedIn targeting on streaming TV, 4x more effective than linear for B2B</li>
        <li>Kantar brand lift studies available for CTV</li>
        <li>All managed in LinkedIn Campaign Manager</li>
      </ul>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>2026:</strong> LinkedIn Audience Network expanded to premium publishers. Video ads serve across LinkedIn + Microsoft ecosystem.
      </div>
    </div>

    <div class="card"><h3>⚙️ Campaign Structure</h3>
      <ul>
        <li>Minimum 2 campaigns (Awareness + Conversion)</li>
        <li>Separate by <strong>objective, not audience</strong></li>
        <li>3-5 ads per campaign minimum</li>
        <li>Budget: minimum $50/day per campaign</li>
        <li>Minimum audience size: 50,000 for Sponsored Content</li>
        <li>Layer 2-3 targeting criteria max (avoid over-narrowing)</li>
        <li>Start with Maximum Delivery; switch to Manual CPC after 2 weeks</li>
      </ul>
    </div>

    <div class="card"><h3>🎨 Creative Best Practices</h3>
      <div class="table-wrap">
        <table>
          <tr><th>Format</th><th>Specs</th><th>Notes</th></tr>
          <tr><td>Single Image</td><td>1200x627 or 1080x1080</td><td>1.91:1 or 1:1 ratio</td></tr>
          <tr><td>Video</td><td>16:9 or 1:1</td><td>< 30s awareness, < 90s consideration</td></tr>
          <tr><td>Carousel</td><td>2-10 cards, 1080x1080</td><td>Great for multi-feature storytelling</td></tr>
          <tr><td>Document</td><td>PDF, up to 100MB</td><td>10+ pages recommended</td></tr>
        </table>
      </div>
      <ul style="margin-top:.5rem;">
        <li>Headline under 70 characters (truncates on mobile)</li>
        <li>Intro text under 150 characters (before "see more")</li>
        <li>Include data points and specific results</li>
        <li>Strong, specific CTAs ("Download the Guide" not "Learn More")</li>
      </ul>
      <div class="callout blue" style="margin-top:.5rem;">
        <strong>2026:</strong> Short-form video (< 15s) outperforms. Thought Leadership Ads (boosting employee posts) see 2x engagement. AI ad copy suggestions in Campaign Manager.
      </div>
    </div>

    <div class="card"><h3>📈 Key Benchmarks (B2B)</h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin:.75rem 0;">
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;color:var(--accent);">$5-12</div><div style="font-size:0.96rem;">Avg CPC</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;color:var(--accent);">$50-200</div><div style="font-size:0.96rem;">Avg CPL</div>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.8rem;font-weight:800;color:var(--accent);">0.4-0.65%</div><div style="font-size:0.96rem;">Avg CTR</div>
        </div>
      </div>
    </div>

    <div class="card"><h3>📝 LinkedIn Ads Knowledge Quiz</h3><div id="quizLinkedIn"></div></div>
  </div>

  <!-- NEW HIRE TRAINING TAB -->
  <!-- OTTER.AI -->
  <div id="bp-otter" class="bp-tab-content" style="display:none;">

    <div class="callout green" style="margin-bottom:1.5rem;">
      <strong>What is Otter.ai?</strong> An AI-powered tool that automatically transcribes meetings, generates summaries, and captures action items. Every Tiger Tracks team member should use Otter for client calls and internal meetings.
    </div>

    <div class="card"><h3>🚀 Getting Started</h3>
      <ol style="font-size:1.02rem;">
        <li><strong>Sign up:</strong> Go to <a href="https://otter.ai" target="_blank">otter.ai</a> and create an account using your Tiger Tracks email</li>
        <li><strong>Connect your calendar:</strong> Settings > Calendar Integration > Connect Google Calendar</li>
        <li><strong>Install the browser extension:</strong> Otter Chrome extension auto-joins and transcribes Google Meet calls</li>
        <li><strong>Download the mobile app:</strong> For in-person meetings or phone calls</li>
        <li><strong>Set your preferences:</strong> Enable auto-join for scheduled meetings in Settings</li>
      </ol>
    </div>

    <div class="card"><h3>📞 Using Otter for Client Calls</h3>
      <h4>Before the Call</h4>
      <ul style="font-size:1.02rem;">
        <li>Verify Otter is set to auto-join your Google Meet/Zoom meetings</li>
        <li>If not auto-joining, manually start Otter and share the meeting link</li>
        <li>Inform the client that the meeting will be recorded for notes (standard practice)</li>
      </ul>
      <h4>During the Call</h4>
      <ul style="font-size:1.02rem;">
        <li>Otter transcribes in real time - you can focus on the conversation instead of note-taking</li>
        <li>Use the "Highlight" feature to mark key moments during the call</li>
        <li>Add quick comments or tags for important discussion points</li>
      </ul>
      <h4>After the Call</h4>
      <ul style="font-size:1.02rem;">
        <li>Review the auto-generated summary within 5 minutes of the call ending</li>
        <li>Check the "Action Items" section - Otter automatically extracts these</li>
        <li>Create Asana tasks from the action items immediately</li>
        <li>Share the summary with relevant team members</li>
        <li>Use the transcript to build accurate client recap emails</li>
      </ul>
    </div>

    <div class="card"><h3>🏢 Using Otter for Internal Meetings</h3>
      <ul style="font-size:1.02rem;">
        <li><strong>Weekly Manager Syncs:</strong> Auto-transcribe and share notes with your pod</li>
        <li><strong>Monthly Feedback Reviews:</strong> Use the transcript to ensure feedback is accurately captured</li>
        <li><strong>Strategy Sessions:</strong> Capture every idea without losing focus on the discussion</li>
        <li><strong>1:1s:</strong> Review transcripts later to ensure follow-ups are completed</li>
      </ul>
    </div>

    <div class="card"><h3>💡 Best Practices</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-top:.75rem;">
        <div style="background:var(--bg);border-radius:8px;padding:.75rem;border-left:4px solid var(--accent);">
          <h4 style="color:var(--accent);">Do</h4>
          <ul style="font-size:0.984rem;">
            <li>Always have Otter running on client calls</li>
            <li>Review and clean up transcripts within 24 hours</li>
            <li>Use highlights to mark decisions and commitments</li>
            <li>Share summaries with team members who could not attend</li>
            <li>Create Asana tasks from action items immediately</li>
            <li>Use the search function to find past discussion topics</li>
            <li>Tag speakers correctly for accurate attribution</li>
          </ul>
        </div>
        <div style="background:var(--bg);border-radius:8px;padding:.75rem;border-left:4px solid #ef4444;">
          <h4 style="color:#FFFFFF;">Do Not</h4>
          <ul style="font-size:0.984rem;">
            <li>Do not rely solely on Otter - still pay attention and engage</li>
            <li>Do not share raw transcripts externally without review</li>
            <li>Do not skip reviewing the AI summary for accuracy</li>
            <li>Do not record meetings without informing participants</li>
            <li>Do not use Otter as a replacement for Asana task tracking</li>
            <li>Do not leave sensitive client info in unorganized transcripts</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card"><h3>📂 Organizing Your Transcripts</h3>
      <ul style="font-size:1.02rem;">
        <li><strong>Folders:</strong> Create folders by client name (e.g., "Acme Co - Calls")</li>
        <li><strong>Naming:</strong> Rename transcripts: [Client] - [Meeting Type] - [Date] (e.g., "Acme - Weekly Sync - 2026-03-04")</li>
        <li><strong>Tags:</strong> Use tags like "Action Items," "Decision Made," "Follow Up" for easy searching</li>
        <li><strong>Archive:</strong> Move old transcripts to archive folders monthly to keep your workspace clean</li>
      </ul>
    </div>

    <div class="card"><h3>🔗 Otter + Your Workflow</h3>
      <ul style="font-size:1.02rem;">
        <li><strong>Otter → Asana:</strong> Turn action items into Asana tasks immediately after each call</li>
        <li><strong>Otter → Client Recaps:</strong> Use the summary to draft accurate recap emails</li>
        <li><strong>Otter → Reporting:</strong> Reference specific client feedback or requests from transcripts when building reports</li>
        <li><strong>Otter → Slack:</strong> Share Otter summaries in the relevant client Slack channel for team visibility</li>
        <li><strong>Otter → 1:1 Prep:</strong> Review recent transcripts before 1:1s to track open items</li>
      </ul>
    </div>

    <div class="card"><h3>🎓 Learning Resources</h3>
      <ul style="font-size:1.02rem;">
        <li><a href="https://otter.ai/blog" target="_blank">Otter.ai Blog</a> - Tips, updates, and use cases</li>
        <li><a href="https://help.otter.ai" target="_blank">Otter Help Center</a> - Setup guides and troubleshooting</li>
        <li><a href="https://www.youtube.com/@OtterAI" target="_blank">Otter YouTube Channel</a> - Video tutorials</li>
      </ul>
    </div>

    <div id="quizOtter"></div>

  </div>

  <div id="bp-newhire" class="bp-tab-content" style="display:none;">

    <div class="callout green" style="margin-bottom:1.5rem;">
      <strong>Account Coordinator Training Plan</strong> - 12-week program for entry-level hires with zero performance marketing experience. Goal: fully operational AC capable of independently supporting 6-10 accounts.
    </div>

    <!-- WHAT YOU NEED BEFORE DAY 1 -->
    <div class="card"><h3>📦 Pre-Arrival Checklist (Manager Responsibility)</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div>
          <h4 style="font-size:1.08rem;color:var(--accent);">Access & Accounts</h4>
          <ul style="font-size:1.02rem;">
            <li>Google Workspace (email, calendar, drive)</li>
            <li>Slack workspace + add to relevant channels</li>
            <li>Asana workspace + add to team projects</li>
            <li>Google Ads MCC (read-only initially)</li>
            <li>Meta Business Manager (read-only initially)</li>
            <li>Google Analytics 4 (read access)</li>
            <li>Google Tag Manager (read access)</li>
            <li>Reporting tools (Looker Studio, etc.)</li>
            <li>LastPass / password manager</li>
            <li>isolved (HR/payroll)</li>
            <li>Client-facing tools as needed</li>
          </ul>
        </div>
        <div>
          <h4 style="font-size:1.08rem;color:var(--accent);">Materials & Resources</h4>
          <ul style="font-size:1.02rem;">
            <li>Laptop configured with required software</li>
            <li>Link to this Team Resources site</li>
            <li>Tiger Tracks Employee Handbook</li>
            <li>Account Coordinator role expectations doc</li>
            <li>Naming convention templates</li>
            <li>UTM builder template</li>
            <li>Reporting templates (slides + data pulls)</li>
            <li>Change log template</li>
            <li>Assigned buddy/mentor (Account Strategist)</li>
            <li>Week 1 calendar with all training sessions</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- PHASE 1: WEEKS 1-2 -->
    <div class="card"><h3>🌱 Phase 1: Foundation (Weeks 1-2)</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Goal: Understand Tiger Tracks, the industry, and how digital advertising works. No platform access yet.</p>

      <h4 style="color:var(--accent);font-size:1.08rem;">Week 1: Company & Industry Orientation</h4>
      <div class="table-wrap">
        <table>
          <tr><th style="width:20%">Day</th><th>Topics</th><th style="width:30%">Resources / Deliverable</th></tr>
          <tr><td><strong>Day 1</strong></td><td>Welcome, team intros, company culture, org chart, tools setup (Slack, Asana, email). Review Employee Handbook. Tiger Tracks mission and values.</td><td>Complete isolved onboarding. Read Culture section on this site.</td></tr>
          <tr><td><strong>Day 2</strong></td><td>What is performance marketing? Paid search vs paid social vs display vs programmatic vs CTV. How agencies work. Client relationships. The account team pod model.</td><td>Watch Google Skillshop "Intro to Google Ads" module.</td></tr>
          <tr><td><strong>Day 3</strong></td><td>Tiger Tracks service offerings overview. What makes TT different (ex-Google leadership, data-driven). Review 3-4 case studies / client win stories.</td><td>Read TT Offerings section. Shadow a client call (listen only).</td></tr>
          <tr><td><strong>Day 4</strong></td><td>Asana training Day 1 (see Asana Best Practices tab). How TT uses Asana for task management. Naming conventions.</td><td>Complete Asana homework: create 5 tasks.</td></tr>
          <tr><td><strong>Day 5</strong></td><td>How we measure success: KPIs, CPA, ROAS, CTR, CVR, CPM, CPC. What a media plan looks like. How budgets flow.</td><td>Quiz: define 15 core metrics. 1:1 with manager.</td></tr>
        </table>
      </div>

      <h4 style="color:var(--accent);font-size:1.08rem;margin-top:1rem;">Week 2: Digital Advertising Fundamentals</h4>
      <div class="table-wrap">
        <table>
          <tr><th style="width:20%">Day</th><th>Topics</th><th style="width:30%">Resources / Deliverable</th></tr>
          <tr><td><strong>Day 6</strong></td><td>Google Ads ecosystem: Search, Shopping, Display, YouTube, PMax, Demand Gen. How the auction works. Quality Score. Match types.</td><td>Google Skillshop: Search Certification course (start).</td></tr>
          <tr><td><strong>Day 7</strong></td><td>Meta Ads ecosystem: Campaign objectives, ad sets, ads. Advantage+, audiences, placements. Pixel and CAPI basics.</td><td>Meta Blueprint: "Get Started with Meta Ads" course.</td></tr>
          <tr><td><strong>Day 8</strong></td><td>Tracking and measurement: GA4 basics, UTMs, conversion tracking, attribution windows. What "a conversion" means.</td><td>Build 10 UTMs using TT template. Explain attribution to mentor.</td></tr>
          <tr><td><strong>Day 9</strong></td><td>Creative basics: Ad copy best practices (Google RSAs, Meta ad copy), image specs, video specs. What works and why.</td><td>Read Google + Meta Best Practices tabs. Write 3 sample RSAs.</td></tr>
          <tr><td><strong>Day 10</strong></td><td>Reporting: What clients care about. How to pull screenshots. Reporting templates. Pacing and budget tracking.</td><td>Pull screenshots from a sample account. Fill a report template. Week 2 check-in with manager.</td></tr>
        </table>
      </div>

      <div class="callout blue" style="margin-top:1rem;">
        <strong>📚 Phase 1 Resources:</strong><br>
        <a href="https://skillshop.exceedlms.com/student/catalog/list?category_ids=2844" target="_blank">Google Skillshop: Intro to Google Ads</a><br>
        <a href="https://www.facebook.com/business/learn" target="_blank">Meta Blueprint: Get Started with Meta Ads</a><br>
        <a href="https://support.google.com/analytics/answer/9164320" target="_blank">Google Analytics 4 Beginner Guide</a><br>
        <a href="https://www.youtube.com/playlist?list=PLJFG93oi0wJAofhQ8Zoyi7D6YKRWHgLDi" target="_blank">Asana Beginner Playlist (YouTube)</a><br>
        <a href="https://www.wordstream.com/blog/ws/2023/07/10/digital-marketing-glossary" target="_blank">Digital Marketing Glossary (KPI definitions)</a><br>
        📖 On this site: <em>TT Offerings, Culture, Asana tab, Best Practices overview</em>
      </div>
    </div>

    <!-- PHASE 2: WEEKS 3-4 -->
    <div class="card"><h3>🔧 Phase 2: Platform Training (Weeks 3-4)</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Goal: Learn to navigate and build inside Google Ads and Meta. Hands-on in sandbox/training accounts.</p>

      <h4 style="color:var(--accent);font-size:1.08rem;">Week 3: Google Ads Hands-On</h4>
      <div class="table-wrap">
        <table>
          <tr><th style="width:20%">Focus</th><th>Activities</th><th style="width:30%">Deliverable</th></tr>
          <tr><td><strong>Search</strong></td><td>Navigate Google Ads UI. Build a search campaign from scratch in training account: campaign settings, ad groups, keywords, RSAs. Apply negatives.</td><td>Build 1 complete search campaign. Mentor QA review.</td></tr>
          <tr><td><strong>Shopping</strong></td><td>Understand Merchant Center. Review product feeds. Build a Shopping campaign. Understand product groups.</td><td>Review a live client's Shopping setup. Document findings.</td></tr>
          <tr><td><strong>PMax</strong></td><td>Build a PMax campaign. Upload assets. Create asset groups. Set audience signals.</td><td>Build 1 PMax campaign in training account.</td></tr>
          <tr><td><strong>Reporting</strong></td><td>Pull key metrics from Google Ads. Use columns, segments, date ranges. Export data.</td><td>Pull a weekly performance report for a sample account.</td></tr>
        </table>
      </div>

      <h4 style="color:var(--accent);font-size:1.08rem;margin-top:1rem;">Week 4: Meta Ads Hands-On</h4>
      <div class="table-wrap">
        <table>
          <tr><th style="width:20%">Focus</th><th>Activities</th><th style="width:30%">Deliverable</th></tr>
          <tr><td><strong>Campaign Setup</strong></td><td>Navigate Ads Manager. Build a conversion campaign: objective, ad set (audience, budget, placements), ads (image + video).</td><td>Build 1 complete Meta campaign in training account.</td></tr>
          <tr><td><strong>Audiences</strong></td><td>Create custom audiences (website, engagement). Build lookalikes. Understand Advantage+ audience.</td><td>Build 3 audiences for a sample client scenario.</td></tr>
          <tr><td><strong>Creative</strong></td><td>Upload creative in correct specs (4:5, 1:1, 9:16). Add text overlays for Stories/Reels. Traffic DPA catalog.</td><td>Set up ads with 3 creative variations across formats.</td></tr>
          <tr><td><strong>Pixel + Events</strong></td><td>Review Pixel setup, Events Manager, CAPI. Understand standard vs custom events. Test events.</td><td>Walk through a live client's Events Manager. Document conversion setup.</td></tr>
        </table>
      </div>

      <div class="callout blue" style="margin-top:1rem;">
        <strong>📚 Phase 2 Resources:</strong><br>
        <a href="https://skillshop.exceedlms.com/student/catalog/list?category_ids=2844" target="_blank">Google Skillshop: Search Certification Course</a><br>
        <a href="https://skillshop.exceedlms.com/student/catalog/list?category_ids=6290" target="_blank">Google Skillshop: Shopping Ads Course</a><br>
        <a href="https://www.facebook.com/business/learn/certification/exams/100-101-exam" target="_blank">Meta Blueprint: Marketing Associate Prep</a><br>
        <a href="https://support.google.com/google-ads/answer/6146252" target="_blank">Google Ads Editor (download + tutorial)</a><br>
        <a href="https://www.youtube.com/watch?v=sDm8MnQPmGs" target="_blank">Google Ads Tutorial for Beginners (YouTube)</a><br>
        <a href="https://www.youtube.com/watch?v=QFs6QH-CqJs" target="_blank">Meta Ads Complete Tutorial (YouTube)</a><br>
        📖 On this site: <em>Google Best Practices tab, Meta Best Practices tab</em>
      </div>
    </div>

    <!-- PHASE 3: WEEKS 5-6 -->
    <div class="card"><h3>📐 Phase 3: Processes & QA (Weeks 5-6)</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Goal: Master Tiger Tracks processes. Accuracy and attention to detail are the focus.</p>

      <div class="table-wrap">
        <table>
          <tr><th style="width:25%">Skill Area</th><th>Training Activities</th><th style="width:30%">Deliverable</th></tr>
          <tr><td><strong>Naming Conventions</strong></td><td>Learn TT naming convention templates for campaigns, ad groups, UTMs. Practice renaming a sample account.</td><td>Rename a mock account correctly. Zero errors.</td></tr>
          <tr><td><strong>Change Logs</strong></td><td>How to document what was changed, when, and why. Review real change logs from active accounts.</td><td>Maintain change log for 1 week on a live account (shadowing).</td></tr>
          <tr><td><strong>QA Process</strong></td><td>QA campaign builds before launch: check targeting, budget, schedule, creative, URLs, tracking. QA live links and landing pages across devices.</td><td>QA checklist completed for 3 mock campaigns.</td></tr>
          <tr><td><strong>UTM Building</strong></td><td>Build UTMs using TT template. Validate in GA4. Understand source/medium/campaign structure.</td><td>Build UTMs for 5 campaigns. Verify in GA4 real-time.</td></tr>
          <tr><td><strong>Reporting</strong></td><td>Build reporting slides using TT templates. Pull data from Google + Meta. Capture screenshots. Format pacing sheets.</td><td>Complete a full weekly report for a sample account.</td></tr>
          <tr><td><strong>Creative Trafficking</strong></td><td>Request creative from client/internal team. Organize in shared drive. Upload to platforms with correct naming. Rotate winners.</td><td>Traffic creative for 2 campaigns end-to-end.</td></tr>
        </table>
      </div>

      <div class="callout blue" style="margin-top:1rem;">
        <strong>📚 Phase 3 Resources:</strong><br>
        <a href="https://ga-dev-tools.google/campaign-url-builder/" target="_blank">Google Campaign URL Builder (UTM tool)</a><br>
        <a href="https://support.google.com/tagmanager/answer/6102821" target="_blank">Google Tag Manager Fundamentals</a><br>
        <a href="https://support.google.com/analytics/answer/9304153" target="_blank">GA4 Setup Guide (verify conversions)</a><br>
        📋 TT Templates: <em>Naming Convention Template, UTM Builder, Change Log, Reporting Template, QA Checklist</em><br>
        📖 On this site: <em>Templates section (7 interactive templates), Google Best Practices: Naming Conventions</em>
      </div>
    </div>

    <!-- PHASE 4: WEEKS 7-8 -->
    <div class="card"><h3>🤝 Phase 4: Client Exposure (Weeks 7-8)</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Goal: Understand client communication and begin supporting live accounts under close supervision.</p>

      <div class="table-wrap">
        <table>
          <tr><th style="width:25%">Activity</th><th>Details</th><th style="width:25%">Deliverable</th></tr>
          <tr><td><strong>Shadow Client Calls</strong></td><td>Attend 4-6 client calls across different account types. Take detailed notes. Identify action items.</td><td>Meeting notes submitted in Asana within 1 hour of each call.</td></tr>
          <tr><td><strong>Client Communication</strong></td><td>How to write professional client emails. When to escalate. What never to say. Review TT tone/voice.</td><td>Draft 3 sample client emails for mentor review.</td></tr>
          <tr><td><strong>Live Account Support</strong></td><td>Begin supporting 1-2 Tier 4 accounts under strategist. Pull daily numbers. Update pacing sheets. Traffic creative.</td><td>Daily pacing updates delivered on time for 2 weeks.</td></tr>
          <tr><td><strong>Onboarding Support</strong></td><td>Support a new client onboarding: gather access, complete intake checklist, set up tracking sheets.</td><td>Complete onboarding checklist for 1 new account.</td></tr>
        </table>
      </div>

      <div class="callout blue" style="margin-top:1rem;">
        <strong>📚 Phase 4 Resources:</strong><br>
        <a href="https://www.hubspot.com/blog/marketing/client-communication" target="_blank">Professional Client Communication Guide</a><br>
        📖 On this site: <em>Management Playbook (Problem-Solving Pyramid, specifically Levels 3-5), Roles & Responsibilities (AC role), Meeting Agendas (Weekly Sync template)</em><br>
        📋 TT Templates: <em>New Account Onboarding Checklist, Weekly Sync Prep, Meeting Notes Template</em>
      </div>
    </div>

    <!-- PHASE 5: WEEKS 9-10 -->
    <div class="card"><h3>⚡ Phase 5: Execution & Optimization (Weeks 9-10)</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Goal: Begin executing real optimizations and managing AC-level tasks independently (with oversight).</p>

      <div class="table-wrap">
        <table>
          <tr><th style="width:25%">Skill</th><th>Activities</th><th style="width:25%">Deliverable</th></tr>
          <tr><td><strong>Basic Optimizations</strong></td><td>Pause underperformers, rotate winners, adjust bids (with approval). Negative keyword scrubs. Search term reviews.</td><td>Execute 10+ optimizations across live accounts. All logged.</td></tr>
          <tr><td><strong>Ad Copy Writing</strong></td><td>Write RSAs following brand guidelines. Write Meta ad copy (body, headline, description). A/B test variants.</td><td>Write and launch 5 ad copy variations. Track performance.</td></tr>
          <tr><td><strong>Campaign Builds</strong></td><td>Build campaigns for Tier 3-4 clients from strategy briefs. Full end-to-end: settings, targeting, creative, tracking.</td><td>2 campaign builds QA'd and approved by strategist.</td></tr>
          <tr><td><strong>Pacing & Budgets</strong></td><td>Own daily pacing checks for assigned accounts. Flag overspend/underspend. Recommend budget shifts.</td><td>Daily pacing reports for all assigned accounts. Zero missed alerts.</td></tr>
        </table>
      </div>

      <div class="callout blue" style="margin-top:1rem;">
        <strong>📚 Phase 5 Resources:</strong><br>
        <a href="https://support.google.com/google-ads/answer/2472725" target="_blank">Google Ads: Negative Keywords Guide</a><br>
        <a href="https://support.google.com/google-ads/answer/7056544" target="_blank">Google Ads: Responsive Search Ads Best Practices</a><br>
        <a href="https://www.facebook.com/business/help/1693381447650068" target="_blank">Meta: Ad Copy Best Practices</a><br>
        <a href="https://support.google.com/google-ads/answer/2404248" target="_blank">Google Ads: Budget and Pacing Guide</a><br>
        📖 On this site: <em>Google Best Practices (Search: Ad Copy, Budget Capping), Meta Best Practices (Creative Best Practices, When to Pause)</em>
      </div>
    </div>

    <!-- PHASE 6: WEEKS 11-12 -->
    <div class="card"><h3>🎯 Phase 6: Independence & Certification (Weeks 11-12)</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Goal: Demonstrate AC competency. Complete certifications. Take on full account support responsibilities.</p>

      <div class="table-wrap">
        <table>
          <tr><th style="width:25%">Milestone</th><th>Details</th><th style="width:25%">Target</th></tr>
          <tr><td><strong>Google Ads Search Cert</strong></td><td>Complete Google Skillshop Search Certification exam.</td><td>Pass with 80%+</td></tr>
          <tr><td><strong>Google Ads Measurement Cert</strong></td><td>Complete Measurement Certification.</td><td>Pass with 80%+</td></tr>
          <tr><td><strong>Meta Blueprint (optional)</strong></td><td>Meta Certified Digital Marketing Associate.</td><td>Attempt by end of Week 12</td></tr>
          <tr><td><strong>Full Account Load</strong></td><td>Supporting 4-6 accounts across Tier 3-4 with strategist oversight.</td><td>6-10 accounts by Month 4</td></tr>
          <tr><td><strong>Self-Evaluation</strong></td><td>Complete the Self-Evaluation Survey (on this site) rating yourself on all AC tasks.</td><td>All tasks rated. Manager review scheduled.</td></tr>
          <tr><td><strong>90-Day Review</strong></td><td>Manager conducts formal review using Monthly Feedback template.</td><td>4+ rating on core AC tasks</td></tr>
        </table>
      </div>

      <div class="callout blue" style="margin-top:1rem;">
        <strong>📚 Phase 6 Resources:</strong><br>
        <a href="https://skillshop.exceedlms.com/student/catalog/list?category_ids=2844" target="_blank">Google Skillshop: All Certification Exams</a><br>
        <a href="https://www.facebook.com/business/learn/certification" target="_blank">Meta Blueprint: Certification Portal</a><br>
        <a href="https://skillshop.exceedlms.com/student/catalog/list?category_ids=6431" target="_blank">Google Analytics Certification</a><br>
        📖 On this site: <em>Self-Evaluation Survey (rate yourself on AC tasks), Meeting Agendas (Monthly Feedback Review template), Roles & Responsibilities (AC → AS promotion path)</em>
      </div>
    </div>

    <!-- CERTIFICATIONS REQUIRED -->
    <div class="card"><h3>🏅 Required Certifications</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;">
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
          <h4 style="margin:0;font-size:1.08rem;">Google Ads Search</h4>
          <p style="font-size:0.96rem;color:var(--text-light);margin:.25rem 0;">Required by Week 12</p>
          <a href="https://skillshop.exceedlms.com/student/catalog/list?category_ids=2844" target="_blank" style="font-size:0.96rem;">→ Google Skillshop</a>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
          <h4 style="margin:0;font-size:1.08rem;">Google Ads Measurement</h4>
          <p style="font-size:0.96rem;color:var(--text-light);margin:.25rem 0;">Required by Week 12</p>
          <a href="https://skillshop.exceedlms.com/student/catalog/list?category_ids=2844" target="_blank" style="font-size:0.96rem;">→ Google Skillshop</a>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
          <h4 style="margin:0;font-size:1.08rem;">Google Analytics 4</h4>
          <p style="font-size:0.96rem;color:var(--text-light);margin:.25rem 0;">Recommended by Month 4</p>
          <a href="https://skillshop.exceedlms.com/student/catalog/list?category_ids=6431" target="_blank" style="font-size:0.96rem;">→ Google Skillshop</a>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:1rem;border-radius:12px;">
          <h4 style="margin:0;font-size:1.08rem;">Meta Certified Associate</h4>
          <p style="font-size:0.96rem;color:var(--text-light);margin:.25rem 0;">Recommended by Month 4</p>
          <a href="https://www.facebook.com/business/learn/certification" target="_blank" style="font-size:0.96rem;">→ Meta Blueprint</a>
        </div>
      </div>
    </div>

    <!-- ONGOING LEARNING -->
    <div class="card"><h3>📈 Ongoing Development (Month 4+)</h3>
      <ul>
        <li><strong>Google Shopping Certification</strong> - Required once supporting eComm accounts</li>
        <li><strong>LinkedIn Marketing Certification</strong> - Required once supporting B2B accounts</li>
        <li><strong>Google Ads Display/Video</strong> - Recommended for full-funnel understanding</li>
        <li><strong>Shadow senior team members</strong> - Monthly ride-alongs on Tier 1-2 accounts</li>
        <li><strong>Read the TT Best Practices tabs</strong> - Google, Meta, LinkedIn (on this site)</li>
        <li><strong>Weekly 1:1s with manager</strong> - Using the Weekly Manager Sync template</li>
        <li><strong>Monthly self-evaluation</strong> - Track progress toward Account Strategist promotion</li>
      </ul>
      <div class="callout" style="margin-top:.75rem;">
        <strong>Path to Promotion:</strong> Account Coordinator → Account Strategist typically takes 6-12 months. You must have a 4+ manager rating on ALL current-role tasks in the Self-Evaluation before beginning aspirational (AS-level) tasks. Talk to your manager about the timeline.
      </div>
    </div>

    <!-- WHAT SUCCESS LOOKS LIKE -->
    <div class="card"><h3>🏆 What a Fully Trained AC Looks Like</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.75rem;margin-top:.5rem;">
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">✅</div><strong style="font-size:0.96rem;">Builds campaigns error-free</strong><br><span style="font-size:0.84rem;color:var(--text-light);">&lt;1% QA rework rate</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">📊</div><strong style="font-size:0.96rem;">Pulls reports independently</strong><br><span style="font-size:0.84rem;color:var(--text-light);">On-time, accurate, formatted</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">🔄</div><strong style="font-size:0.96rem;">Executes optimizations daily</strong><br><span style="font-size:0.84rem;color:var(--text-light);">Logged, approved, impactful</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">💬</div><strong style="font-size:0.96rem;">Communicates proactively</strong><br><span style="font-size:0.84rem;color:var(--text-light);">Status updates without being asked</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">📋</div><strong style="font-size:0.96rem;">Manages 6-10 accounts</strong><br><span style="font-size:0.84rem;color:var(--text-light);">Tier 3-4, $12K+ MR</span>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">🏅</div><strong style="font-size:0.96rem;">Certified</strong><br><span style="font-size:0.84rem;color:var(--text-light);">Google Search + Measurement</span>
        </div>
      </div>
    </div>

    <div class="card"><h3>📝 New Hire Training Quiz</h3><div id="quizNewHire"></div></div>
  </div>

  <!-- ASANA TAB -->
  <div id="bp-asana" class="bp-tab-content" style="display:none;">

    <div style="display:flex;gap:.5rem;margin-bottom:1rem;">
      <button class="rv-tab active" data-asanatab="newhires" onclick="switchAsanaTab('newhires')">🎓 New Hires</button>
      <button class="rv-tab" data-asanatab="overview" onclick="switchAsanaTab('overview')">📋 Current Employees</button>
    </div>

    <!-- NEW HIRES TAB -->
    <div id="asana-newhires" class="asana-tab-content">

    <div class="callout green" style="margin-bottom:1.5rem;">
      <strong>Training Goal:</strong> Equip the account management team to create and manage tasks, build projects, use key views (List, Board, Calendar, Timeline), communicate inside Asana, and track work without relying on email/Slack.
    </div>

    <!-- WEEK 1 TRAINING PLAN -->
    <div class="card"><h3>📅 Week 1 Training Plan</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-top:.75rem;">

        <div style="background:var(--bg);border-radius:8px;padding:1rem;border-left:4px solid var(--accent);">
          <h4 style="color:var(--accent);margin-bottom:.5rem;">Day 1: Asana Basics (60 min)</h4>
          <p style="font-size:1.02rem;font-weight:600;">Watch Together:</p>
          <ul style="font-size:0.96rem;">
            <li><a href="https://help.asana.com/s/article/getting-started-video?language=en-US" target="_blank">Getting Started with Asana</a> (official beginner video)</li>
            <li><a href="https://www.youtube.com/playlist?list=PLJFG93oi0wJAofhQ8Zoyi7D6YKRWHgLDi" target="_blank">Beginner Playlist</a> (YouTube)</li>
          </ul>
          <p style="font-size:1.02rem;font-weight:600;margin-top:.5rem;">Live Demo (Team Lead):</p>
          <ul style="font-size:0.96rem;">
            <li>Create a project</li>
            <li>Create/assign tasks</li>
            <li>Add due dates and priorities</li>
            <li>Comment and collaborate</li>
          </ul>
          <p style="font-size:1.02rem;font-weight:600;margin-top:.5rem;">Homework:</p>
          <ul style="font-size:0.96rem;">
            <li>Create 5 personal tasks</li>
            <li>Add at least 1 task for someone else</li>
          </ul>
        </div>

        <div style="background:var(--bg);border-radius:8px;padding:1rem;border-left:4px solid var(--accent);">
          <h4 style="color:var(--accent);margin-bottom:.5rem;">Day 2: Hands-On Practice (45-60 min)</h4>
          <p style="font-size:1.02rem;font-weight:600;">Q&A:</p>
          <ul style="font-size:0.96rem;"><li>Review anything unclear from Day 1</li></ul>
          <p style="font-size:1.02rem;font-weight:600;margin-top:.5rem;">Team Practice:</p>
          <ul style="font-size:0.96rem;">
            <li>Build a sample project</li>
            <li>Create sections</li>
            <li>Add tasks + subtasks</li>
            <li>Use different views</li>
          </ul>
          <p style="font-size:1.02rem;font-weight:600;margin-top:.5rem;">Best Practices:</p>
          <ul style="font-size:0.96rem;">
            <li>One owner per task</li>
            <li>Use comments for updates</li>
            <li>Check "My Tasks" daily</li>
          </ul>
        </div>

        <div style="background:var(--bg);border-radius:8px;padding:1rem;border-left:4px solid var(--accent);">
          <h4 style="color:var(--accent);margin-bottom:.5rem;">Day 3: Views & Daily Workflow (30-45 min)</h4>
          <p style="font-size:1.02rem;font-weight:600;">Focus On:</p>
          <ul style="font-size:0.96rem;">
            <li>My Tasks view</li>
            <li>List vs Board vs Timeline</li>
            <li>Filters and search</li>
          </ul>
          <p style="font-size:1.02rem;font-weight:600;margin-top:.5rem;">Homework:</p>
          <ul style="font-size:0.96rem;">
            <li>Clean up your My Tasks list</li>
            <li>Organize tasks by priority</li>
          </ul>
        </div>

        <div style="background:var(--bg);border-radius:8px;padding:1rem;border-left:4px solid var(--accent);">
          <h4 style="color:var(--accent);margin-bottom:.5rem;">Day 4: Team Norms + Automations (30 min)</h4>
          <p style="font-size:1.02rem;font-weight:600;">Establish Rules:</p>
          <ul style="font-size:0.96rem;">
            <li>Naming conventions</li>
            <li>Where projects live</li>
            <li>When to use subtasks</li>
          </ul>
          <p style="font-size:1.02rem;font-weight:600;margin-top:.5rem;">Bonus:</p>
          <ul style="font-size:0.96rem;">
            <li>Intro to simple automations (Asana Rules)</li>
          </ul>
        </div>

        <div style="background:var(--bg);border-radius:8px;padding:1rem;border-left:4px solid var(--accent);">
          <h4 style="color:var(--accent);margin-bottom:.5rem;">Day 5: Adoption Check (30 min)</h4>
          <p style="font-size:1.02rem;font-weight:600;">Review Usage:</p>
          <ul style="font-size:0.96rem;">
            <li>Tasks have owners</li>
            <li>Due dates are used</li>
            <li>Conversations are in Asana</li>
          </ul>
          <p style="font-size:1.02rem;font-weight:600;margin-top:.5rem;">Fix Common Issues:</p>
          <ul style="font-size:0.96rem;">
            <li>Duplicate projects</li>
            <li>No due dates</li>
            <li>Tasks without assignees</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- SUCCESS CRITERIA -->
    <div class="card"><h3>🎯 What Success Looks Like After Week 1</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.75rem;margin-top:.75rem;">
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">🏗️</div><strong style="font-size:1.02rem;">Build & Organize Projects</strong>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">✅</div><strong style="font-size:1.02rem;">Create & Assign Tasks</strong>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">💬</div><strong style="font-size:1.02rem;">Comments Over Slack</strong>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">📋</div><strong style="font-size:1.02rem;">Check My Tasks Daily</strong>
        </div>
        <div style="background:#0A1119;color:#FFFFFF;padding:.75rem;border-radius:12px;text-align:center;">
          <div style="font-size:1.5rem;">🔀</div><strong style="font-size:1.02rem;">Navigate Views Confidently</strong>
        </div>
      </div>
    </div>

    <!-- ASANA FROM SLACK -->
    <div class="card"><h3>💬 Creating Asana Tasks from Slack</h3>
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:.75rem;">Three ways to turn Slack messages into Asana tasks instantly.</p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;">
        <div style="background:var(--bg);border-radius:8px;padding:1rem;">
          <h4 style="color:var(--accent);font-size:1.08rem;">Option 1: From Any Message</h4>
          <ol style="font-size:0.96rem;padding-left:1.25rem;">
            <li>Hover over any Slack message</li>
            <li>Click the <strong>... (More actions)</strong> menu</li>
            <li>Select <strong>"Create a task"</strong></li>
            <li>Choose the Asana project</li>
            <li>Set assignee, due date, description</li>
            <li>Click <strong>Create Task</strong></li>
          </ol>
          <p style="font-size:0.96rem;color:var(--text-light);margin-top:.5rem;">The Slack message will be linked inside the Asana task.</p>
        </div>

        <div style="background:var(--bg);border-radius:8px;padding:1rem;">
          <h4 style="color:var(--accent);font-size:1.08rem;">Option 2: Slash Command</h4>
          <p style="font-size:1.02rem;">In any channel or DM, type:</p>
          <div style="background:#1B2126;color:#FFFFFF;padding:.5rem .75rem;border-radius:6px;font-family:monospace;font-size:1.02rem;margin:.5rem 0;">/asana create</div>
          <p style="font-size:0.96rem;">Slack will prompt you to name the task, choose project, assignee, and due date.</p>
        </div>

        <div style="background:var(--bg);border-radius:8px;padding:1rem;">
          <h4 style="color:var(--accent);font-size:1.08rem;">Option 3: DMs & Private Channels</h4>
          <p style="font-size:1.02rem;">You can also create tasks from:</p>
          <ul style="font-size:0.96rem;">
            <li>Direct messages</li>
            <li>Private channels (if you're a member)</li>
            <li>Public channels</li>
          </ul>
        </div>
      </div>

      <div style="margin-top:1rem;">
        <h4 style="font-size:1.08rem;">Setup: Connect Asana to Slack</h4>
        <ol style="font-size:1.02rem;padding-left:1.25rem;">
          <li>In Slack, go to <strong>Apps</strong></li>
          <li>Search for <strong>Asana</strong></li>
          <li>Click <strong>Add to Slack</strong></li>
          <li>Log into your Asana account and authorize</li>
        </ol>
        <p style="font-size:0.96rem;margin-top:.25rem;">Or install from: <a href="https://asana.com/apps/slack" target="_blank">asana.com/apps/slack</a></p>
      </div>

      <div class="callout" style="margin-top:1rem;">
        <strong>🏆 Best Practice:</strong> If it requires work, it becomes an Asana task. Don't let Slack become a graveyard of "we should do this." Convert action items immediately.
      </div>
    </div>

    <!-- WHAT HAPPENS AFTER -->
    <div class="card"><h3>🔔 Slack Notifications</h3>
      <p style="font-size:1.02rem;">After creating tasks from Slack, you'll get Slack notifications when tasks are:</p>
      <ul>
        <li><strong>Assigned to you</strong></li>
        <li><strong>Completed</strong></li>
        <li><strong>Commented on</strong></li>
      </ul>
    </div>

    <!-- TIGER TRACKS NORMS -->
    <div class="card"><h3>📏 Tiger Tracks Asana Norms</h3>
      <div class="table-wrap">
        <table>
          <tr><th style="width:30%">Rule</th><th>Details</th></tr>
          <tr><td><strong>One owner per task</strong></td><td>Every task must have a single assignee. If multiple people are involved, use subtasks.</td></tr>
          <tr><td><strong>Due dates always</strong></td><td>No task should exist without a due date. Even estimates are better than nothing.</td></tr>
          <tr><td><strong>Comments over Slack</strong></td><td>Task-related updates go in Asana comments, not Slack threads. Keep context with the work.</td></tr>
          <tr><td><strong>Check My Tasks daily</strong></td><td>Start each day by reviewing your My Tasks. This is your daily to-do list.</td></tr>
          <tr><td><strong>Naming conventions</strong></td><td>Use clear, descriptive task names. Start with an action verb (e.g., "Build Q2 report for [Client]").</td></tr>
          <tr><td><strong>Use sections</strong></td><td>Organize projects with sections (e.g., "To Do," "In Progress," "Complete," "Blocked").</td></tr>
          <tr><td><strong>Subtasks for breakdowns</strong></td><td>Use subtasks when a task has multiple steps. Keep parent task as the outcome.</td></tr>
        </table>
      </div>
    </div>

    <!-- TRAINING RESOURCES -->
    <div class="card"><h3>🎓 Training Resources</h3>
      <h4 style="margin-top:.5rem;">Official Asana Courses & Videos</h4>
      <ul>
        <li><a href="https://academy.asana.com/" target="_blank"><strong>Asana Academy</strong></a> - Free structured courses (Foundations & team member paths)</li>
        <li><a href="https://academy.asana.com/page/video-tutorials" target="_blank"><strong>Video Tutorials Library</strong></a> - Short topic-specific videos</li>
        <li><a href="https://academy.asana.com/getting-started-with-asana-live" target="_blank"><strong>Live Training Sessions</strong></a> - Register for beginner sessions</li>
      </ul>
      <h4 style="margin-top:.75rem;">YouTube Tutorials</h4>
      <ul>
        <li><a href="https://www.youtube.com/playlist?list=PLJFG93oi0wJAofhQ8Zoyi7D6YKRWHgLDi" target="_blank"><strong>Official Beginner Playlist</strong></a> - Short intro clips, perfect for Day 1</li>
        <li><a href="https://www.youtube.com/watch?v=0IqlyoNA39Q" target="_blank"><strong>Full Beginner's Guide</strong></a> - Step-by-step walkthrough (2026)</li>
      </ul>
    </div>

    <!-- WEEK 2 OPTIONAL -->
    <div class="card"><h3>📈 Optional Week 2 Topics</h3>
      <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.5rem;">
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Templates</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Dashboards & Reporting</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Workload & Capacity Planning</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Integrations (Slack, Gmail, HubSpot)</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Custom Fields</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Portfolios</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Advanced Automations</span>
        <span class="badge" style="background:#1B2126;color:#FFFFFF;">Goals & Milestones</span>
      </div>
    </div>
  </div>

    </div><!-- /asana-newhires -->

    <!-- CURRENT EMPLOYEES TAB -->
    <div id="asana-overview" class="asana-tab-content" style="display:none;">

    <div class="callout blue" style="margin-bottom:1.5rem;">
      <strong>Asana Overview:</strong> Quick reference for current employees who need a refresher on Tiger Tracks Asana workflows, conventions, and best practices.
    </div>

    <div class="card"><h3>🏗️ Tiger Tracks Asana Structure</h3>
      <ul style="font-size:1.02rem;">
        <li><strong>Workspace:</strong> Tiger Tracks (everyone is a member)</li>
        <li><strong>Teams:</strong> Organized by pod or function (e.g., "Charlotte Pod," "Riley Pod," "Marketing")</li>
        <li><strong>Projects:</strong> Each client has its own project; internal work has dedicated projects</li>
        <li><strong>Sections:</strong> Used to organize tasks within a project (e.g., "To Do," "In Progress," "Completed," "On Hold")</li>
      </ul>
    </div>

    <div class="card"><h3>📝 Task Conventions</h3>
      <ul style="font-size:1.02rem;">
        <li><strong>Task naming:</strong> [Client Name] - Description (e.g., "[Acme] - March reporting deck")</li>
        <li><strong>Assignee:</strong> Every task must have ONE assignee (the person responsible for completion)</li>
        <li><strong>Due dates:</strong> Every task must have a due date</li>
        <li><strong>Subtasks:</strong> Break large tasks into actionable subtasks; assign each subtask individually</li>
        <li><strong>Comments:</strong> Use task comments for updates instead of Slack/email; @ mention people for visibility</li>
        <li><strong>Attachments:</strong> Attach relevant docs, screenshots, or links directly to the task</li>
        <li><strong>Custom fields:</strong> Use Priority (Low/Medium/High/Urgent) and Status fields consistently</li>
      </ul>
    </div>

    <div class="card"><h3>📊 Views You Should Know</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin-top:.75rem;">
        <div style="background:var(--bg);border-radius:8px;padding:.75rem;border-left:4px solid var(--accent);">
          <h4 style="color:var(--accent);">List View</h4>
          <p style="font-size:0.984rem;">Default view. Best for seeing all tasks with details. Sort by due date to see what is coming up. Use filters to show only your tasks.</p>
        </div>
        <div style="background:var(--bg);border-radius:8px;padding:.75rem;border-left:4px solid #8b5cf6;">
          <h4 style="color:#8b5cf6;">Board View</h4>
          <p style="font-size:0.984rem;">Kanban-style. Drag tasks between columns (sections). Great for visualizing workflow status at a glance.</p>
        </div>
        <div style="background:var(--bg);border-radius:8px;padding:.75rem;border-left:4px solid #f59e0b;">
          <h4 style="color:#f59e0b;">Calendar View</h4>
          <p style="font-size:0.984rem;">See tasks by due date on a calendar. Useful for spotting deadline clusters and planning your week.</p>
        </div>
        <div style="background:var(--bg);border-radius:8px;padding:.75rem;border-left:4px solid #ef4444;">
          <h4 style="color:#FFFFFF;">My Tasks</h4>
          <p style="font-size:0.984rem;">Your personal task list across ALL projects. Organize into "Do Today," "Do This Week," and "Do Later." Check this every morning.</p>
        </div>
      </div>
    </div>

    <div class="card"><h3>⚡ Daily Asana Habits</h3>
      <ol style="font-size:1.02rem;">
        <li><strong>Morning:</strong> Check "My Tasks" - review what is due today and this week</li>
        <li><strong>During work:</strong> Update task status as you complete work; add comments with progress notes</li>
        <li><strong>After meetings:</strong> Create tasks for any action items immediately; assign and set due dates</li>
        <li><strong>Before end of day:</strong> Move completed tasks to done; update any tasks that need new dates</li>
        <li><strong>Weekly:</strong> Review your project boards; archive completed tasks; update priorities</li>
      </ol>
    </div>

    <div class="card"><h3>🔔 Notification Best Practices</h3>
      <ul style="font-size:1.02rem;">
        <li>Turn on notifications for projects you are actively working on</li>
        <li>Use "Follow" on tasks you need updates on but are not assigned to</li>
        <li>Check your Asana Inbox daily - it shows all updates relevant to you</li>
        <li>Do NOT rely on email notifications alone; go into Asana directly</li>
        <li>Mute projects that are not relevant to reduce noise</li>
      </ul>
    </div>

    <div class="card"><h3>🚫 Common Mistakes to Avoid</h3>
      <ul style="font-size:1.02rem;">
        <li><strong>No assignee:</strong> Unassigned tasks do not get done. Every task needs an owner.</li>
        <li><strong>No due date:</strong> Tasks without deadlines get deprioritized. Always set a date.</li>
        <li><strong>Using Slack instead of Asana:</strong> If it is a deliverable or action item, it belongs in Asana, not a Slack thread.</li>
        <li><strong>Duplicate tasks:</strong> Search before creating. Use multi-homing (adding a task to multiple projects) instead of duplicating.</li>
        <li><strong>Huge tasks:</strong> If a task takes more than 2 hours, break it into subtasks.</li>
        <li><strong>Ignoring "My Tasks":</strong> This is your single source of truth for what you need to do.</li>
      </ul>
    </div>

    <div class="card"><h3>🔗 Asana + Slack Integration</h3>
      <ul style="font-size:1.02rem;">
        <li>Use the Asana Slack app to create tasks directly from Slack messages</li>
        <li>Get Asana notifications in Slack for task assignments and due dates</li>
        <li>When someone asks you to do something in Slack, reply with "Created an Asana task" and link it</li>
        <li>Rule of thumb: discuss in Slack, track in Asana</li>
      </ul>
    </div>

    </div><!-- /asana-overview -->

  </div>

</div>

<!-- RECRUITING: SR AM SCREENING TOOL -->
<div class="section" id="pto-request">
  <h2>🏖️ PTO Request System</h2>
  <p style="color:var(--text-light);margin-bottom:1.5rem;">Submit time-off requests directly. Your manager will be notified and can approve or deny from their browser.</p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;max-width:100%;margin:0 auto;">
    <!-- REQUEST FORM -->
    <div class="card" style="padding:1.5rem;">
      <h3 style="margin-bottom:1rem;font-size:1.2rem;">📝 New PTO Request</h3>
      <div style="display:flex;flex-direction:column;gap:.75rem;">
        <div>
          <label style="font-size:0.96rem;font-weight:600;display:block;margin-bottom:.25rem;">Your Name</label>
          <select id="ptoEmployee" style="width:100%;padding:.75rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;background:#1B2126;color:#FFFFFF;" onchange="ptoAutoManager()">
            <option value="">Select your name...</option>
          </select>
        </div>
        <div>
          <label style="font-size:0.96rem;font-weight:600;display:block;margin-bottom:.25rem;">Manager (auto-filled)</label>
          <input id="ptoManager" type="text" readonly style="width:100%;padding:.75rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;background:#f0f0f0;color:#1A1A1A;;color:#0A1119">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;">
          <div>
            <label style="font-size:0.96rem;font-weight:600;display:block;margin-bottom:.25rem;">Start Date</label>
            <input id="ptoStart" type="date" style="width:100%;padding:.75rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;">
          </div>
          <div>
            <label style="font-size:0.96rem;font-weight:600;display:block;margin-bottom:.25rem;">End Date</label>
            <input id="ptoEnd" type="date" style="width:100%;padding:.75rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;">
          </div>
        </div>
        <div>
          <label style="font-size:0.96rem;font-weight:600;display:block;margin-bottom:.25rem;">Type</label>
          <select id="ptoType" style="width:100%;padding:.75rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;background:#1B2126;color:#FFFFFF;">
            <option value="Vacation">🏖️ Vacation</option>
            <option value="Sick">🤒 Sick Day</option>
            <option value="Personal">🏠 Personal Day</option>
            <option value="Mental Health">🧠 Mental Health Day</option>
            <option value="Bereavement">💐 Bereavement</option>
            <option value="Parental">👶 Parental Leave</option>
            <option value="Other">📋 Other</option>
          </select>
        </div>
        <div>
          <label style="font-size:0.96rem;font-weight:600;display:block;margin-bottom:.25rem;">Reason / Notes (optional)</label>
          <textarea id="ptoReason" rows="5" style="width:100%;padding:.75rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;resize:vertical;" placeholder="Coverage plan, context, etc."></textarea>
        </div>
        <button onclick="submitPtoRequest()" style="background:var(--accent);color:#fff;border:none;padding:.6rem 1.5rem;border-radius:6px;font-size:1.02rem;font-weight:700;cursor:pointer;">Submit PTO Request</button>
      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div style="display:flex;flex-direction:column;gap:1rem;">
      <!-- PTO BALANCE -->
      <div class="card" style="padding:1.5rem;">
        <h3 style="margin-bottom:.75rem;font-size:1.2rem;">📊 PTO Balance</h3>
        <div id="ptoBalance" style="font-size:1.02rem;color:var(--text-light);">Select your name to view balance.</div>
      </div>
      <!-- MY REQUESTS -->
      <div class="card" style="padding:1.5rem;">
        <h3 style="margin-bottom:1rem;font-size:1.2rem;">📋 My Requests</h3>
        <div id="ptoMyRequests" style="font-size:1.02rem;color:var(--text-light);">Select your name to see your requests.</div>
      </div>
    </div>
  </div>

  <!-- MANAGER APPROVAL PANEL -->
  <div class="card" style="padding:1.5rem;margin-top:1.5rem;max-width:100%;">
    <h3 style="margin-bottom:1rem;font-size:1.2rem;">🔔 Manager Approval Queue</h3>
    <p style="font-size:0.96rem;color:var(--text-light);margin-bottom:.75rem;">If you're a manager, select your name above to see pending requests from your direct reports.</p>
    <div id="ptoApprovalQueue" style="font-size:1.02rem;color:var(--text-light);">No pending approvals.</div>
  </div>

  <!-- ALL REQUESTS LOG -->
  <div class="card" style="padding:1.5rem;margin-top:1.5rem;max-width:100%;">
    <h3 style="margin-bottom:1rem;font-size:1.2rem;">📊 Team PTO Calendar</h3>
    <div id="ptoCalendar" style="font-size:1.02rem;"></div>
  </div>
</div>

<!-- ===================== MONTHLY FEEDBACK LINKS ===================== -->
<div class="section" id="mfr-links">
  <h2 class="section-title">📋 Monthly Feedback Links</h2>
  <p style="color:var(--text-light);margin-bottom:1rem;">Individual feedback form links for each team member. Send their link via email or Slack. All submissions are stored on this site.</p>

  <div class="card" style="margin-bottom:1.5rem;">
    <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;margin-bottom:.75rem;">
      <select id="mfrMonth" onchange="renderMfrLinks()" style="padding:.5rem;border:1px solid var(--border);border-radius:6px;font-size:1.02rem;">
        <option value="March 2026">March 2026</option>
        <option value="April 2026">April 2026</option>
        <option value="May 2026">May 2026</option>
      </select>
      <button class="btn" onclick="copyAllMfrLinks()" style="font-size:0.984rem;padding:.4rem .8rem;">📋 Copy All Links</button>
      <span id="mfrCopyStatus" style="font-size:0.936rem;color:var(--success);display:none;">Copied!</span>
    </div>
    <div id="mfrLinkList"></div>
  </div>

  <h3 style="margin-bottom:.75rem;">📬 Submitted Feedback</h3>
  <div id="mfrSubmissions" class="card" style="padding:1rem;">
    <p style="color:var(--text-light);font-size:1.02rem;">Loading submissions...</p>
  </div>
</div>

<!-- feedback section moved into Culture & Standards -->

</div><!-- /container -->

<!-- BACK TO TOP -->
<button class="back-top" id="backTop" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑</button>




<!-- FOOTER -->
<div style="text-align:center; padding:2rem 0; color:var(--text-light); font-size:0.96rem; border-top:1px solid var(--border); margin-top:2rem;">
  <p>Tiger Tracks Team Resources &nbsp;•&nbsp; Internal Use Only &nbsp;•&nbsp; 2026</p>
  <button class="print-btn" onclick="window.print()" style="margin-top:.75rem;">🖨️ Print / Save as PDF</button>
</div>

<!-- BACKUP & RECOVERY -->
<div style="border-top:1px solid #e2e8f0;padding:0 1.5rem 2rem;max-width:900px;margin:0 auto;">
  <details>
    <summary style="cursor:pointer;padding:.75rem 0;font-size:0.96rem;font-weight:700;color:#64748b;list-style:none;display:flex;align-items:center;gap:.5rem;user-select:none;">
      ⚙️ Backup &amp; Recovery
      <span style="font-size:0.84rem;font-weight:400;margin-left:auto;color:#94a3b8;">v1.1 — 2026-03-13</span>
    </summary>
    <div style="display:flex;flex-wrap:wrap;gap:.6rem;padding:.5rem 0 .25rem;">
      <button onclick="(function(){var b=new Blob([document.documentElement.outerHTML],{type:'text/html'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='tt-resources_backup_'+new Date().toISOString().slice(0,10)+'.html';a.click();})()" style="background:#1B2126;color:#FFFFFF;border:1px solid #e2e8f0;border-radius:8px;padding:.45rem .9rem;font-size:0.936rem;font-weight:600;cursor:pointer;color:#1e293b;">📦 Export Full Backup (.html)</button>
      <button onclick="(function(){var keys=['tt_saved_templates'];var out={_exported:new Date().toISOString()};keys.forEach(function(k){try{out[k]=JSON.parse(localStorage.getItem(k)||'null');}catch(e){out[k]=null;}});var b=new Blob([JSON.stringify(out,null,2)],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='tt-resources_data_'+new Date().toISOString().slice(0,10)+'.json';a.click();})()" style="background:#1B2126;color:#FFFFFF;border:1px solid #e2e8f0;border-radius:8px;padding:.45rem .9rem;font-size:0.936rem;font-weight:600;cursor:pointer;color:#1e293b;">💾 Export Data (JSON)</button>
      <label style="background:#1B2126;color:#FFFFFF;border:1px solid #e2e8f0;border-radius:8px;padding:.45rem .9rem;font-size:0.936rem;font-weight:600;cursor:pointer;color:#1e293b;">
        📂 Import Data
        <input type="file" accept=".json" style="display:none;" onchange="(function(f){if(!f)return;var r=new FileReader();r.onload=function(e){try{var d=JSON.parse(e.target.result);Object.keys(d).forEach(function(k){if(k!=='_exported')localStorage.setItem(k,JSON.stringify(d[k]));});alert('Restored. Refreshing...');location.reload();}catch(err){alert('Invalid backup file');}};r.readAsText(f);})(this.files[0])">
      </label>
    </div>
    <p style="font-size:0.84rem;color:#94a3b8;margin-top:.35rem;">Export Full Backup = complete standalone HTML. Export Data = saved templates &amp; settings only.</p>
  </details>
</div>

</body>
`;
