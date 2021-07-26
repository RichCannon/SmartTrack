import { gql } from "@apollo/client";
import { RoleT } from "../types/types";


export type RoomT = {
   name: string
   description: string
   color: string
   _id: string
   ownerId: string
}

export type DoctorT = {
   name: string
   specialization: string
   email: string
}

export type GetByRoleResponse = {
   getByRole: (DoctorT & { docRooms: RoomT[] })[]
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
