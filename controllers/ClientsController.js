const {db} = require("../db")
const Client = db.Clients

exports.getAll = async(req,res) => {
    const clients = await Client.findAll({attributes:["Id","Name","BirthDate", "Telephone", "Email","Address"]})
    res.send(clients)
}

exports.getById = async(req, res) => {
    const clients = await Client.findByPk(req.params.id)
    res.send(clients)
}

exports.createNew = async(req, res) => {
    let client
    try {
        client = await Client.create(req.body)
    } catch (error) {
       if (error instanceof db.Sequelize.ValidationError) {
        console.log(error)
        res.status(400).send({"error": error.errors.map((item)=>item.message)})
    } else {
        console.log("Client created: ", error)
        res.status(500).send({error:"something has gone wrong"})
        }
        return
    }
    res
    .status(201)
    .location(`${getBaseUrl()}/clients/${client.id}`)
    .json(client);
    console.log(client)
}

exports.deleteById = async (req, res) => {
    let result
    try {
        result = await Client.destroy({where: {id: req.params.id}})
    } catch (error) {
        console.log("Client deleted: ", error)
        res.status(500).send({error:"something has gone wrong"})
        return
       
    } 
    if( result.status === 0){
        res.status(404).send({error:"Client not found"})
        return
    }
    
    res
    .status(204)
    }

    exports.updateById = async (req, res) => {
        let result
        delete req.body.id
        try {
            result = await Client.update(req.body,{where: {id: req.params.id}})
        } catch (error) {
            console.log("Clients update: ", error)
            res.status(500).send({error:"something has gone wrong"})
            return
           
        } 
        if( result.status === 0){
            res.status(404).send({error:"Client not found"})
            return
        }
        const client = await Client.findByPk(req.params.id)
        res.status(200)
        .location(`${getBaseUrl(req)}/clients/${client.id}`)
        .json(client)
    }


getBaseUrl = (request) => { 
    return (
        (request.connection && request.connection.encrypted ? "https" : "http") + 
`://${request.headers.host}`
    )
}