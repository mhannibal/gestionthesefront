import React from 'react'
import { useDeleteSubjectMutation, useGetSubjectsQuery, useUpdateSubjectMutation } from '../../../service'
import { useNavigate } from 'react-router-dom';
import DocumentMinusIcon from '@heroicons/react/24/outline/DocumentMinusIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import CheckBadgeIcon from '@heroicons/react/24/outline/CheckBadgeIcon';
import { useAuth } from '../../../app/auth-context';
import { parseJwt } from '../../../service/jwt_utils';
import { toast } from 'react-toastify';

function SubjectList() {
  const subjectQuery = useGetSubjectsQuery()
  const navigate = useNavigate()
  const [deleteSubject] = useDeleteSubjectMutation();

  const authContext = useAuth();
  const user_id = parseJwt(authContext.accessToken).user_id
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

  const handleDetailClick = (id) => {
    navigate(`/app/subjects/edit/${id}`);
  }
  const handelDeletClick = (id) => {
    deleteSubject(id).unwrap()
    .then(fulfilled => {
      navigate('/app/subjects')
      notifySuccess('Subject Deleted Successfuly')
    })
    .catch(rejected => {
      console.error(rejected)
      notifyError('Error while Deleting the subject')
    }); 
  }
   

  if (subjectQuery.isSuccess) {
    const subjetlist = subjectQuery.data.filter(s=>s.supervisor == user_id).map(
      (e, index) => {
        return (
          <tr key={index}>
            <th>{index}</th>
            <td>{e.title}</td>
            <td>{e.is_confirmed ?
              <CheckBadgeIcon color='green' width={32} /> :
              <CheckBadgeIcon color='red' width={32} />}</td>
            <td>
              <div className="btn-group">
              <button
                  title='delet subject'
                  onClick={() => { handelDeletClick(e.id) }}
                  className="btn btn-error">
                  <DocumentMinusIcon className={`h-6 w-6`} />
                </button>
                <button
                  onClick={() => { handleDetailClick(e.id) }}
                  className="btn btn-info">
                  <PencilSquareIcon className={`h-6 w-6`} />
                </button>               
              </div>
            </td>
          </tr>
        )
      }
    )


    return (
      <>
        {(subjetlist.length ===0) ? (
          <div className="alert alert-warning shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>There is no subjects yet , please add some.</span>
                </div>
              </div>
              
              ) : 
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>title</th>
                  <th>Confirmed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>          
                {subjetlist}
              </tbody>
            </table>
          </div>
        </div> }
      </>
    )
  }
}

export default SubjectList
