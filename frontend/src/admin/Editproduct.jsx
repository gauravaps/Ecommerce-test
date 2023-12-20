import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom'

const Editproduct = () => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setquantity] = useState("");
  const [img, setimg] = useState("");
  const [photo,setphoto]=useState('')
  const navigate=useNavigate()
  const {id}=useParams();

  const singleproduct=async()=>{
    
    const {data}=await axios.get(`http://localhost:8080/singleproduct/${id}`)
    setname(data.product.name)
    setdescription(data.product.description)
    setcategory(data.product.category)
    setprice(data.product.price)
    setquantity(data.product.quantity)
    setphoto(data.product.img)


  }

  useEffect(()=>{
    singleproduct();

  },[img])




  const Addproducts=async(e)=>{
    e.preventDefault()
    const productdata=new FormData()
    productdata.append('name',name)
    productdata.append('description',description)
    productdata.append('category',category)
    productdata.append('price',price)
    productdata.append('quantity',quantity)
    productdata.append('img',img || photo)
const response=await axios.put(`http://localhost:8080/editproduct/${id}`,productdata)
    if(response.status===200){
        navigate('/dashboard/admin/products')
    }
    else{
        alert('product edit failed please check ')
    }
  }
  return (
    <div className="addproduct">
      <form  onSubmit={Addproducts}>
        <input
          type="text"
          value={name}
          placeholder="Enter product name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Enter product description"
          onChange={(e) => setdescription(e.target.value)}
        />
        <input
          type="text"
          value={category}
          placeholder="Enter product category"
          onChange={(e) => setcategory(e.target.value)}
        />
        <input
          type="number"
          value={price}
          placeholder="Enter product price"
          onChange={(e) => setprice(e.target.value)}
        />
        <input
          type="number"
          value={quantity}
          placeholder="Enter product quantity"
          onChange={(e) => setquantity(e.target.value)}
        />
        <input type="file"  onChange={(e) => setimg(e.target.files[0])} />
        <button>Edit product</button>
      </form>
    </div>
  );
};


export default Editproduct