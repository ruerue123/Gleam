import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  // For production, use a service like SendGrid, Mailgun, or SMTP
  // For development, you can use mailtrap.io or ethereal.email

  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
      }
    });
  }

  // Default to SMTP configuration
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASSWORD || process.env.EMAIL_PASSWORD
    }
  });
};

/**
 * Send contact form notification to admin
 */
export const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Gleam Candles Website" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'sales@gleam.co.zw',
      subject: `New Contact Form Submission - ${contactData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8B7355; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #8B7355; }
            .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #8B7355; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${contactData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${contactData.email}">${contactData.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${contactData.message.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date().toLocaleString('en-US', { timeZone: 'Africa/Harare' })}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the Gleam Candles contact form at gleam.co.zw</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}

Message:
${contactData.message}

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Harare' })}
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending contact notification:', error);
    // Don't throw error - we still want to save the contact even if email fails
    return { success: false, error: error.message };
  }
};

/**
 * Send welcome email to new subscriber
 */
export const sendWelcomeEmail = async (email) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Gleam Candles" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Gleam Candles',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8B7355; color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .button { background: #8B7355; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Gleam</h1>
            </div>
            <div class="content">
              <p>Thank you for subscribing to our newsletter!</p>
              <p>You'll be the first to know about:</p>
              <ul>
                <li>New candle collections and scents</li>
                <li>Exclusive subscriber discounts</li>
                <li>Behind-the-scenes stories</li>
                <li>Limited edition releases</li>
              </ul>
              <p>We're so glad you're here.</p>
              <a href="https://gleam.co.zw/products" class="button">Shop Our Collections</a>
            </div>
            <div class="footer">
              <p>Handcrafted with intention in Harare, Zimbabwe</p>
              <p><a href="https://gleam.co.zw">gleam.co.zw</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to Gleam Candles!

Thank you for subscribing to our newsletter!

You'll be the first to know about:
- New candle collections and scents
- Exclusive subscriber discounts
- Behind-the-scenes stories
- Limited edition releases

We're so glad you're here.

Visit us at: https://gleam.co.zw/products

Handcrafted with intention in Harare, Zimbabwe
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

export default { sendContactNotification, sendWelcomeEmail };
