import { Link, Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 32px',
          backgroundColor: '#022f66', // синяя шапка
          color: '#ffffff',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 20 }}>Varna CityFix</div>

        <nav style={{ display: 'flex', gap: '24px', fontSize: 14 }}>
          <Link style={{ color: '#ffffff' }} to="/">Home</Link>
          <Link style={{ color: '#ffffff' }} to="/map">Map</Link>
          <Link style={{ color: '#ffffff' }} to="/issues">Issues</Link>
          <Link style={{ color: '#ffffff' }} to="/projects">Projects &amp; Budget</Link>
          <Link style={{ color: '#ffffff' }} to="/my-reports">My Reports</Link>
          <Link style={{ color: '#ffffff' }} to="/about">About</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            style={{
              padding: '6px 16px',
              borderRadius: 20,
              border: 'none',
              backgroundColor: '#0b1a33',
              color: '#fff',
              fontSize: 13,
            }}
          >
            EN / BG
          </button>
          <button
            style={{
              padding: '6px 18px',
              borderRadius: 20,
              border: 'none',
              background:
                'linear-gradient(135deg, #00c6a7 0%, #00a3ff 100%)',
              color: '#022f66',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            Sign in / Sign up
          </button>
        </div>
      </header>

      <main style={{ padding: '32px 32px 48px' }}>
        <Outlet />
      </main>
    </div>
  );
}