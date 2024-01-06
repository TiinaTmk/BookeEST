module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("Room", {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
             type: Sequelize.STRING,
             allowNull: false,
        },
        Price: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        Description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Size: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    
    })

    return Room
}