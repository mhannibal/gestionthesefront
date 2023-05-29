import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAuth } from "./app/auth-context";
import Login from "./pages/login";
import Layout from "./containers/layout";
  
function App() {
  const authContext = useAuth();
 
   
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />          
          <Route path="/app/*" element={<Layout />} />
          <Route path="*" element={<Navigate to={authContext.accessToken ? "/app/dashboard" : "/login"} replace />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
