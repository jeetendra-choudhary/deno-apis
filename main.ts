import { Application } from './deps.ts'
import router from './routes/index.ts'

const app = new Application()
  , port: number = 80

app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener('listen', ({ secure, hostname, port }) => {
  console.log({ secure, hostname, port })
  const protocol = secure ? 'https://' : 'http://'
    , url = `${protocol}${hostname ?? 'localhost'}:${port}`
  console.log(`Listening on: ${url}`)
})

await app.listen({ port: 80 });