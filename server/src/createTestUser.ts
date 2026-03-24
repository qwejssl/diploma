import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const user = await prisma.user.create({
		data: {
			email: 'test@example.com',
			passwordHash: 'test-hash',
			fullName: 'Test User',
			role: 'RESIDENT',
		},
	})

	console.log('Created user:', user)
}

main()
	.catch(e => {
		console.error(e)
		// process.exit(1)  // <-- просто убираем эту строку
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
