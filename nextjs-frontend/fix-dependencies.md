# Fix Missing Dependencies

The build is failing due to missing dependencies. Run these commands on your Ubuntu server:

## Install Missing Dependencies

```bash
# Navigate to the project directory
cd ~/food-delivery/nextjs-frontend

# Install the missing clsx dependency
npm install clsx@^2.0.0

# Also install tailwindcss-merge (often used with clsx)
npm install tailwindcss-merge@^2.0.0

# Or install both at once
npm install clsx@^2.0.0 tailwindcss-merge@^2.0.0
```

## Run the Build Again

```bash
# After installing dependencies, run the build
npm run build
```

## Alternative: Update package.json and reinstall

If the above doesn't work, you can also:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Dependencies Fixed

✅ `react-toastify` imports replaced with `sonner` in:
- `src/app/admin/add-category/page.tsx`
- `src/app/admin/add-product/page.tsx` 
- `src/components/ContactPageContent.tsx`
- `src/components/ProductCard.tsx`

✅ `clsx` dependency added to package.json

The build should now work properly after installing the missing `clsx` dependency.
