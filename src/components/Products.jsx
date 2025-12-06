function Products({ onAddToCart }) {
  const products = [
    {
      id: 1,
      name: 'Blocked & Blessed',
      collection: 'Petty Collection',
      description: 'For the nights when you miss them... but not enough to text.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 2,
      name: 'After the Cry',
      collection: 'Soft Feelings',
      description: 'Warm. Safe. The scent of healing after letting it all out.',
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
      id: 5,
      name: 'I\'m Healed (Mostly)',
      collection: 'Petty Collection',
      description: 'Growth looks good on you. Even if it\'s still a work in progress.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 6,
      name: 'Warm Milk & Honey',
      collection: 'Soft Feelings',
      description: 'Comfort in a candle. Like a hug that smells delicious.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 7,
      name: 'The Reset',
      collection: 'Mood Collection',
      description: 'New chapter. New energy. Same you, better boundaries.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 8,
      name: 'Quiet Opulence',
      collection: 'Luxe Gleam',
      description: 'Wealth whispers. This is the scent of knowing your worth.',
      price: 28.00,
      emoji: '🕯️'
    }
  ];

  return (
    <section id="shop" style={{
      background: 'white',
      padding: 'clamp(3rem, 8vw, 6rem) 5%'
    }}>
      <h2 style={{
        fontFamily: "'Raleway', sans-serif",
        textAlign: 'center',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 300,
        marginBottom: '1rem',
        letterSpacing: '2px'
      }}>
        Bestsellers
      </h2>

      <p style={{
        textAlign: 'center',
        fontSize: 'clamp(1rem, 2vw, 1.1rem)',
        opacity: 0.7,
        marginBottom: 'clamp(2rem, 5vw, 4rem)',
        fontStyle: 'italic',
        fontWeight: 300
      }}>
        Light the feeling
      </p>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
        gap: 'clamp(1.5rem, 3vw, 2.5rem)',
        marginTop: '3rem'
      }}>
        {products.map((product) => (
          <div 
            key={product.id} 
            style={{
              background: '#F6F1EB',
              borderRadius: '20px',
              overflow: 'hidden',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '100%',
              height: 'clamp(250px, 40vw, 320px)',
              background: '#CFC7BE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(2.5rem, 5vw, 3rem)'
            }}>
              {product.emoji}
            </div>

            <div style={{ padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <div style={{
                fontSize: 'clamp(0.7rem, 1.2vw, 0.75rem)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#9C7A4E',
                marginBottom: '0.5rem',
                fontWeight: 500
              }}>
                {product.collection}
              </div>

              <h3 style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                fontWeight: 400,
                marginBottom: '0.5rem',
                letterSpacing: '0.5px'
              }}>
                {product.name}
              </h3>

              <p style={{
                fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
                fontStyle: 'italic',
                opacity: 0.6,
                marginBottom: '1rem',
                lineHeight: 1.5,
                fontWeight: 300
              }}>
                {product.description}
              </p>

              <div style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                fontWeight: 500,
                marginBottom: '1rem'
              }}>
                ${product.price.toFixed(2)}
              </div>

              <button
                onClick={() => onAddToCart(product)}
                style={{
                  width: '100%',
                  padding: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                  background: '#111111',
                  color: '#F6F1EB',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontWeight: 400
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#9C7A4E';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#111111';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;