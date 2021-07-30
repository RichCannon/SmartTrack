import { gql } from "@apollo/client"

import { UserT, RoomT } from "./dashboard"

export type RoomsStuff = Omit<RoomT, "description">

export type ByRoleResponseStuff = {
   getByRole: (UserT & { docRooms: RoomsStuff[] })[]
}


export const USER_BY_ROLE_STUFF_PAGE = gql`
  query Users($role: String!) {
   getByRole(role: $role) {
    _id,
    name,
    phoneNum,
    specialization,
    email,
    docRooms {
      name,
      _id,
      ownerId,
      statusData {
         color,
         description
      }
    }
  }
}
`

export type CreateUserPayload = {
   data: {
      name: string
      role: string
      phoneNum: string
      email: string
      specialization: string | null
   }
}

export type CreateUserResponse = {
   _id: string
   name: string
   role: string
   phoneNum: string
   email: string
   specialization?: string
}

export const CREATE_USER = gql`
   mutation CreateUser($data: CreateUserInput!) {
      createUser(data: $data) {
         name,
         specialization,
         role,
         phoneNum,
         email,
         _id
      }
   }`


export type DeleteUserResponse = {
   deleteUser: boolean
}

export type DeleteUserPayload = {
   _id: string
}

export const DELETE_USER = gql`
   mutation DeleteUser($_id: String!) {
      deleteUser(_id: $_id) 
   }
`

export type UpdateUserResponse = {
   updateUser: boolean
}


export type UpdateUserPayload = {
   data: CreateUserPayload["data"] & { _id: string }
}


export const UPDATE_USER = gql`
   mutation UpdateUser($data: UpdateUserInput!) {
      updateUser(data: $data)
   }
`