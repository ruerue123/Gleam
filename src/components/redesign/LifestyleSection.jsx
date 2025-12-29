import { motion } from 'framer-motion'

function LifestyleSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-gleam-accent to-gleam-beige rounded-sm overflow-hidden">
              {/* Placeholder for lifestyle image */}
              <img
                src="https://images.unsplash.com/photo-1602874801006-e75a8b5b48c3?w=800&auto=format&fit=crop"
                alt="Gleam candle creating a peaceful atmosphere"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-cardo text-3xl md:text-4xl text-gleam-dark mb-6 leading-tight">
              Made for moments that matter
            </h2>
            <p className="font-cormorant text-lg md:text-xl text-gleam-dark/80 italic leading-relaxed mb-6">
              Gleam candles are made for evenings that stretch, mornings that need gentleness, and spaces that deserve care.
            </p>
            <p className="font-cormorant text-lg md:text-xl text-gleam-dark/80 italic leading-relaxed">
              Light one when you need to pause, reflect, or simply be present.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LifestyleSection
