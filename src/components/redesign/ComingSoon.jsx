import { motion } from 'framer-motion'

function ComingSoon() {
  return (
    <section className="bg-gleam-beige px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="font-cormorant text-xl md:text-2xl text-gleam-dark/70 italic">
          Seasonal releases and curated collections coming soon.
        </p>
      </motion.div>
    </section>
  )
}

export default ComingSoon
