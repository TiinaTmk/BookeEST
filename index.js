require("dotenv").config()
const mariadb = require("mariadb")
const express = require('express');
const cors = require('cors');
const app = express();
//const port = 8080
const port = process.env.APP_PORT
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    connectionLimit: 5

})
//const swaggerDocument = require('./docs/swagger.json');
app.use(cors())
const rooms =[
    {id:1, name:"Single with mega city view", price: 120.00, description:"Super cool room with city view, non-smoking" },
    {id:2, name:"Suite with bath", price: 900.00, description:"Super cool room with city view and huuge bath, non-smoking"  },
    {id:3, name:"Double smoking", price: 120.00, description:"Super cool room with no view at all, smoking allowed"  },
    {id:4, name:"Double with city view", price: 150.00, description:"Super cool room with city view, non-smoking"  },
    {id:5, name:"Suite with bath and city view", price: 1499.99, description:"Super cool room with city view, non-smoking, bath and shower" },
    {id:6, name:"Double with city view and bath", price: 250.01, description:"Super cool double room with city view, non-smoking"  }
]

app.use(express.json());

app.get("/rooms", async (req, res) => {
    let connection
    try{
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT * FROM rooms WHERE")
        console.log(rows)
        res.send(rows)
    }catch(error)
    {
        throw error
    } finally {
        if (connection) return connection.end()
    }
    }),




app.get('/rooms', (req, res) => {res.send(rooms)});

app.get('/rooms/:id', (req, res) => {
    if (typeof rooms[req.params.id-1] === 'undefined'){
    return res.status(404).send({error: "Room not found"})
    }
res.send(rooms[req.params.id-1]);
})

app.post('/rooms', (req, res) => {
    if(!req.params.name || !req.params.price || req.params.description){
        return res.status(400).send({error: "One or all parameters that are required are missing"})
    }
    let room = ({
        id: rooms.length + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    })
    rooms.push(room)
    
    res.status(201)
    .location(`${getBaseURL(req)}/rooms/${room.length}`)
    .send(room)
    });

app.delete('/rooms/:id', (req, res) => {
    if (typeof rooms[req.params.id-1] === 'undefined'){
        return res.status(404).send({error: "Room not found"})
    }
    rooms.splice(req.params.id-1, 1)
    res.status(204).send({error: "No Content"})
})

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Api up at: http://localhost:${port}`)});

function getBaseURL(req) {
    return req.connection && req.connection.encrypted? 
    'https:' : 'http'+ ` ://${req.headers.host}`;
}