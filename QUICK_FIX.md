# Quick Fix for "Invalid Credentials" After Deployment

## Most Likely Cause: Database Not Seeded

The deployed database is empty and doesn't have the test user accounts.

## Immediate Solution

### Step 1: Seed Your Production Database

Visit this URL in your browser (replace with your actual backend URL):

```
https://your-backend-url.onrender.com/api/seed
```

Wait for the response: `"Seed completed successfully"`

### Step 2: Try Logging In Again

Use these credentials:

**Student Account:**
- Email: `student@example.com`
- Password: `password123`

**Instructor Account:**
- Email: `instructor@example.com`
- Password: `password123`

---

## If That Doesn't Work

### Check 1: Is Your Backend Running?

Visit: `https://your-backend-url.onrender.com/`

You should see: `{"message":"LMS API is running"}`

If you see an error or nothing loads:
- Check Render dashboard for deployment errors
- Verify environment variables are set

### Check 2: Is Frontend Connecting to Backend?

1. Open your deployed frontend
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Look for the API URL being used

It should show: `https://your-backend-url.onrender.com/api`

If it shows `http://localhost:5000/api`:
- Go to Vercel Dashboard
- Settings → Environment Variables
- Add/Update: `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
- Redeploy

### Check 3: MongoDB Connection

If seeding fails, check MongoDB Atlas:

1. Go to https://cloud.mongodb.com/
2. Click "Network Access" (left sidebar)
3. Make sure `0.0.0.0/0` is in the IP Access List
4. If not, click "Add IP Address" → "Allow Access from Anywhere"

---

## Common Deployment Mistakes

### ❌ Mistake 1: Forgot to Seed Database
**Solution:** Visit `/api/seed` endpoint

### ❌ Mistake 2: Wrong API URL in Frontend
**Solution:** Set `VITE_API_URL` in Vercel environment variables

### ❌ Mistake 3: MongoDB IP Whitelist
**Solution:** Add `0.0.0.0/0` to MongoDB Atlas Network Access

### ❌ Mistake 4: Missing Environment Variables
**Solution:** Check all required variables are set in Render

### ❌ Mistake 5: Backend Not Deployed
**Solution:** Check Render dashboard for deployment status

---

## Verification Steps

Run these checks in order:

1. ✅ Backend health check: `https://your-backend-url.onrender.com/`
2. ✅ Seed database: `https://your-backend-url.onrender.com/api/seed`
3. ✅ Test login API directly:
   ```bash
   curl -X POST https://your-backend-url.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"student@example.com","password":"password123"}'
   ```
4. ✅ Check frontend console for errors (F12)
5. ✅ Try logging in through the UI

---

## Still Getting "Invalid Credentials"?

### Debug with Browser Console

1. Open your deployed frontend
2. Press F12
3. Go to Network tab
4. Try to login
5. Click on the `login` request
6. Check the Response tab

**If you see:**
- `"Invalid credentials"` → Database not seeded or wrong password
- `CORS error` → Backend CORS issue (unlikely with current setup)
- `Network error` → Frontend can't reach backend (wrong API URL)
- `500 error` → Backend server error (check Render logs)

### Check Render Logs

1. Go to Render Dashboard
2. Click your backend service
3. Click "Logs" tab
4. Try to login from frontend
5. Watch for errors in real-time

Look for:
- `MongooseError` → Database connection issue
- `JsonWebTokenError` → JWT_SECRET not set
- `ValidationError` → Request format issue

---

## Emergency Reset

If nothing works, try this complete reset:

### 1. Clear and Reseed Database

In MongoDB Atlas:
1. Go to Collections
2. Delete all collections
3. Visit `/api/seed` endpoint again

### 2. Verify All Environment Variables

**Render (Backend):**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms
JWT_SECRET=your_secret_key_here
NODE_ENV=production
HUGGINGFACE_API_KEY=your_key_here
```

**Vercel (Frontend):**
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### 3. Redeploy Both Services

- Render: Click "Manual Deploy" → "Deploy latest commit"
- Vercel: Go to Deployments → Click "Redeploy"

### 4. Wait for Deployments

- Render: 3-5 minutes
- Vercel: 1-2 minutes

### 5. Seed Again

Visit: `https://your-backend-url.onrender.com/api/seed`

### 6. Test Login

Use: `student@example.com` / `password123`

---

## Success Indicators

You'll know it's working when:
- ✅ `/api/seed` returns "Seed completed successfully"
- ✅ Login redirects you to dashboard
- ✅ You see courses on the dashboard
- ✅ No errors in browser console

---

## Get Your Deployment URLs

**Find Backend URL (Render):**
1. Go to Render Dashboard
2. Click your service
3. Copy the URL at the top (e.g., `https://lms-backend-xyz.onrender.com`)

**Find Frontend URL (Vercel):**
1. Go to Vercel Dashboard
2. Click your project
3. Copy the URL (e.g., `https://your-project.vercel.app`)

---

## Contact Points

If you're still stuck, provide these details:
1. Backend URL
2. Frontend URL
3. Error message from browser console
4. Error message from Render logs
5. Screenshot of the error
