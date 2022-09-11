import { Sequelize } from "sequelize";
 
const db = new Sequelize('subs', 'root', 'root', {
    host: "localhost",
    port : 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});

export default db;