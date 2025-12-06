import Hero from '../components/Hero'
import Collections from '../components/Collections'
import BestSellers from '../components/BestSellers'
import Reviews from '../components/Reviews'
import Features from '../components/Features'

function HomePage({ onAddToCart }) {
  return (
    <div>
      <Hero />
      <Collections />
      <BestSellers onAddToCart={onAddToCart} />
      <Reviews />
      <Features />
    </div>
  )
}

export default HomePage
