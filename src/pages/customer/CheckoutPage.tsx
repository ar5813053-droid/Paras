import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../stores/cartStore'
import { useOrderStore } from '../../stores/orderStore'
import { formatPrice } from '../../data/products'
import type { Address, Order } from '../../types'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, savings, clear } = useCartStore()
  const addOrder = useOrderStore((s) => s.addOrder)
  const [step, setStep] = useState(1)
  const [placing, setPlacing] = useState(false)
  const [done, setDone] = useState(false)
  const [orderNo, setOrderNo] = useState('')

  const [addr, setAddr] = useState<Address>({
    id: '1', fullName: '', phone: '', addressLine: '', city: '', state: '', pincode: '',
  })
  const [payment, setPayment] = useState('cod')

  const shipping = 99
  const total = subtotal() + shipping

  if (items.length === 0 && !done) {
    return (
      <div className="empty" style={{ minHeight: '60dvh' }}>
        <h3>Cart is empty</h3>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/')}>
          Shop Now
        </button>
      </div>
    )
  }

  const placeOrder = () => {
    if (placing) return
    setPlacing(true)
    const no = 'PCE' + Date.now().toString().slice(-8)
    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: no,
      items: items.map((i) => ({
        productId: i.productId,
        title: i.title,
        articleNo: i.articleNo,
        size: i.size,
        colour: i.colour,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        total: i.unitPrice * i.quantity,
      })),
      address: addr,
      subtotal: subtotal(),
      discount: savings(),
      shipping,
      total,
      paymentMethod: payment === 'cod' ? 'Cash on Delivery (DEMO)' : payment === 'upi' ? 'UPI (DEMO ONLY)' : 'Card (DEMO ONLY)',
      status: 'placed',
      statusHistory: [{ status: 'placed', at: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
      isDemo: true,
    }
    addOrder(order)
    clear()
    setOrderNo(no)
    setDone(true)
    setPlacing(false)
  }

  if (done) {
    return (
      <div style={{ padding: 24, textAlign: 'center', minHeight: '70dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Demo Order Placed!</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 8 }}>Order ID: <strong>{orderNo}</strong></p>
        <span className="badge-demo" style={{ margin: '0 auto 20px' }}>DEMO ORDER — NO REAL PAYMENT</span>
        <button className="btn btn-primary" onClick={() => navigate('/account')}>View Orders</button>
        <button className="btn btn-outline" style={{ marginTop: 10 }} onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div>
      <header style={{
        background: 'var(--navy)', color: 'white', padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button onClick={() => navigate(-1)} style={{ color: 'white', fontSize: 20 }}>←</button>
        <h1 style={{ fontSize: 17, fontWeight: 700 }}>Checkout (DEMO)</h1>
      </header>

      {/* Steps */}
      <div style={{ display: 'flex', gap: 4, padding: 12, background: 'white' }}>
        {['Address', 'Payment', 'Review'].map((s, i) => (
          <div key={s} style={{
            flex: 1, textAlign: 'center', padding: '8px 4px', borderRadius: 8, fontSize: 12, fontWeight: 600,
            background: step === i + 1 ? 'var(--navy)' : '#F3F4F6',
            color: step === i + 1 ? 'white' : 'var(--text-muted)',
          }}>{s}</div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ padding: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Delivery Address</h2>
          {(['fullName', 'phone', 'addressLine', 'city', 'state', 'pincode'] as const).map((field) => (
            <div key={field} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {field === 'fullName' ? 'Full Name' : field === 'addressLine' ? 'Address' : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                value={addr[field]}
                onChange={(e) => setAddr({ ...addr, [field]: e.target.value })}
                style={{
                  width: '100%', padding: '11px 12px', borderRadius: 8,
                  border: '1.5px solid var(--border)',
                }}
                placeholder={field === 'phone' ? '10-digit mobile' : field === 'pincode' ? '6-digit PIN' : ''}
              />
            </div>
          ))}
          <button
            className="btn btn-primary btn-full"
            disabled={!addr.fullName || !addr.phone || !addr.addressLine || !addr.city || !addr.pincode}
            onClick={() => setStep(2)}
          >Continue</button>
        </div>
      )}

      {step === 2 && (
        <div style={{ padding: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Payment Method</h2>
          {[
            { id: 'cod', label: 'Cash on Delivery', note: 'Simulated — DEMO ONLY' },
            { id: 'upi', label: 'UPI', note: 'DEMO ONLY — No real payment' },
            { id: 'card', label: 'Card', note: 'DEMO ONLY — No real payment' },
          ].map((p) => (
            <label key={p.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: 14,
              border: payment === p.id ? '2px solid var(--navy)' : '1px solid var(--border)',
              borderRadius: 10, marginBottom: 10, background: 'white',
            }}>
              <input type="radio" name="pay" checked={payment === p.id} onChange={() => setPayment(p.id)} />
              <div>
                <div style={{ fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.note}</div>
              </div>
            </label>
          ))}
          <button className="btn btn-primary btn-full" onClick={() => setStep(3)}>Continue</button>
        </div>
      )}

      {step === 3 && (
        <div style={{ padding: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Review & Place Order</h2>
          <div className="card" style={{ padding: 14, marginBottom: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{addr.fullName}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {addr.addressLine}, {addr.city}, {addr.state} – {addr.pincode}<br />
              Phone: {addr.phone}
            </div>
          </div>
          <div className="card" style={{ padding: 14, marginBottom: 12 }}>
            {items.map((i) => (
              <div key={i.productId + i.size} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                <span>{i.title} × {i.quantity}</span>
                <span>{formatPrice(i.unitPrice * i.quantity)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8, marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <span>Total</span><span className="price">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          <span className="badge-demo" style={{ display: 'inline-block', marginBottom: 14 }}>
            DEMO ORDER — NO REAL PAYMENT WILL BE TAKEN
          </span>
          <button className="btn btn-primary btn-full" onClick={placeOrder} disabled={placing}>
            {placing ? 'Placing...' : 'Place Demo Order'}
          </button>
        </div>
      )}
    </div>
  )
}
