function Hero() {
  return (
    <section id="home" style={{
      marginTop: 'clamp(70px, 12vw, 95px)',
      minHeight: 'clamp(65vh, 80vh, 85vh)',
      backgroundImage: 'url(/images/Hero.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div style={{
        padding: 'clamp(2rem, 5vw, 4rem)',
        maxWidth: '900px'
      }}>
        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          fontStyle: 'italic',
          color: '#8B7355',
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          fontWeight: 400,
          animation: 'fadeInUp 1s ease',
          letterSpacing: '0.5px'
        }}>
          Handcrafted with intention
        </p>

        <h1 style={{
          fontFamily: "'Cardo', serif",
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          marginBottom: 'clamp(1.2rem, 3vw, 2rem)',
          letterSpacing: '1px',
          fontWeight: 400,
          color: '#171515',
          lineHeight: 1.1,
          animation: 'fadeInUp 1.2s ease'
        }}>
          Illuminate Your Soul
        </h1>

        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
          color: '#171515',
          opacity: 0.85,
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300,
          animation: 'fadeInUp 1.4s ease',
          padding: '0 clamp(1rem, 3vw, 2rem)',
          lineHeight: 1.6
        }}>
          Luxury candles for people who heal softly, feel deeply, and embrace their quiet power
        </p>

        <a href="#collections" style={{
          display: 'inline-block',
          padding: 'clamp(0.9rem, 2vw, 1.1rem) clamp(2.2rem, 5vw, 3rem)',
          background: '#8B7355',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '2px',
          fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
          fontFamily: "'Cormorant', serif",
          fontWeight: 500,
          letterSpacing: '0.5px',
          transition: 'all 0.3s ease',
          animation: 'fadeInUp 1.6s ease',
          border: '1px solid #8B7355'
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
          Explore Collections
        </a>
      </div>
    </section>
  );
}

export default Hero;
