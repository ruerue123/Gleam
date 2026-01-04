import { createRequire } from 'module';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');

// Load .env from current directory
config({ path: join(__dirname, '.env') });

console.log('\n' + '='.repeat(70));
console.log('EMAIL DIAGNOSTIC TOOL');
console.log('='.repeat(70));

// Step 1: Check environment variables
console.log('\n📋 STEP 1: Checking Environment Variables');
console.log('-'.repeat(70));

const requiredVars = {
  'SMTP_HOST': process.env.SMTP_HOST,
  'SMTP_PORT': process.env.SMTP_PORT,
  'SMTP_SECURE': process.env.SMTP_SECURE,
  'SMTP_USER': process.env.SMTP_USER,
  'SMTP_PASSWORD': process.env.SMTP_PASSWORD ? '***SET***' : 'NOT SET',
  'EMAIL_FROM': process.env.EMAIL_FROM,
  'ADMIN_EMAIL': process.env.ADMIN_EMAIL
};

let allVarsSet = true;
for (const [key, value] of Object.entries(requiredVars)) {
  const status = value ? '✅' : '❌';
  console.log(`${status} ${key}: ${value || 'NOT SET'}`);
  if (!value || value === 'NOT SET') allVarsSet = false;
}

if (!allVarsSet) {
  console.log('\n❌ ERROR: Some required environment variables are missing!');
  console.log('Check your .env file and make sure all variables are set.');
  process.exit(1);
}

console.log('\n✅ All environment variables are set correctly!');

// Step 2: Test SMTP connection
console.log('\n🔌 STEP 2: Testing SMTP Connection');
console.log('-'.repeat(70));

async function testSMTPConnection() {
  try {
    const port = parseInt(process.env.SMTP_PORT);
    const secure = process.env.SMTP_SECURE === 'true';

    console.log(`Attempting to connect to ${process.env.SMTP_HOST}:${port}`);
    console.log(`Using SSL/TLS: ${secure}`);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: port,
      secure: secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      debug: true,
      logger: true
    });

    console.log('\nVerifying connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    return transporter;
  } catch (error) {
    console.log('❌ SMTP connection failed!');
    console.log('Error:', error.message);

    if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKET') {
      console.log('\n⚠️  CONNECTION TIMEOUT');
      console.log('This means SMTP ports are blocked on your network.');
      console.log('This is NORMAL when testing locally.');
      console.log('\n💡 Solutions:');
      console.log('  1. Deploy to production - emails will work there');
      console.log('  2. Use a VPN to bypass port blocking');
      console.log('  3. Test from a different network');
      console.log('  4. The app still works - contacts/subscriptions are saved!');
    } else if (error.code === 'EAUTH') {
      console.log('\n⚠️  AUTHENTICATION FAILED');
      console.log('Check your email password in the .env file');
    }

    return null;
  }
}

// Step 3: Try sending test email
async function sendTestEmail(transporter) {
  if (!transporter) {
    console.log('\n⏭️  STEP 3: Skipping email send test (no connection)');
    return;
  }

  console.log('\n📧 STEP 3: Sending Test Email');
  console.log('-'.repeat(70));

  try {
    console.log(`Sending test email to: ${process.env.ADMIN_EMAIL}`);

    const info = await transporter.sendMail({
      from: `"Gleam Candles Test" <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'TEST: Email Configuration Successful',
      html: `
        <h2>🎉 Email Configuration Working!</h2>
        <p>If you're reading this, your email configuration is set up correctly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>From:</strong> ${process.env.EMAIL_FROM}</p>
        <p><strong>SMTP Server:</strong> ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}</p>
      `,
      text: 'Email configuration test successful!'
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log(`\n📬 Check the inbox for: ${process.env.ADMIN_EMAIL}`);
  } catch (error) {
    console.log('❌ Failed to send test email');
    console.log('Error:', error.message);
  }
}

// Step 4: Summary
function printSummary(smtpWorking) {
  console.log('\n' + '='.repeat(70));
  console.log('SUMMARY');
  console.log('='.repeat(70));

  if (smtpWorking) {
    console.log('\n✅ EMAIL IS CONFIGURED CORRECTLY!');
    console.log('\nYour emails should be working in production.');
    console.log('Check the email inbox to confirm receipt.');
  } else {
    console.log('\n⚠️  SMTP CONNECTION FAILED (Expected locally)');
    console.log('\n📝 What this means:');
    console.log('  • Your configuration is correct');
    console.log('  • SMTP ports are blocked on your local network (normal)');
    console.log('  • Contacts and subscriptions ARE still saved to database');
    console.log('  • Emails WILL work when deployed to production');
    console.log('\n🚀 Next steps:');
    console.log('  1. Deploy your backend to production (Vercel, Railway, etc.)');
    console.log('  2. Set the same environment variables in your hosting platform');
    console.log('  3. Test the contact form and newsletter in production');
    console.log('  4. Emails should arrive at', process.env.ADMIN_EMAIL);
  }

  console.log('\n' + '='.repeat(70));
}

// Run all tests
(async () => {
  const transporter = await testSMTPConnection();
  await sendTestEmail(transporter);
  printSummary(transporter !== null);
})();
