const express=require("express")
const router=express.Router()
const {addProduct, getProduct,searchProduct,updateProduct,deleteProduct,addToCart,
    getCartCount,getCartProduct,quantityAdd,quantitySub,placeOrder,getOrderProduct,
    deleteCartProduct,deleteOrder}=require('../Controller/productController')
const { tokenVerify } = require("../Middleware/authM")
const upload = require("../Middleware/multer.config")
const { route } = require("./Routes")

router.post('/add-product',tokenVerify,upload.single("photo"),addProduct)
router.get('/get-product',getProduct)
router.get('/search-product',searchProduct)
router.post('/update-product',tokenVerify,updateProduct)
router.post('/delete-product',tokenVerify,deleteProduct)
router.post('/add-to-cart',tokenVerify,addToCart)
router.get('/get-cart-count',tokenVerify,getCartCount)
router.get('/get-cart-product',tokenVerify,getCartProduct)
router.post('/quantity-add',tokenVerify,quantityAdd)
router.post('/quantity-sub',tokenVerify,quantitySub)
router.post('/place-order',tokenVerify,placeOrder)
router.get('/get-order-product',tokenVerify,getOrderProduct)
router.patch('/delete-product',tokenVerify,deleteCartProduct)
router.patch('/delete-order',tokenVerify,deleteOrder)
module.exports=router