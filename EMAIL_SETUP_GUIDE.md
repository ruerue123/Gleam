# Email Configuration Guide for Gleam Candles

This guide will help you set up email functionality for the Gleam Candles website.

## Overview

The backend sends two types of emails:
1. **Contact Form Notifications** - Sent to sales@gleam.co.zw when customers submit the contact form
2. **Welcome Emails** - Sent to customers when they subscribe to the newsletter

## Option 1: Gmail (Recommended for Development/Small Scale)

### Prerequisites
- Gmail account
- 2-Step Verification enabled

### Setup Steps

1. **Enable 2-Step Verification**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Click on "2-Step Verification"
   - Follow the prompts to enable it

2. **Generate App Password**
   - Still in [Google Account Security](https://myaccount.google.com/security)
   - Scroll to "App passwords"
   - Select app: **Mail**
   - Select device: **Other (Custom name)**
   - Enter name: "Gleam Candles API"
   - Click **Generate**
   - Copy the 16-character password (you won't see it again!)

3. **Configure Environment Variables**
   
   In your `server/.env` file:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # The 16-char app password
   EMAIL_FROM=noreply@gleam.co.zw
   ADMIN_EMAIL=sales@gleam.co.zw
   ```

4. **Test the Configuration**
   ```bash
   # Start your backend server
   cd server
   npm run dev
   
   # In another terminal, test contact form
   curl -X POST http://localhost:5000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
   
   # Check your email inbox for the notification
   ```

## Option 2: SMTP (For Production/Custom Domain)

If you have a custom email server or using services like SendGrid, Mailgun, etc.

### SendGrid Example

1. **Sign up for SendGrid**
   - Visit [SendGrid](https://sendgrid.com/)
   - Create a free account (100 emails/day)

2. **Create API Key**
   - Go to Settings → API Keys
   - Create API Key
   - Select "Restricted Access"
   - Enable "Mail Send" permission
   - Copy the API key

3. **Configure Environment Variables**
   ```env
   # Comment out or remove Gmail settings
   # EMAIL_SERVICE=gmail
   
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASSWORD=SG.your_api_key_here
   EMAIL_FROM=noreply@gleam.co.zw
   ADMIN_EMAIL=sales@gleam.co.zw
   ```

### Mailgun Example

1. **Sign up for Mailgun**
   - Visit [Mailgun](https://www.mailgun.com/)
   - Create account

2. **Get SMTP Credentials**
   - Go to Sending → Domain settings
   - Find SMTP credentials section
   - Copy Host, Port, Username, and Password

3. **Configure Environment Variables**
   ```env
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=postmaster@your-domain.mailgun.org
   SMTP_PASSWORD=your_mailgun_password
   EMAIL_FROM=noreply@gleam.co.zw
   ADMIN_EMAIL=sales@gleam.co.zw
   ```

## Troubleshooting

### Emails Not Sending

**Problem:** No emails arrive in inbox

**Solutions:**
1. Check spam/junk folder
2. Verify EMAIL_USER and EMAIL_PASSWORD are correct
3. For Gmail:
   - Ensure 2-Step Verification is enabled
   - Use App Password, not your regular password
   - Check "Less secure app access" is OFF (App Passwords are more secure)
4. Check server logs for error messages

### Gmail "Less secure apps" Error

**Problem:** Gmail blocks login attempts

**Solution:** This is because you're not using an App Password. Follow the Gmail setup steps above to generate an App Password.

### SMTP Connection Timeout

**Problem:** Connection timeout when sending email

**Solutions:**
1. Check firewall settings (port 587 or 465 should be open)
2. Verify SMTP_HOST and SMTP_PORT are correct
3. Check internet connection
4. Try SMTP_PORT=465 with SMTP_SECURE=true

### "Invalid login" Error

**Problem:** Authentication fails

**Solutions:**
1. Double-check username and password
2. For Gmail, ensure you're using App Password
3. For SMTP, verify credentials from your email provider

## Testing Email Functionality

### Test Contact Form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I would like to inquire about custom candles for my event."
  }'
```

Expected: Email sent to ADMIN_EMAIL with the contact details.

### Test Newsletter Subscription

```bash
curl -X POST http://localhost:5000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "subscriber@example.com"
  }'
```

Expected: Welcome email sent to subscriber@example.com

## Production Recommendations

1. **Use a Dedicated Email Service**
   - SendGrid (99.95% deliverability)
   - Mailgun (Good for transactional emails)
   - Amazon SES (Cheap, reliable)
   - Postmark (Great for newsletters)

2. **Set up SPF and DKIM**
   - Improves email deliverability
   - Reduces spam classification
   - Follow your email service provider's guide

3. **Monitor Email Sending**
   - Track delivery rates
   - Monitor bounce rates
   - Check spam reports

4. **Implement Rate Limiting**
   - Prevent abuse of contact form
   - Limit newsletter signups per IP

5. **Add Email Queue** (for high volume)
   - Use Bull or BullMQ
   - Retry failed sends
   - Better error handling

## Email Templates

Email templates are located in:
```
server/src/utils/sendEmail.js
```

To customize:
1. Edit the HTML templates in the file
2. Test with real emails
3. Check rendering in different email clients (Gmail, Outlook, etc.)

## Support

If you encounter issues:
1. Check server logs: `npm run dev` shows detailed error messages
2. Enable debug mode in nodemailer (add to sendEmail.js):
   ```javascript
   const transporter = nodemailer.createTransporter({
     // ... existing config
     debug: true,
     logger: true
   });
   ```
3. Contact: sales@gleam.co.zw

## Security Best Practices

1. Never commit `.env` file to version control
2. Use strong, unique passwords
3. Rotate App Passwords periodically
4. Monitor for suspicious email activity
5. Implement CAPTCHA on contact form (future enhancement)

---

**Last Updated:** January 2026  
**For:** Gleam Candles E-commerce Platform
