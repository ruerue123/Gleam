# Bestsellers Feature Guide

## How to Set Up Bestsellers

The bestsellers feature allows you to select which products appear in the "Best Sellers" section on your homepage.

### Step 1: Access Admin Panel

1. Go to your website and log in as admin
2. Navigate to `/admin` (e.g., `http://localhost:5173/admin` or `https://gleam.co.zw/admin`)
3. Click on **"Bestsellers"** in the sidebar menu

### Step 2: Select Bestseller Products

1. You'll see a grid of all your products
2. Click on any product to mark it as a bestseller (a checkmark will appear)
3. Click again to unmark it
4. Select up to 6 products (the homepage displays 6 bestsellers)

### Step 3: Save Your Selection

1. Click the **"Save Bestsellers"** button at the top
2. Wait for the success message: "Bestsellers updated successfully!"
3. The page will refresh showing your updated selections

### Step 4: View on Homepage

1. Go to your homepage
2. Scroll down to see the "Best Sellers" section
3. Your selected products will be displayed in a horizontal scroll

## Important Notes

✅ **Homepage Behavior:**
- If NO products are marked as bestsellers, the section won't appear
- If products ARE marked, they'll show in a nice scrollable carousel
- Maximum of 6 products will be shown (you can adjust this in the code)

✅ **Selection Tips:**
- Choose your actual best-selling or most popular products
- Mix different scent families for variety
- Update regularly to keep the section fresh
- Products with good images look better in this section

## Testing Locally

To check which products are currently marked as bestsellers:

```bash
cd server
node testBestsellers.js
```

This will show:
- How many products are in the database
- Which products are marked as bestsellers
- What will appear on the homepage

## Troubleshooting

### Problem: Bestsellers Not Showing on Homepage

**Check:**
1. Are any products marked as bestsellers in admin?
2. Run `node testBestsellers.js` to verify
3. Check browser console for API errors

**Solution:**
1. Go to Admin → Bestsellers
2. Select at least one product
3. Click "Save Bestsellers"
4. Refresh the homepage

### Problem: Save Button Doesn't Work

**Check:**
1. Are you logged in as admin?
2. Is the backend server running?
3. Check browser console for errors

**Solution:**
1. Make sure you're authenticated
2. Check network tab for failed requests
3. Verify backend is accessible

### Problem: Products Not Appearing in Admin Bestsellers

**Check:**
1. Do you have products in the database?
2. Is the backend API responding?

**Solution:**
1. Add products first via Admin → Products
2. Check API is working: `http://localhost:5000/api/products`
3. Verify database connection

## API Endpoints

The bestsellers feature uses these API endpoints:

1. **Get all products:** `GET /api/products`
   - Used to populate the admin selection grid

2. **Get bestsellers:** `GET /api/products?isBestseller=true&limit=6`
   - Used by homepage to fetch bestseller products

3. **Update product:** `PUT /api/products/:id`
   - Used to mark/unmark products as bestsellers
   - Requires admin authentication

## Database Field

Products have an `isBestseller` boolean field:
- `true` = Product appears in bestsellers section
- `false` or `undefined` = Product doesn't appear

## Customization

Want to show more or fewer bestsellers?

**In BestSellers.jsx (line 19):**
```javascript
const response = await fetch(`${API_URL}/api/products?isBestseller=true&limit=6`);
```

Change `limit=6` to any number you want.

**In the CSS (for display):**
The cards are designed to scroll horizontally, so you can have as many as you want!

## Production Deployment

When deploying:
1. ✅ The bestsellers configuration is stored in the database
2. ✅ Selections will persist across deployments
3. ✅ Make sure to set bestsellers in production admin panel
4. ✅ Test on live site after deployment

## Summary

1. Go to Admin → Bestsellers
2. Click products to select (checkmark appears)
3. Click "Save Bestsellers"
4. View on homepage!

It's that simple! The section will automatically hide if no bestsellers are selected, and automatically appear when you set them.
