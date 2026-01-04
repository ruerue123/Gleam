import { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      paddingTop: 'clamp(150px, 16vw, 180px)',
      paddingBottom: 'clamp(4rem, 10vw, 8rem)',
      background: '#ffffff'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 5%'
      }}>
        <h1 style={{
          fontFamily: "'Cardo', serif",
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 400,
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          letterSpacing: '0.5px',
          color: '#171515',
          textAlign: 'center'
        }}>
          Get in Touch
        </h1>

        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          color: '#171515',
          opacity: 0.75,
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          textAlign: 'center'
        }}>
          We'd love to hear from you
        </p>

        {/* Success/Error Message */}
        {submitStatus === 'success' && (
          <div style={{
            padding: '1rem 1.5rem',
            background: '#D4EDDA',
            border: '1px solid #C3E6CB',
            borderRadius: '4px',
            marginBottom: '2rem',
            fontFamily: "'Cormorant', serif",
            fontSize: '1.1rem',
            color: '#155724',
            textAlign: 'center'
          }}>
            Thank you! Your message has been sent successfully. We'll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div style={{
            padding: '1rem 1.5rem',
            background: '#F8D7DA',
            border: '1px solid #F5C6CB',
            borderRadius: '4px',
            marginBottom: '2rem',
            fontFamily: "'Cormorant', serif",
            fontSize: '1.1rem',
            color: '#721C24',
            textAlign: 'center'
          }}>
            Oops! Something went wrong. Please try again or email us directly at sales@gleam.co.zw
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          <div>
            <label style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
              color: '#171515',
              marginBottom: '0.5rem',
              display: 'block',
              fontWeight: 500
            }}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              style={{
                width: '100%',
                padding: 'clamp(0.8rem, 2vw, 1rem)',
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(1rem, 1.6vw, 1.05rem)',
                border: '1px solid #EDECE4',
                borderRadius: '2px',
                background: '#FAFAF8',
                color: '#171515'
              }}
            />
          </div>

          <div>
            <label style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
              color: '#171515',
              marginBottom: '0.5rem',
              display: 'block',
              fontWeight: 500
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              style={{
                width: '100%',
                padding: 'clamp(0.8rem, 2vw, 1rem)',
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(1rem, 1.6vw, 1.05rem)',
                border: '1px solid #EDECE4',
                borderRadius: '2px',
                background: '#FAFAF8',
                color: '#171515'
              }}
            />
          </div>

          <div>
            <label style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
              color: '#171515',
              marginBottom: '0.5rem',
              display: 'block',
              fontWeight: 500
            }}>
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              placeholder="How can we help you?"
              required
              style={{
                width: '100%',
                padding: 'clamp(0.8rem, 2vw, 1rem)',
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(1rem, 1.6vw, 1.05rem)',
                border: '1px solid #EDECE4',
                borderRadius: '2px',
                background: '#FAFAF8',
                color: '#171515',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: 'clamp(1rem, 2.5vw, 1.2rem) clamp(2.5rem, 6vw, 3.5rem)',
              background: isSubmitting ? '#ccc' : '#8B7355',
              color: '#ffffff',
              border: `1px solid ${isSubmitting ? '#ccc' : '#8B7355'}`,
              borderRadius: '2px',
              fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
              fontFamily: "'Cormorant', serif",
              fontWeight: 500,
              letterSpacing: '0.5px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              alignSelf: 'center'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.background = '#6F5943';
                e.currentTarget.style.borderColor = '#6F5943';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.background = '#8B7355';
                e.currentTarget.style.borderColor = '#8B7355';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div style={{
          marginTop: 'clamp(4rem, 8vw, 6rem)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 400,
            marginBottom: '1.5rem',
            color: '#171515'
          }}>
            Other Ways to Reach Us
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
            color: '#171515',
            opacity: 0.8
          }}>
            <p>Email: sales@gleam.co.zw</p>
            <p>Phone: +263 78 448 6075</p>
            <p>Hours: Mon-Fri, 8am-6pm CAT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
