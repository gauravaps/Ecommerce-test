import React, { useEffect, useState } from "react";
import { useAuth } from "../pages/Usercontext";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const EditUser = () => {
  const [userauth, setuserauth] = useAuth();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const navigate=useNavigate()

  const updateUser=async(e)=>{
    e.preventDefault()
    const {data}=await axios.put("http://localhost:8080/edit",{name,email,phone,address})
    
    if(data){
      setuserauth({...userauth,user:data?.updateUser});
      let Ls=localStorage.getItem('auth')
      Ls=JSON.parse(Ls);
      Ls.user=data;
      localStorage.setItem('auth',JSON.stringify(Ls));

      if(userauth?.user?.role===1){
        navigate('/dashboard/admin')

      }
      else{
        navigate('/dashboard/user')
      }
      
    }
    
     
  } 
  

  useEffect(() => {
    const { name, email, phone, address } = userauth.user;
    setname(name);
    setemail(email);
    setphone(phone);
    setaddress(address);
  }, [userauth?.user]);

  return (
    <div className="edituser">
      <form  onSubmit={updateUser}>
        <input
          type="text"
          value={name}
          placeholder="enter your name"
          onChange={e => setname(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="enter your email"
        disabled
          onChange={e => setemail(e.target.value)}
        />
        <input
          type="text"
          value={phone}
          placeholder="enter your phone"
          onChange={e => setphone(e.target.value)}
        />
        <input
          type="text"
          value={address}
          placeholder="enter your address"
          onChange={e => setaddress(e.target.value)}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
