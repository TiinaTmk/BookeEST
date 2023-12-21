module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("Room", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            AutoIncrement: true,
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