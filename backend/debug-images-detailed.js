const fs = require('fs');
const path = require('path');

console.log('=== IMAGE DEBUG SCRIPT ===\n');

// Check uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
console.log('1. Checking uploads directory...');
console.log('   Path:', uploadsDir);
console.log('   Exists:', fs.existsSync(uploadsDir));

if (fs.existsSync(uploadsDir)) {
  const files = fs.readdirSync(uploadsDir);
  console.log('   Files count:', files.length);
  
  if (files.length > 0) {
    console.log('\n2. Sample files:');
    files.slice(0, 5).forEach((file, index) => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      console.log(`   ${index + 1}. ${file}`);
      console.log(`      Size: ${stats.size} bytes`);
      console.log(`      Modified: ${stats.mtime}`);
      console.log(`      URL paths to test:`);
      console.log(`        - http://localhost:5000/uploads/${file}`);
      console.log(`        - http://localhost:5000/v1/uploads/${file}`);
      console.log(`        - http://localhost:5000/api/uploads/${file}`);
      console.log('');
    });
  }
} else {
  console.log('   ERROR: Uploads directory does not exist!');
}

// Test with sample products data
console.log('\n3. Environment check:');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'undefined');
console.log('   PORT:', process.env.PORT || '5000 (default)');
console.log('   FRONTEND_URL:', process.env.FRONTEND_URL || 'undefined');

console.log('\n4. Suggested fixes:');
console.log('   - Ensure backend server is running on port 5000');
console.log('   - Test image URLs directly in browser');
console.log('   - Check CORS settings in server.js');
console.log('   - Verify NGINX proxy configuration (production only)');
console.log('   - Check Next.js environment variables');
