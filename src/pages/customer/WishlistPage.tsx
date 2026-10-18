import { Link } from 'react-router-dom'
import { PRODUCTS } from '../../data/products'
import { useWishlistStore } from '../../stores/wishlistStore'
import { ProductCard } from '../../components/product/ProductCard'

export function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids)
  const list = PRODUCTS.filter((p) => ids.includes(p.id))

  return (
    <div>
      <header style={{ background: 'var(--navy)', color: 'white', padding: '14px 16px' }}>
        <h1 style={{ fontSize: 17, fontWeight: 700 }}>Wishlist ({list.length})</h1>
      </header>
      {list.length === 0 ? (
        <div className="empty" style={{ minHeight: '60dvh' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>♡</div>
          <h3>Your wishlist is empty</h3>
          <p style={{ marginBottom: 16 }}>Save items you love</p>
          <Link to="/" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 16 }}>
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
