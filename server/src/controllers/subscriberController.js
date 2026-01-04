import Subscriber from '../models/Subscriber.js';
import { sendWelcomeEmail } from '../utils/sendEmail.js';

/**
 * @desc    Subscribe to newsletter
 * @route   POST /api/subscribe
 * @access  Public
 */
export const subscribe = async (req, res) => {
  try {
    const { email, source = 'footer' } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        message: 'Please provide an email address'
      });
    }

    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return res.status(400).json({
          message: 'This email is already subscribed to our newsletter'
        });
      } else {
        // Reactivate subscription
        existingSubscriber.status = 'active';
        existingSubscriber.subscribedAt = new Date();
        existingSubscriber.unsubscribedAt = null;
        existingSubscriber.source = source;
        await existingSubscriber.save();

        // Send welcome email (don't wait for it)
        sendWelcomeEmail(email)
          .then(result => {
            if (result.success) {
              console.log('Welcome email sent to:', email);
            } else {
              console.error('Failed to send welcome email:', result.error);
            }
          })
          .catch(err => console.error('Error in sendWelcomeEmail:', err));

        return res.status(200).json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.'
        });
      }
    }

    // Create new subscriber
    const subscriber = await Subscriber.create({
      email,
      source,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent')
    });

    // Send welcome email (don't wait for it)
    sendWelcomeEmail(email)
      .then(result => {
        if (result.success) {
          console.log('Welcome email sent to:', email);
        } else {
          console.error('Failed to send welcome email:', result.error);
        }
      })
      .catch(err => console.error('Error in sendWelcomeEmail:', err));

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! Check your email for a welcome message.',
      data: {
        email: subscriber.email,
        subscribedAt: subscriber.subscribedAt
      }
    });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({
      message: 'Failed to subscribe. Please try again later.'
    });
  }
};

/**
 * @desc    Unsubscribe from newsletter
 * @route   POST /api/subscribe/unsubscribe
 * @access  Public
 */
export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'Please provide an email address'
      });
    }

    const subscriber = await Subscriber.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        message: 'Email not found in our subscriber list'
      });
    }

    if (subscriber.status === 'unsubscribed') {
      return res.status(400).json({
        message: 'This email is already unsubscribed'
      });
    }

    subscriber.status = 'unsubscribed';
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.'
    });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).json({
      message: 'Failed to unsubscribe. Please try again later.'
    });
  }
};

/**
 * @desc    Get all subscribers
 * @route   GET /api/subscribe
 * @access  Private/Admin
 */
export const getSubscribers = async (req, res) => {
  try {
    const { status, limit = 100, page = 1 } = req.query;

    const query = status ? { status } : {};

    const subscribers = await Subscriber.find(query)
      .sort({ subscribedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Subscriber.countDocuments(query);

    res.json({
      success: true,
      data: subscribers,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({
      message: 'Failed to fetch subscribers'
    });
  }
};

/**
 * @desc    Get subscriber statistics
 * @route   GET /api/subscribe/stats
 * @access  Private/Admin
 */
export const getSubscriberStats = async (req, res) => {
  try {
    const total = await Subscriber.countDocuments();
    const activeCount = await Subscriber.countDocuments({ status: 'active' });
    const unsubscribedCount = await Subscriber.countDocuments({ status: 'unsubscribed' });

    // Get growth stats (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentSubscribers = await Subscriber.countDocuments({
      subscribedAt: { $gte: thirtyDaysAgo },
      status: 'active'
    });

    res.json({
      success: true,
      data: {
        total,
        active: activeCount,
        unsubscribed: unsubscribedCount,
        last30Days: recentSubscribers
      }
    });
  } catch (error) {
    console.error('Error fetching subscriber stats:', error);
    res.status(500).json({
      message: 'Failed to fetch subscriber statistics'
    });
  }
};

/**
 * @desc    Export subscribers (for email marketing)
 * @route   GET /api/subscribe/export
 * @access  Private/Admin
 */
export const exportSubscribers = async (req, res) => {
  try {
    const { status = 'active' } = req.query;

    const subscribers = await Subscriber.find({ status })
      .select('email subscribedAt')
      .sort({ subscribedAt: -1 });

    // Return as CSV format
    const csv = 'Email,Subscribed At\n' +
      subscribers.map(s => `${s.email},${s.subscribedAt.toISOString()}`).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=subscribers-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Error exporting subscribers:', error);
    res.status(500).json({
      message: 'Failed to export subscribers'
    });
  }
};

/**
 * @desc    Delete subscriber
 * @route   DELETE /api/subscribe/:id
 * @access  Private/Admin
 */
export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        message: 'Subscriber not found'
      });
    }

    await subscriber.deleteOne();

    res.json({
      success: true,
      message: 'Subscriber deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    res.status(500).json({
      message: 'Failed to delete subscriber'
    });
  }
};
