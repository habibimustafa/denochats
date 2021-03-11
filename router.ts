import {ServerRequest, Response} from "https://deno.land/std/http/server.ts"

export class Router {
    private readonly req;

    constructor(req: ServerRequest) {
        this.req = req;
    }

    public get(route: string, response: Response): void {
        if (this.req.method.toUpperCase() !== 'GET') return
        if (this.req.url !== route) return
        this.req.respond(Object.assign({status: 200}, response))
    }

    public getWith(route: string, callback: ((request: ServerRequest) => void)): void {
        if (this.req.method.toUpperCase() !== 'GET') return
        if (this.req.url !== route) return
        callback(this.req)
    }

    public post(route: string, response: Response): void {
        if (this.req.method.toUpperCase() !== 'POST') return
        if (this.req.url !== route) return
        this.req.respond(Object.assign({status: 200}, response))
    }
}