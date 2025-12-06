import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Navbar({ cartCount, favouritesCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconColor = isScrolled ? '#171515' : '#EDECE4';
  const hoverColor = '#8B7355';
  const bgColor = isScrolled ? '#EDECE4' : '#171515';
  const borderColor = isScrolled ? 'rgba(23, 21, 21, 0.08)' : 'rgba(237, 236, 228, 0.15)';

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: bgColor,
        zIndex: 1000,
        padding: 'clamp(1rem, 2vw, 1.5rem) clamp(2rem, 5vw, 4rem)',
        borderBottom: `1px solid ${borderColor}`,
        transition: 'background 0.3s ease, border-color 0.3s ease'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* Left - Social Icons */}
          <div style={{
            display: 'flex',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            alignItems: 'center'
          }}>
            <a
              href="#"
              aria-label="Facebook"
              style={{
                color: iconColor,
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = iconColor}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z"/>
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              style={{
                color: iconColor,
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = iconColor}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
            </a>
            <a
              href="#"
              aria-label="TikTok"
              style={{
                color: iconColor,
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = iconColor}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
              </svg>
            </a>
          </div>

          {/* Center - Logo */}
          <Link to="/" style={{
            textAlign: 'center',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src="/logo.png"
              alt="Gleam"
              style={{
                height: 'clamp(60px, 12vw, 90px)',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </Link>

          {/* Right - Utility Icons */}
          <div style={{
            display: 'flex',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
            <Link
              to="/profile"
              aria-label="Account"
              style={{
                color: iconColor,
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                transition: 'color 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = iconColor}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>

            <Link
              to="/favourites"
              aria-label="Favourites"
              style={{
                position: 'relative',
                color: iconColor,
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                transition: 'color 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = iconColor}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {favouritesCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#8B7355',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  fontFamily: "'Cormorant', serif"
                }}>
                  {favouritesCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              style={{
                position: 'relative',
                color: iconColor,
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                transition: 'color 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = iconColor}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#8B7355',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  fontFamily: "'Cormorant', serif"
                }}>
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              aria-label="Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: iconColor,
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = iconColor}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isMenuOpen ? 0 : '-100%',
        width: '100%',
        maxWidth: '400px',
        height: '100vh',
        background: '#FAFAF8',
        zIndex: 1001,
        transition: 'right 0.3s ease',
        boxShadow: isMenuOpen ? '-4px 0 20px rgba(0, 0, 0, 0.1)' : 'none',
        overflowY: 'auto'
      }}>
        <div style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              alignSelf: 'flex-end',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#171515',
              padding: 0
            }}
          >
            ×
          </button>

          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontFamily: "'Cormorant', serif",
                fontSize: '1.4rem',
                color: '#171515',
                textDecoration: 'none',
                fontWeight: 400,
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#171515'}
            >
              Home
            </Link>

            <Link
              to="/collections"
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontFamily: "'Cormorant', serif",
                fontSize: '1.4rem',
                color: '#171515',
                textDecoration: 'none',
                fontWeight: 400,
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#171515'}
            >
              Collections
            </Link>

            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontFamily: "'Cormorant', serif",
                fontSize: '1.4rem',
                color: '#171515',
                textDecoration: 'none',
                fontWeight: 400,
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#171515'}
            >
              All Products
            </Link>

            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontFamily: "'Cormorant', serif",
                fontSize: '1.4rem',
                color: '#171515',
                textDecoration: 'none',
                fontWeight: 400,
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#171515'}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontFamily: "'Cormorant', serif",
                fontSize: '1.4rem',
                color: '#171515',
                textDecoration: 'none',
                fontWeight: 400,
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#171515'}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }}
        />
      )}
    </>
  );
}

export default Navbar;