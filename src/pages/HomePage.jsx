import Hero from '../components/Hero'
import Collections from '../components/Collections'
import BestSellers from '../components/BestSellers'
import Features from '../components/Features'

function HomePage({ onAddToCart, onAddToFavourites, favourites }) {
  return (
    <div>
      <Hero />
      <Features />
      <Collections />
      <BestSellers onAddToCart={onAddToCart} onAddToFavourites={onAddToFavourites} favourites={favourites} />
    </div>
  )
}

export default HomePage
