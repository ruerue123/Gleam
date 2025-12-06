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
      padding: 'clamp(3.5rem, 7vw, 5rem) 5% clamp(2rem, 4vw, 3rem)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
        gap: 'clamp(2.5rem, 5vw, 4rem)',
        marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)'
      }}>
        {/* Brand Section */}
        <div>
          <h3 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(1.4rem, 2.5vw, 1.7rem)',
            fontWeight: 400,
            marginBottom: 'clamp(1rem, 2vw, 1.3rem)',
            letterSpacing: '0.5px',
            color: '#EDECE4'
          }}>
            Gleam
          </h3>
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
            lineHeight: 1.7,
            color: '#EDECE4',
            opacity: 0.8,
            fontWeight: 300
          }}>
            Handcrafted candles for your quiet emotions. Made with intention in Harare, Zimbabwe.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.2rem)',
            fontWeight: 400,
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            letterSpacing: '0.5px',
            color: '#EDECE4'
          }}>
            Collections
          </h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
              <Link to="/collection/petty-collection" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.75,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.75'}
              >
                Petty Collection
              </Link>
            </li>
            <li style={{ marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
              <Link to="/collection/soft-feelings" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.75,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.75'}
              >
                Soft Feelings
              </Link>
            </li>
            <li style={{ marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
              <Link to="/collection/mood-collection" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.75,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.75'}
              >
                Mood Collection
              </Link>
            </li>
            <li style={{ marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
              <Link to="/collection/luxe-gleam" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.75,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.75'}
              >
                Luxe Gleam
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.2rem)',
            fontWeight: 400,
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            letterSpacing: '0.5px',
            color: '#EDECE4'
          }}>
            Company
          </h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
              <Link to="/about" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.75,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.75'}
              >
                About Us
              </Link>
            </li>
            <li style={{ marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
              <a href="#" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.75,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.75'}
              >
                Our Story
              </a>
            </li>
            <li style={{ marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
              <a href="#" style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                color: '#EDECE4',
                textDecoration: 'none',
                opacity: 0.75,
                transition: 'opacity 0.3s',
                fontWeight: 300
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.75'}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.2rem)',
            fontWeight: 400,
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            letterSpacing: '0.5px',
            color: '#EDECE4'
          }}>
            Stay Connected
          </h4>
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
            color: '#EDECE4',
            opacity: 0.75,
            marginBottom: 'clamp(1rem, 2vw, 1.2rem)',
            fontWeight: 300,
            lineHeight: 1.6
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
                padding: 'clamp(0.7rem, 1.5vw, 0.85rem) clamp(0.9rem, 2vw, 1.1rem)',
                borderRadius: '2px',
                border: '1px solid rgba(237, 236, 228, 0.3)',
                marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)',
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#EDECE4'
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: 'clamp(0.75rem, 1.6vw, 0.9rem)',
                background: '#8B7355',
                color: '#ffffff',
                border: '1px solid #8B7355',
                borderRadius: '2px',
                fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
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
      <div style={{
        textAlign: 'center',
        paddingTop: 'clamp(1.5rem, 3vw, 2rem)',
        borderTop: '1px solid rgba(237, 236, 228, 0.15)',
        fontFamily: "'Cormorant', serif",
        fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
        color: '#EDECE4',
        opacity: 0.65,
        fontWeight: 300
      }}>
        <p>&copy; 2024 Gleam. Made with intention in Harare, Zimbabwe.</p>
      </div>
    </footer>
  );
}

export default Footer;
