// src/pages/CreateIssuePage.tsx
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type IssueFormData = {
	title: string
	description: string
	category: 'ROADS' | 'LIGHTING' | 'WATER' | 'PARKS' | 'WASTE' | 'OTHER'
	address: string
	latitude: string
	longitude: string
}

export function CreateIssuePage() {
	const navigate = useNavigate()
	const [form, setForm] = useState<IssueFormData>({
		title: '',
		description: '',
		category: 'ROADS',
		address: '',
		latitude: '',
		longitude: '',
	})
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()
		setSubmitting(true)
		setError(null)

		try {
			const res = await fetch('http://localhost:4000/issues', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: form.title,
					description: form.description,
					category: form.category,
					address: form.address,
					latitude: Number(form.latitude),
					longitude: Number(form.longitude),
					authorId: 1, // временно: тестовый пользователь
				}),
			})

			if (!res.ok) {
				const data = await res.json().catch(() => null)
				throw new Error(data?.error ?? `Request failed: ${res.status}`)
			}

			// после успешного создания возвращаемся к списку
			navigate('/issues')
		} catch (err) {
			setError((err as Error).message)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div style={{ maxWidth: 800, margin: '0 auto' }}>
			<h1
				style={{
					fontSize: 28,
					marginBottom: 8,
					color: '#022f66',
				}}
			>
				Create issue
			</h1>

			<p style={{ marginBottom: 24, color: '#4b5563' }}>
				Describe the problem in Varna so that the municipality can address it.
			</p>

			{error && <p style={{ color: 'red', marginBottom: 16 }}>{error}</p>}

			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 16,
					backgroundColor: '#ffffff',
					borderRadius: 24,
					padding: 24,
					boxShadow: '0 18px 45px rgba(15,30,60,0.08)',
				}}
			>
				<div>
					<label style={{ display: 'block', marginBottom: 4 }}>Title</label>
					<input
						type='text'
						value={form.title}
						onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
						required
						style={{
							width: '100%',
							padding: '8px 12px',
							borderRadius: 999,
							border: '1px solid #d1d5db',
						}}
					/>
				</div>

				<div>
					<label style={{ display: 'block', marginBottom: 4 }}>
						Description
					</label>
					<textarea
						value={form.description}
						onChange={e =>
							setForm(f => ({ ...f, description: e.target.value }))
						}
						required
						rows={4}
						style={{
							width: '100%',
							padding: '8px 12px',
							borderRadius: 16,
							border: '1px solid #d1d5db',
							resize: 'vertical',
						}}
					/>
				</div>

				<div>
					<label style={{ display: 'block', marginBottom: 4 }}>Category</label>
					<select
						value={form.category}
						onChange={e =>
							setForm(f => ({
								...f,
								category: e.target.value as IssueFormData['category'],
							}))
						}
						style={{
							width: '100%',
							padding: '8px 12px',
							borderRadius: 999,
							border: '1px solid #d1d5db',
						}}
					>
						<option value='ROADS'>Roads</option>
						<option value='LIGHTING'>Lighting</option>
						<option value='WATER'>Water</option>
						<option value='PARKS'>Parks</option>
						<option value='WASTE'>Waste</option>
						<option value='OTHER'>Other</option>
					</select>
				</div>

				<div>
					<label style={{ display: 'block', marginBottom: 4 }}>Address</label>
					<input
						type='text'
						value={form.address}
						onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
						required
						style={{
							width: '100%',
							padding: '8px 12px',
							borderRadius: 999,
							border: '1px solid #d1d5db',
						}}
					/>
				</div>

				<div style={{ display: 'flex', gap: 16 }}>
					<div style={{ flex: 1 }}>
						<label style={{ display: 'block', marginBottom: 4 }}>
							Latitude
						</label>
						<input
							type='number'
							step='0.0001'
							value={form.latitude}
							onChange={e => setForm(f => ({ ...f, latitude: e.target.value }))}
							required
							style={{
								width: '100%',
								padding: '8px 12px',
								borderRadius: 999,
								border: '1px solid #d1d5db',
							}}
						/>
					</div>
					<div style={{ flex: 1 }}>
						<label style={{ display: 'block', marginBottom: 4 }}>
							Longitude
						</label>
						<input
							type='number'
							step='0.0001'
							value={form.longitude}
							onChange={e =>
								setForm(f => ({ ...f, longitude: e.target.value }))
							}
							required
							style={{
								width: '100%',
								padding: '8px 12px',
								borderRadius: 999,
								border: '1px solid #d1d5db',
							}}
						/>
					</div>
				</div>

				<div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
					<button
						type='submit'
						disabled={submitting}
						style={{
							padding: '10px 20px',
							borderRadius: 999,
							border: 'none',
							background: submitting
								? '#9ca3af'
								: 'linear-gradient(90deg,#06b6d4,#2563eb)',
							color: '#ffffff',
							fontWeight: 600,
							cursor: submitting ? 'default' : 'pointer',
						}}
					>
						{submitting ? 'Creating...' : 'Create issue'}
					</button>

					<button
						type='button'
						onClick={() => navigate('/issues')}
						style={{
							padding: '10px 20px',
							borderRadius: 999,
							border: '1px solid #d1d5db',
							backgroundColor: '#ffffff',
							color: '#374151',
							fontWeight: 500,
							cursor: 'pointer',
						}}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}
