import { Link } from 'react-router-dom'

function CandleStyles() {
  const styles = [
    {
      id: 1,
      name: 'Jar Candles',
      type: 'STANDARD',
      image: '/images/standard.jpg',
      description: 'Classic hand-poured candles in elegant jars',
      emoji: '🕯️'
    },
    {
      id: 2,
      name: 'Dessert Candles',
      type: 'DESSERT',
      image: '/images/dessert.jpg',
      description: 'Whipped, layered, and indulgent. Inspired by your favorite treats',
      emoji: '🍰'
    },
    {
      id: 3,
      name: 'Molded Candles',
      type: 'MOLDED',
      image: '/images/molded.jpg',
      description: 'Sculptural pieces designed for display and intentional burning',
      emoji: '🗿'
    }
  ];

  return (
    <section style={{
      padding: 'clamp(2rem, 4vw, 4rem) 5%',
      maxWidth: '1400px',
      margin: '0 auto',
      background: '#FAFAF8'
    }}>
      <h2 style={{
        fontFamily: "'Cardo', serif",
        textAlign: 'center',
        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
        fontWeight: 400,
        marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)',
        letterSpacing: '0.5px',
        color: '#171515'
      }}>
        Shop by Style
      </h2>

      <p style={{
        textAlign: 'center',
        fontFamily: "'Cormorant', serif",
        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
        color: '#171515',
        opacity: 0.75,
        marginBottom: 'clamp(2rem, 4vw, 3rem)',
        fontStyle: 'italic',
        fontWeight: 300
      }}>
        Explore our collection by candle type
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
        gap: 'clamp(1.5rem, 3vw, 2.5rem)',
        marginTop: '3rem'
      }}>
        {styles.map((style) => (
          <Link
            key={style.id}
            to={`/products?style=${style.type}`}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #EDECE4',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
            }}
          >
            {/* Image Container with Emoji Fallback */}
            <div style={{
              width: '100%',
              height: 'clamp(220px, 35vw, 320px)',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #F6F1EB 0%, #EDECE4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Emoji as fallback - will show if image doesn't load */}
              <div style={{
                fontSize: 'clamp(4rem, 10vw, 6rem)',
                opacity: 0.3,
                position: 'absolute'
              }}>
                {style.emoji}
              </div>
              <img
                src={style.image}
                alt={style.name}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  // Hide image on error, show emoji fallback
                  e.target.style.display = 'none';
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  position: 'relative',
                  zIndex: 1
                }}
              />
            </div>

            {/* Content */}
            <div style={{
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              textAlign: 'center',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 style={{
                fontFamily: "'Cardo', serif",
                fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                fontWeight: 400,
                marginBottom: 'clamp(0.6rem, 1vw, 0.8rem)',
                letterSpacing: '0.5px',
                color: '#171515'
              }}>
                {style.name}
              </h3>
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                color: '#171515',
                opacity: 0.7,
                lineHeight: 1.6,
                fontWeight: 300,
                fontStyle: 'italic'
              }}>
                {style.description}
              </p>

              {/* Shop Now Arrow */}
              <div style={{
                marginTop: 'clamp(1rem, 2vw, 1.5rem)',
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
                fontWeight: 500,
                color: '#8B7355',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                Shop Now
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CandleStyles;
