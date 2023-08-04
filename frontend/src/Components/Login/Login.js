import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../SignUp/SignUp.css'
import axios from 'axios'
import { useFormik } from 'formik';
import './Login.css'
import * as Yup from 'yup';


export default function Login() {
  const formik = useFormik({
    initialValues: {
      
      email: '',
      password:''
    },
    validationSchema:Yup.object({
 
      email: Yup.string().email('Invalid email address').required('Required'),
      password:Yup.string().min(6,"Minimum 6 characters").required("Required")
    }),
    onSubmit: values => {
      submitForm(values)
    },
  });
  // const [state, setState] = useState(
  //   {
  //     email: "",
  //     password: ""
  //   }
  // )
  const navigate = useNavigate()
  // const handleChange = (e) => {
  //   e.preventDefault()
  //   setState({ ...state, [e.target.name]: e.target.value })
  // }
  const submitForm = async (values) => {
    
    const res = await axios.post(" http://localhost:2020/login ", values)
    console.log(res)
    if (res.data.success && res.data.msg === "LOGIN SUCCESSFULLY") {
      // alert(res.data.msg)
      toast.success('🦄 Login Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("isloggedIn", true)
      localStorage.setItem("Id",res.data.userId)
      navigate('/home')
    }
    else if(res.data.success )
    {
      // alert(res.data.msg)
      let msg=res.data.msg
      toast.warn(msg, {
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
  return (
    <>
    

    <section class="w-80 px-4 py-5 gradient-custom " style={{"border-radius": ".5rem .5rem 0 0"}}>
     
      <div class="row justify-content-center">
        <div class="col-12 col-lg-9 col-xl-9">
          <div class="card shadow-2-strong card-registration" style={{"border-radius": "15px"}}>
            <div class="card-body p-4 p-md-5">
       
               <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">LOGIN </h3>
       
              <form onSubmit={formik.handleSubmit}>

  

                <center><div class="row">
                  <div class="col-md-6 mb-4 pb-2">

                    <div class="form-outline">
                      {/* <input type="email" id="emailAddress" class="form-control form-control-lg" name="email" value={state.email} onChange={handleChange}  placeholder='ENTER EMAIL'/> */}
                      <input
         id="email"
         name="email"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}
         placeholder='ENTER EMAIL'
         style={{width:"100%",margin:"auto"}}
       />
     {formik.touched.email && formik.errors.email&&<div>{formik.errors.email}</div>}
                    <div class="form-notch"><div class="form-notch-leading" style={{"width": "9px"}}></div><div class="form-notch-middle" style={{"width": "40px"}}></div><div class="form-notch-trailing"></div></div></div>

                  </div>

               </div></center>
               
               <center><div class="row">
                  <div class="col-md-6 mb-4 pb-2">

<div class="form-outline">
  {/* <input type="password" id="password" class="form-control form-control-lg" name="password" value={state.password} onChange={handleChange} placeholder='ENTER PASSWORD'/> */}
  <input
         id="password"
         name="password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.password}
         onBlur={formik.handleBlur}
         placeholder='ENTER PASSWORD'
         style={{width:"100%",margin:"auto"}}
       />
 

       {formik.touched.password && formik.errors.password&&<div>{formik.errors.password}</div>}
<div class="form-notch"><div class="form-notch-leading" style={{"width": "9px"}}></div><div class="form-notch-middle" style={{"width": "40px"}}></div><div class="form-notch-trailing"></div></div></div>

</div>
                  
                </div>
</center>
              
               <div class="row">
                <div class="mt-4 pt-2 ">
                  <input class="btn btn-primary btn-lg " type="submit" value="LOGIN"/>
                </div>
                </div>
              
                <div class="row">

                <div class="text-center">Don't have an account? <Link to="/signup">CREATE ACCOUNT</Link>
                <Link to="/forget_password" style={{margin:"5%"}}>FORGET PASSWORD?</Link></div>
                </div>
              </form>


              
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
