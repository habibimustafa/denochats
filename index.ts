import {listenAndServe, ServerRequest} from "https://deno.land/std/http/server.ts"
import {acceptable, acceptWebSocket} from "https://deno.land/std/ws/mod.ts"
import {Router} from "./router.ts"

listenAndServe({ port: 3000 }, async (req: ServerRequest) => {
    const router = new Router(req);
    router.get('/', {
        headers: new Headers({ 'content-type': 'text/html' }),
        body: await Deno.open('./public/index.html')
    })

    router.getWith('/ws', (request) => {
        if (acceptable(request)) {
            acceptWebSocket({
                conn: request.conn,
                bufReader: request.r,
                bufWriter: request.w,
                headers: request.headers
            })
        }
    })
})

console.log('Server running on localhost:3000')