// src/layouts/AdminLayout.tsx
import { Link, Outlet } from 'react-router-dom'

export function AdminLayout() {
	return (
		<div style={{ minHeight: '100vh', display: 'flex', background: '#0f172a' }}>
			{/* Sidebar */}
			<aside
				style={{
					width: 220,
					padding: '20px 16px',
					borderRight: '1px solid #1e293b',
					color: '#e5e7eb',
				}}
			>
				<div
					style={{
						fontWeight: 700,
						fontSize: 18,
						marginBottom: 24,
					}}
				>
					Admin • Varna
				</div>

				<nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
					<Link
						to='/admin'
						style={{ color: '#e5e7eb', textDecoration: 'none', fontSize: 14 }}
					>
						Dashboard
					</Link>
					<Link
						to='/admin/issues'
						style={{ color: '#e5e7eb', textDecoration: 'none', fontSize: 14 }}
					>
						Issues
					</Link>
					<Link
						to='/admin/projects'
						style={{ color: '#e5e7eb', textDecoration: 'none', fontSize: 14 }}
					>
						Projects
					</Link>
				</nav>
			</aside>

			{/* Content */}
			<div style={{ flex: 1, background: '#020617', color: '#e5e7eb' }}>
				<header
					style={{
						padding: '12px 24px',
						borderBottom: '1px solid #1e293b',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div style={{ fontSize: 14, color: '#9ca3af' }}>Admin dashboard</div>
					<Link
						to='/'
						style={{ fontSize: 13, color: '#38bdf8', textDecoration: 'none' }}
					>
						← Back to public site
					</Link>
				</header>

				<main style={{ padding: '20px 24px' }}>
					<Outlet />
				</main>
			</div>
		</div>
	)
}
