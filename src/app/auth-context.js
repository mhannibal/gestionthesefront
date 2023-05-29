import React, {createContext, useState, useContext, useEffect} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      setLoading(true);
      const access_token = localStorage.getItem('accessToken');
      const refresh_token = localStorage.getItem('refreshToken');
      if (access_token) {
        setAccessToken(access_token);
      }
      if (refresh_token) {
        setRefreshToken(refresh_token);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

 


  const signInWithToken = async (access_token, refresh_token) => {
    try{
      setLoading(true);      
      setAccessToken(access_token);
      setRefreshToken(refresh_token);      
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
       setLoading(false);
    } catch(e) {
      setLoading(false);
      console.log(e.message);
    }
  }
  const signIn = async (email, password) => {
    setLoading(true);
    const response = await fetch('http://127.0.0.1:8000/api/token/',
    {
      method: 'POST',
      headers: {
        'content-Type':'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        grant_type: 'PASSWORD'
     }),
 
    })
    const result = await  response.json();
    
    if(result.access && result.refresh ){
        signInWithToken(result.access, result.refresh)
        return {isError: false,}
      } else {
      return {
        isError: true,
        error:result.detail,
      }
    }
    ;
    
    setLoading(false);
    // if (!_authData.didFail) {
    //   if (_authData?.data?.hasOwnProperty('access_token')) {
    //     setAuthData(_authData.data);
    //     storeDataAsyncStorage(_authData.data);
    //     return Promise.resolve(_authData);
    //   }
    // }
    // // if erorrs 
    // return Promise.reject(_authData);
  };

  const signOut = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{accessToken, refreshToken, loading, signIn, signOut, signInWithToken}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};
