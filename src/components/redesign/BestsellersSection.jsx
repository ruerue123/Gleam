import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

function BestsellersSection() {
  const [bestsellers, setBestsellers] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`)
        const data = await response.json()
        if (data.success) {
          // Filter bestsellers and limit to 4
          const bestsellerProducts = data.data
            .filter(product => product.bestseller === true)
            .slice(0, 4)
          setBestsellers(bestsellerProducts)
        }
      } catch (error) {
        console.error('Error fetching bestsellers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBestsellers()
  }, [API_URL])

  // Don't show section if no bestsellers
  if (!loading && bestsellers.length === 0) {
    return null
  }

  if (loading) {
    return null
  }

  return (
    <section className="bg-gleam-beige px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cardo text-4xl md:text-5xl text-gleam-dark mb-4">
            Most Loved
          </h2>
          <p className="font-cormorant text-lg text-gleam-dark/70 italic max-w-2xl mx-auto">
            The scents our customers reach for again and again.
          </p>
        </motion.div>

        {/* Bestsellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestsellersSection
