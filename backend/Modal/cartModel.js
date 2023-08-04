const Sequelize=require('sequelize')
const db=require('../db/db')
const productModel = require('./productMOdel')
const userModel = require('./userModel')

const cartModel=db.define("Riya_reactAssignment_cartModel",
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
            keyL:"Id"
         }
          },
    
    productId:{
        type:Sequelize.INTEGER,
         allowNull:false,
         references:
         {
            model:productModel,
            keyL:"Id"
         }
          },
    productCount:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1
    }
    
}

)


userModel.hasMany(cartModel,{foreignKey:"userId"})
cartModel.belongsTo(userModel,{foreignKey:"userId"})

productModel.hasMany(cartModel,{foreignKey:"productId"})
cartModel.belongsTo(productModel,{
    foreignKey:"productId"
})

module.exports=cartModel