import React, { useEffect } from 'react'
import { useState,createContext,useContext } from 'react'
import axios from 'axios'
const Authcontext=createContext()


const Usercontext = ({children}) => {
    
    const [userauth,setuserauth]=useState({
        user:null,
        token:''
    })
    // default authorization++++
    axios.defaults.headers.common['Authorization']=userauth?.token



    useEffect(()=>{
      const userData=localStorage.getItem('auth')
      if(userData){
      const parseData=JSON.parse(userData)
      setuserauth({...userauth,user:parseData.user,token:parseData.token})
      }

    },[])

  return (
    <div>
<Authcontext.Provider value={[userauth,setuserauth]}>
    {children}
</Authcontext.Provider>

    </div>
  )
}
// custom hook

const useAuth=()=>useContext(Authcontext)
export{useAuth ,Usercontext}