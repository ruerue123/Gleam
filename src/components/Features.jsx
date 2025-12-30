function Features() {
  const scrollContainerStyle = `
    .features-container {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 2rem;
      padding-bottom: 1rem;
      -webkit-overflow-scrolling: touch;
    }

    .features-container > div {
      flex: 0 0 300px;
      scroll-snap-align: center;
    }

    .features-container::-webkit-scrollbar {
      height: 6px;
    }

    .features-container::-webkit-scrollbar-track {
      background: rgba(23, 21, 21, 0.1);
      border-radius: 3px;
    }

    .features-container::-webkit-scrollbar-thumb {
      background: #8B7355;
      border-radius: 3px;
    }

    @media (min-width: 1200px) {
      .features-container > div {
        flex: 0 0 280px;
      }
    }
  `;

  const features = [
    {
      id: 1,
      title: 'Hand-poured',
      description: 'Every candle is carefully crafted by hand with attention to detail.'
    },
    {
      id: 2,
      title: 'Clean-burning wax',
      description: 'Made with quality ingredients that burn evenly and safely.'
    },
    {
      id: 3,
      title: 'Designed for real life, not just shelves',
      description: 'Created to bring warmth and calm to your everyday moments.'
    },
    {
      id: 4,
      title: 'Made with intention',
      description: 'Each scent is thoughtfully developed to create a meaningful experience.'
    },
    {
      id: 5,
      title: 'Made for moments that matter',
      description: 'Perfect for evenings that stretch, mornings that need gentleness, and spaces that deserve care.'
    }
  ];

  return (
    <section style={{
      background: 'linear-gradient(to bottom, #FAFAF8 0%, #EDECE4 100%)',
      padding: 'clamp(2rem, 4vw, 3rem) 5%'
    }}>
      <style>{scrollContainerStyle}</style>

      {/* Section Heading */}
      <h2 style={{
        fontFamily: "'Cardo', serif",
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 400,
        textAlign: 'center',
        marginBottom: 'clamp(2rem, 4vw, 3rem)',
        color: '#171515',
        letterSpacing: '0.5px'
      }}>
        The Gleam Promise
      </h2>

      <div className="features-container" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}>
        {features.map((feature) => (
          <div
            key={feature.id}
            style={{
              textAlign: 'center',
              padding: 'clamp(1.5rem, 2vw, 2rem)',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '4px',
              border: '1px solid rgba(139, 115, 85, 0.1)'
            }}
          >
            {/* Title */}
            <h3 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              fontWeight: 400,
              marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)',
              letterSpacing: '0.5px',
              color: '#171515'
            }}>
              {feature.title}
            </h3>

            {/* Description */}
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
              lineHeight: 1.6,
              color: '#171515',
              opacity: 0.75,
              fontWeight: 300,
              fontStyle: 'italic'
            }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
