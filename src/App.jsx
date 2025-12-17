import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
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
import OrdersPage from './pages/OrdersPage'
import AdminDashboard from './pages/admin/AdminDashboard'

function AppContent() {
  const { user } = useAuth();

  // Get user-specific localStorage keys
  const getStorageKey = (key) => {
    return user ? `gleam_${key}_${user._id}` : `gleam_${key}_guest`;
  };

  // Initialize cart from user-specific localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(getStorageKey('cart'));
    return saved ? JSON.parse(saved) : [];
  });

  // Initialize favourites from user-specific localStorage
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem(getStorageKey('favourites'));
    return saved ? JSON.parse(saved) : [];
  });

  const [showNotification, setShowNotification] = useState(false);

  // Load user-specific cart and favourites when user changes (login/logout)
  useEffect(() => {
    const savedCart = localStorage.getItem(getStorageKey('cart'));
    const savedFavourites = localStorage.getItem(getStorageKey('favourites'));

    setCart(savedCart ? JSON.parse(savedCart) : []);
    setFavourites(savedFavourites ? JSON.parse(savedFavourites) : []);
  }, [user]);

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

  const handleClearCart = () => {
    setCart([]);
  };

  // Save cart to user-specific localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(getStorageKey('cart'), JSON.stringify(cart));
  }, [cart, user]);

  // Save favourites to user-specific localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(getStorageKey('favourites'), JSON.stringify(favourites));
  }, [favourites, user]);

  return (
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
          <Route path="/cart" element={<CartPage cart={cart} onRemove={handleRemoveFromCart} onClearCart={handleClearCart} />} />
          <Route path="/favourites" element={<FavouritesPage favourites={favourites} onRemove={handleRemoveFromFavourites} onAddToCart={handleAddToCart} />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App