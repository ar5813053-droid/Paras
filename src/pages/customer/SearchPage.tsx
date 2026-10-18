import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PRODUCTS } from '../../data/products'
import { ProductCard } from '../../components/product/ProductCard'

export function SearchPage() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [sort, setSort] = useState(params.get('sort') || 'relevance')

  const results = useMemo(() => {
    let list = PRODUCTS
    if (q.trim()) {
      const s = q.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.articleNo.toLowerCase().includes(s) ||
          p.fabric.toLowerCase().includes(s) ||
          p.colour.toLowerCase().includes(s) ||
          p.category.includes(s) ||
          p.description.toLowerCase().includes(s)
      )
    }
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.offerPrice - b.offerPrice)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.offerPrice - a.offerPrice)
    if (sort === 'discount') list = [...list].sort((a, b) => (b.mrp - b.offerPrice) / b.mrp - (a.mrp - a.offerPrice) / a.mrp)
    if (sort === 'newest') list = [...list].filter((p) => p.isNew).concat(list.filter((p) => !p.isNew))
    return list
  }, [q, sort])

  return (
    <div>
      <header style={{ background: 'var(--navy)', padding: '12px 16px', position: 'sticky', top: 0, zIndex: 40 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search suits, fabrics, article no..."
          style={{
            width: '100%', padding: '11px 14px', borderRadius: 10, border: 'none', fontSize: 14,
          }}
          autoFocus
        />
      </header>
      <div style={{ display: 'flex', gap: 8, padding: '10px 16px', overflowX: 'auto', background: 'white' }}>
        {[
          { id: 'relevance', label: 'Relevance' },
          { id: 'price-asc', label: 'Price ↑' },
          { id: 'price-desc', label: 'Price ↓' },
          { id: 'discount', label: 'Discount' },
          { id: 'newest', label: 'Newest' },
        ].map((s) => (
          <button key={s.id} onClick={() => setSort(s.id)} style={{
            padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
            background: sort === s.id ? 'var(--navy)' : '#F3F4F6',
            color: sort === s.id ? 'white' : 'var(--text)',
          }}>{s.label}</button>
        ))}
      </div>
      <div style={{ padding: '8px 16px', fontSize: 13, color: 'var(--text-muted)' }}>
        {results.length} product{results.length !== 1 ? 's' : ''}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 16px 24px' }}>
        {results.length === 0 ? (
          <div className="empty" style={{ gridColumn: '1 / -1' }}>
            <h3>No results found</h3>
            <p>Try a different search term</p>
          </div>
        ) : results.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
