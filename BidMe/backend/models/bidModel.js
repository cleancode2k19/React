import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Bid = db.define('bid',{
    title:{
        type: DataTypes.STRING
    },
    amount:{
        type: DataTypes.DOUBLE
    },
    name:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    totalHours:{
        type: DataTypes.STRING
    },
    endDate:{
        type: DataTypes.STRING
    }
});
 
export default Bid;