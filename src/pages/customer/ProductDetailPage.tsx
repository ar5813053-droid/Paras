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

  if (!product) {
    return (
      <div className="empty">
        <h3>Product not found</h3>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Go Home</Link>
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
  }

  const handleBuyNow = () => {
    handleAdd()
    navigate('/checkout')
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40, background: 'white',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
      }}>
        <button onClick={() => navigate(-1)} style={{ fontSize: 20, padding: 6 }}>←</button>
        <Link to="/search" style={{
          flex: 1, background: '#F3F4F6', borderRadius: 8, padding: '8px 12px',
          fontSize: 13, color: 'var(--text-muted)',
        }}>🔍 Search</Link>
        <Link to="/cart" style={{ position: 'relative', fontSize: 20, padding: 6 }}>
          🛒
          {cartCount > 0 && (
            <span style={{
              position: 'absolute', top: 0, right: 0, background: 'var(--error)',
              color: 'white', fontSize: 10, minWidth: 16, height: 16, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{cartCount}</span>
          )}
        </Link>
      </header>

      {/* Image Gallery */}
      <div style={{ background: '#f3f4f6', position: 'relative' }}>
        <img
          src={product.images[imgIdx] || product.images[0]}
          alt={product.title}
          style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }}
        />
        <button
          onClick={() => toggleWish(product.id)}
          style={{
            position: 'absolute', top: 12, right: 12, width: 40, height: 40,
            borderRadius: '50%', background: 'white', fontSize: 18,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >{wished ? '❤️' : '♡'}</button>
        {product.images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 12, left: 0, right: 0,
            display: 'flex', justifyContent: 'center', gap: 6,
          }}>
            {product.images.map((_, i) => (
              <button key={i} onClick={() => setImgIdx(i)} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i === imgIdx ? 'var(--navy)' : 'rgba(255,255,255,0.7)',
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ background: 'white', padding: 16 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{product.articleNo}</div>
        <h1 style={{ fontSize: 18, fontWeight: 700, margin: '4px 0 8px' }}>{product.title}</h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          <span className="price" style={{ fontSize: 22 }}>{formatPrice(product.offerPrice)}</span>
          <span className="mrp" style={{ fontSize: 15 }}>{formatPrice(product.mrp)}</span>
          <span className="badge badge-discount">{discount}% OFF</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--success)', fontWeight: 600, marginBottom: 12 }}>
          You save {formatPrice(product.mrp - product.offerPrice)}
        </div>
        <span className="badge-demo">DEMO PRICING</span>
      </div>

      {/* Size selector */}
      <div style={{ background: 'white', padding: '12px 16px', marginTop: 8 }}>
        <div style={{ fontWeight: 600, marginBottom: 10 }}>Select Size</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                minWidth: 48, height: 40, borderRadius: 8, fontWeight: 600, fontSize: 13,
                border: size === s ? '2px solid var(--navy)' : '1px solid var(--border)',
                background: size === s ? '#EEF2FF' : 'white',
                color: size === s ? 'var(--navy)' : 'var(--text)',
              }}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Qty */}
      <div style={{ background: 'white', padding: '12px 16px', marginTop: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontWeight: 600 }}>Quantity</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setQty(Math.max(1, qty - 1))} style={{
            width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', fontSize: 18,
          }}>−</button>
          <span style={{ fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{qty}</span>
          <button onClick={() => setQty(Math.min(product.stock, qty + 1))} style={{
            width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', fontSize: 18,
          }}>+</button>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {product.stock} in stock
        </span>
      </div>

      {/* Details */}
      <div style={{ background: 'white', padding: 16, marginTop: 8 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Product Details</h3>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text)' }}>
          <p style={{ marginBottom: 10 }}>{product.description}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '6px 12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Fabric</span><span>{product.fabric}</span>
            <span style={{ color: 'var(--text-muted)' }}>Design</span><span>{product.design}</span>
            <span style={{ color: 'var(--text-muted)' }}>Colour</span><span>{product.colour}</span>
            <span style={{ color: 'var(--text-muted)' }}>Occasion</span><span>{product.occasion}</span>
            <span style={{ color: 'var(--text-muted)' }}>Care</span><span>{product.care}</span>
            <span style={{ color: 'var(--text-muted)' }}>Unit</span><span>{product.unit}</span>
          </div>
        </div>
      </div>

      {/* Delivery info */}
      <div style={{ background: 'white', padding: 16, marginTop: 8 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Delivery</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Simulated delivery estimate: 4–7 days · DEMO ONLY · No real courier connected
        </p>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding: '16px 16px 8px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Similar Products</h3>
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
      }}>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={handleAdd}>
          Add to Cart
        </button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleBuyNow}>
          Buy Now · {formatPrice(product.offerPrice)}
        </button>
      </div>
    </div>
  )
}
