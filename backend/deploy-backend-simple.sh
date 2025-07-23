#!/bin/bash
# Simple Backend PM2 Deployment Script
set -e

echo "🚀 Starting Simple Backend PM2 Deployment..."

# Essential configuration
BACKEND_DIR="/var/www/food-backend"
APP_NAME="food-delivery-backend"

# Simple status function
print_status() {
    echo "✅ $1"
}

# Pull latest code
print_status "Pulling latest code..."
git pull

# Install production dependencies
print_status "Installing dependencies..."
npm ci --only=production

# Create deployment directory
print_status "Preparing deployment directory..."
sudo mkdir -p "$BACKEND_DIR"
sudo mkdir -p "$BACKEND_DIR/uploads"

# Copy files to production
print_status "Copying files to production..."
sudo cp -r . "$BACKEND_DIR/"
sudo chmod -R 755 "$BACKEND_DIR"

# Set proper permissions for uploads directory
sudo chmod -R 777 "$BACKEND_DIR/uploads"

# Navigate to deployment directory
cd "$BACKEND_DIR"

# Stop existing PM2 process if running
print_status "Stopping existing PM2 processes..."
pm2 stop $APP_NAME 2>/dev/null || true
pm2 delete $APP_NAME 2>/dev/null || true

# Start application with PM2 (simple approach)
print_status "Starting application with PM2..."
NODE_ENV=production PORT=5000 FRONTEND_URL=https://foodpanda.site pm2 start server.js --name $APP_NAME

# Save PM2 configuration
print_status "Saving PM2 configuration..."
pm2 save

# Setup PM2 startup script
print_status "Setting up PM2 startup script..."
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME

# Verify deployment
print_status "Verifying deployment..."
sleep 3

if pm2 list | grep -q "online.*$APP_NAME"; then
    print_status "Backend service is running successfully with PM2!"
else
    echo "❌ Backend service failed to start!"
    pm2 logs $APP_NAME --lines 10
    exit 1
fi

# Test API endpoint
print_status "Testing API endpoint..."
if curl -f http://localhost:5000/v1/health > /dev/null 2>&1; then
    print_status "API health check passed!"
else
    echo "⚠️ API health check failed - check logs"
fi

print_status "🎉 Backend PM2 deployment completed successfully!"
print_status "🌐 Backend API is available at: http://localhost:5000"

# Show PM2 status
print_status "PM2 Status:"
pm2 list

# Show recent logs
print_status "Recent logs:"
pm2 logs $APP_NAME --lines 10
