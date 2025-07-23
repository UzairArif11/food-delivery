#!/bin/bash
# Backend PM2 Production Deployment Script
set -e

echo "🚀 Starting Backend PM2 Deployment..."

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
sudo mkdir -p "/var/log/pm2"

# Copy files to production
print_status "Copying files to production..."
sudo cp -r . "$BACKEND_DIR/"
sudo chown -R www-data:www-data "$BACKEND_DIR"
sudo chmod -R 755 "$BACKEND_DIR"

# Set proper permissions for uploads directory
sudo chmod -R 775 "$BACKEND_DIR/uploads"

# Set proper permissions for PM2 logs
sudo chown -R www-data:www-data "/var/log/pm2"

# Create PM2 home directory for www-data user
sudo mkdir -p /home/www-data
sudo chown -R www-data:www-data /home/www-data

# Set PM2_HOME environment variable
export PM2_HOME=/home/www-data/.pm2
sudo -u www-data mkdir -p $PM2_HOME

# Navigate to deployment directory
cd "$BACKEND_DIR"

# Stop existing PM2 process if running
print_status "Stopping existing PM2 processes..."
sudo -u www-data PM2_HOME=/home/www-data/.pm2 pm2 stop $APP_NAME 2>/dev/null || true
sudo -u www-data PM2_HOME=/home/www-data/.pm2 pm2 delete $APP_NAME 2>/dev/null || true

# Start application with PM2
print_status "Starting application with PM2..."
sudo -u www-data PM2_HOME=/home/www-data/.pm2 pm2 start ecosystem.config.js --env production

# Save PM2 configuration
print_status "Saving PM2 configuration..."
sudo -u www-data pm2 save

# Setup PM2 startup script
print_status "Setting up PM2 startup script..."
sudo -u www-data pm2 startup systemd -u www-data --hp /var/www/food-backend
sudo systemctl enable pm2-www-data

# Verify deployment
print_status "Verifying deployment..."
sleep 5

if sudo -u www-data pm2 list | grep -q "online.*$APP_NAME"; then
    print_status "Backend service is running successfully with PM2!"
else
    echo "❌ Backend service failed to start!"
    sudo -u www-data pm2 logs $APP_NAME --lines 10
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
sudo -u www-data pm2 list

# Show recent logs
print_status "Recent logs:"
sudo -u www-data pm2 logs $APP_NAME --lines 10
