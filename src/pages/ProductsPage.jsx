import Products from '../components/Products'

function ProductsPage({ onAddToCart, onAddToFavourites, favourites }) {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 'clamp(110px, 12vw, 130px)', background: '#FAFAF8' }}>
      <Products onAddToCart={onAddToCart} onAddToFavourites={onAddToFavourites} favourites={favourites} />
    </div>
  )
}

export default ProductsPage
