module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            AutoIncrement: true,
        },
        name: {
             type: Sequelize.STRING,
             allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        size: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        available: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultvalue: true,
        }
    })

    return Room
}