import { gql } from "@apollo/client";


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

export type GetAllDoctorsResponse = {
   getAllDoctors: DoctorT[]
}

export const GET_ALL_DOCTORS = gql`
  query {
  getAllDoctors {
    name,
    rooms,
    specialization
  }
}
`