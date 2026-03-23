// src/pages/MapPage.tsx
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

// фикс для иконок в Vite
const defaultIcon = new L.Icon({
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	iconRetinaUrl:
		'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = defaultIcon

const VARNA_COORDS: [number, number] = [43.2141, 27.9147]

export function MapPage() {
	return (
		<div
			style={{
				maxWidth: 1200,
				margin: '0 auto',
			}}
		>
			<h1
				style={{
					fontSize: 28,
					marginBottom: 16,
					color: '#022f66',
				}}
			>
				Map of issues in Varna
			</h1>

			<p
				style={{
					marginBottom: 16,
					color: '#4b5563',
				}}
			>
				Explore reported issues across Varna. This map will later show real
				reports from residents.
			</p>

			<div
				style={{
					height: '500px',
					borderRadius: 24,
					overflow: 'hidden',
					boxShadow: '0 22px 60px rgba(15, 30, 60, 0.2)',
				}}
			>
				<MapContainer
					center={VARNA_COORDS}
					zoom={13}
					style={{ height: '100%', width: '100%' }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>

					{/* Пример одного маркера — позже заменим реальными данными */}
					<Marker position={VARNA_COORDS}>
						<Popup>Example issue location in Varna.</Popup>
					</Marker>
				</MapContainer>
			</div>
		</div>
	)
}
