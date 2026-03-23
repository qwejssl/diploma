// src/pages/ProjectsPage.tsx
import { useNavigate } from 'react-router-dom'

type Project = {
	id: number
	name: string
	category: 'Roads' | 'Lighting' | 'Parks' | 'Education' | 'Waste'
	district: string
	status: 'Planned' | 'In progress' | 'Completed'
	plannedBudget: number // k EUR
	spent: number // k EUR
	period: string
}

export const mockProjects: Project[] = [
	{
		id: 201,
		name: 'Road maintenance 2026 – Asparuhovo',
		category: 'Roads',
		district: 'Asparuhovo',
		status: 'In progress',
		plannedBudget: 850,
		spent: 420,
		period: '2026 Q1–Q4',
	},
	{
		id: 202,
		name: 'Sea Garden lighting upgrade',
		category: 'Lighting',
		district: 'Sea Garden',
		status: 'Planned',
		plannedBudget: 320,
		spent: 0,
		period: '2026 Q2–Q3',
	},
	{
		id: 203,
		name: 'Playground safety improvements 2026',
		category: 'Parks',
		district: 'Central Varna',
		status: 'Completed',
		plannedBudget: 260,
		spent: 255,
		period: '2025 Q4–2026 Q1',
	},
	{
		id: 204,
		name: 'School yard renovation – Varna School #5',
		category: 'Education',
		district: 'Mladost',
		status: 'In progress',
		plannedBudget: 410,
		spent: 180,
		period: '2026 Q1–Q3',
	},
	{
		id: 205,
		name: 'Waste containers modernization',
		category: 'Waste',
		district: 'Whole city',
		status: 'Planned',
		plannedBudget: 600,
		spent: 0,
		period: '2026 Q3–Q4',
	},
]

const categoryColors: Record<Project['category'], string> = {
	Roads: '#f97316',
	Lighting: '#eab308',
	Parks: '#16a34a',
	Education: '#2563eb',
	Waste: '#7c3aed',
}

export function ProjectsPage() {
	const navigate = useNavigate()

	const totalPlanned = mockProjects.reduce((sum, p) => sum + p.plannedBudget, 0)
	const totalSpent = mockProjects.reduce((sum, p) => sum + p.spent, 0)

	const byCategory = mockProjects.reduce(
		(acc, p) => {
			acc[p.category] = (acc[p.category] || 0) + p.plannedBudget
			return acc
		},
		{} as Record<Project['category'], number>,
	)

	const byStatus = mockProjects.reduce(
		(acc, p) => {
			acc[p.status] = (acc[p.status] || 0) + p.plannedBudget
			return acc
		},
		{} as Record<Project['status'], number>,
	)

	return (
		<div style={{ maxWidth: 1200, margin: '0 auto' }}>
			<h1
				style={{
					fontSize: 28,
					marginBottom: 8,
					color: '#022f66',
				}}
			>
				City projects & budget
			</h1>

			<p
				style={{
					marginBottom: 24,
					color: '#4b5563',
				}}
			>
				See how Varna plans and spends budget on infrastructure, lighting,
				parks, education and waste management projects.
			</p>

			{/* Summary cards */}
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 16,
					marginBottom: 24,
				}}
			>
				<div
					style={{
						flex: '1 1 200px',
						minWidth: 200,
						backgroundColor: '#ffffff',
						borderRadius: 18,
						padding: '14px 18px',
						boxShadow: '0 12px 30px rgba(15,30,60,0.08)',
					}}
				>
					<div
						style={{
							fontSize: 13,
							color: '#6b7280',
							marginBottom: 4,
						}}
					>
						Planned budget (k EUR)
					</div>
					<div
						style={{
							fontSize: 22,
							fontWeight: 600,
							color: '#022f66',
						}}
					>
						{totalPlanned}
					</div>
				</div>

				<div
					style={{
						flex: '1 1 200px',
						minWidth: 200,
						backgroundColor: '#ffffff',
						borderRadius: 18,
						padding: '14px 18px',
						boxShadow: '0 12px 30px rgba(15,30,60,0.08)',
					}}
				>
					<div
						style={{
							fontSize: 13,
							color: '#6b7280',
							marginBottom: 4,
						}}
					>
						Spent so far (k EUR)
					</div>
					<div
						style={{
							fontSize: 22,
							fontWeight: 600,
							color: '#022f66',
						}}
					>
						{totalSpent}
					</div>
				</div>

				<div
					style={{
						flex: '1 1 200px',
						minWidth: 200,
						backgroundColor: '#ffffff',
						borderRadius: 18,
						padding: '14px 18px',
						boxShadow: '0 12px 30px rgba(15,30,60,0.08)',
					}}
				>
					<div
						style={{
							fontSize: 13,
							color: '#6b7280',
							marginBottom: 4,
						}}
					>
						Active projects
					</div>
					<div
						style={{
							fontSize: 22,
							fontWeight: 600,
							color: '#022f66',
						}}
					>
						{mockProjects.filter(p => p.status !== 'Completed').length}
					</div>
				</div>
			</div>

			{/* Table + charts */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1.2fr 0.8fr',
					gap: 24,
					alignItems: 'flex-start',
				}}
			>
				{/* Table */}
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
								<th style={{ padding: '10px 14px' }}>Project</th>
								<th style={{ padding: '10px 14px' }}>Category</th>
								<th style={{ padding: '10px 14px' }}>District</th>
								<th style={{ padding: '10px 14px' }}>Status</th>
								<th style={{ padding: '10px 14px' }}>Planned (k EUR)</th>
								<th style={{ padding: '10px 14px' }}>Spent (k EUR)</th>
							</tr>
						</thead>
						<tbody>
							{mockProjects.map(p => (
								<tr
									key={p.id}
									style={{ cursor: 'pointer' }}
									onClick={() => navigate(`/projects/${p.id}`)}
								>
									<td
										style={{
											padding: '10px 14px',
											borderTop: '1px solid #e5e7eb',
										}}
									>
										{p.name}
										<div
											style={{
												fontSize: 12,
												color: '#9ca3af',
											}}
										>
											{p.period}
										</div>
									</td>
									<td
										style={{
											padding: '10px 14px',
											borderTop: '1px solid #e5e7eb',
											color: categoryColors[p.category],
											fontWeight: 500,
										}}
									>
										{p.category}
									</td>
									<td
										style={{
											padding: '10px 14px',
											borderTop: '1px solid #e5e7eb',
										}}
									>
										{p.district}
									</td>
									<td
										style={{
											padding: '8px 14px',
											borderTop: '1px solid #e5e7eb',
											whiteSpace: 'nowrap',
										}}
									>
										<span
											style={{
												padding: '2px 8px',
												borderRadius: 999,
												backgroundColor:
													p.status === 'Planned'
														? '#e0f2fe'
														: p.status === 'In progress'
															? '#ffedd5'
															: '#dcfce7',
												color:
													p.status === 'Planned'
														? '#0369a1'
														: p.status === 'In progress'
															? '#ea580c'
															: '#16a34a',
												fontSize: 11,
												fontWeight: 500,
											}}
										>
											{p.status}
										</span>
									</td>
									<td
										style={{
											padding: '10px 14px',
											borderTop: '1px solid #e5e7eb',
										}}
									>
										{p.plannedBudget}
									</td>
									<td
										style={{
											padding: '10px 14px',
											borderTop: '1px solid #e5e7eb',
										}}
									>
										{p.spent}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Simple charts */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
					{/* Category bar chart */}
					<div
						style={{
							backgroundColor: '#ffffff',
							borderRadius: 20,
							padding: 16,
							boxShadow: '0 16px 40px rgba(15,30,60,0.1)',
						}}
					>
						<div
							style={{
								fontSize: 15,
								fontWeight: 600,
								marginBottom: 8,
								color: '#022f66',
							}}
						>
							Budget by category (k EUR)
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
							{(
								Object.entries(byCategory) as [Project['category'], number][]
							).map(([category, value]) => (
								<div key={category}>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											fontSize: 13,
											marginBottom: 2,
											color: '#4b5563',
										}}
									>
										<span>{category}</span>
										<span>{value}</span>
									</div>
									<div
										style={{
											height: 8,
											borderRadius: 999,
											backgroundColor: '#e5e7eb',
											overflow: 'hidden',
										}}
									>
										<div
											style={{
												width:
													totalPlanned > 0
														? `${(value / totalPlanned) * 100}%`
														: '0%',
												height: '100%',
												backgroundColor: categoryColors[category],
											}}
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Status distribution */}
					<div
						style={{
							backgroundColor: '#ffffff',
							borderRadius: 20,
							padding: 16,
							boxShadow: '0 16px 40px rgba(15,30,60,0.1)',
						}}
					>
						<div
							style={{
								fontSize: 15,
								fontWeight: 600,
								marginBottom: 8,
								color: '#022f66',
							}}
						>
							Budget by project status (k EUR)
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
							{(Object.entries(byStatus) as [Project['status'], number][]).map(
								([status, value]) => (
									<div
										key={status}
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											fontSize: 13,
											color: '#4b5563',
										}}
									>
										<span>{status}</span>
										<span>{value}</span>
									</div>
								),
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
