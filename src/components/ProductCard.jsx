import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart, onAddToFavourites, isFavourite = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavHovered, setIsFavHovered] = useState(false);

  const handleAddToFavourites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToFavourites) {
      onAddToFavourites(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Link
      to={`/product/${product.slug || product._id}`}
      style={{
        textDecoration: 'none',
        display: 'block'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '4px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          border: '1px solid #EDECE4',
          boxShadow: isHovered ? '0 12px 24px rgba(0, 0, 0, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          position: 'relative'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Wishlist Button */}
        <button
          onClick={handleAddToFavourites}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: isFavourite ? '#8B7355' : 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #EDECE4',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            transform: isFavHovered ? 'scale(1.1)' : 'scale(1)'
          }}
          onMouseEnter={() => setIsFavHovered(true)}
          onMouseLeave={() => setIsFavHovered(false)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isFavourite ? "#ffffff" : "none"}
            stroke={isFavourite ? "#ffffff" : "#8B7355"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Product Image */}
        <div style={{
          width: '100%',
          height: 'clamp(280px, 45vw, 350px)',
          background: 'linear-gradient(to bottom, #EDECE4 0%, #D8D6CE 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(3rem, 6vw, 3.5rem)',
          overflow: 'hidden'
        }}>
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center'
              }}
            />
          ) : (
            <div>{product.emoji || '🕯️'}</div>
          )}
        </div>

        <div style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
          {/* Collection Badge */}
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

          {/* Product Name */}
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

          {/* Description */}
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
            {product.description || product.scent}
          </p>

          {/* Price */}
          <div style={{
            fontFamily: "'Cardo', serif",
            fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
            fontWeight: 500,
            marginBottom: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#171515'
          }}>
            ${product.price.toFixed(2)}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
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
    </Link>
  );
}

export default ProductCard;
