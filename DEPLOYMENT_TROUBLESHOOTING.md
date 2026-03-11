# Deployment Troubleshooting - Invalid Credentials

## Quick Diagnosis Steps

### 1. Check if Database is Seeded

Visit your backend URL with `/api/seed` endpoint:
```
https://your-backend-url.onrender.com/api/seed
```

You should see: "Seed completed successfully"

If you get an error, check:
- MongoDB connection string is correct
- MongoDB Atlas IP whitelist includes `0.0.0.0/0`

### 2. Verify Environment Variables

**Backend (Render):**
Go to Render Dashboard → Your Service → Environment

Required variables:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=production
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

**Frontend (Vercel):**
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Required variable:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

⚠️ **Important:** After changing environment variables:
- Render: Redeploy the service
- Vercel: Redeploy the project

### 3. Test Backend API Directly

Open your browser and visit:
```
https://your-backend-url.onrender.com/api/auth/login
```

You should see a JSON response (even if it's an error, it means the backend is running).

### 4. Check Browser Console

1. Open your deployed frontend
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Try to login
5. Look for errors

Common errors:
- **CORS error**: Backend needs to allow your frontend domain
- **Network error**: Backend URL is wrong
- **401 Unauthorized**: Credentials are wrong or database not seeded

### 5. Check Network Tab

1. Open Developer Tools (F12)
2. Go to Network tab
3. Try to login
4. Look for the `/auth/login` request
5. Check:
   - Request URL (should point to your backend)
   - Status code (401 = wrong credentials, 500 = server error)
   - Response body (shows the error message)

## Common Solutions

### Solution 1: Reseed the Database

If you changed your MongoDB database or it's empty:

1. Visit: `https://your-backend-url.onrender.com/api/seed`
2. Wait for "Seed completed successfully"
3. Try logging in again with:
   - Student: `student@example.com` / `password123`
   - Instructor: `instructor@example.com` / `password123`

### Solution 2: Fix CORS Issues

If you see CORS errors in the console, add this to `backend/server.js`:

```javascript
const cors = require('cors');

// Add before routes
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

Then redeploy the backend.

### Solution 3: Update Frontend API URL

If the frontend can't reach the backend:

1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Update `VITE_API_URL` to your correct backend URL
4. Redeploy

### Solution 4: Check MongoDB Atlas

1. Go to MongoDB Atlas Dashboard
2. Click "Network Access" in left sidebar
3. Make sure `0.0.0.0/0` is in the IP whitelist
4. If not, click "Add IP Address" → "Allow Access from Anywhere"

### Solution 5: Verify JWT_SECRET

The JWT_SECRET must be the same across all deployments. If you changed it:

1. All existing tokens become invalid
2. Users need to login again
3. Make sure it's set in Render environment variables

## Test Credentials

After seeding, these accounts should work:

**Student Account:**
- Email: `student@example.com`
- Password: `password123`

**Instructor Account:**
- Email: `instructor@example.com`
- Password: `password123`

## Still Not Working?

### Check Render Logs

1. Go to Render Dashboard
2. Click your service
3. Click "Logs" tab
4. Look for errors when you try to login

Common log errors:
- `MongooseError`: Database connection issue
- `JsonWebTokenError`: JWT_SECRET not set
- `ValidationError`: Request data format issue

### Check Vercel Logs

1. Go to Vercel Dashboard
2. Click your project
3. Click "Deployments"
4. Click latest deployment
5. Check "Functions" tab for errors

## Manual Testing

Test the backend API with curl or Postman:

```bash
# Test login endpoint
curl -X POST https://your-backend-url.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}'
```

Expected response:
```json
{
  "_id": "...",
  "name": "Jane Student",
  "email": "student@example.com",
  "role": "student",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

If you get `{"message":"Invalid credentials"}`, the database is not seeded.

## Prevention Checklist

Before deploying:
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] All environment variables are set correctly
- [ ] Backend is deployed and running
- [ ] Frontend VITE_API_URL points to backend
- [ ] Database is seeded with test data
- [ ] CORS is configured for your frontend domain

## Need More Help?

1. Check Render service logs for backend errors
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Make sure database is seeded
5. Test backend API directly with curl/Postman
