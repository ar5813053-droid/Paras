import { useParams, Link } from 'react-router-dom'
import { useOrderStore } from '../../stores/orderStore'
import { formatPrice } from '../../data/products'

const STATUS_FLOW = ['placed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered']

export function OrderDetailPage() {
  const { id } = useParams()
  const order = useOrderStore((s) => s.getById(id || ''))

  if (!order) {
    return (
      <div className="empty">
        <h3>Order not found</h3>
        <Link to="/account" className="btn btn-primary" style={{ marginTop: 16 }}>Back</Link>
      </div>
    )
  }

  const currentIdx = STATUS_FLOW.indexOf(order.status)

  return (
    <div>
      <header style={{ background: 'var(--navy)', color: 'white', padding: '14px 16px' }}>
        <h1 style={{ fontSize: 17, fontWeight: 700 }}>Order {order.orderNumber}</h1>
        <span className="badge-demo" style={{ marginTop: 6, display: 'inline-flex' }}>DEMO ORDER</span>
      </header>

      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Tracking (Simulated)</h3>
        {STATUS_FLOW.map((s, i) => (
          <div key={s} style={{
            display: 'flex', gap: 12, marginBottom: 12, opacity: i <= currentIdx ? 1 : 0.4,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              background: i <= currentIdx ? 'var(--success)' : 'var(--border)',
              flexShrink: 0,
            }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>
                {s.replace(/_/g, ' ')}
              </div>
            </div>
          </div>
        ))}

        <h3 style={{ fontSize: 14, fontWeight: 700, margin: '20px 0 10px' }}>Items</h3>
        {order.items.map((item, i) => (
          <div key={i} className="card" style={{ padding: 12, marginBottom: 8 }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {item.size} · Qty {item.quantity} · {formatPrice(item.total)}
            </div>
          </div>
        ))}

        <div className="card" style={{ padding: 14, marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
            <span>Total Paid (Demo)</span>
            <span className="price">{formatPrice(order.total)}</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
            {order.paymentMethod}
          </div>
        </div>
      </div>
    </div>
  )
}
