import React from 'react'
import { Outlet } from 'react-router-dom'

function StudentContainer() {
  return (
    <div className="w-full p-4 h-full bg-base-200">
        <div className='flex flex-col m-4 '>
          <Outlet />
        </div>
    </div>
  )
}

export default StudentContainer