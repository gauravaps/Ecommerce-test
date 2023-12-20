import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminMenu from '../components/AdminMenu'
import moment from 'moment'
import { Select } from 'antd';
import { useAuth } from '../pages/Usercontext';

const { Option } = Select
 
const Adminorders = () => {
    const [status,setstatus]=useState(['Not process','Processing','Shipped','Delivered','Cancel']);
    const[orders,setorders]=useState([])
    const [userauth,setuserauth]=useAuth()

    const getOrders=async()=>{
        try {
            const {data}=await axios.get("http://localhost:8080/allorders")
            
            setorders(data)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        if(userauth?.token)getOrders();
    },[userauth?.token])


    //handelchange////

    const handelchange=async(id,value)=>{
        try {
            const {data}=await axios.put(`http://localhost:8080/orderstatus/${id}`,{status:value})
            console.log(data);
            getOrders()
            
        } catch (error) {
            console.log(error);
            
        }
    }






  return (
    <div  className='order'>
        <AdminMenu/>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Buyer</th>
                    <th>Date</th>
                    <th>Paymnet</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            {orders.map((ord,i)=>{
                return(
                    <>
                    <div className='main2' >
                        <tbody key={ord._id}>
                            <tr>
                                <td>{i+1}</td>
                                
                                <td>{<Select bordered={false} onChange={(value)=>handelchange(ord._id,value)}
                                defaultValue={ord?.status}
                                
                                >
                                    
                                        {status.map((s,i)=>{
                                            return(
                                                <>
                                                <Option key={i} value={s}>
                                                    {s}
                                                </Option>

                                                
                                                </>
                                            )
                                        })}

                                    
                                    </Select>}</td>
                                
                                <td>{ord?.buyer?.name}</td>
                                
                                <td>{moment(ord?.createdAt).fromNow()}</td>
                                
                                <td>{ord?.payment?.success?'success':'failed'}</td>
                                
                                <td>{ord?.products.length}</td>
                            </tr>
                        </tbody>
                        <div>
                            {ord?.products?.map((ord,i)=>{
                                return(
                                    <>
                                    <div key={ord._id} className='main'>
                                    <img src={`http://localhost:8080/uploads/${ord.img}`} width={100} height={100} alt="wait something wrong" />
                                    </div>
                                    <div>
                                        <p>{ord.name}</p>
                                        <p>{ord.description}</p>
                                        <p>{ord.price}</p>
                                    </div>
                                    
                                    </>
                                )
                            })}
                        </div>

                    </div>
                    
                    </>
                )
            })}
        </table>
        


    </div>
  )
}

export default Adminorders