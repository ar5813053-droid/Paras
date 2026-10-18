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
      <div className="empty" style={{ minHeight: '70dvh' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
        <h3>Your cart is empty</h3>
        <p style={{ marginBottom: 20 }}>Add some premium suits and fabrics</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div>
      <header style={{
        background: 'var(--navy)', color: 'white', padding: '14px 16px',
        position: 'sticky', top: 0, zIndex: 40,
      }}>
        <h1 style={{ fontSize: 17, fontWeight: 700 }}>My Cart ({totalItems()})</h1>
      </header>

      <div style={{ padding: 12 }}>
        {items.map((item) => (
          <div key={item.productId + item.size} className="card" style={{
            display: 'flex', gap: 12, padding: 12, marginBottom: 10,
          }}>
            <img src={item.image} alt="" style={{
              width: 80, height: 100, objectFit: 'cover', borderRadius: 8, background: '#f3f4f6',
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.articleNo}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
                Size: {item.size} · {item.colour}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                <span className="price">{formatPrice(item.unitPrice)}</span>
                <span className="mrp">{formatPrice(item.mrp)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => updateQty(item.productId, item.size, item.quantity - 1)}
                    style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)' }}>−</button>
                  <span style={{ fontWeight: 600 }}>{item.quantity}</span>
                  <button onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
                    style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)' }}>+</button>
                </div>
                <button onClick={() => removeItem(item.productId, item.size)}
                  style={{ fontSize: 12, color: 'var(--error)', fontWeight: 600 }}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price summary */}
      <div className="card" style={{ margin: '0 12px 12px', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
          <span>Subtotal</span><span>{formatPrice(subtotal())}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: 'var(--success)' }}>
          <span>You save</span><span>−{formatPrice(savings())}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
          <span>Shipping (DEMO)</span><span>{formatPrice(shipping)}</span>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', paddingTop: 10,
          borderTop: '1px solid var(--border)', fontWeight: 700, fontSize: 16,
        }}>
          <span>Total</span><span className="price">{formatPrice(total)}</span>
        </div>
        <div style={{ marginTop: 8 }}><span className="badge-demo">DEMO CART</span></div>
      </div>

      <div style={{ padding: '0 12px 24px' }}>
        <button className="btn btn-primary btn-full" onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}
