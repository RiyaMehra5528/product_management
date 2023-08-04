import React, { useState } from 'react'
import { useFormik ,Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
export default function ChangePassword() {

    const [show,setShow]=useState(true)
    const handleClose=()=>
    {
        setShow(false)
    }
    const formik = useFormik({
        initialValues: {
            current_password: '',
            new_password:'',
            repeat_password:""

        },
        validationSchema: Yup.object({
            
            current_password: Yup.string().min(6,"Minimum 6 Characters").required('Required'),
            new_password:Yup.string().min(6,"Minimum 6 Characters").required('Required'),
            repeat_password:Yup.string().min(6,"Minimum 6 Characters").oneOf([Yup.ref('new_password'),null],"Must match new password").required('Required'),

        }),
        onSubmit: (values) => {
          submitForm(values)
        }
        
      });

      const submitForm=async(values)=>
      {
         const res=await axios.post("http://localhost:2020/change-password",values)
      }
  return (
    <div>
           <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD PRODUCTS</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
      

      <input
         id="current_password"
         name="current_password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.current_password}
         onBlur={formik.handleBlur}
         placeholder='ENTER CURRENT PASSWORD'
       />
 

       {formik.touched.current_password && formik.errors.current_password&&<div>{formik.errors.current_password}</div>}


      <input
         id="new_password"
         name="new_password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.new_password}
         onBlur={formik.handleBlur}
         placeholder='ENTER NEW PASSWORD'
       />
 

       {formik.touched.new_password && formik.errors.new_password&&<div>{formik.errors.new_password}</div>}


      <input
         id="repeat_password"
         name="repeat_password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.repeat_password}
         onBlur={formik.handleBlur}
         placeholder='REPEAT NEW PASSWORD'
       />
 

       {formik.touched.repeat_password && formik.errors.repeat_password&&<div>{formik.errors.repeat_password}</div>}
       </Modal.Body>
          <Modal.Footer>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-lg">ADD PRODUCT </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>

 
    </div>
  )
}
