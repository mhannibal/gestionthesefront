import React, { useState } from 'react'
import { useGetStudentProfilesQuery, useUploadFileMutation } from '../../../service';
import { useAuth } from '../../../app/auth-context';
import { parseJwt } from '../../../service/jwt_utils';
import { useNavigate } from 'react-router-dom';
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon';
import DocumentPlusIcon from '@heroicons/react/24/outline/DocumentPlusIcon';
import { toast } from 'react-toastify';

function StudentAddFile() {

  const authContext = useAuth();
  const user_id = parseJwt(authContext.accessToken).user_id;
  const studentProfilesQuery = useGetStudentProfilesQuery();
  const studentprofileID = studentProfilesQuery.data.filter(sp => sp.user == user_id)[0]
  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFileName] = useState(null);
  const [uploadFileMutation] = useUploadFileMutation();
   
  const notifySuccess = (str) => toast(str, {type:'success'});
  const notifyError = (str) => toast(str, {type:'error'});

  const handleFileNameChange = (event) => {
    setFileName(event.target.value)
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (studentProfilesQuery.isSuccess && selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', filename);
      formData.append('group', studentprofileID.group);

      debugger
      uploadFileMutation(formData)
        .unwrap()
        .then((payload) => {
          navigate('/app/files')
          notifySuccess('File Added Successfuly')
          console.log('fulfilled', payload)
        })
        .catch((error) => {
          console.error('rejected', error)
          notifyError('Error while Adding the File')
      });
    }
  };

  return (
    <>
    <div className="card bg-base-100 shadow-xl mb-4 ">
        <div className="card-body items-center flex flex-row">
          <DocumentPlusIcon className={`h-6 w-6`} />
          <h1 className='font-semibold '>Add Files</h1>
        </div>
    </div>
      
      <div className='flex justify-center  '>
        <div className="card bg-base-100 shadow-xl w-full max-w-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xl">
              <label className="label">
                <span className="label-text">What is the file name?</span>
              </label>
              <input type="text" value={filename} onChange={handleFileNameChange}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xl" />
            </div>

            <div className="form-control w-full max-w-xl">
              <label className="label">
                <span className="label-text">Choose a file to send?</span>
              </label>
              <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-xl" />
            </div>
            <input type="submit" className="btn btn-primary  w-full max-w-xl my-2" />
          </form>

        </div>
      </div>
    </div>
    </>
    

  )
}

export default StudentAddFile