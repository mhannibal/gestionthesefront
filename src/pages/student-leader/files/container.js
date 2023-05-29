import React from 'react'
import { Outlet } from 'react-router-dom'

function StudentFilesContainer() {
  return (
    <div className="w-full p-4 h-full bg-base-200">
          <Outlet />
    </div>
  )
}

export default StudentFilesContainer