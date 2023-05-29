import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import ArrowLeftOnRectangle from '@heroicons/react/24/outline/ArrowLeftOnRectangleIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import DocumentArrowUpIcon from '@heroicons/react/24/outline/DocumentArrowUpIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'


export const leftSideBaradminRoutes = [
  {
    path: '/dashboard', // the url
    icon: <Squares2X2Icon className={`h-6 w-6`}/>, 
    name: 'Dashboard',
  },
  {
    path: '/accounts',
    icon: <UserGroupIcon className={`h-6 w-6`}/>, 
    name: 'Accounts',
  },
  // {
  //   path: '/students',
  //   icon: <UserGroupIcon className={`h-6 w-6`}/>, 
  //   name: 'Students',
  // },
  {
    path: '/subjects',
    icon: <DocumentDuplicateIcon className={`h-6 w-6`}/>, 
    name: 'Subjects',
  },
  {
    path: '/logout',
    icon: <ArrowLeftOnRectangle className={`h-6 w-6`}/>, 
    name: 'Logout',
  },
]

export const leftSideBarsupervisorRoutes = [
  {
    path: '/dashboard', // the url
    icon: <Squares2X2Icon className={`h-6 w-6`}/>, 
    name: 'Dashboard',
  },
  {
    path: '/subjects', // the url
    icon: <DocumentDuplicateIcon className={`h-6 w-6`}/>, 
    name: 'Subjects',
  },
  {
    path: '/groups', // the url
    icon: <UserGroupIcon className={`h-6 w-6`}/>, 
    name: 'Groups',
  },
  {
    path: '/logout',
    icon: <ArrowLeftOnRectangle className={`h-6 w-6`}/>, 
    name: 'Logout',
  },
];

export const leftSideBarstudentLeaderRoutes = [
    {
      path: '/dashboard', // the url
      icon: <Squares2X2Icon className={`h-6 w-6`}/>, 
      name: 'Dashboard',
    },
    {
    path: '/group',
      icon: <UsersIcon className={`h-6 w-6`}/>, 
      name: 'My group',
     },
    {
    path: '/group/supervisor',
      icon: <UsersIcon className={`h-6 w-6`}/>, 
      name: 'My Supervisor',
    },
    {
      path: '/files', // the url
      icon: <DocumentArrowUpIcon className={`h-6 w-6`}/>, 
      name: 'Files',
    },
    {
      path: '/logout',
      icon: <ArrowLeftOnRectangle className={`h-6 w-6`}/>, 
      name: 'Logout',
    },
];

export const leftSideBarstudentRoutes = [
  {
    path: '/dashboard',
    icon: <Squares2X2Icon className={`h-6 w-6`}/>, 
    name: 'Dashboard',
   },
   {
    path: '/group',
    icon: <UsersIcon className={`h-6 w-6`}/>, 
    name: 'My group',
   },
   {
    path: '/logout',
    icon: <ArrowLeftOnRectangle className={`h-6 w-6`}/>, 
    name: 'Logout',
  },

];