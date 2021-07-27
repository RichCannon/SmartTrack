import { gql } from "@apollo/client";
import { RoleT } from "../types/types";


export type RoomT = {
   name: string
   description: string
   color: string
   _id: string
   ownerId: string
}

export type UserT = {
   _id: string
   name: string
   specialization: string
   email: string
   phoneNum: string
}

export type GetByRoleResponse = {
   getByRole: (UserT & { docRooms: RoomT[] })[]
}

export type GetByRolePayload = {
   role: RoleT
}

export const GET_USER_BY_ROLE = gql`
  query Users($role: String!) {
   getByRole(role: $role) {
    name,
    specialization,
    email,
    phoneNum,
    docRooms {
      name
      color,
      description,
      _id,
      ownerId
    }
  }
}
`
