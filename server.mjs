import F from 'fastify'
import staticF from '@fastify/static'
import cors from '@fastify/cors'
import path from 'path'
import nextGeneration from './app.mjs'

const __dirname = import.meta.dirname;

const server = F({ logger: false })
server.register(cors, {
    origin: '*',
})

server.register(staticF, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
});

server.get("/", async (req, repl) => {
    return repl.sendFile('index.html')
})

server.post("/", async (req, reply) => {
    let data = JSON.parse(req.body)
    data.gen++;
    data.pole = nextGeneration(data.sizeX, data.sizeY, data.pole)
    return JSON.stringify(data)
})

let s = server.listen({ port: 5555 }, (err, address) => {
    if (err) throw err
    console.log(`Работает по адресу ${address}`)
})
