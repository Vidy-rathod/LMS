# Vercel Deployment Guide

## Prerequisites
- GitHub account with your LMS repository
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas database (already configured)

## Step 1: Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Click "Import Git Repository"
4. Select your GitHub repository: `Vidy-rathod/LMS`
5. Click "Import"

## Step 2: Configure Project Settings

### Framework Preset
- Select: **Other** (or leave as detected)

### Root Directory
- Leave blank (use root directory)

### Build Settings
- Build Command: `cd frontend && npm install && npm run build`
- Output Directory: `frontend/dist`
- Install Command: `npm install`

## Step 3: Add Environment Variables

Click on "Environment Variables" and add these:

### Required Variables:

**MONGODB_URI**
```
your_mongodb_atlas_connection_string
```

**JWT_SECRET**
```
your_secure_jwt_secret_key
```

**HUGGINGFACE_API_KEY**
```
your_huggingface_api_key_here
```

**NODE_ENV**
```
production
```

## Step 4: Deploy

1. Click "Deploy" button
2. Wait 2-3 minutes for deployment to complete
3. You'll get a URL like: `https://your-project.vercel.app`

## Step 5: Seed the Database

After deployment is successful:

1. Visit: `https://your-project.vercel.app/api/seed`
2. Wait for the success message
3. This will create:
   - 11 courses with 110 videos
   - Test student account: student@example.com / password123
   - Test instructor account: instructor@example.com / password123

## Step 6: Test Your Application

1. Visit your Vercel URL
2. Click "Student Demo" or "Instructor Demo" to quick login
3. Or login with the test credentials above
4. Browse courses and watch videos
5. Test the AI chatbot

## Troubleshooting

### If deployment fails:
- Check the build logs in Vercel dashboard
- Verify all environment variables are set correctly
- Make sure MongoDB Atlas IP whitelist includes `0.0.0.0/0`

### If API calls fail:
- Check that environment variables are set
- Visit `/api` endpoint to verify backend is running
- Check browser console for errors

### If database is empty:
- Visit `/api/seed` to populate the database
- Check MongoDB Atlas connection string

## Updating Your Deployment

To update your deployed app:

1. Make changes to your code locally
2. Commit changes: `git add . && git commit -m "your message"`
3. Push to GitHub: `git push origin main`
4. Vercel will automatically redeploy (takes 2-3 minutes)

## Custom Domain (Optional)

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Support

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- GitHub Repository: https://github.com/Vidy-rathod/LMS
