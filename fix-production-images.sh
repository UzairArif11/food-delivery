#!/bin/bash

echo "=== PRODUCTION IMAGE SERVING FIX ==="
echo ""

# Check if we're on the server (Ubuntu)
if [ ! -f /etc/nginx/nginx.conf ]; then
    echo "❌ This script should be run on your Ubuntu server, not locally"
    echo "   Please copy this script to your server and run it there"
    exit 1
fi

echo "1. Checking current nginx configuration..."
if [ -f /etc/nginx/sites-available/default ]; then
    echo "✅ Found nginx configuration file"
    echo "   Current configuration preview:"
    head -20 /etc/nginx/sites-available/default
    echo "   ..."
else
    echo "❌ Nginx configuration file not found"
fi

echo ""
echo "2. Checking if backend server is running..."
if pgrep -f "node.*server.js" > /dev/null; then
    echo "✅ Backend server is running"
    echo "   Process details:"
    pgrep -af "node.*server.js"
else
    echo "❌ Backend server is NOT running"
    echo "   You need to start it with: pm2 start server.js --name backend"
fi

echo ""
echo "3. Checking nginx status..."
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx is running"
else
    echo "❌ Nginx is not running"
    echo "   Starting nginx..."
    sudo systemctl start nginx
fi

echo ""
echo "4. Testing backend connectivity..."
if curl -s http://localhost:5000/v1/health > /dev/null; then
    echo "✅ Backend is accessible on localhost:5000"
    curl -s http://localhost:5000/v1/health | head -1
else
    echo "❌ Backend is NOT accessible on localhost:5000"
    echo "   This is the main issue!"
fi

echo ""
echo "5. Testing image serving..."
UPLOAD_DIR="/var/www/backend/uploads"
if [ -d "$UPLOAD_DIR" ]; then
    SAMPLE_FILE=$(ls "$UPLOAD_DIR" | head -1)
    if [ ! -z "$SAMPLE_FILE" ]; then
        echo "✅ Found uploads directory with files"
        echo "   Sample file: $SAMPLE_FILE"
        echo "   Testing URLs:"
        
        # Test direct backend
        if curl -s "http://localhost:5000/uploads/$SAMPLE_FILE" > /dev/null; then
            echo "   ✅ http://localhost:5000/uploads/$SAMPLE_FILE"
        else
            echo "   ❌ http://localhost:5000/uploads/$SAMPLE_FILE"
        fi
        
        # Test through nginx
        if curl -s "https://foodpanda.site/uploads/$SAMPLE_FILE" > /dev/null; then
            echo "   ✅ https://foodpanda.site/uploads/$SAMPLE_FILE"
        else
            echo "   ❌ https://foodpanda.site/uploads/$SAMPLE_FILE"
        fi
    else
        echo "❌ No files in uploads directory"
    fi
else
    echo "❌ Uploads directory not found at $UPLOAD_DIR"
    echo "   Looking for uploads directory..."
    find /var/www -name "uploads" -type d 2>/dev/null || echo "   No uploads directory found"
fi

echo ""
echo "6. Quick fixes to try:"
echo ""
echo "   A. Start/restart backend server:"
echo "      cd /var/www/backend"
echo "      pm2 stop backend 2>/dev/null || true"
echo "      pm2 start server.js --name backend"
echo "      pm2 save"
echo ""
echo "   B. Apply the correct nginx configuration:"
echo "      sudo cp /var/www/nextjs-frontend/nginx-production-fixed.conf /etc/nginx/sites-available/default"
echo "      sudo nginx -t"
echo "      sudo systemctl reload nginx"
echo ""
echo "   C. Check nginx error logs:"
echo "      sudo tail -f /var/log/nginx/error.log"
echo ""
echo "   D. Test backend health:"
echo "      curl http://localhost:5000/v1/health"
echo ""

echo "=== END DIAGNOSTICS ==="
