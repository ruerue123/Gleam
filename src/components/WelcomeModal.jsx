import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

function WelcomeModal() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('gleam_has_visited')

    if (!hasVisited) {
      // Show modal after a short delay for better UX
      setTimeout(() => {
        setShowModal(true)
      }, 500)
    }
  }, [])

  const handleClose = () => {
    setShowModal(false)
    localStorage.setItem('gleam_has_visited', 'true')
  }

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #FAFAF8 0%, #EDECE4 100%)',
              borderRadius: '12px',
              maxWidth: '500px',
              width: '100%',
              padding: 'clamp(2rem, 5vw, 3rem)',
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #EDECE4',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: '#8B7355'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#8B7355'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.borderColor = '#8B7355'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                e.currentTarget.style.color = '#8B7355'
                e.currentTarget.style.borderColor = '#EDECE4'
              }}
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Modal Content */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                fontSize: 'clamp(3rem, 8vw, 4rem)',
                marginBottom: '1rem'
              }}>
                ✨
              </div>

              <h2 style={{
                fontFamily: "'Cardo', serif",
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                fontWeight: 400,
                letterSpacing: '1px',
                marginBottom: '1rem',
                color: '#171515'
              }}>
                Welcome to Gleam
              </h2>

              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: 1.6,
                color: '#171515',
                opacity: 0.8,
                marginBottom: '1.5rem',
                fontWeight: 300,
                fontStyle: 'italic'
              }}>
                Discover candles that speak to your mood. From quiet revenge to soft feelings, we've got the vibe you need.
              </p>

              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                color: '#8B7355',
                marginBottom: '2rem',
                fontWeight: 400
              }}>
                Handmade. Hand-poured. Made with intention.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleClose}
              style={{
                width: '100%',
                padding: 'clamp(0.9rem, 2vw, 1.1rem)',
                background: '#111111',
                color: '#F6F1EB',
                border: 'none',
                borderRadius: '50px',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 400,
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#8B7355'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 115, 85, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#111111'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Start Shopping
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeModal
