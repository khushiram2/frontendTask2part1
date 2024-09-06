import { useState } from "react";
import { AuthContext } from "./contextCreator";


const AuthContextProvider = ({ children }) => {
  const [login, setLogin] = useState(false)
  const [isAuthorised, setIsAuthorised] = useState(false)
  const values = {
    login,
    setLogin,
    isAuthorised,
    setIsAuthorised
  }
  return (
    <AuthContext.Provider value={values} >
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContextProvider
