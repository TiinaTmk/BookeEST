const {db} = require("../db");
const Booking = db.Bookings;
const Client = db.Clients;

exports.createNewBooking = async (req, res) => {
  try {
      // Create a new client
      const client = await Client.create(req.body.clientData);

      // Create a new booking
      const booking = await Booking.create({
          RoomID: req.body.RoomID,
          ClientID: client.Id,
          StartTime: req.body.StartTime,
          EndTime: req.body.EndTime,
          // Status: req.body.Status,
          Status: req.body.status || 'booked',

      });
      res.status(201).json({ success: true, bookingId: booking.Id });

    } catch (error) {
      console.error(error);
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error);
            res.status(400).send({ "error": error.errors.map((item) => item.message) });
        } else {
            console.log("Booking created: ", error);
            res.status(500).send({ error: "Something has gone wrong" });
        }
    }
};

// exports.bookAllAvailableRooms = async (req, res) => {
//   try {
//     const { startTime, endTime } = req.body;

//     // Fetch available rooms within the specified date range
//     const availableRooms = await getAvailableRooms(startTime, endTime);

//     // Book all available rooms
//     await bookRooms(availableRooms, startTime, endTime);

//     res.status(200).send({ success: true, message: "All available rooms booked successfully." });
//   } catch (error) {
//     console.error("Error booking all available rooms:", error);
//     res.status(500).send({ success: false, error: "Internal server error." });
//   }
// };

// // Function to fetch available rooms within a date range
// const getAvailableRooms = async (startDate, endDate) => {
//   const innerQueryResult = await db.sequelize.query(
//     "SELECT RoomID FROM Bookings WHERE (StartTime < :endDate AND EndTime > :startDate) AND Status NOT IN ('Cancelled')",
//     {
//       replacements: { startDate, endDate },
//       type: db.sequelize.QueryTypes.SELECT,
//     }
//   );

//   const bookedRoomIds = innerQueryResult.map(result => result.RoomID);

//   const availableRooms = await db.sequelize.query(
//     `SELECT * FROM Rooms WHERE Id NOT IN (${bookedRoomIds.join(',')})`,
//     { type: db.sequelize.QueryTypes.SELECT }
//   );

//   return availableRooms;
// };

// // Function to book rooms for the specified date range
// const bookRooms = async (rooms, startDate, endDate) => {
//   const bookingPromises = rooms.map(async room => {
//      // Create a new client
//      const client = await Client.create(req.body.clientData);
//     // Create a booking for each room
//     const bookingData = {
//           RoomID: req.body.RoomID,
//           ClientID: client.Id,
//           StartTime: req.body.StartTime,
//           EndTime: req.body.EndTime,
//           Status: req.body.status || 'booked',
//     };

//     // Create the booking
//     await Booking.create(bookingData);
//   });

//   // Wait for all bookings to be created
//   await Promise.all(bookingPromises);
// };

// Function to book rooms for the specified date range
const bookRooms = async (rooms, startDate, endDate, clientData) => {
  try {
    // Create a new client
    const client = await Client.create(clientData);

    const bookingPromises = rooms.map(async room => {
      // Create a booking for each room
      const bookingData = {
        RoomID: room.Id,
        ClientID: client.Id,
        StartTime: startDate,
        EndTime: endDate,
        Status: 'booked',
      };

      // Create the booking
      await Booking.create(bookingData);
    });

    // Wait for all bookings to be created
    await Promise.all(bookingPromises);
  } catch (error) {
    console.error("Error booking rooms:", error);
    throw error;
  }
};

exports.bookAllAvailableRooms = async (req, res) => {
  try {
    const { startTime, endTime, clientData } = req.body;

    // Fetch available rooms within the specified date range
    const availableRooms = await getAvailableRooms(startTime, endTime);

    // Book all available rooms
    await bookRooms(availableRooms, startTime, endTime, clientData);

    res.status(200).send({ success: true, message: "All available rooms booked successfully." });
  } catch (error) {
    console.error("Error booking all available rooms:", error);
    res.status(500).send({ success: false, error: "Internal server error." });
  }
};

exports.getAll = async(req,res) => {
    const bookings = await Booking.findAll({attributes:["Id","RoomID","ClientID","StartTime","EndTime","Status","DateCancelled"]})
    res.send(bookings)
}

exports.getById = async(req, res) => {
    const bookings = await Booking.findByPk(req.params.id)
    res.send(bookings)
}

exports.deleteById = async (req, res) => {
    let result
    try {
        result = await Booking.destroy({where: {id: req.params.id}})
    } catch (error) {
        console.log("Booking cancelled: ", error)
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

    

getBaseUrl = (request) => { 
    return (
        (request.connection && request.connection.encrypted ? "https" : "http") + 
`://${request.headers.host}`
    )
}