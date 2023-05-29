import React from 'react'
import { Outlet } from 'react-router-dom'

function SupervisorsContainer() {
  return (
    <div className="w-full p-4 h-full bg-base-200">
        <div className='flex flex-col m-4 '>
          <Outlet />
        </div>
    </div>
  )
}

export default SupervisorsContainer