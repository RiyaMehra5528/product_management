const Sequelize=require('sequelize')
const db=require('../db/db')
const productModel = require('./productMOdel')

const userModel=db.define("Riya_reactAssignment_userModel",
{
    Id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    User:{
         type:Sequelize.STRING,
         allowNull:false
          },
    Email:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    Password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    ConfirmPassword:{
        type:Sequelize.STRING,
        allowNull:false,
    }
}

)
userModel.hasMany(productModel,{foreignKey:"RiyaReactAssignmentUserModelId"})
productModel.belongsTo(userModel,{foreignKey:"RiyaReactAssignmentUserModelId"})
module.exports=userModel
