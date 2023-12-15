const roomsController = require("../controllers/RoomsController")

module.exports = (app) => {
    app.route("/rooms")
        .get(roomsController.getAll)

    app.route("/rooms/:id")
        .get(roomsController.getById)
}