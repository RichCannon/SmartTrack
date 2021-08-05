import { AuthChecker } from "type-graphql";
import jwt from 'jsonwebtoken'

import { MyContextT, SECRET_KEY, TokenDataT } from "../types/types";
import { getCookie } from "../utils/getCookie";
import { UsersModel } from "../entities/Users";


export const customAuthChecker: AuthChecker<MyContextT> = async ({ context: { req } }, roles) => {

   try {

      const token = getCookie(`token`, req.headers.cookie ? req.headers.cookie : ``)

      if (!token) {
         throw new Error(`No token`)
      }

      const tokenData = jwt.verify(token, SECRET_KEY) as TokenDataT
      const user = await UsersModel.findOne({ _id: tokenData.userId })

      if (!user) {
         throw new Error(`No user`)
      }

      if (!roles.includes(tokenData.role) && tokenData.role !== `admin`) {
         throw new Error(`Role check false`)
      }

      return true
   } catch (e) {
      console.error(e)
      return false
   }

};