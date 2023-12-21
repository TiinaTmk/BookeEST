module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("Client", {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            AutoIncrement: true,
        },
        Name: {
             type: Sequelize.STRING,
             allowNull: false,
        },
        BirthDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        Telephone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    
    })

    return Client
}