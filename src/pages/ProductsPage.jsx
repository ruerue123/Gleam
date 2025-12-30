import Products from '../components/Products'

function ProductsPage({ onAddToCart, onAddToFavourites, favourites }) {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 'clamp(80px, 10vw, 100px)', background: '#FAFAF8' }}>
      <Products onAddToCart={onAddToCart} onAddToFavourites={onAddToFavourites} favourites={favourites} />
    </div>
  )
}

export default ProductsPage
