import { gql } from "@apollo/client";

import { RoleT } from "../types/types";

export type StatusT = {
   _id: string
   color: string
   description: string
}


export type RoomT = {
   name: string
   status: string
   _id: string
   ownerId: string
}

export type UserT = {
   _id: string
   name: string
   specialization: string
   email: string
   phoneNum: string
   docRooms: RoomT[]
   statusData: StatusT[]
}

export type GetByRoleResponse = {
   getByRole: UserT[]
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
      name,
      _id,
      ownerId,
      status,
    }
    statusData {
       color,
       description
    }
  }
}
`
