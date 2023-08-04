const Sequelize=require('sequelize')
const db = require('../db/db')

const productModel=db.define("Riya_reactAssignment_productModel",
{
    Id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    Name:{
         type:Sequelize.STRING,
         allowNull:false
          },
    Category:{
        type:Sequelize.STRING,
        allowNull:false,
       
    },
    Price:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    Photo:{
        type:Sequelize.STRING,
        allowNull:false
    }
    
})

module.exports=productModel
