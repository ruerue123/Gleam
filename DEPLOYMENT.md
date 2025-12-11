# Gleam Candles - Deployment Guide

This guide walks you through deploying your Gleam e-commerce application with:
- **Frontend (React + Vite)** → Vercel
- **Backend (Node.js + Express)** → Render
- **Database** → MongoDB Atlas (already set up ✅)

---

## Prerequisites

- [x] MongoDB Atlas database set up and running
- [ ] GitHub account
- [ ] Code pushed to GitHub repository
- [ ] Vercel account (https://vercel.com)
- [ ] Render account (https://render.com)

---

## Part 1: Deploy Backend to Render

### Step 1: Push Your Code to GitHub

If you haven't already pushed your code:

```bash
# Make sure you're in the root directory
cd /Users/his_forever_baby/Documents/GitHub/Gleam

# Add all files (make sure .env is in .gitignore!)
git add .

# Commit
git commit -m "Prepare backend for deployment"

# Push to GitHub
git push origin main
```

**IMPORTANT:** Make sure `.env` is in your `.gitignore` file! Never commit secrets.

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 3: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure the service:

   **Basic Settings:**
   - **Name:** `gleam-backend` (or any name you prefer)
   - **Region:** Choose closest to you (e.g., Oregon for US West)
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

   **Advanced Settings:**
   - **Instance Type:** Free (for testing) or Starter ($7/month for production)
   - **Auto-Deploy:** Yes (recommended)

### Step 4: Add Environment Variables

Click **"Environment"** and add these variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://gleam_admin:Crazie13@gleam.991xcdg.mongodb.net/gleam?retryWrites=true&w=majority&appName=gleam
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=https://your-vercel-app.vercel.app
```

**IMPORTANT:**
- Copy your MongoDB URI from your local `.env` file
- Change `JWT_SECRET` to a strong random string
- You'll update `FRONTEND_URL` after deploying to Vercel

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://gleam-backend.onrender.com`

### Step 6: Test Backend

Test your deployed backend:

```bash
# Health check
curl https://gleam-backend.onrender.com/api/health

# Get products
curl https://gleam-backend.onrender.com/api/products
```

### Step 7: Seed Database (Optional)

If you need to seed the database, you can run the seed script from the Render dashboard:

1. Go to your service → **"Shell"** tab
2. Run: `npm run seed`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend API URL

Create a `.env.production` file in your **root directory** (not in server folder):

```bash
VITE_API_URL=https://gleam-backend.onrender.com
```

This tells your frontend to use the Render backend in production.

### Step 2: Update Your Frontend Code

If you haven't already set up API calls with environment variables, you'll need to update your frontend code to use `import.meta.env.VITE_API_URL`.

For example, in your API calls:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Then use API_URL for all requests
fetch(`${API_URL}/api/products`)
```

### Step 3: Commit and Push Changes

```bash
git add .
git commit -m "Add production environment variables"
git push origin main
```

### Step 4: Deploy to Vercel

Since you already have Vercel set up:

1. Go to https://vercel.com/dashboard
2. Your project should auto-deploy when you push to GitHub
3. Or manually trigger a new deployment

**OR** deploy via CLI:

```bash
# Make sure you're in the root directory
cd /Users/his_forever_baby/Documents/GitHub/Gleam

# Deploy
vercel --prod
```

### Step 5: Get Your Vercel URL

After deployment, Vercel gives you a URL like:
- `https://gleam-candles.vercel.app`

### Step 6: Update Backend CORS

Go back to Render:

1. Go to your `gleam-backend` service
2. Click **"Environment"**
3. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://gleam-candles.vercel.app
   ```
4. Save changes (this will redeploy your backend)

---

## Part 3: Verify Everything Works

### Test the Full Stack

1. **Frontend:** Visit your Vercel URL
2. **Check Products:** Products should load from your backend
3. **Test API:** Open browser console and check network requests
4. **Test Features:**
   - Browse collections
   - View product details
   - Add to cart (when implemented)

---

## Important Notes

### Free Tier Limitations

**Render Free Tier:**
- ✅ Perfect for development/testing
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds
- 💡 Upgrade to Starter ($7/month) for always-on service

**Vercel Free Tier:**
- ✅ Great for production
- ✅ No spin-down
- ✅ Automatic HTTPS
- ✅ Global CDN

### Security Checklist

- [x] `.env` file is in `.gitignore`
- [ ] Changed `JWT_SECRET` to a strong random value
- [ ] MongoDB Atlas IP whitelist configured (0.0.0.0/0 for all, or specific IPs)
- [ ] CORS configured with your Vercel domain
- [ ] Environment variables set in Render dashboard

### Common Issues

**Issue:** "CORS Error" in browser console
**Fix:** Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly (no trailing slash)

**Issue:** Backend is slow on first request
**Fix:** This is normal on Render free tier (spin-down). Upgrade to paid tier or implement a keep-alive ping.

**Issue:** "Cannot connect to MongoDB"
**Fix:** Check MongoDB Atlas IP whitelist includes Render's IPs (or use 0.0.0.0/0)

**Issue:** Products not loading
**Fix:** Check browser console for API errors. Verify `VITE_API_URL` is set correctly.

---

## Environment Variables Summary

### Render (Backend)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Vercel (Frontend)
Add in Vercel dashboard under Settings → Environment Variables:
```
VITE_API_URL=https://gleam-backend.onrender.com
```

Or create `.env.production` file locally:
```
VITE_API_URL=https://gleam-backend.onrender.com
```

---

## Monitoring & Maintenance

### Check Backend Health

```bash
curl https://gleam-backend.onrender.com/api/health
```

### View Logs

**Render:**
- Go to your service → "Logs" tab

**Vercel:**
- Go to your deployment → "Logs" tab

### Update Code

1. Make changes locally
2. Commit and push to GitHub
3. Both Vercel and Render will auto-deploy

---

## Next Steps After Deployment

1. [ ] Test all features on production
2. [ ] Set up custom domain (optional)
3. [ ] Enable Stripe for payments
4. [ ] Set up email notifications
5. [ ] Monitor performance and errors
6. [ ] Consider upgrading to paid tiers for production use

---

## Support

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/

---

**Your Deployment URLs:**
- Frontend: `https://[your-app].vercel.app`
- Backend: `https://gleam-backend.onrender.com`
- Database: MongoDB Atlas (already configured ✅)

Happy deploying! 🚀
