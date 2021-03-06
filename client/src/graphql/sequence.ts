import { gql } from "@apollo/client";

import { RoleT } from "../types/types";




export type GetAllRoomsResponse = {
   getAllRooms: {
      _id: string
      name: string
      ownerId: string
   }[]
}

export const GET_ALL_ROOMS = gql`
   query GetAllRooms {
      getAllRooms {
         _id,
         name,
         ownerId
      }
   }
`


export type GetDoctorSequencePayload = {
   role: RoleT
}

export type GetDoctorSequenceResponse = {
   getByRole: {
      _id: string
      name: string
   }[]
}

export const GET_DOCTORS_SEQUENCE = gql`
   query GetDoctors($role: String!) {
      getByRole(role: $role) {
         _id,
         name,
      }
   }
`

// export type RoomWithoutOneDocT = {
//    _id: string
//    name: string
//    doc: {
//       _id: string
//       name: string
//    }[]
// }

// export type RoomWithoutOneDocResponse = {
//    getRoomsWithoutOneDoc: RoomWithoutOneDocT[]
// }

// export type RoomWithoutOneDocPayload = {
//    docId: string
// }

// export const GET_ROOM_WOTHOUT_ONE_DOC = gql`
//    query GetRoomsWithoutOneDoc($docId: String!) {
//       getRoomsWithoutOneDoc(docId: $docId) {
//          _id,
//          name,
//          doc {
//             _id,
//             name
//          }
//       }
//    }
// `

export type CreateRoomResponse = {
   createRoom: boolean
}

export type CreateRoomPayload = {
   data: {
      name: string
   }
}

export const CREATE_ROOM = gql`
   mutation CreateRoom($data: CreateRoomInput!) {
      createRoom(data: $data)
   }
`

export type UpdateRoomResponse = {
   updateRoom: boolean
}

export type UpdateRoomPayload = {
   data: {
      roomName: string
      id: string
   }
}

export const UPDATE_ROOM = gql`
   mutation UpdateRoom($data: UpdateRoomInput!) {
      updateRoom(data: $data)
   }
`

export type DeleteRoomResponse = {
   deleteRoon: boolean
}

export type DeleteRoomPayload = {
   data: {
      id: string
   }
}

export const DELETE_ROOM = gql`
   mutation DeleteRoom($data: DeleteRoomInput!) {
      deleteRoom(data: $data)
   }
`



export type ChangeAllRoomOwnerPayload = {
   data: {
      docId: string
      roomsId: string[]
   }

}

export type ChangeAllRoomOwnerResponse = {
   changeAllRoomOwner: boolean
}

export const CHANGE_ALL_ROOM_OWNER = gql`
   mutation changeAllRoomOwner($data: ChangeAllRoomOwnerInputArr!) {
      changeAllRoomOwner(data: $data)
   }
`