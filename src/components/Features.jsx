function Features() {
  const scrollContainerStyle = `
    .features-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
      gap: clamp(3rem, 6vw, 5rem);
    }

    @media (max-width: 768px) {
      .features-container {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 2rem;
        padding-bottom: 1rem;
        -webkit-overflow-scrolling: touch;
      }

      .features-container > div {
        flex: 0 0 85%;
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
    }
  `;

  const features = [
    {
      id: 1,
      icon: (
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#B89968" strokeWidth="2.5">
          <path d="M50 20 L30 35 L30 25 L50 10 L70 25 L70 35 Z" />
          <path d="M45 40 Q50 30 55 40" />
          <ellipse cx="50" cy="50" rx="15" ry="20" />
          <path d="M35 70 Q50 80 65 70" />
        </svg>
      ),
      title: 'Handmade & Hand-Poured',
      description: 'Designed with integrity and durably crafted for everyday use.'
    },
    {
      id: 2,
      icon: (
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#B89968" strokeWidth="2.5">
          <path d="M30 50 Q30 30 50 25 Q70 30 70 50" />
          <path d="M40 55 L45 50 L50 58 L60 40" strokeLinecap="round" />
          <ellipse cx="50" cy="65" rx="20" ry="15" />
          <path d="M45 45 Q48 40 51 45" />
        </svg>
      ),
      title: 'Eco-Friendly Shipping',
      description: 'Our environment-friendly packaging creates a delightful unboxing experience that\'s not harmful to the planet.'
    },
    {
      id: 3,
      icon: (
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#B89968" strokeWidth="2.5">
          <path d="M50 25 Q35 35 35 50 Q35 65 50 75 Q65 65 65 50 Q65 35 50 25 Z" />
          <path d="M42 48 L47 53 L58 42" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Happiness Guarantee',
      description: 'If you are unhappy with your order, please reach out to us within 30 days, and we will provide further details for returns.'
    }
  ];

  return (
    <section style={{
      background: 'linear-gradient(to bottom, #FAFAF8 0%, #EDECE4 100%)',
      padding: 'clamp(2rem, 4vw, 3rem) 5%'
    }}>
      <style>{scrollContainerStyle}</style>
      <div className="features-container" style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {features.map((feature) => (
          <div
            key={feature.id}
            style={{
              textAlign: 'center',
              padding: 'clamp(0.8rem, 1.5vw, 1.2rem)'
            }}
          >
            {/* Icon */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)'
            }}>
              <div style={{
                transform: 'scale(0.75)'
              }}>
                {feature.icon}
              </div>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              fontWeight: 400,
              marginBottom: 'clamp(0.5rem, 1vw, 0.7rem)',
              letterSpacing: '0.5px',
              color: '#171515',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {feature.title}
            </h3>

            {/* Description */}
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
              lineHeight: 1.6,
              color: '#171515',
              opacity: 0.75,
              fontWeight: 300,
              maxWidth: '350px',
              margin: '0 auto'
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
