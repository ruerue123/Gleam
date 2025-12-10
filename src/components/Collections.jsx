import { Link } from 'react-router-dom'

function Collections() {
  const collections = [
    {
      id: 1,
      name: 'Petty Collection',
      slug: 'petty-collection',
      image: '/images/Petty.png',
      description: 'For your quiet revenge. Emotional release wrapped in wit and warmth.',
      color: 'linear-gradient(135deg, #A96A7B 0%, rgba(169, 106, 123, 0.7) 100%)'
    },
    {
      id: 2,
      name: 'Soft Feelings',
      slug: 'soft-feelings',
      image: '/images/Soft.png',
      description: 'Tender moments. Late nights. The scent of safety and self-care.',
      color: 'linear-gradient(135deg, #E7CFC3 0%, rgba(231, 207, 195, 0.7) 100%)'
    },
    {
      id: 3,
      name: 'Mood Collection',
      slug: 'mood-collection',
      image: '/images/Mood.png',
      description: 'Main character energy. Fresh starts and quiet power.',
      color: 'linear-gradient(135deg, #9C7A4E 0%, rgba(156, 122, 78, 0.7) 100%)'
    },
    {
      id: 4,
      name: 'Luxe Gleam',
      slug: 'luxe-gleam',
      image: '/images/Luxe.png',
      description: 'Quiet opulence. The premium line for those who know their worth.',
      color: 'linear-gradient(135deg, #C6A75E 0%, rgba(198, 167, 94, 0.7) 100%)'
    }
  ];

  return (
    <section id="collections" style={{
      padding: 'clamp(4rem, 10vw, 8rem) 5%',
      maxWidth: '1400px',
      margin: '0 auto',
      background: '#ffffff'
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
        Our Collections
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
        Four moods. Infinite feelings.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))',
        gap: 'clamp(1rem, 2.5vw, 2rem)',
        marginTop: '3rem'
      }}>
        {collections.map((collection) => (
          <Link
            key={collection.id}
            to={`/collection/${collection.slug}`}
            style={{
              background: '#FAFAF8',
              borderRadius: '4px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              border: '1px solid #EDECE4',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            }}
          >
            <div style={{
              width: '100%',
              height: 'clamp(180px, 30vw, 280px)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img
                src={collection.image}
                alt={collection.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>

            <div style={{
              padding: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              textAlign: 'center',
              background: '#ffffff'
            }}>
              <h3 style={{
                fontFamily: "'Cardo', serif",
                fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                fontWeight: 400,
                marginBottom: 'clamp(0.4rem, 0.8vw, 0.6rem)',
                letterSpacing: '0.3px',
                color: '#171515'
              }}>
                {collection.name}
              </h3>
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
                color: '#171515',
                opacity: 0.7,
                lineHeight: 1.5,
                fontWeight: 300
              }}>
                {collection.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Collections;