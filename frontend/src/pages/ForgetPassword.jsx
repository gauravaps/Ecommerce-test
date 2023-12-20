import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios';

const ForgetPassword = () => {
  
  const [email, setemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [secretans,setsecretans]=useState('')
  const navigate =useNavigate()

  // forget password here+++++++

  const forget=async(e)=>{

    e.preventDefault();
    const response = await axios.post("http://localhost:8080/forgetpw", {
      email,
      newpassword,secretans
    });
 
    if (response.status===200) {
      navigate("/login");

      

      }
      else {
      alert(" password updation failed!!!!");
    }

  };

  

  return (
    <div className='login'>
      <form action="" onSubmit={forget}>
        <input
          type="email"
          name=""
          placeholder="Enter your email address"
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="text"
          name=""
          placeholder="Enter your secret answer"
          onChange={(e) => setsecretans(e.target.value)}
        />

        <input
          type="password"
          name=""
          placeholder="Enter your password"
          onChange={(e) => setnewpassword(e.target.value)}
        />

        <button type="submit">Reset password</button>
        
      </form>
    </div>
  )
}

export default ForgetPassword