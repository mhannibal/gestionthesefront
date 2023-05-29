import React, { useEffect } from 'react'
import { useAuth } from '../../app/auth-context';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const authContext = useAuth();
  const navigate = useNavigate()
  const handleClick = () => {
    authContext.signOut();
    navigate('/')
  
  }
  return (
    <div className="hero h-full bg-base-200">
      <button className='btn btn-warning' onClick={handleClick}>Are you sure Exit</button>
    </div>
  )
}

export default Logout