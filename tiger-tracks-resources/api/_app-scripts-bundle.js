// _app-scripts-bundle.js
// Extracted script blocks from api/data.js — served as /api/scripts
// ─────────────────────────────────────────────────────────────────

function showToast(msg) {
  var t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#1B2126;color:#F4F1EB;padding:.75rem 1.5rem;border-radius:8px;font-size:.85rem;z-index:99999;box-shadow:0 4px 16px rgba(0,0,0,.3);';
  document.body.appendChild(t);
  setTimeout(function(){ t.remove(); }, 2500);
}

// ===================== TEMPLATES SYSTEM =====================
var templateDefs = [
  {
    id: 'dr-1on1',
    title: 'Direct Report: 15-Minute Weekly 1:1',
    icon: '👤',
    description: 'Weekly check-in template for direct reports to fill out before their 1:1.',
    sections: [
      { label: 'Account Updates, Wins & Progress', type: 'textarea', placeholder: '1–2 bullets on wins and progress this week...' },
      { label: 'Top Priority This Week', type: 'textarea', placeholder: 'What is your #1 focus this week?' },
      { label: 'Risks, Blockers, or Deadlines at Risk (incl. Churn)', type: 'textarea', placeholder: 'Flag anything that could slip...' },
      { label: 'Direct Reports Check-In (Accounts / Bandwidth / Feedback / People Mgmt)', type: 'textarea', placeholder: 'How are your direct reports doing?' },
      { label: 'Capacity Check', type: 'radio', options: ['Under','At','Over'] },
      { label: 'If Over, What needs to shift?', type: 'textarea', placeholder: '' },
      { label: 'Support/Feedback Needed From My Manager', type: 'textarea', placeholder: 'If nothing is blocked, say so clearly.' }
    ]
  },
  {
    id: 'mgr-1on1',
    title: 'Manager: Weekly 1:1',
    icon: '📋',
    description: 'Use this to run structured 1:1s with your direct reports. Ensure meaningful, clearly defined work.',
    sections: [
      { label: 'What\'s their #1 priority this week?', type: 'textarea', placeholder: '' },
      { label: 'Any blockers?', type: 'textarea', placeholder: '' },
      { label: 'Any deadlines at risk?', type: 'textarea', placeholder: '' },
      { label: 'Capacity', type: 'radio', options: ['Under','At','Over'] },
      { label: 'What do they need from you?', type: 'textarea', placeholder: '' },
      { label: 'Where can you unblock them?', type: 'textarea', placeholder: '' },
      { label: 'Wins & Progress, What went well?', type: 'textarea', placeholder: '' },
      { label: 'Alignment, Top 1–2 priorities confirmed', type: 'textarea', placeholder: 'Confirm and document next steps in one sentence each.' }
    ]
  },
  {
    id: 'expectations',
    title: 'Expectations-Setting',
    icon: '🎯',
    description: 'Use when you first become someone\'s manager or when resetting expectations.',
    sections: [
      { label: 'Outcomes tied to customer success (and managed revenue)', type: 'textarea', placeholder: 'Define clear outcomes...' },
      { label: 'Behaviors and communication norms', type: 'textarea', placeholder: 'Clarify expectations...' },
      { label: 'Cadence (weekly tactical, monthly development, async)', type: 'textarea', placeholder: 'Set the rhythm...' },
      { label: 'Confirm understanding, have them repeat it back', type: 'textarea', placeholder: 'Notes from their recap...' },
      { label: '90-Day Goal #1', type: 'input', placeholder: 'Must support customer success' },
      { label: '90-Day Goal #2', type: 'input', placeholder: 'Must support customer success' },
      { label: '90-Day Goal #3', type: 'input', placeholder: 'Must support customer success' },
      { label: 'How we\'ll work together', type: 'textarea', placeholder: 'Weekly 1:1s, quick Slack check-ins, monthly feedback-focused 1:1...' }
    ]
  },
  {
    id: 'delegation',
    title: 'Delegation Checklist',
    icon: '✅',
    description: 'Step-by-step checklist for delegating work effectively.',
    sections: [
      { label: '1. Define the outcome, What does "good" look like?', type: 'textarea', placeholder: '' },
      { label: '2. Clarify ownership, "You own this start to finish."', type: 'input', placeholder: 'Owner name' },
      { label: '3. Set the deadline', type: 'input', placeholder: 'YYYY-MM-DD' },
      { label: '4. Check understanding, Can they repeat back what they\'re delivering?', type: 'radio', options: ['Yes','Needs clarification'] },
      { label: '5. Check-in level', type: 'radio', options: ['None (autonomy)','One check-in (accountability)','Multiple (coaching)'] },
      { label: '6. Context or links provided', type: 'textarea', placeholder: 'Paste relevant links or context...' },
      { label: '7. "What could get in your way?"', type: 'textarea', placeholder: 'Their answer...' },
      { label: '8. Priority level', type: 'radio', options: ['🔴 Critical','🟡 High','🟢 Normal','⚪ Low'] },
      { label: '9. Logged in manager notes?', type: 'radio', options: ['Yes','Not yet'] }
    ]
  },
  {
    id: 'capacity',
    title: 'Capacity Check-In',
    icon: '📊',
    description: 'Quick weekly capacity check. 🔵 Under (0-25%) 🟢 Healthy (25-75%) 🟡 At Capacity (75-100%) 🔴 Over (100%+)',
    sections: [
      { label: 'Current Capacity Level', type: 'radio', options: ['🔵 Underloaded (0–25%)','🟢 Healthy (25–75%)','🟡 At Capacity (75–100%)','🔴 Overloaded (100%+)'] },
      { label: 'Top priority this week', type: 'textarea', placeholder: '' },
      { label: 'Any deadlines at risk?', type: 'textarea', placeholder: '' },
      { label: 'What can we shift or delegate?', type: 'textarea', placeholder: '' },
      { label: 'What do you need from me?', type: 'textarea', placeholder: '' }
    ]
  },
  {
    id: 'underperformance',
    title: 'Underperformance Correction',
    icon: '⚠️',
    description: 'Use when you need structure but not a formal PIP. 2–4 week improvement window.',
    sections: [
      { label: 'Team member name', type: 'input', placeholder: '' },
      { label: 'Issue #1 (reference customer success impact)', type: 'textarea', placeholder: '' },
      { label: 'Issue #2', type: 'textarea', placeholder: '' },
      { label: 'Issue #3', type: 'textarea', placeholder: '' },
      { label: 'Expectation #1 (support revenue protection & client experience)', type: 'textarea', placeholder: '' },
      { label: 'Expectation #2', type: 'textarea', placeholder: '' },
      { label: 'Expectation #3', type: 'textarea', placeholder: '' },
      { label: 'How I Will Support You', type: 'textarea', placeholder: 'Weekly check-ins, extra reviews, clear deadlines, guidance when stuck...' },
      { label: 'Success Indicator #1 (must align to client outcomes)', type: 'input', placeholder: '' },
      { label: 'Success Indicator #2', type: 'input', placeholder: '' },
      { label: 'Success Indicator #3', type: 'input', placeholder: '' },
      { label: 'Timeline', type: 'radio', options: ['2 weeks','3 weeks','4 weeks'] }
    ]
  },
  {
    id: 'underperf-rhythm',
    title: 'Weekly Manager Rhythm (Underperformers)',
    icon: '🔄',
    description: 'Structured weekly cadence for managing underperformers. ~30 min/week per report.',
    sections: [
      { label: 'Monday, Priorities aligned & deadlines adjusted?', type: 'textarea', placeholder: 'Notes on workload review...' },
      { label: 'Wednesday, Slack pulse sent? Blockers identified?', type: 'textarea', placeholder: '"How\'s workload? Any blockers?" + risks...' },
      { label: 'Friday, Wins documented? Next week\'s priorities confirmed?', type: 'textarea', placeholder: 'Wins + 1 piece of feedback sent...' }
    ]
  }
];

// Get all team member names from orgChart
function getAllTeamMembers() {
  var names = Object.keys(orgChart).sort();
  return names;
}

// Render template cards (read-only previews with "Use Template" button)
function renderTemplateCards() {
  var container = document.getElementById('templateCardsContainer');
  var html = '';
  templateDefs.forEach(function(t) {
    html += '<div class="card">';
    html += '<div style="display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:.5rem;">';
    html += '<div><h3 style="margin-bottom:.25rem;">' + t.icon + ' ' + t.title + '</h3>';
    html += '<p style="font-size:.85rem;color:var(--text-light);margin:0;">' + t.description + '</p></div>';
    html += '<button class="print-btn" style="background:var(--accent);white-space:nowrap;" onclick="createTemplateCopy(\'' + t.id + '\')">📝 Use Template</button>';
    html += '</div></div>';
  });
  container.innerHTML = html;
}

// Create editable copy
function createTemplateCopy(templateId) {
  var tpl = templateDefs.find(function(t) { return t.id === templateId; });
  if (!tpl) return;
  var copyId = templateId + '_' + Date.now();
  var members = getAllTeamMembers();

  // Build modal
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:10000;display:flex;align-items:center;justify-content:center;padding:1rem;';
  overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

  var modal = document.createElement('div');
  modal.style.cssText = 'background:#1B2126;color:#F4F1EB;border-radius:12px;max-width:700px;width:100%;max-height:90vh;overflow-y:auto;padding:2rem;position:relative;';

  var html = '<h3 style="margin:0 0 .25rem;font-family:Georgia,serif;">' + tpl.icon + ' ' + tpl.title + '</h3>';
  html += '<p style="font-size:.8rem;color:var(--text-light);margin:0 0 1rem;">Fill out and assign to a team member</p>';

  // Assign to + date
  html += '<div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1.25rem;">';
  html += '<div style="flex:1;min-width:180px;"><label class="rv-label">Assigned To</label><select class="rv-input" id="tpl_' + copyId + '_assignee"><option value="">- Select team member -</option>';
  members.forEach(function(m) { html += '<option value="' + m + '">' + m + '</option>'; });
  html += '</select></div>';
  html += '<div style="flex:1;min-width:180px;"><label class="rv-label">Assigned By</label><select class="rv-input" id="tpl_' + copyId + '_assigner"><option value="">- Select -</option>';
  members.forEach(function(m) { html += '<option value="' + m + '">' + m + '</option>'; });
  html += '</select></div>';
  html += '<div style="min-width:150px;"><label class="rv-label">Date</label><input type="date" class="rv-input" id="tpl_' + copyId + '_date" value="' + new Date().toISOString().split('T')[0] + '"></div>';
  html += '</div>';

  // Template fields
  tpl.sections.forEach(function(s, i) {
    html += '<div style="margin-bottom:1rem;">';
    html += '<label class="rv-label">' + s.label + '</label>';
    if (s.type === 'textarea') {
      html += '<textarea class="rv-textarea" id="tpl_' + copyId + '_f' + i + '" placeholder="' + (s.placeholder||'') + '" rows="3"></textarea>';
    } else if (s.type === 'input') {
      html += '<input class="rv-input" id="tpl_' + copyId + '_f' + i + '" placeholder="' + (s.placeholder||'') + '">';
    } else if (s.type === 'radio') {
      html += '<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.25rem;">';
      s.options.forEach(function(opt, oi) {
        html += '<label style="display:inline-flex;align-items:center;gap:.3rem;padding:.3rem .6rem;border:1px solid var(--border);border-radius:6px;font-size:.85rem;cursor:pointer;">';
        html += '<input type="radio" name="tpl_' + copyId + '_f' + i + '" value="' + opt + '"> ' + opt + '</label>';
      });
      html += '</div>';
    }
    html += '</div>';
  });

  // Action buttons
  html += '<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border);">';
  html += '<button class="print-btn" style="background:var(--success);" onclick="saveTemplateCopy(\'' + copyId + '\',\'' + tpl.id + '\',this)">💾 Save</button>';
  html += '<button class="print-btn" style="background:var(--accent);" onclick="copyTemplateToClipboard(\'' + copyId + '\',\'' + tpl.id + '\')">📋 Copy to Clipboard</button>';
  html += '<button class="print-btn" style="background:var(--info);" onclick="emailTemplate(\'' + copyId + '\',\'' + tpl.id + '\')">📧 Email</button>';
  html += '<button class="print-btn" style="background:var(--text-light);" onclick="this.closest(\'div[style*=fixed]\').remove()">✕ Cancel</button>';
  html += '</div>';

  modal.innerHTML = html;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// Collect template data from modal
function collectTemplateData(copyId, templateId) {
  var tpl = templateDefs.find(function(t) { return t.id === templateId; });
  var data = {
    templateId: templateId,
    title: tpl.title,
    icon: tpl.icon,
    assignee: (document.getElementById('tpl_' + copyId + '_assignee')||{}).value || '',
    assigner: (document.getElementById('tpl_' + copyId + '_assigner')||{}).value || '',
    date: (document.getElementById('tpl_' + copyId + '_date')||{}).value || '',
    fields: [],
    savedAt: new Date().toISOString()
  };
  tpl.sections.forEach(function(s, i) {
    var val = '';
    if (s.type === 'radio') {
      var checked = document.querySelector('input[name="tpl_' + copyId + '_f' + i + '"]:checked');
      val = checked ? checked.value : '';
    } else {
      var el = document.getElementById('tpl_' + copyId + '_f' + i);
      val = el ? el.value : '';
    }
    data.fields.push({ label: s.label, value: val });
  });
  return data;
}

// Format template as text
function formatTemplateText(data) {
  var lines = [];
  lines.push('═══ ' + data.icon + ' ' + data.title + ' ═══');
  if (data.assignee) lines.push('Assigned To: ' + data.assignee);
  if (data.assigner) lines.push('Assigned By: ' + data.assigner);
  if (data.date) lines.push('Date: ' + data.date);
  lines.push('');
  data.fields.forEach(function(f) {
    if (f.value) {
      lines.push('▸ ' + f.label);
      lines.push('  ' + f.value);
      lines.push('');
    }
  });
  return lines.join('\n');
}

// Save to localStorage
function saveTemplateCopy(copyId, templateId, btn) {
  var data = collectTemplateData(copyId, templateId);
  if (!data.assignee) { showToast('⚠️ Please select a team member to assign to.'); return; }
  var saved = JSON.parse(localStorage.getItem('tt_saved_templates') || '[]');
  data.copyId = copyId;
  saved.unshift(data);
  localStorage.setItem('tt_saved_templates', JSON.stringify(saved));
  showToast('✅ Template saved for ' + data.assignee + '!');
  btn.closest('div[style*="fixed"]').remove();
  renderSavedTemplates();
}

// Copy to clipboard
function copyTemplateToClipboard(copyId, templateId) {
  var data = collectTemplateData(copyId, templateId);
  var text = formatTemplateText(data);
  navigator.clipboard.writeText(text).then(function() { showToast('📋 Copied to clipboard!'); });
}

// Email template
function emailTemplate(copyId, templateId) {
  var data = collectTemplateData(copyId, templateId);
  var text = formatTemplateText(data);
  var subject = encodeURIComponent(data.icon + ' ' + data.title + (data.assignee ? ', ' + data.assignee : ''));
  var body = encodeURIComponent(text);
  window.open('mailto:?subject=' + subject + '&body=' + body);
}

// Render saved templates list
function renderSavedTemplates() {
  var saved = JSON.parse(localStorage.getItem('tt_saved_templates') || '[]');
  var container = document.getElementById('savedTemplatesList');
  if (!saved.length) { container.innerHTML = '<p style="color:var(--text-light);font-size:.85rem;">No saved templates yet. Click "📝 Use Template" on any template below to get started.</p>'; return; }

  var html = '<div style="display:flex;flex-direction:column;gap:.5rem;">';
  saved.forEach(function(s, idx) {
    var dateStr = s.date || s.savedAt.split('T')[0];
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:.6rem .75rem;background:#0A1119;color:#F4F1EB;border-radius:12px;border:1px solid var(--border);flex-wrap:wrap;gap:.5rem;">';
    html += '<div style="font-size:.85rem;"><strong>' + s.icon + ' ' + s.title + '</strong>';
    html += ' → <span style="color:var(--accent);font-weight:600;">' + (s.assignee||'Unassigned') + '</span>';
    if (s.assigner) html += ' <span style="color:var(--text-light);">from ' + s.assigner + '</span>';
    html += ' <span style="color:var(--text-light);font-size:.75rem;">(' + dateStr + ')</span></div>';
    html += '<div style="display:flex;gap:.35rem;">';
    html += '<button class="print-btn" style="font-size:.75rem;padding:.25rem .5rem;background:var(--accent);" onclick="viewSavedTemplate(' + idx + ')">👁 View</button>';
    html += '<button class="print-btn" style="font-size:.75rem;padding:.25rem .5rem;background:var(--info);" onclick="copySavedTemplate(' + idx + ')">📋 Copy</button>';
    html += '<button class="print-btn" style="font-size:.75rem;padding:.25rem .5rem;background:var(--danger);" onclick="deleteSavedTemplate(' + idx + ')">🗑</button>';
    html += '</div></div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

function viewSavedTemplate(idx) {
  var saved = JSON.parse(localStorage.getItem('tt_saved_templates') || '[]');
  var s = saved[idx]; if (!s) return;
  var text = formatTemplateText(s);
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:10000;display:flex;align-items:center;justify-content:center;padding:1rem;';
  overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
  var modal = document.createElement('div');
  modal.style.cssText = 'background:#1B2126;color:#F4F1EB;border-radius:12px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;padding:2rem;';
  modal.innerHTML = '<pre style="white-space:pre-wrap;font-family:Calibri,sans-serif;font-size:.9rem;line-height:1.6;">' + text.replace(/</g,'&lt;') + '</pre><div style="margin-top:1rem;display:flex;gap:.5rem;"><button class="print-btn" style="background:var(--accent);" onclick="copySavedTemplate(' + idx + ')">📋 Copy</button><button class="print-btn" style="background:var(--info);" onclick="emailSavedTemplate(' + idx + ')">📧 Email</button><button class="print-btn" style="background:var(--text-light);" onclick="this.closest(\'div[style*=fixed]\').remove()">✕ Close</button></div>';
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function copySavedTemplate(idx) {
  var saved = JSON.parse(localStorage.getItem('tt_saved_templates') || '[]');
  var text = formatTemplateText(saved[idx]);
  navigator.clipboard.writeText(text).then(function() { showToast('📋 Copied!'); });
}

function emailSavedTemplate(idx) {
  var saved = JSON.parse(localStorage.getItem('tt_saved_templates') || '[]');
  var s = saved[idx];
  var text = formatTemplateText(s);
  window.open('mailto:?subject=' + encodeURIComponent(s.icon + ' ' + s.title + ', ' + (s.assignee||'')) + '&body=' + encodeURIComponent(text));
}

function deleteSavedTemplate(idx) {
  if (!confirm('Delete this saved template?')) return;
  var saved = JSON.parse(localStorage.getItem('tt_saved_templates') || '[]');
  saved.splice(idx, 1);
  localStorage.setItem('tt_saved_templates', JSON.stringify(saved));
  renderSavedTemplates();
  showToast('🗑 Deleted.');
}

// ===================== EVAL AUTO-FILL =====================
    function evalAutoFillRole(sel) {
      var opt = sel.options[sel.selectedIndex];
      var role = opt ? opt.getAttribute('data-role') : '';
      var roleSelect = document.getElementById('evalRole');
      if (roleSelect && role) {
        for (var i = 0; i < roleSelect.options.length; i++) {
          if (roleSelect.options[i].value === role) {
            roleSelect.selectedIndex = i;
            break;
          }
        }
        if (typeof renderEval === 'function') renderEval();
      }
    }

// ===================== MAIN BLOCK =====================
// Collapsible sections
function toggle(el) {
  var next = el.nextElementSibling;
  if (!next) return;
  // Use getComputedStyle so CSS-class-driven open state is detected correctly on first click
  var isOpen = window.getComputedStyle(next).display !== 'none';
  next.style.display = isOpen ? 'none' : 'block';
  el.classList.toggle('open', !isOpen);
}

// Navigation is handled by index.html initNavigation() — no duplicate logic here
// window.navigateTo, revealTiles, and initNavigation are all defined in the shell


// ===================== REFERRAL TABS =====================
function renderQuiz(containerId, questions) {
  var c = document.getElementById(containerId);
  if (!c) return;
  var html = '<div class="callout blue" style="margin-bottom:1rem;"><strong>📝 Knowledge Check</strong> - Test your understanding. Select the best answer for each question, then click Score Quiz.</div>';
  questions.forEach(function(q, qi) {
    html += '<div style="background:var(--bg);padding:1rem;border-radius:8px;margin-bottom:.75rem;" id="quiz_' + containerId + '_q' + qi + '">';
    html += '<p style="font-weight:700;font-size:.9rem;margin-bottom:.5rem;">' + (qi+1) + '. ' + q.q + '</p>';
    q.opts.forEach(function(opt, oi) {
      html += '<label style="display:block;padding:.35rem .5rem;border-radius:6px;cursor:pointer;font-size:.85rem;margin:.2rem 0;">';
      html += '<input type="radio" name="quiz_' + containerId + '_' + qi + '" value="' + oi + '" style="margin-right:.5rem;">' + opt + '</label>';
    });
    html += '<div class="quiz-feedback" style="display:none;margin-top:.5rem;padding:.5rem;border-radius:6px;font-size:.85rem;"></div>';
    html += '</div>';
  });
  html += '<button class="print-btn" style="background:var(--accent);color:#fff;font-size:1rem;padding:.75rem 2rem;" onclick="scoreQuiz(\'' + containerId + '\',' + JSON.stringify(questions.map(function(q){return q.a})) + ')">📊 Score Quiz</button>';
  html += '<div id="' + containerId + '_result" style="margin-top:1rem;display:none;"></div>';
  c.innerHTML = html;
}

function scoreQuiz(containerId, answers) {
  var correct = 0;
  var total = answers.length;
  answers.forEach(function(a, qi) {
    var sel = document.querySelector('input[name="quiz_' + containerId + '_' + qi + '"]:checked');
    var fb = document.querySelector('#quiz_' + containerId + '_q' + qi + ' .quiz-feedback');
    var wrap = document.getElementById('quiz_' + containerId + '_q' + qi);
    if (sel && parseInt(sel.value) === a) {
      correct++;
      fb.innerHTML = '✅ Correct!';
      fb.style.background = '#ecfdf5';
      fb.style.color = '#065f46';
      wrap.style.borderLeft = '4px solid var(--success)';
    } else {
      fb.innerHTML = '❌ Incorrect';
      fb.style.background = '#fef2f2';
      fb.style.color = '#991b1b';
      wrap.style.borderLeft = '4px solid var(--danger)';
    }
    fb.style.display = '';
  });
  var pct = Math.round((correct/total)*100);
  var res = document.getElementById(containerId + '_result');
  var color = pct >= 80 ? 'var(--success)' : pct >= 60 ? '#f59e0b' : 'var(--danger)';
  res.innerHTML = '<div style="text-align:center;padding:1.5rem;background:var(--bg);border-radius:8px;border:2px solid ' + color + ';">' +
    '<div style="font-size:2.5rem;font-weight:800;color:' + color + ';">' + pct + '%</div>' +
    '<div style="font-size:1rem;font-weight:600;">' + correct + ' / ' + total + ' correct</div>' +
    '<div style="font-size:.85rem;color:var(--text-light);margin-top:.25rem;">' + (pct >= 80 ? '🎉 Great job! You\'re ready.' : pct >= 60 ? '📖 Review the sections you missed and try again.' : '📚 Review the material above and retake the quiz.') + '</div></div>';
  res.style.display = '';
  res.scrollIntoView({behavior:'smooth',block:'center'});
  // Save score
  localStorage.setItem('tt_quiz_' + containerId, JSON.stringify({score:pct,correct:correct,total:total,date:new Date().toISOString()}));
}

function switchCultureTab(tab) {
  document.querySelectorAll('[data-cultab]').forEach(function(b) { b.classList.toggle('active', b.dataset.cultab === tab); });
  document.querySelectorAll('.cul-tab-content').forEach(function(c) { c.style.display = 'none'; });
  var el = document.getElementById('cul-' + tab);
  if (el) { el.style.display = 'block'; el.style.animation = 'none'; el.offsetHeight; el.style.animation = ''; }
  // Good Standing collapsibles always load open
  if (tab === 'standing' && el) {
    el.querySelectorAll('.collapsible-content').forEach(function(c) { c.style.display = 'block'; });
    el.querySelectorAll('.collapsible').forEach(function(c) { c.classList.add('open'); });
  }
}

function switchBpTab(tab) {
  document.querySelectorAll('[data-bptab]').forEach(function(b) { b.classList.toggle('active', b.dataset.bptab === tab); });
  document.querySelectorAll('.bp-tab-content').forEach(function(c) { c.style.display = 'none'; });
  var el = document.getElementById('bp-' + tab);
  if (el) { el.style.display = 'block'; el.style.animation = 'none'; el.offsetHeight; el.style.animation = ''; }
}

function switchAsanaTab(tab) {
  document.querySelectorAll('[data-asanatab]').forEach(function(b) { b.classList.toggle('active', b.dataset.asanatab === tab); });
  document.querySelectorAll('.asana-tab-content').forEach(function(c) { c.style.display = 'none'; });
  var el = document.getElementById('asana-' + tab);
  if (el) el.style.display = '';
}

function switchBenTab(tab) {
  var landing = document.getElementById('ben-landing');
  if (landing) landing.style.display = 'none';
  document.querySelectorAll('[data-bentab]').forEach(function(b) { b.classList.toggle('active', b.dataset.bentab === tab); });
  document.querySelectorAll('.ben-tab-content').forEach(function(c) { c.style.display = 'none'; });
  var el = document.getElementById('ben-' + tab);
  if (el) el.style.display = '';
}

function switchInvTab(tab) {
  document.getElementById('inv-ar').style.display = tab === 'ar' ? '' : 'none';
  document.getElementById('inv-process').style.display = tab === 'process' ? '' : 'none';
  document.getElementById('inv-btn-ar').style.background = tab === 'ar' ? 'var(--accent)' : 'var(--card)';
  document.getElementById('inv-btn-ar').style.color = tab === 'ar' ? '#fff' : '#94a3b8';
  document.getElementById('inv-btn-process').style.background = tab === 'process' ? 'var(--accent)' : 'var(--card)';
  document.getElementById('inv-btn-process').style.color = tab === 'process' ? '#fff' : '#94a3b8';
}

function switchBonusTab(tab) {
  document.querySelectorAll('[data-btab]').forEach(function(b) { b.classList.toggle('active', b.dataset.btab === tab); });
  document.querySelectorAll('.bonus-tab-content').forEach(function(c) { c.style.display = 'none'; });
  var el = document.getElementById('bonus-' + tab);
  if (el) el.style.display = '';
}

function switchRefTab(tab) {
  document.querySelectorAll('.ref-tab-content').forEach(function(el) { el.style.display = 'none'; });
  document.querySelectorAll('[data-rtab]').forEach(function(el) { el.classList.remove('active'); });
  document.getElementById('ref-' + tab).style.display = '';
  document.querySelector('[data-rtab="' + tab + '"]').classList.add('active');
}

// ===================== SPECIALTIES ENGINE =====================
var specData = {
"Gretchen Hess":{search:{gSearch:5,gShopping:5,gPMax:5,gDisplay:3,gYouTube:5,gDemandGen:4,bSearch:4,bShopping:3,bPMax:3},social:{Meta:5,Pinterest:4,TikTok:3,Snapchat:1,X:1,LinkedIn:2,Reddit:3},ecom:{Amazon:5,Walmart:5},retail:{Criteo:4,Epsilon:4,PromoteIQ:4,Symbiosis:4,NMN:4,Roundel:4},app:{Google:3,ASA:3,AppsFlyer:2,Branch:3,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:3,LPO:2,Tracking:3,Shopify:5,Stripe:1,Salesforce:4,Hubspot:2,CallRail:1,Zapier:1,Mailchimp:3,Motion:5,Dashboards:5,Creative:5,Pitches:4},clientType:{LeadGen:2,DTC:5,Ecomm:5,B2B:3,Finance:2,Education:3,Health:5,Apps:2},interests:["MMM/MTA Tools","Creative","Tracking/Tagging","Leadership","SEO"],mastered:""},
"Riley Abercrombie":{search:{gSearch:5,gShopping:5,gPMax:5,gDisplay:4,gYouTube:4,gDemandGen:4,bSearch:5,bShopping:4,bPMax:4},social:{Meta:3,Pinterest:2,TikTok:3,Snapchat:2,X:2,LinkedIn:3,Reddit:3},ecom:{Amazon:1,Walmart:1},retail:{Criteo:2,Epsilon:2,PromoteIQ:2,Symbiosis:2,NMN:2,Roundel:2},app:{Google:3,ASA:3,AppsFlyer:2,Branch:1,Adjust:1,Kochava:1,Singular:2,Firebase:2},additional:{FeedMgmt:3,LPO:4,Tracking:3,Shopify:4,Stripe:2,Salesforce:3,Hubspot:4,CallRail:5,Zapier:3,Mailchimp:2,Motion:2,Dashboards:5,Creative:4,Pitches:4},clientType:{LeadGen:5,DTC:4,Ecomm:4,B2B:5,Finance:4,Education:3,Health:4,Apps:3},interests:["MMM/MTA Tools","Programmatic","Pitching","Creative","Paid Social"],mastered:"Paid Search"},
"Owen Phipps":{search:{gSearch:4,gShopping:4,gPMax:4,gDisplay:3,gYouTube:3,gDemandGen:3,bSearch:4,bShopping:3,bPMax:2},social:{Meta:3,Pinterest:1,TikTok:2,Snapchat:2,X:1,LinkedIn:2,Reddit:3},ecom:{Amazon:1,Walmart:1},retail:{},app:{Google:2,ASA:2,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:2,LPO:0,Tracking:2,Shopify:1,Stripe:1,Salesforce:1,Hubspot:2,CallRail:3,Zapier:0,Mailchimp:1,Motion:3,Dashboards:5,Creative:3,Pitches:3},clientType:{LeadGen:4,DTC:3,Ecomm:3,B2B:4,Finance:3,Education:2,Health:3,Apps:2},interests:["Paid Social","Leadership","AI","Project Management","App Campaigns"],mastered:""},
"Billy Bevevino":{search:{gSearch:4,gShopping:3,gPMax:3,gDisplay:3,gYouTube:3,gDemandGen:3,bSearch:4,bShopping:3,bPMax:3},social:{Meta:5,Pinterest:3,TikTok:3,Snapchat:2,X:1,LinkedIn:3,Reddit:1},ecom:{Amazon:2,Walmart:3},retail:{Criteo:4,Epsilon:3,PromoteIQ:3,Symbiosis:3,NMN:3,Roundel:3},app:{Google:1,ASA:3,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:4,LPO:4,Tracking:3,Shopify:4,Stripe:1,Salesforce:1,Hubspot:3,CallRail:2,Zapier:2,Mailchimp:5,Motion:5,Dashboards:4,Creative:4,Pitches:4},clientType:{LeadGen:5,DTC:5,Ecomm:4,B2B:3,Finance:3,Education:1,Health:4,Apps:1},interests:["Project Management","Leadership","Programmatic","Crisis Management","Tracking/Tagging"],mastered:""},
"Charlotte Pohl":{search:{gSearch:5,gShopping:2,gPMax:4,gDisplay:2,gYouTube:2,gDemandGen:2,bSearch:5,bShopping:2,bPMax:3},social:{Meta:5,Pinterest:5,TikTok:5,Snapchat:5,X:2,LinkedIn:5,Reddit:5},ecom:{Amazon:2,Walmart:1},retail:{},app:{Google:3,ASA:4,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:2},additional:{FeedMgmt:1,LPO:2,Tracking:2,Shopify:1,Stripe:1,Salesforce:1,Hubspot:1,CallRail:1,Zapier:1,Mailchimp:1,Motion:1,Dashboards:4,Creative:5,Pitches:4},clientType:{LeadGen:5,DTC:4,Ecomm:4,B2B:5,Finance:5,Education:3,Health:4,Apps:1},interests:["Leadership","Pitching","AI","App Campaigns","MMM/MTA Tools"],mastered:"Paid Social"},
"Kersten Kruse":{search:{gSearch:5,gShopping:3,gPMax:5,gDisplay:4,gYouTube:4,gDemandGen:5,bSearch:1,bShopping:1,bPMax:1},social:{Meta:3,Pinterest:1,TikTok:1,Snapchat:1,X:1,LinkedIn:2,Reddit:1},ecom:{Amazon:1,Walmart:1},retail:{},app:{Google:2,ASA:1,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:2},additional:{FeedMgmt:1,LPO:4,Tracking:3,Shopify:2,Stripe:1,Salesforce:2,Hubspot:2,CallRail:2,Zapier:2,Mailchimp:3,Motion:1,Dashboards:2,Creative:5,Pitches:5},clientType:{LeadGen:0,DTC:0,Ecomm:4,B2B:5,Finance:5,Education:5,Health:4,Apps:1},interests:["AI","Creative","Organic Social","Programmatic","Business Acumen"],mastered:"Pitching"},
"Shelby Nations":{search:{gSearch:5,gShopping:1,gPMax:5,gDisplay:4,gYouTube:4,gDemandGen:2,bSearch:4,bShopping:1,bPMax:1},social:{Meta:5,Pinterest:2,TikTok:4,Snapchat:1,X:1,LinkedIn:5,Reddit:1},ecom:{Amazon:1,Walmart:1},retail:{},app:{Google:2,ASA:1,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:5,LPO:3,Tracking:3,Shopify:1,Stripe:1,Salesforce:1,Hubspot:2,CallRail:1,Zapier:1,Mailchimp:2,Motion:1,Dashboards:4,Creative:5,Pitches:5},clientType:{LeadGen:0,DTC:0,Ecomm:2,B2B:5,Finance:5,Education:5,Health:5,Apps:1},interests:["Tracking/Tagging","Retail Media","MMM/MTA Tools","App Campaigns","Creative"],mastered:"Paid Social"},
"Rachel Scharett":{search:{gSearch:5,gShopping:5,gPMax:5,gDisplay:5,gYouTube:4,gDemandGen:3,bSearch:5,bShopping:4,bPMax:5},social:{Meta:3,Pinterest:1,TikTok:1,Snapchat:1,X:1,LinkedIn:4,Reddit:3},ecom:{Amazon:1,Walmart:1},retail:{Criteo:2,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:4,ASA:1,AppsFlyer:2,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:2},additional:{FeedMgmt:3,LPO:3,Tracking:3,Shopify:2,Stripe:1,Salesforce:2,Hubspot:2,CallRail:2,Zapier:1,Mailchimp:1,Motion:2,Dashboards:4,Creative:4,Pitches:4},clientType:{LeadGen:5,DTC:5,Ecomm:4,B2B:5,Finance:3,Education:3,Health:5,Apps:2},interests:["Retail Media","MMM/MTA Tools","App Campaigns","Creative","AI"],mastered:"Crisis Management"},

"Megan Brenneke":{search:{gSearch:4,gShopping:2,gPMax:3,gDisplay:4,gYouTube:4,gDemandGen:2,bSearch:4,bShopping:2,bPMax:3},social:{Meta:4,Pinterest:3,TikTok:3,Snapchat:1,X:1,LinkedIn:3,Reddit:2},ecom:{Amazon:1,Walmart:1},retail:{Criteo:1,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:2,ASA:1,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:2,LPO:3,Tracking:4,Shopify:1,Stripe:1,Salesforce:3,Hubspot:1,CallRail:3,Zapier:1,Mailchimp:4,Motion:1,Dashboards:4,Creative:4,Pitches:4},clientType:{LeadGen:4,DTC:5,Ecomm:2,B2B:5,Finance:2,Education:4,Health:4,Apps:2},interests:["Leadership","MMM/MTA Tools","Retail Media","Business Acumen","Pitching"],mastered:"Tracking/Tagging"},
"Megan Klein":{search:{gSearch:4,gShopping:3,gPMax:3,gDisplay:4,gYouTube:4,gDemandGen:3,bSearch:4,bShopping:2,bPMax:3},social:{Meta:4,Pinterest:2,TikTok:3,Snapchat:4,X:2,LinkedIn:4,Reddit:2},ecom:{Amazon:2,Walmart:1},retail:{Criteo:1,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:1,ASA:1,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:2,LPO:4,Tracking:4,Shopify:2,Stripe:1,Salesforce:2,Hubspot:3,CallRail:3,Zapier:4,Mailchimp:2,Motion:1,Dashboards:4,Creative:4,Pitches:4},clientType:{LeadGen:5,DTC:4,Ecomm:3,B2B:4,Finance:2,Education:5,Health:4,Apps:1},interests:["Leadership","Pitching","App Campaigns","AI","MMM/MTA Tools"],mastered:""},
"Will Sokol":{search:{gSearch:5,gShopping:4,gPMax:5,gDisplay:4,gYouTube:5,gDemandGen:4,bSearch:5,bShopping:3,bPMax:4},social:{Meta:5,Pinterest:2,TikTok:5,Snapchat:2,X:2,LinkedIn:4,Reddit:3},ecom:{Amazon:2,Walmart:1},retail:{Criteo:1,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:3,ASA:3,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:2},additional:{FeedMgmt:3,LPO:4,Tracking:4,Shopify:3,Stripe:1,Salesforce:2,Hubspot:3,CallRail:2,Zapier:2,Mailchimp:2,Motion:2,Dashboards:4,Creative:5,Pitches:5},clientType:{LeadGen:5,DTC:5,Ecomm:5,B2B:4,Finance:4,Education:4,Health:5,Apps:4},interests:[],mastered:""},
"Hannah Price":{search:{gSearch:5,gShopping:2,gPMax:2,gDisplay:4,gYouTube:4,gDemandGen:2,bSearch:4,bShopping:1,bPMax:1},social:{Meta:5,Pinterest:4,TikTok:3,Snapchat:2,X:2,LinkedIn:5,Reddit:2},ecom:{Amazon:1,Walmart:1},retail:{Criteo:1,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:1,ASA:1,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:2,LPO:4,Tracking:3,Shopify:1,Stripe:1,Salesforce:1,Hubspot:2,CallRail:1,Zapier:1,Mailchimp:4,Motion:1,Dashboards:5,Creative:5,Pitches:5},clientType:{LeadGen:5,DTC:4,Ecomm:2,B2B:5,Finance:4,Education:5,Health:2,Apps:1},interests:["Retail Media","Tracking/Tagging","Paid Search","SEO","MMM/MTA Tools"],mastered:"Project Management"},
"Evin Leclerc":{search:{gSearch:5,gShopping:2,gPMax:4,gDisplay:3,gYouTube:2,gDemandGen:4,bSearch:5,bShopping:2,bPMax:2},social:{Meta:4,Pinterest:2,TikTok:3,Snapchat:1,X:1,LinkedIn:3,Reddit:2},ecom:{Amazon:1,Walmart:1},retail:{Criteo:1,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:3,ASA:1,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:3,LPO:5,Tracking:4,Shopify:1,Stripe:4,Salesforce:1,Hubspot:2,CallRail:4,Zapier:1,Mailchimp:3,Motion:1,Dashboards:4,Creative:5,Pitches:5},clientType:{LeadGen:5,DTC:4,Ecomm:3,B2B:5,Finance:4,Education:4,Health:4,Apps:4},interests:["Tracking/Tagging","MMM/MTA Tools","Leadership","Project Management","AI"],mastered:"SEO"},
"Tate Dewey":{search:{gSearch:5,gShopping:5,gPMax:5,gDisplay:4,gYouTube:4,gDemandGen:4,bSearch:4,bShopping:3,bPMax:2},social:{Meta:4,Pinterest:1,TikTok:4,Snapchat:1,X:3,LinkedIn:3,Reddit:2},ecom:{Amazon:1,Walmart:1},retail:{Criteo:1,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:3,ASA:3,AppsFlyer:2,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:2},additional:{FeedMgmt:4,LPO:5,Tracking:3,Shopify:5,Stripe:4,Salesforce:1,Hubspot:1,CallRail:3,Zapier:1,Mailchimp:1,Motion:1,Dashboards:4,Creative:5,Pitches:5},clientType:{LeadGen:4,DTC:5,Ecomm:5,B2B:4,Finance:5,Education:3,Health:4,Apps:3},interests:["AI","Creative","Tracking/Tagging","SEO","Pitching"],mastered:"AI"},
"Mary McCambridge":{search:{gSearch:4,gShopping:2,gPMax:4,gDisplay:2,gYouTube:3,gDemandGen:4,bSearch:4,bShopping:3,bPMax:3},social:{Meta:5,Pinterest:5,TikTok:5,Snapchat:5,X:3,LinkedIn:5,Reddit:4},ecom:{Amazon:2,Walmart:1},retail:{Criteo:1,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:3,ASA:3,AppsFlyer:2,Branch:2,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:3,LPO:2,Tracking:4,Shopify:2,Stripe:1,Salesforce:1,Hubspot:2,CallRail:2,Zapier:1,Mailchimp:2,Motion:1,Dashboards:4,Creative:5,Pitches:4},clientType:{LeadGen:5,DTC:5,Ecomm:4,B2B:4,Finance:4,Education:4,Health:4,Apps:3},interests:["Tracking/Tagging","MMM/MTA Tools","Pitching","SEO","Project Management"],mastered:""},
"Daren Kalkoffen":{search:{gSearch:3,gShopping:1,gPMax:2,gDisplay:3,gYouTube:3,gDemandGen:1,bSearch:3,bShopping:1,bPMax:1},social:{Meta:4,Pinterest:1,TikTok:2,Snapchat:1,X:1,LinkedIn:5,Reddit:3},ecom:{Amazon:1,Walmart:1},retail:{Criteo:1,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:2,ASA:1,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:1,LPO:3,Tracking:3,Shopify:1,Stripe:1,Salesforce:1,Hubspot:1,CallRail:1,Zapier:1,Mailchimp:1,Motion:1,Dashboards:4,Creative:5,Pitches:2},clientType:{LeadGen:5,DTC:2,Ecomm:2,B2B:5,Finance:4,Education:2,Health:2,Apps:1},interests:["MMM/MTA Tools","AI","Paid Search","Tracking/Tagging","Programmatic"],mastered:""},
"Allison Long":{search:{gSearch:5,gShopping:4,gPMax:4,gDisplay:5,gYouTube:5,gDemandGen:5,bSearch:5,bShopping:2,bPMax:4},social:{Meta:4,Pinterest:2,TikTok:2,Snapchat:2,X:2,LinkedIn:5,Reddit:2},ecom:{Amazon:2,Walmart:1},retail:{Criteo:3,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:4,ASA:2,AppsFlyer:2,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:3,LPO:5,Tracking:5,Shopify:1,Stripe:1,Salesforce:5,Hubspot:4,CallRail:4,Zapier:4,Mailchimp:1,Motion:1,Dashboards:5,Creative:5,Pitches:5},clientType:{LeadGen:5,DTC:4,Ecomm:3,B2B:5,Finance:5,Education:5,Health:5,Apps:3},interests:["Leadership","MMM/MTA Tools","Creative","AI","Organic Social"],mastered:"Business Acumen"},

"Sanad Shuman":{search:{gSearch:5,gShopping:5,gPMax:5,gDisplay:2,gYouTube:2,gDemandGen:4,bSearch:5,bShopping:2,bPMax:2},social:{Meta:4,Pinterest:1,TikTok:1,Snapchat:1,X:1,LinkedIn:2,Reddit:1},ecom:{Amazon:2,Walmart:1},retail:{Criteo:1,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:4,ASA:1,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:4,LPO:5,Tracking:4,Shopify:5,Stripe:1,Salesforce:1,Hubspot:4,CallRail:3,Zapier:2,Mailchimp:4,Motion:1,Dashboards:5,Creative:4,Pitches:4},clientType:{LeadGen:5,DTC:5,Ecomm:5,B2B:5,Finance:3,Education:3,Health:4,Apps:2},interests:["SEO","Paid Search","Paid Social","Project Management","Tracking/Tagging"],mastered:"SEO"},
"Seth McDaniel":{search:{gSearch:5,gShopping:2,gPMax:4,gDisplay:4,gYouTube:3,gDemandGen:4,bSearch:5,bShopping:2,bPMax:3},social:{Meta:5,Pinterest:1,TikTok:1,Snapchat:1,X:1,LinkedIn:4,Reddit:3},ecom:{Amazon:1,Walmart:1},retail:{Criteo:1,Epsilon:1,PromoteIQ:1,Symbiosis:1,NMN:1,Roundel:1},app:{Google:1,ASA:1,AppsFlyer:1,Branch:1,Adjust:1,Kochava:1,Singular:1,Firebase:1},additional:{FeedMgmt:1,LPO:1,Tracking:2,Shopify:2,Stripe:1,Salesforce:1,Hubspot:1,CallRail:1,Zapier:1,Mailchimp:1,Motion:1,Dashboards:3,Creative:3,Pitches:1},clientType:{LeadGen:4,DTC:3,Ecomm:3,B2B:3,Finance:1,Education:5,Health:2,Apps:1},interests:["Tracking/Tagging","AI","Programmatic","Leadership","Pitching"],mastered:""}
};

var skillLabels = {
  search:{"gSearch":"Google Search","gShopping":"Google Shopping","gPMax":"Google PMax","gDisplay":"Google Display","gYouTube":"Google YouTube","gDemandGen":"Google Demand Gen","bSearch":"Bing Search","bShopping":"Bing Shopping","bPMax":"Bing PMax"},
  social:{"Meta":"Meta","Pinterest":"Pinterest","TikTok":"TikTok","Snapchat":"Snapchat","X":"X (Twitter)","LinkedIn":"LinkedIn","Reddit":"Reddit"},
  ecom:{"Amazon":"Amazon","Walmart":"Walmart"},
  retail:{"Criteo":"Criteo","Epsilon":"Epsilon","PromoteIQ":"PromoteIQ","Symbiosis":"Symbiosis","NMN":"NMN","Roundel":"Target Roundel"},
  app:{"Google":"Google App","ASA":"Apple Search Ads","AppsFlyer":"AppsFlyer","Branch":"Branch","Adjust":"Adjust","Kochava":"Kochava","Singular":"Singular","Firebase":"Firebase"},
  additional:{"FeedMgmt":"Feed Management","LPO":"Landing Page Opt","Tracking":"Tracking","Shopify":"Shopify","Stripe":"Stripe","Salesforce":"Salesforce","Hubspot":"HubSpot","CallRail":"CallRail","Zapier":"Zapier","Mailchimp":"Mailchimp","Motion":"Motion","Dashboards":"Dashboards/Data","Creative":"Creative Guidance","Pitches":"Pitches"},
  clientType:{"LeadGen":"Lead Gen","DTC":"DTC","Ecomm":"E-commerce","B2B":"B2B","Finance":"Finance","Education":"Education","Health":"Health","Apps":"Apps/Games"}
};

function ratingBadge(v) {
  if (!v || v === 0) return '<span style="color:#ccc;">-</span>';
  var colors = {1:'#ef4444',2:'#f59e0b',3:'#3b82f6',4:'#10b981',5:'#059669'};
  return '<span style="display:inline-block;width:1.5rem;height:1.5rem;border-radius:50%;background:' + (colors[v]||'#ccc') + ';color:#fff;text-align:center;line-height:1.5rem;font-size:.75rem;font-weight:700;">' + v + '</span>';
}

function renderSkillChart() {
  var cat = document.getElementById('chartCatSelect').value;
  var labels = skillLabels[cat];
  var container = document.getElementById('skillChartContainer');
  if (!labels) { container.innerHTML = ''; return; }

  // Collect all skills in this category
  var skills = Object.keys(labels);
  var html = '';

  skills.forEach(function(skillKey) {
    // Gather all people with this skill rated > 0
    var people = [];
    Object.keys(specData).forEach(function(name) {
      var d = specData[name][cat];
      if (d && d[skillKey] && d[skillKey] > 0) {
        people.push({ name: name.split(' ')[0], full: name, rating: d[skillKey] });
      }
    });
    if (!people.length) return;

    // Sort by rating descending
    people.sort(function(a, b) { return b.rating - a.rating; });

    html += '<div style="margin-bottom:1.25rem;">';
    html += '<h4 style="margin:0 0 .4rem;font-size:.85rem;">' + (labels[skillKey] || skillKey) + '</h4>';

    people.forEach(function(p) {
      var pct = (p.rating / 5) * 100;
      var colors = ['','#ef4444','#f59e0b','#229FA1','#1F807E','#1A7477'];
      var color = colors[p.rating] || 'var(--accent)';
      html += '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:3px;">';
      html += '<div style="width:70px;font-size:.75rem;font-weight:600;text-align:right;flex-shrink:0;">' + p.name + '</div>';
      html += '<div style="flex:1;background:#e5e7eb;border-radius:4px;height:20px;overflow:hidden;">';
      html += '<div style="width:' + pct + '%;background:' + color + ';height:100%;border-radius:4px;display:flex;align-items:center;justify-content:flex-end;padding-right:4px;transition:width .3s;">';
      html += '<span style="font-size:.65rem;font-weight:700;color:#fff;">' + p.rating + '</span>';
      html += '</div></div></div>';
    });

    html += '</div>';
  });

  if (!html) html = '<p style="color:var(--text-light);">No ratings found for this category.</p>';
  container.innerHTML = html;
}

function switchSpecTab(tab) {
  document.querySelectorAll('.spec-tab-content').forEach(function(el) { el.style.display = 'none'; });
  document.querySelectorAll('[data-stab]').forEach(function(el) { el.classList.remove('active'); });
  document.getElementById('spec-' + tab).style.display = '';
  document.querySelector('[data-stab="' + tab + '"]').classList.add('active');
  if (tab === 'interests') renderInterests();
}

var specEditMode = false;

function renderPersonSpec() {
  var name = document.getElementById('specPerson').value;
  var container = document.getElementById('specPersonResult');
  var editBtn = document.getElementById('specEditBtn');
  var saveBtn = document.getElementById('specSaveBtn');
  var cancelBtn = document.getElementById('specCancelBtn');
  specEditMode = false;
  editBtn.style.display = 'none';
  saveBtn.style.display = 'none';
  cancelBtn.style.display = 'none';

  if (!name || !specData[name]) { container.innerHTML = ''; return; }
  editBtn.style.display = '';
  var d = specData[name];
  renderPersonView(name, d, container);
}

function renderPersonView(name, d, container) {
  var html = '';

  // Interests & mastered
  html += '<div style="margin-bottom:1rem;">';
  if (d.interests && d.interests.length) html += '<p><strong>🌱 Growth Interests:</strong> ' + d.interests.map(function(s,i) { return '<span class="badge badge-tier">' + (i+1) + '. ' + s + '</span>'; }).join(' ') + '</p>';
  if (d.mastered) html += '<p style="margin-top:.35rem;"><strong>⭐ Mastered / Can Teach:</strong> <span class="badge badge-revenue">' + d.mastered + '</span></p>';
  html += '</div>';

  var cats = [['🔍 Search Platforms','search'],['📱 Social Platforms','social'],['🛒 eCommerce','ecom'],['🏪 Retail','retail'],['📲 App Platforms','app'],['⚡ Additional Skills','additional'],['🏢 Client Type Experience','clientType']];
  cats.forEach(function(c) {
    var data = d[c[1]];
    if (!data || !Object.keys(data).length) return;
    var labels = skillLabels[c[1]];
    html += '<h4 style="margin:.75rem 0 .35rem;font-size:.9rem;">' + c[0] + '</h4>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:.35rem;">';
    Object.keys(data).forEach(function(k) {
      if (data[k]) html += '<span style="display:inline-flex;align-items:center;gap:.3rem;padding:.2rem .5rem;border-radius:6px;background:#1B2126;color:#F4F1EB;font-size:.8rem;">' + ratingBadge(data[k]) + ' ' + (labels[k]||k) + '</span>';
    });
    html += '</div>';
  });
  container.innerHTML = html;
}

function toggleSpecEdit() {
  specEditMode = true;
  var name = document.getElementById('specPerson').value;
  if (!name || !specData[name]) return;
  var d = specData[name];
  var container = document.getElementById('specPersonResult');
  document.getElementById('specEditBtn').style.display = 'none';
  document.getElementById('specSaveBtn').style.display = '';
  document.getElementById('specCancelBtn').style.display = '';

  var html = '<div class="callout blue" style="margin-bottom:1rem;"><strong>✏️ Edit Mode</strong>: Update your ratings (1-5), growth interests, and mastered skills. Click Save when done.</div>';

  // Interests
  var interestOptions = ['MMM/MTA Tools','Creative','Tracking/Tagging','Leadership','SEO','Paid Social','Paid Search','AI','Project Management','App Campaigns','Pitching','Programmatic','Crisis Management','Business Acumen','Retail Media','Organic Social'];
  html += '<div style="margin-bottom:1.25rem;padding:1rem;background:#0A1119;color:#F4F1EB;border-radius:12px;">';
  html += '<h4 style="margin:0 0 .5rem;font-size:.9rem;">🌱 Growth Interests (rank your top 5)</h4>';
  for (var i = 0; i < 5; i++) {
    html += '<div style="display:inline-flex;align-items:center;gap:.35rem;margin:.25rem .5rem .25rem 0;">';
    html += '<span style="font-size:.8rem;font-weight:700;">#' + (i+1) + '</span>';
    html += '<select class="rv-input-sm spec-interest" data-idx="' + i + '" style="width:180px;">';
    html += '<option value="">- Select -</option>';
    interestOptions.forEach(function(opt) {
      var sel = (d.interests && d.interests[i] === opt) ? ' selected' : '';
      html += '<option' + sel + '>' + opt + '</option>';
    });
    html += '</select></div>';
  }
  html += '<div style="margin-top:.5rem;"><span style="font-size:.8rem;font-weight:700;">⭐ Mastered / Can Teach:</span> ';
  html += '<select class="rv-input-sm" id="specMastered" style="width:180px;">';
  html += '<option value="">- None -</option>';
  interestOptions.forEach(function(opt) {
    var sel = (d.mastered === opt) ? ' selected' : '';
    html += '<option' + sel + '>' + opt + '</option>';
  });
  html += '</select></div></div>';

  // Skill categories
  var cats = [['🔍 Search Platforms','search'],['📱 Social Platforms','social'],['🛒 eCommerce','ecom'],['🏪 Retail','retail'],['📲 App Platforms','app'],['⚡ Additional Skills','additional'],['🏢 Client Type Experience','clientType']];
  cats.forEach(function(c) {
    var data = d[c[1]];
    if (!data || !Object.keys(data).length) return;
    var labels = skillLabels[c[1]];
    html += '<h4 style="margin:.75rem 0 .35rem;font-size:.9rem;">' + c[0] + '</h4>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:.5rem;">';
    Object.keys(data).forEach(function(k) {
      html += '<div style="display:inline-flex;align-items:center;gap:.3rem;padding:.3rem .5rem;border-radius:6px;background:#0A1119;color:#F4F1EB;font-size:.8rem;">';
      html += '<select class="spec-edit-rating" data-cat="' + c[1] + '" data-key="' + k + '" style="width:45px;padding:2px;border:1px solid var(--border);border-radius:4px;font-size:.8rem;">';
      html += '<option value="0">-</option>';
      for (var r = 1; r <= 5; r++) {
        var sel = (data[k] === r) ? ' selected' : '';
        html += '<option value="' + r + '"' + sel + '>' + r + '</option>';
      }
      html += '</select> ' + (labels[k]||k) + '</div>';
    });
    html += '</div>';
  });

  container.innerHTML = html;
}

function saveSpecEdits() {
  var name = document.getElementById('specPerson').value;
  if (!name || !specData[name]) return;

  // Collect ratings
  var overrides = {};
  document.querySelectorAll('.spec-edit-rating').forEach(function(el) {
    var cat = el.dataset.cat;
    var key = el.dataset.key;
    var val = parseInt(el.value) || 0;
    if (!overrides[cat]) overrides[cat] = {};
    overrides[cat][key] = val;
    specData[name][cat][key] = val;
  });

  // Collect interests
  var interests = [];
  document.querySelectorAll('.spec-interest').forEach(function(el) {
    if (el.value) interests.push(el.value);
  });
  overrides.interests = interests;
  specData[name].interests = interests;

  // Mastered
  var mastered = document.getElementById('specMastered').value;
  overrides.mastered = mastered;
  specData[name].mastered = mastered;

  // Save to localStorage
  localStorage.setItem('tt_spec_' + name, JSON.stringify(overrides));

  // Switch back to view mode
  specEditMode = false;
  document.getElementById('specEditBtn').style.display = '';
  document.getElementById('specSaveBtn').style.display = 'none';
  document.getElementById('specCancelBtn').style.display = 'none';
  renderPersonView(name, specData[name], document.getElementById('specPersonResult'));
  showToast('✅ Skills updated for ' + name + '!');
}

function cancelSpecEdit() {
  specEditMode = false;
  document.getElementById('specEditBtn').style.display = '';
  document.getElementById('specSaveBtn').style.display = 'none';
  document.getElementById('specCancelBtn').style.display = 'none';
  var name = document.getElementById('specPerson').value;
  if (name && specData[name]) renderPersonView(name, specData[name], document.getElementById('specPersonResult'));
}

function renderSkillExperts() {
  var val = document.getElementById('specSkillPicker').value;
  var container = document.getElementById('specSkillResult');
  if (!val) { container.innerHTML = ''; return; }
  var parts = val.split('.');
  var cat = parts[0]; var skill = parts[1];
  var label = skillLabels[cat][skill] || skill;

  var people = [];
  Object.keys(specData).forEach(function(name) {
    var d = specData[name][cat];
    if (d && d[skill]) people.push({name:name, rating:d[skill]});
  });
  people.sort(function(a,b) { return b.rating - a.rating; });

  var html = '<h4 style="margin:.5rem 0;">' + label + ', Team Rankings</h4>';
  html += '<div class="table-wrap"><table style="font-size:.85rem;"><tr><th>Rank</th><th>Name</th><th>Rating</th></tr>';
  people.forEach(function(p, i) {
    html += '<tr><td>' + (i+1) + '</td><td>' + p.name + '</td><td>' + ratingBadge(p.rating) + '</td></tr>';
  });
  html += '</table></div>';
  container.innerHTML = html;
}

function renderInterests() {
  var container = document.getElementById('specInterestsResult');
  var html = '<div class="table-wrap"><table style="font-size:.85rem;"><tr><th>Name</th><th>#1</th><th>#2</th><th>#3</th><th>#4</th><th>#5</th><th>⭐ Mastered</th></tr>';
  Object.keys(specData).sort().forEach(function(name) {
    var d = specData[name];
    html += '<tr><td><strong>' + name + '</strong></td>';
    for (var i = 0; i < 5; i++) {
      html += '<td>' + (d.interests[i] || '-') + '</td>';
    }
    html += '<td>' + (d.mastered || '-') + '</td></tr>';
  });
  html += '</table></div>';
  container.innerHTML = html;
}

// ===================== REVIEWS ENGINE =====================
function switchReviewTab(tab) {
  document.querySelectorAll('.rv-tab-content').forEach(function(el) { el.style.display = 'none'; });
  document.querySelectorAll('.rv-tab').forEach(function(el) { el.classList.remove('active'); });
  var content = document.getElementById('tab-' + tab);
  if (content) { content.style.display = 'block'; content.style.animation = 'none'; content.offsetHeight; content.style.animation = ''; }
  var btn = document.querySelector('.rv-tab[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
  if (tab === 'history') renderHistory();
}

// Org chart data: employee -> manager mapping
var orgChart = {
  "Riley Abercrombie": {manager:"Rachel Scharett",role:"Associate Director",reports:["Shelby Nations"]},
  "Hannah Price": {manager:"Rachel Scharett",role:"Associate Director",reports:["Mary McCambridge","Will Sokol"]},
  "Charlotte Pohl": {manager:"Rachel Scharett",role:"Associate Director",reports:["Allison Long","Kiyana Saidi-Nejad"]},
  "Allison Long": {manager:"Charlotte Pohl",role:"Senior Account Manager"},
  "Rachel Scharett": {manager:"",role:"Senior Director",reports:["Riley Abercrombie","Hannah Price","Charlotte Pohl"]},
  "Shelby Nations": {manager:"Riley Abercrombie",role:"Senior Account Manager",reports:["Megan Brenneke","Seth McDaniel","Owen Phipps"]},
  "Owen Phipps": {manager:"Shelby Nations",role:"Account Strategist"},
  "Megan Brenneke": {manager:"Shelby Nations",role:"Account Strategist"},
  "Seth McDaniel": {manager:"Shelby Nations",role:"Account Strategist"},
  "Mary McCambridge": {manager:"Hannah Price",role:"Senior Account Manager",reports:["Gretchen Hess"]},
  "Will Sokol": {manager:"Hannah Price",role:"Senior Account Manager",reports:["Megan Klein"]},
  "Gretchen Hess": {manager:"Mary McCambridge",role:"Account Manager",reports:["Daren Kalkoffen"]},
  "Megan Klein": {manager:"Will Sokol",role:"Account Manager"},
  "Daren Kalkoffen": {manager:"Gretchen Hess",role:"Account Strategist",reports:["Evin Leclerc"]},
  "Evin Leclerc": {manager:"Daren Kalkoffen",role:"Account Coordinator"},
  "Kiyana Saidi-Nejad": {manager:"Charlotte Pohl",role:"Account Manager",reports:["Billy Bevevino","Tate Dewey"]},
  "Billy Bevevino": {manager:"Kiyana Saidi-Nejad",role:"Account Strategist",reports:["Sanad Shuman"]},
  "Tate Dewey": {manager:"Kiyana Saidi-Nejad",role:"Account Strategist"},
  "Sanad Shuman": {manager:"Billy Bevevino",role:"Account Coordinator"},
  "Alex Blumberg": {manager:"Ashley Kaika",role:"Head of Partnerships"},
  "Steven Jatich": {manager:"Ashley Kaika",role:"Partnerships Director"},
  "Kersten Kruse": {manager:"Ashley Kaika",role:"Director of Marketing",reports:["Anirudh Venkat"]},
  "Anirudh Venkat": {manager:"Kersten Kruse",role:"Digital Marketing Specialist"},
  "Camryn": {manager:"Ashley Kaika",role:"EA"},
  "Ashley Kaika": {manager:"",role:"VP of Partnerships",reports:["Alex Blumberg","Steven Jatich","Kersten Kruse","Camryn"]},
};



const evalTasks = {
"Account Coordinator": [
  {task:"Execute basic in platform optimizations as assigned such as pausing underperformers and rotating winners",tier:"All"},
  {task:"Perform in platform optimizations",tier:"All"},
  {task:"Writing ad copy using best practices and brand guidelines",tier:"All"},
  {task:"In platform builds for Tier 3 and Tier 4 clients",tier:"3–4"},
  {task:"Pull daily and weekly performance numbers and screenshots for reporting",tier:"All"},
  {task:"Maintain change logs by recording what was launched and when",tier:"All"},
  {task:"Request and traffic creative assets from clients and internal creative partners",tier:"All"},
  {task:"Upload and traffic creative into platforms ensuring naming conventions are followed",tier:"All"},
  {task:"Create and update UTMs and tracking sheets as instructed",tier:"All"},
  {task:"Take notes during client and internal meetings capturing decisions and action items",tier:"All"},
  {task:"Update Asana tasks based on meeting outcomes and completed work",tier:"All"},
  {task:"Prepare slides for reports using existing templates",tier:"All"},
  {task:"Assist with competitor research and screenshot gathering for decks and creative inspiration",tier:"All"},
  {task:"Support audience research and list building with guidance from Account Strategist",tier:"All"},
  {task:"Monitor shared inboxes or Slack channels for client messages during assigned times and alert owners",tier:"All"},
  {task:"Handle scheduling for recurring client meetings and internal working sessions",tier:"All"},
  {task:"Assist in QA of live links, forms, and landing pages on multiple devices and browsers",tier:"All"},
  {task:"Support new client onboarding checklists and access gathering",tier:"All"},
],
"Account Strategist": [
  {task:"Own in-platform channel strategy for assigned channels",tier:"All"},
  {task:"Translate account level goals into channel level targets, budgets, and KPIs",tier:"All"},
  {task:"Build and maintain campaigns, ad sets, and ads in platforms for Tier 1 and Tier 2 clients",tier:"1–2"},
  {task:"Review and approve in-platform builds completed by Account Coordinator for Tier 3 and Tier 4 clients",tier:"3–4"},
  {task:"Monitor pacing, spend, and performance daily for assigned accounts",tier:"All"},
  {task:"Identify in-platform optimizations such as bid updates, budget shifts, audience refinements, and creative rotations",tier:"All"},
  {task:"Implement optimizations and log changes in a change log",tier:"All"},
  {task:"Create and maintain dynamic reports and dashboards",tier:"All"},
  {task:"Pull deep dive analyses when performance changes and propose hypotheses and actions",tier:"All"},
  {task:"Design testing plans across campaigns, audiences, bids, and creative",tier:"All"},
  {task:"QA in-platform builds for Tier 3 and Tier 4 clients",tier:"3–4"},
  {task:"Partner with Account Manager to ensure tracking is accurate including pixels, conversions, and offline uploads",tier:"All"},
  {task:"Maintain naming conventions and account structure documentation",tier:"All"},
  {task:"Provide immediate response to urgent client Slacks about performance and flag internally",tier:"All"},
  {task:"Prepare insights slides for monthly and quarterly reports",tier:"All"},
  {task:"Join client calls when detailed performance or technical topics will be covered",tier:"All"},
  {task:"Clear task setting in Asana for all tactical work including owners, due dates, and links",tier:"All"},
  {task:"Upskill junior support including Account Coordinators through shadowing and live feedback",tier:"All"},
  {task:"Provide proactive insights and recommendations even when not prompted by client questions",tier:"All"},
  {task:"Support exploration of new channels, features, and betas and summarize results",tier:"All"},
  {task:"Partner with data or analytics resources on advanced measurement and attribution questions",tier:"All"},
],
"Account Manager": [
  {task:"Serve as main day to day point of contact for Tier 3 and Tier 4 clients",tier:"3–4"},
  {task:"Support Senior Account Manager on Tier 1 and Tier 2 clients by managing timelines, follow ups, and documentation",tier:"1–2"},
  {task:"Build reporting needs and outline in partnership with Senior Account Manager and Account Strategist",tier:"All"},
  {task:"Prepare performance reports and decks based on data from Account Strategists",tier:"All"},
  {task:"Maintain live reporting links, dashboards, and access lists for clients",tier:"All"},
  {task:"QA in-platform builds for Tier 1 and Tier 2 accounts",tier:"1–2"},
  {task:"QA tracking links and UTMs before campaigns launch",tier:"All"},
  {task:"QA forms, landing pages, and onsite flows for basic functionality before launch",tier:"All"},
  {task:"Run client meetings for Tier 4 clients including weekly status calls",tier:"4"},
  {task:"Co-lead client meetings for Tier 2 and Tier 3 clients with Senior Account Manager",tier:"2–3"},
  {task:"Run internal meetings to review reporting, upcoming launches, and action lists",tier:"All"},
  {task:"Draft agendas for recurring client calls and share in advance",tier:"All"},
  {task:"Send recaps and action items after client and internal meetings",tier:"All"},
  {task:"Collect inputs from internal specialists before client meetings and consolidate into a single deck",tier:"All"},
  {task:"Respond to day to day client emails and Slacks within agreed service levels",tier:"All"},
  {task:"Flag urgent issues or performance concerns to Senior Account Manager",tier:"All"},
  {task:"Coach and mentor Account Strategists on communication and strategy skills",tier:"All"},
  {task:"Create and maintain Asana tasks for client requests across channels",tier:"All"},
  {task:"Track asset delivery for launches and follow up with clients and creative partners",tier:"All"},
  {task:"Maintain account overview docs including goals, audiences, offers, and key messages",tier:"All"},
  {task:"Maintain testing logs and learnings library for each account",tier:"All"},
  {task:"Support data pulls and light analysis on performance trends",tier:"All"},
  {task:"Support new client onboarding including access collection and intake forms",tier:"All"},
  {task:"Support creation of case studies and client success summaries",tier:"All"},
],
"Senior Account Manager": [
  {task:"Own day to day relationship for Tier 2 and Tier 3 clients",tier:"2–3"},
  {task:"Support Associate Director on day to day relationship management for Tier 1 clients",tier:"1"},
  {task:"Lead executive level communication for Tier 3 and Tier 4 clients",tier:"3–4"},
  {task:"Review and approve client facing collateral prior to sending for Tier 3 and Tier 4 clients",tier:"3–4"},
  {task:"Run client meetings for Tier 2 and Tier 3 clients including weekly or biweekly status calls",tier:"2–3"},
  {task:"Attend key meetings for Tier 4 clients and support Account Manager when needed",tier:"4"},
  {task:"Create yearly and quarterly strategic roadmaps for Tier 2 and Tier 3 clients",tier:"2–3"},
  {task:"Support Associate Director on strategic planning for Tier 1 clients",tier:"1"},
  {task:"Translate client business goals into channel objectives and tactical plans",tier:"All"},
  {task:"Own storyline and insights for monthly and quarterly reporting for Tier 2 and Tier 3 clients",tier:"2–3"},
  {task:"Review reporting decks and dashboards before they are sent to Tier 4 clients",tier:"4"},
  {task:"Review root cause analyses after major performance swings and approve remediation plan",tier:"All"},
  {task:"Align with Account Strategists on testing plans and performance expectations",tier:"All"},
  {task:"Set clear priorities and timelines for Account Managers",tier:"All"},
  {task:"Ensure all client asks are captured in Asana with owners and due dates",tier:"All"},
  {task:"Own workback plans for major launches and campaigns for Tier 2 and Tier 3 accounts",tier:"2–3"},
  {task:"Review performance weekly across channels and request deep dives when results change",tier:"All"},
  {task:"Handle day to day issue resolution with client partners and escalate to AD when risk is high",tier:"All"},
  {task:"Coach and mentor Account Managers on communication and strategy skills",tier:"All"},
  {task:"Deliver feedback and performance input for direct reports",tier:"All"},
  {task:"Support pre-sales work including case study creation",tier:"All"},
  {task:"Partner with finance or operations on forecasting and billing questions",tier:"All"},
],
"Associate Director": [
  {task:"Attend internal leadership calls",tier:"All"},
  {task:"Measure client success using month over month revenue change and other KPIs",tier:"All"},
  {task:"Review book of business churn risks and create action plans",tier:"All"},
  {task:"Oversee direct report team and OKRs",tier:"All"},
  {task:"Oversee client relationship with executive level team for priority accounts",tier:"1–2"},
  {task:"Lead executive level communication for Tier 1 and Tier 2 clients",tier:"1–2"},
  {task:"Support Senior Account Manager on executive communication for Tier 3 and Tier 4 clients as needed",tier:"3–4"},
  {task:"Oversee high level cross channel strategy for all accounts",tier:"All"},
  {task:"Own strategic vision and long term roadmap for Tier 1 and Tier 2 clients",tier:"1–2"},
  {task:"Review and sign off on strategic roadmaps created by Senior Account Managers for Tier 3 and Tier 4 clients",tier:"3–4"},
  {task:"Review and approve client facing collateral prior to sending for Tier 1 and Tier 2 clients",tier:"1–2"},
  {task:"Spot check client collateral for Tier 3 and Tier 4 clients",tier:"3–4"},
  {task:"Run internal pod meetings for Tier 1 and Tier 2 accounts",tier:"1–2"},
  {task:"Join key internal planning meetings for Tier 3 and Tier 4 accounts",tier:"3–4"},
  {task:"Run or co-lead client meetings for top priority Tier 1 accounts",tier:"1"},
  {task:"Join milestone client meetings for Tier 2–4 clients (renewals, major launches)",tier:"2–4"},
  {task:"Oversee budgets and margin for entire book of business",tier:"All"},
  {task:"Forecast annual and quarterly budgets for Tier 1 and Tier 2 clients",tier:"1–2"},
  {task:"Review and approve significant unplanned spend changes or reallocations",tier:"All"},
  {task:"Own revenue targets for the account pod and partner with leadership on forecasting",tier:"All"},
  {task:"Lead quarterly business review presentations for Tier 1 clients",tier:"1"},
  {task:"Review and approve QBR content for Tier 2–4 clients",tier:"2–4"},
  {task:"Define success metrics and north star KPIs with client leadership for larger accounts",tier:"1–2"},
  {task:"Review monthly performance narratives and provide strategic feedback",tier:"All"},
  {task:"Identify upsell and cross-sell opportunities and partner with sales on proposals",tier:"All"},
  {task:"Serve as primary escalation point for client concerns, performance issues, and scope disputes",tier:"All"},
  {task:"Lead or support new business pitches",tier:"All"},
  {task:"Partner with leadership on hiring decisions for account and strategy roles",tier:"All"},
  {task:"Lead onboarding of new Senior Account Managers and above",tier:"All"},
  {task:"Champion process improvements and tooling changes for the account pod",tier:"All"},
],
"Director": [
  {task:"Attend senior leadership meetings and represent client services perspective",tier:""},
  {task:"Translate company goals into clear priorities and KPIs for account pods",tier:""},
  {task:"Own capacity planning and staffing strategy across pods",tier:""},
  {task:"Partner with operations and finance to ensure profitable growth",tier:""},
  {task:"Own executive relationships for the most strategic accounts alongside founders or C-level",tier:"1–2"},
  {task:"Step in as executive sponsor for at-risk or high-opportunity accounts",tier:"All"},
  {task:"Review and sign off on multi-channel strategic roadmaps for Tier 1 and Tier 2 accounts",tier:"1–2"},
  {task:"Set standards for strategic planning process including templates and expectations for every tier",tier:"All"},
  {task:"Own revenue and margin targets for assigned business unit",tier:"All"},
  {task:"Lead or co-lead pitches for Tier 1 and Tier 2 prospects",tier:"1–2"},
  {task:"Work with sales to shape solutions, pricing, and staffing plans for complex scopes",tier:"All"},
  {task:"Identify opportunities to expand services across existing clients",tier:"All"},
  {task:"Serve as second level escalation point for performance issues and scope disputes",tier:"All"},
  {task:"Review outcomes of major tests, restructures, or channel changes for top accounts",tier:"All"},
  {task:"Audit client deliverables and meeting quality periodically",tier:"All"},
  {task:"Set development expectations for ADs and Sr AMs and run regular talent reviews",tier:"All"},
  {task:"Partner with People team on hiring and promotion criteria",tier:"All"},
  {task:"Sponsor mentorship and training programs",tier:"All"},
  {task:"Approve performance ratings and compensation recommendations for direct report leaders",tier:"All"},
  {task:"Lead cross-functional initiatives (strategy, creative, analytics, media)",tier:"All"},
  {task:"Evaluate new channels, partners, or offerings that should be piloted",tier:"All"},
  {task:"Maintain and socialize best practices for high-growth ecommerce and B2B brands",tier:"All"},
],
"Senior Director": [
  {task:"Participate in executive team meetings and contribute to overall agency strategy",tier:"All"},
  {task:"Own long-term vision for account management and strategic services including structure and role design",tier:"All"},
  {task:"Set annual revenue and margin targets for client services in partnership with leadership and finance",tier:"All"},
  {task:"Decide on portfolio tiering model and service level expectations by client tier",tier:"All"},
  {task:"Serve as executive sponsor for the very top clients",tier:"1"},
  {task:"Build trusted relationships with C-level stakeholders at top clients",tier:"1"},
  {task:"Step in to lead turnaround plans for highest risk accounts",tier:"1–2"},
  {task:"Approve largest scopes, pricing structures, and contract changes",tier:"1–2"},
  {task:"Own partnership strategy with key platforms and vendors",tier:"All"},
  {task:"Guide thought leadership agenda for the agency",tier:"All"},
  {task:"Champion investment in tools, data, and research for strategic planning",tier:"All"},
  {task:"Lead senior talent planning including succession plans",tier:"All"},
  {task:"Make final decisions on high impact hiring, promotions, and performance actions",tier:"All"},
  {task:"Align with founders on which new services will be incubated",tier:"All"},
  {task:"Ensure agency values are reflected in the client experience",tier:"All"},
  {task:"Monitor client satisfaction and retention trends across the portfolio",tier:"All"},
  {task:"Represent the agency externally at key client meetings, conferences, and partner events",tier:"1–2"},
  {task:"Sponsor major cross-agency projects (vertical expansion, international growth, operating model pilots)",tier:"All"},
],
};

const roleOrder = ["Account Coordinator","Account Strategist","Account Manager","Senior Account Manager","Associate Director","Director","Senior Director"];

function renderEval() {
  var role = document.getElementById('evalRole').value;
  var container = document.getElementById('evalContainer');
  if (!role) { container.innerHTML = ''; return; }

  var tasks = evalTasks[role] || [];
  var idx = roleOrder.indexOf(role);
  var aspirational = idx < roleOrder.length - 1 ? roleOrder[idx + 1] : null;
  var aspirationalTasks = aspirational ? (evalTasks[aspirational] || []) : [];

  function taskRow(t) {
    return '<div style="display:flex;align-items:baseline;gap:.75rem;background:#1B2126;border-left:3px solid #229FA1;border-radius:0 8px 8px 0;padding:.625rem .875rem;margin-bottom:.4rem;">' +
      '<span style="font-family:Calibri,Inter,sans-serif;font-size:.85rem;color:#FFFFFF;line-height:1.5;flex:1;">' + t.task + '</span>' +
      (t.tier && t.tier !== 'All' ? '<span style="font-family:Calibri,Inter,sans-serif;font-size:.7rem;font-weight:700;color:#9E9E9E;white-space:nowrap;border:1px solid rgba(255,255,255,0.12);border-radius:4px;padding:.15rem .45rem;flex-shrink:0;">Tier ' + t.tier + '</span>' : '') +
    '</div>';
  }

  var html = '<div class="card"><h3>📋 ' + role + ' — Task Proficiency (Current Role)</h3>' +
    '<div style="display:flex;flex-direction:column;gap:.25rem;">' +
    tasks.map(taskRow).join('') +
    '</div></div>';

  if (aspirational && aspirationalTasks.length) {
    html += '<div class="card"><h3>🚀 ' + aspirational + ' — Aspirational Role Tasks</h3>' +
      '<div class="callout blue" style="margin-bottom:1rem;">You must have a <strong>4+ manager rating</strong> on all current-role tasks before working on aspirational tasks. A rating of <strong>2+ on every aspirational task</strong> makes you eligible for promotion consideration.</div>' +
      '<div style="display:flex;flex-direction:column;gap:.25rem;">' +
      aspirationalTasks.map(taskRow).join('') +
      '</div></div>';
  }

  // Cultural Standards — read-only
  var cultGroups = [
    {group:'Good Standing', items:['Actively employed and not under notice of resignation or termination','Not subject to disciplinary action (PIPs, written warnings, or ongoing investigations)','If written feedback or PIP has been given, improvement must be documented','Compliant with all Company policies, procedures, and standards of conduct','Meeting role-specific operational expectations including communication and availability']},
    {group:'Communication Standards', items:['Maintain professional, timely, and respectful communication with clients, internal team, and leadership','Respond to internal and external messages within reasonable and role-appropriate timeframes','Notify appropriate stakeholders in advance of delays, absences, or availability changes']},
    {group:'Working Hours & Availability', items:['Be online, reachable, and actively working during established working hours','Attend required meetings and calls unless excused in advance','Maintain reliable access to required systems and communication tools']},
    {group:'PTO & Time Tracking Compliance', items:['Accurately request, record, and log all PTO in accordance with Company policy','PTO must be approved and logged before taking time off (emergencies excepted)','Receive approval prior to taking time off (except emergencies)','Avoid misrepresentation of availability or working time']},
    {group:'Video Presence & Calendar', items:['Camera on for client-facing meetings','Camera on for internal team meetings','Camera on for training sessions and reviews','Video expectations apply during normal working hours and scheduled meetings only']},
    {group:'Adherence to Company Procedures & Tools', items:['Follow established Company processes, tools, and documentation requirements','Accurately log required activity such as CRM updates, deal tracking, and reporting','Comply with role-specific operational or compliance requirements communicated by management']},
    {group:'Incentive Compensation & Accountability', items:['Understand that failure to maintain good standing may affect bonus/commission eligibility','Recognize that Incentive Compensation may be reduced, forfeited, or delayed based on standing','Good standing status is determined by documented behavior, performance, and policy compliance']},
  ];

  html += '<div class="card"><h3>🌟 Company Cultural Standards</h3>';
  cultGroups.forEach(function(grp) {
    html += '<div style="margin-bottom:1.25rem;">' +
      '<div style="font-family:Calibri,Inter,sans-serif;font-size:.75rem;font-weight:700;color:#229FA1;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.5rem;">' + grp.group + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:.25rem;">' +
      grp.items.map(function(item) {
        return '<div style="background:#1B2126;border-left:3px solid rgba(34,159,161,0.4);border-radius:0 8px 8px 0;padding:.625rem .875rem;font-family:Calibri,Inter,sans-serif;font-size:.83rem;color:#FFFFFF;line-height:1.5;">' + item + '</div>';
      }).join('') +
      '</div></div>';
  });
  html += '</div>';

  container.innerHTML = html;
}
function saveEval() {
  const role = document.getElementById('evalRole').value;
  if (!role) return;
  const data = {};
  document.querySelectorAll('#evalContainer .eval-rating, #evalContainer .eval-note').forEach(el => {
    const key = el.dataset.key;
    const val = el.value;
    if (val) data[key] = val;
  });
  localStorage.setItem('tt_eval_' + role, JSON.stringify(data));
}

function showEvalSummary() {
  const role = document.getElementById('evalRole').value;
  const name = document.getElementById('evalName').value || 'Team Member';
  const date = document.getElementById('evalDate').value || new Date().toISOString().split('T')[0];
  if (!role) return;

  const saved = JSON.parse(localStorage.getItem('tt_eval_' + role) || '{}');
  const tasks = evalTasks[role] || [];
  const idx = roleOrder.indexOf(role);
  const aspirational = idx < roleOrder.length - 1 ? roleOrder[idx + 1] : null;
  const aspirationalTasks = aspirational ? (evalTasks[aspirational] || []) : [];

  // Calculate stats
  let currentRated = 0, currentTotal = 0, currentSum = 0;
  let below3 = [], at5 = [];
  tasks.forEach((t, i) => {
    const v = parseInt(saved['c_' + i + '_r']);
    if (v) { currentRated++; currentSum += v; }
    currentTotal++;
    if (v && v < 3) below3.push(t.task);
    if (v === 5) at5.push(t.task);
  });
  const currentAvg = currentRated ? (currentSum / currentRated).toFixed(1) : '-';

  let aspRated = 0, aspTotal = 0, aspSum = 0, aspBelow2 = 0;
  aspirationalTasks.forEach((t, i) => {
    const v = parseInt(saved['a_' + i + '_r']);
    if (v) { aspRated++; aspSum += v; }
    aspTotal++;
    if (v && v < 2) aspBelow2++;
  });
  const aspAvg = aspRated ? (aspSum / aspRated).toFixed(1) : '-';

  // Readiness
  const allRated = currentRated === currentTotal;
  const all4Plus = allRated && !tasks.some((t, i) => { const v = parseInt(saved['c_' + i + '_r']); return !v || v < 4; });
  const aspReady = aspRated === aspTotal && aspBelow2 === 0 && aspRated > 0;

  let readiness = '🔴 Not ready';
  if (all4Plus && aspReady) readiness = '🟢 Eligible for promotion consideration';
  else if (all4Plus) readiness = '🟡 Current role mastered, build aspirational skills';
  else if (currentAvg >= 3) readiness = '🟡 Progressing, focus on areas below 4';

  let html = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin:1rem 0;">
      <div style="background:#0A1119;color:#F4F1EB;padding:1rem;border-radius:12px;text-align:center;">
        <div style="font-size:.75rem;color:var(--text-light);text-transform:uppercase;font-weight:700;">Name</div>
        <div style="font-size:1.1rem;font-weight:700;margin-top:.25rem;">${name}</div>
      </div>
      <div style="background:#0A1119;color:#F4F1EB;padding:1rem;border-radius:12px;text-align:center;">
        <div style="font-size:.75rem;color:var(--text-light);text-transform:uppercase;font-weight:700;">Role</div>
        <div style="font-size:1.1rem;font-weight:700;margin-top:.25rem;">${role}</div>
      </div>
      <div style="background:#0A1119;color:#F4F1EB;padding:1rem;border-radius:12px;text-align:center;">
        <div style="font-size:.75rem;color:var(--text-light);text-transform:uppercase;font-weight:700;">Date</div>
        <div style="font-size:1.1rem;font-weight:700;margin-top:.25rem;">${date}</div>
      </div>
      <div style="background:#0A1119;color:#F4F1EB;padding:1rem;border-radius:12px;text-align:center;">
        <div style="font-size:.75rem;color:var(--text-light);text-transform:uppercase;font-weight:700;">Current Role Avg</div>
        <div style="font-size:1.5rem;font-weight:800;margin-top:.25rem;color:${currentAvg >= 4 ? 'var(--success)' : currentAvg >= 3 ? 'var(--warning)' : 'var(--danger)'};">${currentAvg}</div>
      </div>
    </div>
    <p><strong>Tasks rated:</strong> ${currentRated} of ${currentTotal} &nbsp;|&nbsp; <strong>Readiness:</strong> ${readiness}</p>`;

  if (below3.length) {
    html += `<h4 style="margin-top:1rem;color:var(--danger);">⚠️ Areas Needing Improvement (Below 3)</h4><ul>`;
    below3.forEach(t => html += `<li style="font-size:.85rem;">${t}</li>`);
    html += '</ul>';
  }
  if (at5.length) {
    html += `<h4 style="margin-top:1rem;color:var(--success);">⭐ Expert-Level Skills (Rated 5)</h4><ul>`;
    at5.forEach(t => html += `<li style="font-size:.85rem;">${t}</li>`);
    html += '</ul>';
  }
  if (aspirational) {
    html += `<h4 style="margin-top:1rem;">🚀 Aspirational Role: ${aspirational}</h4>
      <p><strong>Avg:</strong> ${aspAvg} &nbsp;|&nbsp; <strong>Rated:</strong> ${aspRated} of ${aspTotal}</p>`;
  }

  document.getElementById('evalSummaryContent').innerHTML = html;
  document.getElementById('evalSummary').style.display = '';
  document.getElementById('evalSummary').scrollIntoView({behavior:'smooth'});
}

function resetEval() {
  const role = document.getElementById('evalRole').value;
  if (!role) return;
  if (!confirm('Reset all ratings for ' + role + '?')) return;
  localStorage.removeItem('tt_eval_' + role);
  renderEval();
}

function downloadEval() { window.print(); }

function copyEval() {
  const el = document.getElementById('evalSummaryContent');
  const text = el.innerText;
  navigator.clipboard.writeText(text).then(() => alert('Summary copied to clipboard!'));
}

// ===================== MONTHLY FEEDBACK LINKS =====================
function generateMfrLinks(month){
  var base='https://eliz.cliffeliz.ai/feedback-form.html';
  var links=[];
  Object.keys(orgChart).sort().forEach(function(name){
    var p=orgChart[name];
    if(!p.manager)return;
    var t=btoa(name+'-'+month).replace(/=/g,'');
    var url=base+'?employee='+encodeURIComponent(name)+'&manager='+encodeURIComponent(p.manager)+'&role='+encodeURIComponent(p.role)+'&month='+encodeURIComponent(month)+'&t='+t;
    links.push({name:name,role:p.role,manager:p.manager,url:url});
  });
  return links;
}

function renderMfrLinks(){
  var month=document.getElementById('mfrMonth').value;
  var links=generateMfrLinks(month);
  var h='<table style="width:100%;font-size:.82rem;border-collapse:collapse;">';
  h+='<tr style="border-bottom:2px solid var(--border);"><th style="text-align:left;padding:.4rem;">Employee</th><th style="text-align:left;padding:.4rem;">Role</th><th style="text-align:left;padding:.4rem;">Manager</th><th style="padding:.4rem;">Link</th></tr>';
  links.forEach(function(l){
    h+='<tr style="border-bottom:1px solid var(--border);">';
    h+='<td style="padding:.4rem;font-weight:600;">'+l.name+'</td>';
    h+='<td style="padding:.4rem;color:var(--text-light);">'+l.role+'</td>';
    h+='<td style="padding:.4rem;color:var(--text-light);">'+l.manager+'</td>';
    h+='<td style="padding:.4rem;text-align:center;"><button onclick="copyMfrLink(\''+l.url.replace(/'/g,"\\\\'")+'\')" style="padding:.2rem .5rem;border:1px solid var(--border);border-radius:4px;background:#1B2126;color:#F4F1EB;cursor:pointer;font-size:.75rem;">📋 Copy</button> <a href="'+l.url+'" target="_blank" style="font-size:.75rem;color:var(--accent);">Open</a></td>';
    h+='</tr>';
  });
  h+='</table>';
  document.getElementById('mfrLinkList').innerHTML=h;
  loadMfrSubmissions();
}

function copyMfrLink(url){
  navigator.clipboard.writeText(url);
  var el=document.getElementById('mfrCopyStatus');
  el.style.display='inline';setTimeout(function(){el.style.display='none';},1500);
}

function copyAllMfrLinks(){
  var month=document.getElementById('mfrMonth').value;
  var links=generateMfrLinks(month);
  var text=links.map(function(l){return l.name+' ('+l.role+')\n'+l.url;}).join('\n\n');
  navigator.clipboard.writeText(text);
  var el=document.getElementById('mfrCopyStatus');
  el.style.display='inline';setTimeout(function(){el.style.display='none';},2000);
}

function loadMfrSubmissions(){
  var container=document.getElementById('mfrSubmissions');
  if(!container)return;
  container.innerHTML='<p style="font-size:.85rem;color:var(--text-light);">Submissions are managed in <a href="https://performance.tigertracks.ai" target="_blank" style="color:var(--accent);font-weight:600;">TT Check-Ins →</a></p>';
}


// ===================== FEEDBACK FORM =====================
var _fbView='mine';

function updateFbRecipientInfo(){
  var name=document.getElementById('fbRecipient').value;
  var info=document.getElementById('fbRecipientInfo');
  var mgrLabel=document.getElementById('fbManagerLabel');
  var directLabel=document.getElementById('fbDirectLabel');
  if(!name||!orgChart[name]){info.textContent='';mgrLabel.textContent='--';directLabel.textContent='them';return;}
  var p=orgChart[name];
  info.textContent=p.role+(p.manager?' | Reports to '+p.manager:'');
  directLabel.textContent=name.split(' ')[0];
  mgrLabel.textContent=p.manager||'No manager listed';
}

function getFeedbackStore(){
  return JSON.parse(localStorage.getItem('tt_anon_feedback')||'[]');
}
function saveFeedbackStore(arr){
  localStorage.setItem('tt_anon_feedback',JSON.stringify(arr));
}

function submitFeedback(){
  var recipient=document.getElementById('fbRecipient').value;
  var type=document.getElementById('fbType').value;
  var message=document.getElementById('fbMessage').value.trim();
  var delivery=document.querySelector('input[name="fbDelivery"]:checked').value;

  var identityMode=document.querySelector('input[name="fbIdentity"]:checked').value;
  var sender=identityMode==='named'?document.getElementById('fbSender').value:'';

  if(!recipient){alert('Please select who this feedback is for.');return;}
  if(!message){alert('Please write your feedback.');return;}
  if(identityMode==='named'&&!sender){alert('Please select your name or switch to anonymous.');return;}

  var person=orgChart[recipient];
  var manager=person?person.manager:'';
  var typeLabels={praise:'🌟 Praise',constructive:'🔧 Constructive',suggestion:'💡 Suggestion',concern:'⚠️ Concern'};

  var entry={
    id:Date.now()+'_'+Math.random().toString(36).substr(2,6),
    recipient:recipient,
    recipientRole:person?person.role:'',
    type:type,
    typeLabel:typeLabels[type]||type,
    message:message,
    delivery:delivery,
    manager:manager,
    sender:sender,
    anonymous:!sender,
    date:new Date().toISOString(),
    read:false
  };

  var store=getFeedbackStore();
  store.push(entry);
  saveFeedbackStore(store);

  // Reset form
  document.getElementById('fbMessage').value='';
  var succ=document.getElementById('fbSuccess');
  succ.style.display='block';
  setTimeout(function(){succ.style.display='none';},3000);

  // Refresh inbox if viewer is selected
  renderFeedbackInbox();
}

var _fbView='mine';
function switchFbView(view,el){
  _fbView=view;
  document.querySelectorAll('#feedback .tab').forEach(function(t){t.classList.remove('active');});
  if(el)el.classList.add('active');
  renderFeedbackInbox();
}

function renderFeedbackInbox(){
  // C3 fix: restrict to signed-in user (admins see all)
  var _signedInEmail=(localStorage.getItem('tt_res_email')||'').toLowerCase();
  var _viewer=document.getElementById('fbViewer')?document.getElementById('fbViewer').value:'';
  if(_viewer&&_signedInEmail&&!['elizabeth@tigertracks.ai','cliff@tigertracks.ai','henry@tigertracks.ai'].includes(_signedInEmail)){
    var _myName=Object.keys(orgChart).find(function(n){var e=n.toLowerCase().split(' ');return (e[0]+'@tigertracks.ai')===_signedInEmail;})||'';
    if(_myName&&_viewer!==_myName){var _ib=document.getElementById('fbInbox');if(_ib)_ib.innerHTML='<p style="color:#dc2626;font-size:.85rem;">⚠️ You may only view your own feedback.</p>';return;}
  }
  var viewer=document.getElementById('fbViewer').value;
  var inbox=document.getElementById('fbInbox');
  var countMine=document.getElementById('fbCountMine');
  var countTeam=document.getElementById('fbCountTeam');
  if(!viewer){inbox.innerHTML='<p style="color:var(--text-light);font-size:.85rem;">Select your name to view feedback.</p>';countMine.textContent='';countTeam.textContent='';return;}

  var store=getFeedbackStore();
  var person=orgChart[viewer];

  // "For Me" = feedback where I am the recipient AND delivery is 'direct' or 'both'
  var forMe=store.filter(function(f){
    return f.recipient===viewer && (f.delivery==='direct'||f.delivery==='both');
  });

  // "My Reports" = feedback about my direct reports where delivery is 'manager' or 'both'
  var reports=(person&&person.reports)?person.reports:[];
  var forTeam=store.filter(function(f){
    return reports.indexOf(f.recipient)>=0 && (f.delivery==='manager'||f.delivery==='both');
  });

  countMine.textContent='('+forMe.length+')';
  countTeam.textContent='('+forTeam.length+')';

  var items=_fbView==='mine'?forMe:forTeam;
  items.sort(function(a,b){return new Date(b.date)-new Date(a.date);});

  if(!items.length){
    inbox.innerHTML='<p style="color:var(--text-light);font-size:.85rem;text-align:center;padding:2rem 0;">'+(_fbView==='mine'?'No feedback for you yet.':'No feedback about your reports yet.')+'</p>';
    return;
  }

  var h='';
  items.forEach(function(f){
    var d=new Date(f.date);
    var dateStr=d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    var borderColor=f.type==='praise'?'#10b981':f.type==='concern'?'#ef4444':f.type==='constructive'?'#f59e0b':'#6366f1';
    h+='<div style="padding:.75rem;border-left:3px solid '+borderColor+';background:var(--panel);border-radius:0 8px 8px 0;margin-bottom:.6rem;">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem;">';
    h+='<span style="font-size:.78rem;font-weight:600;">'+f.typeLabel+'</span>';
    h+='<span style="font-size:.7rem;color:var(--text-light);">'+dateStr+'</span>';
    h+='</div>';
    if(_fbView==='team') h+='<div style="font-size:.75rem;color:var(--accent);font-weight:600;margin-bottom:.25rem;">About: '+f.recipient+' ('+f.recipientRole+')</div>';
    h+='<div style="font-size:.75rem;color:var(--text-light);margin-bottom:.25rem;">'+(f.anonymous||!f.sender?'🕶️ Anonymous':'👤 From: '+f.sender)+'</div>';
    h+='<div style="font-size:.83rem;line-height:1.5;">'+f.message.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')+'</div>';
    h+='</div>';
  });
  inbox.innerHTML=h;
}

// ===================== WINDOW GLOBALS =====================
window.toggle = toggle;
window.renderEval = renderEval;
window.evalAutoFillRole = evalAutoFillRole;
window.switchBenTab = switchBenTab;
window.switchBpTab = switchBpTab;
window.switchCultureTab = switchCultureTab;
window.switchBonusTab = switchBonusTab;
window.switchInvTab = switchInvTab;
window.switchRefTab = switchRefTab;
window.switchAsanaTab = switchAsanaTab;
window.switchSpecTab = switchSpecTab;
window.switchReviewTab = switchReviewTab;
window.renderSkillChart = renderSkillChart;
window.renderQuiz = renderQuiz;
window.scoreQuiz = scoreQuiz;
window.renderTemplateCards = renderTemplateCards;
window.createTemplateCopy = createTemplateCopy;
window.saveTemplateCopy = saveTemplateCopy;
window.copyTemplateToClipboard = copyTemplateToClipboard;
window.emailTemplate = emailTemplate;
window.renderSavedTemplates = renderSavedTemplates;
window.viewSavedTemplate = viewSavedTemplate;
window.copySavedTemplate = copySavedTemplate;
window.emailSavedTemplate = emailSavedTemplate;
window.deleteSavedTemplate = deleteSavedTemplate;
window.toggleSpecEdit = toggleSpecEdit;
window.saveSpecEdits = saveSpecEdits;
window.cancelSpecEdit = cancelSpecEdit;
window.renderPersonSpec = renderPersonSpec;
window.showEvalSummary = showEvalSummary;
window.resetEval = resetEval;
window.downloadEval = downloadEval;
window.copyEval = copyEval;
window.updateFbRecipientInfo = updateFbRecipientInfo;
window.submitFeedback = submitFeedback;
window.switchFbView = switchFbView;
window.renderFeedbackInbox = renderFeedbackInbox;
window.renderMfrLinks = renderMfrLinks;
window.copyMfrLink = copyMfrLink;
window.copyAllMfrLinks = copyAllMfrLinks;
window.showToast = showToast;
// populateReviewerInfo is defined in index.html and already global

// ===================== INIT (runs after DOM is ready) =====================
function initAppScripts() {

  // ── Good Standing: open all collapsibles by default ──
  var standingEl = document.getElementById('cul-standing');
  if (standingEl) {
    standingEl.querySelectorAll('.collapsible-content').forEach(function(el) {
      el.style.display = 'block';
    });
    standingEl.querySelectorAll('.collapsible').forEach(function(el) {
      el.classList.add('open');
    });
  }

  // ── Template init calls ──
  renderTemplateCards();
  renderSavedTemplates();
  var chartCatEl = document.getElementById('chartCatSelect');
  if (chartCatEl) renderSkillChart();

  // ── Back to top scroll listener ──
  window.addEventListener('scroll', function() {
    var backTopEl = document.getElementById('backTop');
    if (backTopEl) backTopEl.classList.toggle('show', window.scrollY > 400);
  });

  // ── Cmd+K shortcut ──
  document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      var bar = document.getElementById('cmdBar');
      if (bar) { bar.focus(); bar.select(); }
    }
  });

  // ── Search bar ──
  var cmdBarEl = document.getElementById('cmdBar');
  if (cmdBarEl) {
    cmdBarEl.addEventListener('input', function() {
      var q = this.value.toLowerCase();
      var activeSection = document.querySelector('.section[style*="display: block"]') || null;
      var cards = activeSection ? activeSection.querySelectorAll('.card') : document.querySelectorAll('.card');
      cards.forEach(function(card) {
        var match = card.textContent.toLowerCase().includes(q);
        card.style.display = match || !q ? '' : 'none';
      });
    });
  }

  // ── Specialty dropdown population ──
  (function() {
    var sel = document.getElementById('specPerson');
    if (!sel) return;
    Object.keys(specData).sort().forEach(function(n) {
      sel.innerHTML += '<option value="' + n + '">' + n + '</option>';
    });
    sel.addEventListener('change', renderPersonSpec);

    // Populate skill picker
    var skillSel = document.getElementById('specSkillPicker');
    if (!skillSel) return;
    var groups = [['Search Platforms','search'],['Social Platforms','social'],['eCommerce','ecom'],['Retail','retail'],['App Platforms','app'],['Additional Skills','additional'],['Client Type','clientType']];
    groups.forEach(function(g) {
      var optgroup = document.createElement('optgroup');
      optgroup.label = g[0];
      Object.keys(skillLabels[g[1]]).forEach(function(k) {
        var opt = document.createElement('option');
        opt.value = g[1] + '.' + k;
        opt.textContent = skillLabels[g[1]][k];
        optgroup.appendChild(opt);
      });
      skillSel.appendChild(optgroup);
    });
    skillSel.addEventListener('change', renderSkillExperts);
  })();

  // ── Load spec overrides from localStorage ──
  (function loadSpecOverrides() {
    Object.keys(specData).forEach(function(name) {
      var saved = localStorage.getItem('tt_spec_' + name);
      if (saved) {
        try {
          var overrides = JSON.parse(saved);
          Object.keys(overrides).forEach(function(cat) {
            if (cat === 'interests' || cat === 'mastered') {
              specData[name][cat] = overrides[cat];
            } else if (typeof overrides[cat] === 'object') {
              if (!specData[name][cat]) specData[name][cat] = {};
              Object.keys(overrides[cat]).forEach(function(k) {
                specData[name][cat][k] = overrides[cat][k];
              });
            }
          });
        } catch(e) {}
      }
    });
  })();

  // ── Eval role change listener + date ──
  var evalRoleEl = document.getElementById('evalRole');
  if (evalRoleEl) evalRoleEl.addEventListener('change', renderEval);
  var evalDateEl = document.getElementById('evalDate');
  if (evalDateEl) evalDateEl.valueAsDate = new Date();

  // ── Help desk chat ──
(function() {
  // Build knowledge base from page content
  function buildKB() {
    const entries = [];
    document.querySelectorAll('.card').forEach(card => {
      const section = card.closest('.section');
      const sectionId = section ? section.id : '';
      const sectionTitle = section ? (section.querySelector('.section-header h2')?.textContent || '') : '';
      const cardTitle = card.querySelector('h3')?.textContent || '';
      const text = card.textContent.replace(/\s+/g, ' ').trim();
      entries.push({ sectionId, sectionTitle, cardTitle, text });
    });
    return entries;
  }

  // FAQ is dynamically built from page content + curated entries
  // buildKB() scrapes all .card elements automatically
  // These curated entries provide precise answers for common questions
  const faq = [
    // PTO & Leave
    { q: ['pto','time off','vacation','days off','holiday'], a: 'Tiger Tracks offers flexible unlimited PTO (10-15 days/year benchmark). Must be employed 60+ days, request 2 weeks in advance (1 month for 3+ days), get manager approval, and create a coverage plan. 15 paid holidays per year. See the PTO Guidelines section for full details.', section: 'pto-guidelines' },
    { q: ['parental','maternity','paternity','baby','family leave'], a: 'Up to 12 weeks of Company-paid parental leave after 9 months of employment, for birth, adoption, or foster placement. Must be taken within 12 months. See Handbook Section 3-3.', section: 'handbook' },
    { q: ['bereavement','death','funeral','loss'], a: 'Up to 14 days paid for immediate family, up to 7 days for other significant relationships (with People Ops approval). See Handbook Section 3-7.', section: 'handbook' },
    { q: ['isolved','leave request','submit pto','request time'], a: 'Go to Time → Dashboard → Leave Request in iSolved. Enter dates, link your coverage plan in the Comment field, and add email notifications for your team. Manager will approve within 2 business days. See PTO Guidelines.', section: 'pto-guidelines' },
    // Escalation & Management
    { q: ['escalat','report','raise issue','flag'], a: 'The escalation path is: AS → AM → Sr AM → AD → Leadership. Any level can go directly to HR for behavior/people issues. Escalate early, not when it\'s urgent! See Management Playbook → Escalation Principles.', section: 'playbook' },
    { q: ['delegat','assign task','hand off','issue command'], a: 'Key rule: Issue commands, don\'t ask "who has bandwidth?" Tell them what you need and when. If they push back, have the prioritization conversation, it\'s productive, not a gotcha. See Management Playbook → Delegation Principles.', section: 'playbook' },
    { q: ['1:1','one on one','check in'], a: 'Weekly 1:1s are 15 minutes. Use the Templates section to create editable copies. Covers: account updates, priorities, capacity check, support needed. See Templates & Tools under Management Playbook.', section: 'templates' },
    { q: ['mos','operating system','weekly rhythm','monthly cadence','quarterly'], a: 'The Manager Operating System (MOS) covers weekly rhythm (30-45 min/report), monthly coaching cadence, and quarterly pod reviews led by ADs. See Management Playbook → MOS.', section: 'playbook' },
    // Roles & Performance
    { q: ['role','responsibilit','what do','job','swim lane'], a: 'Roles & Responsibilities defines expectations for each level (AC through Sr Director): responsibilities, account loads, managed revenue bands. Find it under Team Resources → Roles & Responsibilities.', section: 'roles' },
    { q: ['evaluat','self-assess','proficiency','r&r','promotion'], a: 'Use the Self-Evaluation Survey! Select your role, rate yourself 1-5 on each task. You need 4+ manager rating on all current tasks before aspirational tasks, and 2+ on aspirational for promotion eligibility. Under Team Resources.', section: 'evaluation' },
    { q: ['pip','performance improvement','underperform','struggling'], a: 'For underperformance, use the Underperformance Correction Template (not a formal PIP). Identify 1-3 areas, set 2-4 week expectations, provide weekly check-ins. See Templates & Tools.', section: 'templates' },
    { q: ['3 c','three c','competence','communication','consistency','performance rating'], a: 'The 3 C\'s Framework: Competence (work quality), Communication (timely & proactive), Consistency (reliable day-to-day). Used in monthly feedback reviews and escalation decisions. See Management Playbook → Escalation.', section: 'playbook' },
    // Culture
    { q: ['problem solving','pyramid','level 1','level 5','solution'], a: 'The Problem-Solving Pyramid has 5 levels: 1) Flag problem & walk away (worst), 2) Problem + causes, 3) Problem + causes + solutions, 4) All of above + recommendation, 5) Solved it, keeping you in the loop (best). See Company Culture Standards.', section: 'culture' },
    { q: ['good standing','bonus eligib','commission eligib'], a: 'Good standing requires: active employment, no disciplinary action, compliance with policies, meeting operational expectations (communication, availability, video, PTO logging). Losing good standing can forfeit bonus/commission. See Culture Standards.', section: 'culture' },
    // Bonus & Referral
    { q: ['quarterly bonus','bonus tier','managed revenue','bonus amount'], a: 'Quarterly bonus tiers: $0-60K=$0, $60-90K=$1,000, $90-120K=$3,000, $120-150K=$5,000, >$150K=$5,000+18% of overage. Paid within 60 days of quarter close. See Bonus Structures → Quarterly Bonus Policy.', section: 'bonuses' },
    { q: ['referral','refer someone','refer employee','refer client'], a: 'Employee referrals: $2,000 per qualified hire (after 90 days). Client referrals: 100% of first month\'s revenue. Submit via Google Form. See Bonus Structures → Referral Bonuses.', section: 'bonuses' },
    // Benefits
    { q: ['insurance','health','copay','deductible','doctor','prescription','rx','pharmacy','teladoc','virtual visit','urgent care','emergency','hospital','benefits plan'], a: 'Tiger Tracks offers Florida Blue BlueOptions 14002 (PPO/EPO). $0 in-network deductible, $15 PCP visits, $0 virtual visits via Teladoc, $30 specialist, $35 urgent care, $150 ER. Rx starts at $4 generics. See Benefits.', section: 'benefits' },
    { q: ['dental','dentist','cleaning','crown'], a: 'Guardian PPO dental: $50 deductible, $2,500 annual max. 100% preventive, 80% basic, 50% major. Employee: $23.49/mo. Maximum Rollover up to $1,500 banked. See Benefits.', section: 'benefits' },
    { q: ['vision','eye','glasses','contacts','lasik'], a: 'Guardian VSP vision: $10 exam copay, $25 materials copay, $150 frame allowance. Exams yearly, frames every 2 years. Up to 15% off LASIK. Employee: $5.49/mo. See Benefits.', section: 'benefits' },
    { q: ['401k','retirement','401','match','vesting','deferral'], a: 'Tiger Tracks offers a 401(k) plan (effective 01/01/2026) with a Safe Harbor employer match: 100% on the first 1% of pay + 50% on the next 1-6% (max 3.5% match). You are eligible after age 21 + 3 months of service. Automatic enrollment starts at 3%, increasing 1% annually up to 10%. Employer match vests after 2 years (cliff vesting). 2025 contribution limit: $23,500 ($31,000 if age 50+). Enroll through iSolved. See Benefits > 401(k) for full details.', section: 'benefits' },
    { q: ['teladoc','virtual','telehealth','doctor online'], a: 'Teladoc: 24/7 access to doctors via phone, video, or app for $0 (in-network). Call 1-800-835-2362 or visit Teladoc.com. Great for colds, flu, allergies, etc. See Benefits.', section: 'benefits' },
    // Offerings
    { q: ['offering','service','what do we do','what we offer','paid search','paid social','programmatic','ctv','creative','seo','geo','lifecycle','mmm','analytics'], a: 'Tiger Tracks offers: Media Buying (Paid Search, Social, Programmatic, Retail Media, CTV), Creative (Image/Video, UGC/Influencer), Website (Dev, LP CRO), Organic (SEO+ASO, GEO), Lifecycle (Email+SMS), Analytics (Measurement, MMM). See TT Offerings under About Tiger Tracks.', section: 'offerings' },
    // Org
    { q: ['org','report','who reports','manager','structure','chart'], a: 'Rachael (Sr Dir Client Success) and Ashley (VP Partnerships & Growth) report to Cliff/Henry (Co-Founders). Elizabeth leads People Ops. Riley, Hannah, Charlotte (ADs) report to Rachael. Kersten and Alex report to Ashley. See Org Chart under About Tiger Tracks.', section: 'org' },
    { q: ['north star','mission','customer success','goal'], a: 'Customer Success is the North Star for every role. It means: protecting and growing managed revenue, clear communication, strategic insight, and stable client relationships. See Management Playbook.', section: 'playbook' },
    // Templates
    { q: ['template','form','copy','use template'], a: 'All templates are in Templates & Tools (under Management Playbook). Click "📝 Use Template" to create an editable copy, assign to a team member, and save/copy/email. Templates include: 1:1s, Expectations, Delegation, Capacity, Underperformance, Weekly Rhythm.', section: 'templates' },
    { q: ['capacity','workload','overload','bandwidth'], a: 'Capacity levels: 🔵 Under (0-25%), 🟢 Healthy (25-75%), 🟡 At (75-100%), 🔴 Over (100%+). Use the Capacity Check-In template weekly. See Templates & Tools.', section: 'templates' },
    // Meeting Agendas
    { q: ['weekly','sync','meeting agenda'], a: 'Go to Meeting Agendas! Fill out your weekly sync (wins, priorities, risks, capacity, support needed). Your manager fills the supervisor section. Everything auto-saves.', section: 'reviews' },
    { q: ['monthly review','feedback review','performance review','supervisor rating'], a: 'Monthly Feedback Review in Meeting Agendas. Both employee and supervisor complete 3 C\'s ratings, goals, development, and recommendations.', section: 'reviews' },
    // Specialties
    { q: ['specialt','skill','expert','who knows','who is good at'], a: 'Check the Team Specialties Chart (under Team Resources). Use the Skills Chart for visual bar graphs, View by Person for individual profiles, or Find Expert by Skill to search. Team members can edit their own ratings.', section: 'specialties' },
    // Security
    { q: ['it','support','ptg','tech','laptop','computer','internet','wifi','password reset','locked out','software','hardware','proactive','technology group'], a: 'Tiger Tracks IT is managed by ProActive Technology Group (PTG). For support: 📞 Call 516-876-8200 (24/7, fastest for emergencies), 📧 Email support@ptg.co (auto-ticketed), or 🌐 Portal at myitportal.net/login. Response times: Emergency 15 min, Urgent 1 hr, Standard 4-8 hrs. See the IT Support & Cybersecurity section for full details.', section: 'it-support' },
    { q: ['security','password','lastpass','credential','phishing'], a: 'All credentials must be stored in LastPass. Use Password Generator, enable MFA, never share via Slack/email/docs. If compromised: change password immediately, revoke access, notify Elizabeth & #tt-security. See Security Policy under Handbook.', section: 'security-policy' },
    // Handbook general
    { q: ['handbook','policy','conduct','at-will'], a: 'The Employee Handbook covers employment policies, workplace conduct, benefits, leave, and more. See the Handbook section. PTO Guidelines and Security Policy are also under Handbook.', section: 'handbook' },
    { q: ['remote','work from home','video','camera on'], a: 'Tiger Tracks is remote-first. Video on for client calls, team meetings, training. Consistent failure to meet video expectations without accommodation may impact good standing. See Culture Standards → Good Standing.', section: 'culture' },
    { q: ['ai','artificial intelligence','chatgpt','automation'], a: 'Use only Company-approved AI tools. Never enter confidential/client data. All AI work must be human-reviewed. You\'re fully accountable for accuracy. See Handbook Section 2-16.', section: 'handbook' },
    { q: ['harassment','discrimination','complaint'], a: 'Report to your Manager or People Operations. If complaint involves a Manager, escalate to People Ops or senior leadership. All reports investigated promptly. Retaliation prohibited. See Handbook.', section: 'handbook' },
    { q: ['pod','bench','cross-functional'], a: 'Tiger Tracks operates in pods with 1-2 direct reports per layer. Pods are "benches not families", growth based on business need and performance, not tenure. See Management Playbook.', section: 'playbook' },
    { q: ['tech issue','internet down','laptop broken','wifi'], a: 'Notify your manager immediately, resolve within 24-48 hours, have a backup plan (mobile hotspot, secondary device). Keep software updated proactively. See PTO Guidelines → Personal Tech Issues.', section: 'pto-guidelines' },
  ];

  // Chat state
  let chatOpen = false;
  let messages = [{ role: 'bot', text: 'Hey! 👋 I\'m the Tiger Tracks Help Desk. Ask me anything about roles, policies, templates, or how things work here.' }];

  // Create chat UI
  const style = document.createElement('style');
  style.textContent = `
    .chat-fab { position:fixed; bottom:2rem; right:5.5rem; width:56px; height:56px; border-radius:50%; background:var(--primary); color:#fff; border:none; font-size:1.5rem; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,.2); z-index:200; display:flex; align-items:center; justify-content:center; transition:transform .2s; }
    .chat-fab:hover { transform:scale(1.1); }
    .chat-fab .badge { position:absolute; top:-2px; right:-2px; width:14px; height:14px; border-radius:50%; background:var(--accent); border:2px solid #fff; display:none; }
    .chat-panel { position:fixed; bottom:6rem; right:2rem; width:380px; max-height:520px; background:#1B2126;color:#F4F1EB; border-radius:16px; box-shadow:0 8px 32px rgba(0,0,0,.18); z-index:200; display:none; flex-direction:column; overflow:hidden; border:1px solid var(--border); }
    .chat-panel.open { display:flex; }
    .chat-header { background:var(--panel); color:#fff; padding:1rem 1.25rem; display:flex; align-items:center; justify-content:space-between; }
    .chat-header h4 { font-size:.95rem; font-weight:700; margin:0; font-family:Georgia,'Playfair Display',serif; }
    .chat-header .close-chat { background:none; border:none; color:#94a3b8; font-size:1.25rem; cursor:pointer; }
    .chat-messages { flex:1; overflow-y:auto; padding:1rem; display:flex; flex-direction:column; gap:.75rem; max-height:340px; }
    .chat-msg { max-width:85%; padding:.6rem .9rem; border-radius:12px; font-size:.85rem; line-height:1.5; font-family:'Montserrat',sans-serif; }
    .chat-msg.bot { background:#1B2126;color:#F4F1EB; color:var(--text); align-self:flex-start; border-bottom-left-radius:4px; }
    .chat-msg.user { background:var(--primary); color:#fff; align-self:flex-end; border-bottom-right-radius:4px; }
    .chat-msg a { color:var(--accent); font-weight:600; text-decoration:underline; }
    .chat-msg.bot a { color: var(--primary); font-weight:600; }
    .chat-input-wrap { display:flex; border-top:1px solid var(--border); padding:.5rem; gap:.4rem; }
    .chat-input-wrap input { flex:1; border:1px solid var(--border); border-radius:8px; padding:.5rem .75rem; font-size:.85rem; font-family:'Montserrat',sans-serif; outline:none; }
    .chat-input-wrap input:focus { border-color:var(--accent); }
    .chat-input-wrap button { background:var(--accent); color:#fff; border:none; border-radius:8px; padding:.5rem .75rem; font-weight:700; cursor:pointer; font-size:.85rem; }
    .chat-suggestions { display:flex; flex-wrap:wrap; gap:.35rem; padding:0 1rem .75rem; }
    .chat-chip { background:#1B2126;color:#F4F1EB; border:1px solid var(--border); border-radius:20px; padding:.3rem .65rem; font-size:.75rem; cursor:pointer; color:var(--text); transition:all .15s; font-family:'Montserrat',sans-serif; }
    .chat-chip:hover { background:var(--accent); color:#fff; border-color:var(--accent); }
    @media(max-width:480px) { .chat-panel { right:.5rem; left:.5rem; width:auto; bottom:5rem; } }
  `;
  document.head.appendChild(style);

  const fab = document.createElement('button');
  fab.className = 'chat-fab';
  fab.innerHTML = '💬<span class="badge"></span>';
  fab.title = 'Help Desk';
  document.body.appendChild(fab);

  const panel = document.createElement('div');
  panel.className = 'chat-panel';
  panel.innerHTML = `
    <div class="chat-header">
      <h4>💬 Help Desk</h4>
      <button class="close-chat">✕</button>
    </div>
    <div class="chat-messages" id="chatMessages"></div>
    <div class="chat-suggestions" id="chatSuggestions"></div>
    <div class="chat-input-wrap">
      <input type="text" id="chatInput" placeholder="Ask a question...">
      <button id="chatSend">Send</button>
    </div>
  `;
  document.body.appendChild(panel);

  const msgContainer = panel.querySelector('#chatMessages');
  const input = panel.querySelector('#chatInput');
  const sendBtn = panel.querySelector('#chatSend');
  const suggestionsEl = panel.querySelector('#chatSuggestions');

  const suggestions = ['How do I request PTO?', 'What are our offerings?', 'Quarterly bonus tiers?', 'Problem-solving pyramid?', 'Who reports to whom?', 'How do I delegate?', 'Good standing policy?', 'LastPass setup?'];

  function renderSuggestions() {
    suggestionsEl.innerHTML = suggestions.map(s => `<span class="chat-chip">${s}</span>`).join('');
    suggestionsEl.querySelectorAll('.chat-chip').forEach(chip => {
      chip.addEventListener('click', () => { input.value = chip.textContent; handleSend(); });
    });
  }

  function renderMessages() {
    msgContainer.innerHTML = messages.map(m => `<div class="chat-msg ${m.role}">${m.text}</div>`).join('');
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function findAnswer(query) {
    const q = query.toLowerCase();
    
    // Check FAQ first
    let bestFaq = null;
    let bestScore = 0;
    for (const item of faq) {
      let score = 0;
      for (const keyword of item.q) {
        if (q.includes(keyword)) score++;
      }
      if (score > bestScore) { bestScore = score; bestFaq = item; }
    }
    if (bestFaq && bestScore > 0) {
      return bestFaq.a + ` <a href="#${bestFaq.section}">→ Jump to section</a>`;
    }

    // Fallback: search page content
    const kb = buildKB();
    let bestMatch = null;
    let bestMatchScore = 0;
    const words = q.split(/\s+/).filter(w => w.length > 2);
    for (const entry of kb) {
      const lower = entry.text.toLowerCase();
      let matchCount = 0;
      for (const w of words) {
        if (lower.includes(w)) matchCount++;
      }
      if (matchCount > bestMatchScore) {
        bestMatchScore = matchCount;
        bestMatch = entry;
      }
    }
    if (bestMatch && bestMatchScore >= 1) {
      return `I found something relevant in <strong>${bestMatch.sectionTitle} → ${bestMatch.cardTitle}</strong>. <a href="#${bestMatch.sectionId}">→ Jump to section</a><br><br>Try clicking that section to find the details you need. If you need more help, try being more specific!`;
    }

    return 'Hmm, I\'m not sure about that one. Try browsing the sections above or use the search bar at the top. You can also ask about: PTO, escalation, roles, 1:1s, feedback, delegation, capacity, org chart, or any handbook policy!';
  }

  function handleSend() {
    const val = input.value.trim();
    if (!val) return;
    messages.push({ role: 'user', text: val });
    input.value = '';
    renderMessages();
    suggestionsEl.innerHTML = '';

    setTimeout(() => {
      const answer = findAnswer(val);
      messages.push({ role: 'bot', text: answer });
      renderMessages();
      renderSuggestions();
    }, 400);
  }

  fab.addEventListener('click', () => {
    chatOpen = !chatOpen;
    panel.classList.toggle('open', chatOpen);
    if (chatOpen) { renderMessages(); renderSuggestions(); input.focus(); }
  });
  panel.querySelector('.close-chat').addEventListener('click', () => {
    chatOpen = false;
    panel.classList.remove('open');
  });
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });
})();

  // ── PTO system ──
(function() {
  // Populate employee dropdown from orgChart
  var sel = document.getElementById('ptoEmployee');
  if (!sel) return;
  var names = Object.keys(orgChart).sort();
  names.forEach(function(n) {
    var opt = document.createElement('option');
    opt.value = n; opt.textContent = n;
    sel.appendChild(opt);
  });

  // Auto-fill manager
  window.ptoAutoManager = function() {
    var emp = sel.value;
    var mgr = document.getElementById('ptoManager');
    if (emp && orgChart[emp]) {
      mgr.value = orgChart[emp].manager || 'Elizabeth (People Ops)';
    } else {
      mgr.value = '';
    }
    renderMyRequests();
    renderApprovalQueue();
    renderBalance();
  };

  // Get all PTO requests from localStorage
  function getRequests() {
    return JSON.parse(localStorage.getItem('tt_pto_requests') || '[]');
  }
  function saveRequests(arr) {
    localStorage.setItem('tt_pto_requests', JSON.stringify(arr));
  }

  // Calculate business days
  function bizDays(start, end) {
    var s = new Date(start), e = new Date(end), count = 0;
    while (s <= e) {
      var d = s.getDay();
      if (d !== 0 && d !== 6) count++;
      s.setDate(s.getDate() + 1);
    }
    return count;
  }

  // Submit request
  window.submitPtoRequest = function() {
    var emp = document.getElementById('ptoEmployee').value;
    var mgr = document.getElementById('ptoManager').value;
    var start = document.getElementById('ptoStart').value;
    var end = document.getElementById('ptoEnd').value;
    var type = document.getElementById('ptoType').value;
    var reason = document.getElementById('ptoReason').value;

    if (!emp) { alert('Please select your name.'); return; }
    if (!start || !end) { alert('Please select start and end dates.'); return; }
    if (new Date(end) < new Date(start)) { alert('End date must be after start date.'); return; }

    var req = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2,4),
      employee: emp,
      manager: mgr,
      start: start,
      end: end,
      days: bizDays(start, end),
      type: type,
      reason: reason,
      status: 'pending',
      submitted: new Date().toISOString(),
      decidedAt: null,
      decidedNote: ''
    };

    var reqs = getRequests();
    reqs.unshift(req);
    saveRequests(reqs);

    // Reset form
    document.getElementById('ptoStart').value = '';
    document.getElementById('ptoEnd').value = '';
    document.getElementById('ptoReason').value = '';
    document.getElementById('ptoType').selectedIndex = 0;

    // Send email notification to manager
    sendPtoEmail(req, 'request');

    showToast('✅ PTO request submitted! Email notification sent to ' + mgr + '.');
    renderMyRequests();
    renderApprovalQueue();
    renderCalendar();
    renderBalance();
  };

  // Status badge
  function statusBadge(s) {
    var colors = { pending: '#f59e0b', approved: '#22c55e', denied: '#ef4444' };
    var icons = { pending: '⏳', approved: '✅', denied: '❌' };
    return '<span style="display:inline-block;background:' + colors[s] + '22;color:' + colors[s] + ';padding:2px 8px;border-radius:4px;font-size:.75rem;font-weight:700;border:1px solid ' + colors[s] + '44;">' + icons[s] + ' ' + s.charAt(0).toUpperCase() + s.slice(1) + '</span>';
  }

  // Render employee's own requests
  function renderMyRequests() {
    var el = document.getElementById('ptoMyRequests');
    var emp = document.getElementById('ptoEmployee').value;
    if (!emp) { el.innerHTML = 'Select your name to see your requests.'; return; }

    var reqs = getRequests().filter(function(r) { return r.employee === emp; });
    if (!reqs.length) { el.innerHTML = '<p style="color:var(--text-light);">No PTO requests yet.</p>'; return; }

    var h = '<div style="display:flex;flex-direction:column;gap:.5rem;">';
    reqs.forEach(function(r) {
      h += '<div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:.75rem;">';
      h += '<div style="display:flex;justify-content:space-between;align-items:center;">';
      h += '<strong>' + r.type + '</strong> ' + statusBadge(r.status);
      h += '</div>';
      h += '<div style="font-size:.8rem;color:var(--text-light);margin-top:.25rem;">';
      h += r.start + ' to ' + r.end + ' (' + r.days + ' business day' + (r.days !== 1 ? 's' : '') + ')';
      h += '</div>';
      if (r.reason) h += '<div style="font-size:.8rem;margin-top:.25rem;">' + r.reason + '</div>';
      if (r.decidedNote) h += '<div style="font-size:.8rem;margin-top:.25rem;font-style:italic;color:' + (r.status === 'approved' ? '#22c55e' : '#ef4444') + ';">Manager note: ' + r.decidedNote + '</div>';
      h += '</div>';
    });
    h += '</div>';
    el.innerHTML = h;
  }
  window.renderMyRequests = renderMyRequests;

  // Render manager approval queue
  function renderApprovalQueue() {
    var el = document.getElementById('ptoApprovalQueue');
    var emp = document.getElementById('ptoEmployee').value;
    if (!emp) { el.innerHTML = 'Select your name to see if you have pending approvals.'; return; }

    var reqs = getRequests().filter(function(r) { return r.manager === emp && r.status === 'pending'; });
    if (!reqs.length) { el.innerHTML = '<p style="color:var(--text-light);">No pending approvals for you. 🎉</p>'; return; }

    var h = '<div style="display:flex;flex-direction:column;gap:.75rem;">';
    reqs.forEach(function(r) {
      h += '<div style="background:var(--bg);border:1px solid var(--warning);border-radius:8px;padding:1rem;">';
      h += '<div style="display:flex;justify-content:space-between;align-items:center;">';
      h += '<div><strong>' + r.employee + '</strong> requests <strong>' + r.type + '</strong></div>';
      h += statusBadge('pending');
      h += '</div>';
      h += '<div style="font-size:.85rem;margin:.5rem 0;">';
      h += '📅 ' + r.start + ' to ' + r.end + ' (' + r.days + ' business day' + (r.days !== 1 ? 's' : '') + ')';
      h += '</div>';
      if (r.reason) h += '<div style="font-size:.85rem;margin-bottom:.5rem;">📝 ' + r.reason + '</div>';
      h += '<div style="display:flex;gap:.5rem;align-items:center;">';
      h += '<input type="text" id="ptoNote_' + r.id + '" placeholder="Add a note (optional)" style="flex:1;padding:.4rem .6rem;border:1px solid var(--border);border-radius:4px;font-size:.8rem;">';
      h += '<button onclick="decidePto(\'' + r.id + '\',\'approved\')" style="background:#22c55e;color:#fff;border:none;padding:.4rem .8rem;border-radius:4px;font-size:.8rem;font-weight:700;cursor:pointer;">✅ Approve</button>';
      h += '<button onclick="decidePto(\'' + r.id + '\',\'denied\')" style="background:#ef4444;color:#fff;border:none;padding:.4rem .8rem;border-radius:4px;font-size:.8rem;font-weight:700;cursor:pointer;">❌ Deny</button>';
      h += '</div></div>';
    });
    h += '</div>';
    el.innerHTML = h;
  }
  window.renderApprovalQueue = renderApprovalQueue;

  // Approve or deny
  window.decidePto = function(id, decision) {
    var reqs = getRequests();
    var noteEl = document.getElementById('ptoNote_' + id);
    for (var i = 0; i < reqs.length; i++) {
      if (reqs[i].id === id) {
        reqs[i].status = decision;
        reqs[i].decidedAt = new Date().toISOString();
        reqs[i].decidedNote = noteEl ? noteEl.value : '';
        break;
      }
    }
    saveRequests(reqs);
    // Email the employee about the decision
    var theReq = getRequests().find(function(r) { return r.id === id; });
    if (theReq) sendPtoEmail(theReq, decision);

    showToast(decision === 'approved' ? '✅ PTO Approved!' : '❌ PTO Denied.');
    renderMyRequests();
    renderApprovalQueue();
    renderCalendar();
    renderBalance();
  };

  // EMAIL NOTIFICATIONS
  // Manager email lookup (add emails here as needed)
  var teamEmails = {
    "Rachel Scharett": "rachel@tigertracks.ai",
    "Riley Abercrombie": "riley@tigertracks.ai",
    "Hannah Price": "hannah@tigertracks.ai",
    "Charlotte Pohl": "charlotte@tigertracks.ai",
    "Shelby Nations": "shelby@tigertracks.ai",
    "Mary McCambridge": "mary@tigertracks.ai",
    "Will Sokol": "will@tigertracks.ai",
    "Elizabeth": "elizabeth@tigertracks.ai",
    "Elizabeth Abrams": "elizabeth@tigertracks.ai"
  };

  window.sendPtoEmail = function(req, type) {
    var siteUrl = 'https://eliz.cliffeliz.ai';
    var subject, body, toName, toEmail;

    if (type === 'request') {
      // Notify manager
      toName = req.manager;
      subject = '🏖️ PTO Request from ' + req.employee + ' (' + req.days + ' days)';
      body = 'Hi ' + toName + ',\n\n';
      body += req.employee + ' has submitted a PTO request:\n\n';
      body += 'Type: ' + req.type + '\n';
      body += 'Dates: ' + req.start + ' to ' + req.end + '\n';
      body += 'Business Days: ' + req.days + '\n';
      if (req.reason) body += 'Notes: ' + req.reason + '\n';
      body += '\nTo approve or deny, visit the Tiger Tracks PTO system:\n';
      body += siteUrl + '?pto_action=approved&pto_id=' + req.id + '  (Approve)\n';
      body += siteUrl + '?pto_action=denied&pto_id=' + req.id + '  (Deny)\n';
      body += '\nOr go to ' + siteUrl + ' > Request PTO > select your name to see the approval queue.\n';
      body += '\n- Tiger Tracks PTO System';
    } else {
      // Notify employee of decision
      toName = req.employee;
      var statusText = type === 'approved' ? 'APPROVED ✅' : 'DENIED ❌';
      subject = 'PTO ' + statusText + ': ' + req.start + ' to ' + req.end;
      body = 'Hi ' + toName + ',\n\n';
      body += 'Your PTO request has been ' + statusText + ' by ' + req.manager + '.\n\n';
      body += 'Type: ' + req.type + '\n';
      body += 'Dates: ' + req.start + ' to ' + req.end + '\n';
      body += 'Business Days: ' + req.days + '\n';
      if (req.decidedNote) body += 'Manager Note: ' + req.decidedNote + '\n';
      body += '\nView your requests at: ' + siteUrl + '\n';
      body += '\n- Tiger Tracks PTO System';
    }

    // Open mailto
    var mailto = 'mailto:' + (teamEmails[toName] || '') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.open(mailto, '_blank');
  };

  // PTO BALANCE TRACKER
  function renderBalance() {
    var el = document.getElementById('ptoBalance');
    var emp = document.getElementById('ptoEmployee').value;
    if (!emp) { el.innerHTML = 'Select your name to view balance.'; return; }

    var reqs = getRequests().filter(function(r) { return r.employee === emp; });
    var approved = reqs.filter(function(r) { return r.status === 'approved'; });
    var pending = reqs.filter(function(r) { return r.status === 'pending'; });

    // Get custom balance or default 15
    var balances = JSON.parse(localStorage.getItem('tt_pto_balances') || '{}');
    var annual = balances[emp] || 15;
    var usedDays = 0;
    var pendingDays = 0;

    approved.forEach(function(r) { usedDays += r.days; });
    pending.forEach(function(r) { pendingDays += r.days; });

    var remaining = annual - usedDays;
    var pct = Math.round((usedDays / annual) * 100);
    var barColor = remaining <= 2 ? '#ef4444' : remaining <= 5 ? '#f59e0b' : '#22c55e';

    var h = '';
    // Annual allowance editor
    h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;">';
    h += '<span style="font-size:.75rem;color:var(--text-light);">Annual Allowance:</span>';
    h += '<div style="display:flex;align-items:center;gap:.25rem;">';
    h += '<input type="number" id="ptoAnnual" value="' + annual + '" min="0" max="50" style="width:50px;padding:.25rem;border:1px solid var(--border);border-radius:4px;font-size:.8rem;text-align:center;" onchange="savePtoBalance()">';
    h += '<span style="font-size:.75rem;color:var(--text-light);">days</span>';
    h += '</div></div>';

    // Visual balance
    h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.5rem;text-align:center;margin-bottom:.75rem;">';
    h += '<div style="background:var(--bg);border-radius:8px;padding:.5rem;">';
    h += '<div style="font-size:1.5rem;font-weight:800;color:' + barColor + ';">' + remaining + '</div>';
    h += '<div style="font-size:.65rem;color:var(--text-light);text-transform:uppercase;">Remaining</div></div>';
    h += '<div style="background:var(--bg);border-radius:8px;padding:.5rem;">';
    h += '<div style="font-size:1.5rem;font-weight:800;color:var(--accent);">' + usedDays + '</div>';
    h += '<div style="font-size:.65rem;color:var(--text-light);text-transform:uppercase;">Used</div></div>';
    h += '<div style="background:var(--bg);border-radius:8px;padding:.5rem;">';
    h += '<div style="font-size:1.5rem;font-weight:800;color:#f59e0b;">' + pendingDays + '</div>';
    h += '<div style="font-size:.65rem;color:var(--text-light);text-transform:uppercase;">Pending</div></div>';
    h += '</div>';

    // Progress bar
    h += '<div style="background:var(--bg);border-radius:6px;height:10px;overflow:hidden;">';
    h += '<div style="height:100%;width:' + Math.min(pct, 100) + '%;background:' + barColor + ';border-radius:6px;transition:width .3s;"></div>';
    h += '</div>';
    h += '<div style="font-size:.7rem;color:var(--text-light);margin-top:.25rem;text-align:right;">' + pct + '% used</div>';

    if (remaining <= 2 && remaining >= 0) {
      h += '<div style="background:#ef444422;border:1px solid #ef4444;border-radius:6px;padding:.4rem .6rem;margin-top:.5rem;font-size:.75rem;color:#ef4444;font-weight:600;">⚠️ Low PTO balance! ' + remaining + ' day' + (remaining !== 1 ? 's' : '') + ' remaining.</div>';
    }

    el.innerHTML = h;
  }
  window.renderBalance = renderBalance;

  window.savePtoBalance = function() {
    var emp = document.getElementById('ptoEmployee').value;
    if (!emp) return;
    var val = parseInt(document.getElementById('ptoAnnual').value) || 15;
    var balances = JSON.parse(localStorage.getItem('tt_pto_balances') || '{}');
    balances[emp] = val;
    localStorage.setItem('tt_pto_balances', JSON.stringify(balances));
    renderBalance();
  };

  // Team PTO Calendar view
  function renderCalendar() {
    var el = document.getElementById('ptoCalendar');
    var reqs = getRequests().filter(function(r) { return r.status === 'approved'; });
    if (!reqs.length) { el.innerHTML = '<p style="color:var(--text-light);">No approved PTO to display yet.</p>'; return; }

    // Sort by start date
    reqs.sort(function(a,b) { return new Date(a.start) - new Date(b.start); });

    var h = '<table style="width:100%;border-collapse:collapse;">';
    h += '<tr style="background:var(--primary);color:#fff;"><th style="padding:.5rem;text-align:left;font-size:.8rem;">Employee</th><th style="padding:.5rem;text-align:left;font-size:.8rem;">Type</th><th style="padding:.5rem;text-align:left;font-size:.8rem;">Dates</th><th style="padding:.5rem;text-align:left;font-size:.8rem;">Days</th><th style="padding:.5rem;text-align:left;font-size:.8rem;">Status</th></tr>';
    reqs.forEach(function(r) {
      h += '<tr style="border-bottom:1px solid var(--border);">';
      h += '<td style="padding:.5rem;font-size:.85rem;font-weight:600;">' + r.employee + '</td>';
      h += '<td style="padding:.5rem;font-size:.85rem;">' + r.type + '</td>';
      h += '<td style="padding:.5rem;font-size:.85rem;">' + r.start + ' to ' + r.end + '</td>';
      h += '<td style="padding:.5rem;font-size:.85rem;">' + r.days + '</td>';
      h += '<td style="padding:.5rem;">' + statusBadge(r.status) + '</td>';
      h += '</tr>';
    });
    h += '</table>';
    el.innerHTML = h;
  }
  window.renderCalendar = renderCalendar;

  // Also show pending in calendar
  function renderCalendarAll() {
    var el = document.getElementById('ptoCalendar');
    var reqs = getRequests();
    if (!reqs.length) { el.innerHTML = '<p style="color:var(--text-light);">No PTO requests yet.</p>'; return; }

    reqs.sort(function(a,b) { return new Date(b.submitted) - new Date(a.submitted); });

    var h = '<table style="width:100%;border-collapse:collapse;">';
    h += '<tr style="background:var(--primary);color:#fff;"><th style="padding:.5rem;text-align:left;font-size:.8rem;">Employee</th><th style="padding:.5rem;text-align:left;font-size:.8rem;">Type</th><th style="padding:.5rem;text-align:left;font-size:.8rem;">Dates</th><th style="padding:.5rem;text-align:left;font-size:.8rem;">Days</th><th style="padding:.5rem;text-align:left;font-size:.8rem;">Status</th></tr>';
    reqs.forEach(function(r) {
      h += '<tr style="border-bottom:1px solid var(--border);">';
      h += '<td style="padding:.5rem;font-size:.85rem;font-weight:600;">' + r.employee + '</td>';
      h += '<td style="padding:.5rem;font-size:.85rem;">' + r.type + '</td>';
      h += '<td style="padding:.5rem;font-size:.85rem;">' + r.start + ' to ' + r.end + '</td>';
      h += '<td style="padding:.5rem;font-size:.85rem;">' + r.days + '</td>';
      h += '<td style="padding:.5rem;">' + statusBadge(r.status) + '</td>';
      h += '</tr>';
    });
    h += '</table>';
    el.innerHTML = h;
  }

  // Check for approval URL params
  var params = new URLSearchParams(window.location.search);
  if (params.get('pto_action') && params.get('pto_id')) {
    setTimeout(function() {
      navigateTo('pto-request');
      var action = params.get('pto_action');
      var id = params.get('pto_id');
      decidePto(id, action);
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }, 500);
  }

  // Initial render
  renderCalendarAll();
})();

  // ── Quiz initialization ──
// Initialize quizzes
try {
renderQuiz('quizGoogle', [
  {q:'What is Quality Score based on in Google Search?', opts:['Budget and bid amount','Expected CTR, ad relevance, and landing page experience','Number of keywords in the ad group','Account age and history'], a:1},
  {q:'What is the recommended number of responsive search ad headlines?', opts:['3','5','At least 10-15 unique headlines','Exactly 20'], a:2},
  {q:'What does Performance Max (PMax) optimize across?', opts:['Search only','Search and Shopping only','All Google channels (Search, Display, YouTube, Gmail, Maps, Discover)','Only YouTube and Display'], a:2},
  {q:'When should you use negative keywords?', opts:['Only at campaign launch','Never, Google handles this automatically','Continuously, through regular search term reviews','Only when CPA is above target'], a:2},
  {q:'What is the primary purpose of UTM parameters?', opts:['Improve Quality Score','Track campaign performance in Google Analytics','Increase click-through rate','Reduce cost per click'], a:1},
  {q:'In a Shopping campaign, what determines which products show?', opts:['Keywords you bid on','Product feed data and merchant center setup','Ad copy you write','Landing page content'], a:1},
  {q:'What naming convention element should always be included in campaign names?', opts:['Your initials','Platform, campaign type, target, and date','Only the client name','The budget amount'], a:1},
  {q:'What is the recommended approach for Demand Gen campaigns?', opts:['Text-only ads with broad match','Visual-first creative across YouTube, Discover, and Gmail','Search-only with exact match keywords','Display banners only'], a:1},
  {q:'How often should budget pacing be checked?', opts:['Weekly','Monthly','Daily','Only at month end'], a:2},
  {q:'What should you do when a campaign is significantly underspending?', opts:['Wait until end of month','Immediately double the budget','Investigate targeting, bids, and ad approval status, then adjust','Pause the campaign'], a:2}
]);

renderQuiz('quizMeta', [
  {q:'What is CAPI (Conversions API) and why is it important?', opts:['A bidding strategy for lower costs','Server-side tracking that supplements the Pixel for better data accuracy','A creative testing tool','An audience building feature'], a:1},
  {q:'What is the recommended minimum budget for a new Meta campaign in learning phase?', opts:['$5/day','$10/day','50 conversions per week worth of budget','$1000/day'], a:2},
  {q:'When should you use Advantage+ Shopping campaigns?', opts:['For lead generation only','For ecommerce/DTC brands to automate audience and placement optimization','Only for retargeting','Only when budget exceeds $10K/month'], a:1},
  {q:'What creative aspect ratio is recommended for Stories and Reels?', opts:['16:9 landscape','1:1 square','9:16 vertical','4:3 standard'], a:2},
  {q:'What is the "learning phase" in Meta Ads?', opts:['When the algorithm is testing your ad copy','The period where Meta optimizes delivery, needing ~50 conversions/week to exit','A 30-day mandatory waiting period','When you first create your Business Manager'], a:1},
  {q:'When should you pause or refresh Meta ads?', opts:['Every 24 hours','When frequency exceeds 3-4 and performance declines','Only when the client asks','After exactly 14 days regardless of performance'], a:1},
  {q:'What is the full-funnel approach in Meta advertising?', opts:['Running only bottom-funnel conversion campaigns','Awareness (reach/video) → Consideration (traffic/engagement) → Conversion campaigns working together','Only retargeting past visitors','Running one campaign with all objectives'], a:1},
  {q:'What should you check before launching a Meta campaign?', opts:['Only the budget','Pixel/CAPI firing, creative specs, audience size, budget, attribution window, and UTMs','Just the ad copy','Only that the landing page loads'], a:1},
  {q:'How do you handle creative fatigue on Meta?', opts:['Increase the budget','Rotate in new creative variations, test new formats (video, carousel, UGC)','Pause the entire campaign','Change the objective'], a:1},
  {q:'What is the recommended attribution window for most Meta campaigns?', opts:['1-day click only','28-day click','7-day click, 1-day view','30-day view'], a:2}
]);

renderQuiz('quizLinkedIn', [
  {q:'What makes LinkedIn Ads unique compared to other platforms?', opts:['Lowest CPCs in digital advertising','Professional targeting by job title, company, industry, and seniority','Best for B2C ecommerce','Largest audience reach globally'], a:1},
  {q:'What is the recommended minimum daily budget for LinkedIn campaigns?', opts:['$5/day','$10/day','$50-100/day minimum for meaningful data','$500/day'], a:2},
  {q:'What ad format typically drives the highest engagement on LinkedIn?', opts:['Text ads','Sponsored Content (single image and video)','Dynamic ads','Message ads (InMail)'], a:1},
  {q:'What is ABM (Account-Based Marketing) on LinkedIn?', opts:['Advertising to all LinkedIn users','Targeting specific companies and decision-makers with personalized campaigns','A type of bidding strategy','Automated budget management'], a:1},
  {q:'What is a good benchmark CTR for LinkedIn Sponsored Content?', opts:['5-10%','0.4-0.65%','2-3%','10%+'], a:1},
  {q:'When should you consider Microsoft Ads alongside LinkedIn?', opts:['Never, they are competitors','For B2B advertisers wanting to reach the same professional audience in search','Only for consumer products','Only when LinkedIn budget exceeds $50K'], a:1},
  {q:'What is Lead Gen Forms on LinkedIn?', opts:['A landing page builder','Pre-filled forms that capture leads without leaving LinkedIn, reducing friction','A CRM integration','An analytics dashboard'], a:1},
  {q:'How should you structure a full-funnel LinkedIn strategy?', opts:['Only run conversion campaigns','Awareness (brand awareness, video views) → Consideration (website visits, engagement) → Conversion (lead gen, website conversions)','Only run InMail campaigns','Run all objectives in one campaign'], a:1},
  {q:'What audience size is recommended for LinkedIn campaigns?', opts:['Under 1,000','1,000-5,000','50,000-500,000 for Sponsored Content','Over 10 million'], a:2},
  {q:'What is the recommended approach for LinkedIn creative?', opts:['Use the same creative as Meta and Google','Professional tone, clear value proposition, strong CTA, and test both image and video formats','Only use text ads','Always use stock photography'], a:1}
]);

renderQuiz('quizAsana', [
  {q:'What is the #1 rule for Asana task ownership at Tiger Tracks?', opts:['Tasks can have multiple assignees','One owner per task','The manager always owns the task','Tasks do not need owners'], a:1},
  {q:'How should you communicate task updates?', opts:['Send a Slack message','Update the task in Asana comments','Send an email','Wait for the weekly meeting'], a:1},
  {q:'How often should you check "My Tasks" in Asana?', opts:['Weekly','Monthly','Daily','Only when reminded'], a:2},
  {q:'What is the best way to create an Asana task from Slack?', opts:['Copy-paste the message into Asana manually','Hover over the message → More actions → Create a task','Send an email to Asana','You cannot create tasks from Slack'], a:1},
  {q:'When should you use subtasks in Asana?', opts:['Never','When a task has multiple steps or deliverables','For every single task','Only for client work'], a:1},
  {q:'What should every Asana task have?', opts:['Only a title','A title, assignee, due date, and project','Only an assignee','Just a description'], a:1},
  {q:'What is the correct Slack command to create an Asana task?', opts:['/task create','/asana create','/newtask','/create-asana'], a:1},
  {q:'What view should you use to see your tasks organized by due date?', opts:['Board view','Calendar view','List view sorted by due date','Timeline view'], a:2},
  {q:'What should you do when a Slack conversation turns into an action item?', opts:['Bookmark the Slack message','Create an Asana task immediately','Send a follow-up email','Add it to your personal notes'], a:1},
  {q:'When establishing team norms, what naming convention should projects follow?', opts:['Any name is fine','Client name + project type + date (consistent, descriptive)','Just the project number','Abbreviations only'], a:1}
]);

renderQuiz('quizSlack', [
  {q:'What is the correct channel naming prefix for client work?', opts:['#work-','#client-','#c-','#account-'], a:1},
  {q:'What is the expected response time for a DM during business hours?', opts:['Immediately','1-2 hours','End of week','24 hours'], a:1},
  {q:'When should you use threads in Slack?', opts:['Never','Only for long conversations','Always, to keep channels clean and scannable','Only in client channels'], a:2},
  {q:'What should you do instead of sending "Hi" and waiting for a reply?', opts:['Send "Hello" instead','Send your full question/context in one message','Call them','Send multiple short messages'], a:1},
  {q:'When is it appropriate to use @channel or @here?', opts:['Anytime you want visibility','Only for urgent, time-sensitive messages relevant to the group','For every announcement','Never'], a:1},
  {q:'How should you handle after-hours messages?', opts:['Send them immediately','Use Schedule Send to deliver during business hours','Wait and try to remember tomorrow','Send with an apology for the late message'], a:1},
  {q:'What should be pinned in every client channel?', opts:['Nothing','SOW, media plan, reporting links, and key contacts','Only the latest report','Team member introductions'], a:1},
  {q:'What is the recommended channel topic format for client channels?', opts:['Just the client name','Client Name | AM: [Name] | AS: [Name] | Tier: X','The client website URL','Meeting schedule'], a:1},
  {q:'What emoji reaction signals "I am looking into this"?', opts:['👍','✅','👀','❤️'], a:2},
  {q:'If something requires work and has a deadline, where should it go?', opts:['A Slack reminder','An Asana task','A pinned Slack message','A Google Doc'], a:1}
]);

renderQuiz('quizOtter', [
  {q:'What should you do immediately after an Otter-transcribed client call?', opts:['Delete the transcript','Review the auto-generated summary and check action items','Share the raw transcript with the client','Wait a week to review'], a:1},
  {q:'How should you name your Otter transcripts?', opts:['Leave the default name','[Client] - [Meeting Type] - [Date]','Just the date','The client email address'], a:1},
  {q:'What should you do with action items captured by Otter?', opts:['Leave them in Otter only','Create Asana tasks from them immediately','Email them to the team','Add them to a Google Doc'], a:1},
  {q:'Should you share raw, unreviewed transcripts externally?', opts:['Yes, always','Only with the client','No, always review for accuracy first','Only if the client asks'], a:2},
  {q:'What is the best way to connect Otter to your meetings?', opts:['Manually start it each time','Connect your Google Calendar for auto-join','Have someone else run it','Use it only for in-person meetings'], a:1},
  {q:'How should Otter transcripts feed into your client recap emails?', opts:['Copy-paste the entire transcript','Use the summary to draft an accurate recap','Do not use Otter for recaps','Send the Otter link to the client'], a:1},
  {q:'What should you inform participants about before recording?', opts:['Nothing, recording is automatic','That the meeting will be recorded for notes','That the transcript will be shared publicly','That AI is analyzing their tone'], a:1},
  {q:'Where should deliverables and action items ultimately be tracked?', opts:['In Otter only','In Slack','In Asana','In email'], a:2},
  {q:'How often should you archive old Otter transcripts?', opts:['Never','Monthly','Yearly','Only when storage is full'], a:1},
  {q:'What is the best use of Otter highlights during a call?', opts:['Highlight everything','Mark key decisions and commitments','Highlight only funny moments','Do not use highlights'], a:1}
]);

renderQuiz('quizNewHire', [
  {q:'What does CPA stand for?', opts:['Cost Per Action/Acquisition','Click Per Ad','Campaign Performance Average','Conversion Page Analysis'], a:0},
  {q:'How many accounts does a fully trained Account Coordinator typically support?', opts:['1-2','3-5','6-10','15-20'], a:2},
  {q:'What is the first Google certification required by Week 12?', opts:['Google Analytics','Google Ads Display','Google Ads Search','Google Tag Manager'], a:2},
  {q:'What is ROAS?', opts:['Rate of Ad Spending','Return on Ad Spend','Revenue of All Sales','Reach of Ad Sets'], a:1},
  {q:'What should you do immediately when you spot an error in a live campaign?', opts:['Wait for the weekly meeting','Flag it immediately to your manager/strategist','Try to fix it yourself without telling anyone','Send a Slack message to the client'], a:1},
  {q:'What is the purpose of a change log?', opts:['Track client complaints','Document what was changed, when, and why in campaigns','Log hours worked','Track competitor changes'], a:1},
  {q:'At Tiger Tracks, what tool is used for task management?', opts:['Trello','Monday.com','Asana','Jira'], a:2},
  {q:'What is the QA rework rate target for an Account Coordinator?', opts:['Less than 10%','Less than 5%','Less than 1%','Zero tolerance'], a:2},
  {q:'What does UTM stand for?', opts:['Universal Tracking Module','Urchin Tracking Module','User Traffic Measurement','Unified Tag Manager'], a:1},
  {q:'What is the typical timeline for AC to Account Strategist promotion?', opts:['1-2 months','3-4 months','6-12 months','2+ years'], a:2}
]);
} catch(e) { console.error('Quiz init error:', e); }

  // ── MFR auto-render on nav ──
  if (typeof window.navigateTo === 'function') {
    var _oldNav = window.navigateTo;
    window.navigateTo = function(id) { _oldNav(id); if (id === 'mfr-links') renderMfrLinks(); };
  }

  // ── Feedback dropdown population ──
  (function(){
    var names = Object.keys(orgChart).sort();
    var recipSel = document.getElementById('fbRecipient');
    var viewSel = document.getElementById('fbViewer');
    var senderSel = document.getElementById('fbSender');
    if (!recipSel || !viewSel || !senderSel) return;
    names.forEach(function(n){
      var p = orgChart[n];
      var label = n + (p.role ? ' (' + p.role + ')' : '');
      recipSel.innerHTML += '<option value="' + n + '">' + label + '</option>';
      viewSel.innerHTML += '<option value="' + n + '">' + label + '</option>';
      senderSel.innerHTML += '<option value="' + n + '">' + label + '</option>';
    });
  })();

} // end initAppScripts

window.initAppScripts = initAppScripts;
