import React from 'react'
import AdminMenu from '../components/AdminMenu'
import { useAuth } from '../pages/Usercontext'

const Admindashboard = () => {
  const [userauth,setuserauth]=useAuth()
  return (
    <div className='dashboard'>
      <AdminMenu/> 

      <div className='user-details'>  
      <h3><span>Name:</span> {userauth?.user?.name} </h3>
      <h3><span>Email:</span> {userauth?.user?.email} </h3>
      <h3><span>phone:</span>{userauth?.user?.phone}</h3>
      <h3><span>Address:</span>{userauth?.user?.address} </h3>
      </div>

    </div>
  )
}

export default Admindashboard