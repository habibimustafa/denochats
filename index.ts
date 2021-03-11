import {listenAndServe} from "https://deno.land/std/http/server.ts"

listenAndServe({ port: 3000 }, (req) => {
    req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "application/json"
        }),
        body: JSON.stringify({
            hello: 'world'
        })
    })
})