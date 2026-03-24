import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'

const app = express()
const prisma = new PrismaClient()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.get('/health', async (_req, res) => {
	try {
		await prisma.$queryRaw`SELECT 1`
		res.json({ status: 'ok', db: 'connected' })
	} catch (e) {
		res.status(500).json({ status: 'error', error: String(e) })
	}
})
// список всех заявок
app.get('/issues', async (_req, res) => {
	try {
		const issues = await prisma.issue.findMany()
		res.json(issues)
	} catch (e) {
		res.status(500).json({ error: String(e) })
	}
})

// заявка по id (добавляли позже)
app.get('/issues/:id', async (req, res) => {
	try {
		const id = Number(req.params.id)
		const issue = await prisma.issue.findUnique({ where: { id } })
		if (!issue) {
			return res.status(404).json({ error: 'Issue not found' })
		}
		res.json(issue)
	} catch (e) {
		res.status(500).json({ error: String(e) })
	}
})

app.post('/issues', async (req, res) => {
	try {
		const {
			title,
			description,
			category,
			address,
			latitude,
			longitude,
			// статус и приоритет можно не передавать, будут дефолтные
			status,
			priority,
			authorId,
		} = req.body

		if (
			!title ||
			!description ||
			!category ||
			!address ||
			latitude == null ||
			longitude == null ||
			authorId == null
		) {
			return res.status(400).json({
				error:
					'title, description, category, address, latitude, longitude and authorId are required',
			})
		}

		const issue = await prisma.issue.create({
			data: {
				title,
				description,
				category, // IssueCategory enum: ROADS, LIGHTING, ...
				address,
				latitude,
				longitude,
				authorId,
				status: status ?? 'NEW', // IssueStatus
				priority: priority ?? 'MEDIUM', // Priority
			},
		})

		res.status(201).json(issue)
	} catch (e) {
		res.status(500).json({ error: String(e) })
	}
})

app.get('/stats/issues', async (_req, res) => {
	try {
		const now = new Date()
		const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

		const totalThisMonth = await prisma.issue.count({
			where: { createdAt: { gte: startOfMonth } },
		})

		const inProgress = await prisma.issue.count({
			where: { status: 'IN_PROGRESS' },
		})

		const completed = await prisma.issue.count({
			where: { status: 'COMPLETED' },
		})

		res.json({
			totalThisMonth,
			inProgress,
			completed,
		})
	} catch (e) {
		res.status(500).json({ error: String(e) })
	}
})

const PORT = 4000

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
