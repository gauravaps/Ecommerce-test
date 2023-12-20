import React, { useEffect, useState } from 'react'
import Usermenu from '../components/Usermenu'
import axios from 'axios'
import { useAuth } from '../pages/Usercontext'
import moment from 'moment';


const Orders = () => {
    const [order,setorders]=useState([]);
    const [userauth,setuserauth]=useAuth();

    const getOrders=async()=>{
        try {
            const {data}=await axios.get("http://localhost:8080/userorders");
            console.log(data);
            setorders(data);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        if(userauth?.token)getOrders()
    },[userauth?.token])


  return (
    <div className='order'>
        <Usermenu/>
        <h1>All orders</h1>
        <table>
            <thead>
                <tr>
                    <th>*</th>
                    <th>Status</th>
                    <th>Buyer</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            {
                order?.map((ord,i)=>{
                 return( 
                    <> 
                    <div className='main2'>  
                    
                        <tbody>
                            <tr>
                                
                                <td>{i+1}</td>
                                <td>{ord?.status}</td>
                                <td>{ord?.buyer?.name}</td> 
                                <td>{moment(ord?.createdAt).fromNow()}</td>
                                <td>{ord?.payment.success?"success":"failed"}</td>
                                <td>{ord?.products?.length}</td>
                            </tr>
                        </tbody>
                        {ord?.products?.map((pro,i)=>{
                            return(
                                <>
                                <div key={pro._id} className='main'> 
                                <div>
                                <img src={`http://localhost:8080/uploads/${pro.img}`} width={100} height={100} alt="wait something wrong" />
                                </div>
                                <div className='pro'>  
                                    <p>{pro.name}</p>
                                    <p>{pro.description}</p>
                                    <p>{pro.price}</p>
                                </div>

                                </div>
                                </>
                            )
                        })}
                    
                        </div>
                
                </>
                   )

                })

            }
        </table>
    </div> 
  )
}
 
export default Orders