import React from 'react'
import { useAuth } from '../../../app/auth-context';
import { parseJwt } from '../../../service/jwt_utils';
import { useGetGroupsQuery, useGetSubjectsQuery, useGetUsersQuery } from '../../../service';
 
function AdminDashboard() {
  const authContext = useAuth();
  const subjectQuery = useGetSubjectsQuery()
  const groupQuery = useGetGroupsQuery()
  const userQuery = useGetUsersQuery()
  
  if (groupQuery.isSuccess && subjectQuery.isSuccess && userQuery.isSuccess) {
    const subjectList = subjectQuery.data   
    const confirmed_subjects = subjectList.filter(s => s.is_confirmed)

    const studentList = userQuery.data.filter(u => u.type == 'STUDENT')
    const studentListConfirmed = studentList.filter(u => u.is_active)
    
    const supervisorList = userQuery.data.filter(u => u.type == 'SUPERVISOR')
    const supervisorConfirmed = supervisorList.filter(u => u.is_active)
    

     return (
      <div className="w-full p-8 bg-base-200">
        <h1 className='font-semibold text-2xl mb-5'>Dashboard</h1>
        
        <div className=' flex flex-row gap-4'>
          {/* Subjects  */}
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Subjects</h2>
              <p>Total count <span className='font-semibold text-lg'>{subjectList.length}</span></p>
              <p>Confirmed   <span className='font-semibold text-lg'>{confirmed_subjects.length}</span></p>
              <p>Unconfirmed   <span className='font-semibold text-lg'>{subjectList.length - confirmed_subjects.length}</span></p>
            </div>
          </div>
          {/* Students  */}
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Students</h2>
              <p>Total count <span className='font-semibold text-lg'>{studentList.length}</span></p>
              <p>Confirmed   <span className='font-semibold text-lg'>{studentListConfirmed.length}</span></p>
              <p>Unconfirmed   <span className='font-semibold text-lg'>{studentList.length - studentListConfirmed.length}</span></p>
            </div>
          </div>

          {/* Supervisors  */}
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Supervisors</h2>
              <p>Total count <span className='font-semibold text-lg'>{supervisorList.length}</span></p>
              <p>Confirmed   <span className='font-semibold text-lg'>{supervisorConfirmed.length}</span></p>
              <p>Unconfirmed   <span className='font-semibold text-lg'>{supervisorList.length - supervisorConfirmed.length}</span></p>
            </div>
          </div>

     


        </div>

      </div>
      
    )
  }
}

export default AdminDashboard