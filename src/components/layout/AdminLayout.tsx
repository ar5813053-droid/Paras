import { Outlet, NavLink, Link } from 'react-router-dom'

export function AdminLayout() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-gray-50)' }}>
      <header style={{
        background: 'var(--color-navy)',
        color: 'white',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>ADMIN PANEL</div>
          <div style={{ fontWeight: 700 }}>Paras Clothe Emporium</div>
        </div>
        <Link to="/" style={{ fontSize: '0.8125rem', opacity: 0.8 }}>← Store</Link>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100dvh - 56px)' }}>
        <aside style={{
          width: 200,
          background: 'white',
          borderRight: '1px solid var(--color-gray-200)',
          padding: '16px 0',
          display: 'none', // mobile-first: hide side nav, use bottom or top
        }}>
          {/* Desktop sidebar placeholder */}
        </aside>

        <main style={{ flex: 1, padding: 16 }}>
          <nav style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            marginBottom: 16,
            paddingBottom: 8,
          }}>
            {[
              { to: '/admin', label: 'Dashboard', end: true },
              { to: '/admin/products', label: 'Products' },
              { to: '/admin/orders', label: 'Orders' },
              { to: '/admin/customers', label: 'Customers' },
              { to: '/admin/settings', label: 'Settings' },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  background: isActive ? 'var(--color-navy)' : 'white',
                  color: isActive ? 'white' : 'var(--color-gray-700)',
                  boxShadow: isActive ? 'none' : 'var(--shadow-sm)',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
