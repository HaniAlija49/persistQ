# Public Assets for PersistQ SEO

## Current Files
- ✅ logo-full.png
- ✅ logo-small.png
- ✅ logo-text.png

## Required Files for SEO (Missing)

Our SEO implementation references these specific filenames. You need to create or rename your logos to match:

### 1. logo.png
**Used in**: JSON-LD structured data (Schema.org)
**Purpose**: Search engines use this to identify your brand
**Recommended**: Use `logo-full.png` or `logo-text.png`
**Command**:
```bash
cp logo-full.png logo.png
```

### 2. og-image.png
**Used in**: OpenGraph and Twitter Card meta tags
**Purpose**: Image shown when sharing on social media (Facebook, Twitter, LinkedIn)
**Size**: 1200x630 pixels (required for optimal display)
**Recommended**: Create a custom social sharing image with:
- Your logo
- Tagline: "Semantic Memory API for AI"
- Background with gradient (cyan to purple)

**You need to create this file** - it should be different from your logo, optimized for social sharing.

### 3. icon-192.png
**Used in**: PWA manifest
**Purpose**: App icon when installed as Progressive Web App
**Size**: 192x192 pixels
**Recommended**: Resize `logo-small.png` to 192x192

### 4. icon-512.png
**Used in**: PWA manifest
**Purpose**: High-res app icon for larger displays
**Size**: 512x512 pixels
**Recommended**: Resize `logo-small.png` to 512x512

### 5. favicon.ico
**Used in**: Browser tab icon
**Purpose**: Small icon in browser tabs and bookmarks
**Size**: 16x16, 32x32, 48x48 (multi-resolution ICO file)
**Recommended**: Use a favicon generator like https://favicon.io/

---

## Quick Setup Commands

If you want to use your existing logos:

```bash
# Navigate to public folder
cd D:\Projects\MemoryHub-Monorepo\frontend\public

# Copy logo-full.png as logo.png for structured data
cp logo-full.png logo.png

# For the rest, you'll need image editing tools or online converters:
# - og-image.png: Create 1200x630 social sharing image
# - icon-192.png: Resize logo-small.png to 192x192
# - icon-512.png: Resize logo-small.png to 512x512
# - favicon.ico: Use https://favicon.io/favicon-converter/
```

---

## Tools to Create Missing Images

### For og-image.png (1200x630):
- **Canva**: https://www.canva.com/ (use "Social Media" template)
- **Figma**: https://www.figma.com/ (create custom artboard)
- **Photoshop/GIMP**: Manual creation

### For PWA Icons (192x192, 512x512):
- **ImageMagick** (command line):
  ```bash
  convert logo-small.png -resize 192x192 icon-192.png
  convert logo-small.png -resize 512x512 icon-512.png
  ```
- **Online Resizer**: https://www.iloveimg.com/resize-image
- **PWA Asset Generator**: https://www.pwabuilder.com/imageGenerator

### For favicon.ico:
- **Favicon.io**: https://favicon.io/favicon-converter/
- **RealFaviconGenerator**: https://realfavicongenerator.net/

---

## Verification After Adding Files

Once you've added all files, verify they exist:

```bash
ls -la D:\Projects\MemoryHub-Monorepo\frontend\public
```

You should see:
- ✅ logo.png
- ✅ og-image.png
- ✅ icon-192.png
- ✅ icon-512.png
- ✅ favicon.ico

Then test in your app:
1. Run `npm run dev`
2. Visit http://localhost:3001
3. Check browser tab for favicon
4. Share a page on social media to see og-image
5. Try installing as PWA to see app icons
