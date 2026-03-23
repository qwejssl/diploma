// src/pages/IssueDetailsPage.tsx
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Link, useParams } from 'react-router-dom'

const defaultIcon = new L.Icon({
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	iconRetinaUrl:
		'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
})

type StatusStep =
	| 'New'
	| 'Under review'
	| 'In progress'
	| 'Completed'
	| 'Rejected'

type IssueDetails = {
	id: number
	title: string
	category: string
	district: string
	status: StatusStep
	priority: 'Low' | 'Medium' | 'High'
	votes: number
	address: string
	coordinates: [number, number]
	description: string
	project?: {
		id: number
		name: string
		status: 'Planned' | 'In progress' | 'Completed'
	}
	rejectionReason?: string
	timeline: {
		status: StatusStep
		date: string
		note?: string
	}[]
}

const VARNA_CENTER: [number, number] = [43.2141, 27.9147]

const mockIssueDetails: IssueDetails[] = [
	{
		id: 1,
		title: 'Broken streetlight near Sea Garden',
		category: 'Lighting',
		district: 'Sea Garden',
		status: 'New',
		priority: 'High',
		votes: 12,
		address: 'Sea Garden main alley, near central entrance',
		coordinates: [43.2085, 27.9215],
		description:
			'The streetlight near the main entrance of the Sea Garden is broken and the area is very dark at night.',
		timeline: [
			{ status: 'New', date: '2026-03-21', note: 'Reported by citizen' },
		],
	},
	{
		id: 2,
		title: 'Potholes on main road',
		category: 'Roads',
		district: 'Asparuhovo',
		status: 'In progress',
		priority: 'Medium',
		votes: 34,
		address: 'Main road to Asparuhovo beach',
		coordinates: [43.1885, 27.897],
		description:
			'Several deep potholes on the main road to Asparuhovo beach make driving unsafe, especially in rainy weather.',
		project: {
			id: 201,
			name: 'Road maintenance 2026 – Asparuhovo',
			status: 'In progress',
		},
		timeline: [
			{ status: 'New', date: '2026-03-18', note: 'Reported by citizen' },
			{
				status: 'Under review',
				date: '2026-03-19',
				note: 'Assigned to road maintenance department',
			},
			{
				status: 'In progress',
				date: '2026-03-20',
				note: 'Repair scheduled for this week',
			},
		],
	},
	{
		id: 3,
		title: 'Overflowing trash containers',
		category: 'Waste',
		district: 'Central Varna',
		status: 'Rejected',
		priority: 'High',
		votes: 20,
		address: 'Behind main bus station',
		coordinates: [43.2075, 27.908],
		description:
			'Trash containers behind the bus station are overflowing every evening.',
		rejectionReason:
			'This location is already covered by an existing report and is part of an urgent cleaning schedule.',
		timeline: [
			{ status: 'New', date: '2026-03-16', note: 'Reported by citizen' },
			{
				status: 'Under review',
				date: '2026-03-17',
				note: 'Checked by waste management department',
			},
			{
				status: 'Rejected',
				date: '2026-03-18',
				note: 'Duplicate of existing report',
			},
		],
	},
]

function getStatusColor(status: StatusStep) {
	switch (status) {
		case 'New':
			return '#2563eb'
		case 'Under review':
			return '#7c3aed'
		case 'In progress':
			return '#f97316'
		case 'Completed':
			return '#16a34a'
		case 'Rejected':
			return '#4b5563'
		default:
			return '#6b7280'
	}
}

export function IssueDetailsPage() {
	const params = useParams()
	const id = Number(params.id)

	const issue = mockIssueDetails.find(i => i.id === id)

	if (!issue) {
		return (
			<div style={{ maxWidth: 1200, margin: '0 auto' }}>
				<p>Issue not found.</p>
				<Link to='/issues'>Back to issues</Link>
			</div>
		)
	}

	return (
		<div style={{ maxWidth: 1200, margin: '0 auto' }}>
			<div
				style={{
					marginBottom: 16,
					fontSize: 14,
				}}
			>
				<Link to='/issues' style={{ color: '#2563eb' }}>
					← Back to issues
				</Link>
			</div>

			<h1
				style={{
					fontSize: 26,
					marginBottom: 8,
					color: '#022f66',
				}}
			>
				{issue.title}
			</h1>

			<div
				style={{
					display: 'flex',
					gap: 12,
					alignItems: 'center',
					marginBottom: 12,
					fontSize: 14,
					color: '#4b5563',
				}}
			>
				<span>Category: {issue.category}</span>
				<span>• District: {issue.district}</span>
				<span>• Priority: {issue.priority}</span>
				<span>• Votes: {issue.votes}</span>
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
						backgroundColor: getStatusColor(issue.status) + '20',
						color: getStatusColor(issue.status),
						fontWeight: 600,
						fontSize: 13,
					}}
				>
					Current status: {issue.status}
				</span>
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1.1fr 1fr',
					gap: 24,
					alignItems: 'flex-start',
				}}
			>
				{/* Левый блок: описание и таймлайн */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 16,
					}}
				>
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
								marginBottom: 8,
								color: '#022f66',
							}}
						>
							Description
						</h2>
						<p
							style={{
								margin: 0,
								fontSize: 14,
								color: '#4b5563',
							}}
						>
							{issue.description}
						</p>

						<p
							style={{
								marginTop: 12,
								fontSize: 13,
								color: '#6b7280',
							}}
						>
							Address: {issue.address}
						</p>
					</div>

					{/* Причина отклонения */}
					{issue.status === 'Rejected' && issue.rejectionReason && (
						<div
							style={{
								backgroundColor: '#f3f4f6',
								borderRadius: 16,
								padding: 16,
								border: '1px solid #e5e7eb',
							}}
						>
							<div
								style={{
									fontSize: 14,
									fontWeight: 600,
									marginBottom: 6,
									color: '#111827',
								}}
							>
								Reason for rejection
							</div>
							<p
								style={{
									margin: 0,
									fontSize: 13,
									color: '#4b5563',
								}}
							>
								{issue.rejectionReason}
							</p>
						</div>
					)}

					{/* Текущий проект */}
					{issue.project && (
						<div
							style={{
								backgroundColor: '#ffffff',
								borderRadius: 20,
								padding: 16,
								boxShadow: '0 12px 30px rgba(15,30,60,0.08)',
							}}
						>
							<div
								style={{
									fontSize: 14,
									fontWeight: 600,
									marginBottom: 4,
									color: '#022f66',
								}}
							>
								Part of project
							</div>
							<div
								style={{
									fontSize: 13,
									color: '#0369a1',
									marginBottom: 4,
								}}
							>
								{issue.project.name}
							</div>
							<div
								style={{
									fontSize: 12,
									color: '#6b7280',
								}}
							>
								Project status: {issue.project.status}
							</div>
						</div>
					)}

					{/* Таймлайн статусов */}
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
							Status history
						</h2>

						<ol
							style={{
								listStyle: 'none',
								padding: 0,
								margin: 0,
							}}
						>
							{issue.timeline.map((step, index) => {
								const color = getStatusColor(step.status)
								const isLast = index === issue.timeline.length - 1
								return (
									<li
										key={step.status + step.date}
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
												{step.status}
											</div>
											<div
												style={{
													fontSize: 12,
													color: '#6b7280',
													marginBottom: step.note ? 2 : 0,
												}}
											>
												{step.date}
											</div>
											{step.note && (
												<div
													style={{
														fontSize: 13,
														color: '#4b5563',
													}}
												>
													{step.note}
												</div>
											)}
										</div>
									</li>
								)
							})}
						</ol>
					</div>
				</div>

				{/* Правый блок: мини‑карта */}
				<div
					style={{
						borderRadius: 24,
						overflow: 'hidden',
						boxShadow: '0 18px 45px rgba(15,30,60,0.12)',
						backgroundColor: '#ffffff',
						height: 420,
					}}
				>
					<MapContainer
						center={issue.coordinates || VARNA_CENTER}
						zoom={14}
						style={{ height: '100%', width: '100%' }}
					>
						<TileLayer
							attribution='&copy; OpenStreetMap contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
						<Marker position={issue.coordinates} icon={defaultIcon} />
					</MapContainer>
				</div>
			</div>
		</div>
	)
}
