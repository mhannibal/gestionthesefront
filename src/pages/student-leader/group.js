import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon';
import { useGetGroupsQuery, useGetStudentProfilesQuery, useGetSubjectsQuery, useGetUsersQuery, useUpdateGroupMutation } from '../../service';
import { parseJwt } from '../../service/jwt_utils';
import { useAuth } from '../../app/auth-context';
import CheckBadgeIcon from '@heroicons/react/24/outline/CheckBadgeIcon';
import { toast } from 'react-toastify';


function GroupEdit() {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [updateGroup] = useUpdateGroupMutation();
  const groupsQuery = useGetGroupsQuery()
  const studentProfileQuery = useGetStudentProfilesQuery()
  const supervisorsQuery = useGetUsersQuery();
  const authContext = useAuth()
  const student_id = parseJwt(authContext.accessToken).user_id;
  const navigate = useNavigate();
  
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

  const group_id = studentProfileQuery.isSuccess ? studentProfileQuery.data.filter(e => e.user == student_id)[0].group : null;
  const my_group = groupsQuery.isSuccess ? groupsQuery.data.filter(g => g.id == group_id)[0] : null;
  const userQuery = useGetUsersQuery();

  useEffect(() => {
    if (groupsQuery.isSuccess && studentProfileQuery.isSuccess) {
      reset(formValues => ({
        ...groupsQuery.data.filter(e => e.id == group_id)[0]
      }))
    }
  }, [
    groupsQuery.isSuccess,
    reset,
    groupsQuery.data,
    studentProfileQuery.isSuccess,
    studentProfileQuery.data,

    group_id,
    my_group
  ]
  )



  const onSubmit = data => {
    updateGroup({
      ...data,
    }).unwrap()
      .then(fulfilled => {
        notifySuccess('Group Changed Successfuly')
        // navigate('/app/accounts')
      })
      .catch(rejected => {
        notifyError('Error while Subject Changing ')
        console.error(rejected)}
      )
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
          <div className="card bg-base-100 shadow-xl w-full max-w-xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} className='items-center flex flex-col'>

                <div className="form-control w-full max-w-xl">
                  <h1 className='font-semibold'>Group Informations</h1>
                  <label className="label">
                    <span className="label-text">whats the group name</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="name"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xl" />
                  {errors.name && <span className='text-red-400'>This field is required</span>}
                </div>

                <div className="form-control w-full max-w-xl">
                  <label className="label">
                    <span className="label-text">Confirmed by the supervisor</span>
                  </label>

                  {
                    my_group && my_group.is_confirmed ?
                      <CheckBadgeIcon title='Confirmed By supervisor' color='green' width={32} /> :
                      <CheckBadgeIcon title='Not yet Confirmed By supervisor' color='red' width={32} />
                  }
                </div>

                <input type="submit" className="btn btn-primary  w-full max-w-xl my-2" />
              </form>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl mb-4 w-1/2">
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

export default GroupEdit