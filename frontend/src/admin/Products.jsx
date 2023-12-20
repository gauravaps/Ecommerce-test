import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminMenu from '../components/AdminMenu'
import { useNavigate } from 'react-router-dom'

const Products = () => {
  const [Product,setProduct]=useState([])
  const navigate=useNavigate()
  

   async function  productdelete(id){
    const response=await axios.delete(`http://localhost:8080/deleteproduct/${id}`)
    if(response.status ===200){
      allproduct();
    }
    else{
      alert('product not deleted')
    }
  }

  const allproduct=async()=>{
    const response=await axios.get("http://localhost:8080/allproduct");
    if(response.status===200){
      setProduct(response.data.products)
    }

  }
  useEffect(()=>{
    allproduct()
     

  },[])
  return (
    <div className='adminmenu'>
      <AdminMenu/>
      
      <table>
        <thead>
          <tr className='thead'>
            <th>S.no</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Img</th>
            <th className='action-btn'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            Product.map((val,ind)=>(
                <tr className='tbody-child'> 
                  <td>{ind+1}</td>
                  <td>{val.name}</td>
                  <td>{val.category}</td>
                  <td>{val.description}</td>
                  
                  <td>{val.price}</td>
                  <td>{val.quantity}</td>
                  <td> 
                  <img src={`http://localhost:8080/uploads/${val.img}`} width={100} alt="wait something wrong" />
                  </td>
                  
                  <td >
                   <button className='product-btnE' onClick={()=>navigate(`/dashboard/admin/editproduct/${val._id}`)} > Edit</button> 
                   
                    <button className='product-btn' onClick={()=>productdelete(val._id)}>Delete</button>
                  </td>

              
              </tr>
              
            ))

          }
        </tbody>
      </table>
      </div>
  )
}

export default Products  