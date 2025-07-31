const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

console.log('=== QUICK IMAGE SERVER TEST ===');

// Basic CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Check if uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('❌ Uploads directory does not exist!');
  process.exit(1);
}

const files = fs.readdirSync(uploadsDir);
console.log(`✅ Found ${files.length} files in uploads directory`);

// Serve static files from uploads
app.use('/uploads', express.static(uploadsDir, {
  setHeaders: (res, path) => {
    console.log(`📸 Serving image: ${path}`);
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

app.use('/v1/uploads', express.static(uploadsDir, {
  setHeaders: (res, path) => {
    console.log(`📸 Serving image (v1): ${path}`);
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

app.use('/api/uploads', express.static(uploadsDir, {
  setHeaders: (res, path) => {
    console.log(`📸 Serving image (api): ${path}`);
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    uploads: files.length,
    sampleFile: files[0] || 'none'
  });
});

// List all files
app.get('/list-images', (req, res) => {
  const fileList = files.map(file => ({
    filename: file,
    urls: [
      `http://localhost:5000/uploads/${file}`,
      `http://localhost:5000/v1/uploads/${file}`,
      `http://localhost:5000/api/uploads/${file}`
    ]
  }));
  
  res.json({
    count: files.length,
    files: fileList
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Quick image server running on http://localhost:${PORT}`);
  console.log('');
  console.log('📋 Test URLs:');
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   List: http://localhost:${PORT}/list-images`);
  
  if (files.length > 0) {
    const sampleFile = files[0];
    console.log(`   Sample image: http://localhost:${PORT}/uploads/${sampleFile}`);
    console.log(`   Alt URL 1: http://localhost:${PORT}/v1/uploads/${sampleFile}`);
    console.log(`   Alt URL 2: http://localhost:${PORT}/api/uploads/${sampleFile}`);
  }
  
  console.log('');
  console.log('🔧 Test in browser console:');
  console.log(`   fetch('http://localhost:${PORT}/health').then(r=>r.json()).then(console.log)`);
  console.log(`   fetch('http://localhost:${PORT}/list-images').then(r=>r.json()).then(console.log)`);
});
