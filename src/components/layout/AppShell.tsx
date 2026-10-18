import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useCartStore } from '../../stores/cartStore'

const items = [
  { to: '/', label: 'Home', icon: '🏠', activeIcon: '🏠' },
  { to: '/categories', label: 'Categories', icon: '📂', activeIcon: '📂' },
  { to: '/wishlist', label: 'Wishlist', icon: '♡', activeIcon: '❤️' },
  { to: '/cart', label: 'Cart', icon: '🛒', activeIcon: '🛒' },
  { to: '/account', label: 'Account', icon: '👤', activeIcon: '👤' },
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
      <main style={{
        flex: 1,
        paddingBottom: hide ? 0 : 'calc(var(--bottom-h) + var(--safe-bottom))',
      }}>
        <Outlet />
      </main>
      {!hide && (
        <nav style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          height: 'calc(var(--bottom-h) + var(--safe-bottom))',
          paddingBottom: 'var(--safe-bottom)',
          background: 'rgba(255,255,255,0.98)',
          borderTop: '1px solid var(--border-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          zIndex: 100, maxWidth: 480, margin: '0 auto',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 -2px 12px rgba(0,0,0,0.04)',
        }}>
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={({ isActive }) => ({
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 2, padding: '6px 8px', minWidth: 58,
                color: isActive ? 'var(--navy)' : 'var(--text-3)',
                fontSize: '0.625rem', fontWeight: isActive ? 700 : 500,
                position: 'relative', transition: 'color 0.15s',
              })}
            >
              {({ isActive }) => (
                <>
                  <span style={{ fontSize: 21, lineHeight: 1 }}>
                    {isActive ? item.activeIcon : item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.to === '/cart' && cartCount > 0 && (
                    <span style={{
                      position: 'absolute', top: 0, right: 6,
                      background: 'var(--error)', color: 'white',
                      fontSize: 10, fontWeight: 700, minWidth: 16, height: 16,
                      borderRadius: 8, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', padding: '0 4px',
                    }}>{cartCount}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}
