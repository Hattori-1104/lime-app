import { createRequestHandler } from "@remix-run/express"
import * as build from "./build/server/index.js"
import express from "express"
import { WebSocketServer } from "ws"

const PORT = 3000
const WS_PORT = 3000

const wss = new WebSocketServer({
	port: WS_PORT,
	perMessageDeflate: false
})

const webSocketClients = new Set()

wss.on("connection", (ws) => {
	webSocketClients.add(ws)
	ws.send("connected")
})

wss.on("close", (ws) => {
	webSocketClients.delete(ws)
})

const app = express()

app.get("/update", (req, res) => {
	webSocketClients.forEach((client) => {
		client.send("updated")
	})
	res.send("updated")
})

app.use(express.static("build/client"))
app.all("*", createRequestHandler({ build }))

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
