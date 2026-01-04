# Email Setup on Render

Your backend is deployed on Render. Here's how to configure emails properly.

## Step 1: Set Environment Variables on Render

1. Go to https://dashboard.render.com
2. Click on your backend service
3. Go to the **Environment** tab
4. Add these environment variables:

```
SMTP_HOST=mail.gleam.co.zw
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=sales@gleam.co.zw
SMTP_PASSWORD=God1sGood2025
EMAIL_FROM=sales@gleam.co.zw
ADMIN_EMAIL=sales@gleam.co.zw
```

**Important:** Make sure each variable is set as:
- Key: Variable name (e.g., `SMTP_PORT`)
- Value: The actual value (e.g., `587`)

## Step 2: Check Current Environment Variables

To verify what's currently set:

1. Go to your service on Render
2. Click **Environment** tab
3. Check if ALL the email variables are listed
4. If any are missing, click **Add Environment Variable** and add them

## Step 3: Redeploy

After adding/updating environment variables:

1. Click **Manual Deploy** → **Deploy latest commit**
2. Wait for the deployment to complete
3. Check the deploy logs for any errors

## Step 4: Test in Production

Once deployed, test the live site:

### Test Contact Form:
1. Go to your live website: https://gleam.co.zw/contact
2. Fill out the contact form
3. Submit
4. Check `sales@gleam.co.zw` inbox for the notification email

### Test Newsletter:
1. Go to your live website homepage
2. Find the newsletter signup (usually in footer)
3. Enter an email address
4. Subscribe
5. Check that email's inbox for the welcome message

## Step 5: Check Logs

If emails still don't work, check the Render logs:

1. Go to your service on Render
2. Click the **Logs** tab
3. Look for messages like:
   - `Contact notification sent: <message_id>` (success)
   - `Error sending contact notification: <error>` (failure)
   - `Welcome email sent: <message_id>` (success)
   - `Error sending welcome email: <error>` (failure)

## Troubleshooting

### Issue: Environment variables not showing

**Solution:**
- Add them manually in the Render dashboard
- Make sure there are no typos in variable names
- Values should NOT have quotes around them

### Issue: Emails still not sending

Check the logs for specific errors:

1. **"Connection timeout" or "ETIMEDOUT"**
   - Render's network might be blocking SMTP ports
   - Try using port 465 with SMTP_SECURE=true instead
   - Or switch to SendGrid (see below)

2. **"Authentication failed" or "EAUTH"**
   - Check the password is correct
   - Verify email account exists in cPanel

3. **No error in logs**
   - Email might be sent but going to spam
   - Check spam folder in `sales@gleam.co.zw`

## Alternative: Use SendGrid on Render

If Render blocks SMTP ports, use SendGrid instead:

### 1. Sign up for SendGrid
- Go to https://sendgrid.com
- Sign up for free account (100 emails/day)
- Create an API key

### 2. Update Environment Variables
Replace SMTP variables with:
```
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=sales@gleam.co.zw
ADMIN_EMAIL=sales@gleam.co.zw
```

### 3. Update sendEmail.js
See EMAIL_TROUBLESHOOTING.md for SendGrid integration code.

## Getting Your Render URL

Your backend URL is probably something like:
- `https://gleam-backend-xxxx.onrender.com`
- Or custom domain if configured

Make sure your frontend (gleam.co.zw) is pointing to the correct Render backend URL.

## Environment Variable Checklist

✅ **Required for Email:**
- SMTP_HOST
- SMTP_PORT
- SMTP_SECURE
- SMTP_USER
- SMTP_PASSWORD
- EMAIL_FROM
- ADMIN_EMAIL

✅ **Other Required Variables:**
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRE
- FRONTEND_URL (should be https://gleam.co.zw)
- NODE_ENV (should be "production")

## Next Steps

1. ✅ Set all environment variables on Render
2. ✅ Redeploy the service
3. ✅ Test contact form on live site
4. ✅ Test newsletter on live site
5. ✅ Check email inbox
6. ✅ Check Render logs if issues persist

## Need Help?

If you need to check what's deployed:
- **Service URL:** Check the Render dashboard
- **Logs:** Real-time logs show email attempts
- **Environment:** Verify all variables are set correctly
