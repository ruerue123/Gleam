import Contact from '../models/Contact.js';
import { sendContactNotification } from '../utils/sendEmail.js';

/**
 * @desc    Create new contact submission
 * @route   POST /api/contact
 * @access  Public
 */
export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Please provide name, email, and message'
      });
    }

    // Create contact record
    const contact = await Contact.create({
      name,
      email,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent')
    });

    // Send email notification to admin (don't wait for it)
    sendContactNotification({ name, email, message })
      .then(result => {
        if (result.success) {
          console.log('Contact notification sent successfully');
        } else {
          console.error('Failed to send contact notification:', result.error);
        }
      })
      .catch(err => console.error('Error in sendContactNotification:', err));

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
};

/**
 * @desc    Get all contact submissions
 * @route   GET /api/contact
 * @access  Private/Admin
 */
export const getContacts = async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;

    const query = status ? { status } : {};

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      message: 'Failed to fetch contact submissions'
    });
  }
};

/**
 * @desc    Get single contact submission
 * @route   GET /api/contact/:id
 * @access  Private/Admin
 */
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      message: 'Failed to fetch contact submission'
    });
  }
};

/**
 * @desc    Update contact status/notes
 * @route   PUT /api/contact/:id
 * @access  Private/Admin
 */
export const updateContact = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact submission not found'
      });
    }

    if (status) contact.status = status;
    if (adminNotes !== undefined) contact.adminNotes = adminNotes;

    await contact.save();

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      message: 'Failed to update contact submission'
    });
  }
};

/**
 * @desc    Delete contact submission
 * @route   DELETE /api/contact/:id
 * @access  Private/Admin
 */
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact submission not found'
      });
    }

    await contact.deleteOne();

    res.json({
      success: true,
      message: 'Contact submission deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      message: 'Failed to delete contact submission'
    });
  }
};

/**
 * @desc    Get contact statistics
 * @route   GET /api/contact/stats
 * @access  Private/Admin
 */
export const getContactStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: 'new' });
    const readCount = await Contact.countDocuments({ status: 'read' });
    const respondedCount = await Contact.countDocuments({ status: 'responded' });

    res.json({
      success: true,
      data: {
        total,
        new: newCount,
        read: readCount,
        responded: respondedCount
      }
    });
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      message: 'Failed to fetch contact statistics'
    });
  }
};
