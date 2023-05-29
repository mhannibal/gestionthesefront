import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon';
import { useGetGroupsQuery, useGetStudentProfilesQuery, useGetSubjectsQuery, useGetUsersQuery, useUpdateGroupMutation, useUpdateStudentProfileMutation } from '../../service';
import { parseJwt } from '../../service/jwt_utils';
import { useAuth } from '../../app/auth-context';
import CheckBadgeIcon from '@heroicons/react/24/outline/CheckBadgeIcon';


function StudentGroupEdit() {
  const [updateStudentProfile] = useUpdateStudentProfileMutation();
  const groupsQuery = useGetGroupsQuery()
  const studentProfileQuery = useGetStudentProfilesQuery()
  const supervisorsQuery = useGetUsersQuery();
  const authContext = useAuth()
  const student_id = parseJwt(authContext.accessToken).user_id;
  const navigate = useNavigate()
  const group_id = studentProfileQuery.isSuccess ? studentProfileQuery.data.filter(e => e.user == student_id)[0].group : null;
  const my_group = groupsQuery.isSuccess ? groupsQuery.data.filter(g => g.id == group_id)[0] : null;
  const userQuery = useGetUsersQuery();

  const selectRef = useRef(null);
  const handleSubmit = data => {
    debugger
    updateStudentProfile({
      id: studentProfileQuery.data.filter(e => e.user == student_id)[0].id,
      group: selectRef.current.value
    }).unwrap()
      .then(fulfilled => {
        // navigate('/app/accounts')
      })
      .catch(rejected => console.error(rejected))
  }



  if (groupsQuery.isSuccess &&
    studentProfileQuery.isSuccess &&
    supervisorsQuery.isSuccess && 
    userQuery.isSuccess
  ) {
    const studentIdsInGroup = studentProfileQuery.data.filter(sp => sp.group == my_group.id).map(s => s.user)
    const studentList = userQuery.data.filter(s => studentIdsInGroup.includes(s.id)).map(s => <li>{s.first_name} {s.last_name}</li>)

    return (
      <>
        <div className="card bg-base-100 shadow-xl mb-4 ">
          <div className="card-body items-center flex flex-row">
            <UserPlusIcon className={`h-6 w-6`} />
            <h1 className='font-semibold '>Edit Group Informations</h1>
          </div>
        </div>
        <div className='flex flex-col gap-4 items-center justify-center '>
          {!my_group && (
            <div className="alert alert-warning shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>You are not assigned to a group , please chose a group</span>
              </div>
            </div>
          )}
          {my_group && (
            <div className="card bg-base-100 shadow-xl w-full max-w-xs">
              <div className="card-body">
                <h1 className='font-semibold'>Group Informations</h1>
                <p>Your group name : {my_group.name}</p>
              </div>
            </div>
          )}

          <div className="card bg-base-100 shadow-xl w-full max-w-xs">
            <div className="card-body">
              <h1 className='font-semibold'>Group Edit</h1>
              <div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Pick a group to join</span>
                  </label>
                  <select className="select select-bordered" ref={selectRef}>
                    <option disabled selected>Pick one</option>
                    {groupsQuery.data.filter(g => g.is_confirmed).map(g => (
                      <option key={g.id} value={g.id} selected={(my_group && g.id == my_group?.id) ? true : false}>{g.name}</option>
                    ))}
                  </select>
                </div>
                <input type="submit" onClick={handleSubmit} className="btn btn-primary  w-full max-w-xs my-2" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body">
              <h1 className='font-semibold'>Members</h1>
              <ul>
                {studentList}
              </ul>
            </div>
          </div>

        </div>
      </>
    )
  }
}

export default StudentGroupEdit