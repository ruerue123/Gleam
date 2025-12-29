import { motion } from 'framer-motion'

function HeroSection() {
  const scrollToShop = () => {
    const shopSection = document.getElementById('shop-by-scent')
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-gleam-cream to-white px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cardo text-5xl md:text-6xl lg:text-7xl font-normal text-gleam-dark mb-6 leading-tight"
        >
          Candles for quiet moments.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-cormorant text-xl md:text-2xl text-gleam-dark/80 italic mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Hand-poured jar candles designed to calm, ground, and gently elevate your space.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToShop}
          className="inline-block px-10 py-4 bg-gleam-brown text-white font-cormorant text-lg font-medium tracking-wide rounded-sm hover:bg-gleam-brown/90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          Shop Candles
        </motion.button>
      </div>
    </section>
  )
}

export default HeroSection
