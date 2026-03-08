# LMS Deployment Guide

## Overview
We'll deploy:
- **Frontend** → Vercel (Free, automatic deployments)
- **Backend** → Render (Free tier available)
- **Database** → MongoDB Atlas (Already set up)

---

## Part 1: Deploy Backend to Render

### Step 1: Go to Render
1. Visit: https://render.com/
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"

### Step 2: Connect Repository
1. Select your GitHub repository: `Vidy-rathod/LMS`
2. Click "Connect"

### Step 3: Configure Service
Fill in these settings:

**Name:** `lms-backend` (or any name you like)

**Root Directory:** `backend`

**Environment:** `Node`

**Build Command:** `npm install`

**Start Command:** `npm start`

**Instance Type:** `Free`

### Step 4: Add Environment Variables
Click "Advanced" → "Add Environment Variable"

Add these variables (get values from your backend/.env file):
```
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=production
HUGGINGFACE_API_KEY=<your-huggingface-api-key>
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment
3. Copy your backend URL (e.g., `https://lms-backend.onrender.com`)

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Go to Vercel
1. Visit: https://vercel.com/
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"

### Step 2: Import Repository
1. Find your repository: `Vidy-rathod/LMS`
2. Click "Import"

### Step 3: Configure Project
**Framework Preset:** Vite

**Root Directory:** `frontend`

**Build Command:** `npm run build`

**Output Directory:** `dist`

**Install Command:** `npm install`

### Step 4: Add Environment Variable
Click "Environment Variables"

Add:
```
Name: VITE_API_URL
Value: https://lms-backend.onrender.com/api
```
(Replace with your actual Render backend URL)

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your site will be live at: `https://your-project.vercel.app`

---

## Part 3: Seed the Database

After backend is deployed:

1. Go to your Render backend URL
2. Add `/api/seed` to the URL
3. Visit: `https://lms-backend.onrender.com/api/seed`
4. Wait for "Seed completed" message

This will populate your database with:
- Test accounts
- 110+ videos
- 11 courses

---

## Part 4: Test Your Deployment

1. Visit your Vercel frontend URL
2. Click "Student Demo" or "Instructor Demo"
3. Test login with:
   - Student: student@example.com / password123
   - Instructor: instructor@example.com / password123

---

## Troubleshooting

### Backend Issues:
- Check Render logs for errors
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Ensure all environment variables are set

### Frontend Issues:
- Check Vercel deployment logs
- Verify `VITE_API_URL` points to correct backend URL
- Check browser console for errors

### Database Issues:
- Verify MongoDB connection string is correct
- Check MongoDB Atlas network access settings
- Run seed endpoint to populate data

---

## Update Deployment

When you make changes:

```bash
# 1. Make changes locally
# 2. Test locally
# 3. Commit and push
git add .
git commit -m "Your changes"
git push origin main

# 4. Automatic deployment!
# - Vercel redeploys frontend automatically
# - Render redeploys backend automatically
```

---

## Your Deployed URLs

After deployment, you'll have:

- **Frontend:** `https://your-project.vercel.app`
- **Backend:** `https://lms-backend.onrender.com`
- **Database:** MongoDB Atlas (already configured)

---

## Important Notes

1. **Free Tier Limitations:**
   - Render free tier: Backend sleeps after 15 min of inactivity
   - First request after sleep takes 30-60 seconds to wake up
   - Vercel free tier: Unlimited bandwidth for personal projects

2. **Security:**
   - Never commit `.env` files
   - Keep API keys secure
   - Use environment variables for all secrets

3. **MongoDB Atlas:**
   - Already configured with IP whitelist
   - Free tier: 512MB storage
   - Enough for development and testing

---

## Need Help?

If you encounter issues:
1. Check deployment logs on Render/Vercel
2. Verify environment variables
3. Test backend API endpoints directly
4. Check MongoDB Atlas connection

Your application is ready to deploy! 🚀
