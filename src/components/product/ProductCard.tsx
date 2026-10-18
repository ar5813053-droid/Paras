import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import { formatPrice, getDiscount } from '../../data/products'
import { useWishlistStore } from '../../stores/wishlistStore'

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const toggle = useWishlistStore((s) => s.toggle)
  const wished = useWishlistStore((s) => s.has(product.id))
  const discount = getDiscount(product.mrp, product.offerPrice)

  return (
    <Link
      to={`/product/${product.id}`}
      className="card"
      style={{ display: 'block', position: 'relative', transition: 'transform 0.15s' }}
    >
      {/* Image */}
      <div style={{
        aspectRatio: compact ? '1/1.15' : '3/4',
        background: 'linear-gradient(145deg, #E8ECF0, #F4F6F8)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src={product.images[0]}
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product.id) }}
          aria-label="Wishlist"
          style={{
            position: 'absolute', top: 8, right: 8,
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {wished ? '❤️' : '♡'}
        </button>
        {/* Badges */}
        <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {product.isNew && <span className="badge badge-new">NEW</span>}
          {product.isBestseller && !product.isNew && <span className="badge badge-best">BESTSELLER</span>}
        </div>
        {/* Discount tag bottom-left */}
        {discount >= 15 && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            background: 'var(--error)', color: 'white',
            fontSize: 11, fontWeight: 700, padding: '3px 8px',
            borderTopRightRadius: 8,
          }}>
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: compact ? '10px' : '12px' }}>
        <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 2, letterSpacing: '0.02em' }}>
          {product.articleNo}
        </div>
        <h3 style={{
          fontSize: compact ? 12.5 : 13.5,
          fontWeight: 600,
          lineHeight: 1.35,
          marginBottom: 3,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          letterSpacing: '-0.01em',
        }}>
          {product.title}
        </h3>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8 }}>
          {product.fabric} · {product.colour}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
          <span className="price" style={{ fontSize: compact ? 14 : 15.5 }}>
            {formatPrice(product.offerPrice)}
          </span>
          <span className="mrp">{formatPrice(product.mrp)}</span>
        </div>
        {product.stock > 0 && product.stock <= 5 && (
          <div style={{ fontSize: 11, color: 'var(--warning)', marginTop: 5, fontWeight: 600 }}>
            Only {product.stock} left
          </div>
        )}
        {product.stock === 0 && (
          <div style={{ fontSize: 11, color: 'var(--error)', marginTop: 5, fontWeight: 600 }}>
            Out of stock
          </div>
        )}
      </div>
    </Link>
  )
}
