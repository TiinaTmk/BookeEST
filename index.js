const app = require('express')()
const port = 8080
const swaggerUI = require('swagger-ui-express');

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

app.get('/rooms', (req, res) => {res.send(["Single","Suite", "Double"])
});
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//võtab id massiivi asukoha järgi
// app.get('/rooms/:id', (req, res) => {
//     if(typeof rooms[req.params.id-1] === 'undefined'){
//         return res.status(404).send({error: "Room not found"})
//     }
//     res.send(rooms[req.params.id-1])
// });

//võtab id tegeliku väärtuse järgi (KASUTA SEDA, lisa error)
app.get('/rooms/:id', (req, res) => {const room = rooms.find(room => room.id == req.params.id);
res.send(room);
});

app.listen(port, () => {
    console.log(`Api up at: http://localhost:${port}`)
});
