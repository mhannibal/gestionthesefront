import React from 'react'
import { useDeleteFileMutation, useGetFilesQuery, useGetGroupsQuery, useGetStudentProfilesQuery } from '../../../service';
import { useAuth } from '../../../app/auth-context';
import { parseJwt } from '../../../service/jwt_utils';
import CheckBadgeIcon from '@heroicons/react/24/outline/CheckBadgeIcon';
import DocumentMinusIcon from '@heroicons/react/24/outline/DocumentMinusIcon';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import DocumentPlusIcon from '@heroicons/react/24/outline/DocumentPlusIcon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function StudentFilesList() {
  const authContext = useAuth();
  const user_id = parseJwt(authContext.accessToken).user_id;
  const filesQuery = useGetFilesQuery();
  const studentProfilesQuery = useGetStudentProfilesQuery();
  const [deleteFile] = useDeleteFileMutation();
  const navigate = useNavigate();
   
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

 
  const handelDeletClick= (id)=> {
    deleteFile(id)
    .unwrap()
    .then((payload) => {
      notifySuccess('File Deleted Successfuly')
      console.log('fulfilled', payload)
    })
    .catch((error) => {
      console.error('rejected', error)
      notifyError('Error while Deleting File')
  });
  }
  if (filesQuery.isSuccess && studentProfilesQuery.isSuccess) {
    const studentprofileID = studentProfilesQuery.data.filter(sp=> sp.user == user_id )[0]
    const my_files = filesQuery.data.filter(f=> f.group == studentprofileID.group)
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
                  <button
                      title='delet subject'
                      onClick={() => { handelDeletClick(e.id) }}
                      className="btn btn-error">
                      <DocumentMinusIcon className={`h-6 w-6`} />
                    </button>
                    
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
      <div className='flex flex-col m-4 '>
          <div className="card bg-base-100 shadow-xl mb-4">
           <div className="card-body items-center flex flex-row">
              <h1 className='font-semibold '>Files</h1>
              <button 
                onClick={ ()=>{
                  navigate('/app/files/add')
                  }
                }
                title={'add a file'}
                className="btn btn-success btn-circle">
                <DocumentPlusIcon className={`h-6 w-6`}/>
              </button>
            </div>
          </div>
      </div>
      {(my_files.length ===0) ? (
        <div className="alert alert-warning shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>There is no files, please add some to send.</span>
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
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>          
              {filesComponent}
            </tbody>
          </table>
        </div>
      </div> }
    </>
    )
  }
}

export default StudentFilesList



  // if (subjectQuery.isSuccess) {
  //   const subjetlist = subjectQuery.data.filter(s=>s.supervisor == user_id).map(
  //     (e, index) => {
  //       return (
  //         <tr key={index}>
  //           <th>{index}</th>
  //           <td>{e.title}</td>
  //           <td>{e.is_confirmed ?
  //             <CheckBadgeIcon color='green' width={32} /> :
  //             <CheckBadgeIcon color='red' width={32} />}</td>
  //           <td>
  //             <div className="btn-group">
  //             <button
  //                 title='delet subject'
  //                 onClick={() => { handelDeletClick(e.id) }}
  //                 className="btn btn-error">
  //                 <DocumentMinusIcon className={`h-6 w-6`} />
  //               </button>
  //               <button
  //                 onClick={() => { handleDetailClick(e.id) }}
  //                 className="btn btn-info">
  //                 <PencilSquareIcon className={`h-6 w-6`} />
  //               </button>               
  //             </div>
  //           </td>
  //         </tr>
  //       )
  //     }
  //   )
