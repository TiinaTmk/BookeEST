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
        size:req.body.images,
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

    //Bookings

    app.get('/bookings/:id', (req, res) => {
        if (typeof bookings[req.params.id-1] === 'undefined'){
        return res.status(404).send({error: "Boking not found"})
        }
    res.send(bookings[req.params.id-1]);
    })
    
    
    app.delete('/bookings/:id', (req, res) => {
        if (typeof bookings[req.params.id-1] === 'undefined'){
            return res.status(404).send({error: "booking not found"})
        }
        bookings.splice(req.params.id-1, 1)
        res.status(204).send({error: "No Content"})
    })
    
    app.post('/bookings', (req, res) => {
        if(!req.params.RoomID || !req.params.ClientID || req.params.StartTime || !req.params.EndTime || !req.params.Status || !req.params.DateCancelled ){
            return res.status(400).send({error: "One or all parameters that are required are missing"})
        }
        let booking = ({
            id: bookings.length + 1,
            RoomID: req.body.RoomID,
            ClientID: req.body.ClientID,
            StartTime: req.body.StartTime,
            EndTime: req.body.EndTime,
            Status: req.body.Status,
            DateCancelled: req.body.DateCancelled
        })
    
        bookings.push(booking)
        
        res.status(201)
        .location(`${getBaseURL(req)}/bookings/${bookings.length}`)
        .send(booking)
        });


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, async () => {
    console.log(`Api up at: http://localhost:${port}`)});

function getBaseURL(req) {
    return req.connection && req.connection.encrypted ? 
    'https:' : 'http'+ `://${req.headers.host}`;
}