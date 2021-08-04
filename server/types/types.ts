import { Request, Response } from 'express'


export const SECRET_KEY = `verySecretKey`

export type RoleT = `admin` | `doctor` | `assistant` | `receptionist`


export type MyContextT = {
   req: Request
   res: Response
}

export type TokenDataT = {
   userId:string
   role: RoleT
}