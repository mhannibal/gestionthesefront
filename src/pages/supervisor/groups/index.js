import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function SuperVisorGroupContainer() {
  const navigate = useNavigate()
  return (
    <div className="w-full p-4 h-full bg-base-200">
        <div className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body items-center flex flex-row">
              <h1 className='font-semibold '>Groups</h1>
            </div>
          </div>
        <div className='flex flex-col m-4 '>
          <Outlet />
        </div>
    </div>
  )
}

export default SuperVisorGroupContainer