import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartNotification from './components/CartNotification'

// Lazy load page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ScentsPage = lazy(() => import('./pages/CollectionsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const FavouritesPage = lazy(() => import('./pages/FavouritesPage'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

// Loading component for Suspense fallback
const PageLoader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: "'Cormorant', serif",
    fontSize: '1.2rem',
    color: '#8B7355'
  }}>
    Loading...
  </div>
)

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
    // Clear current cart and favourites first to prevent leakage between users
    const userKey = user ? `gleam_cart_${user._id}` : 'gleam_cart_guest';
    const favouritesKey = user ? `gleam_favourites_${user._id}` : 'gleam_favourites_guest';

    const savedCart = localStorage.getItem(userKey);
    const savedFavourites = localStorage.getItem(favouritesKey);

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
      <AppLayout
        cart={cart}
        favourites={favourites}
        showNotification={showNotification}
        handleAddToCart={handleAddToCart}
        handleAddToFavourites={handleAddToFavourites}
        handleRemoveFromCart={handleRemoveFromCart}
        handleRemoveFromFavourites={handleRemoveFromFavourites}
        handleClearCart={handleClearCart}
      />
    </Router>
  )
}

function AppLayout({ cart, favourites, showNotification, handleAddToCart, handleAddToFavourites, handleRemoveFromCart, handleRemoveFromFavourites, handleClearCart }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {!isAdminRoute && <Navbar cartCount={cart.length} favouritesCount={favourites.length} />}
      {!isAdminRoute && <CartNotification show={showNotification} />}
      <AnimatedRoutes
        handleAddToCart={handleAddToCart}
        handleAddToFavourites={handleAddToFavourites}
        handleRemoveFromCart={handleRemoveFromCart}
        handleRemoveFromFavourites={handleRemoveFromFavourites}
        handleClearCart={handleClearCart}
        cart={cart}
        favourites={favourites}
      />
      {!isAdminRoute && <Footer />}
    </div>
  );
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
      <Suspense fallback={<PageLoader />}>
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
          <Route path="/scents" element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ScentsPage />
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
              <ProfilePage cart={cart} favourites={favourites} />
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
      </Suspense>
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