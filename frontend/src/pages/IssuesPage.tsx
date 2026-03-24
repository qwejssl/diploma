// src/pages/IssuesPage.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Issue = {
	id: number
	title: string
	category: string
	status: string // enum из БД: NEW, IN_PROGRESS, ...
	address: string
	updatedAt: string
}

function statusColor(status: Issue['status']) {
	switch (status) {
		case 'NEW':
			return '#2563eb'
		case 'IN_PROGRESS':
			return '#f97316'
		case 'COMPLETED':
			return '#16a34a'
		case 'REJECTED':
			return '#6b7280'
		default:
			return '#6b7280'
	}
}

function statusLabel(status: Issue['status']) {
	switch (status) {
		case 'NEW':
			return 'New'
		case 'IN_PROGRESS':
			return 'In progress'
		case 'COMPLETED':
			return 'Completed'
		case 'REJECTED':
			return 'Rejected'
		default:
			return status
	}
}

export function IssuesPage() {
	const navigate = useNavigate()

	const [issues, setIssues] = useState<Issue[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function loadIssues() {
			try {
				setLoading(true)
				setError(null)

				const res = await fetch('http://localhost:4000/issues')
				if (!res.ok) {
					throw new Error(`Request failed: ${res.status}`)
				}

				const data = await res.json()
				setIssues(data)
			} catch (e) {
				console.error(e)
				setError('Failed to load issues from server')
			} finally {
				setLoading(false)
			}
		}

		loadIssues()
	}, [])

	return (
		<div style={{ maxWidth: 1200, margin: '0 auto' }}>
			<h1
				style={{
					fontSize: 28,
					marginBottom: 8,
					color: '#022f66',
				}}
			>
				Issues in Varna
			</h1>

			<p
				style={{
					marginBottom: 24,
					color: '#4b5563',
				}}
			>
				These issues are loaded from the real PostgreSQL database through the
				backend API.
			</p>

			{loading && <p>Loading issues...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}

			{!loading && !error && (
				<>
					<div
						style={{
							display: 'flex',
							gap: 16,
							marginBottom: 16,
							flexWrap: 'wrap',
						}}
					>
						{/* здесь позже сделаем настоящие фильтры */}
					</div>

					<button
						onClick={() => navigate('/issues/new')}
						style={{
							marginBottom: 16,
							padding: '8px 16px',
							borderRadius: 999,
							border: 'none',
							background: 'linear-gradient(90deg,#06b6d4,#2563eb)',
							color: '#ffffff',
							fontWeight: 600,
							cursor: 'pointer',
						}}
					>
						Create issue
					</button>

					<div
						style={{
							borderRadius: 24,
							overflow: 'hidden',
							backgroundColor: '#ffffff',
							boxShadow: '0 18px 45px rgba(15,30,60,0.08)',
						}}
					>
						<table
							style={{
								width: '100%',
								borderCollapse: 'collapse',
								fontSize: 14,
							}}
						>
							<thead
								style={{
									backgroundColor: '#f3f4f6',
									textAlign: 'left',
								}}
							>
								<tr>
									<th style={{ padding: '12px 16px' }}>Title</th>
									<th style={{ padding: '12px 16px' }}>Category</th>
									<th style={{ padding: '12px 16px' }}>Status</th>
									<th style={{ padding: '12px 16px' }}>Last updated</th>
								</tr>
							</thead>
							<tbody>
								{issues.length === 0 ? (
									<tr>
										<td
											colSpan={4}
											style={{
												padding: '12px 16px',
												textAlign: 'center',
												borderTop: '1px solid #e5e7eb',
											}}
										>
											No issues yet
										</td>
									</tr>
								) : (
									issues.map(issue => (
										<tr
											key={issue.id}
											style={{ cursor: 'pointer' }}
											onClick={() => navigate(`/issues/${issue.id}`)}
										>
											<td
												style={{
													padding: '10px 16px',
													borderTop: '1px solid #e5e7eb',
												}}
											>
												{issue.title}
											</td>
											<td
												style={{
													padding: '10px 16px',
													borderTop: '1px solid #e5e7eb',
												}}
											>
												{issue.category}
											</td>
											<td
												style={{
													padding: '10px 16px',
													borderTop: '1px solid #e5e7eb',
												}}
											>
												<span
													style={{
														padding: '4px 10px',
														borderRadius: 999,
														backgroundColor: statusColor(issue.status) + '20',
														color: statusColor(issue.status),
														fontWeight: 500,
														fontSize: 12,
													}}
												>
													{statusLabel(issue.status)}
												</span>
											</td>
											<td
												style={{
													padding: '10px 16px',
													borderTop: '1px solid #e5e7eb',
												}}
											>
												{issue.updatedAt
													? new Date(issue.updatedAt).toLocaleDateString()
													: '—'}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</>
			)}
		</div>
	)
}
