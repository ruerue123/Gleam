import { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer style={{
      background: '#171515',
      color: '#EDECE4',
      padding: 'clamp(2rem, 4vw, 3rem) 5% clamp(1.5rem, 3vw, 2rem)'
    }}>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          .footer-brand {
            grid-column: 1 / -1 !important;
          }
          .footer-newsletter {
            grid-column: 1 / -1 !important;
          }
          .footer-brand h3 {
            font-size: 0.95rem !important;
          }
          .footer-brand p {
            font-size: 0.75rem !important;
          }
          .footer-section h4 {
            font-size: 0.85rem !important;
            margin-bottom: 0.4rem !important;
          }
          .footer-section ul li {
            margin-bottom: 0.25rem !important;
          }
          .footer-section ul li a,
          .footer-section ul li span {
            font-size: 0.7rem !important;
          }
          .footer-newsletter h4 {
            font-size: 0.85rem !important;
          }
          .footer-newsletter p {
            font-size: 0.7rem !important;
          }
          .footer-newsletter input {
            font-size: 0.75rem !important;
            padding: 0.5rem !important;
          }
          .footer-newsletter button {
            font-size: 0.75rem !important;
            padding: 0.5rem 0.8rem !important;
          }
          .footer-bottom {
            font-size: 0.65rem !important;
            padding-top: 0.8rem !important;
          }
        }
      `}</style>
      <div className="footer-grid" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
        gap: 'clamp(1.5rem, 3vw, 2.5rem)',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        {/* Brand Section */}
        <div className="footer-brand">
          <h3 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            fontWeight: 400,
            marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)',
            letterSpacing: '0.5px',
            color: '#EDECE4'
          }}>
            Gleam
          </h3>
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
            lineHeight: 1.6,
            color: '#EDECE4',
            opacity: 0.75,
            fontWeight: 300
          }}>
            Handcrafted candles for your quiet emotions. Made with intention in Harare, Zimbabwe.
          </p>
        </div>

        {/* Shop Links */}
        <div className="footer-section">
          <h4 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
            fontWeight: 400,
            marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)',
            letterSpacing: '0.5px',
            color: '#EDECE4'
          }}>
            Scents
          </h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: 'clamp(0.4rem, 0.8vw, 0.5rem)' }}>
              <Link to="/products?scent=EMBER" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.7,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              >
                Ember
              </Link>
            </li>
            <li style={{ marginBottom: 'clamp(0.4rem, 0.8vw, 0.5rem)' }}>
              <Link to="/products?scent=ZEST" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.7,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              >
                Zest
              </Link>
            </li>
            <li style={{ marginBottom: 'clamp(0.4rem, 0.8vw, 0.5rem)' }}>
              <Link to="/products?scent=SERENE" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.7,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              >
                Serene
              </Link>
            </li>
            <li style={{ marginBottom: 'clamp(0.4rem, 0.8vw, 0.5rem)' }}>
              <Link to="/products?scent=ROOT" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.7,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              >
                Root
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="footer-section">
          <h4 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
            fontWeight: 400,
            marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)',
            letterSpacing: '0.5px',
            color: '#EDECE4'
          }}>
            Company
          </h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: 'clamp(0.4rem, 0.8vw, 0.5rem)' }}>
              <Link to="/about" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.7,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              >
                About Us
              </Link>
            </li>
            <li style={{ marginBottom: 'clamp(0.4rem, 0.8vw, 0.5rem)' }}>
              <a href="#" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.7,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              >
                Our Story
              </a>
            </li>
            <li style={{ marginBottom: 'clamp(0.4rem, 0.8vw, 0.5rem)' }}>
              <a href="#" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.7,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section footer-newsletter">
          <h4 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
            fontWeight: 400,
            marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)',
            letterSpacing: '0.5px',
            color: '#EDECE4'
          }}>
            Stay Connected
          </h4>
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
            color: '#EDECE4',
            opacity: 0.7,
            marginBottom: 'clamp(0.7rem, 1.4vw, 0.9rem)',
            fontWeight: 300,
            lineHeight: 1.5
          }}>
            Join for exclusive drops and soft wisdom.
          </p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              style={{
                width: '100%',
                padding: 'clamp(0.55rem, 1.1vw, 0.65rem) clamp(0.7rem, 1.4vw, 0.85rem)',
                borderRadius: '2px',
                border: '1px solid rgba(237, 236, 228, 0.3)',
                marginBottom: 'clamp(0.5rem, 1vw, 0.6rem)',
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#EDECE4'
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: 'clamp(0.6rem, 1.2vw, 0.7rem)',
                background: '#8B7355',
                color: '#ffffff',
                border: '1px solid #8B7355',
                borderRadius: '2px',
                fontSize: 'clamp(0.8rem, 1.3vw, 0.85rem)',
                fontFamily: "'Cormorant', serif",
                fontWeight: 500,
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#6F5943';
                e.currentTarget.style.borderColor = '#6F5943';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#8B7355';
                e.currentTarget.style.borderColor = '#8B7355';
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom" style={{
        textAlign: 'center',
        paddingTop: 'clamp(1rem, 2vw, 1.5rem)',
        borderTop: '1px solid rgba(237, 236, 228, 0.15)',
        fontFamily: "'Cormorant', serif",
        fontSize: 'clamp(0.75rem, 1.2vw, 0.8rem)',
        color: '#EDECE4',
        opacity: 0.6,
        fontWeight: 300
      }}>
        <p>
          &copy; 2025 gleam. All rights reserved. Website design by{' '}
          <a
            href="https://www.cresciotech.co.zw"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#EDECE4',
              textDecoration: 'underline',
              opacity: 0.8,
              transition: 'opacity 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          >
            Crescio Technology
          </a>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
