export function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 4 }}>Dashboard</h1>
      <p style={{ color: 'var(--color-gray-500)', fontSize: '0.875rem', marginBottom: 16 }}>
        <span className="demo-badge">DEMO SALES DATA</span>
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {['Total Orders', 'Demo Revenue', 'Pending', 'Low Stock'].map((label) => (
          <div key={label} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>{label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-navy)' }}>—</div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 24, color: 'var(--color-gray-500)', fontSize: '0.875rem', textAlign: 'center' }}>
        Full admin features in Phase 4
      </p>
    </div>
  )
}
