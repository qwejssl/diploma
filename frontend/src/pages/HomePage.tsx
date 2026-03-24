import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type IssueStats = {
	totalThisMonth: number
	inProgress: number
	completed: number
}

export function HomePage() {
	const navigate = useNavigate()

	const [stats, setStats] = useState<IssueStats | null>(null)
	const [statsError, setStatsError] = useState<string | null>(null)

	useEffect(() => {
		async function loadStats() {
			try {
				setStatsError(null)
				const res = await fetch('http://localhost:4000/stats/issues')
				if (!res.ok) throw new Error(`Request failed: ${res.status}`)
				const data = await res.json()
				setStats(data)
			} catch (e) {
				console.error(e)
				setStatsError('Failed to load statistics')
			}
		}
		loadStats()
	}, [])

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '48px',
				maxWidth: 1200,
				margin: '0 auto',
			}}
		>
			{/* HERO */}
			<section
				style={{
					display: 'grid',
					gridTemplateColumns: '1.1fr 1fr',
					gap: '32px',
					alignItems: 'center',
					marginTop: '32px',
				}}
			>
				<div>
					<h1
						style={{
							fontSize: '42px',
							lineHeight: 1.1,
							margin: 0,
							color: '#022f66',
						}}
					>
						Help Varna
						<br />
						become a
						<br />
						smarter city
					</h1>

					<p
						style={{
							maxWidth: 420,
							marginTop: 16,
							marginBottom: 24,
							color: '#364152',
						}}
					>
						Help Varna become a smarter city by reporting issues in your
						neighbourhood and tracking how the city fixes them.
					</p>

					<button
						onClick={() => navigate('/issues/new')}
						style={{
							padding: '14px 32px',
							borderRadius: 999,
							border: 'none',
							background: 'linear-gradient(135deg, #00c6a7 0%, #00a3ff 100%)',
							color: '#ffffff',
							fontWeight: 600,
							fontSize: 16,
							cursor: 'pointer',
							boxShadow: '0 14px 30px rgba(0, 163, 255, 0.4)',
						}}
					>
						Report a problem
					</button>
				</div>

				{/* Map placeholder */}
				<div
					style={{
						height: 320,
						borderRadius: 24,
						backgroundColor: '#ffffff',
						boxShadow: '0 22px 60px rgba(15, 30, 60, 0.25)',
						padding: 12,
					}}
				>
					<div
						style={{
							borderRadius: 20,
							height: '100%',
							background:
								'linear-gradient(135deg, #e5f2ff 0%, #f0f7ff 40%, #dfeeff 100%)',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<p
							style={{
								position: 'absolute',
								left: 16,
								top: 14,
								fontSize: 13,
								color: '#4b5563',
							}}
						>
							Map of Varna (placeholder)
						</p>
					</div>
				</div>
			</section>

			{/* THREE STEPS */}
			<section>
				<div
					style={{
						display: 'flex',
						gap: '24px',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
					}}
				>
					{[
						{ title: 'See a problem', desc: 'Find issues around your area.' },
						{ title: 'Report it', desc: 'Submit a report in a few clicks.' },
						{
							title: 'Track progress',
							desc: 'Follow how the city responds.',
						},
					].map(item => (
						<div
							key={item.title}
							style={{
								flex: '1 1 260px',
								minWidth: 260,
								backgroundColor: '#ffffff',
								borderRadius: 24,
								padding: '24px 24px 28px',
								boxShadow: '0 18px 45px rgba(15, 30, 60, 0.12)',
							}}
						>
							<div
								style={{
									width: 44,
									height: 44,
									borderRadius: 16,
									backgroundColor: '#eef3ff',
									marginBottom: 16,
								}}
							/>
							<h3
								style={{
									margin: 0,
									marginBottom: 8,
									fontSize: 18,
									color: '#022f66',
								}}
							>
								{item.title}
							</h3>
							<p
								style={{
									margin: 0,
									fontSize: 14,
									color: '#6b7280',
								}}
							>
								{item.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* STATISTICS */}
			<section style={{ marginBottom: 40 }}>
				<h2
					style={{
						fontSize: 24,
						marginBottom: 16,
						color: '#022f66',
					}}
				>
					Statistics
				</h2>

				{statsError && (
					<p style={{ color: 'red', marginBottom: 8 }}>{statsError}</p>
				)}

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
						gap: '24px',
					}}
				>
					{[
						{
							title: 'Reports this month',
							value:
								stats?.totalThisMonth != null
									? String(stats.totalThisMonth)
									: '—',
						},
						{
							title: 'In progress',
							value: stats?.inProgress != null ? String(stats.inProgress) : '—',
						},
						{
							title: 'Completed',
							value: stats?.completed != null ? String(stats.completed) : '—',
						},
						{ title: 'Active budget', value: '0' },
					].map(card => (
						<div
							key={card.title}
							style={{
								borderRadius: 24,
								overflow: 'hidden',
								backgroundColor: '#ffffff',
								boxShadow: '0 18px 45px rgba(15, 30, 60, 0.12)',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<div
								style={{
									height: 120,
									background:
										'linear-gradient(135deg, #9fd8ff 0%, #62b5ff 40%, #1f7ed0 100%)',
								}}
							/>
							<div style={{ padding: '14px 18px' }}>
								<div
									style={{
										marginBottom: 4,
										color: '#022f66',
										fontWeight: 500,
									}}
								>
									{card.title}
								</div>
								<div style={{ fontWeight: 600, color: '#111827' }}>
									{card.value}
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
