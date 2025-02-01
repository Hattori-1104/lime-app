import { ActionFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { repository } from "~/service.server/repository"

export const action = async ({ request }: ActionFunctionArgs) => {
	const subscription = await request.json()
	await repository.subscribe(subscription)
	return json({})
}
