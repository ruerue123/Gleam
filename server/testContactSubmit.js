// Test contact form submission to see if email is triggered
import { config } from 'dotenv';
config();

const API_URL = 'http://localhost:5000';

async function testContactSubmission() {
  console.log('Testing contact form submission...\n');

  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message to verify email sending functionality.'
      })
    });

    const data = await response.json();

    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));

    if (data.success) {
      console.log('\n✅ Contact form submitted successfully!');
      console.log('Check server logs for email sending status.');
      console.log('Check admin portal to verify the contact was saved.');
    } else {
      console.log('\n❌ Contact form submission failed');
    }
  } catch (error) {
    console.error('\n❌ Error during test:', error.message);
  }
}

async function testNewsletterSubscription() {
  console.log('\n\nTesting newsletter subscription...\n');

  try {
    const response = await fetch(`${API_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test-subscriber@example.com',
        source: 'footer'
      })
    });

    const data = await response.json();

    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));

    if (data.success) {
      console.log('\n✅ Newsletter subscription successful!');
      console.log('Check server logs for email sending status.');
      console.log('Check admin portal to verify the subscription was saved.');
    } else {
      console.log('\n❌ Newsletter subscription failed');
    }
  } catch (error) {
    console.error('\n❌ Error during test:', error.message);
  }
}

console.log('='.repeat(60));
console.log('EMAIL FUNCTIONALITY TEST');
console.log('='.repeat(60));
console.log('\nThis will test both contact form and newsletter subscription.');
console.log('Watch the SERVER LOGS in your terminal for email status.\n');

testContactSubmission().then(() => {
  return testNewsletterSubscription();
}).then(() => {
  console.log('\n' + '='.repeat(60));
  console.log('Tests complete! Check your server logs above.');
  console.log('='.repeat(60));
});
