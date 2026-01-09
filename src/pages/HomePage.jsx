import Hero from '../components/Hero'
import Collections from '../components/Collections'
import CandleStyles from '../components/CandleStyles'
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
      <CandleStyles />
      <BestSellers onAddToCart={onAddToCart} onAddToFavourites={onAddToFavourites} favourites={favourites} />
    </div>
  )
}

export default HomePage
