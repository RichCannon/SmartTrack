import { ApolloCache, FetchResult, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'

import DashboardCard from '../../components/DashboardCard/DashboardCard'
import Modal from '../../components/Modal/Modal'
import Preloader from '../../components/Preloader/Preloader'
import SetStatusModal from '../../components/SetStatusModal/SetStatusModal'
import { GetAllStatusesResponse, GET_ALL_STATUSES } from '../../graphql/allerts'
import {
   GetByRoleResponse, GetByRolePayload,
   GET_USER_BY_ROLE, SET_STATUS_TO_ROOM,
   SetStatusRoomResponse, SetStatusRoomPayload
} from '../../graphql/dashboard'
import s from './DashboardPage.module.scss'




const DashboardPage = () => {

   const [isVisible, setIsVisible] = useState(false)
   const [currentRoom, setCurrentRoom] = useState(``)

   const { loading, error, data } = useQuery<GetByRoleResponse, GetByRolePayload>(GET_USER_BY_ROLE, {
      variables: { role: `doctor` }
   })

   const [setStatusToRoom,
      { loading: setStatusToRoomLoad }] = useMutation<SetStatusRoomResponse, SetStatusRoomPayload>(SET_STATUS_TO_ROOM)

   const { data: statusesData, loading: statusesDataLoad } = useQuery<GetAllStatusesResponse>(GET_ALL_STATUSES)

   const onRoomCardClick = (_id: string) => {
      setIsVisible(true)
      setCurrentRoom(_id)
   }

   const onDismissClick = () => {
      setIsVisible(false)
      setCurrentRoom(``)
   }



   const setStatusUpdateCache = (
      cache: ApolloCache<SetStatusRoomResponse>,
      { data }: FetchResult<SetStatusRoomResponse, Record<string, any>, Record<string, any>>
   ) => {

      const existData = cache.readQuery<GetByRoleResponse>({
         query: GET_USER_BY_ROLE,
         variables: { role: `doctor` }
      })

      console.log(`existData`, existData)

      const newRoom = data!.setRoomStatus

      const newStatus = statusesData!.getAllStatuses.filter(s => s._id === newRoom?.status)[0]

      const newData = existData!.getByRole.map(doc => (doc._id === newRoom?.ownerId
         ? {
            ...doc, docRooms: doc.docRooms.map(room => (room._id === newRoom._id
               ? { ...newRoom, statusData: newStatus }
               : room)
            )
         }
         : doc))


      console.log(`newData`, newData)

      cache.writeQuery<GetByRoleResponse>({
         query: GET_USER_BY_ROLE,
         data: { getByRole: newData },
         variables: { role: `doctor` }
      })

   }



   const onAlertClick = async (_id: string) => {
      await setStatusToRoom({
         variables: { data: { roomId: currentRoom, statusId: _id } },
         update: setStatusUpdateCache
      })
      setCurrentRoom(``)
      setIsVisible(false)
   }

   return (
      <div className={s.container}>
         {isVisible &&
            <Modal onDismissClick={onDismissClick}>
               <SetStatusModal isLoading={setStatusToRoomLoad}
                  onAlertClick={onAlertClick}
                  alerts={statusesData ? statusesData.getAllStatuses : []} />
            </Modal>
         }
         {loading
            ? <Preloader />
            : data
               ? data.getByRole.map((d, idx) => <DashboardCard onRoomCardClick={onRoomCardClick} key={`DashboardCard_${idx}`} {...d} />)
               : []
         }
      </div>
   )
}

export default DashboardPage