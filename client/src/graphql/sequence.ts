import { gql } from "@apollo/client";

import { RoleT } from "../types/types";


export type GetDoctorSequencePayload = {
   role: RoleT
}

export type GetDoctorSequenceResponse = {
   getByRole: {
      _id: string
      name: string
      docRooms: {
         _id: string
         name: string
      }
   }[]
}

export const GET_DOCTORS_SEQUENCE = gql`
   query GetDoctors($role: String!) {
      getByRole(role: $role) {
         _id,
         name,
         docRooms {
            _id,
            name,
            
         }
      }
   }
`