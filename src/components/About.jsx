function About() {
  return (
    <section id="about" style={{
      padding: 'clamp(4rem, 10vw, 8rem) 5%',
      background: 'linear-gradient(to bottom, #EDECE4 0%, #ffffff 50%, #EDECE4 100%)'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: "'Cardo', serif",
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 400,
          marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          letterSpacing: '0.5px',
          color: '#171515'
        }}>
          About Gleam
        </h2>

        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
          lineHeight: 1.8,
          color: '#171515',
          opacity: 0.85,
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 300
        }}>
          Gleam is for people who heal softly, feel deeply, and still enjoy a little petty satisfaction — all wrapped in clean, modern luxury.
        </p>

        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
          lineHeight: 1.8,
          color: '#171515',
          opacity: 0.85,
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 300
        }}>
          Every candle is handmade with natural soy wax and thoughtfully crafted scents that honor your emotions, your boundaries, and your quiet power.
        </p>

        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1.15rem, 2.3vw, 1.35rem)',
          lineHeight: 1.8,
          color: '#8B7355',
          fontStyle: 'italic',
          fontWeight: 400
        }}>
          Soft on the outside. Dangerous on the inside.
        </p>
      </div>

      {/* Our Promise Section */}
      <div style={{
        maxWidth: '1200px',
        margin: 'clamp(4rem, 8vw, 6rem) auto 0',
        padding: 'clamp(3rem, 6vw, 4rem) clamp(2rem, 4vw, 3rem)',
        background: 'linear-gradient(135deg, #F6F1EB 0%, #EDECE4 100%)',
        borderRadius: '4px'
      }}>
        <h3 style={{
          fontFamily: "'Cardo', serif",
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 400,
          textAlign: 'center',
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          letterSpacing: '0.5px',
          color: '#171515'
        }}>
          Crafted For Quality
        </h3>

        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          textAlign: 'center',
          color: '#171515',
          opacity: 0.8,
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          maxWidth: '700px',
          margin: '0 auto clamp(2rem, 4vw, 3rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          lineHeight: 1.6
        }}>
          Our candles are cruelty-free, non-toxic, contain no lead, plastics, paraben, phthalates or synthetic dyes and are made with a natural soy wax blend.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          {/* Natural Soy Wax Blend */}
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '4px',
            border: '1px solid rgba(139, 115, 85, 0.15)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B7355 0%, #9C7A4E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: '#ffffff',
              fontSize: '1.5rem'
            }}>
              🕯️
            </div>
            <h4 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              fontWeight: 400,
              marginBottom: '0.8rem',
              letterSpacing: '0.5px',
              color: '#171515'
            }}>
              Natural Soy Wax Blend
            </h4>
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              lineHeight: 1.6,
              color: '#171515',
              opacity: 0.75,
              fontWeight: 300,
              fontStyle: 'italic'
            }}>
              Made with premium natural soy wax for a clean, even burn that lasts.
            </p>
          </div>

          {/* Custom Fragrance Oils */}
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '4px',
            border: '1px solid rgba(139, 115, 85, 0.15)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B7355 0%, #9C7A4E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: '#ffffff',
              fontSize: '1.5rem'
            }}>
              ✨
            </div>
            <h4 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              fontWeight: 400,
              marginBottom: '0.8rem',
              letterSpacing: '0.5px',
              color: '#171515'
            }}>
              Custom Fragrance Oils
            </h4>
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              lineHeight: 1.6,
              color: '#171515',
              opacity: 0.75,
              fontWeight: 300,
              fontStyle: 'italic'
            }}>
              Carefully crafted scents designed to evoke emotion and create ambiance.
            </p>
          </div>

          {/* Organic Cotton Wicks */}
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '4px',
            border: '1px solid rgba(139, 115, 85, 0.15)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B7355 0%, #9C7A4E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: '#ffffff',
              fontSize: '1.5rem'
            }}>
              🌱
            </div>
            <h4 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              fontWeight: 400,
              marginBottom: '0.8rem',
              letterSpacing: '0.5px',
              color: '#171515'
            }}>
              Organic Cotton Wicks
            </h4>
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              lineHeight: 1.6,
              color: '#171515',
              opacity: 0.75,
              fontWeight: 300,
              fontStyle: 'italic'
            }}>
              Lead-free cotton wicks ensure a clean, safe burn every time.
            </p>
          </div>

          {/* Non-Toxic */}
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '4px',
            border: '1px solid rgba(139, 115, 85, 0.15)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B7355 0%, #9C7A4E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: '#ffffff',
              fontSize: '1.5rem'
            }}>
              🍃
            </div>
            <h4 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              fontWeight: 400,
              marginBottom: '0.8rem',
              letterSpacing: '0.5px',
              color: '#171515'
            }}>
              Non-Toxic
            </h4>
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              lineHeight: 1.6,
              color: '#171515',
              opacity: 0.75,
              fontWeight: 300,
              fontStyle: 'italic'
            }}>
              Free from harmful chemicals, safe for you and your loved ones.
            </p>
          </div>

          {/* Cruelty Free */}
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '4px',
            border: '1px solid rgba(139, 115, 85, 0.15)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B7355 0%, #9C7A4E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: '#ffffff',
              fontSize: '1.5rem'
            }}>
              🐰
            </div>
            <h4 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              fontWeight: 400,
              marginBottom: '0.8rem',
              letterSpacing: '0.5px',
              color: '#171515'
            }}>
              Cruelty Free
            </h4>
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              lineHeight: 1.6,
              color: '#171515',
              opacity: 0.75,
              fontWeight: 300,
              fontStyle: 'italic'
            }}>
              Never tested on animals, always made with love and intention.
            </p>
          </div>

          {/* Reusable Glass Jars */}
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '4px',
            border: '1px solid rgba(139, 115, 85, 0.15)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B7355 0%, #9C7A4E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: '#ffffff',
              fontSize: '1.5rem'
            }}>
              ♻️
            </div>
            <h4 style={{
              fontFamily: "'Cardo', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              fontWeight: 400,
              marginBottom: '0.8rem',
              letterSpacing: '0.5px',
              color: '#171515'
            }}>
              Reusable Glass Jars
            </h4>
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              lineHeight: 1.6,
              color: '#171515',
              opacity: 0.75,
              fontWeight: 300,
              fontStyle: 'italic'
            }}>
              Beautiful vessels you can repurpose long after the candle is gone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;