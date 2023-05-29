import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useGetFilesQuery, useGetGroupsQuery, useGetStudentProfilesQuery, useGetSubjectsQuery, useGetUsersQuery, useUpdateGroupMutation } from '../../../service';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../app/auth-context';
import { parseJwt } from '../../../service/jwt_utils';
import CheckBadgeIcon from '@heroicons/react/24/outline/CheckBadgeIcon';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import { toast } from 'react-toastify';


function SupervisorGroupEdit() {
  const [updateGroup] = useUpdateGroupMutation();
  const navigate = useNavigate()
  const { id } = useParams()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const subjectQuery = useGetSubjectsQuery();
  const groupQuery = useGetGroupsQuery();
  const userQuery = useGetUsersQuery();
  const studentProfilesQuery = useGetStudentProfilesQuery();
  const filesQuery = useGetFilesQuery();
  const notifySuccess = (str) => toast(str, { type: 'success' });
  const notifyError = (str) => toast(str, { type: 'error' });


  const handeConfirmationClick = (id, is_confirmed) => {
    updateGroup({
      id,
      is_confirmed
    }).unwrap()
      .then(fulfilled => {
        //navigate('/app/groups')
        notifySuccess('Groupe confirmation Changed Successfuly')
      })
      .catch(rejected => {
        console.error(rejected)
        notifyError('Error while changing the Groupe confirmation Changed')
      });
  }

  useEffect(()=>{
    if(userQuery.isSuccess) {
      const my_group = groupQuery.data.filter(g => g.id == id)[0];

      reset({
        results: my_group.results,
      })
    }
  }, 
  [])
  const onSubmit = data => {
    debugger
     updateGroup({
      ...data,
      id:id,
    }).unwrap()
    .then(fulfilled => {
      //navigate('/app/subjects')
      notifySuccess('Result Changed Successfuly')
    })
    .catch(rejected => {
      console.error(rejected)
      notifyError('Error While  changing Froup result')
    }); 
  }

  if (subjectQuery.isSuccess && groupQuery.isSuccess && userQuery.isSuccess && studentProfilesQuery.isSuccess && filesQuery.isSuccess) {
    const my_group = groupQuery.data.filter(g => g.id == id)[0];
    const my_subject = subjectQuery.data.filter(s => s.id == my_group.subject)[0]
    const studentIdsInGroup = studentProfilesQuery.data.filter(sp => sp.group == my_group.id).map(s => s.user)
    const studentList = userQuery.data.filter(s => studentIdsInGroup.includes(s.id)).map(s => <li>{s.first_name} {s.last_name}</li>)

    const my_files = filesQuery.data.filter(f => f.group == id)
    const filesComponent = my_files.map(
      (e, index) => {
        return (
          <tr key={index}>
            <th>{index}</th>
            <td>{e.name}</td>
            <td>{e.is_confirmed ?
              <CheckBadgeIcon color='green' width={32} /> :
              <CheckBadgeIcon color='red' width={32} />}</td>
            <td>
              <div className="btn-group">
                <a href={e.file} without rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-info" label="file">
                    <PencilSquareIcon className={`h-6 w-6`} />
                  </button>
                </a>
              </div>
            </td>
          </tr>
        )
      }
    );

    return (
      <>
        <div className='flex felx-row gap-2'>
          <div className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body">
              <h1 className='font-semibold'>Group name</h1>
              <h3>{my_group.name}</h3>
              <h1 className='font-semibold'>Subject</h1>
              <h3>{my_subject.title}</h3>

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
          <div className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body">
              <h1 className='font-semibold'>is confirmed ?</h1>
              {my_group.is_confirmed ?
                <CheckBadgeIcon color='green' width={32} /> :
                <CheckBadgeIcon color='red' width={32} />
              }
              <h3>{my_group.is_confirmed}</h3>
              <button
                title={`${my_group.is_confirmed ? 'Uncofirm group' : 'Confirm group'}`}
                onClick={() => {
                  handeConfirmationClick(my_group.id, !my_group.is_confirmed)
                }}
                className="btn btn-warning ">
                <CheckBadgeIcon className={`h-6 w-6`} />
                {`${my_group.is_confirmed ? 'Uncofirm group' : 'Confirm group'}`}
              </button>
            </div>
          </div>
        </div>


        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>title</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filesComponent}
              </tbody>
            </table>
          </div>
        </div>

          <div className="card bg-base-100 shadow-xl my-4">
            <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
      
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">What is the subject title?</span>
                </label>
                <input 
                  {...register("results", { required: true })}
                  type="text" 
                  placeholder="Enter Result exemple 15/20" 
                  className="input input-bordered w-full max-w-xs" />
                {errors.results && <span className='text-red-400'>This field is required</span>}
              </div>
              <input type="submit" className="btn btn-primary  w-full max-w-xs my-2" />
            </form>
            </div>
          </div>

      </>

    )
  }

}

export default SupervisorGroupEdit;

