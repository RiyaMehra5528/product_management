import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useHeader from '../../helper/useHeader'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css'
import ScrollToBottom from 'react-scroll-to-bottom'

export default function Cart() {
    const headers=useHeader()
    const [cart,setCart]=useState([])
    const [loading,setLoading]=useState(true)

    const navigate=useNavigate()
  useEffect(() => {
   getCartProduct()
   
   
   
  }, [])
  

  const getCartProduct=async()=>
  {
    console.log("get product cartt")
    const res=await axios.get("http://localhost:2020/get-cart-product",headers)
    console.log("res=",res.data)
     setCart(res.data.product)
     setLoading(false)
    console.log("cart product=",cart)
    getTotal(res.data.product);
    
    
  }

  const handleAdd=async(item)=>
  {
     const res=await axios.post("http://localhost:2020/quantity-add",{productId:item.Riya_reactAssignment_productModel?.Id},headers)
     console.log(res)
    //  setCart(res.data.product)
     getCartProduct()
     getTotal(res.data.product);
  }
  const handleSub=async(item)=>
  {
     const res=await axios.post("http://localhost:2020/quantity-sub",{productId:item.Riya_reactAssignment_productModel?.Id},headers)
     console.log(res)
    //  setCart(res.data.product)
     getCartProduct()
     getTotal(res.data.product);
  }

  const [total,setTotal]=useState(0)
  
  // const getTotal=(cart)=>
  // { let total=0
  //    {cart.length>0&&cart.map((item)=>
  //       {
  //           return(
          
  //                total=total+(item.productCount)*(item.Riya_reactAssignment_productModel?.Price)
                
  //           )
            
  //       })}

      //   {cart.forEach((item)=>
      //   {
      //     total+=item.productCount*item.Riya_reactAssignment_productModel?.Price
      //   })
      // }
  //       console.log("type of total=",typeof(total))
  //       console.log("total=",total)
  //      setTotal(total)
  // }
  const getTotal = (cart) => {
    if (cart.length > 0) {
      const total = cart.reduce((acc, item) => {
        return acc + item.productCount * item.Riya_reactAssignment_productModel?.Price;
      }, 0);
      setTotal(total);
    } else {
      setTotal(0);
    }
    
  };
  const handleOrder=async(cart)=>
  {
    const res=await axios.post("http://localhost:2020/place-order",{cart:cart},headers)
   
    getCartProduct()
    if(res.data.success)
    {
      toast.success(`🦄${res.data.msg}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    
    navigate('/home/order')
  }
  else{
    toast.success(`🦄${res.data.msg}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  }
  const handleCancel=async(item)=>
  {
      const res=await axios.patch("http://localhost:2020/delete-product",{id:item.Id},headers)
      // setCart(res.data.product)
      getCartProduct()
     
      toast.success(`🦄${res.data.msg}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
     
  }
  const handleHome=(e)=>
  {
      navigate('/home')
  }
  return (


<div>
      <center><h1> &#128515; HERE'S YOUR CART &#128515;</h1></center>
      
      <Button style={{float:"right"}} onClick={() => navigate('/home')} className="bg-primary">Go to Home</Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ScrollToBottom className='cart-container'>
        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.Riya_reactAssignment_productModel?.Id}>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>PRODUCT NAME</th>
                    <th>PRODUCT QUANTITY</th>
                    <th>PRODUCT TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><img src={item.Riya_reactAssignment_productModel?.Photo} style={{ height: "60px", width: "100px" }} alt={item.Riya_reactAssignment_productModel?.Name} /></td>
                    <td>{item.Riya_reactAssignment_productModel?.Name}</td>
                    <td>
                      <button className="button glow-button" onClick={() => { handleAdd(item) }} style={{ marginTop: "2%", marginRight: "15%", height: "10%", width: "15%" }}>+</button>
                      {item.productCount}
                      <button className="button glow-button" onClick={() => { handleSub(item) }} style={{ marginTop: "2%", marginLeft: "15%", height: "10%", width: "15%" }}>-</button>
                    </td>
                    <td>
                      {item.productCount * item.Riya_reactAssignment_productModel?.Price}
                      <div onClick={() => handleCancel(item)} style={{ marginTop: "5%", marginLeft: "15%", cursor: "pointer" }}> &#10060;</div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ))
        ) : (
          <div className="empty-cart">
            <h3 className="blink-move" style={{color:"red", display:"flex", justifyContent:"center",marginTop:"10%"}}>Your cart is empty</h3>
           
          </div>
        )}
      </ScrollToBottom>
      )}
<div class="footer">
<div className="bg-dark" style={{ marginTop:"2%", border: "2px solid black", color: "white", borderRadius: "20px", padding: "5px" }}>TOTAL:{total}</div>
<br/>
<Button className="bg-success" style={{ marginTop: "4%",width:"100%" }} onClick={() => { handleOrder(cart) }}>PLACE ORDER</Button>
</div>
      
      
    </div>
  )
}
