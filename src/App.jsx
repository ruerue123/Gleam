import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartNotification from './components/CartNotification'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import AboutPage from './pages/AboutPage'
import CollectionDetailPage from './pages/CollectionDetailPage'

function App() {
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <Router>
      <div>
        <Navbar cartCount={cart.length} />
        <CartNotification show={showNotification} />
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
          <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
          <Route path="/collection/:slug" element={<CollectionDetailPage onAddToCart={handleAddToCart} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App