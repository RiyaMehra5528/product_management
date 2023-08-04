const Sequelize=require('sequelize')
// const { toDefaultValue } = require('sequelize/types/utils')
const db=require('../db/db')
const productModel = require('./productMOdel')
const userModel = require('./userModel')



const orderModel=db.define("Riya_reactAssignment_orderModel",
{

    Id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userId:{
         type:Sequelize.INTEGER,
         allowNull:false,
         references:
         {
            model:userModel,
            key:"Id"
         }
          },
    
    productId:{
        type:Sequelize.INTEGER,
         allowNull:false,
         references:
         {
            model:productModel,
            key:"Id"
         }
          },
    productCount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    total:
    {
        type:Sequelize.INTEGER,
        allowNull:false
    }
})



userModel.hasMany(orderModel,{foreignKey:"userId"})
orderModel.belongsTo(userModel,{foreignKey:"productId"})

productModel.hasMany(orderModel,{foreignKey:"productId"})
orderModel.belongsTo(productModel,{
    foreignKey:"productId"
})

module.exports=orderModel