# SSH to your server
ssh ubuntu@your-server-ip

# Navigate to backend directory
cd ~/food-delivery/backend

# Make scripts executable
chmod +x deploy-backend-pm2.sh
chmod +x pm2-manage.sh

# Deploy with PM2
./deploy-backend-pm2.sh

# Test image functionality
./pm2-manage.sh test-images

# Check health
./pm2-manage.sh health

# View logs
./pm2-manage.sh logs

# Check status
./pm2-manage.sh status

# View real-time monitoring
./pm2-manage.sh monit

# Restart if needed
./pm2-manage.sh restart