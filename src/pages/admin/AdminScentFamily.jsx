function AdminScentFamily() {
  const scents = [
    {
      id: 1,
      name: 'EMBER',
      description: 'Warm notes that wrap your space in calm and comfort',
      productCount: 0,
      color: '#A96A7B'
    },
    {
      id: 2,
      name: 'ZEST',
      description: 'Clean, vibrant fragrances that brighten your space and mood.',
      productCount: 0,
      color: '#9C7A4E'
    },
    {
      id: 3,
      name: 'SERENE',
      description: 'Soft, therapeutic blends designed for peace and relaxation.',
      productCount: 0,
      color: '#E7CFC3'
    },
    {
      id: 4,
      name: 'ROOT',
      description: 'Rich aromas that ground your space and linger beautifully.',
      productCount: 0,
      color: '#C6A75E'
    }
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#171515', marginBottom: '0.5rem' }}>
        Scent Families
      </h1>
      <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1.1rem', color: '#171515', opacity: 0.7, marginBottom: '2rem', fontStyle: 'italic' }}>
        Manage your candle scent categories
      </p>

      {/* Scent Family Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {scents.map((scent) => (
          <div
            key={scent.id}
            style={{
              background: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #EDECE4',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            }}
          >
            {/* Color Badge */}
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: scent.color,
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem'
              }}
            >
              🌸
            </div>

            {/* Scent Name */}
            <h3 style={{
              fontFamily: "'Cardo', serif",
              fontSize: '1.4rem',
              fontWeight: 400,
              marginBottom: '0.5rem',
              color: '#171515',
              letterSpacing: '0.5px'
            }}>
              {scent.name}
            </h3>

            {/* Description */}
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: '0.95rem',
              color: '#171515',
              opacity: 0.7,
              lineHeight: 1.6,
              marginBottom: '1rem',
              fontStyle: 'italic'
            }}>
              {scent.description}
            </p>

            {/* Product Count */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              background: '#FAFAF8',
              borderRadius: '6px',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🕯️</span>
              <span style={{
                fontFamily: "'Cormorant', serif",
                fontSize: '0.95rem',
                color: '#171515'
              }}>
                {scent.productCount} {scent.productCount === 1 ? 'product' : 'products'}
              </span>
            </div>

            {/* Action Button */}
            <button
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'transparent',
                border: '1px solid #8B7355',
                borderRadius: '4px',
                color: '#8B7355',
                fontFamily: "'Cormorant', serif",
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#8B7355';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#8B7355';
              }}
            >
              View Products
            </button>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #EDECE4'
      }}>
        <h3 style={{
          fontFamily: "'Cardo', serif",
          fontSize: '1.3rem',
          color: '#171515',
          marginBottom: '1rem'
        }}>
          About Scent Families
        </h3>
        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: '1rem',
          color: '#171515',
          opacity: 0.7,
          lineHeight: 1.8
        }}>
          Scent families help organize your candles into distinct categories based on their fragrance profiles.
          Each family represents a unique aromatic experience, making it easier for customers to discover scents they'll love.
        </p>
      </div>
    </div>
  );
}

export default AdminScentFamily;
