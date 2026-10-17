export function SplashScreen() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(160deg, #0A2540 0%, #061829 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: 'white',
    }}>
      <div style={{
        width: 88,
        height: 88,
        borderRadius: 20,
        background: 'linear-gradient(135deg, #C9A227 0%, #E0C04A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        boxShadow: '0 8px 32px rgba(201, 162, 39, 0.35)',
      }}>
        <span style={{ fontSize: 42, fontWeight: 700, color: '#0A2540' }}>P</span>
      </div>
      <h1 style={{
        fontSize: '1.75rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        marginBottom: 8,
        textAlign: 'center',
      }}>
        Paras Clothe Emporium
      </h1>
      <p style={{
        fontSize: '0.9375rem',
        opacity: 0.75,
        fontStyle: 'italic',
        marginBottom: 40,
      }}>
        Your Style, Your Store.
      </p>
      <div style={{
        width: 40,
        height: 40,
        border: '3px solid rgba(255,255,255,0.2)',
        borderTopColor: '#C9A227',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
