#!/bin/bash
# Backend Production Deployment Script
set -e

echo "🚀 Starting Backend Deployment..."

# Essential configuration
BACKEND_DIR="/var/www/food-backend"
SERVICE_NAME="food-delivery-backend"

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
sudo chown -R www-data:www-data "$BACKEND_DIR"
sudo chmod -R 755 "$BACKEND_DIR"

# Set proper permissions for uploads directory
sudo chmod -R 775 "$BACKEND_DIR/uploads"

# Create or update systemd service
print_status "Setting up systemd service..."
sudo tee /etc/systemd/system/$SERVICE_NAME.service > /dev/null <<EOF
[Unit]
Description=Food Delivery Backend API
After=network.target mongod.service

[Service]
Type=simple
User=www-data
WorkingDirectory=$BACKEND_DIR
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=5000

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and restart service
sudo systemctl daemon-reload
sudo systemctl enable $SERVICE_NAME
sudo systemctl restart $SERVICE_NAME

# Check service status
if sudo systemctl is-active --quiet $SERVICE_NAME; then
    print_status "Backend service is running successfully!"
else
    echo "❌ Backend service failed to start!"
    sudo systemctl status $SERVICE_NAME
    exit 1
fi

print_status "🎉 Backend deployment completed successfully!"
print_status "🌐 Backend API should be available at: http://localhost:5000"

# Show service logs
print_status "Recent service logs:"
sudo journalctl -u $SERVICE_NAME --no-pager -n 10
