const app = require('express')()
const port = 8080
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json')


const rooms = [
  
  {id: 1, name: "Suite", price: 250, description: "This is a suite, our best room in the hotel"},
  {id: 2, name: "Double", price: 180, description: "This is a double room, which can fit up tp 2 people"},
  {id: 3, name: "Single", price: 140, description: "This is a single room, which can fit up tp 1 person"},
  {id: 4, name: "Tripple", price: 180, description: "This is a tripple room, which can fit up tp 3 people"},
  {id: 5, name: "Junior Suite", price: 230, description: "This is a Junior Suite, our second best room in the hotel"},
  {id: 6, name: "Family Room", price: 200, description: "This is a family room, which can fit up tp 4 people and is suitable for a family"},

]

app.get('/rooms', (req, res) => {res.send(rooms)
})
app.get('/rooms/:id', (req, res) => {res.send(rooms[req.params.id -1])
});


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.listen(port, () => {
  console.log(`Api up at: Http://localhost:${port}`)
})

