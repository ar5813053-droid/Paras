import { Link } from 'react-router-dom'
import { PRODUCTS, CATEGORIES, formatPrice, getDiscount } from '../../data/products'
import { ProductCard } from '../../components/product/ProductCard'

export function HomePage() {
  const featured = PRODUCTS.filter((p) => p.isFeatured)
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller)
  const newArrivals = PRODUCTS.filter((p) => p.isNew)
  const suits = PRODUCTS.filter((p) => p.category === 'mens-suits' || p.category === 'formal')
  const fabrics = PRODUCTS.filter((p) => p.unit === 'meter' || p.category === 'unstitched')
  const wedding = PRODUCTS.filter((p) => p.category === 'wedding' || p.category === 'party-wear')

  return (
    <div>
      {/* Header */}
      <header style={{
        background: 'var(--navy)', color: 'white', padding: '12px 16px 14px',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Paras Clothe Emporium</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Your Style, Your Store.</div>
          </div>
          <span className="badge-demo">DEMO</span>
        </div>
        <Link to="/search" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'white', borderRadius: 10, padding: '10px 14px',
          color: 'var(--text-muted)', fontSize: 14,
        }}>
          🔍 Search suits, fabrics, article no...
        </Link>
      </header>

      {/* Categories horizontal */}
      <div style={{ padding: '14px 0 8px', background: 'white', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          display: 'flex', gap: 12, overflowX: 'auto', padding: '0 16px',
          scrollbarWidth: 'none',
        }}>
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/categories/${c.slug}`} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              minWidth: 64, gap: 4,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, background: '#F3F4F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              }}>{c.emoji}</div>
              <span style={{ fontSize: 11, fontWeight: 500, textAlign: 'center' }}>{c.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Banner */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0A2540 0%, #1A3A5C 60%, #C9A227 100%)',
          borderRadius: 16, padding: '28px 20px', color: 'white', position: 'relative',
        }}>
          <span className="badge-demo" style={{ marginBottom: 10, display: 'inline-flex' }}>PREMIUM COLLECTION</span>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Suits & Fabrics</h2>
          <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 16 }}>
            Explore our curated range of formal wear and exclusive suitings.
          </p>
          <Link to="/categories/mens-suits" className="btn btn-gold" style={{ fontSize: 13, padding: '10px 16px' }}>
            Shop Now
          </Link>
        </div>
      </div>

      {/* Section helper */}
      {[
        { title: 'New Arrivals', products: newArrivals, link: '/search?sort=newest' },
        { title: 'Bestsellers', products: bestsellers, link: '/search?sort=popular' },
        { title: 'Premium Suit Collection', products: suits, link: '/categories/mens-suits' },
        { title: 'Wedding & Party Wear', products: wedding, link: '/categories/wedding' },
        { title: 'Suiting Fabrics', products: fabrics, link: '/categories/suiting-fabric' },
        { title: 'Deals for You', products: featured, link: '/search?sort=discount' },
      ].map((section) => section.products.length > 0 && (
        <section key={section.title} style={{ padding: '20px 16px 4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>{section.title}</h2>
            <Link to={section.link} style={{ fontSize: 13, color: 'var(--navy)', fontWeight: 600 }}>
              View all
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {section.products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ))}

      <div style={{ height: 24 }} />
    </div>
  )
}
