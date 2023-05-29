import React from 'react'
import { useDeleteUserMutation, useGetStudentProfilesQuery, useGetUsersQuery, useUpdateUserMutation } from '../../../service'
import UserMinusIcon from '@heroicons/react/24/outline/UserMinusIcon'
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import { useNavigate } from 'react-router-dom'
import CheckBadgeIcon from '@heroicons/react/24/outline/CheckBadgeIcon'
import { toast } from 'react-toastify'



function Accounts() {
  const usersQuery = useGetUsersQuery();
  const navigate  = useNavigate()
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const studentProfileQuery = useGetStudentProfilesQuery()
  const handelDeletClick = (id) => {
    deleteUser(id)
    .unwrap()
    .then(fulfilled => {
      notifySuccess('Successfully Deleted the user')
    })
    .catch(rejected => {
      console.error(rejected)
      notifyError('Error  when Deleteing the user')
    })
  }
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

  const handelIsActiveClick = (id, is_active) => {

    updateUser({
      id,
      is_active
    })
    .unwrap()
    .then(fulfilled => {
      notifySuccess('Successfully changed is active for the user')
    })
    .catch(rejected => {
      console.error(rejected)
      notifyError('Error  when changeing is active for the user')
    })
  }

  if(usersQuery.isSuccess && studentProfileQuery.isSuccess) {
    const students = usersQuery.data.filter(u=>u.type === "STUDENT").map(
      (e, index)=> {
        const profile = studentProfileQuery.data.filter(p=> p.user == e.id)[0];
        
      return (
        <tr key={index}>
          <th>{index}</th>
          <td>{e.first_name} {e.last_name}</td>
          <td>{e.email}</td>
          <td>{profile?.is_group_leader?'Leader':''}</td>
          <td>
            {
              e.is_active ?
              <CheckBadgeIcon color='green' width={32} /> :
              <CheckBadgeIcon color='red' width={32} />
            }
          </td>
          
          <td>
          <div className="btn-group">
            <button 
              title='Delete Student'
              className="btn btn-error "
              onClick={()=>{handelDeletClick(e.id)}} >
                <UserMinusIcon className={`h-6 w-6`} />
              </button>
            <button 
              title='Edit Student Info'
              className="btn btn-info "
              onClick={()=>{
                navigate(`/app/students/edit/${e.id}`);
              }} >
              <PencilSquareIcon className={`h-6 w-6`} />
            </button>
            <button
              title='Confirm/uncofirm account'
              onClick={()=>{
                handelIsActiveClick(e.id, !e.is_active)
              }} 
              className="btn btn-warning ">
              <CheckBadgeIcon className={`h-6 w-6`} />
            </button>
          </div>
          </td>
        </tr>
      )
      }
    )
    const supervisors = usersQuery.data.filter(u=>u.type === "SUPERVISOR").map(
      (e, index)=> {
      return (
        <tr key={index}>
          <th>{index}</th>
          <td>{e.first_name} {e.last_name}</td>
          <td>{e.email}</td>
          <td>{
            e.is_active ?
            <CheckBadgeIcon color='green' width={32} />:
            <CheckBadgeIcon color='red' width={32} />
            }
          </td>
          <td>
          <div className="btn-group">
            <button 
              title='Delete Supervisor'
              className="btn btn-error "
              onClick={()=>{handelDeletClick(e.id)}} >
              <UserMinusIcon className={`h-6 w-6`} />
            </button>
            <button 
              title='Edit Supervisor Info'
              onClick={()=>{
                navigate(`/app/supervisors/edit/${e.id}`);
              }} 
              className="btn btn-info ">
              <PencilSquareIcon className={`h-6 w-6`} />
            </button>
            <button 
              title='Confirm/uncofirm account'
              onClick={()=>{
                handelIsActiveClick(e.id, !e.is_active)
              }} 
              className="btn btn-warning ">
              <CheckBadgeIcon className={`h-6 w-6`} />
            </button>
          </div>
          </td>
        </tr>
      )
      }
    )

    const handleAddStudentClick = () => {
      console.log('add student click');
      navigate('/app/students/add')

    }
    

    const handleAddSupervisorClick = () => {
      console.log('add supervisor click');
      
      navigate('/app/supervisors/add')
    }
    return (
      <div className="w-full p-4 h-full bg-base-200 overflow-y-scroll">
        <div className='flex flex-col m-4 '>
          <div className="card bg-base-100 shadow-xl mb-4">
           <div className="card-body items-center flex flex-row">
              <h1 className='font-semibold '
              onClick={()=>notifySuccess('Hello')}
              >Students</h1>
              <button 
                onClick={handleAddStudentClick}
                className="btn btn-success btn-circle">
                <UserPlusIcon className={`h-6 w-6`}/>
              </button>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
            <table className="table w-full">
               <thead>
                <tr>
                  <th></th>
                  <th>ful name</th>
                  <th>email</th>
                  <th>Groupe Leader</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students}
              </tbody>
              </table>
             </div>
          </div>
          
        </div>
        <div className='flex flex-col m-4 '>
        <div className="card bg-base-100 shadow-xl mb-4">
          <div className="card-body items-center flex flex-row">
            <h1 className='font-semibold '>Supervisor</h1>
            <button 
              onClick={handleAddSupervisorClick}
              className="btn btn-success btn-circle">
              <UserPlusIcon className={`h-6 w-6`}/>
            </button>
          </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
            <table className="table w-full">
               <thead>
                <tr>
                  <th></th>
                  <th>ful name</th>
                  <th>email</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {supervisors}
              </tbody>
              </table>
             </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Accounts
