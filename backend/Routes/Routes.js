const express=require("express")
const route=express.Router()
const {signUp,login,getUserName,forgetPassword,changePassword}=require('../Controller/userController')
const { validate_mid, tokenVerify } = require("../Middleware/authM")

route.post("/signup",validate_mid,signUp)
route.post('/login',login)
route.get('/getUserName',getUserName)
route.put('/forget-password',forgetPassword)
route.post('/change-password',tokenVerify,changePassword)
module.exports=route;