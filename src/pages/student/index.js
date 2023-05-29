import DocumentPlusIcon from '@heroicons/react/24/outline/DocumentPlusIcon'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function StudentGroupContainer() {
  const navigate = useNavigate()
  const handleAddSupervisorClick = () => {
    navigate('/app/subjects/add')
  }
  return (
    <div className="w-full p-4 h-full bg-base-200">
          <Outlet />
    </div>
  )
}

export default StudentGroupContainer