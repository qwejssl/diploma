import { PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/health', async (_req, res) => {
	try {
		await prisma.$queryRaw`SELECT 1`
		res.json({ status: 'ok', db: 'connected' })
	} catch (e) {
		res.status(500).json({ status: 'error', error: String(e) })
	}
})

app.get('/issues', async (_req, res) => {
	try {
		const issues = await prisma.issue.findMany()
		res.json(issues)
	} catch (e) {
		res.status(500).json({ error: String(e) })
	}
})

const PORT = 4000

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
