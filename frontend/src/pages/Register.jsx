import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [secretans, setsecretans] = useState("");
  const [address, setaddress] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/register", {
      name,
      email,
      phone,
      password,
      secretans,
      address,
    });

    if (response.status === 200) {
      navigate("/login");
    } else {
      alert("your registration has been failed!!!!");
    }
  };

  return (
    <div className="register">
      <form action="" onSubmit={register}>
        <input
          type="text"
          name=""
          placeholder="Enter your name"
          onChange={(e) => setname(e.target.value)}
        />

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

        <input
          type="number"
          name=""
          placeholder="Enter your phone number"
          onChange={(e) => setphone(e.target.value)}
        />

        <input
          type="text"
          name=""
          placeholder="Enter your secret answer"
          onChange={(e) => setsecretans(e.target.value)}
        />

        <input
          type="text"
          name=""
          placeholder="Enter your address"
          onChange={(e) => {
            setaddress(e.target.value);
          }}
        />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default Register;
