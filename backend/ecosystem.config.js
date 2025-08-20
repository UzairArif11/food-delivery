module.exports = {
  apps: [{
    name: 'food-delivery-backend',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '3G',
    env: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000,
      FRONTEND_URL: 'https://shangrilaresturant.com',
      MONGO_URI: 'mongodb://localhost:27017/food-ordering-app'
    },
    // Logging
    log_file: '/var/log/pm2/food-backend-combined.log',
    out_file: '/var/log/pm2/food-backend-out.log',
    error_file: '/var/log/pm2/food-backend-error.log',
    time: true,
    
    // Process management
    min_uptime: '10s',
    max_restarts: 10,
    
    // Advanced features
    merge_logs: true,
    kill_timeout: 5000,
    
    // Health monitoring
    health_check_grace_period: 3000,
    health_check_fatal: false,
    
    // Environment specific settings
    cwd: '/var/www/food-backend',
    
    // Startup script
    post_update: ['npm install', 'echo "Backend updated successfully"'],
    
    // Watch ignore patterns
    ignore_watch: [
      'node_modules',
      'uploads',
      'logs',
      '.git'
    ]
  }]
}
