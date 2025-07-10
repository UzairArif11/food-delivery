# Email Setup for Contact Form

## Overview
The contact form now includes automatic email notifications using Nodemailer. When a user submits the contact form, two emails are sent:

1. **Admin Notification**: Sent to the admin email with the contact form details
2. **User Confirmation**: Sent to the user confirming their message was received

## Features

### Admin Notification Email
- Contains all contact form details (name, email, phone, subject, message)
- Professional HTML formatting
- Timestamp of submission
- Sent to the configured admin email address

### User Confirmation Email
- Personalized thank you message
- Summary of their submitted message
- Information about response timeframes
- Professional branding

## Configuration

### Environment Variables
The following environment variables need to be set in your `.env` file:

```env
# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=admin@yourcompany.com
NODE_ENV=production

# For development/testing (uses Ethereal Email)
NODE_ENV=development
```

### Gmail Setup (Production)
For production use with Gmail:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASSWORD`

### Development Setup
For development/testing, the system uses Ethereal Email (fake SMTP service):
- Set `NODE_ENV=development`
- Preview URLs will be provided in console logs
- No real emails are sent

## Implementation Details

### Backend Changes
1. **Added nodemailer dependency**
   ```bash
   npm install nodemailer
   ```

2. **Created email service** (`utils/emailService.js`)
   - Handles transporter configuration
   - Template generation for both email types
   - Error handling and logging

3. **Updated contact controller**
   - Integrated email sending into contact creation
   - Non-blocking email sending (doesn't affect API response)
   - Proper error handling

### Frontend Changes
1. **Fixed API response handling**
   - Updated contact service to properly handle API responses
   - Improved error handling in API service
   - Better user feedback

## Usage

### Testing Email Functionality
Run the test script to verify email setup:
```bash
cd backend
node test-email.js
```

### API Endpoint
The contact form API endpoint remains the same:
```
POST /api/contacts
```

Response includes confirmation that emails will be sent:
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon. A confirmation email has been sent to your email address.",
  "data": {
    "id": "contact_id",
    "name": "User Name",
    "email": "user@example.com",
    "subject": "general",
    "createdAt": "2025-01-10T13:30:00.000Z"
  }
}
```

## Email Templates

### Admin Notification Template
- Clean, professional design
- Contact details in a structured table
- Full message content preserved
- Responsive HTML layout

### User Confirmation Template
- Branded thank you message
- Message summary for user reference
- Next steps information
- Contact information for urgent issues

## Security Considerations

1. **App Passwords**: Use Gmail App Passwords instead of regular passwords
2. **Environment Variables**: Keep email credentials in environment variables
3. **Error Handling**: Email failures don't affect contact form submission
4. **Rate Limiting**: Consider implementing rate limiting for contact form submissions

## Troubleshooting

### Common Issues

1. **Authentication Error**
   - Verify Gmail App Password is correct
   - Ensure 2FA is enabled on Gmail account

2. **Connection Timeout**
   - Check network connectivity
   - Verify SMTP settings

3. **Emails Not Received**
   - Check spam/junk folders
   - Verify recipient email addresses
   - Check console logs for errors

### Debugging
Enable debug logging by checking console output when emails are sent. The system logs:
- Email send attempts
- Success/failure status
- Preview URLs (development mode)
- Error details

## Future Enhancements

Potential improvements:
1. Email templates with more customization
2. Email queue for better performance
3. Email analytics and tracking
4. Multiple admin notification recipients
5. Email preferences for users
6. Rich text/HTML email composer for admins
