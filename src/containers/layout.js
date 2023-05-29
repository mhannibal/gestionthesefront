import React from 'react'
import PageContent from './page-content'
import { useAuth } from '../app/auth-context';
import { parseJwt } from '../service/jwt_utils';
import { adminRoutes, studentLeaderRoutes, studentRoutes, supervisorRoutes } from '../routes';
import { 
  leftSideBaradminRoutes, 
  leftSideBarsupervisorRoutes,
  leftSideBarstudentRoutes, 
  leftSideBarstudentLeaderRoutes
} from '../routes/left-side';
import LeftSideBar from './left-sidebar';
import { useGetStudentProfilesQuery } from '../service';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  const authContext = useAuth();
  const studentProfileQuery = useGetStudentProfilesQuery()
  const studentprofile = studentProfileQuery.data?.filter(e=> e.user == parseJwt(authContext.accessToken).user_id)[0]

  if (studentProfileQuery.isSuccess) {
    let user_type = null
    if (authContext.accessToken) 
      user_type = parseJwt(authContext.accessToken).type
    let routes = adminRoutes;
    let leftsidebarRoute = leftSideBaradminRoutes;
    switch(user_type) {
      case 'ADMINISTRATOR':      
        routes = adminRoutes;
        leftsidebarRoute = leftSideBaradminRoutes;
        break;
      case 'SUPERVISOR' :
        routes = supervisorRoutes;
        leftsidebarRoute = leftSideBarsupervisorRoutes;
        break;
      case 'STUDENT' :
        if (studentprofile.is_group_leader) {
          routes = studentLeaderRoutes;
          leftsidebarRoute = leftSideBarstudentLeaderRoutes;
        }
        else {
          routes = studentRoutes;
          leftsidebarRoute = leftSideBarstudentRoutes;
        }
        break;
      default : 
        routes = adminRoutes;
        leftsidebarRoute = leftSideBaradminRoutes;
    }
    return (
      <>
        <div className="drawer drawer-mobile flex-row flex">
            <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
            <LeftSideBar routes={leftsidebarRoute} userType={user_type} /> 
            <PageContent routes={routes}/>
            <ToastContainer
              className="toast-container"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

        </div>
      </>
    )
  }
}

export default Layout