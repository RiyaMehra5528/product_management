import React from 'react'
import { Link } from 'react-router-dom'
import pg from './pagenotfound.jpg'

export default function PageNotFound() {
  return (
    <div>
     <div style={{height:"100%",width:"60%",border:"2px solid red",borderRadius:"20px",
     margin:"auto",marginTop:"8%",color:"white",textAlign:"center"}}>
      <img src={pg} style={{height:"90%", width:"90%", margin:"auto"}}/><br/>
         <Link to='/' style={{color:"red",textDecoration:"none",backgroundColor:"white"}}>BACK TO HOME</Link></div>
    </div>
   
  )
}
