import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartNotification from './components/CartNotification'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'
import CollectionDetailPage from './pages/CollectionDetailPage'
import CollectionsPage from './pages/CollectionsPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import CartPage from './pages/CartPage'
import FavouritesPage from './pages/FavouritesPage'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleAddToFavourites = (product) => {
    if (!favourites.find(item => item.id === product.id)) {
      setFavourites([...favourites, product]);
    }
  };

  const handleRemoveFromFavourites = (index) => {
    setFavourites(favourites.filter((_, i) => i !== index));
  };

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar cartCount={cart.length} favouritesCount={favourites.length} />
          <CartNotification show={showNotification} />
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={handleAddToCart} onAddToFavourites={handleAddToFavourites} favourites={favourites} />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} onAddToFavourites={handleAddToFavourites} favourites={favourites} />} />
            <Route path="/product/:id" element={<ProductDetailPage onAddToCart={handleAddToCart} onAddToFavourites={handleAddToFavourites} favourites={favourites} />} />
            <Route path="/collection/:slug" element={<CollectionDetailPage onAddToCart={handleAddToCart} onAddToFavourites={handleAddToFavourites} favourites={favourites} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage cart={cart} onRemove={handleRemoveFromCart} />} />
            <Route path="/favourites" element={<FavouritesPage favourites={favourites} onRemove={handleRemoveFromFavourites} onAddToCart={handleAddToCart} />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App