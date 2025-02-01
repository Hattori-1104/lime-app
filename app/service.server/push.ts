import webpush from "web-push"
import { repository } from "~/service.server/repository"

export const push = async (message: string, name: string) => {
	const vapidKeys = {
		publicKey: process.env.VAPID_PUBLIC_KEY || "",
		privateKey: process.env.VAPID_PRIVATE_KEY || "",
	}

	const pushSubscription = (await repository.getSubscriptions()).map((subscription) => ({
		endpoint: subscription.endpoint,
		keys: {
			p256dh: subscription.p256dh,
			auth: subscription.auth,
		},
	}))

	webpush.setVapidDetails("mailto:hattori.index.js@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey)

	for (const subscription of pushSubscription) {
		try {
			await webpush.sendNotification(subscription, `${name} - ${message}`)
		} catch {
			await repository.deleteSubscription(subscription.endpoint)
		}
	}
}
