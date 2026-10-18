import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PRODUCTS, formatPrice, getDiscount } from '../../data/products'
import { useCartStore } from '../../stores/cartStore'
import { useWishlistStore } from '../../stores/wishlistStore'
import { ProductCard } from '../../components/product/ProductCard'

export function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = PRODUCTS.find((p) => p.id === id)
  const addItem = useCartStore((s) => s.addItem)
  const cartCount = useCartStore((s) => s.totalItems())
  const toggleWish = useWishlistStore((s) => s.toggle)
  const wished = useWishlistStore((s) => s.has(id || ''))

  const [size, setSize] = useState(product?.sizes[0] || '')
  const [qty, setQty] = useState(1)
  const [imgIdx, setImgIdx] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="empty">
        <div className="icon">😕</div>
        <h3>Product not found</h3>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 8 }}>Go Home</Link>
      </div>
    )
  }

  const discount = getDiscount(product.mrp, product.offerPrice)
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  const handleAdd = () => {
    addItem({
      productId: product.id,
      title: product.title,
      articleNo: product.articleNo,
      image: product.images[0],
      size,
      colour: product.colour,
      unitPrice: product.offerPrice,
      mrp: product.mrp,
      unit: product.unit,
      quantity: qty,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleBuyNow = () => {
    handleAdd()
    navigate('/checkout')
  }

  return (
    <div className="pb-sticky">
      {/* Compact sticky header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40, background: 'white',
        borderBottom: '1px solid var(--border-soft)',
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
      }}>
        <button onClick={() => navigate(-1)} style={{
          width: 36, height: 36, borderRadius: 10, fontSize: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg)',
        }}>←</button>
        <Link to="/search" style={{
          flex: 1, background: 'var(--bg)', borderRadius: 10, padding: '9px 12px',
          fontSize: 13, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          🔍 Search products
        </Link>
        <Link to="/cart" style={{
          position: 'relative', width: 36, height: 36, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg)', fontSize: 18,
        }}>
          🛒
          {cartCount > 0 && (
            <span style={{
              position: 'absolute', top: 2, right: 2,
              background: 'var(--error)', color: 'white',
              fontSize: 10, fontWeight: 700, minWidth: 16, height: 16,
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{cartCount}</span>
          )}
        </Link>
      </header>

      {/* Image Gallery */}
      <div style={{ background: '#EEF1F5', position: 'relative' }}>
        <img
          src={product.images[imgIdx] || product.images[0]}
          alt={product.title}
          style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }}
        />
        <button
          onClick={() => toggleWish(product.id)}
          style={{
            position: 'absolute', top: 14, right: 14, width: 42, height: 42,
            borderRadius: '50%', background: 'rgba(255,255,255,0.95)',
            fontSize: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >{wished ? '❤️' : '♡'}</button>

        {discount >= 10 && (
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: 'var(--error)', color: 'white',
            fontWeight: 700, fontSize: 13, padding: '5px 10px', borderRadius: 8,
          }}>{discount}% OFF</div>
        )}

        {product.images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 14, left: 0, right: 0,
            display: 'flex', justifyContent: 'center', gap: 6,
          }}>
            {product.images.map((_, i) => (
              <button key={i} onClick={() => setImgIdx(i)} style={{
                width: i === imgIdx ? 18 : 7, height: 7, borderRadius: 4,
                background: i === imgIdx ? 'var(--navy)' : 'rgba(255,255,255,0.75)',
                transition: 'width 0.2s',
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Price & Title block */}
      <div style={{ background: 'white', padding: '16px 16px 14px' }}>
        <div style={{ fontSize: 12, color: 'var(--text-3)', letterSpacing: '0.03em' }}>
          {product.articleNo}
        </div>
        <h1 style={{
          fontSize: 18, fontWeight: 700, margin: '4px 0 10px',
          letterSpacing: '-0.02em', lineHeight: 1.3,
        }}>{product.title}</h1>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
          <span className="price" style={{ fontSize: 24 }}>{formatPrice(product.offerPrice)}</span>
          <span className="mrp" style={{ fontSize: 15 }}>{formatPrice(product.mrp)}</span>
          <span className="badge badge-discount">{discount}% OFF</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--success)', fontWeight: 600, marginBottom: 10 }}>
          You save {formatPrice(product.mrp - product.offerPrice)}
        </div>
        <span className="badge-demo">DEMO PRICING · NO REAL PAYMENT</span>
      </div>

      {/* Size */}
      <div style={{ background: 'white', padding: '14px 16px', marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>Select Size</span>
          <span style={{ fontSize: 12, color: 'var(--navy)', fontWeight: 600 }}>Size Guide</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                minWidth: 50, height: 42, borderRadius: 10, fontWeight: 600, fontSize: 13,
                border: size === s ? '2px solid var(--navy)' : '1.5px solid var(--border)',
                background: size === s ? '#EEF2FF' : 'white',
                color: size === s ? 'var(--navy)' : 'var(--text)',
              }}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div style={{
        background: 'white', padding: '12px 16px', marginTop: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>Quantity</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => setQty(Math.max(1, qty - 1))} style={{
            width: 34, height: 34, borderRadius: 8, border: '1.5px solid var(--border)',
            fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>−</button>
          <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{qty}</span>
          <button onClick={() => setQty(Math.min(product.stock, qty + 1))} style={{
            width: 34, height: 34, borderRadius: 8, border: '1.5px solid var(--border)',
            fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>+</button>
          <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 4 }}>
            {product.stock} available
          </span>
        </div>
      </div>

      {/* Highlights */}
      <div style={{ background: 'white', padding: 16, marginTop: 8 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Highlights</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Fabric', value: product.fabric },
            { label: 'Design', value: product.design },
            { label: 'Colour', value: product.colour },
            { label: 'Occasion', value: product.occasion },
            { label: 'Unit', value: product.unit },
            { label: 'Care', value: product.care },
          ].map((h) => (
            <div key={h.label} style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 2 }}>{h.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{h.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div style={{ background: 'white', padding: 16, marginTop: 8 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Description</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-2)' }}>
          {product.description}
        </p>
      </div>

      {/* Delivery */}
      <div style={{ background: 'white', padding: 16, marginTop: 8 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Delivery</h3>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 20 }}>📦</span>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>Simulated delivery in 4–7 days</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>
              DEMO ONLY · No real courier is connected
            </div>
          </div>
        </div>
      </div>

      {/* Similar */}
      {related.length > 0 && (
        <section style={{ padding: '20px 16px 8px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Similar Products</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Sticky bottom bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: 'white', borderTop: '1px solid var(--border)',
        padding: '10px 12px calc(10px + var(--safe-bottom))',
        display: 'flex', gap: 10, maxWidth: 480, margin: '0 auto',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
      }}>
        <button
          className="btn btn-outline"
          style={{ flex: 1, minHeight: 48 }}
          onClick={handleAdd}
        >
          {added ? '✓ Added' : 'Add to Cart'}
        </button>
        <button
          className="btn btn-primary"
          style={{ flex: 1.2, minHeight: 48 }}
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}
