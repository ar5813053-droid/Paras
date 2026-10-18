import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../../stores/cartStore'
import { formatPrice } from '../../data/products'

export function CartPage() {
  const { items, updateQty, removeItem, subtotal, savings, totalItems } = useCartStore()
  const navigate = useNavigate()
  const shipping = items.length ? 99 : 0
  const total = subtotal() + shipping

  if (items.length === 0) {
    return (
      <div>
        <header className="sticky-header" style={{ padding: '14px 16px' }}>
          <h1 style={{ fontSize: 17, fontWeight: 700 }}>My Cart</h1>
        </header>
        <div className="empty" style={{ minHeight: '65dvh' }}>
          <div className="icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add premium suits and fabrics to get started</p>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-nav">
      <header className="sticky-header" style={{ padding: '14px 16px' }}>
        <h1 style={{ fontSize: 17, fontWeight: 700 }}>My Cart ({totalItems()})</h1>
      </header>

      <div style={{ padding: 12 }}>
        {items.map((item) => (
          <div key={item.productId + item.size} className="card" style={{
            display: 'flex', gap: 12, padding: 12, marginBottom: 10,
          }}>
            <Link to={`/product/${item.productId}`}>
              <img src={item.image} alt="" style={{
                width: 86, height: 108, objectFit: 'cover', borderRadius: 10,
                background: '#f0f2f5',
              }} />
            </Link>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{item.articleNo}</div>
              <div style={{
                fontWeight: 600, fontSize: 13.5, marginBottom: 2,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>
                Size: {item.size} · {item.colour}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
                <span className="price" style={{ fontSize: 15 }}>{formatPrice(item.unitPrice)}</span>
                <span className="mrp">{formatPrice(item.mrp)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => updateQty(item.productId, item.size, item.quantity - 1)}
                    style={{
                      width: 30, height: 30, borderRadius: 8, border: '1.5px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                    }}>−</button>
                  <span style={{ fontWeight: 700, minWidth: 18, textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
                    style={{
                      width: 30, height: 30, borderRadius: 8, border: '1.5px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                    }}>+</button>
                </div>
                <button onClick={() => removeItem(item.productId, item.size)}
                  style={{ fontSize: 12, color: 'var(--error)', fontWeight: 600 }}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price breakdown */}
      <div className="card" style={{ margin: '0 12px 12px', padding: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Price Details</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
          <span style={{ color: 'var(--text-2)' }}>Subtotal</span>
          <span>{formatPrice(subtotal())}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: 'var(--success)' }}>
          <span>Discount</span>
          <span>−{formatPrice(savings())}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
          <span style={{ color: 'var(--text-2)' }}>Shipping (DEMO)</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          paddingTop: 12, borderTop: '1px dashed var(--border)',
          fontWeight: 700, fontSize: 16, marginTop: 4,
        }}>
          <span>Total</span>
          <span className="price">{formatPrice(total)}</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <span className="badge-demo">DEMO CART · NO REAL PAYMENT</span>
        </div>
      </div>

      <div style={{ padding: '4px 12px 28px' }}>
        <button className="btn btn-primary btn-full" onClick={() => navigate('/checkout')}
          style={{ minHeight: 50, fontSize: 15.5 }}>
          Proceed to Checkout · {formatPrice(total)}
        </button>
      </div>
    </div>
  )
}
