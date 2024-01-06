// module.exports = (sequelize, Sequelize, Client, Room) => {
//     const Booking = sequelize.define("Booking", {
//         Id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             AutoIncrement: true
//         },
//         RoomID: {
//              type: Sequelize.INTEGER,
//              references: {
//                 model: Room,
//                 key: "id",
//         }},
//         ClientID: {
//             type: Sequelize.INTEGER,
//             references: {
//                 model: Client,
//                 key: "id",
//             }
           
//         },
//         StartTime: {
//             type: Sequelize.DATEONLY,
//             allowNull: false,
//         },
//         EndTime: {
//             type: Sequelize.DATEONLY,
//             allowNull: false,
//         },
//         // Status: {
//         //     type: Sequelize.String,
//         //     allowNull: true,
//         // },
//         // DateCancelled: {
//         //     type: Sequelize.DATE,
//         //     allowNull: true,
//         // },

//     })
//     //Room.belongsToMany(Client,{through: Booking});
//     //Client.belongsToMany(Room,{through: Booking});
//     return Booking
// }