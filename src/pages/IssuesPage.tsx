// src/pages/IssuesPage.tsx
import { useNavigate } from 'react-router-dom'

type MockIssue = {
	id: number
	title: string
	category: string
	district: string
	status: 'New' | 'In progress' | 'Completed' | 'Rejected'
	priority: 'Low' | 'Medium' | 'High'
	votes: number
	updatedAt: string
}

const mockIssues: MockIssue[] = [
	{
		id: 1,
		title: 'Broken streetlight near Sea Garden',
		category: 'Lighting',
		district: 'Sea Garden',
		status: 'New',
		priority: 'High',
		votes: 12,
		updatedAt: '2026-03-21',
	},
	{
		id: 2,
		title: 'Potholes on main road',
		category: 'Roads',
		district: 'Asparuhovo',
		status: 'In progress',
		priority: 'Medium',
		votes: 34,
		updatedAt: '2026-03-20',
	},
	{
		id: 3,
		title: 'Overflowing trash containers',
		category: 'Waste',
		district: 'Central Varna',
		status: 'Completed',
		priority: 'High',
		votes: 20,
		updatedAt: '2026-03-18',
	},
]

function statusColor(status: MockIssue['status']) {
	switch (status) {
		case 'New':
			return '#2563eb'
		case 'In progress':
			return '#f97316'
		case 'Completed':
			return '#16a34a'
		case 'Rejected':
			return '#6b7280'
		default:
			return '#6b7280'
	}
}

export function IssuesPage() {
	const navigate = useNavigate()

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
				Browse reported issues. Later this list will be loaded from the backend
				with filters and search.
			</p>

			{/* Панель фильтров (пока только визуально) */}
			<div
				style={{
					display: 'flex',
					gap: 16,
					marginBottom: 16,
					flexWrap: 'wrap',
				}}
			>
				<select
					style={{
						padding: '8px 12px',
						borderRadius: 999,
						border: '1px solid #d1d5db',
						backgroundColor: '#ffffff',
					}}
					defaultValue=''
				>
					<option value=''>All categories</option>
					<option value='Roads'>Roads</option>
					<option value='Lighting'>Lighting</option>
					<option value='Waste'>Waste</option>
				</select>

				<select
					style={{
						padding: '8px 12px',
						borderRadius: 999,
						border: '1px solid #d1d5db',
						backgroundColor: '#ffffff',
					}}
					defaultValue=''
				>
					<option value=''>All statuses</option>
					<option value='New'>New</option>
					<option value='In progress'>In progress</option>
					<option value='Completed'>Completed</option>
				</select>

				<input
					type='text'
					placeholder='Search by title or street...'
					style={{
						flex: '1 1 220px',
						minWidth: 220,
						padding: '8px 12px',
						borderRadius: 999,
						border: '1px solid #d1d5db',
						backgroundColor: '#ffffff',
					}}
				/>
			</div>

			{/* Таблица заявок */}
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
							<th style={{ padding: '12px 16px' }}>District</th>
							<th style={{ padding: '12px 16px' }}>Status</th>
							<th style={{ padding: '12px 16px' }}>Priority</th>
							<th style={{ padding: '12px 16px' }}>Votes</th>
							<th style={{ padding: '12px 16px' }}>Last updated</th>
						</tr>
					</thead>
					<tbody>
						{mockIssues.map(issue => (
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
									{issue.district}
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
										{issue.status}
									</span>
								</td>
								<td
									style={{
										padding: '10px 16px',
										borderTop: '1px solid #e5e7eb',
									}}
								>
									{issue.priority}
								</td>
								<td
									style={{
										padding: '10px 16px',
										borderTop: '1px solid #e5e7eb',
									}}
								>
									{issue.votes}
								</td>
								<td
									style={{
										padding: '10px 16px',
										borderTop: '1px solid #e5e7eb',
									}}
								>
									{issue.updatedAt}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
