import { Link } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../../data/products'
import { ProductCard } from '../../components/product/ProductCard'

function Section({ title, link, children }: { title: string; link: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: '22px 16px 6px' }}>
      <div className="section-header">
        <h2>{title}</h2>
        <Link to={link}>View all →</Link>
      </div>
      {children}
    </section>
  )
}

export function HomePage() {
  const featured = PRODUCTS.filter((p) => p.isFeatured)
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller)
  const newArrivals = PRODUCTS.filter((p) => p.isNew)
  const suits = PRODUCTS.filter((p) => ['mens-suits', 'formal'].includes(p.category))
  const wedding = PRODUCTS.filter((p) => ['wedding', 'party-wear'].includes(p.category))
  const fabrics = PRODUCTS.filter((p) => p.unit === 'meter' || p.category === 'unstitched' || p.category === 'suiting-fabric')

  return (
    <div className="pb-nav">
      {/* Sticky Header */}
      <header className="sticky-header" style={{ padding: '12px 16px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em' }}>
              Paras Clothe Emporium
            </div>
            <div style={{ fontSize: 11.5, opacity: 0.7, marginTop: 1 }}>Your Style, Your Store.</div>
          </div>
          <span className="badge-demo">DEMO</span>
        </div>
        <Link to="/search" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(255,255,255,0.97)', borderRadius: 12,
          padding: '12px 14px', color: 'var(--text-3)', fontSize: 14,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          Search suits, fabrics, article no...
        </Link>
      </header>

      {/* Categories */}
      <div style={{ background: 'white', padding: '16px 0 14px', borderBottom: '1px solid var(--border-soft)' }}>
        <div className="scroll-x" style={{ padding: '0 16px' }}>
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/categories/${c.slug}`} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              minWidth: 68, gap: 6,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'linear-gradient(145deg, #F0F4F8, #E4E9F0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, boxShadow: 'var(--shadow-sm)',
              }}>{c.emoji}</div>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', color: 'var(--text-2)', lineHeight: 1.2 }}>
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Banner */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0B1D36 0%, #152A45 55%, #C9A227 130%)',
          borderRadius: 18, padding: '28px 22px', color: 'white',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(11,29,54,0.25)',
        }}>
          <div style={{
            position: 'absolute', right: -20, top: -20, width: 140, height: 140,
            borderRadius: '50%', background: 'rgba(201,162,39,0.15)',
          }} />
          <div style={{ position: 'relative' }}>
            <span className="badge-demo" style={{ marginBottom: 12, display: 'inline-flex' }}>
              PREMIUM COLLECTION
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.03em' }}>
              Suits & Fabrics
            </h2>
            <p style={{ fontSize: 13.5, opacity: 0.85, marginBottom: 18, maxWidth: 240, lineHeight: 1.4 }}>
              Curated formal wear and exclusive suitings for every occasion.
            </p>
            <Link to="/categories/mens-suits" className="btn btn-gold" style={{
              fontSize: 13.5, padding: '11px 20px', minHeight: 42,
            }}>
              Shop Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Promo strip */}
      <div style={{
        margin: '16px 16px 0', padding: '12px 16px',
        background: 'linear-gradient(90deg, #FEF3C7, #FDE68A)',
        borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 20 }}>🏷️</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#92400E' }}>Up to 30% OFF on selected suits</div>
          <div style={{ fontSize: 11.5, color: '#A16207' }}>Limited time demo offers</div>
        </div>
      </div>

      {/* New Arrivals - horizontal scroll for variety */}
      <Section title="New Arrivals" link="/search?sort=newest">
        <div className="scroll-x">
          {newArrivals.map((p) => (
            <div key={p.id} style={{ minWidth: 160, width: 160 }}>
              <ProductCard product={p} compact />
            </div>
          ))}
        </div>
      </Section>

      {/* Bestsellers grid */}
      <Section title="Bestsellers" link="/search?sort=popular">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {bestsellers.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* Premium Suits */}
      <Section title="Premium Suit Collection" link="/categories/mens-suits">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {suits.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* Wedding & Party */}
      <Section title="Wedding & Party Wear" link="/categories/wedding">
        <div className="scroll-x">
          {wedding.map((p) => (
            <div key={p.id} style={{ minWidth: 160, width: 160 }}>
              <ProductCard product={p} compact />
            </div>
          ))}
        </div>
      </Section>

      {/* Fabrics */}
      <Section title="Suiting Fabrics" link="/categories/suiting-fabric">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {fabrics.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* Featured / Deals */}
      <Section title="Deals for You" link="/search?sort=discount">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {featured.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* Trust strip */}
      <div style={{
        margin: '24px 16px', padding: '18px 16px',
        background: 'white', borderRadius: 14,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
        textAlign: 'center', boxShadow: 'var(--shadow-sm)',
      }}>
        {[
          { icon: '🛡️', label: 'Quality Assured' },
          { icon: '📦', label: 'Easy Returns*' },
          { icon: '👔', label: 'Expert Tailoring' },
        ].map((t) => (
          <div key={t.label}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{t.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)' }}>{t.label}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 16 }} />
    </div>
  )
}
