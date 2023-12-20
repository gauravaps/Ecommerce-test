import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Usecart } from './Cartcontext'



const Homepage = () => {
  
  const [product,setproduct]=useState([])
  const navigate=useNavigate();
  const[cart,setcart]=Usecart()

  //Add to cart ...
  async function addtocart(val){
    setcart([...cart,val])
    localStorage.setItem('cart',JSON.stringify([...cart,val]))
    alert('item added to cart')
    


  }



  async function allproduct(){
    const response=await axios.get("http://localhost:8080/allproduct");
    console.log(response);
    if(response.status ===200){
      setproduct(response.data.products);


    }
  }
  useEffect(()=>{
    allproduct(); 
  },[])

  
  return (
    <div className='parent'>
      {product.map((val)=>{
      return(
        <>
        <div key={val._id} className='child'> 
        <img src={`http://localhost:8080/uploads/${val.img}`} width={200} height={150} alt="wait something wrong" />
        
        <p>{val.description}</p>
        <h3><span>Price₹:</span>{val.price}</h3>
        <button className='morebtn' onClick={()=>navigate(`/product/${val._id}`)}>More detail</button>
        <img src="" alt="" />
        <button className='cartbtn' onClick={()=>addtocart(val)}>Add to Cart</button>
        </div>
        </>
        )
      })}
        
    </div> 
  )
}

export default Homepage