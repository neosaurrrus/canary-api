import { Elysia, t} from "elysia";
import {PrismaClient} from "@prisma/client"

const setup = (app: Elysia) => app.decorate('db', new PrismaClient())

const app = new Elysia()
.use(setup)

.get('/', ({query, db}) => db.company.findMany())
.group('/search', (app) => app.guard({
  query: t.Object({
    q: t.String()
  }) 
}, (app) => app
  .get('/url', ({query}) => `query: ${query.q}`)
  .get('/company', ({query}) => `query: ${query.q}` )
))
.get('/company/:id', ({params}) => `id: ${params.id}`)
.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
