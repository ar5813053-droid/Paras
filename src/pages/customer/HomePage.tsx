import { Link } from 'react-router-dom'

const DEMO_CATEGORIES = [
  { id: '1', name: "Men's Suits", slug: 'mens-suits', emoji: '🤵' },
  { id: '2', name: 'Suiting Fabric', slug: 'suiting-fabric', emoji: '🧵' },
  { id: '3', name: 'Wedding', slug: 'wedding', emoji: '💒' },
  { id: '4', name: 'Party Wear', slug: 'party-wear', emoji: '🎉' },
  { id: '5', name: 'Kurtas', slug: 'kurtas', emoji: '👘' },
  { id: '6', name: 'Sale', slug: 'sale', emoji: '🏷️' },
]

const DEMO_PRODUCTS = [
  {
    id: '1',
    title: 'Classic Navy Blue Suit',
    article_no: 'PCE-MS-001',
    mrp: 12999,
    offer_price: 9999,
    image: null,
    stock: 12,
    fabric: 'Wool Blend',
  },
  {
    id: '2',
    title: 'Premium Black Formal Suit',
    article_no: 'PCE-MS-002',
    mrp: 15999,
    offer_price: 12499,
    image: null,
    stock: 8,
    fabric: 'Italian Wool',
  },
  {
    id: '3',
    title: 'Charcoal Grey Suiting Fabric',
    article_no: 'PCE-SF-101',
    mrp: 2499,
    offer_price: 1999,
    image: null,
    stock: 45,
    fabric: 'Polyester Viscose',
  },
  {
    id: '4',
    title: 'Royal Blue Sherwani Set',
    article_no: 'PCE-WC-201',
    mrp: 18999,
    offer_price: 14999,
    image: null,
    stock: 5,
    fabric: 'Silk Blend',
  },
]

function formatPrice(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

function discountPct(mrp: number, offer: number) {
  return Math.round(((mrp - offer) / mrp) * 100)
}

export function HomePage() {
  return (
    <div>
      {/* Header */}
      <header style={{
        background: 'var(--color-navy)',
        color: 'white',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
              Paras Clothe Emporium
            </h1>
            <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Your Style, Your Store.</p>
          </div>
          <Link to="/search" style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </Link>
        </div>
        <Link to="/search" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'white', borderRadius: 10, padding: '10px 14px',
          color: 'var(--color-gray-400)', fontSize: '0.875rem',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          Search products, article no...
        </Link>
      </header>

      {/* Banner */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0A2540 0%, #1A3A5C 50%, #C9A227 100%)',
          borderRadius: 16,
          padding: '28px 20px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="demo-badge" style={{ marginBottom: 12, display: 'inline-flex' }}>DEMO STORE</span>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: 6 }}>
              Premium Suits & Fabrics
            </h2>
            <p style={{ fontSize: '0.875rem', opacity: 0.85, marginBottom: 16 }}>
              Discover our curated collection of formal wear and exclusive fabrics.
            </p>
            <Link to="/categories" className="btn btn-gold" style={{ fontSize: '0.875rem', padding: '10px 18px' }}>
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section style={{ padding: '20px 16px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Categories</h2>
          <Link to="/categories" style={{ fontSize: '0.8125rem', color: 'var(--color-navy)', fontWeight: 600 }}>
            View all
          </Link>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}>
          {DEMO_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.slug}`}
              style={{
                background: 'white',
                borderRadius: 12,
                padding: '16px 8px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{cat.emoji}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gray-800)' }}>
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '16px 16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>New Arrivals</h2>
          <Link to="/search" style={{ fontSize: '0.8125rem', color: 'var(--color-navy)', fontWeight: 600 }}>
            See all
          </Link>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
        }}>
          {DEMO_PRODUCTS.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="card"
              style={{ display: 'block' }}
            >
              <div style={{
                aspectRatio: '3/4',
                background: 'linear-gradient(145deg, #E5E7EB, #F3F4F6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gray-400)',
                fontSize: '0.75rem',
              }}>
                {p.image ? <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'No Image'}
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-gray-500)', marginBottom: 2 }}>
                  {p.article_no}
                </div>
                <h3 style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  marginBottom: 4,
                  lineHeight: 1.3,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {p.title}
                </h3>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-gray-500)', marginBottom: 6 }}>
                  {p.fabric}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-navy)' }}>
                    {formatPrice(p.offer_price)}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)', textDecoration: 'line-through' }}>
                    {formatPrice(p.mrp)}
                  </span>
                  <span className="badge badge-discount">
                    {discountPct(p.mrp, p.offer_price)}% OFF
                  </span>
                </div>
                {p.stock <= 5 && p.stock > 0 && (
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-warning)', marginTop: 4, fontWeight: 600 }}>
                    Only {p.stock} left
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
