# TT Check-Ins — Deployment Guide

This folder contains everything needed to make the app fully functional.
Hand to dev — estimated implementation time: **2–4 hours**.

---

## Step 1 — Add these files to the project repo

Copy into the project root:
```
vercel.json              ← fixes direct URL routing (critical)
package.json             ← adds required npm packages
api/
  feedback/
    index.js             ← GET + POST /api/feedback
    release.js           ← POST /api/feedback/release
  send-reminders.js      ← POST /api/send-reminders
```

Apply patches from `index-html-patches.md` to the existing `index.html`.

---

## Step 2 — Set up Vercel KV (data storage)

1. Go to **Vercel Dashboard** → your `tt-checkins` project
2. Click **Storage** tab → **Create Database** → choose **KV**
3. Name it `tt-checkins-kv` → click Create
4. Click **Connect to Project** → select `tt-checkins`
5. Vercel will auto-inject these env vars:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

   No manual config needed — `@vercel/kv` picks them up automatically.

---

## Step 3 — Set up Resend (email reminders)

1. Create account at **resend.com** (free: 3,000 emails/month)
2. Add and verify domain: `tigertracks.ai`
   - Resend gives you DNS records to add (takes ~5 min in your DNS provider)
3. Create an API key → copy it
4. In **Vercel Dashboard** → your project → **Settings** → **Environment Variables**, add:
   - `RESEND_API_KEY` = (your key)
   - `RESEND_FROM_EMAIL` = `Tiger Tracks Check-Ins <checkins@tigertracks.ai>`

---

## Step 4 — Install dependencies & redeploy

```bash
npm install
git add -A
git commit -m "feat: add backend API, fix routing, fix meeting links"
git push
```

Vercel auto-deploys on push.

---

## Step 5 — Verify (smoke test)

After deploy, test these manually:

```bash
# Should return [] (empty array, not 404)
curl https://tt-checkins.vercel.app/api/feedback

# Should redirect to login screen (not Vercel 404 error)
# Open in browser:
https://tt-checkins.vercel.app/weekly-sync
https://tt-checkins.vercel.app/dashboard

# Test a meeting link (should open app and pre-fill the form after login)
https://tt-checkins.vercel.app/?section=weekly&employee=Riley%20Abercrombie&manager=Rachel%20Scharett&role=AD&week=Mar%2011%2C%202026
```

---

## Environment Variables Summary

| Variable | Where to get it | Required |
|---|---|---|
| `KV_URL` | Auto-set by Vercel KV | Yes |
| `KV_REST_API_URL` | Auto-set by Vercel KV | Yes |
| `KV_REST_API_TOKEN` | Auto-set by Vercel KV | Yes |
| `RESEND_API_KEY` | resend.com → API Keys | Yes (for email) |
| `RESEND_FROM_EMAIL` | Set manually | Recommended |

---

## What this unlocks

| Feature | Before | After |
|---|---|---|
| Direct URL navigation | 🔴 Vercel 404 error | ✅ Redirects to login |
| Save weekly check-in | 🔴 Silent fail (404) | ✅ Saves to KV |
| Load saved check-in | 🔴 Silent fail (404) | ✅ Auto-populates form |
| Save monthly feedback | 🔴 Silent fail (404) | ✅ Saves to KV |
| Release manager notes | 🔴 Silent fail (404) | ✅ Works |
| Meeting links (Active Links page) | 🔴 Both URLs 404 | ✅ Opens correct form |
| Email reminders | 🔴 Silent fail (404) | ✅ Sends via Resend |
| Submissions history | 🔴 Empty / fails | ✅ Shows all records |
