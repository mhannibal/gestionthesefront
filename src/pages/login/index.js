import React, { useState } from 'react';
import { useAuth } from '../../app/auth-context';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const authContext = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result =  await authContext.signIn(email, password);
    
    if (result.isError) {
      setError(result.error)
    } else {
      navigate('/app/dashboard');
    }
          
  };

  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Use your email and password to Acces to the system</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
      <form onSubmit={handleSubmit}>
           {error && <label htmlFor="email" className="block text-red-700 text-sm font-bold mb-2">{error}</label>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>

        <div className="form-control mt-6">
          <button   type="submit" className="btn btn-primary">Login</button>
        </div>
           
        </form>
      </div>
    </div>
  </div>
</div>

 
  );
}

export default LoginPage;
