import React from 'react'
import { useForm } from 'react-hook-form';
import { useCreateSubjectMutation } from '../../../service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/auth-context';
import {parseJwt} from '../../../service/jwt_utils';
import { toast } from 'react-toastify';


function SubjectAdd() {
  const authContext = useAuth()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [createSubject] = useCreateSubjectMutation();
  const navigate = useNavigate()
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

  const onSubmit = data => {
    console.log({...data,  supervisor: parseJwt(authContext.accessToken).user_id});
    createSubject({
      ...data,
      supervisor: parseJwt(authContext.accessToken).user_id,
    }).unwrap()
    .then(fulfilled => {
      navigate('/app/subjects')
      notifySuccess('New Subject Added Successfuly')
    })
    .catch(rejected => {
      console.error(rejected)
      notifyError('Error Adding a new subject')
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
          <textarea 
            {...register("description", { required: false })}
            className="textarea textarea-primary"
            rows={20} 
            placeholder="Description">
          </textarea>
          {errors.description && <span className='text-red-400'>This field is required</span>}
        </div>

        
      
        <input type="submit" className="btn btn-primary  w-full max-w-xs my-2" />

      </form>
    </>

  )
}

export default SubjectAdd

// supervisor = models.ForeignKey(
//   Supervisor,
//   related_name='subject',
//   on_delete=models.CASCADE)
// title = models.CharField(max_length=100, blank=False)
// description = models.TextField(blank=True)
// results = models.CharField(max_length=10, blank=True)
