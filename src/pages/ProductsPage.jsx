import Products from '../components/Products'

function ProductsPage({ onAddToCart, onAddToFavourites, favourites }) {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 'clamp(90px, 10vw, 110px)', paddingBottom: '3rem' }}>
      <Products onAddToCart={onAddToCart} onAddToFavourites={onAddToFavourites} favourites={favourites} />
    </div>
  )
}

export default ProductsPage
