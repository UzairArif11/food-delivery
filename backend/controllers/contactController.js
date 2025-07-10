const Contact = require('../models/Contact');
const { sendContactNotification, sendContactConfirmation } = require('../utils/emailService');

// @desc    Create a new contact message
// @route   POST /api/contacts
// @access  Public
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Create contact message
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

    await contact.save();
    
    // Send email notifications (don't let email failures affect the response)
    const emailPromises = [];
    
    // Send notification to admin
    emailPromises.push(
      sendContactNotification({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message
      }).catch(error => {
        console.error('Failed to send admin notification:', error);
        return { success: false, error: error.message };
      })
    );
    
    // Send confirmation to user
    emailPromises.push(
      sendContactConfirmation({
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message
      }).catch(error => {
        console.error('Failed to send user confirmation:', error);
        return { success: false, error: error.message };
      })
    );
    
    // Execute email sending in the background
    Promise.all(emailPromises).then(results => {
      const [adminResult, userResult] = results;
      
      if (adminResult.success) {
        console.log('Admin notification sent successfully');
        if (adminResult.previewUrl) {
          console.log('Preview URL:', adminResult.previewUrl);
        }
      }
      
      if (userResult.success) {
        console.log('User confirmation sent successfully');
        if (userResult.previewUrl) {
          console.log('Preview URL:', userResult.previewUrl);
        }
      }
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon. A confirmation email has been sent to your email address.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact creation error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contacts
// @access  Private/Admin
exports.getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const subject = req.query.subject;
    
    const query = {};
    if (status) query.status = status;
    if (subject) query.subject = subject;
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Get single contact message (Admin only)
// @route   GET /api/contacts/:id
// @access  Private/Admin
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contact message not found' 
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Update contact status (Admin only)
// @route   PUT /api/contacts/:id
// @access  Private/Admin
exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contact message not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Delete contact message (Admin only)
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contact message not found' 
      });
    }
    
    await contact.deleteOne();
    
    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};
