// src/pages/MyReportsPage.tsx

type MyIssue = {
	id: number
	title: string
	category: string
	status: 'New' | 'In progress' | 'Completed' | 'Rejected'
	project?: string
	updatedAt: string
	rejectionReason?: string
}

const myMockIssues: MyIssue[] = [
	{
		id: 101,
		title: 'Broken streetlight near Sea Garden entrance',
		category: 'Lighting',
		status: 'New',
		updatedAt: '2026-03-22',
	},
	{
		id: 102,
		title: 'Potholes on the road to Asparuhovo beach',
		category: 'Roads',
		status: 'In progress',
		project: 'Road maintenance 2026 – Asparuhovo',
		updatedAt: '2026-03-21',
	},
	{
		id: 103,
		title: 'Overflowing trash containers behind bus station',
		category: 'Waste',
		status: 'Rejected',
		updatedAt: '2026-03-19',
		rejectionReason:
			'This location is already covered by an active cleaning contract scheduled for this week.',
	},
	{
		id: 104,
		title: 'Damaged playground equipment near school',
		category: 'Parks & playgrounds',
		status: 'Completed',
		project: 'Playground safety improvements 2026',
		updatedAt: '2026-03-15',
	},
]

function statusBadge(issue: MyIssue) {
	let bg = '#d1d5db'
	let color = '#374151'

	if (issue.status === 'New') {
		bg = '#dbeafe'
		color = '#1d4ed8'
	} else if (issue.status === 'In progress') {
		bg = '#ffedd5'
		color = '#ea580c'
	} else if (issue.status === 'Completed') {
		bg = '#dcfce7'
		color = '#16a34a'
	} else if (issue.status === 'Rejected') {
		bg = '#e5e7eb'
		color = '#4b5563'
	}

	return (
		<span
			style={{
				padding: '4px 10px',
				borderRadius: 999,
				backgroundColor: bg,
				color,
				fontSize: 12,
				fontWeight: 500,
			}}
		>
			{issue.status}
		</span>
	)
}

export function MyReportsPage() {
	return (
		<div style={{ maxWidth: 1200, margin: '0 auto' }}>
			<h1
				style={{
					fontSize: 28,
					marginBottom: 8,
					color: '#022f66',
				}}
			>
				My reports
			</h1>

			<p
				style={{
					marginBottom: 24,
					color: '#4b5563',
				}}
			>
				Here you can see all issues you have reported in Varna, their current
				status, and any reasons for rejection.
			</p>

			{/* Счётчики по статусам */}
			<div
				style={{
					display: 'flex',
					gap: 16,
					marginBottom: 20,
					flexWrap: 'wrap',
				}}
			>
				{[
					{
						label: 'Total',
						value: myMockIssues.length,
					},
					{
						label: 'In progress',
						value: myMockIssues.filter(i => i.status === 'In progress').length,
					},
					{
						label: 'Completed',
						value: myMockIssues.filter(i => i.status === 'Completed').length,
					},
					{
						label: 'Rejected',
						value: myMockIssues.filter(i => i.status === 'Rejected').length,
					},
				].map(stat => (
					<div
						key={stat.label}
						style={{
							flex: '1 1 160px',
							minWidth: 160,
							backgroundColor: '#ffffff',
							borderRadius: 18,
							padding: '12px 16px',
							boxShadow: '0 10px 25px rgba(15,30,60,0.08)',
						}}
					>
						<div
							style={{
								fontSize: 13,
								color: '#6b7280',
								marginBottom: 4,
							}}
						>
							{stat.label}
						</div>
						<div
							style={{
								fontSize: 20,
								fontWeight: 600,
								color: '#022f66',
							}}
						>
							{stat.value}
						</div>
					</div>
				))}
			</div>

			{/* Список заявок */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 12,
				}}
			>
				{myMockIssues.map(issue => (
					<div
						key={issue.id}
						style={{
							backgroundColor: '#ffffff',
							borderRadius: 20,
							padding: '16px 20px',
							boxShadow: '0 12px 30px rgba(15,30,60,0.08)',
							display: 'flex',
							flexDirection: 'column',
							gap: 8,
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								gap: 12,
								alignItems: 'flex-start',
							}}
						>
							<div>
								<div
									style={{
										fontSize: 15,
										fontWeight: 600,
										color: '#022f66',
										marginBottom: 4,
									}}
								>
									{issue.title}
								</div>
								<div
									style={{
										fontSize: 13,
										color: '#6b7280',
									}}
								>
									Category: {issue.category}
								</div>
							</div>

							<div style={{ textAlign: 'right' }}>
								{statusBadge(issue)}
								<div
									style={{
										fontSize: 12,
										color: '#9ca3af',
										marginTop: 4,
									}}
								>
									Updated: {issue.updatedAt}
								</div>
							</div>
						</div>

						{issue.project && (
							<div
								style={{
									fontSize: 13,
									color: '#0369a1',
								}}
							>
								Part of project: <strong>{issue.project}</strong>
							</div>
						)}

						{issue.status === 'Rejected' && issue.rejectionReason && (
							<div
								style={{
									marginTop: 4,
									padding: '10px 12px',
									borderRadius: 12,
									backgroundColor: '#f3f4f6',
									fontSize: 13,
									color: '#4b5563',
								}}
							>
								<strong style={{ fontWeight: 600 }}>
									Reason for rejection:
								</strong>{' '}
								{issue.rejectionReason}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
