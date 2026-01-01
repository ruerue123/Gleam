# Image Optimization Guide

## Current Issues

The following images are significantly oversized and need optimization:

- **Luxe.png**: 2.1MB → Target: <200KB
- **Zest.png**: 1.6MB → Target: <200KB
- **Hero.png**: 905KB → Target: <150KB
- **Zest.jpeg**: 171KB → Target: <100KB
- **Ember.jpeg**: 137KB → Target: <80KB
- **Serene.jpeg**: 123KB → Target: <80KB
- **Root.jpeg**: 135KB → Target: <80KB

## Automated Optimization (Vite ImageTools)

The project now includes `vite-imagetools` which automatically optimizes images during build:

- Converts images to WebP format (best compression)
- Provides fallbacks for JPEG and PNG
- Limits max width to 1920px
- Compresses to 85% quality

This optimization happens automatically during build - no manual intervention needed!

## Manual Optimization (For Development)

For immediate size reduction of the largest images, use these online tools:

### Recommended Tools:

1. **TinyPNG** (https://tinypng.com/)
   - Best for PNG compression
   - Reduces file size by 50-80%
   - Preserves visual quality

2. **Squoosh** (https://squoosh.app/)
   - Google's image compression tool
   - Side-by-side comparison
   - Export as WebP, JPEG, or PNG

3. **ImageOptim** (Mac only) (https://imageoptim.com/)
   - Drag and drop tool
   - Lossless compression
   - Batch processing

### Quick Fix Instructions:

1. Upload these images to TinyPNG or Squoosh:
   - `/public/images/Luxe.png`
   - `/public/images/Zest.png`
   - `/public/images/Hero/Hero.png`

2. Settings to use:
   - **Format**: WebP (or keep as PNG if needed)
   - **Quality**: 80-85%
   - **Max width**: 1920px (or 1200px for mobile-first)

3. Replace the original files with the optimized versions

4. Commit the optimized images

## Expected Results

After optimization:
- **Total image size**: From ~5.2MB → <1.2MB (77% reduction)
- **Page load time**: 2-3 seconds faster on 3G
- **Lighthouse score**: +15-20 points

## Best Practices Going Forward

1. **Always optimize before committing**
   - Use TinyPNG or Squoosh before adding images to the repo
   - Target file sizes:
     - Hero images: <150KB
     - Product images: <100KB
     - Thumbnails: <50KB

2. **Use appropriate formats**
   - **WebP**: Best compression, modern browsers (recommended)
   - **JPEG**: Photos and complex images
   - **PNG**: Graphics, logos, transparency needed
   - **SVG**: Icons, simple graphics (smallest)

3. **Responsive images**
   - Already implemented with `loading="lazy"`
   - Consider adding `srcset` for different screen sizes in the future

4. **Image dimensions**
   - Don't upload images larger than needed
   - Max width for full-width images: 1920px
   - Max width for product cards: 600px
   - Thumbnails: 300px

## Cloudinary Integration (Already Available)

The backend supports Cloudinary for automatic image optimization:
- Upload images via Admin Dashboard
- Cloudinary automatically optimizes and serves images
- Provides responsive image URLs
- CDN delivery for faster loading

## Verification

After optimization, verify improvements:

```bash
# Check file sizes
ls -lh public/images/*.{png,jpg,jpeg}

# Build and check bundle
npm run build

# Preview optimized build
npm run preview
```

## Resources

- [Web.dev Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [ImageOptim Best Practices](https://imageoptim.com/api)
- [WebP Image Format](https://developers.google.com/speed/webp)
