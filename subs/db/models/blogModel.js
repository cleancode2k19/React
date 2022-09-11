import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Blog = db.define('Blog',{
    title:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    message:{
        type: DataTypes.STRING
    },
    signature:{
        type: DataTypes.STRING
    },
    displayFlag:{
        type: DataTypes.NUMBER
    },
    notes:{
        type: DataTypes.STRING
    }
});
 
export default Blog;