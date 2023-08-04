const userModel = require("../Modal/userModel")
const jwt=require('jsonwebtoken')
const bcrypt=require("bcrypt")
const sendMail = require("./sendMail")

exports.signUp=async(req,res)=>
{
    const {uname,email,password,r_password}=req.body
    console.log(uname,email,password,r_password)
    console.log("table=",userModel)

    const hashPass=bcrypt.hashSync(password,10)
    const r_hash=bcrypt.hashSync(r_password,10)
    console.log("BOth password are hashed", hashPass,r_hash)
    try{
    const check=await userModel.findOne({where:{Email:email}})
    if(!check)
    {
        const user=await userModel.create({
            User:uname,
            Email:email,
            Password:hashPass,
            ConfirmPassword:r_hash
           })
           return res.status(200).json({success:true,msg:"USER CREATED SUCCESSFULLY"})
       
    }
    return res.status(200).json({success:false,msg:"USER ALREADY EXIST BY THIS EMAIL ADDRESS"})

}
catch(e)
{
 return res.status(404).json({success:false,msg:"ERROR"})
}
}

exports.login=async(req,res)=>
{
    const {email,password}=req.body
    console.log(email,password)
try{
    const user=await userModel.findOne({where:{Email:email}})
    console.log("user=",user)
    if(!user)
    {
        return res.status(200).json({success:true,msg:"USER NOT FOUND"})
    }

    const match=bcrypt.compareSync(password,user.Password)
    console.log("user password",user.Password)
    console.log("password=",password)
    console.log("match="+match)
    if(!match)
    {
        return res.status(200).json({success:true,msg:"PASSWORD INCORRECT"})
    }
    const token=jwt.sign({user:user},"KEEPSMILING")
    return res.status(200).json({success:true,msg:"LOGIN SUCCESSFULLY",token:token,userId:user.Id})
}
catch(e)
{
    return res.status(404).json({success:false,msg:"ERROR"})
}
}

exports.getUserName=async(req,res)=>
{
    const token=localStorage.getItem("token")
    console.log("token=",token)
    const user=await jwt.decode(token)
    console.log(user)
    return res.status(200).json({success:true})
}

    exports.forgetPassword=async(req,res)=>
    {
        const {email}=req.body
        console.log("email=",email)
        try{
        const user=await userModel.findOne({where:{Email:email}})
        if(!user)
        {
           return res.status(200).json({success:false,msg:"NO USER FOUND BY THIS EMAIL ADDRESS"})
        }
        let password= await Math.floor(Math.random() * 100000000) + 1;
        console.log("random password",password)
        // const salt=bcrypt.genSaltSync(10)
        // const hashpass=bcrypt.hashSync(password,salt)
        const hashPass=bcrypt.hashSync(password.toString(),10)
        console.log("password hashed=",hashPass)
        const update=await userModel.update({
            Password:hashPass
        },
        {where:{Email:email}})
        await sendMail(email,password)
        console.log("update=",update)
        return res.status(200).json({success:true,msg:"Password Reset Successfully"})
        
    }
    catch(e)
    {
        console.log("error=",e)
        return res.status(404).json({success:false,msg:"ERROR"})
    }
    }


    exports.changePassword=async(req,res)=>
    {
        const {id,current_password,new_password}=req.body
        console.log("current password=",current_password)
        try{
          const user=await userModel.findOne({where:{Id:id}})
          console.log("user found",user)
          const match=bcrypt.compareSync(current_password,user.Password)

          if(!match)
          {
            return res.status(200).json({success:false,msg:"CURRENT PASSWORD IS WRONG"})
          }
          console.log("password matched")
          const hashPass=bcrypt.hashSync(new_password,10)
          console.log("password hashed=",hashPass)
          const update=await userModel.update({
              Password:hashPass,
              ConfirmPassword:hashPass
              
          },
          {where:{Id:id}})
        //   sendMail(user.Email,password)
          console.log("update=",update)
          return res.status(200).json({success:true,msg:"Password Reset Successfully"})
        }
        catch(e)
        {
            console.log("error=",e)
        }
    }