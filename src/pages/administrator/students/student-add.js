import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useCreateStudentMutation, useCreateUserMutation, useGetStudentProfilesQuery, useUpdateStudentProfileMutation } from '../../../service';
import { useNavigate } from 'react-router-dom';
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon';
import { toast } from 'react-toastify';

function StudentsAdd() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [createStudent] = useCreateStudentMutation();
  const studentProfileQuery = useGetStudentProfilesQuery();
  const [updateStudentProfile] = useUpdateStudentProfileMutation()
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false);
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };


  const onSubmit = data => {
    createStudent({
      ...data,
    }).unwrap()
    .then(fulfilled => {
      console.log('fulfilled ', fulfilled);
      studentProfileQuery.refetch().then(data => {
        const profile = data.data.filter(sp => sp.user == fulfilled.id)[0];
        updateStudentProfile(
          {
            ...profile, 
            is_group_leader :isChecked ,
          }
        ).unwrap()
        .then(fulfilled2 => {
          console.log(fulfilled2)
          notifySuccess('Student Account created Successfuly')
        })
        .catch(rejected =>{ 
          console.error(rejected)
          notifyError('Error Creating Student Account.')
        })

      })
      navigate('/app/accounts')
    })
    .catch(rejected => {
      console.error(rejected)
      notifyError(rejected)
    })
  }

  return (
    <div className="flex flex-col w-full">
      <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body items-center flex flex-row">
          <UserPlusIcon className={`h-6 w-6`}/>
          <h1 className='font-semibold '>Add a Student</h1>
         </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='items-center flex flex-col'>
      
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your email?</span>
          </label>
          <input 
            {...register("email", { required: true })}
            type="email" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs" />
          {errors.email && <span className='text-red-400'>This field is required</span>}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your first name?</span>
          </label>
          <input 
            {...register("first_name", { required: true })}
            type="text" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs" />
          {errors.first_name && <span className='text-red-400'>This field is required</span>}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your last name?</span>
          </label>
          <input 
            {...register("last_name", { required: true })}
            type="text" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs" />
          {errors.last_name && <span className='text-red-400'>This field is required</span>}
        </div>

        
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your password?</span>
          </label>
          <input 
            {...register("password", { required: true })}
            type="password" 
            placeholder="Type here" 
            autoComplete='current-password'
            className="input input-bordered w-full max-w-xs" />
          {errors.password && <span className='text-red-400'>This field is required</span>}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label marker:cursor-pointer">
            <span className="label-text">is He/She a group leader ?</span>
          </label>
          <input 
            type="checkbox"  
            className="checkbox checkbox-secondary" 
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
      
        <input type="submit" className="btn btn-primary  w-full max-w-xs my-2" />

      </form>
    </div>

  )
}

export default StudentsAdd