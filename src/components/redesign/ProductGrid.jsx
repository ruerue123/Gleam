import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`)
        const data = await response.json()
        if (data.success) {
          setProducts(data.data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [API_URL])

  if (loading) {
    return (
      <section id="shop-by-scent" className="bg-white px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-cormorant text-xl text-gleam-dark/60 italic">
            Loading candles...
          </p>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section id="shop-by-scent" className="bg-white px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-cardo text-4xl mb-6 text-gleam-dark">Shop by Scent</h2>
          <p className="font-cormorant text-xl text-gleam-dark/60 italic">
            No candles available at the moment. Check back soon.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="shop-by-scent" className="bg-white px-6 py-20">
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
            Shop by Scent
          </h2>
          <p className="font-cormorant text-lg text-gleam-dark/70 italic max-w-2xl mx-auto">
            Each candle is hand-poured with care, crafted to bring warmth and calm to your space.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
