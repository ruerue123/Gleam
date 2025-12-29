import HeroSection from '../components/redesign/HeroSection'
import ProductGrid from '../components/redesign/ProductGrid'
import BestsellersSection from '../components/redesign/BestsellersSection'
import BrandPromise from '../components/redesign/BrandPromise'
import LifestyleSection from '../components/redesign/LifestyleSection'
import ComingSoon from '../components/redesign/ComingSoon'

function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Shop by Scent Section */}
      <ProductGrid />

      {/* Most Loved Section */}
      <BestsellersSection />

      {/* Brand Promise Section */}
      <BrandPromise />

      {/* Lifestyle / Emotion Section */}
      <LifestyleSection />

      {/* Coming Soon Section */}
      <ComingSoon />
    </div>
  )
}

export default HomePage
