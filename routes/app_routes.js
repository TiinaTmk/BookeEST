const roomsController = require("../controllers/RoomsController");
const clientsController = require("../controllers/ClientsController");
const bookingController = require("../controllers/BookingController");

module.exports = (app) => {
  app.route("/rooms")
    .get(roomsController.getAll)
    .post(roomsController.createNew);

    app.route("/getavailablerooms")
    .get(roomsController.getAvailable)

  app.route("/rooms/:id")
    .get(roomsController.getById)
    .put(roomsController.updateById)
    .delete(roomsController.deleteById);

  app.route("/clients")
    .get(clientsController.getAll)
    .post(clientsController.createNew);

  app.route("/clients/:id")
    .get(clientsController.getById)
    .put(clientsController.updateById)
    .delete(clientsController.deleteById);

  app.route("/bookings")
    .get(bookingController.getAll)
    // .post(bookingController.createNew)
    .post(bookingController.createNewBooking);

   

  app.route("/bookings/:id")
    .get(bookingController.getById)
    .put(bookingController.updateById)
    .delete(bookingController.deleteById);

  app.route("/bookings/book-all")
    .post(bookingController.bookAllAvailableRooms); // Route for booking all rooms at once

//   app.route("/bookings/cancel-all")
//     .post(bookingController.cancelAllBookings); // Route for cancelling all bookings at once
// 
};
