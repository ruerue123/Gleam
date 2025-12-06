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
    </section>
  );
}

export default About;