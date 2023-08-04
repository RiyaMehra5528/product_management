import axios from 'axios'
import React, { useState,useEffect } from 'react'
import useHeader from '../../helper/useHeader'
import Table from 'react-bootstrap/Table';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToBottom from 'react-scroll-to-bottom'
import './Order.css'
export default function Order() {
    const headers=useHeader()
    const [product,setProduct]=useState([])
    const navigate=useNavigate()
    const [total,setTotal]=useState(0)
    const [loading,setLoading]=useState(true)


    useEffect(() => {
     getOrderProduct()
    }, [])
    
    const getOrderProduct=async()=>
    {
      const res=await axios.get("http://localhost:2020/get-order-product",headers)
      console.log("response of order=",res.data)
      setProduct(res.data.product)
      setLoading(false)
      getTotal(res.data.product)
    }
    
    const getTotal = (product) => {
      if (product.length > 0) {
        const total = product.reduce((acc, item) => {
          return acc + item.productCount * item.Riya_reactAssignment_productModel?.Price;
        }, 0);
        setTotal(total);
      } else {
        setTotal(0);
      }
    };

    const handleCancel=async(item)=>
  {
      const res=await axios.patch("http://localhost:2020/delete-order",{id:item.Id},headers)
      // setCart(res.data.product)
      getOrderProduct()
     
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
  const handleHome=()=>
  {
    navigate('/home')
  }
  return (
    <div>
     <center> <h1>&#128515; HERE ARE YOUR ORDERS &#128515;</h1></center>
     <Button  onClick={() => navigate('/home')} className="bg-primary">Go to Home</Button>
      <ScrollToBottom className='-container'>
        {loading ? (
          <p>Loading...</p>
        ) : product.length > 0 ? (
          product.map((item) => (
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
                    <td><img src={item.Riya_reactAssignment_productModel.Photo} style={{ height: "60px", width: "100px" }} /></td>
                    <td>{item.Riya_reactAssignment_productModel.Name}</td>
                    <td>{item.productCount}</td>
                    <td>{item.productCount * item.Riya_reactAssignment_productModel.Price}
                      <div onClick={() => handleCancel(item)} style={{ float: "right", cursor: "pointer" }}> &#10060;</div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ))
        ) : (
          <div className="empty-cart">
            <h3 className="blink-move"  style={{color:"red", display:"flex", justifyContent:"center",marginTop:"10%"}}>YOU HAVEN'T ORDERED ANYTHING</h3>
            <div className="center-button">
              
            </div>
          </div>
        )}
      </ScrollToBottom>

   
     
<br/>
<div class="footer">
<div className="bg-dark" style={{ marginTop:"2%", border: "2px solid black", color: "white", borderRadius: "20px", padding: "5px" }}>TOTAL:{total}</div>

</div>
    </div>
  )
}
    