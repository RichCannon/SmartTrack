import { gql } from "@apollo/client"

import { RoleT } from "../types/types"

export type LoginResponse = {
   login: {
      role: RoleT
      isAuth: boolean
   }
}

export type LoginPayload = {
   data: {
      email: string
   }
}

export const LOGIN = gql`
   mutation Login($data: LoginInput!) {
      login(data: $data) {
         role, isAuth
      }
   }
`