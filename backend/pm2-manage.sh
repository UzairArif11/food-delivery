#!/bin/bash
# PM2 Management Script for Food Delivery Backend

APP_NAME="food-delivery-backend"
BACKEND_DIR="/var/www/food-backend"

case "$1" in
    start)
        echo "🚀 Starting backend with PM2..."
        cd "$BACKEND_DIR"
        sudo -u www-data pm2 start ecosystem.config.js --env production
        ;;
    stop)
        echo "🛑 Stopping backend..."
        sudo -u www-data pm2 stop $APP_NAME
        ;;
    restart)
        echo "🔄 Restarting backend..."
        sudo -u www-data pm2 restart $APP_NAME
        ;;
    reload)
        echo "🔄 Reloading backend (zero-downtime)..."
        sudo -u www-data pm2 reload $APP_NAME
        ;;
    status)
        echo "📊 Backend status:"
        sudo -u www-data pm2 list
        ;;
    logs)
        echo "📋 Backend logs:"
        sudo -u www-data pm2 logs $APP_NAME
        ;;
    logs-error)
        echo "🚨 Backend error logs:"
        sudo -u www-data pm2 logs $APP_NAME --err
        ;;
    monit)
        echo "📈 Opening PM2 monitoring..."
        sudo -u www-data pm2 monit
        ;;
    delete)
        echo "🗑️ Deleting backend from PM2..."
        sudo -u www-data pm2 delete $APP_NAME
        ;;
    test-images)
        echo "🖼️ Testing image serving..."
        echo "Checking uploads directory:"
        ls -la "$BACKEND_DIR/uploads/" | head -10
        echo ""
        echo "Testing image endpoint:"
        curl -I "http://localhost:5000/uploads/$(ls $BACKEND_DIR/uploads/ | head -1)" 2>/dev/null || echo "No images found or endpoint not responding"
        ;;
    health)
        echo "🏥 Backend health check:"
        curl -f http://localhost:5000/v1/health 2>/dev/null && echo " - ✅ API is healthy" || echo " - ❌ API is not responding"
        ;;
    *)
        echo "🔧 PM2 Management Script for Food Delivery Backend"
        echo ""
        echo "Usage: $0 {start|stop|restart|reload|status|logs|logs-error|monit|delete|test-images|health}"
        echo ""
        echo "Commands:"
        echo "  start       - Start the backend application"
        echo "  stop        - Stop the backend application"
        echo "  restart     - Restart the backend application"
        echo "  reload      - Zero-downtime reload"
        echo "  status      - Show PM2 status"
        echo "  logs        - Show application logs"
        echo "  logs-error  - Show error logs only"
        echo "  monit       - Open PM2 monitoring dashboard"
        echo "  delete      - Remove app from PM2"
        echo "  test-images - Test image serving functionality"
        echo "  health      - Check API health"
        exit 1
        ;;
esac
