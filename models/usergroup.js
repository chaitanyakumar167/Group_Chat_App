const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UserGroup = sequelize.define('usergroup',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    groupname:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    isadmin:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
    }

})

module.exports = UserGroup