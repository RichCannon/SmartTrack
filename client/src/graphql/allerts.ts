import { gql } from "@apollo/client"


export type StatusT = {

   _id: string
   description: string
   color: string
}

export type GetAllStatusesResponse = {
   getAllStatuses: StatusT[]
}

export const GET_ALL_STATUSES = gql`
   query getAllStatuses  {
      getAllStatuses {
         _id,
         description,
         color
      }
   }
`


export type CreateStatusPaylaod = {
   data: {

      color: string
      description: string
   }
}

export type CreateStatusResponse = {
   createStatus: {
      color: string
      description: string
      _id: string
   }
}

export const ADD_STATUS = gql`
   mutation AddStatus($data: CreateStatusInput!) {
      createStatus(data: $data) {
         color,
         description,
         _id
      }
   }
`

export type UpdateStatusPaylaod = & {
   data: { _id: string } & CreateStatusPaylaod["data"]
}

export type UpdateStatusResponse = {
   updateStatus: CreateStatusResponse["createStatus"]
}

export const UPDATE_STATUS = gql`
   mutation UpdateStatus($data: UpdateStatusInput!) {
      updateStatus(data: $data) {
         color,
         description,
         _id
      }
   }
`