import React, { createContext, useState } from 'react';

  // const Context = createContext(null);
  // export const AuthContext= createContext(Context)
  export const AuthContext= createContext(null);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); 

  const login = (data) => {
    console.log("login data"+ JSON.stringify(data))
    setUserData(data); // Update user data on successful login
  };

//   const logout = () => {
//     setUserData(null); // Clear user data on logout
//   };

  return (
    <AuthContext.Provider value={{ userData, login }}>
      {children}
    </AuthContext.Provider>
  );
};

