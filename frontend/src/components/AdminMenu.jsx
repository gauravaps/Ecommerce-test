import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <div>
        <ul className='dashboard-ul'> 
      <div> 
        <Link to={'/dashboard/admin/orders'}>Orders</Link><br />
        <Link to={'/dashboard/admin/addproduct'}>Add product</Link><br />
        <Link to={'/dashboard/admin/products'}>Products</Link><br />
        <Link to={'/dashboard/user/edit'}>Edit profile</Link><br />
        
        </div> 
        </ul>
    </div>
  )
}

export default AdminMenu