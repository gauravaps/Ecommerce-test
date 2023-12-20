import React from 'react'
import {Link} from 'react-router-dom'


const Usermenu = () => {
    
  return (
    <div>
      <ul className='dashboard-ul'> 
      <div> 
        <Link to={'/dashboard/user/orders'}>Orders</Link><br />
        <Link to={'/dashboard/user/edit'}>Edit profile</Link>
        </div>
        </ul>
    </div>
  )
}

export default Usermenu