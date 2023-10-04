const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Chat = sequelize.define('chat',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false
    },
    message:{
        type:Sequelize.TEXT,
        allowNull:false,
    }
})

module.exports = Chat;