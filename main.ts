import { Application } from './deps.ts'
import router from './routes/index.ts'

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

// app.addEventListener('listen', ({ secure, hostname, port }) => {
//   console.log({ secure, hostname, port })
//   const protocol = secure ? 'https://' : 'http://'
//     , url = `${protocol}${hostname ?? 'localhost'}:${port}`
//   console.log({ url })
//   console.log(`Listening on: ${port}`)
// })

await app.listen({ port: 80 });