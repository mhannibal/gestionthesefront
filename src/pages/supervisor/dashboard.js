import React from 'react'
import { useAuth } from '../../app/auth-context';
import { parseJwt } from '../../service/jwt_utils';
import { useGetGroupsQuery, useGetSubjectsQuery } from '../../service';

function SupervisorDashboard() {
  const authContext = useAuth();
  const user_id = parseJwt(authContext.accessToken).user_id
  const subjectQuery = useGetSubjectsQuery()
  const groupQuery = useGetGroupsQuery()
  
  if (groupQuery.isSuccess && subjectQuery.isSuccess) {
    const subjectList = subjectQuery.data.filter(s=>s.supervisor == user_id)
    const subjectListIDs = subjectList.map(e=> e.id);
    const confirmed_subjects = subjectList.filter(s => s.is_confirmed)
    
    const groupList = groupQuery.data.filter(e=>subjectListIDs.includes(e.subject))
    const confirmed_groups = groupList.filter(g => g.is_confirmed)
    return (
      <div className="w-full p-8 bg-base-200">
        <h1 className='font-semibold text-2xl mb-5'>Dashboard</h1>
        
        <div className=' flex flex-row gap-4'>
          
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">My subjects</h2>
              <p>Total count <span className='font-semibold text-lg'>{subjectList.length}</span></p>
              <p>Confirmed  subjects <span className='font-semibold text-lg'>{confirmed_subjects.length}</span></p>
              <p>Unconfirmed  subjects <span className='font-semibold text-lg'>{subjectList.length - confirmed_subjects.length}</span></p>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">My Groups</h2>
              <p>Total count <span className='font-semibold text-lg'>{groupList.length}</span></p>
              <p>Confirmed  subjects <span className='font-semibold text-lg'>{confirmed_groups.length}</span></p>
              <p>Unconfirmed  subjects <span className='font-semibold text-lg'>{groupList.length - confirmed_groups.length }</span></p>
            </div>
          </div>


        </div>

      </div>
      
    )
  }
}

export default SupervisorDashboard