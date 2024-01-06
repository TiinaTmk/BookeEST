require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT;
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
//const swaggerDocument = require('./docs/swagger.json');

app.use(cors())

// const rooms =[
//     {id:1, name:"Single with mega city view", price: 120.00, description:"Super cool room with city view, non-smoking" },
//     {id:2, name:"Suite with bath", price: 900.00, description:"Super cool room with city view and huuge bath, non-smoking"  },
//     {id:3, name:"Double smoking", price: 120.00, description:"Super cool room with no view at all, smoking allowed"  },
//     {id:4, name:"Double with city view", price: 150.00, description:"Super cool room with city view, non-smoking"  },
//     {id:5, name:"Suite with bath and city view", price: 1499.99, description:"Super cool room with city view, non-smoking, bath and shower" },
//     {id:6, name:"Double with city view and bath", price: 250.01, description:"Super cool double room with city view, non-smoking"  }
// ]

app.use(express.json());

require("./routes/app_routes")(app);

app.get("/errors", async (req, res) => {
    res.statusCode(404).sent({"error": "something went wrong"})
})

//ROOMS
//ROOMS-GET BY ID
app.get('/rooms/:id', (req, res) => {
    if (typeof rooms[req.params.id-1] === 'undefined'){
    return res.status(404).send({error: "Room not found"})
    }
res.send(rooms[req.params.id-1]);
})

//ROOMS-ADDNEW
app.post('/rooms', (req, res) => {
    if(!req.params.name || !req.params.price || req.params.description || req.params.size){
        return res.status(400).send({error: "One or all parameters that are required are missing"})
    }
    let room = ({
        id: rooms.length + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        size:req.body.size,
    })

    rooms.push(room)
    
    res.status(201)
    .location(`${getBaseURL(req)}/rooms/${room.length}`)
    .send(room)
    });

    //ROOMS-DELETE
    app.delete('/rooms/:id', (req, res) => {
        if (typeof rooms[req.params.id-1] === 'undefined'){
            return res.status(404).send({error: "Room not found"})
        }
        rooms.splice(req.params.id-1, 1)
        res.status(204).send({error: "No Content"})
    })


//CLIENTS

app.get('/clients/:id', (req, res) => {
    if (typeof clients[req.params.id-1] === 'undefined'){
    return res.status(404).send({error: "Client not found"})
    }
res.send(clients[req.params.id-1]);
})


app.delete('/clients/:id', (req, res) => {
    if (typeof clients[req.params.id-1] === 'undefined'){
        return res.status(404).send({error: "Client not found"})
    }
    clients.splice(req.params.id-1, 1)
    res.status(204).send({error: "No Content"})
})

app.post('/clients', (req, res) => {
    if(!req.params.name || !req.params.birthdate || req.params.telephone || !req.params.email || !req.params.address){
        return res.status(400).send({error: "One or all parameters that are required are missing"})
    }
    let client = ({
        id: clients.length + 1,
        name: req.body.name,
        birthdate: req.body.birthdate,
        telephone: req.body.telephone,
        email: req.body.email,
        address: req.body.address,
    })

    clients.push(client)
    
    res.status(201)
    .location(`${getBaseURL(req)}/clients/${clients.length}`)
    .send(client)
    });


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, async () => {
    console.log(`Api up at: http://localhost:${port}`)});

function getBaseURL(req) {
    return req.connection && req.connection.encrypted ? 
    'https:' : 'http'+ `://${req.headers.host}`;
}

//TODO ADD Bookings