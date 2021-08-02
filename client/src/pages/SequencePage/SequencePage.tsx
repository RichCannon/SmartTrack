
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
// @ts-ignore
import { DragDropContext, Droppable, DropResult } from 'aligned-rbd'

import DndRoomCard from '../../components/DndRoomCard/DndRoomCard'
import s from './SequencePage.module.css'
import MySelect, { OptionsT } from '../../components/MySelect/MySelect'
import {
   ChangeAllRoomOwnerPayload,
   ChangeAllRoomOwnerResponse,
   CHANGE_ALL_ROOM_OWNER,
   CreateRoomPayload, CreateRoomResponse, CREATE_ROOM,
   DeleteRoomPayload,
   DeleteRoomResponse,
   DELETE_ROOM,
   GetAllRoomsResponse,
   GetDoctorSequencePayload, GetDoctorSequenceResponse,
   GET_ALL_ROOMS,
   GET_DOCTORS_SEQUENCE,
   UpdateRoomPayload,
   UpdateRoomResponse,
   UPDATE_ROOM,
} from '../../graphql/sequence'
import Preloader from '../../components/Preloader/Preloader'
import Modal from '../../components/Modal/Modal'
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal'
import MyButton from '../../components/MyButton/MyButton'

export type DndRoomCardDataT = {
   idx: number
   roomName: string
   doctor: string
}


//const doctors = [`Alex Sample`, `Alex Sample2`, `Alex Sample3`]

// const roomCard = new Array(20).fill(null).map((d, idx) => ({
//    idx,
//    roomName: `${idx + 1}b`,
//    doctor: `Alex${idx + 1}`
// }))

// const refetchQueriesOnMutation = [
//    {
//       query: GET_DOCTORS_SEQUENCE,
//       variables: { role: `doctor` },
//    },
//    {
//       query: GET_ALL_ROOMS
//    }
// ]


const FIELD_TO_ADD_ROOM = `fieldToAddRoom`
const FIELD_WITH_AVAIB_ROOMS = `fieldWithAvailableRooms`

type CurrentDocT = OptionsT

type RoomT = {
   ownerId: string
   _id: string
   name: string
   docName: string
}


const SequencePage = () => {
   const [currentDoc, setCurrentDoc] = useState<CurrentDocT | null>(null)

   const [roomsList, setRoomsList] = useState<RoomT[]>([])
   const [chosenRooms, setChosenRooms] = useState<RoomT[]>([])
   const [docOptions, setDocOptions] = useState<OptionsT[]>([])

   const [isLoading, setIsLoading] = useState(false)

   const [isVisible, setIsVisible] = useState(false)


   const { refetch: getAllDoctors } =
      useQuery<GetDoctorSequenceResponse, GetDoctorSequencePayload>(GET_DOCTORS_SEQUENCE, {
         skip: true,
         variables: { role: `doctor` }
      })

   const { refetch: getAllRooms } =
      useQuery<GetAllRoomsResponse>(GET_ALL_ROOMS, {
         skip: true
      })

   const serializeResponse = async (doc?: OptionsT | null) => {
      setIsLoading(true)
      const { data: { getByRole: doctors } } = await getAllDoctors()
      const { data: { getAllRooms: rooms } } = await getAllRooms()

      const currentDoc = doc ? doc : { value: doctors[0]._id, label: doctors[0].name }
      setCurrentDoc(currentDoc)

      let chosenRooms: RoomT[] = []
      let roomsList: RoomT[] = []

      for (let i = 0; i < rooms.length; i++) {
         const el = rooms[i]
         if (el.ownerId === currentDoc.value) {
            chosenRooms = [...chosenRooms, { ...el, docName: currentDoc.label }]
         }
         else {
            const docNameArr = doctors.filter(d => d._id === el.ownerId)
            const docName = docNameArr.length > 0 ? docNameArr[0].name : ``
            roomsList = [...roomsList, { ...el, docName }]
         }
      }

      setChosenRooms(chosenRooms)
      setRoomsList(roomsList)

      setDocOptions(doctors.map(d => ({ value: d._id, label: d.name })))

      setIsLoading(false)
   }

   useEffect(() => {
      serializeResponse()
   }, [])



   const [createRoom] = useMutation<CreateRoomResponse, CreateRoomPayload>(CREATE_ROOM)
   const [updateRoom] = useMutation<UpdateRoomResponse, UpdateRoomPayload>(UPDATE_ROOM)
   const [deleteRoom] = useMutation<DeleteRoomResponse, DeleteRoomPayload>(DELETE_ROOM)


   const [changeAllRoomOwner, { loading: changeAllRoomLoading }] =
      useMutation<ChangeAllRoomOwnerResponse, ChangeAllRoomOwnerPayload>(CHANGE_ALL_ROOM_OWNER)

   const onChange = (value: OptionsT | null) => {
      serializeResponse(value)
   }



   const onDrop = (e: DropResult) => {

      if (e.source.droppableId !== e.destination?.droppableId) {
         if (e.destination?.droppableId === FIELD_TO_ADD_ROOM) {

            setChosenRooms(chosenRooms => [...chosenRooms, roomsList[e.source.index]])
            setRoomsList(roomsList => roomsList.filter((d, idx) => idx !== e.source.index))
         }

         if (e.destination?.droppableId === FIELD_WITH_AVAIB_ROOMS) {
            setRoomsList(roomsList => [...roomsList, chosenRooms[e.source.index]])
            setChosenRooms(chosenRooms => chosenRooms.filter((d, idx) => idx !== e.source.index))
         }
      }
   }


   const onAddRoomClick = () => {
      setIsVisible(true)
   }


   const onDismissClick = () => {
      setIsVisible(false)
      setRoomName(``)
      setCurrentRoomId(``)
   }

   const [roomName, setRoomName] = useState(``)
   const [currentRoomId, setCurrentRoomId] = useState(``)

   const onRoomNameChange = (value: string) => {
      if (value.length < 4) {
         setRoomName(value)
      }
   }

   const onSaveClick = async () => {

      if (currentRoomId) {
         await updateRoom({
            variables: {
               data: {
                  roomName,
                  id: currentRoomId
               }
            }
         })
      }
      else {
         await createRoom({
            variables: { data: { name: roomName } }, context: { authorization: `Bearer ZALUPA` }
         })
      }
      await serializeResponse(currentDoc)
      setIsVisible(false)
   }


   const onSaveRoomsClick = async () => {
      const payload = { roomsId: chosenRooms.map(d => d._id), docId: currentDoc!.value }
      await changeAllRoomOwner({
         variables: { data: payload },
      })
      await serializeResponse(currentDoc)
      setCurrentRoomId(``)
      setRoomName(``)
   }

   const onEditClick = (id: string, roomName: string) => {
      setIsVisible(true)
      onRoomNameChange(roomName)
      setCurrentRoomId(id)
   }

   const onCrossClick = async (id: string) => {
      const areYouSure = window.confirm(`Are you sure?`)
      if (areYouSure) {
         await deleteRoom({ variables: { data: { id } } })
         await serializeResponse(currentDoc)
      }
   }

   return (
      <div className={s.container}>
         {isVisible &&
            <Modal onDismissClick={onDismissClick}>
               <AddRoomModal
                  onSaveClick={onSaveClick}
                  roomName={roomName}
                  onRoomNameChange={onRoomNameChange}
                  isLoading={isLoading} />
            </Modal>
         }
         {isLoading || changeAllRoomLoading
            ? <Preloader />
            : <DragDropContext
               onDragEnd={onDrop}>
               <MyButton label={`Save`} onButtonClick={onSaveRoomsClick} labelClassName={s.buttonText} />
               <div className={s.title}>{`Choose a Doctor`}</div>
               <div className={s.select}>
                  <MySelect onChange={onChange} value={currentDoc} options={docOptions} />
               </div>
               <Droppable direction={`grid`} droppableId={FIELD_TO_ADD_ROOM}>
                  {(provided: any) => <div
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                     className={s.dndContainer}>
                     {chosenRooms.length > 0
                        ? chosenRooms.map((d, idx) =>
                           <DndRoomCard
                              id={d._id}
                              onEditClick={onEditClick}
                              onCrossClick={onCrossClick}
                              key={d._id}
                              idx={idx}
                              roomName={d.name}
                              doctor={currentDoc!.label} />)
                        : <div className={s.dndCenterText}>{`Drag and Drop rooms to the box`}</div>
                     }
                     {provided.placeholder}
                  </div>
                  }
               </Droppable>
               <div className={s.dndTitle}>
                  {`Drag and Drop rooms to the box`}
               </div>
               <Droppable direction={`grid`} droppableId={FIELD_WITH_AVAIB_ROOMS}>
                  {(provided: any) =>
                     <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={s.dndCardWrapper}>
                        <div onClick={onAddRoomClick} className={s.circlePlusWrapper}>
                           <div className={s.circlePlus}>
                              <div className={s.plus} />
                              <div className={s.minus} />
                           </div>
                           <div className={s.addText}>{`Add a room`}</div>
                        </div>
                        {roomsList.map((d, idx) =>
                           <DndRoomCard
                              onEditClick={onEditClick}
                              onCrossClick={onCrossClick}
                              id={d._id}
                              idx={idx}
                              key={d._id}
                              roomName={d.name}
                              doctor={d.docName} />)
                        }
                        {provided.placeholder}
                     </div>}
               </Droppable>
            </DragDropContext>}
      </div >
   )
}

export default SequencePage


// function getStyle(style:any, snapshot:any) {
   //    if (!snapshot.isDropAnimating) {
   //      return style;
   //    }
   //    return {
   //      ...style,
   //      // cannot be 0, but make it super tiny
   //      transitionDuration: `0.001s`,
   //    };
   //  }