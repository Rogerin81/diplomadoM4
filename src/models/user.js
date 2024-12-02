import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import { Task } from "./tasks.js";
import { Status } from "../constants/index.js";
import logger from "../logs/logger.js";
import { encriptar } from "../common/bycript.js";

export const User = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notNull:{
                msg: 'El nombre de usuario no debe ser nulo',
            },
        },
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg: 'El password no debe ser nulo',
            },
        },
    },
    status:{
        type:DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate:{
            isIn:{
                args:[(Status.ACTIVE,Status.INACTIVE )],
                msg:'El estado debe ser activo o inactivo',
            },
        },
    },
});
User.hasMany(Task);
Task.belongsTo(User);

/*User.hasMany(Task, {
    foreingKey:'userId',
    sourceKey:'id',
})
Task.belongsTo(User,{
    foreignKey: 'userId',
    targetKey: 'id',
})*/

User.beforeCreate(async(user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar');
    }
})
User.beforeUpdate(async(user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al comparar');
    }
})