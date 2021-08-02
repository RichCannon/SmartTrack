import { Request, Response } from 'express'


export type RoleT = `admin` | `doctor` | `assistant` | `receptionist`


export type MyContextT = {
   req: Request
   res: Response
}