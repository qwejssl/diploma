import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from './layouts/AdminLayout'
import { PublicLayout } from './layouts/PublicLayout'
import { AboutPage } from './pages/AboutPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { CreateIssuePage } from './pages/CreateIssuePage'
import { HomePage } from './pages/HomePage'
import { IssueDetailsPage } from './pages/IssueDetailsPage'
import { IssuesPage } from './pages/IssuesPage'
import { MapPage } from './pages/MapPage'
import { MyReportsPage } from './pages/MyReportsPage'
import { NewReportPage } from './pages/NewReportPage'
import { ProjectDetailsPage } from './pages/ProjectDetailsPage'
import { ProjectsPage } from './pages/ProjectsPage'

function App() {
	return (
		<Routes>
			<Route element={<PublicLayout />}>
				<Route path='/' element={<HomePage />} />
				<Route path='/map' element={<MapPage />} />
				<Route path='/issues' element={<IssuesPage />} />
				<Route path='/issues/:id' element={<IssueDetailsPage />} />
				<Route path='/issues' element={<IssuesPage />} />
				<Route path='/issues/new' element={<CreateIssuePage />} />
				<Route path='/issues/:id' element={<IssueDetailsPage />} />
				<Route path='/issues/new' element={<CreateIssuePage />} />
				<Route path='/projects' element={<ProjectsPage />} />
				<Route path='/projects/:id' element={<ProjectDetailsPage />} />
				<Route path='/my-reports' element={<MyReportsPage />} />
				<Route path='/report/new' element={<NewReportPage />} />
				<Route path='/about' element={<AboutPage />} />
			</Route>

			<Route element={<AdminLayout />}>
				<Route path='/admin' element={<AdminDashboardPage />} />
			</Route>
		</Routes>
	)
}

export default App
