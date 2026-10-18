import { useParams, Link } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../../data/products'
import { ProductCard } from '../../components/product/ProductCard'

export function CategoriesPage() {
  const { slug } = useParams()
  const cat = CATEGORIES.find((c) => c.slug === slug)
  const list = slug
    ? PRODUCTS.filter((p) => p.category === slug || (slug === 'new' && p.isNew) || (slug === 'sale' && p.mrp > p.offerPrice))
    : PRODUCTS

  return (
    <div>
      <header style={{ background: 'var(--navy)', color: 'white', padding: '14px 16px' }}>
        <h1 style={{ fontSize: 17, fontWeight: 700 }}>{cat?.name || 'All Categories'}</h1>
      </header>
      {!slug && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 16 }}>
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/categories/${c.slug}`} className="card" style={{
              padding: 20, textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
            </Link>
          ))}
        </div>
      )}
      {slug && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 16 }}>
          {list.length === 0 ? (
            <div className="empty" style={{ gridColumn: '1 / -1' }}>
              <h3>No products in this category</h3>
            </div>
          ) : list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
