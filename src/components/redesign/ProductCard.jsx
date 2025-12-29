import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative w-full h-80 bg-gleam-accent overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {product.emoji || '🕯️'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col">
        {/* Product Name */}
        <h3 className="font-cardo text-xl mb-2 text-gleam-dark">
          {product.name}
        </h3>

        {/* Description/Scent */}
        <p className="font-cormorant text-base text-gleam-dark/70 italic mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="font-cardo text-lg font-medium text-gleam-dark mb-4">
          ${product.price.toFixed(2)}
        </div>

        {/* CTA Button */}
        <Link
          to={`/product/${product.slug}`}
          className="w-full py-3 px-6 bg-transparent border border-gleam-brown text-gleam-brown text-center font-cormorant font-medium tracking-wide rounded-sm hover:bg-gleam-brown hover:text-white transition-all duration-300"
        >
          View Candle
        </Link>
      </div>
    </motion.div>
  )
}

export default ProductCard
