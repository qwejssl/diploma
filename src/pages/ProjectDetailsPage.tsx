// src/pages/ProjectDetailsPage.tsx
import { Link, useParams } from 'react-router-dom'
import { mockProjects } from './ProjectsPage'

type TimelineStep = {
	label: string
	date: string
	status: 'Planned' | 'In progress' | 'Completed'
}

type RelatedIssue = {
	id: number
	title: string
	district: string
	status: 'New' | 'In progress' | 'Completed' | 'Rejected'
}

const mockProjectTimelines: Record<number, TimelineStep[]> = {
	201: [
		{
			label: 'Project approved',
			date: '2026-01-10',
			status: 'Planned',
		},
		{
			label: 'Contractor selected',
			date: '2026-02-05',
			status: 'In progress',
		},
	],
	202: [
		{
			label: 'Design phase',
			date: '2026-03-01',
			status: 'Planned',
		},
	],
	203: [
		{
			label: 'Construction completed',
			date: '2026-01-20',
			status: 'Completed',
		},
	],
	204: [
		{
			label: 'Renovation started',
			date: '2026-02-15',
			status: 'In progress',
		},
	],
	205: [
		{
			label: 'Planning',
			date: '2026-05-01',
			status: 'Planned',
		},
	],
}

const mockRelatedIssues: Record<number, RelatedIssue[]> = {
	201: [
		{
			id: 2,
			title: 'Potholes on main road to Asparuhovo beach',
			district: 'Asparuhovo',
			status: 'In progress',
		},
	],
	202: [
		{
			id: 1,
			title: 'Broken streetlight near Sea Garden',
			district: 'Sea Garden',
			status: 'New',
		},
	],
	203: [
		{
			id: 4,
			title: 'Damaged playground equipment near school',
			district: 'Central Varna',
			status: 'Completed',
		},
	],
	204: [],
	205: [],
}

function statusColor(status: 'Planned' | 'In progress' | 'Completed') {
	if (status === 'Planned') return '#0369a1'
	if (status === 'In progress') return '#ea580c'
	return '#16a34a'
}

export function ProjectDetailsPage() {
	const params = useParams()
	const id = Number(params.id)

	const project = mockProjects.find(p => p.id === id)

	if (!project) {
		return (
			<div style={{ maxWidth: 1200, margin: '0 auto' }}>
				<p>Project not found.</p>
				<Link to='/projects' style={{ color: '#2563eb' }}>
					← Back to projects
				</Link>
			</div>
		)
	}

	const timeline = mockProjectTimelines[project.id] || []
	const relatedIssues = mockRelatedIssues[project.id] || []

	const progress =
		project.plannedBudget > 0
			? Math.min(100, Math.round((project.spent / project.plannedBudget) * 100))
			: 0

	return (
		<div style={{ maxWidth: 1200, margin: '0 auto' }}>
			<div
				style={{
					marginBottom: 16,
					fontSize: 14,
				}}
			>
				<Link to='/projects' style={{ color: '#2563eb' }}>
					← Back to projects
				</Link>
			</div>

			<h1
				style={{
					fontSize: 26,
					marginBottom: 8,
					color: '#022f66',
				}}
			>
				{project.name}
			</h1>

			<div
				style={{
					display: 'flex',
					gap: 12,
					alignItems: 'center',
					fontSize: 14,
					color: '#4b5563',
					marginBottom: 16,
				}}
			>
				<span>Category: {project.category}</span>
				<span>• District: {project.district}</span>
				<span>• Period: {project.period}</span>
			</div>

			<div
				style={{
					marginBottom: 24,
				}}
			>
				<span
					style={{
						padding: '6px 12px',
						borderRadius: 999,
						backgroundColor: statusColor(project.status) + '20',
						color: statusColor(project.status),
						fontWeight: 600,
						fontSize: 13,
					}}
				>
					Project status: {project.status}
				</span>
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1.1fr 0.9fr',
					gap: 24,
					alignItems: 'flex-start',
				}}
			>
				{/* Left: budget + timeline */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
					{/* Budget card */}
					<div
						style={{
							backgroundColor: '#ffffff',
							borderRadius: 20,
							padding: 20,
							boxShadow: '0 16px 40px rgba(15,30,60,0.1)',
						}}
					>
						<h2
							style={{
								fontSize: 18,
								marginTop: 0,
								marginBottom: 12,
								color: '#022f66',
							}}
						>
							Budget
						</h2>

						<div
							style={{
								display: 'flex',
								gap: 24,
								marginBottom: 16,
								flexWrap: 'wrap',
							}}
						>
							<div>
								<div
									style={{
										fontSize: 13,
										color: '#6b7280',
										marginBottom: 4,
									}}
								>
									Planned (k EUR)
								</div>
								<div
									style={{
										fontSize: 22,
										fontWeight: 600,
										color: '#022f66',
									}}
								>
									{project.plannedBudget}
								</div>
							</div>
							<div>
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
									{project.spent}
								</div>
							</div>
						</div>

						<div
							style={{
								fontSize: 13,
								color: '#6b7280',
								marginBottom: 4,
							}}
						>
							Spending progress
						</div>
						<div
							style={{
								height: 10,
								borderRadius: 999,
								backgroundColor: '#e5e7eb',
								overflow: 'hidden',
								marginBottom: 4,
							}}
						>
							<div
								style={{
									width: `${progress}%`,
									height: '100%',
									background:
										'linear-gradient(90deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
								}}
							/>
						</div>
						<div
							style={{
								fontSize: 12,
								color: '#6b7280',
							}}
						>
							{progress}% of planned budget spent
						</div>
					</div>

					{/* Timeline */}
					<div
						style={{
							backgroundColor: '#ffffff',
							borderRadius: 20,
							padding: 20,
							boxShadow: '0 16px 40px rgba(15,30,60,0.1)',
						}}
					>
						<h2
							style={{
								fontSize: 18,
								marginTop: 0,
								marginBottom: 12,
								color: '#022f66',
							}}
						>
							Project timeline
						</h2>

						{timeline.length === 0 ? (
							<p
								style={{
									fontSize: 13,
									color: '#6b7280',
									margin: 0,
								}}
							>
								Timeline data will be added later.
							</p>
						) : (
							<ol
								style={{
									listStyle: 'none',
									padding: 0,
									margin: 0,
								}}
							>
								{timeline.map((step, index) => {
									const color = statusColor(step.status)
									const isLast = index === timeline.length - 1
									return (
										<li
											key={step.label + step.date}
											style={{
												display: 'flex',
												gap: 12,
												paddingBottom: isLast ? 0 : 12,
												marginBottom: isLast ? 0 : 12,
												borderBottom: isLast ? 'none' : '1px dashed #e5e7eb',
											}}
										>
											<div
												style={{
													marginTop: 4,
													width: 10,
													height: 10,
													borderRadius: '50%',
													backgroundColor: color,
													flexShrink: 0,
												}}
											/>
											<div>
												<div
													style={{
														fontSize: 14,
														fontWeight: 600,
														color,
														marginBottom: 2,
													}}
												>
													{step.label}
												</div>
												<div
													style={{
														fontSize: 12,
														color: '#6b7280',
													}}
												>
													{step.date} • {step.status}
												</div>
											</div>
										</li>
									)
								})}
							</ol>
						)}
					</div>
				</div>

				{/* Right: related issues */}
				<div
					style={{
						backgroundColor: '#ffffff',
						borderRadius: 20,
						padding: 20,
						boxShadow: '0 16px 40px rgba(15,30,60,0.1)',
					}}
				>
					<h2
						style={{
							fontSize: 18,
							marginTop: 0,
							marginBottom: 12,
							color: '#022f66',
						}}
					>
						Related issues
					</h2>

					{relatedIssues.length === 0 ? (
						<p
							style={{
								fontSize: 13,
								color: '#6b7280',
								margin: 0,
							}}
						>
							No citizen reports linked to this project yet.
						</p>
					) : (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 10,
							}}
						>
							{relatedIssues.map(issue => (
								<Link
									key={issue.id}
									to={`/issues/${issue.id}`}
									style={{
										textDecoration: 'none',
									}}
								>
									<div
										style={{
											padding: '10px 12px',
											borderRadius: 14,
											border: '1px solid #e5e7eb',
											backgroundColor: '#f9fafb',
										}}
									>
										<div
											style={{
												fontSize: 14,
												fontWeight: 500,
												color: '#022f66',
												marginBottom: 2,
											}}
										>
											{issue.title}
										</div>
										<div
											style={{
												fontSize: 12,
												color: '#6b7280',
											}}
										>
											District: {issue.district}
										</div>
										<div
											style={{
												marginTop: 4,
												fontSize: 12,
												color: '#6b7280',
											}}
										>
											Status: {issue.status}
										</div>
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
