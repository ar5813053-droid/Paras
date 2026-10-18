import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useCartStore } from '../../stores/cartStore'

const items = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/categories', label: 'Categories', icon: '📂' },
  { to: '/wishlist', label: 'Wishlist', icon: '♡' },
  { to: '/cart', label: 'Cart', icon: '🛒' },
  { to: '/account', label: 'Account', icon: '👤' },
]

export function AppShell() {
  const location = useLocation()
  const cartCount = useCartStore((s) => s.totalItems())
  const hide =
    location.pathname.startsWith('/product/') ||
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/admin')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <main style={{ flex: 1, paddingBottom: hide ? 0 : 'calc(var(--bottom-h) + var(--safe-bottom))' }}>
        <Outlet />
      </main>
      {!hide && (
        <nav style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          height: 'calc(var(--bottom-h) + var(--safe-bottom))',
          paddingBottom: 'var(--safe-bottom)',
          background: 'white', borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          zIndex: 100, maxWidth: 480, margin: '0 auto',
        }}>
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={({ isActive }) => ({
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 2, padding: '6px 10px', minWidth: 56,
                color: isActive ? 'var(--navy)' : 'var(--text-muted)',
                fontSize: '0.65rem', fontWeight: isActive ? 600 : 500,
                position: 'relative',
              })}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.to === '/cart' && cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: 0, right: 4,
                  background: 'var(--error)', color: 'white',
                  fontSize: 10, fontWeight: 700, minWidth: 16, height: 16,
                  borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{cartCount}</span>
              )}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}
