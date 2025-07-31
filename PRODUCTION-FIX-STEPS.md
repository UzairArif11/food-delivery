# Production Image Serving Fix Guide

## Problem
Getting "404 Not Found nginx/1.24.0 (Ubuntu)" when trying to access images, indicating nginx can't find the backend server.

## Root Cause
Most likely your Node.js backend server isn't running on port 5000, so nginx can't proxy requests to it.

## Step-by-Step Fix

### 1. SSH into your server
```bash
ssh your-username@your-server-ip
```

### 2. Check if backend is running
```bash
# Check for Node.js processes
ps aux | grep node

# Check if port 5000 is in use
netstat -tlnp | grep :5000

# Or using newer command
ss -tlnp | grep :5000
```

### 3. Navigate to backend directory
```bash
cd /var/www/backend
# or wherever your backend is deployed
```

### 4. Check if server files exist
```bash
ls -la
# Should see server.js, package.json, etc.

# Check uploads directory
ls -la uploads/
```

### 5. Start the backend server

**Option A: Using PM2 (recommended for production)**
```bash
# Install PM2 if not installed
npm install -g pm2

# Start backend
pm2 start server.js --name backend

# Make sure it starts on boot
pm2 startup
pm2 save
```

**Option B: Direct node (for testing)**
```bash
# Make sure dependencies are installed
npm install

# Start server directly
node server.js
```

### 6. Verify backend is running
```bash
# Test health endpoint
curl http://localhost:5000/v1/health

# Should return: {"status":"Server is running successfully"}
```

### 7. Test image serving directly
```bash
# List files in uploads
ls uploads/

# Test image serving (replace with actual filename)
curl -I http://localhost:5000/uploads/image-1752085416391-807017545.jpg

# Should return 200 OK
```

### 8. Update nginx configuration
```bash
# Copy the fixed configuration
sudo cp /var/www/nextjs-frontend/nginx-production-fixed.conf /etc/nginx/sites-available/default

# Test configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

### 9. Test through nginx
```bash
# Test API endpoint through nginx
curl https://foodpanda.site/api/v1/health

# Test image through nginx (replace with actual filename)
curl -I https://foodpanda.site/uploads/image-1752085416391-807017545.jpg
```

### 10. Check logs if still not working
```bash
# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check backend logs (if using PM2)
pm2 logs backend

# Check system logs
sudo journalctl -u nginx -f
```

## Common Issues & Solutions

### Issue 1: Backend not starting
```bash
# Check for port conflicts
sudo lsof -i :5000

# Check for missing dependencies
cd /var/www/backend
npm install

# Check environment variables
cat .env.production
```

### Issue 2: Permission issues
```bash
# Fix uploads directory permissions
sudo chown -R www-data:www-data uploads/
# or
sudo chown -R $USER:$USER uploads/
sudo chmod -R 755 uploads/
```

### Issue 3: Environment variables not loaded
```bash
# Ensure .env.production exists
ls -la .env*

# Check content
cat .env.production

# Make sure NODE_ENV is set
export NODE_ENV=production
```

### Issue 4: Nginx configuration not applied
```bash
# Check current configuration
sudo nginx -T | grep -A 10 -B 10 "backend_api"

# Force reload
sudo systemctl stop nginx
sudo systemctl start nginx
```

## Quick Test Commands

Once everything is running, test these URLs in your browser:
- `https://foodpanda.site/api/v1/health` - Should return JSON
- `https://foodpanda.site/uploads/[filename].jpg` - Should show image
- `https://www.foodpanda.site/api/v1/health` - Should also work

## Emergency Fallback

If you can't get nginx working immediately, you can temporarily serve images directly from the backend by modifying the Next.js configuration to point directly to your backend server IP:

In your Next.js `.env.production`:
```
NEXT_PUBLIC_API_URL=http://YOUR_SERVER_IP:5000/v1
NEXT_PUBLIC_BACKEND_URL=http://YOUR_SERVER_IP:5000
```

Then rebuild and restart your frontend.

## Need Help?

If you're still having issues, run this command and share the output:
```bash
curl -v https://foodpanda.site/api/v1/health
```
