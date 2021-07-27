
import { ApolloCache, FetchResult, useMutation, useQuery } from '@apollo/client'
import { useState, FC } from 'react'

import AddAllertModal from '../../components/AddAllertModal/AddAllertModal'
import Modal from '../../components/Modal/Modal'
import MyButton from '../../components/MyButton/MyButton'
import Preloader from '../../components/Preloader/Preloader'
import StatusCard from '../../components/StatusCard/StatusCard'
import {
   ADD_STATUS, CreateStatusResponse, CreateStatusPaylaod,
   GET_ALL_STATUSES, GetAllStatusesResponse, UpdateStatusPaylaod, StatusT, UPDATE_STATUS, UpdateStatusResponse
} from '../../graphql/allerts'
import s from './AllertsPage.module.css'



const updateStatusUpdateCache = (
   cache: ApolloCache<UpdateStatusResponse>,
   { data }: FetchResult<UpdateStatusResponse, Record<string, any>, Record<string, any>>) => {

   const existData = cache.readQuery<GetAllStatusesResponse>({
      query: GET_ALL_STATUSES
   })

   const newStatus = data?.updateStatus
   const updatedData = existData?.getAllStatuses.map(d => d._id === newStatus?._id ? newStatus : d)

   cache.writeQuery({
      query: GET_ALL_STATUSES,
      data: { getAllStatuses: updatedData }
   })
}

const createStatusUpdateCache = (   
   cache: ApolloCache<CreateStatusResponse>,
   { data }: FetchResult<CreateStatusResponse, Record<string, any>, Record<string, any>>) => {

   const existData = cache.readQuery<GetAllStatusesResponse>({
      query: GET_ALL_STATUSES
   })

   const newStatus = data?.createStatus

   cache.writeQuery({
      query: GET_ALL_STATUSES,
      data: { getAllStatuses: [...existData!.getAllStatuses, newStatus] }
   })
}




const colors = [`#EE5897`, `#86E8EE`, `#FA700C`, `#E485F3`, `#C4E6E9`, `#78F275`]

const AllertsPage: FC = () => {

   const [currentStatusId, setCurrentStatusId] = useState(``)






   const clearState = () => {
      setColorName(``)
      setClickedColor(``)
      setCurrentStatusId(``)
      setIsVisible(false)
   }

   const onCompleted = () => {
      clearState()
   }

   const [createStatus, { loading: createStatusLoad }] = useMutation<CreateStatusResponse, CreateStatusPaylaod>(ADD_STATUS, {
      update: createStatusUpdateCache,
      onCompleted
   })

   const [updateStatus, { loading: updateStatusLoad }] = useMutation<UpdateStatusResponse, UpdateStatusPaylaod>(UPDATE_STATUS, {
      update: updateStatusUpdateCache,
      onCompleted
   })


   const { loading, error, data: statusesData } = useQuery<GetAllStatusesResponse>(GET_ALL_STATUSES)


   const [clickedColor, setClickedColor] = useState<string | null>(null)
   const [colorName, setColorName] = useState(``)


   const [isVisible, setIsVisible] = useState(false)




   const onButtonClick = () => {
      setIsVisible(true)
   }

   const onEditClick = (payload: StatusT) => {
      setIsVisible(true)
      setClickedColor(payload.color)
      setColorName(payload.description)
      setCurrentStatusId(payload._id)
   }

   const onSaveClick = () => {

      try {
         if (clickedColor && colorName) {
            if (currentStatusId) {
               updateStatus({ variables: { data: { color: clickedColor, description: colorName, _id: currentStatusId } } })
            }
            else {
               createStatus({ variables: { data: { color: clickedColor, description: colorName } } })
            }
         }
      } catch (e) {
         console.log(e)
      }
   }

   const onColorClick = (color: string) => {
      setClickedColor(color)
   }

   const onDismissClick = () => {
      clearState()
   }

   const onColorNameChange = (value: string) => {
      setColorName(value)
   }


   return (
      <div className={s.container}>
         {isVisible &&
            <Modal onDismissClick={onDismissClick}>
               <AddAllertModal
                  isLoading={createStatusLoad || updateStatusLoad}
                  onCrossClick={onDismissClick}
                  colorName={colorName}
                  onTextChange={onColorNameChange}
                  onColorClick={onColorClick}
                  clickedColor={clickedColor}
                  colors={colors}
                  onSaveClick={onSaveClick} />
            </Modal>
         }
         {loading
            ? <Preloader />
            : <>
               <MyButton label={`Add new`}

                  onButtonClick={onButtonClick}
                  className={s.button}
                  labelClassName={s.buttonText} />
               <div className={s.statusCardWrapper}>
                  {statusesData && statusesData?.getAllStatuses.map((d, idx) => (
                     <div className={s.statusCard} key={d.description}>
                        <StatusCard
                           idx={idx + 1}
                           description={d.description}
                           color={d.color}
                           onEditClick={() => onEditClick(d)} />
                     </div>
                  ))
                  }
               </div>
            </>
         }
      </div>
   )
}

export default AllertsPage

// const data = [
//    {
//       description: `Patient`,
//       color: `#74C386`
//    },
//    {
//       description: `Patient2`,
//       color: `#74C386`
//    },
//    {
//       description: `Patient3`,
//       color: `#74C386`
//    },
//    {
//       description: `Patient4`,
//       color: `#74C386`
//    },
// ]