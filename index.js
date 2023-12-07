const express = require('express');
const app = express();
const port = 8080
const swaggerUI = require('swagger-ui-express');

//muuda yaml fail vastavusse apicurioga
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

//const swaggerDocument = require('./docs/swagger.json');


const rooms =[
    {id:1, name:"Single with mega city view", price: 120.00, decription:"Super cool room with city view, non-smoking" },
    {id:2, name:"Suite with bath", price: 900.00, decription:"Super cool room with city view and huuge bath, non-smoking"  },
    {id:3, name:"Double smoking", price: 120.00, decription:"Super cool room with no view at all, smoking allowed"  },
    {id:4, name:"Double with city view", price: 150.00, decription:"Super cool room with city view, non-smoking"  },
    {id:5, name:"Suite with bath and city view", price: 1499.99, decription:"Super cool room with city view, non-smoking, bath and shower" },
    {id:6, name:"Double with city view and bath", price: 250.01, decription:"Super cool double room with city view, non-smoking"  }
]

app.use(express.json());

app.get('/rooms', (req, res) => {res.send(rooms)});
//võtab id massiivi asukoha järgi
// app.get('/rooms/:id', (req, res) => {
//     if(typeof rooms[req.params.id-1] === 'undefined'){
//         return res.status(404).send({error: "Room not found"})
//     }
//     res.send(rooms[req.params.id-1])
// });

app.get('/rooms/:id', (req, res) => {
    if (typeof rooms[req.params.id-1] === 'undefined'){
    return res.status(404).send({error: "Room not found"})
    }
res.send(rooms[req.params.id-1]);
})

app.post('/rooms', (req, res) => {
    if(!req.params.name || !req.params.price || req.params.decription){
        return res.status(400).send({error: "One or all parameters that are required are missing"})
    }
    let room = ({
        id: rooms.length + 1,
        name: req.body.name,
        price: req.body.price,
        decription: req.body.decription
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