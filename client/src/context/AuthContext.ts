import { createContext } from "react";
import { RoleT } from "../types/types";


const nullfn = () => { }

export type ContextT = {
   isAuth: boolean
   role: RoleT
   login: (role: RoleT) => void
   logout: () => void
}



const context: ContextT = {
   isAuth: false,
   role: `receptionist`,
   login: nullfn,
   logout: nullfn,
}

export const AuthContext = createContext(context)