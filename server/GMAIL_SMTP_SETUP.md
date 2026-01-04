# Gmail SMTP Setup (For Local Testing Only)

If you want to test emails locally and your cPanel SMTP ports are blocked, you can temporarily use Gmail's SMTP server.

## Step 1: Get Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Go to **App Passwords** (search for "app passwords" in settings)
5. Select **Mail** and **Other (Custom name)**
6. Enter "Gleam Candles" as the name
7. Click **Generate**
8. Copy the 16-character password (it looks like: `xxxx xxxx xxxx xxxx`)

## Step 2: Update .env File

Temporarily change your .env file to use Gmail:

```env
# Comment out cPanel SMTP
# SMTP_HOST=mail.gleam.co.zw
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=sales@gleam.co.zw
# SMTP_PASSWORD=God1sGood2025

# Use Gmail SMTP for local testing
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASSWORD=your-app-password-here

# Keep these the same
EMAIL_FROM=sales@gleam.co.zw
ADMIN_EMAIL=sales@gleam.co.zw
```

## Step 3: Test

Restart your server and try:
- Contact form submission
- Newsletter subscription

Emails will be sent through Gmail but will appear to come from `sales@gleam.co.zw`.

## Step 4: Revert for Production

**IMPORTANT:** Before deploying to production, revert back to cPanel SMTP:

```env
SMTP_HOST=mail.gleam.co.zw
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=sales@gleam.co.zw
SMTP_PASSWORD=God1sGood2025
EMAIL_FROM=sales@gleam.co.zw
ADMIN_EMAIL=sales@gleam.co.zw
```

## Gmail Limitations

- **Sending limit:** 500 emails per day
- **For testing only:** Use your actual SMTP server in production
- **Deliverability:** Emails may go to spam when sent from Gmail with a different FROM address

## Production Recommendation

For production, stick with your cPanel SMTP (mail.gleam.co.zw) as configured. It will work fine when deployed - the port blocking only affects local development.
