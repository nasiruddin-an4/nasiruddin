import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Create a new contact submission
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Create new contact
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });
    
    // In demo mode, we'll just simulate a successful submission
    if (!process.env.MONGODB_URI) {
      console.log('Contact submission (demo mode):', contact);
      return res.status(201).json({ 
        message: 'Message sent successfully (demo mode)',
        contact: {
          ...contact._doc,
          _id: 'demo-id-' + Date.now() 
        }
      });
    }
    
    // Save to database
    const savedContact = await contact.save();
    
    res.status(201).json({ 
      message: 'Message sent successfully',
      contact: savedContact
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions
// @access  Private (should be protected in production)
router.get('/', async (req, res) => {
  try {
    // In demo mode, return dummy data
    if (!process.env.MONGODB_URI) {
      return res.json([
        {
          _id: 'demo-id-1',
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Project Inquiry',
          message: 'Hi Nasir, I would like to discuss a potential project with you.',
          read: true,
          createdAt: new Date().toISOString()
        },
        {
          _id: 'demo-id-2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          subject: 'Collaboration Opportunity',
          message: 'Hello, I came across your portfolio and was impressed by your work.',
          read: false,
          createdAt: new Date().toISOString()
        }
      ]);
    }
    
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/contact/:id
// @desc    Mark contact as read
// @access  Private (should be protected in production)
router.put('/:id', async (req, res) => {
  try {
    // In demo mode, return success
    if (!process.env.MONGODB_URI) {
      return res.json({ 
        message: 'Contact updated successfully (demo mode)',
        contact: {
          _id: req.params.id,
          read: true
        }
      });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete a contact
// @access  Private (should be protected in production)
router.delete('/:id', async (req, res) => {
  try {
    // In demo mode, return success
    if (!process.env.MONGODB_URI) {
      return res.json({ 
        message: 'Contact deleted successfully (demo mode)'
      });
    }
    
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;