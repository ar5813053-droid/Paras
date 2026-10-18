import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import { formatPrice, getDiscount } from '../../data/products'
import { useWishlistStore } from '../../stores/wishlistStore'

export function ProductCard({ product }: { product: Product }) {
  const toggle = useWishlistStore((s) => s.toggle)
  const wished = useWishlistStore((s) => s.has(product.id))
  const discount = getDiscount(product.mrp, product.offerPrice)

  return (
    <Link to={`/product/${product.id}`} className="card" style={{ display: 'block', position: 'relative' }}>
      <div style={{ aspectRatio: '3/4', background: '#f3f4f6', position: 'relative' }}>
        <img
          src={product.images[0]}
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <button
          onClick={(e) => { e.preventDefault(); toggle(product.id) }}
          style={{
            position: 'absolute', top: 8, right: 8, width: 32, height: 32,
            borderRadius: '50%', background: 'white', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 16,
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          }}
        >
          {wished ? '❤️' : '♡'}
        </button>
        {product.isNew && (
          <span className="badge badge-new" style={{ position: 'absolute', top: 8, left: 8 }}>NEW</span>
        )}
      </div>
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{product.articleNo}</div>
        <h3 style={{
          fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginBottom: 4,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{product.title}</h3>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>{product.fabric}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
          <span className="price" style={{ fontSize: 15 }}>{formatPrice(product.offerPrice)}</span>
          <span className="mrp">{formatPrice(product.mrp)}</span>
          <span className="badge badge-discount">{discount}% OFF</span>
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <div style={{ fontSize: 11, color: '#D97706', marginTop: 4, fontWeight: 600 }}>
            Only {product.stock} left
          </div>
        )}
      </div>
    </Link>
  )
}
