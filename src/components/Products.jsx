import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Products({ onAddToCart, onAddToFavourites, favourites = [] }) {
  const products = [
    {
      id: 1,
      name: 'Blocked & Blessed',
      slug: 'blocked-and-blessed',
      collection: 'Petty Collection',
      description: 'For the nights when you miss them... but not enough to text.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 2,
      name: 'After the Cry',
      slug: 'after-the-cry',
      collection: 'Soft Feelings',
      description: 'Warm. Safe. The scent of healing after letting it all out.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 3,
      name: 'Unbothered',
      slug: 'unbothered',
      collection: 'Mood Collection',
      description: 'Fresh boundaries. High standards. That\'s the mood.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 4,
      name: 'Velvet Smoke',
      slug: 'velvet-smoke',
      collection: 'Luxe Gleam',
      description: 'Quiet opulence. For those who move in silence.',
      price: 28.00,
      emoji: '🕯️'
    },
    {
      id: 5,
      name: 'I\'m Healed (Mostly)',
      slug: 'im-healed-mostly',
      collection: 'Petty Collection',
      description: 'Growth looks good on you. Even if it\'s still a work in progress.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 6,
      name: 'Warm Milk & Honey',
      slug: 'warm-milk-and-honey',
      collection: 'Soft Feelings',
      description: 'Comfort in a candle. Like a hug that smells delicious.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 7,
      name: 'The Reset',
      slug: 'the-reset',
      collection: 'Mood Collection',
      description: 'New chapter. New energy. Same you, better boundaries.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 8,
      name: 'Quiet Opulence',
      slug: 'quiet-opulence',
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
        {products.map((product, index) => {
          const isFavourite = favourites.some(fav => fav.id === product.id);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
              }}
              style={{
                background: '#F6F1EB',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  width: '100%',
                  height: 'clamp(250px, 40vw, 320px)',
                  background: '#CFC7BE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                  position: 'relative'
                }}>
                  {product.emoji}

                  {/* Wishlist Button */}
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddToFavourites(product);
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isFavourite ? {
                      scale: [1, 1.2, 1],
                      transition: { duration: 0.3 }
                    } : {}}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: isFavourite ? '#8B7355' : 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.3s',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavourite ? "#ffffff" : "none"} stroke={isFavourite ? "#ffffff" : "#8B7355"} strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </motion.button>
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
            </div>
              </Link>

              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart(product);
                }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: '#9C7A4E'
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  duration: 0.2,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                style={{
                  width: 'calc(100% - 3rem)',
                  margin: '0 1.5rem 1.5rem 1.5rem',
                  padding: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                  background: '#111111',
                  color: '#F6F1EB',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  fontWeight: 400
                }}
              >
                Add to Cart
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Products;