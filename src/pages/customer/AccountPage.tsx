import { Link } from 'react-router-dom'
import { useOrderStore } from '../../stores/orderStore'
import { formatPrice } from '../../data/products'

export function AccountPage() {
  const orders = useOrderStore((s) => s.orders)

  return (
    <div>
      <header style={{ background: 'var(--navy)', color: 'white', padding: '20px 16px' }}>
        <h1 style={{ fontSize: 18, fontWeight: 700 }}>My Account</h1>
        <p style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>Demo Mode · Local only</p>
      </header>

      <div style={{ padding: 16 }}>
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Guest Shopper</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Shopping locally on this device. No online account yet.
          </div>
        </div>

        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Orders ({orders.length})</h3>
        {orders.length === 0 ? (
          <div className="card" style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>
            No orders yet
          </div>
        ) : (
          orders.map((o) => (
            <Link key={o.id} to={`/orders/${o.id}`} className="card" style={{
              display: 'block', padding: 14, marginBottom: 10,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{o.orderNumber}</span>
                <span className="badge-demo">DEMO</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                {o.items.length} item(s) · {formatPrice(o.total)} · {o.status}
              </div>
            </Link>
          ))
        )}

        <div style={{ marginTop: 24 }}>
          <Link to="/" className="btn btn-outline btn-full">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
