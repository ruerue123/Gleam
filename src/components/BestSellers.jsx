import { Link } from 'react-router-dom'

function BestSellers({ onAddToCart }) {
  const bestSellers = [
    {
      id: 1,
      name: 'Blocked & Blessed',
      collection: 'Petty Collection',
      description: 'For the nights when you miss them... but not enough to text.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 3,
      name: 'Unbothered',
      collection: 'Mood Collection',
      description: 'Fresh boundaries. High standards. That\'s the mood.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 4,
      name: 'Velvet Smoke',
      collection: 'Luxe Gleam',
      description: 'Quiet opulence. For those who move in silence.',
      price: 28.00,
      emoji: '🕯️'
    },
    {
      id: 2,
      name: 'After the Cry',
      collection: 'Soft Feelings',
      description: 'Warm. Safe. The scent of healing after letting it all out.',
      price: 15.00,
      emoji: '🕯️'
    }
  ];

  return (
    <section style={{
      background: '#FAFAF8',
      padding: 'clamp(4rem, 10vw, 8rem) 5%'
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
        Bestsellers
      </h2>

      <p style={{
        textAlign: 'center',
        fontFamily: "'Cormorant', serif",
        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
        color: '#171515',
        opacity: 0.75,
        marginBottom: 'clamp(3rem, 6vw, 5rem)',
        fontStyle: 'italic',
        fontWeight: 300
      }}>
        Light the feeling
      </p>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))',
        gap: 'clamp(1rem, 4vw, 3rem)',
        marginTop: '3rem'
      }}>
        {bestSellers.map((product) => (
          <div
            key={product.id}
            style={{
              background: '#ffffff',
              borderRadius: '4px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              border: '1px solid #EDECE4',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            }}
          >
            <div style={{
              width: '100%',
              height: 'clamp(280px, 45vw, 350px)',
              background: 'linear-gradient(to bottom, #EDECE4 0%, #D8D6CE 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(3rem, 6vw, 3.5rem)'
            }}>
              {product.emoji}
            </div>

            <div style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <div style={{
                fontSize: 'clamp(0.75rem, 1.3vw, 0.8rem)',
                fontFamily: "'Cormorant', serif",
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                color: '#8B7355',
                marginBottom: '0.6rem',
                fontWeight: 500
              }}>
                {product.collection}
              </div>

              <h3 style={{
                fontFamily: "'Cardo', serif",
                fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)',
                fontWeight: 400,
                marginBottom: 'clamp(0.5rem, 1vw, 0.7rem)',
                letterSpacing: '0.3px',
                color: '#171515'
              }}>
                {product.name}
              </h3>

              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                fontStyle: 'italic',
                color: '#171515',
                opacity: 0.7,
                marginBottom: 'clamp(1rem, 2vw, 1.3rem)',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                {product.description}
              </p>

              <div style={{
                fontFamily: "'Cardo', serif",
                fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
                fontWeight: 500,
                marginBottom: 'clamp(1rem, 2vw, 1.2rem)',
                color: '#171515'
              }}>
                ${product.price.toFixed(2)}
              </div>

              <button
                onClick={() => onAddToCart(product)}
                style={{
                  width: '100%',
                  padding: 'clamp(0.85rem, 1.8vw, 1rem)',
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
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 'clamp(3rem, 6vw, 4.5rem)'
      }}>
        <Link
          to="/products"
          style={{
            display: 'inline-block',
            padding: 'clamp(0.9rem, 2vw, 1.1rem) clamp(2.2rem, 5vw, 3rem)',
            background: 'transparent',
            color: '#8B7355',
            textDecoration: 'none',
            borderRadius: '2px',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
            fontFamily: "'Cormorant', serif",
            fontWeight: 500,
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            border: '1px solid #8B7355'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#8B7355';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#8B7355';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}

export default BestSellers;
