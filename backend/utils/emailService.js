const nodemailer = require('nodemailer');

// Create transporter based on environment
const createTransporter = () => {
  if (process.env.NODE_ENV === 'production') {
    // Production configuration (using Gmail as example)
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  } else {
    // Development configuration (using Ethereal Email for testing)
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER || 'ethereal.user@ethereal.email',
        pass: process.env.EMAIL_PASSWORD || 'ethereal.pass'
      }
    });
  }
};

// Send email notification to admin when contact form is submitted
const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Food Delivery App" <${process.env.EMAIL_USER || 'noreply@fooddelivery.com'}>`,
      to: process.env.ADMIN_EMAIL || 'admin@fooddelivery.com',
      subject: `New Contact Form Submission - ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center; margin-bottom: 30px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #333;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${contactData.email}</td>
              </tr>
              ${contactData.phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Phone:</td>
                <td style="padding: 8px 0; color: #333;">${contactData.phone}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Subject:</td>
                <td style="padding: 8px 0; color: #333; text-transform: capitalize;">${contactData.subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Date:</td>
                <td style="padding: 8px 0; color: #333;">${new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${contactData.message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              This email was automatically generated from your Food Delivery App contact form.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact notification email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info) // Only works with Ethereal Email
    };
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Send confirmation email to the user who submitted the contact form
const sendContactConfirmation = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Food Delivery App" <${process.env.EMAIL_USER || 'noreply@fooddelivery.com'}>`,
      to: contactData.email,
      subject: 'Thank you for contacting us!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #28a745; margin: 0;">Thank You!</h1>
            <p style="color: #6c757d; font-size: 18px; margin: 10px 0 0 0;">We've received your message</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${contactData.name},</h2>
            <p style="color: #495057; line-height: 1.6;">
              Thank you for reaching out to us! We have received your message regarding 
              "<strong>${contactData.subject}</strong>" and our team will get back to you within 24-48 hours.
            </p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #495057; margin-top: 0;">Your Message Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057; width: 100px;">Subject:</td>
                <td style="padding: 8px 0; color: #333; text-transform: capitalize;">${contactData.subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #495057;">Date:</td>
                <td style="padding: 8px 0; color: #333;">${new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}</td>
              </tr>
            </table>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
              <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${contactData.message}</p>
            </div>
          </div>
          
          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1976d2; margin-top: 0;">What happens next?</h3>
            <ul style="color: #495057; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>Our team will review your message</li>
              <li>We'll respond within 24-48 hours</li>
              <li>If urgent, please call us directly at (555) 123-4567</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              Best regards,<br>
              <strong>Food Delivery Team</strong>
            </p>
            <p style="color: #6c757d; font-size: 12px; margin: 15px 0 0 0;">
              This is an automated confirmation email. Please do not reply to this email.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact confirmation email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info) // Only works with Ethereal Email
    };
  } catch (error) {
    console.error('Error sending contact confirmation email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  sendContactNotification,
  sendContactConfirmation
};
