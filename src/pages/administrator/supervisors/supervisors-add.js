import React from 'react'
import { useForm } from 'react-hook-form';
import { useCreateSupervisorMutation, useCreateUserMutation } from '../../../service';
import { useNavigate } from 'react-router-dom';
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon';
import { toast } from 'react-toastify';

function SupervisorsAdd() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [createSupervisor] = useCreateSupervisorMutation();
  const navigate = useNavigate()
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

  const onSubmit = data => {
    createSupervisor({
      ...data,
    }).unwrap()
    .then(fulfilled => {
      navigate('/app/accounts')
      notifySuccess('Supervisor Account created Successfuly')
    })
    .catch(rejected => {
      console.error(rejected)
      notifyError('Error Creating Supervisor Account.')
    }); 
  }

  return (
    <>
    <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body items-center flex flex-row">
          <UserPlusIcon className={`h-6 w-6`}/>
          <h1 className='font-semibold '>Add a Supervisor</h1>
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
      
        <input type="submit" className="btn btn-primary  w-full max-w-xs my-2" />

      </form>
    </>

  )
}

export default SupervisorsAdd

 