# URGENT: Fix Emails on Production (Render)

## The Problem
- Emails work locally (we tested successfully)
- Emails NOT working on your live site (gleam.co.zw)
- **Reason**: Render doesn't have the email environment variables set yet

## The Solution (5 minutes)

### Step 1: Go to Render Dashboard
1. Open https://dashboard.render.com
2. Log in to your account
3. Click on your **backend service** (the Node.js API)

### Step 2: Add Environment Variables
1. Click the **"Environment"** tab on the left
2. Click **"Add Environment Variable"** for each of these:

```
SMTP_HOST=mail.cresciotech.co.zw
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=sales@gleam.co.zw
SMTP_PASSWORD=God1sGood2025
EMAIL_FROM=sales@gleam.co.zw
ADMIN_EMAIL=sales@gleam.co.zw
```

**Important Notes:**
- Enter each variable separately
- No quotes around the values
- Make sure SMTP_PORT is exactly `465` (not 587 or 993)
- Make sure SMTP_SECURE is exactly `true` (not false)

### Step 3: Save and Redeploy
1. After adding all variables, click **"Save Changes"**
2. Render will automatically redeploy your service
3. Wait 2-3 minutes for the deployment to complete
4. Look for "Live" status with a green checkmark

### Step 4: Test on Live Site
1. Go to https://gleam.co.zw/contact
2. Fill out the contact form with your email
3. Submit it
4. **Check your inbox** at sales@gleam.co.zw
5. You should receive the contact notification

Then test newsletter:
1. Go to https://gleam.co.zw (homepage)
2. Find the newsletter signup (footer)
3. Enter a test email address
4. Subscribe
5. **Check that email's inbox** for the welcome message

## How to Check Render Logs

If emails still don't work after adding variables:

1. Go to your service on Render
2. Click **"Logs"** tab
3. Look for these messages:
   - `Contact notification sent: <message_id>` ✅ Success
   - `Welcome email sent: <message_id>` ✅ Success
   - `Error sending contact notification:` ❌ Error
   - `Error sending welcome email:` ❌ Error

## Current Status

✅ **Local Backend**: Emails working (tested successfully)
❌ **Render Backend**: Missing environment variables

## What Happens Next

Once you add the environment variables to Render:
1. Contact form submissions → Email notification to sales@gleam.co.zw
2. Newsletter subscriptions → Welcome email to subscriber
3. All contacts/subscribers still saved in database (even if email fails)

## Screenshot Checklist

When adding variables in Render, it should look like this:

```
Key                    Value
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SMTP_HOST              mail.cresciotech.co.zw
SMTP_PORT              465
SMTP_SECURE            true
SMTP_USER              sales@gleam.co.zw
SMTP_PASSWORD          God1sGood2025
EMAIL_FROM             sales@gleam.co.zw
ADMIN_EMAIL            sales@gleam.co.zw
```

## Need Help?

If you need me to walk you through the Render dashboard, let me know and I can provide more detailed screenshots or instructions.
