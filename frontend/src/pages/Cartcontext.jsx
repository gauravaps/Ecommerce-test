import React,{createContext,useContext, useEffect, useState} from 'react'

const Cartcontext=createContext();
const Cartprovider = ({children}) => {
    
    
    const[cart,setcart]=useState([])
    useEffect(()=>{
        let existitem=localStorage.getItem('cart')
        if(existitem) setcart(JSON.parse(existitem));

    },[])

  return (
    <Cartcontext.Provider value={[cart,setcart]}>
        {children}
    </Cartcontext.Provider>
  )
}
//custom hook...

const Usecart=()=>useContext(Cartcontext)
export { Cartprovider,Usecart}