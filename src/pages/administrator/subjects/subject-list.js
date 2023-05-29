import React from 'react'
import { useDeleteSubjectMutation, useGetSubjectsQuery, useUpdateSubjectMutation } from '../../../service'
import { useNavigate } from 'react-router-dom';
import DocumentMinusIcon from '@heroicons/react/24/outline/DocumentMinusIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import CheckBadgeIcon from '@heroicons/react/24/outline/CheckBadgeIcon';
import { toast } from 'react-toastify';

function SubjectList() {
  const subjectQuery = useGetSubjectsQuery() 
  const navigate  = useNavigate()
  const [updateSubject] = useUpdateSubjectMutation();
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

  const handleDetailClick = (id) => {
    navigate(`/app/subjects/detail/${id}`);
  }
  const handelIsConfirmedClick = (id, is_confirmed) => {
    updateSubject({
      id,
      is_confirmed ,
    })
    .unwrap()
    .then(fulfilled=> {
      notifySuccess('Subject Confirmation changed succesufuly')
    })
    .catch((rejected)=>{
      notifyError('Error While Subject Confirmation changing')
    })
  }

  
  if (subjectQuery.isSuccess) {
    const supervisors = subjectQuery.data.map(
      (e, index)=> {
      return (
        <tr key={index}>
          <th>{index}</th>
          <td>{e.title}</td>
          <td>{e.is_confirmed?
          <CheckBadgeIcon color='green' width={32} />:
          <CheckBadgeIcon color='red' width={32} />}</td>
          <td>
          <div className="btn-group">
            <button 
              title='delet subject'
              onClick={()=>{handleDetailClick(e.id)}}
              className="btn btn-info">
                <PencilSquareIcon className={`h-6 w-6`} />
            </button>
            <button
              title='Confirm/uncofirm account'
              onClick={()=>{
                handelIsConfirmedClick(e.id, !e.is_confirmed)
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

    
    return (
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
                  {supervisors}
                </tbody>
                </table>
              </div>
            </div>
    )
  }
}

export default SubjectList
