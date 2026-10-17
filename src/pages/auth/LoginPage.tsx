import { Link } from 'react-router-dom'

export function LoginPage() {
  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-off-white)',
    }}>
      <div style={{
        background: 'var(--color-navy)',
        color: 'white',
        padding: '48px 24px 32px',
        textAlign: 'center',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: 'linear-gradient(135deg, #C9A227, #E0C04A)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 28, fontWeight: 700, color: '#0A2540',
        }}>P</div>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700 }}>Welcome Back</h1>
        <p style={{ opacity: 0.7, fontSize: '0.875rem', marginTop: 4 }}>Sign in to Paras Clothe Emporium</p>
      </div>

      <div style={{ padding: 24, flex: 1 }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={(e) => e.preventDefault()}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6 }}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: '1.5px solid var(--color-gray-200)', fontSize: '1rem',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6 }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: '1.5px solid var(--color-gray-200)', fontSize: '1rem',
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full">
            Sign In
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--color-navy)', fontWeight: 600 }}>Sign up</Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: 12 }}>
          <Link to="/" style={{ fontSize: '0.8125rem', color: 'var(--color-gray-400)' }}>← Continue shopping</Link>
        </p>
      </div>
    </div>
  )
}
