# Admin Contact Management System

## Overview
The admin contact management system allows administrators to view, manage, and respond to customer contact form submissions through a dedicated admin interface.

## Features

### 📧 **Contact Dashboard**
- View all contact form submissions in a paginated table
- Filter contacts by status (Pending, In Progress, Resolved)
- Filter contacts by subject category
- Search and sort functionality
- Real-time status updates

### 📊 **Contact Management**
- **View Details**: Click on any contact to see full message details
- **Update Status**: Change contact status from pending → in-progress → resolved
- **Delete Messages**: Remove spam or irrelevant messages
- **Responsive Design**: Works on desktop and mobile devices

### 🎯 **Status Tracking**
- **Pending**: New messages awaiting review (Yellow badge)
- **In Progress**: Messages currently being handled (Blue badge)
- **Resolved**: Completed/responded messages (Green badge)

## Access

### Navigation
1. **Admin Dashboard**: Go to `/admin/dashboard`
2. **Contacts Tab**: Click on the "Contacts" tab
3. **Full Management**: Click "Manage Contacts" button to go to `/admin/contacts`

### Authentication
- Requires admin login
- Protected routes with authentication middleware
- Automatic redirect to login if not authenticated

## Interface Features

### Main Contact List
- **Contact Info**: Name, email, phone (if provided)
- **Subject**: Categorized inquiry type with message preview
- **Status Badge**: Visual status indicator
- **Date**: When the message was submitted
- **Quick Actions**: View, update status, delete

### Contact Detail Modal
- **Full Contact Information**: Complete contact details
- **Full Message**: Complete message content with proper formatting
- **Status Management**: Update status directly from modal
- **Action Buttons**: Delete or close modal

### Filters & Pagination
- **Status Filter**: Filter by pending, in-progress, or resolved
- **Subject Filter**: Filter by inquiry type (general, order, delivery, etc.)
- **Items Per Page**: Choose 10, 25, or 50 items per page
- **Page Navigation**: Previous/Next with page numbers

## Email Integration

### Automatic Notifications
When a contact form is submitted:
1. **Admin Notification**: Email sent to admin with contact details
2. **User Confirmation**: Email sent to user confirming receipt
3. **Database Storage**: Message stored for admin management

### Email Status
- Email sending happens in background (non-blocking)
- Contact form submission succeeds even if emails fail
- Email success/failure logged in server console

## Technical Details

### API Endpoints
- `GET /api/contacts` - Get all contacts (paginated, filterable)
- `GET /api/contacts/:id` - Get single contact
- `PUT /api/contacts/:id` - Update contact status
- `DELETE /api/contacts/:id` - Delete contact

### Frontend Components
- `ContactManagement.tsx` - Main contact management page
- `AdminDashboard.tsx` - Updated to include contacts tab
- `contactService.ts` - API service for contact operations

### Data Model
```typescript
interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: 'general' | 'order' | 'delivery' | 'feedback' | 'partnership' | 'other';
  message: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}
```

## Best Practices

### Response Management
1. **Prioritize by Status**: Handle pending messages first
2. **Use Status Updates**: Move through pending → in-progress → resolved
3. **Regular Cleanup**: Delete spam/irrelevant messages
4. **Response Tracking**: Use status to track response progress

### Customer Service
- Respond to inquiries within 24-48 hours
- Update status when taking action
- Keep resolved messages for reference
- Use subject categories to prioritize urgent issues

## Usage Examples

### Daily Workflow
1. **Login** to admin dashboard
2. **Check Contacts** tab for new messages
3. **Review Pending** messages first
4. **Update Status** to "in-progress" when handling
5. **Mark Resolved** when completed

### Filtering Examples
- **All Pending Orders**: Status = Pending, Subject = Order Support
- **This Week's Feedback**: Status = All, Subject = Feedback
- **Resolved Partnerships**: Status = Resolved, Subject = Partnership

## Troubleshooting

### Common Issues
1. **Not Loading**: Check admin authentication
2. **Empty List**: Verify API connection and data
3. **Status Not Updating**: Check network and refresh page
4. **Emails Not Sending**: Check email configuration in backend

### Support
- Check browser console for errors
- Verify backend server is running
- Ensure admin token is valid
- Contact system administrator for access issues
