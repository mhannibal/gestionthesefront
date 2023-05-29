import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useCreateUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../../../service';
import { useNavigate, useParams } from 'react-router-dom';
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon';
import { toast } from 'react-toastify';

function StudentsEdit() {
  const {id} = useParams()
  const { register, handleSubmit, watch,reset , formState: { errors } } = useForm();
  const [updateUser] = useUpdateUserMutation();
  const usersQuery = useGetUsersQuery()
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

  useEffect(()=>{
    reset (formValues => ({
      ...usersQuery.data.filter(e=>e.id == id)[0]
    }))

  }, [usersQuery.isSuccess, reset, id, usersQuery.data])
  const navigate = useNavigate()
  const onSubmit = data => {
    updateUser({
      ...data,
    }).unwrap()
    .then(fulfilled => {
      navigate('/app/accounts')
      notifySuccess('Student Account updated Successfuly')
    })
    .catch(rejected => {
      notifyError('Error Updating Student Account.')
      console.error(rejected)
    })
  }

  return (
  <>
    <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body items-center flex flex-row">
          <UserPlusIcon className={`h-6 w-6`}/>
          <h1 className='font-semibold '>Edit Student Informations</h1>
         </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='items-center flex flex-col'>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">email</span>
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
            <span className="label-text">first name</span>
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
            <span className="label-text">last name</span>
          </label>
          <input 
            {...register("last_name", { required: true })}
            type="text" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs" />
          {errors.last_name && <span className='text-red-400'>This field is required</span>}
        </div>
        <input type="submit" className="btn btn-primary  w-full max-w-xs my-2" />
      </form>
  </>
  )
}

export default StudentsEdit
