import { gql } from "@apollo/client";

import { RoleT } from "../types/types";
import { StatusT } from "./allerts";




export type RoomT = {
   name: string
   status: string
   _id: string
   ownerId: string
   statusData: StatusT
}

export type UserT = {
   _id: string
   name: string
   specialization: string
   email: string
   phoneNum: string
   docRooms: RoomT[]
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
   _id,
    name,
    specialization,
    email,
    phoneNum,
    docRooms {
      name,
      _id,
      ownerId,
      statusData {
         description,
         color
      }
    }
  }
}
`

export type SetStatusRoomResponse = {
   setRoomStatus: {
      _id: string
      ownerId: string
      status: string
      name: string
   }
}

export type SetStatusRoomPayload = {
   data: {
      roomId: string
      statusId: string
   }
}

export const SET_STATUS_TO_ROOM = gql`
   mutation SetStatusToRoom($data: SetRoomStatusInput!) {
      setRoomStatus(data: $data) {
         _id,
         ownerId,
         status,
         name
      }
   }
`
