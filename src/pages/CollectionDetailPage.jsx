import { useParams, Link } from 'react-router-dom'

function CollectionDetailPage({ onAddToCart }) {
  const { slug } = useParams()

  const collections = {
    'petty-collection': {
      name: 'Petty Collection',
      emoji: '🖤',
      description: 'For your quiet revenge. Emotional release wrapped in wit and warmth.',
      color: 'linear-gradient(135deg, #A96A7B 0%, rgba(169, 106, 123, 0.7) 100%)',
      products: [
        {
          id: 1,
          name: 'Blocked & Blessed',
          description: 'For the nights when you miss them... but not enough to text.',
          price: 15.00,
          emoji: '🕯️'
        },
        {
          id: 5,
          name: 'I\'m Healed (Mostly)',
          description: 'Growth looks good on you. Even if it\'s still a work in progress.',
          price: 15.00,
          emoji: '🕯️'
        }
      ]
    },
    'soft-feelings': {
      name: 'Soft Feelings',
      emoji: '🤍',
      description: 'Tender moments. Late nights. The scent of safety and self-care.',
      color: 'linear-gradient(135deg, #E7CFC3 0%, rgba(231, 207, 195, 0.7) 100%)',
      products: [
        {
          id: 2,
          name: 'After the Cry',
          description: 'Warm. Safe. The scent of healing after letting it all out.',
          price: 15.00,
          emoji: '🕯️'
        },
        {
          id: 6,
          name: 'Warm Milk & Honey',
          description: 'Comfort in a candle. Like a hug that smells delicious.',
          price: 15.00,
          emoji: '🕯️'
        }
      ]
    },
    'mood-collection': {
      name: 'Mood Collection',
      emoji: '🔥',
      description: 'Main character energy. Fresh starts and quiet power.',
      color: 'linear-gradient(135deg, #9C7A4E 0%, rgba(156, 122, 78, 0.7) 100%)',
      products: [
        {
          id: 3,
          name: 'Unbothered',
          description: 'Fresh boundaries. High standards. That\'s the mood.',
          price: 15.00,
          emoji: '🕯️'
        },
        {
          id: 7,
          name: 'The Reset',
          description: 'New chapter. New energy. Same you, better boundaries.',
          price: 15.00,
          emoji: '🕯️'
        }
      ]
    },
    'luxe-gleam': {
      name: 'Luxe Gleam',
      emoji: '✨',
      description: 'Quiet opulence. The premium line for those who know their worth.',
      color: 'linear-gradient(135deg, #C6A75E 0%, rgba(198, 167, 94, 0.7) 100%)',
      products: [
        {
          id: 4,
          name: 'Velvet Smoke',
          description: 'Quiet opulence. For those who move in silence.',
          price: 28.00,
          emoji: '🕯️'
        },
        {
          id: 8,
          name: 'Quiet Opulence',
          description: 'Wealth whispers. This is the scent of knowing your worth.',
          price: 28.00,
          emoji: '🕯️'
        }
      ]
    }
  }

  const collection = collections[slug]

  if (!collection) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '120px', textAlign: 'center' }}>
        <h1>Collection not found</h1>
        <Link to="/">Return Home</Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <div style={{
        background: collection.color,
        padding: '4rem 5%',
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{collection.emoji}</div>
        <h1 style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 300,
          letterSpacing: '2px',
          marginBottom: '1rem',
          color: '#111'
        }}>
          {collection.name}
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          opacity: 0.8,
          maxWidth: '600px',
          margin: '0 auto',
          fontStyle: 'italic'
        }}>
          {collection.description}
        </p>
      </div>

      {/* Products Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 5%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
        gap: 'clamp(1.5rem, 3vw, 2.5rem)'
      }}>
        {collection.products.map((product) => (
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
              height: '320px',
              background: '#CFC7BE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem'
            }}>
              {product.emoji}
            </div>

            <div style={{ padding: '1.5rem' }}>
              <h3 style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
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
                  padding: '0.9rem',
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
    </div>
  )
}

export default CollectionDetailPage
