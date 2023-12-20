import React from 'react'
import{Routes,Route} from 'react-router-dom'
import './App.css';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Privateroute from './route/Privateroute';
import Userdashboard from './user/Userdashboard';
import Adminroute from './route/Adminroute';
import Admindashboard from './admin/Admindashboard';
import EditUser from './user/EditUser';
import Addproduct from './admin/Addproduct';
import Products from './admin/Products';
import Editproduct from './admin/Editproduct';
import Productdetail from './pages/Productdetail';
import Cartpage from './pages/Cartpage';
import Orders from './user/Orders';
import Adminorders from './admin/Adminorders';


const App = () => {
  return (
    <div> 
    <Navbar/>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forget' element={<ForgetPassword/>}/>
      <Route path='/product/:id' element={<Productdetail/>}/>
      <Route path='/cart' element={<Cartpage/>}/>

      {/* all private route  start here */}
      {/* this new  route*/}
      <Route path='/dashboard' element={<Privateroute/>}>
        <Route path='user' element={<Userdashboard/>}/>
        <Route path='user/edit' element={<EditUser/>}/>
        <Route path='user/orders' element={<Orders/>}/>
      </Route>

      <Route path='/dashboard' element={<Adminroute/>}> 
        <Route path='admin' element={<Admindashboard/>}/>
        <Route path='admin/addproduct' element={<Addproduct/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/editproduct/:id' element={<Editproduct/>}/>
        <Route path='admin/orders/' element={<Adminorders/>}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App