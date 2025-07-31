const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware - Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'https://foodpanda.site',
  'https://www.foodpanda.site'
];

// Add environment-specific origins
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}
if (process.env.ALLOWED_ORIGINS) {
  const envOrigins = process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());
  allowedOrigins.push(...envOrigins);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global OPTIONS handler for preflight requests
app.options('*', (req, res) => {
  const origin = req.get('Origin');
  if (allowedOrigins.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
  } else {
    console.log(`OPTIONS request blocked from origin: ${origin}`);
    res.sendStatus(403);
  }
});

// Enhanced static file serving for uploaded images
const staticOptions = {
  setHeaders: (res, filePath, stat) => {
    // Set proper CORS headers
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001', 
      'https://foodpanda.site',
      'https://www.foodpanda.site'
    ];
    
    const origin = res.req.get('Origin');
    if (allowedOrigins.includes(origin) || !origin) {
      res.set('Access-Control-Allow-Origin', origin || '*');
    }
    
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With');
    res.set('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    res.set('Content-Type', 'image/jpeg'); // Default to JPEG, will be overridden by Express
    
    // Log image access for debugging
    console.log(`Image requested: ${filePath}`);
  },
  // Add fallback for missing files
  fallthrough: true
};

// Serve static files (uploaded images) - Multiple paths for compatibility
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), staticOptions));
app.use('/v1/uploads', express.static(path.join(__dirname, 'uploads'), staticOptions));
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads'), staticOptions));

// Handle OPTIONS requests for images
app.options('/uploads/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With');
  res.sendStatus(200);
});

app.options('/v1/uploads/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With');
  res.sendStatus(200);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food-ordering-app')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/v1/categories', categoryRoutes);
app.use('/v1/products', productRoutes);
app.use('/v1/admin', adminRoutes);
app.use('/v1/contacts', contactRoutes);

// Health check endpoint
app.get('/v1/health', (req, res) => {
  res.json({ status: 'Server is running successfully' });
});

// CORS test endpoint
app.get('/v1/cors-test', (req, res) => {
  const origin = req.get('Origin');
  console.log(`CORS test requested from origin: ${origin}`);
  res.json({ 
    status: 'CORS test successful',
    origin: origin,
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins
  });
});

app.post('/v1/cors-test', (req, res) => {
  const origin = req.get('Origin');
  console.log(`CORS POST test requested from origin: ${origin}`);
  res.json({ 
    status: 'CORS POST test successful',
    origin: origin,
    body: req.body,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
