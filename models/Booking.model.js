
module.exports = (sequelize, Sequelize, Client, Room) => {
    const Booking = sequelize.define("Booking", {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        RoomID: {
             type: Sequelize.INTEGER,
             references: {
                model: Room,
                key: "Id",
        }},
        ClientID: {
            type: Sequelize.INTEGER,
            references: {
                model: Client,
                key: "Id",
            }
           
        },
        StartTime: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        EndTime: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        Status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'booked'
        },
        DateCancelled: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },

    })

    Room.belongsToMany(Client,{through: Booking, foreignKey: 'RoomID'});
    Client.belongsToMany(Room,{through: Booking, foreignKey: 'ClientID'});

    return Booking
}