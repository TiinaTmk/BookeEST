const {db} = require("../db")
const Room = db.Rooms

exports.getAll = async(req,res) => {
    const rooms = await Room.findAll({attributes:["Id","Name","Price","Description","Size","Images"]})
    res.send(rooms)
}

exports.getAvailable = async(req,res) => {
    const innerQueryResult = await db.sequelize.query(
        "SELECT RoomID FROM Bookings WHERE StartTime >= CURDATE() and Status not in ('Cancelled')",
        { type: db.sequelize.QueryTypes.SELECT }
      );
      
      // Extract RoomID values from the innerQueryResult array
      const roomIds = innerQueryResult.map(result => result.RoomID);
      
      // Check if there are any RoomIDs before proceeding with the main query
      if (roomIds.length > 0) {
        const availableRooms = await db.sequelize.query(
          `SELECT * FROM Rooms WHERE Id NOT IN (${roomIds.join(',')})`,
          { type: db.sequelize.QueryTypes.SELECT }
        );
        res.send(availableRooms)

      } else {
        console.log("No available rooms based on the inner query criteria.");
      }
}

exports.getById = async(req, res) => {
    const rooms = await Room.findByPk(req.params.id)
    res.send(rooms)
}

exports.createNew = async(req, res) => {
    let room 
    try {
        room = await Room.create(req.body)
    } catch (error) {
       if (error instanceof db.Sequelize.ValidationError) {
        console.log(error)
        res.status(400).send({"error": error.errors.map((item)=>item.message)})
    } else {
        console.log("Room created: ", error)
        res.status(500).send({error:"something has gone wrong"})
        }
        return
    }
    res
    .status(201)
    .location(`${getBaseUrl()}/rooms/${room.id}`)
    .json(room);
    console.log(room)
}

exports.deleteById = async (req, res) => {
    let result
    try {
        result = await Room.destroy({where: {id: req.params.id}})
    } catch (error) {
        console.log("Room deleted: ", error)
        res.status(500).send({error:"something has gone wrong"})
        return
       
    } 
    if( result.status === 0){
        res.status(404).send({error:"Room not found"})
        return
    }
    
    res
    .status(204)
    }

    exports.updateById = async (req, res) => {
        let result
        delete req.body.id
        try {
            result = await Room.update(req.body,{where: {id: req.params.id}})
        } catch (error) {
            console.log("Rooms update: ", error)
            res.status(500).send({error:"something has gone wrong"})
            return
           
        } 
        if( result.status === 0){
            res.status(404).send({error:"Room not found"})
            return
        }
        const room = await Room.findByPk(req.params.id)
        res.status(200)
        .location(`${getBaseUrl(req)}/rooms/${room.id}`)
        .json(room)
    }


getBaseUrl = (request) => { 
    return (
        (request.connection && request.connection.encrypted ? "https" : "http") + 
`://${request.headers.host}`
    )
}