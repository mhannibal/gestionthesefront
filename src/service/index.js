import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/api/',
  prepareHeaders: (headers, { getState }) => {
      const access = localStorage.getItem('accessToken');
      if (access) {
          headers.set('authorization', `JWT ${access}`);
      }
      return headers;
  },
});
const baseQueryWithReauth = async (
  args,
  api,
  extraOptions
) => {
  
  const  refresh = localStorage.getItem('refreshToken');
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
      const refreshResult = await baseQuery({
                                    url: 'token/refresh/',
                                    method: 'POST',
                                    body: {
                                      refresh: refresh,
                                    }
                                  
                                  }, api, extraOptions);
      if (refreshResult.data) {
          localStorage.setItem('accessToken',refreshResult.data.access)
          localStorage.setItem('refreshToken',refreshResult.data.refresh)
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
  }
  return result;
};

export const tmsApi = createApi({
  reducerPath: 'tmsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['USERS', 'ADMINISTRATORS', 'SUPERVISORS', 'STUDENTS', 'GROUPS', 'SUBJECTS', 'FILES', 'STUDENTS-PROFILES'],
  endpoints: (builder) => ({
    
    getUsers: builder.query({
      query: (name) => `users/`,
      providesTags : ['USERS']
    }),
    
    createUser: builder.mutation({
      query: ({ ...user }) => ({
        url: `users/`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags : ['USERS']
    }),
    createStudent: builder.mutation({
      query: ({ ...student }) => ({
        url: `students/`,
        method: 'POST',
        body: student,
      }),
      invalidatesTags : ['USERS']
    }),
    createSupervisor: builder.mutation({
      query: ({ ...supervisor }) => ({
        url: `supervisors/`,
        method: 'POST',
        body: supervisor,
      }),
      invalidatesTags : ['USERS']
    }),
    updateUser: builder.mutation({
      query: ({ ...user }) => ({
        url: `users/${user.id}/`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags : ['USERS']
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags : ['USERS']
    }),

    getStudentProfiles: builder.query({
      query: () => `students-profiles/`,
      providesTags : ['STUDENTS-PROFILES']
    }),
    
    updateStudentProfile: builder.mutation({
      query: ({ ...profile }) => ({
        url: `students-profiles/${profile.id}/`,
        method: 'PATCH',
        body: profile,
      }),
      invalidatesTags : ['STUDENTS-PROFILES']
    }),

    getSubjects: builder.query({
      query: () => `subjects/`,
      providesTags : ['SUBJECTS']
    }),
    
    createSubject: builder.mutation({
      query: ({ ...subject }) => ({
        url: `subjects/`,
        method: 'POST',
        body: subject,
      }),
      invalidatesTags : ['SUBJECTS']
    }),
    updateSubject: builder.mutation({
      query: ({ ...subject }) => ({
        url: `subjects/${subject.id}/`,
        method: 'PATCH',
        body: subject,
      }),
      invalidatesTags : ['SUBJECTS']
    }),
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `subjects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags : ['SUBJECTS']
    }),


    getGroups: builder.query({
      query: () => `groups/`,
      providesTags : ['GROUPS']
    }),
    updateGroup: builder.mutation({
      query: ({ ...group }) => ({
        url: `groups/${group.id}/`,
        method: 'PATCH',
        body: group,
      }),
      invalidatesTags : ['GROUPS']
    }),


    getFiles: builder.query({
      query: () => `files/`,
      providesTags : ['FILES']
    }),

    updateFile: builder.mutation({
      query: ({ ...file }) => ({
        url: `files/${file.id}/`,
        method: 'PATCH',
        body: file,
      }),
      invalidatesTags : ['GROUPS']
    }),

    deleteFile: builder.mutation({
      query: (id) => ({
        url: `files/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags : ['FILES']
    }),
    
    uploadFile: builder.mutation({
      query: (data) => ({
        url: 'files/',
        method: 'POST',
        body:  data,
      }),
      invalidatesTags : ['FILES']
    }),



  }),
})

export const { 


  useGetUsersQuery,
  useCreateUserMutation,
  useCreateStudentMutation,
  useCreateSupervisorMutation,
  
  useUpdateUserMutation,
  useDeleteUserMutation,

  useGetStudentProfilesQuery,
  useUpdateStudentProfileMutation,
  
  useGetSubjectsQuery,
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,

  useGetGroupsQuery,
  useUpdateGroupMutation,

  useGetFilesQuery,
  useDeleteFileMutation,
  useUploadFileMutation,
  
 } = tmsApi

