import {WebSocket, isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts"
import { v4 } from "https://deno.land/std/uuid/mod.ts"

const users = new Map<string, WebSocket>()

const broadcast = (message: string, senderId?: string): void => {
    if (!message) return
    for (const user of users.values()) {
        user.send(senderId ? `[${senderId}]: ${message}` : message)
    }
}

export const chat = async (ws: WebSocket): Promise<void> => {
    const userId = v4.generate()

    users.set(userId, ws)
    broadcast(`> ${userId} was connected`)

    for await (const e of ws) {
        const message = typeof e === 'string' ? e : ''

        broadcast(message, userId)

        if (!message && isWebSocketCloseEvent(e)) {
            users.delete(userId)
            broadcast(`${userId} was leave chat`)
            break
        }
    }
}