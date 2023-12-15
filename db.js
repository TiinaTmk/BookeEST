const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mariadb",
        define: {
            timestamp:false
        }
    }
)

    const db = {}
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.rooms = require("./models/Room.model")(sequelize, Sequelize);

    async function Sync(){
        await sequelize.sync({alter: true}) //kui tabel olemas, lubab muuta, kui ei ole, siis teeb
    }

    module.exports = {db,Sync}