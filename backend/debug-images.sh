#!/bin/bash
# Image Serving Debug Script

echo "🔍 DEBUGGING IMAGE SERVING ISSUE"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_test() {
    echo -e "\n${YELLOW}🧪 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Test 1: Check PM2 Backend Status
print_test "Testing PM2 Backend Status"
if pm2 list | grep -q "online.*food-delivery"; then
    print_success "Backend is running with PM2"
    pm2 list | grep food-delivery
else
    print_error "Backend is not running with PM2"
    pm2 list
fi

# Test 2: Check Backend API Health
print_test "Testing Backend API Health"
if curl -f -s http://localhost:5000/v1/health > /dev/null; then
    print_success "Backend API is responding"
    curl -s http://localhost:5000/v1/health
else
    print_error "Backend API is not responding"
fi

# Test 3: Check Uploads Directory
print_test "Checking Uploads Directory"
if [ -d "/var/www/food-backend/uploads" ]; then
    print_success "Uploads directory exists"
    echo "Files in uploads:"
    ls -la /var/www/food-backend/uploads/ | head -10
    SAMPLE_IMAGE=$(ls /var/www/food-backend/uploads/ | head -1)
    echo "Sample image: $SAMPLE_IMAGE"
else
    print_error "Uploads directory not found"
fi

# Test 4: Test Backend Image Serving
print_test "Testing Backend Image Serving"
if [ ! -z "$SAMPLE_IMAGE" ]; then
    if curl -f -I "http://localhost:5000/uploads/$SAMPLE_IMAGE" 2>/dev/null; then
        print_success "Backend serves images correctly"
        curl -I "http://localhost:5000/uploads/$SAMPLE_IMAGE" 2>/dev/null | head -5
    else
        print_error "Backend cannot serve images"
        echo "Testing alternative path:"
        curl -I "http://localhost:5000/v1/uploads/$SAMPLE_IMAGE" 2>/dev/null | head -5
    fi
else
    print_error "No sample image found to test"
fi

# Test 5: Check NGINX Status
print_test "Testing NGINX Status"
if sudo systemctl is-active --quiet nginx; then
    print_success "NGINX is running"
    sudo nginx -t
else
    print_error "NGINX is not running"
fi

# Test 6: Test NGINX Image Proxy
print_test "Testing NGINX Image Proxy"
if [ ! -z "$SAMPLE_IMAGE" ]; then
    if curl -f -I "https://foodpanda.site/uploads/$SAMPLE_IMAGE" 2>/dev/null; then
        print_success "NGINX proxies images correctly"
        curl -I "https://foodpanda.site/uploads/$SAMPLE_IMAGE" 2>/dev/null | head -5
    else
        print_error "NGINX cannot proxy images"
        echo "Checking NGINX error logs:"
        sudo tail -5 /var/log/nginx/error.log
    fi
fi

# Test 7: Check API Categories Response
print_test "Testing Categories API Response"
if curl -f -s "https://foodpanda.site/api/v1/categories" > /dev/null; then
    print_success "Categories API is accessible"
    echo "Sample category data:"
    curl -s "https://foodpanda.site/api/v1/categories" | head -200
else
    print_error "Categories API is not accessible"
fi

# Test 8: Check Frontend Status
print_test "Testing Frontend Status"
if sudo systemctl is-active --quiet food-delivery-frontend; then
    print_success "Frontend service is running"
    sudo systemctl status food-delivery-frontend --no-pager -l
else
    print_error "Frontend service is not running"
    echo "Try starting it:"
    echo "cd ~/food-delivery/nextjs-frontend && ./deploy.sh"
fi

# Test 9: Test Frontend Response
print_test "Testing Frontend Response"
if curl -f -s https://foodpanda.site > /dev/null; then
    print_success "Frontend is accessible"
else
    print_error "Frontend is not accessible"
fi

echo -e "\n${YELLOW}🔍 DEBUG SUMMARY${NC}"
echo "=================================="
echo "Run the failed tests individually to get more details."
echo "Common fixes:"
echo "1. If backend fails: pm2 restart food-delivery-backend"
echo "2. If NGINX fails: sudo systemctl reload nginx"
echo "3. If frontend fails: cd ~/food-delivery/nextjs-frontend && ./deploy.sh"
