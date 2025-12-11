function Reviews() {
  const scrollContainerStyle = `
    .reviews-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
      gap: clamp(2rem, 4vw, 3rem);
    }

    @media (max-width: 768px) {
      .reviews-container {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 1.5rem;
        padding-bottom: 1rem;
        -webkit-overflow-scrolling: touch;
      }

      .reviews-container > div {
        flex: 0 0 85%;
        scroll-snap-align: center;
      }

      .reviews-container::-webkit-scrollbar {
        height: 6px;
      }

      .reviews-container::-webkit-scrollbar-track {
        background: #EDECE4;
        border-radius: 3px;
      }

      .reviews-container::-webkit-scrollbar-thumb {
        background: #8B7355;
        border-radius: 3px;
      }
    }
  `;

  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      date: 'November 2024',
      review: 'The "Blocked & Blessed" candle is everything! Burns evenly and the scent is absolutely divine. Perfect for my self-care nights.',
      product: 'Blocked & Blessed'
    },
    {
      id: 2,
      name: 'Amara T.',
      rating: 5,
      date: 'November 2024',
      review: 'I bought the entire Luxe Gleam collection and I\'m obsessed. The quality is unmatched and they make my home feel like a sanctuary.',
      product: 'Luxe Gleam Collection'
    },
    {
      id: 3,
      name: 'Jordan K.',
      rating: 5,
      date: 'October 2024',
      review: 'These candles are more than just candles - they\'re an experience. The Mood Collection helped me reset my entire energy.',
      product: 'Mood Collection'
    },
    {
      id: 4,
      name: 'Tanya R.',
      rating: 5,
      date: 'October 2024',
      review: 'After the Cry has literally become my therapy candle. The scent is warm and comforting, exactly what I needed.',
      product: 'After the Cry'
    }
  ];

  const renderStars = (rating) => {
    return '★'.repeat(rating);
  };

  return (
    <section style={{
      background: '#ffffff',
      padding: 'clamp(4rem, 10vw, 8rem) 5%'
    }}>
      <style>{scrollContainerStyle}</style>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
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
          What Our Customers Say
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
          Hear from those who light their feelings
        </p>

        <div className="reviews-container">
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                background: '#FAFAF8',
                padding: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                borderRadius: '4px',
                border: '1px solid #EDECE4',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Stars */}
              <div style={{
                color: '#8B7355',
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                marginBottom: 'clamp(0.8rem, 1.5vw, 1rem)',
                letterSpacing: '2px'
              }}>
                {renderStars(review.rating)}
              </div>

              {/* Review Text */}
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.7,
                color: '#171515',
                opacity: 0.85,
                marginBottom: 'clamp(1.2rem, 2vw, 1.5rem)',
                fontWeight: 300,
                fontStyle: 'italic'
              }}>
                "{review.review}"
              </p>

              {/* Product Name */}
              <div style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
                color: '#8B7355',
                marginBottom: 'clamp(0.6rem, 1.2vw, 0.8rem)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {review.product}
              </div>

              {/* Customer Info */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 'clamp(0.8rem, 1.5vw, 1rem)',
                borderTop: '1px solid rgba(23, 21, 21, 0.08)'
              }}>
                <div style={{
                  fontFamily: "'Cardo', serif",
                  fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
                  color: '#171515',
                  fontWeight: 500
                }}>
                  {review.name}
                </div>
                <div style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: 'clamp(0.85rem, 1.4vw, 0.9rem)',
                  color: '#171515',
                  opacity: 0.6,
                  fontWeight: 300
                }}>
                  {review.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
