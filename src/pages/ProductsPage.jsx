import Products from '../components/Products'

function ProductsPage({ onAddToCart }) {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 'clamp(90px, 10vw, 110px)', paddingBottom: '3rem' }}>
      <Products onAddToCart={onAddToCart} />
    </div>
  )
}

export default ProductsPage
