import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon';
import { useGetGroupsQuery, useGetStudentProfilesQuery, useGetSubjectsQuery, useGetUsersQuery, useUpdateGroupMutation } from '../../service';
import { parseJwt } from '../../service/jwt_utils';
import { useAuth } from '../../app/auth-context';
import { toast } from 'react-toastify';

function GroupSujectEdit() {
  const { reset, formState: { errors } } = useForm();
  const [updateGroup] = useUpdateGroupMutation();
  const groupsQuery = useGetGroupsQuery()
  const studentProfileQuery = useGetStudentProfilesQuery()
  const supervisorsQuery = useGetUsersQuery();
  const subjectsQuery = useGetSubjectsQuery();
  const authContext = useAuth()
  const student_id = parseJwt(authContext.accessToken).user_id;
  const navigate = useNavigate()
  const selectRef = useRef(null);
  const group_id = studentProfileQuery.isSuccess ? studentProfileQuery.data.filter(e => e.user == student_id)[0].group : null;
  const my_group = groupsQuery.isSuccess ? groupsQuery.data.filter(g => g.id == group_id)[0] : null;
  const radioGroupRef = useRef();
  const [supervisorSubjectsList, setSupervisorSubjectsList] = useState([])

    
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

  useEffect(() => {
    if (groupsQuery.isSuccess && studentProfileQuery.isSuccess && subjectsQuery.isSuccess && supervisorsQuery.isSuccess) {
      reset(formValues => ({
        ...groupsQuery.data.filter(e => e.id == group_id)[0]
      }))
      if (my_group?.subject) {
        
        setSupervisorSubjectsList(subjectsQuery.data.filter(s => (s.supervisor == supervisorsQuery?.data[0].id) && s.is_confirmed));
      }
    }
  }, [
    groupsQuery.isSuccess,
    reset,
    groupsQuery.data,
    studentProfileQuery.isSuccess,
    studentProfileQuery.data,
    subjectsQuery.isSuccess,
    subjectsQuery.data,
    group_id,
    my_group
  ]
  )


  const [subjID, setSubjID] = useState(null)

  const onOptionChange = e => {
    setSubjID(e.target.value)
  }

  const handleSelectSupervisor = (e) => {
    console.log(selectRef.current.value);
    setSupervisorSubjectsList(subjectsQuery.data.filter(e => e.supervisor == selectRef.current.value  && e.is_confirmed))
  }
  const onSubmit = data => {
    
    updateGroup({
      ...my_group,
      subject: subjID,
    }).unwrap()
      .then(fulfilled => {
        // navigate('/app/accounts')
        notifySuccess('Supervisor Changed Successfuly')

      })
      .catch(rejected =>  {
        notifyError('Error while Supervisor Changeing')
        console.error(rejected)
      }
      )
  }

  if (groupsQuery.isSuccess &&
    studentProfileQuery.isSuccess &&
    supervisorsQuery.isSuccess &&
    subjectsQuery.isSuccess
  ) {

    const selectedSubject = subjectsQuery.data.filter(s => s.id == my_group.subject)[0]
    const selectedSupervisor = supervisorsQuery.data.filter(e => e.id == selectedSubject?.supervisor)[0]
 

    return (
      <>
        <div className="card bg-base-100 shadow-xl mb-4 ">
          <div className="card-body items-center flex flex-row">
            <UserPlusIcon className={`h-6 w-6`} />
            <h1 className='font-semibold '>Choose Supervisor</h1>
          </div>
        </div>
        <div className='flex flex-col gap-4 items-center justify-center '>

          {
          selectedSubject && selectedSupervisor &&  (<div className="card bg-base-100 shadow-xl w-full max-w-xl mb-4">
            <div className="card-body">
              <div className='mt-8 items-center flex flex-col'>
                <h1 className='font-bold'>Current Supervisor & subject Informations</h1>
                <div>
                  <h2 className='font-semibold'>your current selected supervisor :</h2>
                  {`${selectedSupervisor.first_name} ${selectedSupervisor.last_name}`}
                  <h2 className='font-semibold'>your current selected Subject is :</h2>
                  {selectedSubject.title}
                </div>
              </div>
            </div>
          </div>) 
          }
          <div className="card bg-base-100 shadow-xl w-full max-w-xl">
            <div className="card-body">
              <div className='mt-8 items-center flex flex-col'>
                <h1 className='font-semibold'>Change Supervisor & subject Informations</h1>
                <div className="form-control w-full max-w-xl">
                  <label className="label">
                    <span className="label-text">Choose a supervisor</span>
                  </label>
                  <select className="select select-bordered" onChange={handleSelectSupervisor} ref={selectRef}>
                    <option disabled selected>Pick one</option>
                    {
                      supervisorsQuery.data.filter(u => u.type == 'SUPERVISOR')
                        .map(e => {
                          const mysubject = subjectsQuery.data.filter(s => s.id == my_group.subject)[0]
                          return (<option key={e.id} value={e.id} selected={e.id == mysubject?.supervisor ? true : false}  >{e.first_name} {e.last_name}</option>)
                        })
                    }
                  </select>
                </div>
              </div>


              <div className='items-center flex flex-col'>
                <div className="form-control w-full max-w-xl">
                  <label className="label">
                    <span className="label-text">Choose a Subject</span>
                  </label>
                  <radiogroup className="" ref={radioGroupRef} >
                    {
                      supervisorSubjectsList?.map(e => {
                        return (
                        <p key={e.id} >
                          <input
                            className="radio radio-info"
                            onChange={onOptionChange}
                            type="radio" 
                            name="radio-7" 
                            value={e.id} />
                          <span className='px-4'>
                            {e.title}
                          </span>
                        </p>)
                      })
                    }
                  </radiogroup>
                </div>
              </div>
              <input type="submit" onClick={onSubmit} className="btn btn-primary  w-full max-w-xl my-2" />
            </div>
          </div>
        </div>

      </>
    )
  }
}

export default GroupSujectEdit