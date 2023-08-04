import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ForgetPassword() {
    const navigate=useNavigate()
    const formik = useFormik({
        initialValues: {
          email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: (values) => {
          submitForm(values)
        }
        
      });

      const submitForm=async(values)=>
      {
         const res=await axios.put("http://localhost:2020/forget-password",values)
         if(res.data.success)
         {

            
            toast.success(`🦄${res.data.msg}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                navigate('/')
         }
         else{
            toast.error(`🦄${res.data.msg}`, {
                position: "top-right",
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
  return (
    <center><div style={{height:"300px",width:"40%",border:'2px solid teal',marginTop:"10%",textAlign:"center",backgroundImage:"linear-gradient(teal, white)",borderRadius:"20px"}}>

<h1>RESET PASSWORD</h1>
     <form onSubmit={formik.handleSubmit}>
       
       <input
         id="email"
         name="email"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}
         placeholder='ENTER EMAIL'
        style={{margin:"5%",width:"80%"}}/>
     {formik.touched.email && formik.errors.email&&<div>{formik.errors.email}</div>}
       <button type="submit" style={{marginTop:"10%"}} >Submit</button>
     </form>
   
 
     
    </div></center>
  )
}
