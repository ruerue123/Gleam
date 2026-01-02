# Production Deployment Checklist

## Pre-Deployment Checklist

### 1. Code Quality
- [x] All features tested locally
- [x] No console errors or warnings
- [x] Code builds successfully (`npm run build`)
- [x] All TypeScript/ESLint errors resolved
- [x] No hardcoded API URLs (using environment variables)

### 2. Performance
- [x] Bundle size optimized (213KB main bundle, gzipped: 64KB)
- [x] Code splitting implemented (vendor, animations chunks)
- [x] Images lazy loaded
- [x] Fonts optimized with preconnect and async loading
- [ ] Large images compressed (Luxe.png: 2.1MB, Zest.png: 1.6MB, Hero.png: 905KB)
  - Follow [IMAGE_OPTIMIZATION.md](IMAGE_OPTIMIZATION.md) guide

### 3. Security
- [x] No API keys or secrets in frontend code
- [x] Environment variables properly configured
- [x] Authentication working (JWT tokens)
- [x] Admin routes protected
- [x] CORS configured correctly in backend

### 4. Functionality
- [x] All pages load correctly
- [x] Navigation works (navbar, footer, routing)
- [x] Search functionality works
- [x] Product filters work (with reset button)
- [x] Cart is user-specific
- [x] Favourites are user-specific
- [x] Orders are user-specific
- [x] WhatsApp checkout integration works
- [x] Admin dashboard shows correct stats
- [x] Modal components accessible

### 5. Responsive Design
- [x] Mobile view (320px - 768px)
- [x] Tablet view (768px - 1024px)
- [x] Desktop view (1024px+)
- [x] No horizontal scroll
- [x] All text readable on all devices
- [x] Images display correctly on all devices

### 6. Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment Steps

### Option 1: Automatic Deployment (Vercel - Recommended)

Vercel is already configured and will auto-deploy on push to `main`:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Verify Deployment:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Check deployment status
   - Click on the deployment to see logs
   - Test the live URL: https://gleam.co.zw

3. **Monitor Deployment:**
   - Check build logs for errors
   - Verify all environment variables are set
   - Test critical paths (login, checkout, admin)

### Option 2: Manual Deployment

If you need to deploy manually:

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Test build locally:**
   ```bash
   npm run preview
   ```
   Opens at http://localhost:4173

3. **Deploy dist folder** to your hosting provider

## Environment Variables

Ensure these are set in Vercel/production:

### Frontend (Vercel)
- `VITE_API_URL` - Backend API URL (e.g., https://api.gleam.co.zw)

### Backend (Your backend hosting)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `FRONTEND_URL` - Frontend URL for CORS
- `PORT` - Server port (default: 5000)

## Post-Deployment Verification

### Automated Checks (30 seconds)
1. **Homepage loads** - https://gleam.co.zw
2. **Products page loads** - https://gleam.co.zw/products
3. **Search works** - Try searching for "candle"
4. **Filter works** - Try filtering by scent
5. **Reset filter appears** - Select a filter, verify reset button shows

### Manual Testing (5 minutes)
1. **User Flow:**
   - [ ] Register new account
   - [ ] Login with account
   - [ ] Add product to cart
   - [ ] Add product to favourites
   - [ ] View cart (user-specific)
   - [ ] View favourites (user-specific)
   - [ ] Checkout via WhatsApp
   - [ ] View orders page

2. **Admin Flow:**
   - [ ] Login as admin
   - [ ] View dashboard stats
   - [ ] Check product count matches
   - [ ] Check order count matches
   - [ ] View orders list
   - [ ] Update order status

3. **Mobile Testing:**
   - [ ] Test on actual mobile device
   - [ ] Hamburger menu works
   - [ ] Search overlay works
   - [ ] Filters work on mobile
   - [ ] Checkout flow works

## Performance Verification

### Lighthouse Audit
Run Lighthouse in Chrome DevTools:

**Expected Scores:**
- Performance: 85-95 (A-)
- Accessibility: 95-100 (A+)
- Best Practices: 90-100 (A)
- SEO: 90-100 (A)

**To Run:**
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Mobile" or "Desktop"
4. Click "Analyze page load"

### Bundle Size Check
```bash
npm run build
```

**Current Sizes:**
- Main bundle: 213KB (64KB gzipped) ✅
- Vendor chunk: 45KB (16KB gzipped) ✅
- Animations chunk: 116KB (38KB gzipped) ✅

### Image Size Check
**After manual optimization (pending):**
- Luxe.png: ~200KB (currently 2.1MB) ⚠️
- Zest.png: ~200KB (currently 1.6MB) ⚠️
- Hero.png: ~150KB (currently 905KB) ⚠️

## Rollback Plan

If deployment fails or has critical issues:

1. **Immediate Rollback (Vercel):**
   - Go to Vercel Dashboard
   - Select your project
   - Go to "Deployments"
   - Find the last working deployment
   - Click "..." → "Promote to Production"

2. **Git Rollback:**
   ```bash
   # Find the last working commit
   git log --oneline

   # Revert to that commit
   git revert HEAD
   git push origin main
   ```

## Monitoring

### Check These Regularly:
1. **Vercel Dashboard** - Deployment status, errors
2. **Browser Console** - JavaScript errors
3. **Network Tab** - Failed API requests
4. **User Reports** - Bug reports, feedback

### Common Issues:

#### Issue: API calls failing
**Solution:** Check VITE_API_URL is correct in Vercel environment variables

#### Issue: Images not loading
**Solution:** Check Cloudinary credentials and image URLs

#### Issue: Admin dashboard empty
**Solution:** Verify backend is running and JWT token is valid

#### Issue: Slow performance
**Solution:**
- Compress large images (see IMAGE_OPTIMIZATION.md)
- Check bundle size hasn't increased
- Verify CDN is working for assets

## Success Criteria

Deployment is successful when:
- [x] Site loads at https://gleam.co.zw
- [x] All pages render correctly
- [x] Cart/favourites are user-specific
- [x] Orders sync with admin dashboard
- [x] Search and filters work
- [ ] No console errors
- [ ] Lighthouse score > 85
- [ ] All critical user flows work

## Latest Deployment

**Date:** 2026-01-01
**Commit:** `f4ca6a6` - Add reset filters button to product filters
**Status:** ✅ Deployed
**URL:** https://gleam.co.zw

### Recent Changes:
- ✅ Reset filters button added
- ✅ Performance optimizations (bundle splitting, resource hints)
- ✅ Search functionality
- ✅ Product reviews component
- ✅ API caching with useFetch hook
- ✅ Image lazy loading
- ✅ Code splitting with React.lazy
- ✅ Accessible modals
- ✅ Design system tokens

### Known Issues:
- [ ] Large images still need manual compression (pending)
- [ ] Web vitals monitoring disabled (web-vitals package not installed)

### Next Steps:
1. Manually optimize large images using IMAGE_OPTIMIZATION.md guide
2. Test on production URL
3. Run Lighthouse audit
4. Monitor for errors
