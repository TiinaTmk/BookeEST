const RoomsController = require("../controllers/RoomsController.js")

module.exports = (app) => {
    app.route("/rooms").get(RoomsController.getAll)
}