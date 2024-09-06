import { useContext } from "react";
import { AuthContext } from "./contextCreator";



export const useAuthContext = () => useContext(AuthContext)
