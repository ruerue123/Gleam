import Products from '../components/Products'

function ProductsPage({ onAddToCart }) {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 'clamp(90px, 10vw, 110px)', background: '#FAFAF8' }}>
      <Products onAddToCart={onAddToCart} />
    </div>
  )
}

export default ProductsPage
