import DocumentPlusIcon from '@heroicons/react/24/outline/DocumentPlusIcon'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function SubjectContainer() {
  const navigate = useNavigate()
  const handleAddSupervisorClick = () => {
    navigate('/app/subjects/add')
  }
  return (
    <div className="w-full p-4 h-full bg-base-200">
        <div className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body items-center flex flex-row">
              <h1 className='font-semibold '>Subjects</h1>
              <button 
                onClick={handleAddSupervisorClick}
                className="btn btn-success btn-circle">
                <DocumentPlusIcon className={`h-6 w-6`}/>
              </button>
            </div>
          </div>
        <div className='flex flex-col m-4 '>
          <Outlet />
        </div>
    </div>
  )
}

export default SubjectContainer