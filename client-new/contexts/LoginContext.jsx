import { Children, ReactNode, createContext, useState } from "react";
import React from "react";

// type LoginContextType = {
//   isLoggedIn: boolean,
//   setIsLoggedIn: (isLoggedIn: boolean) => void,
// };

// export const LoginContext =
//   createContext <
//   LoginContextType >
//   {
//     isLoggedIn: false,
//     setIsLoggedIn: () => {},
//   };

export const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // value dari userLoginInfo = "trainee" atau "trainer" atau "admin"
  const [userLoginRole, setUserLoginRole] = useState("trainee");

  const [user, setUser] = useState('');
  const [role, setRole] = useState('');


  // const contextValue = {
  //   setIsLoggedIn: setIsLoggedIn,
  //   isLoggedIn: isLoggedIn,
  // };
  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, role, setRole }}>
      {children}
    </LoginContext.Provider>
  );
};
