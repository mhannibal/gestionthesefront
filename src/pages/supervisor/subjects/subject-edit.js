import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useGetSubjectsQuery, useUpdateSubjectMutation } from '../../../service';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../app/auth-context';
import {parseJwt} from '../../../service/jwt_utils';
import { toast } from 'react-toastify';


function SubjectEdit() {
  const authContext = useAuth()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [updateSubject] = useUpdateSubjectMutation();
  const navigate = useNavigate()
  const {id} = useParams()
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

  const subjectQuery = useGetSubjectsQuery()
  useEffect(()=>{
    if (subjectQuery.isSuccess)
      reset (formValues => ({
        ...subjectQuery.data.filter(e=>e.id == id)[0]
      }))

  }, [subjectQuery.isSuccess, reset, id, subjectQuery.data])

  const onSubmit = data => {
    updateSubject({
      ...data,
    }).unwrap()
    .then(fulfilled => {
      navigate('/app/subjects')
      notifySuccess('Subject Changed Successfuly')
    })
    .catch(rejected => {
      console.error(rejected)
      notifyError('Error Changing the subject')
    }); 
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is the subject title?</span>
          </label>
          <input 
            {...register("title", { required: true })}
            type="text" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs" />
          {errors.title && <span className='text-red-400'>This field is required</span>}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">write some description for the subject?</span>
          </label>
          <input 
            {...register("description", { required: false })}
            type="text" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs" />
          {errors.description && <span className='text-red-400'>This field is required</span>}
        </div>
        <input type="submit" className="btn btn-primary  w-full max-w-xs my-2" />

      </form>
    </>

  )
}

export default SubjectEdit

 