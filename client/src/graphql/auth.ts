import { gql } from "@apollo/client"

import { RoleT } from "../types/types"

export type LoginResponse = {
   login: {
      role: RoleT
      isAuth: boolean
      message?: string
   }
}

export type LoginPayload = {
   data: {
      email: string
      password: string
   }
}

export const LOGIN = gql`
   mutation Login($data: LoginInput!) {
      login(data: $data) {
         role, isAuth, message
      }
   }
`

export type CheckTokenResponse = {
   checkToken: {
      role: RoleT
      isAuth: boolean
   }
}


export const CHECK_TOKEN = gql`
   query CheckToken {
      checkToken {
         role, isAuth
      }
   }
`