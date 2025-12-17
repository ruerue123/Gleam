function ContactPage() {
  return (
    <div style={{
      paddingTop: 'clamp(90px, 10vw, 110px)',
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

        <form style={{
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
              placeholder="Your name"
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
              placeholder="your.email@example.com"
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
              rows="6"
              placeholder="How can we help you?"
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
            style={{
              padding: 'clamp(1rem, 2.5vw, 1.2rem) clamp(2.5rem, 6vw, 3.5rem)',
              background: '#8B7355',
              color: '#ffffff',
              border: '1px solid #8B7355',
              borderRadius: '2px',
              fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
              fontFamily: "'Cormorant', serif",
              fontWeight: 500,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              alignSelf: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6F5943';
              e.currentTarget.style.borderColor = '#6F5943';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#8B7355';
              e.currentTarget.style.borderColor = '#8B7355';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Send Message
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
            <p>Email: hello@gleamcandles.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Hours: Mon-Fri, 9am-6pm EST</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
