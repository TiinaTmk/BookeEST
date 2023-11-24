const app = require('express')()
const port = 8888

app.listen(port, () => {
  console.log(`Api up at: Http://localhost:${port}`)
})