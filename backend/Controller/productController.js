const { Op } = require("sequelize")
const cartModel = require("../Modal/cartModel")
const orderModel = require("../Modal/orderMOdel")
const productModel = require("../Modal/productMOdel")

exports.addProduct = async (req, res) => {
    try {
        console.log('this is copy')
        const { pname, price, category } = req.body
        console.log("body=", req.body)
        const url = req.file.path
        console.log("id=", req.user.Id)
        const product = await productModel.create({
            Name: pname,
            Category: category,
            Price: price,
            Photo: "http://localhost:2020/" + url,
            RiyaReactAssignmentUserModelId: req.user.Id
        })
        return res.status(200).json({ success: true, msg: "PRODUCT ADDED" })
    }
    catch (e) {
        return res.status(404).json({ success: false, msg: "Error" })
    }
}

exports.getProduct = async (req, res) => {
    // const  id = req.user.Id
    // console.log(id)
    try {
        const product = await productModel.findAll()
        console.log("product=", product)
        return res.status(200).json({ success: true, product: product })
    }
    catch (e) {
        return res.status(404).json({ success: false, msg: 'Error' })
    }
}

exports.searchProduct = async (req, res) => {

    const { pname } = req.query
    console.log("pname=", pname)
    try {
        const product = await productModel.findAll({
            where: {
                [Op.and]: [
                    { RiyaReactAssignmentUserModelId: req.query.userId },
                    {
                        Name: {
                            [Op.like]: "%" + pname + "%"
                        }
                    }
                ]
            }
        })
        return res.status(200).json({ success: true, product: product })
    }
    catch (e) {
        return res.status(404).json({ success: true, msg: "Error" })
    }
}

exports.updateProduct = async (req, res) => {
    const { dname, dprice, dcategory, d_id } = req.body
    console.log(dname, dprice, dcategory, d_id)
    try {
        const product = await productModel.update({
            Name: dname,
            Category: dcategory,
            Price: dprice
        },
            { where: { Id: d_id } })

        return res.status(200).json({ success: true, product: product })
    }
    catch (e) {
        return res.status(404).json({ success: false, msg: "Can't Update" })
    }
}

exports.deleteProduct = async (req, res) => {
    const userId=req.user.Id
    const { id } = req.query
    try {
        const product = await productModel.destroy({
            where: {
                Id: id,
                RiyaReactAssignmentUserModelId:userId
            }
        })
        return res.status(200).json({ success: true })
    }
    catch {
        return res.status(404).json({ success: false, msg: "Error" })
    }

}

exports.addToCart = async (req, res) => {
    const { productId } = req.body
    const userId = req.user.Id
    try {
        const item = await cartModel.findOne({
            where:
            {
                productId: productId,
                userId: userId
            }
        })
        if (item) {
            const cartItem = await cartModel.update({ productCount: item.productCount + 1 },
                {
                    where: {
                        productId: productId,
                        userId: userId
                    }
                })
            return res.status(200).json({ success: true, msg: "PRODUCT IS PRESENT IN CART WE HAVE INCREASED THE QUANTITY" })
        }

        const cartProduct = cartModel.create({
            userId: userId,
            productId: productId,
            productCount: 1

        })
        return res.status(200).json({ success: true, msg: "PRODUCT ADDED TO CART" })

    }
    catch (e) {
        return res.status(404).json({ success: false, msg: "THERE'S SOME ISSUE IN ADDING THE PRODUCT TO CART" })
    }
}

exports.getCartCount = async (req, res) => {
    console.log("cart count api")
    const userId = req.user.Id
    console.log("user Id=", userId)
    try {


        const cartItem = await cartModel.findAll({ where: { userId: userId } })
        let count = 0;
        {
            cartItem.length > 0 && cartItem.map((item) => {
                count = count + (item.productCount)
            })
        }
        return res.status(200).json({ success: true, count: count })
    }
    catch (e) {
        return res.status(400).json({ success: false })
    }
}

exports.getCartProduct = async (req, res) => {
    const userId = req.user.Id
    console.log("cart product api")
    console.log("userId=", userId)
    try {

        const product = await cartModel.findAll({
            where: {
                userId: userId,
            },
            include: {
                model: productModel,
            },
        });
        console.log("user cart product=", product)
        return res.status(200).json({ success: true, product: product })
    }
    catch (e) {
        return res.status(404).json({ success: false, msg: "error" })
    }

}

exports.quantityAdd = async (req, res) => {
    console.log("incrementing api")
    const { productId } = req.body
    const userId = req.user.Id
    console.log("product id=",productId)
    console.log("user id=",userId)
    try {

        const item = await cartModel.findOne({
            where:
            { userId: userId,
                productId: productId,
                
            }
        })
        console.log("increment item detail=",item)
        const product = await cartModel.update({
            productCount:item.productCount+1
       },
       {where:{productId:productId,
    userId:userId}})
     console.log("updated product detail=",product)
       return res.status(200).json({success:true,product:product})
    }
catch(e)
{
    console.log("error=",e)
    return res.status(404).json({success:false,msg:"error"})
}
}

exports.quantitySub = async (req, res) => {
    console.log("incrementing api")
    const { productId } = req.body
    const userId = req.user.Id
    console.log("product id=",productId)
    console.log("user id=",userId)
    try {

        const item = await cartModel.findOne({
            where:
            { userId: userId,
                productId: productId,
                
            }
        })
        console.log("increment item detail=",item)
        if(item){

            if(item.productCount>1)
            {
    
                const product = await cartModel.update({
                    
                    productCount:item.productCount-1
               },
               {where:{productId:productId,
            userId:userId}})
           return res.status(200).json({success:true,product:product})
               }
        }
           
    }
catch(e)
{
    console.log("error=",e)
    return res.status(404).json({success:false,msg:"error"})
}
}

exports.placeOrder=async(req,res)=>
{
const {cart}=req.body
console.log("cart=",cart)
try{
    const userId=req.user.Id
{{
    cart.length>0&&cart.map(async(item)=>
    {
        const order=await orderModel.create({
            userId:userId,
            productId:item.Riya_reactAssignment_productModel.Id,
            productCount:item.productCount,
            total:item.productCount*item.Riya_reactAssignment_productModel.Price
        })

        
        const deletedRows = await cartModel.destroy({
            where: {
              userId: userId, 
              productId: item.Riya_reactAssignment_productModel.Id,
            },
          });
    })
    
}}
return res.status(200).json({success:true,msg:"ORDER PLACED"})
}
catch(e)
{
    return res.status(404).json({success:false,msg:"TRY AGAIN LATER "})
}
}


exports.getOrderProduct=async(req,res)=>
{
    const userId=req.user.Id
    try{
    const product=await orderModel.findAll({where:{userId:userId},include:{model:productModel}})
    return res.status(200).json({success:true,product:product})
}
catch(e)
{
  return res.status(404).json({success:true,msg:"error"})
}
}

exports.deleteCartProduct=async(req,res)=>
{
    const {id}=req.body
    console.log(" cart id=",id)
    try{
    const userId=req.user.Id
  console.log("useR Id=",userId)
    const product=await cartModel.destroy({where:{
        Id:id,
        userId:userId
    }})
    console.log("after delete= ",product)
    return res.status(200).json({success:"true",msg:"PRODUCT REMOVED FROM CART"})
}
catch(e)
{
    return res.status(404).json({success:"false",msg:"PRODUCT REMAINED IN CART"})
}
}



exports.deleteOrder=async(req,res)=>
{
    const {id}=req.body
    console.log(" cart id=",id)
    try{
    const userId=req.user.Id
  console.log("useR Id=",userId)
    const product=await orderModel.destroy({where:{
        Id:id,
        userId:userId
    }})
    console.log("after delete= ",product)
    return res.status(200).json({success:"true",msg:"ORDER CANCELLED"})
}
catch(e)
{
    return res.status(404).json({success:"false",msg:"ORDER NOT CANCELLED TRY AGAIN LATER"})
}
}
