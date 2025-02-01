/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

const vapidPublicKey = "BGM2UTVnoan1wstB9X--HyUVlM_CMI1st66G6a1dyyFrhAfxyg7TiPU6qW09Zqc9OYo8f7ryTXy4tA9B6M4CJ3A"

import { RemixBrowser } from "@remix-run/react"
import { StrictMode, startTransition } from "react"
import { hydrateRoot } from "react-dom/client"
import { urlBase64ToUint8Array } from "~/utils/convert"

if ("serviceWorker" in navigator && "PushManager" in window) {
	navigator.serviceWorker.register("/sw.js").then((registration) => {
		registration.pushManager.getSubscription().then((subscription) => {
			if (subscription === null) {
				const publicKey = urlBase64ToUint8Array(vapidPublicKey)
				registration.pushManager
					.subscribe({
						userVisibleOnly: true,
						applicationServerKey: publicKey,
					})
					.then((subscription) => fetch("/api/subscribe", { method: "POST", body: JSON.stringify(subscription) }))
			} else {
				console.log("Subscription already exists")
			}
		})
	})
}

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<RemixBrowser />
		</StrictMode>,
	)
})
