import Hero from '../components/Hero'
import Collections from '../components/Collections'
import BestSellers from '../components/BestSellers'
import Features from '../components/Features'
import WelcomeModal from '../components/WelcomeModal'

function HomePage({ onAddToCart, onAddToFavourites, favourites }) {
  return (
    <div>
      <WelcomeModal />
      <Hero />
      <Features />
      <Collections />
      <BestSellers onAddToCart={onAddToCart} />
    </div>
  )
}

export default HomePage
