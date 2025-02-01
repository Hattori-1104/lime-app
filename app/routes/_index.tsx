import { ActionFunctionArgs } from "@remix-run/node"
import { Form, redirect, useLoaderData } from "@remix-run/react"
import { Send } from "lucide-react"
import { useState } from "react"
import { Message } from "~/components/message"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { ScrollArea } from "~/components/ui/scroll-area"
import { push } from "~/service.server/push"
import { repository } from "~/service.server/repository"

export const loader = async () => {
	const messages = await repository.getMessages()
	return { messages }
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const name = String(formData.get("name"))
	const message = String(formData.get("message"))
	if (name === "" || message === "") {
		return {}
	}
	await repository.createMessage(name, message)
	push(message, name)
	return redirect("/")
}

export default function Index() {
	const [name, setName] = useState("")
	const [message, setMessage] = useState("")
	const { messages } = useLoaderData<typeof loader>()
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4 max-w-96 p-4 mx-auto">
			<ScrollArea className="w-full grow border rounded-md">
				<div className="flex flex-col items-center justify-end h-full">
					{messages.map((message) => (
						<Message key={message.id} name={message.name} message={message.message} createdAt={message.createdAt} />
					))}
				</div>
			</ScrollArea>
			<Form method="post" className="flex flex-col items-center justify-center gap-4 w-full">
				<div className="flex flex-row items-center justify-center gap-4 w-full">
					<Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="名前を入力" className="w-full" name="name" />
				</div>
				<div className="flex flex-row items-center justify-center gap-4 w-full">
					<Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="メッセージを入力" className="grow" name="message" />
					<Button type="submit">
						<Send />
					</Button>
				</div>
			</Form>
		</div>
	)
}
