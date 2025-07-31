const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

console.log('=== COMPREHENSIVE IMAGE DEBUG ===\n');

// 1. Check files in uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
console.log('1. UPLOADS DIRECTORY CHECK:');
console.log('   Path:', uploadsDir);
console.log('   Exists:', fs.existsSync(uploadsDir));

if (fs.existsSync(uploadsDir)) {
  const files = fs.readdirSync(uploadsDir);
  console.log('   Files count:', files.length);
  
  if (files.length > 0) {
    const sampleFile = files[0];
    const samplePath = path.join(uploadsDir, sampleFile);
    const stats = fs.statSync(samplePath);
    
    console.log('\n   Sample file:', sampleFile);
    console.log('   Size:', stats.size, 'bytes');
    console.log('   Is readable:', fs.constants.R_OK);
    
    // Test different URL patterns that might be used
    const testUrls = [
      `http://localhost:5000/uploads/${sampleFile}`,
      `http://localhost:5000/v1/uploads/${sampleFile}`,
      `http://localhost:5000/api/uploads/${sampleFile}`,
      `https://foodpanda.site/uploads/${sampleFile}`,
      `https://foodpanda.site/api/v1/uploads/${sampleFile}`,
      `https://www.foodpanda.site/uploads/${sampleFile}`
    ];
    
    console.log('\n2. URL PATTERNS TO TEST:');
    testUrls.forEach((url, index) => {
      console.log(`   ${index + 1}. ${url}`);
    });
    
    console.log('\n3. TESTING URL ACCESSIBILITY:');
    console.log('   (Run this script while your backend server is running)\n');
    
    // Test localhost URLs if server might be running
    testUrls.slice(0, 3).forEach(url => {
      testUrl(url);
    });
  }
} else {
  console.log('   ❌ ERROR: Uploads directory does not exist!');
}

console.log('\n4. ENVIRONMENT VARIABLES:');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'undefined');
console.log('   PORT:', process.env.PORT || 'undefined');
console.log('   FRONTEND_URL:', process.env.FRONTEND_URL || 'undefined');
console.log('   ALLOWED_ORIGINS:', process.env.ALLOWED_ORIGINS || 'undefined');

console.log('\n5. NEXT.JS ENVIRONMENT (if available):');
console.log('   NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL || 'undefined');
console.log('   NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL || 'undefined');
console.log('   NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL || 'undefined');

function testUrl(url) {
  const protocol = url.startsWith('https:') ? https : http;
  const startTime = Date.now();
  
  const req = protocol.get(url, (res) => {
    const responseTime = Date.now() - startTime;
    console.log(`   ✅ ${url}`);
    console.log(`      Status: ${res.statusCode}`);
    console.log(`      Content-Type: ${res.headers['content-type']}`);
    console.log(`      Content-Length: ${res.headers['content-length']}`);
    console.log(`      Response Time: ${responseTime}ms`);
    
    // Check CORS headers
    if (res.headers['access-control-allow-origin']) {
      console.log(`      CORS Origin: ${res.headers['access-control-allow-origin']}`);
    } else {
      console.log(`      ⚠️  No CORS headers found`);
    }
    console.log('');
    
    res.resume(); // Consume response data
  }).on('error', (err) => {
    const responseTime = Date.now() - startTime;
    console.log(`   ❌ ${url}`);
    console.log(`      Error: ${err.message}`);
    console.log(`      Response Time: ${responseTime}ms`);
    console.log('');
  });
  
  req.setTimeout(5000, () => {
    console.log(`   ⏱️  ${url} - Request timeout`);
    req.destroy();
  });
}

console.log('\n6. QUICK FIXES TO TRY:');
console.log('   1. Ensure backend server is running: npm start or node server.js');
console.log('   2. Check if images load directly in browser: http://localhost:5000/uploads/[filename]');
console.log('   3. Verify NGINX configuration is applied (production only)');
console.log('   4. Check browser Network tab for failed image requests');
console.log('   5. Ensure frontend is using correct API URL in environment variables');
console.log('\n7. BROWSER CONSOLE TEST:');
console.log('   Open browser console on your site and run:');
console.log('   console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);');
console.log('   fetch("/api/v1/health").then(r=>r.json()).then(console.log);');
