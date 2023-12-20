import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Usecart } from './Cartcontext'
import { useAuth } from './Usercontext'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";

const Cartpage = () => {
  const [userauth,setuserauth]=useAuth();
  const [cart,setcart]=Usecart();
  const[clienttoken,setclienttoken]=useState('');
  const[instance,setinstance]=useState('');
  const navigate=useNavigate();

  const removeitem=(pid)=>{
    let mycart=[...cart];
    let index=mycart.findIndex((item)=>item._id===pid);

    mycart.splice(index,1);
    setcart(mycart)
    localStorage.setItem('cart',JSON.stringify(mycart));

    
     
  }

  const totalprice=()=>{
    try {
      let total=0;
      cart.map((item)=>{
        total=total+item.price;
      })
      return total;


      
    } catch (error) {
      console.log(error);
      
    }
  }

  const gettoken=async()=>{
    try {
      const {data}=await axios.get(`http://localhost:8080/braintree/token`); 
    
      setclienttoken(data.clientToken)
  
      
    } catch (error) {
      console.log(error);
      
    }

  }




  // payment method ..

  const handelclik=async()=>{
    try {
      const {nonce}=await instance.requestPaymentMethod()
      const {data}=await axios.post(`http://localhost:8080/braintree/payment`,{nonce,cart}
      )

      localStorage.removeItem('cart');
      setcart([]);
      alert('payment successfull');
      navigate('/dashboard/user/orders') ;
    
    
    }

    catch (error) {
      console.log(error);
      
    }

  }

  
  useEffect(()=>{
    gettoken();

  },[userauth?.token])




  return (
    <div className='cartpage'>
        <h2>
          {!userauth?.user? 'hello user':`hello' ${userauth?.token && userauth?.user.name}`}
          <p>{cart.length? `you have ${cart.length} item in your cart ${userauth?.token?'': 'please login for checkout'}`:'your cart is empty'}</p>
        </h2>
        <div className='parent-cart'>
          <div className='container'>
            {cart?.map((val)=>{
              return(
              <>
              <div className='first'>
              <img src={`http://localhost:8080/uploads/${val.img}`} width={200} height={150} alt="wait something wrong" />
              
              <div className='propad'> 
                <p><span>Product:</span>{val.name}</p>
                <p><span>Description:</span>{val.description}</p>
                <p><span>Price:</span>{val.price}</p>
                <button onClick={()=>removeitem(val._id)}>Remove item</button>
              </div>
              </div>
              
              </>
              )
            })}
          </div>
          <div className='second'>
            <h2>Cart summery</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total:{totalprice()}</h4>
            {
              userauth?.user?.address?(
                <>
                <div>
                  <h3>Current address</h3>
                  <h5>{userauth?.user?.address}</h5>
                  <button onClick={()=>navigate('/dashboard/user/edit')}>Update Address</button>
                </div>
                
                </>
              ):(
                <div>
                  {userauth?.token?(
                    <button onClick={()=>navigate('/dashboard/user/edit')} >Update Address</button>
                  ):<button onClick={()=>navigate('/login')}>Please login for checkout</button>}
                </div>
              )
            }
            
              
            
            <div>
              {!clienttoken || !userauth?.token || !cart?.length ? '':(<>
              <DropIn 
              options={
                {
                  authorization:clienttoken,
                  paypal:{
                    flow:"vault"
                  },
                }
              }
              onInstance={(instance)=>setinstance(instance)} 
              
              />
              <button disabled={!userauth?.user?.address || !instance} onClick={handelclik}>Buy Now</button>

              
              
              </>)}
            </div>

          </div>
        </div>
    </div>
  )
}

export default Cartpage