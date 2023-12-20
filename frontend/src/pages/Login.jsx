import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Usercontext";

const Login = () => {


  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const[userauth,setuserauth]=useAuth()


  // login form here++++
  const login = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/login", {
      email,
      password,
    });

    if (response.status===200) {
      setuserauth({...userauth,user:response.data.user,token:response.data.token})
      localStorage.setItem('auth',JSON.stringify(response.data))

      navigate("/");

      if(response.data==='invalid email'){
        alert('please inter valid email and Password')
      }

      }
      else {
      alert(" login has been failed!!!!");
    }

  };

  return (
    <div className="login">
      <form action="" onSubmit={login}>
        <input
          type="email"
          name=""
          placeholder="Enter your email address"
          onChange={(e) => setemail(e.target.value)}
        />

        <input
          type="password"
          name=""
          placeholder="Enter your password"
          onChange={(e) => setpassword(e.target.value)}
        />

        <button type="submit">login</button>
        <Link className="fp" to={"/forget"}>forget-password</Link>
      </form>
    </div>
  );
};

export default Login;
