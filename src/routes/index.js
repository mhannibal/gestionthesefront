// All components mapping with path for internal routes

import { lazy } from 'react'
import StudentContainer from '../pages/administrator/students';
import SupervisorsContainer from '../pages/administrator/supervisors';
import SupervisorsAdd from '../pages/administrator/supervisors/supervisors-add';
import StudentsEdit from '../pages/administrator/students/student-edit';
import SubjectContainer from '../pages/supervisor/subjects';
import SubjectAdd from '../pages/supervisor/subjects/subject-add';
import SubjectEdit from '../pages/supervisor/subjects/subject-edit';
import SubjectList from '../pages/supervisor/subjects/subject-list';


import AdminSubjectContainer from '../pages/administrator/subjects';
import AdminSubjectList from '../pages/administrator/subjects/subject-list';
import AdminSubjectDetail from '../pages/administrator/subjects/subject-detail';
import supervisorEdit from '../pages/administrator/supervisors/supervisor-edit';
import GroupContainer from '../pages/student-leader';
import GroupEdit from '../pages/student-leader/group';
import GroupSujectEdit from '../pages/student-leader/group-subject';
import GroupList from '../pages/supervisor/groups/group-list';

import SuperVisorGroupContainer from '../pages/supervisor/groups';
import SupervisorGroupList from '../pages/supervisor/groups/group-list';
import SupervisorGroupEdit from '../pages/supervisor/groups/group-edit';
import SupervisorDashboard from '../pages/supervisor/dashboard';
import StudentDashboard from '../pages/student/student-dashboard';
import StudentGroupContainer from '../pages/student';
import StudentGroupEdit from '../pages/student/group';
import StudentFilesContainer from '../pages/student-leader/files/container';
import StudentFilesList from '../pages/student-leader/files/files-list';
import StudentAddFile from '../pages/student-leader/files/add-file';
 
const StudentsAdd = lazy(()=> import('../pages/administrator/students/student-add'));

const Accounts = lazy(()=> import('../pages/administrator/accounts') ) 
const Subjects = lazy(()=> import('../pages/administrator/subjects') ) 
const Logout = lazy(()=> import('../pages/logout') ) 
const AdminDashboard = lazy(() => import('../pages/administrator/dashboard'))
const Page404 = lazy(() => import('../pages/page-404'))

export const adminRoutes = [
  {
    path: 'dashboard', // the url
    component: AdminDashboard, // view rendered
  },
  {
    path: 'accounts',
    component: Accounts, 
  },
  {
    path: 'students',
    component: StudentContainer, 
    children: [
      {
        path: 'add',
        component: StudentsAdd, 
      },
      {
        path: 'edit/:id',
        component: StudentsEdit, 
      },
    ]
  },
 
  {
    path: 'supervisors',
    component: SupervisorsContainer, 
    children: [
      {
        path: 'add',
        component: SupervisorsAdd, 
      },
      {
        path: 'edit/:id',
        component: supervisorEdit, 
      },
    ]
  },
  {
    path: 'subjects',
    component: AdminSubjectContainer,
    children: [
      {
        path: '',
        component: AdminSubjectList, 
      },
      {
        path: 'detail/:id',
        component: AdminSubjectDetail, 
      },
    ]
  },
  {
    path: 'logout',
    component: Logout,
  },
  {
    path: '404',
    component: Page404,
  },

]

export const supervisorRoutes = [
  {
    path: '/dashboard',
    component: SupervisorDashboard,
  },
  {
    path: '/subjects',
    component: SubjectContainer,
    children: [
      {
        path: '',
        component: SubjectList, 
      },
      {
        path: 'add',
        component: SubjectAdd, 
      },
      {
        path: 'edit/:id',
        component: SubjectEdit, 
      },
 
    ]
  },
  {
    path: '/groups',
    component: SuperVisorGroupContainer,
    children: [
      {
        path: '',
        component: SupervisorGroupList, 
      },
      {
        path: 'edit/:id',
        component: SupervisorGroupEdit, 
      },
 
    ]
  },
  {
    path: '/logout',
    component: Logout,
  },
  {
    path: '/404',
    component: Page404,
  },

];

export const studentLeaderRoutes = [
    {
      path: '/dashboard',
      component: StudentDashboard,
    },
    {
      path: '/files',
      component: StudentFilesContainer,
      children: [
        {
          path: '',
          component: StudentFilesList, 
        },
        {
          path: 'add',
          component: StudentAddFile, 
        },
      ],
    },
    {
      path: '/group',
      component: GroupContainer,
      children: [
        {
          path: '',
          component: GroupEdit, 
        },
        {
          path: 'supervisor',
          component: GroupSujectEdit, 
        },
      ],
    },
    {
      path: '/logout',
      component: Logout,
    },
    {
      path: '/404',
      component: Page404,
    },
  
];


export const studentRoutes = [
  {
    path: '/dashboard',
    component: StudentDashboard,
  },
  {
    path: '/group',
    component: StudentGroupContainer,
    children: [
      {
        path: '',
        component: StudentGroupEdit,
      },
    ],
  },
  {
    path: '/logout',
    component: Logout,
  },
  {
    path: '/404',
    component: Page404,
  },

];