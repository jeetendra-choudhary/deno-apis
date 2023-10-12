```
import { Application } from './deps.ts'
import router from './routes/index.ts'

const app = new Application()
, port:number = 8000

app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener('listen', ({ secure, hostname, port }) => {
  const protocol = secure ? 'https://' : 'http://'
  , url = `${protocol}${hostname ?? 'localhost'}:${port}`
  console.log(`Listening on: ${port}`)
});

await app.listen({ port })
```