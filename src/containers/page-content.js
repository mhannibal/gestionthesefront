import React, { Suspense } from 'react'
import Loading from '../components/loading'
import { Route, Routes } from 'react-router-dom'
import Page404 from '../pages/page-404'
 
function PageContent({routes}) {
  const  routesRender = routes.map((route, key) => {
    if (route.children) {  
        
        return (
            <Route
                key={key}
                exact={true}
                path={`${route.path}`}
                element={<route.component />}>
                {
                route.children.map((childroute, k) =>  {
                     return <Route
                        key={k}
                        path={`${childroute.path}`}
                        element={<childroute.component />} />
                }
                )} 
            </Route>
        )
    } 
      return(
          <Route
              key={key}
              exact={true}
              path={`${route.path}`}
              element={<route.component />}
          />
      )
  })
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
          {
              routesRender
          }

          {/* Redirecting unknown url to 404 page */}
          <Route path="*" element={<Page404 />} />
      </Routes>
      </Suspense>
  )
}

export default PageContent