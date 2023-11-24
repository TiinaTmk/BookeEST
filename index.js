const app = require('express')()
const port = 8080
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json')



app.get('/rooms', (req, res) => {res.send(["Single", "Suite", "Double"])
})


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.listen(port, () => {
  console.log(`Api up at: Http://localhost:${port}`)
})

