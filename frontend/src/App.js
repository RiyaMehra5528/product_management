
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import PublicLayout from './Layout/PublicLayout';
import PrivateLayout from './Layout/PrivateLayout';
import Home from './Components/Home/Home';
import Model from './Components/Model/Model';
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import Cart from "./Components/Cart/Cart";
import Order from "./Components/Order/Order";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='/forget_password' element={<ForgetPassword />} />
          </Route>
          <Route path='/home' element={<PrivateLayout />}>
            <Route index element={<Home />} />
            <Route path='cart' element={<Cart/>}/>
            <Route path='order' element={<Order/>}/>
            {/* <Route path="home/change-password" element={<ChangePassword />} /> */}
       
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
     
    </div>
  );
}

export default App;
