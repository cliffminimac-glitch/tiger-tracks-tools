# index.html Patches

Two changes needed. Search and replace in the existing `index.html`.

---

## PATCH 1 — Fix meeting link URLs (2 lines)

### Weekly links (line ~994)
**Find:**
```js
var base=window.location.origin+'/weekly-form.html';
```
**Replace with:**
```js
var base=window.location.origin+'/?section=weekly';
```

### Monthly links (line ~1011 and ~1033)
**Find (both occurrences):**
```js
var base=window.location.origin+'/feedback-form.html';
```
**Replace with:**
```js
var base=window.location.origin+'/?section=monthly';
```

---

## PATCH 2 — Auto-navigate from direct meeting links

Add this block inside the `<script>` tag, right after the auto-login check block
(search for `// Auto-login check` and paste this immediately after the closing `}` of that block):

```js
// ── Auto-navigate from direct meeting links ──────────────────────
(function(){
  var params = new URLSearchParams(window.location.search);
  var section  = params.get('section');
  var employee = params.get('employee');
  var manager  = params.get('manager');
  var role     = params.get('role');
  var week     = params.get('week');
  var month    = params.get('month');

  if (!section || !employee) return;

  // Wait until auth check is complete and UI is ready
  function applyParams() {
    if (section === 'weekly') {
      showSection('sec-weekly');
      var empEl = document.getElementById('wkName');
      if (empEl) {
        empEl.value = employee;
        if (typeof wkNameChanged === 'function') wkNameChanged();
      }
      if (week) {
        var wkEl = document.getElementById('wkDate');
        if (wkEl) wkEl.value = week;
      }
      if (manager) {
        var mgEl = document.getElementById('wkManager');
        if (mgEl) mgEl.value = manager;
      }
      if (role) {
        var rlEl = document.getElementById('wkRole');
        if (rlEl) rlEl.value = role;
      }
      if (typeof loadWeeklyData === 'function') loadWeeklyData();
    } else if (section === 'monthly') {
      showSection('sec-monthly');
      var empEl2 = document.getElementById('moName');
      if (empEl2) {
        empEl2.value = employee;
        if (typeof moNameChanged === 'function') moNameChanged();
      }
      if (month) {
        var moEl = document.getElementById('moMonth');
        if (moEl) moEl.value = month;
      }
      if (manager) {
        var mgEl2 = document.getElementById('moManager');
        if (mgEl2) mgEl2.value = manager;
      }
      if (role) {
        var rlEl2 = document.getElementById('moRole');
        if (rlEl2) rlEl2.value = role;
      }
    }
  }

  // Delay slightly to let the auth gate and DOM settle
  setTimeout(applyParams, 400);
})();
```

---

## PATCH 3 — Update "Copy All Links" function (same two lines)

Search for all remaining occurrences of `/weekly-form.html` and `/feedback-form.html`
in the `copyAllLinks` function (lines ~1033 and ~1044) and apply the same replacement:

- `/weekly-form.html` → `/?section=weekly`
- `/feedback-form.html` → `/?section=monthly`

---

## PATCH 4 — Add favicon reference in `<head>` (optional but fixes the 404)

Add inside `<head>`, after the `<title>` tag:
```html
<link rel="icon" type="image/png" href="/favicon.png">
```
Then add a `favicon.png` file (Tiger Tracks logo, 32×32px) to the project root.
