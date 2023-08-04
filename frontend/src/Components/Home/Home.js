import React, { useState, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import pr from './product.png'
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';
import Dropdown from 'react-bootstrap/Dropdown';
import useHeader from '../../helper/useHeader';
import cart from './cart.png'
export default function Home() {
  const id = parseInt(localStorage.getItem("Id"))
  const headers=useHeader()
  const [update, setUpdate] = useState([])
  const handleUpdate = (item) => {
    console.log("item=", item)
    setShowU(true)
    setUpdate(item)
    console.log("update=", { update })
  }
  const formik = useFormik({
    initialValues: {

      price: "",
      pname: "",
      category: '',
      id: id,
      photo: '',

    },
    validationSchema: Yup.object({

      pname: Yup.string().min(2, "Product name must have 2 characters").required('Required'),
      category: Yup.string().min(1).required('Required'),
      price: Yup.number().required("Required"),

    }),
    onSubmit: values => {
      submitForm(values)
      console.log("values=", values)
    },

  });



  console.log("update==", update)

  const Updateformik = useFormik({
    initialValues: {
      d_id: update.Id,
      dname: update.Name,
      dprice: update.Price,
      dcategory: update.Category
    },
    enableReinitialize: true,
    validationSchema: Yup.object({

      dname: Yup.string().min(2, "Product name must have 2 characters").required('Required'),
      dcategory: Yup.string().min(1).required('Required'),
      dprice: Yup.number().required("Required"),

    }),

    onSubmit: values => {
      handleUSubmit(values)

    },

  });

  const newformik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
      repeat_password: ''

    },
    validationSchema: Yup.object({
      current_password: Yup.string().min(4, "Minimum 4 characters").required("Required"),
      new_password: Yup.string().min(4, "Minimum 4 characters").required("Required"),
      repeat_password: Yup.string().oneOf([Yup.ref('new_password'), null], "Must match password").required("Required")
    }),
    onSubmit: (values) => {
      console.log("object")
      submitPasswordChange(values)
    }

  });
  const submitPasswordChange = async (values) => {
    const res = await axios.post("http://localhost:2020/change-password", { current_password: values.current_password, new_password: values.new_password, id })
    if (res.data.success) {
      setShowPass(false)
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
      newformik.resetForm({ values: { current_password: "", new_password: "", repeat_password: "" } });
    }
    else {
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
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const { user } = jwt_decode(token)
  const userName = user.User



  const [showD, setshowD] = useState(false)

  const handleClose1 = (e) => {
    setshowD(false)
  }
  console.log(user)

  const [state, setState] = useState({
    pname: "",
    category: "",
    price: "",
    id: id,

  })
  const [list, setList] = useState([])
  console.log(state)
  const [add, setAdd] = useState(false)
  const [search, setSearch] = useState("")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleButton = () => {

    localStorage.clear()
    navigate('/')
    toast.success('🦄 Logout Successfully', {
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


  const handleChange = (e) => {
    e.preventDefault()
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const submitForm = async (values) => {

      const formObj=new FormData()
      formObj.append("pname",values.pname)
      formObj.append("price",values.price)
      // formObj.append("id",values.id)
      formObj.append("category",values.category)
      formObj.append("photo",values.photo)
  

    const res = await axios.post("http://localhost:2020/add-product",formObj,headers)

    console.log(res)
    toast.success('🦄 PRODUCT ADDED', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setShow(false)
    // formik.initialValues({pname:"",category:"",price:""})
    formik.resetForm({ values: { pname: "", category: "", price: "", id: id } });
    console.log(id)
    getProduct()
    // setState({[e.target.name]:""})
  }

  const getProduct = async () => {
    const res = await axios.get("http://localhost:2020/get-product",headers)
    console.log(res)
    setList(res.data.product)
    console.log("detail of product==",res.data.product)

  }

  const [showPass, setShowPass] = useState(false)
  const handleChangePassword = () => {
    setShowPass(true)
  }

  const handleClosePass = () => {
    setShowPass(false)
    newformik.resetForm()
  }
  // const handleProduct=(e)=>
  // {
  //     setAdd(true)
  // }
  const handleProduct = () => setAdd(true);
  useEffect(() => {
    getProduct()
    getCartCount()
  }, [])

  const getSearch = async () => {
    const res = await axios.get(`http://localhost:2020/search-product?pname=${search}&userId=${id}`)
    console.log(res.data.product)
    setList(res.data.product)
  }
  useEffect(() => {
    getSearch()
  }, [search])

  const [detail, setDetail] = useState([])
  const handleDetail = (item) => {
    setshowD(true)
    setDetail(item)
  }

  const [showU, setShowU] = useState(false)

  const handleClose2 = (e) => {
    setShowU(false)
  }
  const handleDelete = async (id) => {
    const res = await axios.post(`http://localhost:2020/delete-product?id=${id}`,headers)
    getProduct()
  }
  const [state1, setState1] = useState({
    d_id: "",
    dname: "",
    dprice: "",
    dcategory: "",

  })
  useEffect(() => {
    const changeState = {
      d_id: update.Id,
      dname: update.Name,
      dprice: update.Price,
      dcategory: update.Category
    }
    setState1(changeState)
  }, [update])

  const handleUChange = (e) => {
    setState1({ ...state1, [e.target.name]: e.target.value })
  }
  const handleUSubmit = async (values) => {

    const res = await axios.post("http://localhost:2020/update-product", values,headers)
    if (res.data.success) {
      setShowU(false)
    }
    getProduct()
  }

  const handleCart=async(e)=>
  {
    e.preventDefault()
     const res = await axios.post("http://localhost:2020/add-to-cart",{productId:detail.Id},headers)

     getCartCount()
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
      navigate('/home/cart')
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
  const [cartCount,setCartCount]=useState(0)
  const getCartCount=async()=>
  {
    const res = await axios.get("http://localhost:2020/get-cart-count",headers)
    console.log("GET CART COUNT=",res.data)
    setCartCount(res.data.count)
  }
 
  return (
    <div>


      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

              <Button variant="outline-success btn-sm" onClick={handleShow} >ADD PRODUCT</Button>

            </Nav>
            <input
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search" id="search" value={search} name="search" onChange={(event) => {
                setSearch(event.target.value)

              }}
            />

            <Navbar.Text className="mx-5">
              Signed in as: {userName}
            </Navbar.Text>
            <Navbar.Text className="mx-3">
            <Link to="/home/cart" style={{textDecoration:"none"}}>

              <img src={cart} style={{height:"12%",width:"17%"}}/><sup>{cartCount}</sup> 
            </Link>
            <Button style={{margin:"10px"}}>
              <Link to="/home/order" style={{textDecoration:"none"}}>
ORDER
</Link>
              </Button>
            </Navbar.Text>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                PROFILE SETTING
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleButton}>LOGOUT</Dropdown.Item>
                <Dropdown.Item onClick={handleChangePassword}>CHANGE PASSWORD</Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>


          </Navbar.Collapse>
        </Container>
      </Navbar>



      <br /><br />
      {/* Modal */}





      {list.length > 0 && list.map((item) => {
        return (
          <Card style={{ width: '20rem',height:'25rem' }} id="card">
            <Card.Img variant="top" src={item.Photo}  style={{height:"10rem",marginTop:"5%"}}/>
            <Card.Body>
              <Card.Title>{item.Name}</Card.Title>
              <Card.Text style={{height:"5rem"}}>
                PRODUCT CATEGORY:{item.Category}<br />
                PRODUCT PRICE:{item.Price}<br />
              </Card.Text>
              <div style={{marginBottom:"5%"}}>
              <Button variant="primary m-1" onClick={() => handleDetail(item)}>DETAILS</Button>
              <Button variant="primary m-1" onClick={() => handleUpdate(item)}>UPDATE</Button>
              </div>
              {/* <Button variant="primary" onClick={() => handleDelete(item.Id)} >DELETE</Button> */}
             
            </Card.Body>
          </Card>
        )
      })}




      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD PRODUCTS</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body className='abc'>

            <div class="form-group">
              <div class="input-group">
                {/* <input type="text" class="form-control" name="pname" value={state.pname} onChange={handleChange} placeholder="ENTER PRODUCT NAME" required="required" /> */}
                <input
                  id="pname"
                  name="pname"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pname}
                  placeholder='ENTER PRODUCT NAME'
                />
                {formik.touched.pname && formik.errors.pname && <div>{formik.errors.pname}</div>}
              </div>
            </div>
            <br />
            <div class="form-group">
              <div class="input-group">
                {/* <select  name="category" value={state.category} onChange={handleChange} placeholder="ENTER PRODUCT CATEGORY " required="required">
                  <option>PRODUCT CATEGORY</option>
                   <option value="Electrical">Electrical</option>
                   <option value="Eatable">Eatable</option>
                   <option value="Textile">Textile</option>
                   <option value="Furniture">Furniture</option>
                </select> */}

                <select
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  <option value="">PRODUCT CATEGORY</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Eatable">Eatable</option>
                  <option value="Textile">Textile</option>
                  <option value="Furniture">Furniture</option>
                </select>

                {formik.touched.category && formik.errors.category && (
                  <div style={{ color: 'red' }}>{formik.errors.category}</div>
                )}


                {/* <input type="text" class="form-control" name="category" value={state.category} onChange={handleChange} placeholder="ENTER PRODUCT CATEGORY " required="required" /> */}
              </div>
            </div>
            <br />

            <div class="form-group">
              <div class="input-group">
                <input
                  type='file'
                  name='photo'
                  accept='image/*'
                  onChange={(e) =>
                    formik.setFieldValue('photo', e.currentTarget.files[0])
                  }
                />
              </div></div>
            <br />

            <div class="form-group">
              <div class="input-group">

                {/* <input type="number" class="form-control" name="price" value={state.price} onChange={handleChange} placeholder="ENTER PRODUCT PRICE " required="required" /> */}
                <input
                  id="price"
                  name="price"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  placeholder='ENTER PRODUCT PRICE'
                />
                {formik.touched.price && formik.errors.price && <div>{formik.errors.price}</div>}


              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-lg">ADD PRODUCT </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>




      <Modal show={showU} onHide={handleClose2}>
        <form onSubmit={Updateformik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>PRODUCT NAME:
              {/* <input type="text" value={state1.dname} name="dname" onChange={handleUChange} /> */}
              <input
                id="dname"
                name="dname"
                type="text"
                onChange={Updateformik.handleChange}
                onBlur={Updateformik.handleBlur}
                value={Updateformik.values.dname}

              />

              {Updateformik.touched.dname && Updateformik.errors.dname && <div>{Updateformik.errors.dname}</div>}
            </Modal.Title>

          </Modal.Header>
          <Modal.Body>PRODUCT CATEGORY:
            {/* <input type="text" value={state1.dcategory} name="dcategory" onChange={handleUChange} /> */}
            <select
              id="dcategory"
              name="dcategory"
              value={Updateformik.values.dcategory}
              onChange={Updateformik.handleChange}
            >
              <option value="">PRODUCT CATEGORY</option>
              <option value="Electrical">Electrical</option>
              <option value="Eatable">Eatable</option>
              <option value="Textile">Textile</option>
              <option value="Furniture">Furniture</option>
            </select>

            {Updateformik.touched.dcategory && Updateformik.errors.dcategory && (
              <div style={{ color: 'red' }}>{Updateformik.errors.dcategory}</div>
            )}

            <br /><br />
            PRODUCT PRICE:
            <input
              id="dprice"
              name="dprice"
              type="text"
              onChange={Updateformik.handleChange}
              onBlur={Updateformik.handleBlur}
              value={Updateformik.values.dprice}
              placeholder='ENTER PRODUCT PRICE'
            />
            {Updateformik.touched.dprice && Updateformik.errors.dprice && <div>{Updateformik.errors.dprice}</div>}
            {/* <input type="text" value={state1.dprice} name="dprice" onChange={handleUChange} /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <button type="submit" class="btn btn-primary btn-lg"> UPDATE </button>

          </Modal.Footer>
        </form>
      </Modal>
{/* 
DETAIL MODEL  */}

      <Modal show={showD} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>PRODUCT NAME:{detail.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='abc'>
          <img src={detail.Photo} style={{height:"50%", width:"70%"}}/><br/>
          PRODUCT CATEGORY:{detail.Category}<br /><br />
          PRODUCT PRICE:{detail.Price}</Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={handleCart} >ADD TO CART</Button>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose1}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 
change password */}


      <Modal show={showPass} onHide={handleClosePass}>
        <Modal.Header closeButton>
          <Modal.Title>RESET PASSWORD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={newformik.handleSubmit}>


            <input
              id="current_password"
              name="current_password"
              type="current_password"
              onChange={newformik.handleChange}
              value={newformik.values.current_password}
              onBlur={newformik.handleBlur}
              placeholder='ENTER CURRENT PASSWORD'
              style={{ margin: "2%" }} />


            {newformik.touched.current_password && newformik.errors.current_password && <div>{newformik.errors.current_password}</div>}


            <input
              id="new_password"
              name="new_password"
              type="new_password"
              onChange={newformik.handleChange}
              value={newformik.values.new_password}
              onBlur={newformik.handleBlur}
              placeholder='ENTER NEW PASSWORD'
              style={{ margin: "2%" }}
            />


            {newformik.touched.new_password && newformik.errors.new_password && <div>{newformik.errors.new_password}</div>}


            <input
              id="repeat_password"
              name="repeat_password"
              type="repeat_password"
              onChange={newformik.handleChange}
              value={newformik.values.repeat_password}
              onBlur={newformik.handleBlur}
              placeholder='REPEAT NEW PASSWORD'
              style={{ margin: "2%" }}
            />


            {newformik.touched.repeat_password && newformik.errors.repeat_password && <div>{newformik.errors.repeat_password}</div>}

            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-lg extra"> CHANGE PASSWORD</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

    </div>
  )
}


