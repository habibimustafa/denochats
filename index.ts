import {listenAndServe, ServerRequest} from "https://deno.land/std/http/server.ts"
import {Router} from "./router.ts";

listenAndServe({ port: 3000 }, async (req: ServerRequest) => {
    const router = new Router(req);
    router.get('/', {
        status: 200,
        headers: new Headers({ 'content-type': 'text/html' }),
        body: await Deno.open('./public/index.html')
    })
})

console.log('Server running on localhost:3000')