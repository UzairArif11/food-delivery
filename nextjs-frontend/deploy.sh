#!/bin/bash
# Essential Next.js SSR Production Deployment Script
set -e

echo "🚀 Starting Production Deployment..."

# Essential configuration
BUILD_DIR="/var/www/food-frontend"

# Simple status function
print_status() {
    echo "✅ $1"
}

# Pull latest code
print_status "Pulling latest code..."
git pull

# Install production dependencies
print_status "Installing dependencies..."
npm ci 

# Build for production
print_status "Building Next.js application..."
NODE_ENV=production npm run build

# Deploy files
print_status "Deploying to production..."
sudo mkdir -p "$BUILD_DIR"
sudo cp -r .next "$BUILD_DIR/"
sudo cp -r public "$BUILD_DIR/"
sudo cp -r node_modules "$BUILD_DIR/"
sudo cp package.json "$BUILD_DIR/"
sudo chown -R www-data:www-data "$BUILD_DIR"

# Create or update systemd service
print_status "Setting up systemd service..."
sudo tee /etc/systemd/system/food-delivery-frontend.service > /dev/null <<EOF
[Unit]
Description=Food Delivery Next.js Frontend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=$BUILD_DIR
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=0.0.0.0

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and restart service
sudo systemctl daemon-reload
sudo systemctl enable food-delivery-frontend
sudo systemctl restart food-delivery-frontend

# Check service status
if sudo systemctl is-active --quiet food-delivery-frontend; then
    print_status "Frontend service is running successfully!"
else
    echo "❌ Frontend service failed to start!"
    sudo systemctl status food-delivery-frontend
    exit 1
fi

# Reload nginx
print_status "Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

print_status "🎉 Deployment completed successfully!"
print_status "🌐 Your site should be available at: https://foodpanda.site"

# Show service logs
print_status "Recent service logs:"
sudo journalctl -u food-delivery-frontend --no-pager -n 10


# Reload nginx
print_status "Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

print_status "🎉 Deployment completed successfully!"
print_status "🌐 Your site should be available at: https://foodpanda.site"

# Show systemd service status
print_status "🔍 Checking systemd service status..."
sudo systemctl status food-delivery-frontend --no-pager

# Show recent logs
print_status "Recent service logs:"
sudo journalctl -u food-delivery-frontend --no-pager -n 10

# Test domain with curl
print_status "🌐 Testing live site with curl..."
curl -I https://foodpanda.site
