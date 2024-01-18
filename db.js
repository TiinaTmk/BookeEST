// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {
//         host: process.env.DB_HOST,
//         dialect: "mariadb",
//         define: {
//             timestamps: false
//         }
//     }
// )
//     const db = {}
//     db.Sequelize = Sequelize;
//     db.sequelize = sequelize;
    
//     db.Rooms = require("./models/Room.model")(sequelize, Sequelize);
//     db.Clients = require("./models/Client.model")(sequelize, Sequelize);
//     db.Bookings = require("./models/Booking.model")(sequelize, Sequelize);

//     async function Sync(){
//         await sequelize.sync({alter: true}) 
//     }

//     module.exports = {db,Sync}

// db.js
const Sequelize = require('sequelize');
const RoomModel = require("./models/Room.model");
const ClientModel = require("./models/Client.model");
const BookingModel = require("./models/Booking.model");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mariadb",
        define: {
            timestamps: false
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Rooms = RoomModel(sequelize, Sequelize);
db.Clients = ClientModel(sequelize, Sequelize);
db.Bookings = BookingModel(sequelize, Sequelize, db.Clients, db.Rooms);

async function Sync(){
    await sequelize.sync({alter: true});
}

module.exports = { db, Sync };
