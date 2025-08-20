#!/bin/bash
# SSG Production Deployment Script
set -e

echo "🚀 Starting SSG Deployment..."

# Configuration
SITE_DIR="/var/www/food-frontend-static"
BACKUP_DIR="/var/backups/food-frontend-$(date +%Y%m%d_%H%M%S)"

print_status() {
    echo "✅ $1"
}

# Create backup of current site
if [ -d "$SITE_DIR" ]; then
    print_status "Creating backup..."
    sudo cp -r "$SITE_DIR" "$BACKUP_DIR"
fi

# Pull latest code
print_status "Pulling latest code..."
git pull

# Install dependencies
print_status "Installing dependencies..."
npm ci

# Build static site
print_status "Building static site..."
NODE_ENV=production npm run build

# Deploy static files
print_status "Deploying static files..."
sudo mkdir -p "$SITE_DIR"
sudo cp -r out/* "$SITE_DIR/"
sudo chown -R www-data:www-data "$SITE_DIR"
sudo chmod -R 755 "$SITE_DIR"

# Update NGINX configuration
print_status "Updating NGINX configuration..."
sudo cp nginx-ssg.conf /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl reload nginx

print_status "🎉 SSG deployment completed successfully!"
print_status "🌐 Your static site is available at: https:// shangrilaresturant.com"

# Show build info
print_status "Build information:"
echo "  - Build time: $(date)"
echo "  - Static files: $(find $SITE_DIR -type f | wc -l) files"
echo "  - Total size: $(du -sh $SITE_DIR | cut -f1)"
