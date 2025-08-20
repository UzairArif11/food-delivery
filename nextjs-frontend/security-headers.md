# Security Headers Configuration for Static Sites

Since this application uses `output: 'export'` for static site generation, security headers must be configured at the web server level instead of using Next.js middleware.

## Nginx Configuration

Add these headers to your nginx server block:

```nginx
server {
    listen 80;
    server_name  shangrilaresturant.com www. shangrilaresturant.com;
    
    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https:// shangrilaresturant.com;" always;
    
    # Static files location
    root /var/www/foodpanda/out;
    index index.html;
    
    # Handle static files
    location / {
        try_files $uri $uri.html $uri/ =404;
    }
    
    # Handle API requests (proxy to backend)
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Handle uploads (proxy to backend)
    location /uploads/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Apache Configuration (.htaccess)

If using Apache, add this to your `.htaccess` file in the root directory:

```apache
# Security Headers
Header always set X-Frame-Options "DENY"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-XSS-Protection "1; mode=block"

# Content Security Policy
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https:// shangrilaresturant.com;"

# Enable mod_rewrite
RewriteEngine On

# Handle static files with .html extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^.]+)$ $1.html [NC,L]
```

## Cloudflare Configuration

If using Cloudflare, you can add these headers through Transform Rules:

1. Go to Rules > Transform Rules
2. Create HTTP Response Header Modification Rule
3. Add these headers:
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `X-XSS-Protection: 1; mode=block`

## Vercel Configuration

If deploying to Vercel, create a `vercel.json` file:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## Security Headers Explanation

- **X-Frame-Options: DENY** - Prevents the page from being embedded in frames (clickjacking protection)
- **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
- **Referrer-Policy: strict-origin-when-cross-origin** - Controls referrer information
- **X-XSS-Protection: 1; mode=block** - Enables XSS filtering in older browsers
- **Content-Security-Policy** - Controls which resources can be loaded

## Testing Security Headers

After configuration, test your headers using:
- [securityheaders.com](https://securityheaders.com)
- [Mozilla Observatory](https://observatory.mozilla.org)

These tools will verify that your security headers are properly configured.
