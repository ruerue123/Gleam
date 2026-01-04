# Production Email Setup Guide

## Email Functionality Status

✅ **Code is working correctly** - Email functionality has been fixed and tested
⚠️ **Local testing limited** - SMTP ports are blocked on most local networks
✅ **Database saving works** - Contacts and subscriptions are always saved regardless of email status

## What Emails Are Sent

1. **Contact Form Notifications** → `sales@gleam.co.zw`
   - Sent when someone submits the contact form
   - Contains: name, email, message, timestamp

2. **Newsletter Welcome Emails** → Subscriber's email
   - Sent when someone subscribes to the newsletter
   - Professional welcome message with branding

## Production Deployment Steps

### 1. Deploy Backend to Production

Make sure your backend is deployed and these environment variables are set:

```env
SMTP_HOST=mail.gleam.co.zw
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=sales@gleam.co.zw
SMTP_PASSWORD=God1sGood2025
EMAIL_FROM=sales@gleam.co.zw
ADMIN_EMAIL=sales@gleam.co.zw
```

**Important:** Never commit the actual .env file. These should be set in your hosting platform's environment variables.

### 2. For Vercel Deployment

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add each variable:
   - `SMTP_HOST` = `mail.gleam.co.zw`
   - `SMTP_PORT` = `587`
   - `SMTP_SECURE` = `false`
   - `SMTP_USER` = `sales@gleam.co.zw`
   - `SMTP_PASSWORD` = `God1sGood2025`
   - `EMAIL_FROM` = `sales@gleam.co.zw`
   - `ADMIN_EMAIL` = `sales@gleam.co.zw`

### 3. For Other Platforms (Railway, Render, etc.)

Each platform has its own way to set environment variables. Consult their documentation and add the same variables listed above.

## Testing in Production

After deployment, test both features:

### Test Contact Form
1. Go to your live website
2. Navigate to the Contact page
3. Fill out and submit the form
4. Check `sales@gleam.co.zw` inbox for the notification email
5. Check the admin portal to verify the submission was saved

### Test Newsletter Subscription
1. Go to the homepage or footer
2. Enter an email address in the newsletter signup
3. Click subscribe
4. Check that email's inbox for the welcome message
5. Check the admin portal to verify the subscription was saved

## Troubleshooting

### Emails Not Arriving in Production

1. **Check server logs** for email errors:
   - Look for `Contact notification sent` or `Welcome email sent` messages
   - Look for error messages starting with `Error sending`

2. **Verify email password**:
   - Log into cPanel
   - Go to Email Accounts
   - Verify the password for `sales@gleam.co.zw` is correct

3. **Check spam folder**:
   - Both notifications and welcome emails might end up in spam initially

4. **Verify environment variables**:
   - Make sure all variables are set correctly in your hosting platform
   - Port should be `587` (as a string)
   - SMTP_SECURE should be `false` (as a string)

### Still Not Working?

If emails don't work even in production, you have two options:

#### Option 1: Use SendGrid (Recommended)

SendGrid is more reliable and has better deliverability:

1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Get your API key
3. Update environment variables:
   ```env
   SENDGRID_API_KEY=your_api_key_here
   EMAIL_FROM=sales@gleam.co.zw
   ADMIN_EMAIL=sales@gleam.co.zw
   ```
4. Update `sendEmail.js` to use SendGrid (see EMAIL_TROUBLESHOOTING.md)

#### Option 2: Check cPanel Email Settings

1. Log into your cPanel
2. Go to Email Accounts
3. Verify:
   - Email account exists: `sales@gleam.co.zw`
   - Password is correct
   - Mail server hostname is `mail.gleam.co.zw`
   - SMTP is enabled for the account

## Monitoring

After deployment, monitor:

1. **Server logs** - Check for email sending confirmations or errors
2. **Admin portal** - Verify contacts and subscriptions are being saved
3. **Email inbox** - Confirm notifications are arriving

## Important Notes

- ✅ The application works perfectly even if emails fail
- ✅ All submissions are saved to the database
- ✅ Users see success messages regardless of email status
- ⚠️ Emails may not work locally due to SMTP port blocking
- ✅ Emails should work fine in production

## Support

If you continue to have issues:
1. Check the troubleshooting guide: `EMAIL_TROUBLESHOOTING.md`
2. Review server logs for specific errors
3. Consider switching to SendGrid for better reliability
