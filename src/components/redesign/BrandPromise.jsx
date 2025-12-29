import { motion } from 'framer-motion'

function BrandPromise() {
  const promises = [
    {
      title: 'Hand-poured in small batches',
      description: 'Every candle is crafted with care and attention to detail.'
    },
    {
      title: 'Clean-burning wax',
      description: 'Made with quality ingredients that burn evenly and safely.'
    },
    {
      title: 'Designed for real life, not just shelves',
      description: 'Created to bring warmth and calm to your everyday moments.'
    },
    {
      title: 'Made with intention',
      description: 'Each scent is thoughtfully developed to create a meaningful experience.'
    }
  ]

  return (
    <section className="bg-gradient-to-b from-gleam-cream to-gleam-beige px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cardo text-4xl md:text-5xl text-gleam-dark mb-4">
            The Gleam Promise
          </h2>
        </motion.div>

        {/* Promise Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/50 backdrop-blur-sm p-8 rounded-sm border border-gleam-brown/10"
            >
              <h3 className="font-cardo text-xl text-gleam-dark mb-3">
                {promise.title}
              </h3>
              <p className="font-cormorant text-base text-gleam-dark/70 italic leading-relaxed">
                {promise.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandPromise
