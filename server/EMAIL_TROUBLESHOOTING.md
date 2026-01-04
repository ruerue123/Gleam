# Email Troubleshooting Guide

## Issue: Emails Not Being Sent

### Why This Happens

The Gleam Candles application sends emails for:
1. **Contact form notifications** - sent to `sales@gleam.co.zw` when someone submits the contact form
2. **Welcome emails** - sent to users who subscribe to the newsletter

### Common Causes

#### 1. **SMTP Ports Blocked (Most Common in Development)**

Many ISPs and networks block outbound SMTP ports (25, 465, 587) to prevent spam. This is especially common when testing locally.

**Symptoms:**
- Connection timeout errors
- `ETIMEDOUT` or `ESOCKET` errors in server logs
- Emails don't send, but contacts/subscriptions are saved to database

**Solution:**
- ✅ **The app is designed to work without email!** Contact submissions and subscriptions are always saved to the database, even if emails fail.
- In development, check the admin portal to see contacts and subscribers
- Emails will work fine in production where SMTP ports are not blocked

#### 2. **Incorrect SMTP Configuration**

**Check your `.env` file has the correct settings:**

```env
SMTP_HOST=mail.gleam.co.zw
SMTP_PORT=587                    # Use 587 for TLS, or 465 for SSL
SMTP_SECURE=false                # false for port 587, true for port 465
SMTP_USER=sales@gleam.co.zw
SMTP_PASSWORD=your_password_here
EMAIL_FROM=sales@gleam.co.zw
ADMIN_EMAIL=sales@gleam.co.zw
```

**Common port configurations:**
- **Port 587** (STARTTLS): `SMTP_PORT=587` and `SMTP_SECURE=false`
- **Port 465** (SSL/TLS): `SMTP_PORT=465` and `SMTP_SECURE=true`
- **Port 25** (Plain): Usually blocked by ISPs, not recommended

#### 3. **Incorrect Email Password**

Make sure you're using the correct email account password. For cPanel email:
- Log into your cPanel
- Go to Email Accounts
- Verify the password for `sales@gleam.co.zw`

## Testing Email Configuration

We've included a test script to debug email issues:

```bash
cd server
node testEmail3.js
```

This will try different port configurations and tell you which one works.

## Production Deployment

### Vercel/Netlify Deployment

Make sure to set these environment variables in your hosting platform:

```
SMTP_HOST=mail.gleam.co.zw
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=sales@gleam.co.zw
SMTP_PASSWORD=your_actual_password
EMAIL_FROM=sales@gleam.co.zw
ADMIN_EMAIL=sales@gleam.co.zw
```

### Checking if Emails Work in Production

1. Deploy your application
2. Submit a test contact form
3. Check `sales@gleam.co.zw` inbox for the notification
4. Subscribe to the newsletter with a test email
5. Check that test email's inbox for the welcome message

## Alternative Email Services

If cPanel email continues to have issues, consider using dedicated email services:

### 1. SendGrid (Recommended)
- Free tier: 100 emails/day
- Very reliable
- Easy setup

```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_api_key
```

### 2. Mailgun
- Free tier: 5,000 emails/month
- Good for transactional emails

### 3. AWS SES
- Very cheap
- Requires AWS account

## Checking Email Logs

The application logs email attempts. Check server logs for:

```
Contact notification sent: <message_id>
Welcome email sent: <message_id>
```

Or for errors:

```
Error sending contact notification: <error message>
Error sending welcome email: <error message>
```

## Current Implementation

The app gracefully handles email failures:

1. **Contact Form:**
   - ✅ Always saves to database
   - Tries to send email to admin
   - Shows success message to user regardless of email status
   - Admin can view in portal even if email fails

2. **Newsletter Subscription:**
   - ✅ Always saves to database
   - Tries to send welcome email
   - Shows success message to user regardless of email status
   - User is subscribed even if email fails

This means your application works perfectly even if emails are temporarily unavailable!

## Need Help?

If you're still having issues:

1. Check server logs for specific error messages
2. Verify the email account exists and password is correct in cPanel
3. Try the test script: `node testEmail3.js`
4. Consider using SendGrid for more reliable delivery
5. Remember: The app works fine without email - contacts and subscriptions are always saved!
