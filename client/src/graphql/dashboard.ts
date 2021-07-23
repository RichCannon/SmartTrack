import { gql } from "@apollo/client";
import { RoleT } from "../types/types";


export type RoomT = {
   name: string
   description: string
   color: string
}

export type DoctorT = {
   name: string
   rooms: RoomT[]
   specialization: string
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