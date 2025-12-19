import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
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
        <AnimatedRoutes
          handleAddToCart={handleAddToCart}
          handleAddToFavourites={handleAddToFavourites}
          handleRemoveFromCart={handleRemoveFromCart}
          handleRemoveFromFavourites={handleRemoveFromFavourites}
          handleClearCart={handleClearCart}
          cart={cart}
          favourites={favourites}
        />
        <Footer />
      </div>
    </Router>
  )
}

function AnimatedRoutes({ handleAddToCart, handleAddToFavourites, handleRemoveFromCart, handleRemoveFromFavourites, handleClearCart, cart, favourites }) {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    duration: 0.4,
    ease: [0.4, 0.0, 0.2, 1]
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HomePage onAddToCart={handleAddToCart} onAddToFavourites={handleAddToFavourites} favourites={favourites} />
          </motion.div>
        } />
        <Route path="/collections" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <CollectionsPage />
          </motion.div>
        } />
        <Route path="/products" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ProductsPage onAddToCart={handleAddToCart} onAddToFavourites={handleAddToFavourites} favourites={favourites} />
          </motion.div>
        } />
        <Route path="/product/:id" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ProductDetailPage onAddToCart={handleAddToCart} onAddToFavourites={handleAddToFavourites} favourites={favourites} />
          </motion.div>
        } />
        <Route path="/collection/:slug" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <CollectionDetailPage onAddToCart={handleAddToCart} onAddToFavourites={handleAddToFavourites} favourites={favourites} />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AboutPage />
          </motion.div>
        } />
        <Route path="/contact" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ContactPage />
          </motion.div>
        } />
        <Route path="/login" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LoginPage />
          </motion.div>
        } />
        <Route path="/profile" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ProfilePage />
          </motion.div>
        } />
        <Route path="/cart" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <CartPage cart={cart} onRemove={handleRemoveFromCart} onClearCart={handleClearCart} />
          </motion.div>
        } />
        <Route path="/favourites" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FavouritesPage favourites={favourites} onRemove={handleRemoveFromFavourites} onAddToCart={handleAddToCart} />
          </motion.div>
        } />
        <Route path="/orders" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <OrdersPage />
          </motion.div>
        } />
        <Route path="/admin" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AdminDashboard />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
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