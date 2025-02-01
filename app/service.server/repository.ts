import { PrismaClient } from "@prisma/client"
import { PushSubscription } from "web-push"

const prisma = new PrismaClient()

class Repository {
	async createMessage(name: string, message: string) {
		await prisma.message.create({ data: { name, message } })
	}

	async getMessages() {
		return await prisma.message.findMany({
			orderBy: {
				createdAt: "asc",
			},
		})
	}

	async subscribe(subscription: PushSubscription) {
		await prisma.subscription.create({ data: { endpoint: subscription.endpoint, p256dh: subscription.keys.p256dh, auth: subscription.keys.auth } })
	}

	async getSubscriptions() {
		return await prisma.subscription.findMany()
	}
	async deleteSubscription(endpoint: string) {
		await prisma.subscription.delete({ where: { endpoint } })
	}
}

export const repository = new Repository()
