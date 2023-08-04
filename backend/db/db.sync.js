const userModel = require("../Modal/userModel")
const productModel = require("../Modal/productMOdel")
const cartModel = require("../Modal/cartModel")
const orderModel = require("../Modal/orderMOdel")
const db = require("./db")


const initDb=async()=>
{
    await db.authenticate()
    await db.sync({force:false})
}
initDb()

module.exports=initDb