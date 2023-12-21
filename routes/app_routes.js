const roomsController = require("../controllers/RoomsController")
const clientsController = require("../controllers/ClientsController")

module.exports = (app) => {
    app.route("/rooms")
        .get(roomsController.getAll)
        .post(roomsController.createNew)

    app.route("/rooms/:id")
        .get(roomsController.getById)
        .put(roomsController.updateById)
        .delete(roomsController.deleteById)

         app.route("/clients")
        .get(clientsController.getAll)
        .post(clientsController.createNew)

    app.route("/clients/:id")
        .get(clientsController.getById)
        .put(clientsController.updateById)
        .delete(clientsController.deleteById)
}
