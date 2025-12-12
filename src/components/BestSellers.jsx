import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

function BestSellers({ onAddToCart, onAddToFavourites, favourites = [] }) {
  const bestSellers = [
    {
      id: 1,
      slug: 'blocked-and-blessed',
      name: 'Blocked & Blessed',
      collection: 'Petty Collection',
      description: 'For the nights when you miss them... but not enough to text.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 3,
      slug: 'unbothered',
      name: 'Unbothered',
      collection: 'Mood Collection',
      description: 'Fresh boundaries. High standards. That\'s the mood.',
      price: 15.00,
      emoji: '🕯️'
    },
    {
      id: 4,
      slug: 'velvet-smoke',
      name: 'Velvet Smoke',
      collection: 'Luxe Gleam',
      description: 'Quiet opulence. For those who move in silence.',
      price: 28.00,
      emoji: '🕯️'
    },
    {
      id: 2,
      slug: 'after-the-cry',
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
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onAddToFavourites={onAddToFavourites}
            isFavourite={favourites.some(fav => fav.id === product.id)}
          />
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
