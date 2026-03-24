import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Issue = {
	id: number
	title: string
	description: string
	category: string
	status: string
	priority: string
	address: string
	latitude: number
	longitude: number
	updatedAt: string
}

export function IssueDetailsPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [issue, setIssue] = useState<Issue | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function load() {
			try {
				setLoading(true)
				setError(null)
				const res = await fetch(`http://localhost:4000/issues/${id}`)
				if (!res.ok) throw new Error(`Request failed: ${res.status}`)
				const data = await res.json()
				setIssue(data)
			} catch (e) {
				setError((e as Error).message)
			} finally {
				setLoading(false)
			}
		}
		if (id) load()
	}, [id])

	if (loading) {
		return <p style={{ padding: 24 }}>Loading...</p>
	}

	if (error || !issue) {
		return (
			<div style={{ padding: 24 }}>
				<button
					onClick={() => navigate(-1)}
					style={{
						marginBottom: 16,
						padding: '6px 12px',
						borderRadius: 999,
						border: '1px solid #d1d5db',
						backgroundColor: '#fff',
						cursor: 'pointer',
					}}
				>
					← Back
				</button>
				<p>Issue not found.</p>
			</div>
		)
	}

	return (
		<div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 40 }}>
			<button
				onClick={() => navigate(-1)}
				style={{
					marginTop: 16,
					marginBottom: 16,
					padding: '6px 12px',
					borderRadius: 999,
					border: '1px solid #d1d5db',
					backgroundColor: '#fff',
					cursor: 'pointer',
				}}
			>
				← Back to issues
			</button>

			<h1 style={{ fontSize: 28, marginBottom: 8, color: '#022f66' }}>
				{issue.title}
			</h1>

			<p style={{ color: '#4b5563', marginBottom: 16 }}>{issue.description}</p>

			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 12,
					marginBottom: 16,
					fontSize: 14,
					color: '#374151',
				}}
			>
				<span>Category: {issue.category}</span>
				<span>Status: {issue.status}</span>
				<span>Priority: {issue.priority}</span>
				<span>
					Last updated: {new Date(issue.updatedAt).toLocaleDateString()}
				</span>
			</div>

			<div style={{ marginBottom: 8 }}>
				<strong>Address:</strong> {issue.address}
			</div>
			<div>
				<strong>Coordinates:</strong> {issue.latitude}, {issue.longitude}
			</div>
		</div>
	)
}
