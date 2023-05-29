import DocumentPlusIcon from '@heroicons/react/24/outline/DocumentPlusIcon'
import React from 'react'
import { Outlet } from 'react-router-dom'

function GroupContainer() {
  return (
    <div className="w-full p-4 h-full bg-base-200">
          <Outlet />
    </div>
  )
}

export default GroupContainer