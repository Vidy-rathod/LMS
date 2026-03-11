# Correct Vercel Deployment Setup

## The Problem
You're getting 404 because you're trying to deploy both frontend and backend in one Vercel project. Vercel works best with separate deployments.

## Solution: Deploy Backend and Frontend Separately

### Option 1: Two Separate Vercel Projects (Recommended)

#### Step 1: Deploy Backend Only
1. Go to https://vercel.com/new
2. Import your repository
3. **Root Directory:** Leave empty (use root)
4. **Framework Preset:** Other
5. Click "Deploy"
6. Copy the backend URL (e.g., `https://lms-backend.vercel.app`)

#### Step 2: Deploy Frontend Only
1. Go to https://vercel.com/new again
2. Import the SAME repository
3. **Root Directory:** `frontend`
4. **Framework Preset:** Vite
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`
7. **Environment Variables:**
   - Add: `VITE_API_URL` = `https://lms-backend.vercel.app/api`
8. Click "Deploy"

---

### Option 2: Keep Current Setup (Simpler)

Since you already have one deployment, let's make it work as backend-only:

#### Step 1: Update vercel.json (Already Done)
The vercel.json is now configured for backend only.

#### Step 2: Commit and Push
```bash
git add vercel.json
git commit -m "Configure Vercel for backend only"
git push origin main
```

#### Step 3: Wait for Redeploy
Vercel will automatically redeploy (2-3 minutes)

#### Step 4: Test Backend
Visit: `https://your-vercel-url.vercel.app/api`

You should see:
```json
{
  "message": "LMS API is running",
  "mongodb": "connected"
}
```

#### Step 5: Deploy Frontend Separately
1. Go to https://vercel.com/new
2. Import your repository again
3. **Root Directory:** `frontend`
4. **Framework Preset:** Vite
5. Add environment variable:
   - `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
6. Deploy

---

## Quick Fix: Use Current Deployment as Backend

If you want to use your current deployment as the backend:

### 1. Make sure vercel.json is updated (done above)

### 2. Push changes:
```bash
git add vercel.json
git commit -m "Fix Vercel routing for backend"
git push origin main
```

### 3. After deployment, test:
```
https://your-current-url.vercel.app/api
```

### 4. Deploy frontend separately:
- Create NEW Vercel project
- Point to `frontend` folder
- Set `VITE_API_URL` to your backend URL

---

## What URLs Should You Have?

After correct setup:
- **Backend:** `https://lms-backend-xyz.vercel.app/api`
- **Frontend:** `https://lms-frontend-xyz.vercel.app`

---

## Testing Checklist

Backend deployment:
- [ ] Visit `/api` - should show API running message
- [ ] Visit `/api/seed` - should seed database
- [ ] Visit `/api/auth/login` - should show method not allowed (needs POST)

Frontend deployment:
- [ ] Should load the landing page
- [ ] Login should work
- [ ] Should see courses after login

---

## Current Status

I've updated your vercel.json to work as backend-only. Now:

1. Push the changes
2. Wait for Vercel to redeploy
3. Test the backend URL
4. Then deploy frontend separately

Let me know when you've pushed and I'll help with the next steps!
