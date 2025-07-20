# FoodDelivery - Next.js Application

A modern food ordering application built with Next.js 14, featuring server-side rendering, optimal SEO, and excellent performance.

## 🚀 Features

- **Next.js 14** with App Router for better SEO and performance
- **TypeScript** for type safety
- **Tailwind CSS** for modern styling
- **Redux Toolkit** for state management
- **Framer Motion** for smooth animations
- **React Toastify** for notifications
- **Optimized Images** with Next.js Image component
- **SEO Optimized** with metadata and open graph tags

## 📦 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── page.tsx        # Home page
│   ├── menu/           # Menu page
│   ├── cart/           # Cart page
│   ├── about/          # About page
│   └── contact/        # Contact page
├── components/         # Reusable components
├── lib/               # Core logic
│   ├── api.ts         # API client
│   ├── store.ts       # Redux store
│   ├── slices/        # Redux slices
│   └── middleware/    # Redux middleware
├── styles/            # Global styles
├── types/             # TypeScript definitions
└── utils/             # Utility functions
```

## 🛠 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Start Backend Server** (in separate terminal)
   ```bash
   cd ../backend
   npm run dev
   ```

## 🔄 Conversion from React to Next.js

### Key Changes Made:

1. **Routing System**
   - **Before**: React Router DOM with client-side routing
   - **After**: Next.js App Router with file-based routing

2. **SEO Optimization**
   - **Before**: Limited SEO capabilities
   - **After**: Built-in metadata API, server-side rendering

3. **Image Optimization**
   - **Before**: Regular `<img>` tags
   - **After**: Next.js `<Image>` component with automatic optimization

4. **Font Loading**
   - **Before**: External font imports in CSS
   - **After**: `next/font` for optimized font loading

5. **Environment Variables**
   - **Before**: `REACT_APP_` prefix
   - **After**: `NEXT_PUBLIC_` prefix for client-side variables

6. **Client Components**
   - **Added**: `'use client'` directive for interactive components

## 🎯 Key Learning Points

### Next.js Concepts Implemented:

1. **App Router**: Modern routing with layouts and nested routing
2. **Server Components**: Default server-side rendering
3. **Client Components**: Interactive components with `'use client'`
4. **Metadata API**: SEO optimization with structured metadata
5. **Image Optimization**: Automatic image optimization and lazy loading
6. **Font Optimization**: Web font optimization with `next/font`

### SEO Improvements:

- **Meta tags** for each page
- **Open Graph** tags for social media
- **Structured data** for search engines
- **Server-side rendering** for better indexing
- **Optimized images** for faster loading

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🌟 Performance Optimizations

- **Code Splitting**: Automatic code splitting with dynamic imports
- **Image Optimization**: Next.js Image component with WebP support
- **Font Optimization**: Preloaded fonts with `next/font`
- **Bundle Optimization**: Automatic bundle optimization
- **Lazy Loading**: Components and images load when needed

## 🔗 API Integration

The application connects to a Node.js/Express backend:
- **Categories**: Fetch and display food categories
- **Products**: Product catalog with filtering
- **Cart**: Shopping cart functionality
- **Contact**: Contact form submissions

## 📱 Responsive Design

- **Mobile-first** approach
- **Tailwind CSS** for responsive utilities
- **Framer Motion** for smooth animations
- **Touch-friendly** interface

## 🚦 Getting Started

1. Ensure your backend server is running on port 5000
2. Start the Next.js development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)
4. Navigate through the application to see all features

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom CSS** for specific components
- **Responsive design** with mobile-first approach
- **Dark mode ready** styles (can be implemented)

## 🔧 Configuration

- **next.config.js**: Next.js configuration
- **tailwind.config.js**: Tailwind CSS configuration
- **tsconfig.json**: TypeScript configuration
- **postcss.config.js**: PostCSS configuration

---

**Successfully converted from React to Next.js with improved SEO, performance, and developer experience!** 🎉
