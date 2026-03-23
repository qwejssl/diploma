// src/pages/admin/AdminDashboardPage.tsx

type AdminIssue = {
	id: number
	title: string
	category: string
	district: string
	status: 'New' | 'In progress' | 'Completed' | 'Rejected'
	priority: 'Low' | 'Medium' | 'High'
	votes: number
	createdAt: string
}

const adminMockIssues: AdminIssue[] = [
	{
		id: 1,
		title: 'Broken streetlight near Sea Garden',
		category: 'Lighting',
		district: 'Sea Garden',
		status: 'New',
		priority: 'High',
		votes: 12,
		createdAt: '2026-03-21',
	},
	{
		id: 2,
		title: 'Potholes on main road to Asparuhovo beach',
		category: 'Roads',
		district: 'Asparuhovo',
		status: 'In progress',
		priority: 'Medium',
		votes: 34,
		createdAt: '2026-03-20',
	},
	{
		id: 3,
		title: 'Overflowing trash containers behind bus station',
		category: 'Waste',
		district: 'Central Varna',
		status: 'New',
		priority: 'High',
		votes: 20,
		createdAt: '2026-03-22',
	},
]

export function AdminDashboardPage() {
	const total = adminMockIssues.length
	const newCount = adminMockIssues.filter(i => i.status === 'New').length
	const inProgress = adminMockIssues.filter(
		i => i.status === 'In progress',
	).length
	const completed = adminMockIssues.filter(i => i.status === 'Completed').length

	return (
		<div>
			<h1
				style={{
					fontSize: 22,
					marginBottom: 16,
					color: '#e5e7eb',
				}}
			>
				Dashboard
			</h1>

			{/* Counters */}
			<div
				style={{
					display: 'flex',
					gap: 16,
					marginBottom: 24,
					flexWrap: 'wrap',
				}}
			>
				{[
					{ label: 'Total reports (last 7 days)', value: total },
					{ label: 'New', value: newCount },
					{ label: 'In progress', value: inProgress },
					{ label: 'Completed', value: completed },
				].map(s => (
					<div
						key={s.label}
						style={{
							flex: '1 1 180px',
							minWidth: 180,
							backgroundColor: '#020617',
							borderRadius: 16,
							padding: '12px 14px',
							border: '1px solid #1e293b',
							boxShadow: '0 10px 30px rgba(15,23,42,0.6)',
						}}
					>
						<div
							style={{
								fontSize: 12,
								color: '#9ca3af',
								marginBottom: 4,
							}}
						>
							{s.label}
						</div>
						<div
							style={{
								fontSize: 20,
								fontWeight: 600,
								color: '#e5e7eb',
							}}
						>
							{s.value}
						</div>
					</div>
				))}
			</div>

			{/* New / in progress issues table */}
			<h2
				style={{
					fontSize: 16,
					marginBottom: 12,
					color: '#e5e7eb',
				}}
			>
				Open reports
			</h2>

			<div
				style={{
					borderRadius: 16,
					overflow: 'hidden',
					backgroundColor: '#020617',
					border: '1px solid #1e293b',
					boxShadow: '0 16px 40px rgba(15,23,42,0.7)',
				}}
			>
				<table
					style={{
						width: '100%',
						borderCollapse: 'collapse',
						fontSize: 13,
					}}
				>
					<thead
						style={{
							backgroundColor: '#020617',
							textAlign: 'left',
						}}
					>
						<tr>
							<th style={{ padding: '10px 14px', color: '#9ca3af' }}>Title</th>
							<th style={{ padding: '10px 14px', color: '#9ca3af' }}>
								Category
							</th>
							<th style={{ padding: '10px 14px', color: '#9ca3af' }}>
								District
							</th>
							<th style={{ padding: '10px 14px', color: '#9ca3af' }}>
								Priority
							</th>
							<th style={{ padding: '10px 14px', color: '#9ca3af' }}>Status</th>
							<th style={{ padding: '10px 14px', color: '#9ca3af' }}>Votes</th>
							<th style={{ padding: '10px 14px', color: '#9ca3af' }}>
								Created
							</th>
						</tr>
					</thead>
					<tbody>
						{adminMockIssues.map(issue => (
							<tr key={issue.id}>
								<td
									style={{
										padding: '9px 14px',
										borderTop: '1px solid #1e293b',
										color: '#e5e7eb',
									}}
								>
									{issue.title}
								</td>
								<td
									style={{
										padding: '9px 14px',
										borderTop: '1px solid #1e293b',
										color: '#cbd5f5',
									}}
								>
									{issue.category}
								</td>
								<td
									style={{
										padding: '9px 14px',
										borderTop: '1px solid #1e293b',
										color: '#9ca3af',
									}}
								>
									{issue.district}
								</td>
								<td
									style={{
										padding: '9px 14px',
										borderTop: '1px solid #1e293b',
										color:
											issue.priority === 'High'
												? '#f97373'
												: issue.priority === 'Medium'
													? '#facc15'
													: '#22c55e',
									}}
								>
									{issue.priority}
								</td>
								<td
									style={{
										padding: '9px 14px',
										borderTop: '1px solid #1e293b',
									}}
								>
									{issue.status}
								</td>
								<td
									style={{
										padding: '9px 14px',
										borderTop: '1px solid #1e293b',
										color: '#e5e7eb',
									}}
								>
									{issue.votes}
								</td>
								<td
									style={{
										padding: '9px 14px',
										borderTop: '1px solid #1e293b',
										color: '#9ca3af',
									}}
								>
									{issue.createdAt}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
