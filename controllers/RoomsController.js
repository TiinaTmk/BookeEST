const {db} = require("../db")
const Room = db.rooms

exports.getAll = async(req,res) => {
    const rooms = await Room.findAll({attributes:["name"]})
    res.send(rooms)
}