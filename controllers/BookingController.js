const {db} = require("../db")
const Booking = db.Bookings

exports.getAll = async(req,res) => {
    const bookings = await Booking.findAll({attributes:["Id","RoomID","ClientID","StartTime","EndTime","Status","DateCancelled"]})
    res.send(bookings)
}

exports.getById = async(req, res) => {
    const bookings = await Booking.findByPk(req.params.id)
    res.send(bookings)
}

exports.createNew = async(req, res) => {
    let booking 
    try {
        booking = await Booking.create(req.body)
    } catch (error) {
       if (error instanceof db.Sequelize.ValidationError) {
        console.log(error)
        res.status(400).send({"error": error.errors.map((item)=>item.message)})
    } else {
        console.log("Booking created: ", error)
        res.status(500).send({error:"something has gone wrong"})
        }
        return
    }
    res
    .status(201)
    .location(`${getBaseUrl()}/bookings/${booking.id}`)
    .json(booking);
    console.log(booking);	
}

exports.deleteById = async (req, res) => {
    let result
    try {
        result = await Booking.destroy({where: {id: req.params.id}})
    } catch (error) {
        console.log("Booking deleted: ", error)
        res.status(500).send({error:"something has gone wrong"})
        return
       
    } 
    if( result.status === 0){
        res.status(404).send({error:"Booking not found"})
        return
    }
    
    res
    .status(204)
    }

    exports.updateById = async (req, res) => {
        let result
        delete req.body.id
        try {
            result = await Booking.update(req.body,{where: {id: req.params.id}})
        } catch (error) {
            console.log("Booking update: ", error)
            res.status(500).send({error:"something has gone wrong"})
            return
        } 
        if( result.status === 0){
            res.status(404).send({error:"Booking not found"})
            return
        }
        const booking = await Booking.findByPk(req.params.id)
        res.status(200)
        .location(`${getBaseUrl(req)}/bookings/${booking.id}`)
        .json(booking)
    }
   
    exports.cancelAllBookings = async (req, res) => {
        try {
          const currentDate = new Date();
          const result = await Booking.update(
            { Status: "cancelled", DateCancelled: currentDate },
            { where: {} }
          );
      
          if (result[0] === 0) {
            res.status(404).send({ error: "No bookings found" });
            return;
          }
          res.status(200).send({ message: "All bookings cancelled successfully" });
        } catch (error) {
          console.log("Cancel all bookings: ", error);
          res.status(500).send({ error: "Something has gone wrong" });
        }
      };

      exports.bookAllRooms = async (req, res) => {
        const { clientId, startTime, endTime } = req.body;
      
        try {
          const rooms = await db.Rooms.findAll({ attributes: ["Id"] });
      
          const bookings = await Promise.all(
            rooms.map(async (room) => {
              const bookingData = {
                RoomID: room.Id,
                ClientID: clientId,
                StartTime: startTime,
                EndTime: endTime,
                Status: "booked",
              };
              return await Booking.create(bookingData);
            })
          );
          res.status(201).send({ message: "All rooms booked successfully", bookings });
        } catch (error) {
          console.log("Book all rooms: ", error);
          res.status(500).send({ error: "Something has gone wrong" });
        }
      };

getBaseUrl = (request) => { 
    return (
        (request.connection && request.connection.encrypted ? "https" : "http") + 
`://${request.headers.host}`
    )
}