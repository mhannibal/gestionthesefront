import React from 'react'
import { useGetSubjectsQuery, useGetUsersQuery, useUpdateSubjectMutation } from '../../../service'
import { useParams } from 'react-router-dom';

function SubjectDetail() {
  const supervisorQuery = useGetSubjectsQuery();
  const userQuery = useGetUsersQuery();
  const {id} = useParams();
  const [updateSubject] = useUpdateSubjectMutation();
  
  const handleConfirmationClick = () => {
    if (supervisorQuery.isSuccess) {

      const subject = supervisorQuery.data.filter(e=>e.id == id)[0]
      updateSubject({
        ...subject,
        is_confirmed :subject.is_confirmed?false:true,
      })
    }
  }

  if (supervisorQuery.isSuccess && userQuery.isSuccess) {
    const subject =supervisorQuery.data.filter(e=>e.id == id)[0];
    const user = userQuery.data.filter(e=>e.id == subject.supervisor)[0];
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className='font-semibold capitalize'>title</h3>
          <p>{subject.title}</p>
          
          <h3 className='font-semibold capitalize'>description</h3>
          <p>{subject.description}</p>

          <h3 className='font-semibold capitalize'>subject confirmed ?</h3>
          <p>{subject.is_confirmed? 'is Confirmed': 'Not yet'}</p>

          <h3 className='font-semibold capitalize'>supervisor</h3>
          <p>{user.first_name} {user.last_name}</p>
          <button 
            onClick={handleConfirmationClick}
            className={`btn ${subject.is_confirmed?'btn-error': 'btn-success'}`}>
              {subject.is_confirmed? 'Cancel Confirmation': 'Confirm'}
          </button>
        </div>
      </div>
    )
  }
}

export default SubjectDetail
