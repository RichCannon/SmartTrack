import { AuthChecker } from "type-graphql";
import jwt from 'jsonwebtoken'

import { MyContextT, SECRET_KEY, TokenDataT } from "../types/types";
import { getCookie } from "../utils/getCookie";


export const customAuthChecker: AuthChecker<MyContextT> = ({ context: { req } }, roles) => {

   const token = getCookie(`token`, req.headers.cookie ? req.headers.cookie : ``)

   if (!token) {
      return false
   }

   const tokenData = jwt.verify(token, SECRET_KEY) as TokenDataT

   if (tokenData.role === `admin`) {
      return true
   }

   if (!roles.includes(tokenData.role)) {
      return false
   }

   return true

};