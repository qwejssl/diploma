// src/pages/NewReportPage.tsx
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

const defaultIcon = new L.Icon({
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	iconRetinaUrl:
		'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
})

const VARNA_COORDS: [number, number] = [43.2141, 27.9147]

type LatLng = [number, number]

function LocationPicker({
	position,
	onChange,
}: {
	position: LatLng | null
	onChange: (coords: LatLng) => void
}) {
	useMapEvents({
		click(e) {
			onChange([e.latlng.lat, e.latlng.lng])
		},
	})

	return position ? <Marker position={position} icon={defaultIcon} /> : null
}

export function NewReportPage() {
	const [category, setCategory] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium')
	const [address, setAddress] = useState('')
	const [position, setPosition] = useState<LatLng | null>(null)

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		// пока просто логируем — позже свяжем с backend
		console.log({
			category,
			title,
			description,
			priority,
			address,
			position,
		})

		alert('Report submitted (mock). Later this will send data to backend.')
	}

	return (
		<div style={{ maxWidth: 1200, margin: '0 auto' }}>
			<h1
				style={{
					fontSize: 28,
					marginBottom: 8,
					color: '#022f66',
				}}
			>
				Report a problem in Varna
			</h1>

			<p
				style={{
					marginBottom: 24,
					color: '#4b5563',
				}}
			>
				Describe the issue and choose the exact location on the map. This form
				will later check for similar reports and send your data to the city.
			</p>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1.1fr 1fr',
					gap: 24,
					alignItems: 'flex-start',
				}}
			>
				{/* Форма */}
				<form
					onSubmit={handleSubmit}
					style={{
						backgroundColor: '#ffffff',
						borderRadius: 24,
						padding: 24,
						boxShadow: '0 18px 45px rgba(15, 30, 60, 0.12)',
						display: 'flex',
						flexDirection: 'column',
						gap: 16,
					}}
				>
					<div>
						<label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>
							Category
						</label>
						<select
							required
							value={category}
							onChange={e => setCategory(e.target.value)}
							style={{
								width: '100%',
								padding: '8px 12px',
								borderRadius: 12,
								border: '1px solid #d1d5db',
							}}
						>
							<option value=''>Select category</option>
							<option value='Roads'>Roads</option>
							<option value='Lighting'>Lighting</option>
							<option value='Water'>Water</option>
							<option value='Parks'>Parks & playgrounds</option>
							<option value='Waste'>Waste</option>
						</select>
					</div>

					<div>
						<label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>
							Address
						</label>
						<input
							required
							type='text'
							value={address}
							onChange={e => setAddress(e.target.value)}
							placeholder='Street, number, landmark...'
							style={{
								width: '100%',
								padding: '8px 12px',
								borderRadius: 12,
								border: '1px solid #d1d5db',
							}}
						/>
					</div>

					<div>
						<label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>
							Title
						</label>
						<input
							required
							type='text'
							value={title}
							onChange={e => setTitle(e.target.value)}
							placeholder='Short summary of the issue'
							style={{
								width: '100%',
								padding: '8px 12px',
								borderRadius: 12,
								border: '1px solid #d1d5db',
							}}
						/>
					</div>

					<div>
						<label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>
							Description
						</label>
						<textarea
							required
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder='Explain what is wrong and how it affects the area.'
							rows={5}
							style={{
								width: '100%',
								padding: '8px 12px',
								borderRadius: 12,
								border: '1px solid #d1d5db',
								resize: 'vertical',
							}}
						/>
					</div>

					<div>
						<label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>
							Priority
						</label>
						<select
							value={priority}
							onChange={e =>
								setPriority(e.target.value as 'Low' | 'Medium' | 'High')
							}
							style={{
								width: '100%',
								padding: '8px 12px',
								borderRadius: 12,
								border: '1px solid #d1d5db',
							}}
						>
							<option value='Low'>Low</option>
							<option value='Medium'>Medium</option>
							<option value='High'>High</option>
						</select>
					</div>

					{/* Фото добавим позже, когда подойдём к загрузке файлов */}

					<button
						type='submit'
						style={{
							marginTop: 8,
							padding: '12px 24px',
							borderRadius: 999,
							border: 'none',
							background: 'linear-gradient(135deg, #00c6a7 0%, #00a3ff 100%)',
							color: '#ffffff',
							fontWeight: 600,
							fontSize: 15,
							cursor: 'pointer',
							alignSelf: 'flex-start',
						}}
					>
						Submit report
					</button>
				</form>

				{/* Мини‑карта для выбора точки */}
				<div
					style={{
						height: 420,
						borderRadius: 24,
						overflow: 'hidden',
						boxShadow: '0 18px 45px rgba(15, 30, 60, 0.12)',
						backgroundColor: '#ffffff',
					}}
				>
					<MapContainer
						center={VARNA_COORDS}
						zoom={13}
						style={{ height: '100%', width: '100%' }}
					>
						<TileLayer
							attribution='&copy; OpenStreetMap contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
						<LocationPicker position={position} onChange={setPosition} />
					</MapContainer>
				</div>
			</div>
		</div>
	)
}
