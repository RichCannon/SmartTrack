import { createContext } from "react";
import { RoleT } from "../types/types";


const nullfn = () => { }

export type ContextT = {
   isAuth: boolean
   role: RoleT
   login: (role: RoleT) => void
   logout: () => void
   setRole: (role: RoleT) => void
}



const context: ContextT = {
   isAuth: false,
   role: `receptionist`,
   login: nullfn,
   logout: nullfn,
   setRole: nullfn
}

export const AuthContext = createContext(context)