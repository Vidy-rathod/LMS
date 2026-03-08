# Vercel Deployment Checklist

## ✅ Code is Ready
All files have been fixed and pushed to GitHub: https://github.com/Vidy-rathod/LMS

## 📋 Deployment Steps

### 1. Go to Vercel
- Visit: https://vercel.com/dashboard
- Login with your account

### 2. Import Project
- Click "Add New..." → "Project"
- Click "Import Git Repository"
- Select: **Vidy-rathod/LMS**
- Click "Import"

### 3. Configure Build Settings
Leave default settings or verify:
- Framework Preset: **Other**
- Root Directory: (leave blank)
- Build Command: Auto-detected
- Output Directory: Auto-detected

### 4. Add Environment Variables

Click "Environment Variables" and add these 4 variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `lms-secret-key-2024-secure-production` |
| `HUGGINGFACE_API_KEY` | Your Hugging Face API key |
| `NODE_ENV` | `production` |

**Note:** Use your actual MongoDB URI and Hugging Face API key from your .env files.

### 5. Deploy
- Click "Deploy" button
- Wait 2-3 minutes for build to complete

### 6. Seed Database
After deployment succeeds:
- Copy your Vercel URL (e.g., `https://your-project.vercel.app`)
- Visit: `https://your-project.vercel.app/api/seed`
- Wait for success message

### 7. Test Application
- Visit: `https://your-project.vercel.app`
- Click "Student Demo" or "Instructor Demo"
- Or login with:
  - Student: `student@example.com` / `password123`
  - Instructor: `instructor@example.com` / `password123`

## 🎉 Success Indicators

✅ Deployment shows "Ready" status in Vercel
✅ Visiting `/api` shows: `{"message": "LMS API is running"}`
✅ Visiting `/api/seed` shows success message
✅ Login page loads correctly
✅ Can login with test accounts
✅ Courses are visible
✅ Videos play correctly
✅ AI chatbot responds

## 🔧 If Something Goes Wrong

### Build Fails
- Check build logs in Vercel
- Verify all files are pushed to GitHub
- Check for syntax errors

### API Not Working
- Verify environment variables are set
- Check MongoDB Atlas IP whitelist (should include `0.0.0.0/0`)
- Visit `/api` to test backend

### Database Empty
- Visit `/api/seed` to populate database
- Check MongoDB connection string

### Frontend Not Loading
- Check if build completed successfully
- Verify `frontend/dist` was created
- Check browser console for errors

## 📝 Notes

- Vercel auto-deploys when you push to GitHub
- Environment variables persist across deployments
- You can view logs in Vercel dashboard
- Custom domain can be added in Settings → Domains

## 🔗 Important Links

- GitHub Repo: https://github.com/Vidy-rathod/LMS
- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- Detailed Guide: See VERCEL_DEPLOYMENT.md
