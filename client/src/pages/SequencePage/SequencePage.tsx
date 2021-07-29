
import { useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
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
   GetDoctorSequencePayload, GetDoctorSequenceResponse,
   GET_DOCTORS_SEQUENCE,
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

   const [isVisible, setIsVisible] = useState(false)

   const onCompletedGetDoctor = (response: GetDoctorSequenceResponse) => {
      const { _id, name, } = response.getByRole[0]

      const currentId = currentDoc ? currentDoc.value : response.getByRole[0]._id

      setCurrentDoc({ value: _id, label: name })

      let roomsList: RoomT[] = []
      for (let index = 0; index < response.getByRole.length; index++) {
         const d = response.getByRole[index];

         if (d._id === currentId) {
            setChosenRooms(d.docRooms.map(s => ({ ownerId: d._id, docName: d.name, name: s.name, _id: s._id })))
         }
         else {
            roomsList = [...roomsList, ...d.docRooms.map(s => ({ ownerId: d._id, docName: d.name, name: s.name, _id: s._id }))]
         }
      }

      setRoomsList(roomsList)
   }


   const { data, loading, error } =
      useQuery<GetDoctorSequenceResponse, GetDoctorSequencePayload>(GET_DOCTORS_SEQUENCE, {
         onCompleted: onCompletedGetDoctor,
         variables: { role: `doctor` }
      })


   const [createRoom, { data: createRoomdata, loading: createRoomLoading }] = useMutation<CreateRoomResponse, CreateRoomPayload>(CREATE_ROOM)

   const [changeAllRoomOwner, { data: changeAllRoomOwnerData, loading: changeAllRoomOwnerLoad }] =
      useMutation<ChangeAllRoomOwnerResponse, ChangeAllRoomOwnerPayload>(CHANGE_ALL_ROOM_OWNER)

   console.log(`getByRole: `, data?.getByRole)

   //   const [currentDndCard, setCurrentDndCard] = useState<typeof roomCard[0] | null>(null)

   const onChange = (value: OptionsT | null) => {
      setCurrentDoc(value)

      const currentId = value?.value

      if (currentId && data) {
         const response = data

         let roomsList: RoomT[] = []
         for (let index = 0; index < response.getByRole.length; index++) {
            const d = response.getByRole[index];

            if (d._id === currentId) {
               setChosenRooms(d.docRooms.map(s => ({ ownerId: d._id, docName: d.name, name: s.name, _id: s._id })))
            }
            else {
               roomsList = [...roomsList, ...d.docRooms.map(s => ({ ownerId: d._id, docName: d.name, name: s.name, _id: s._id }))]
            }
         }

         setRoomsList(roomsList)
      }
      //getRoomsWithoutOneDoc({ variables: { docId: value!.value } })
   }



   // const onDragStart = (e: React.DragEvent<HTMLDivElement>, card: DndRoomCardDataT) => {
   //    setCurrentDndCard(card)
   // }
   // const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
   //    e.preventDefault()
   // }
   // const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {

   // }
   // const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
   //    setCurrentDndCard(null)
   // }
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
   }

   const [roomName, setRoomName] = useState(``)

   const onRoomNameChange = (value: string) => {
      setRoomName(value)
   }

   const onSaveClick = async () => {
      await createRoom({ variables: { data: { name: roomName } } })
      // getRoomsWithoutOneDoc({ variables: { docId: currentDoc!.value } })
   }


   const onSaveRoomsClick = async () => {
      const payload = { roomsId: chosenRooms.map(d => d._id), docId: currentDoc!.value }
      changeAllRoomOwner({
         variables: { data: payload },
         refetchQueries: [{
            query: GET_DOCTORS_SEQUENCE,
            variables: { role: `doctor` },
         }],
      })
   }


   console.log(`currentDoc`, currentDoc)
   return (
      <div className={s.container}>
         {isVisible &&
            <Modal onDismissClick={onDismissClick}>
               <AddRoomModal
                  onSaveClick={onSaveClick}
                  roomName={roomName}
                  onRoomNameChange={onRoomNameChange}
                  isLoading={loading || createRoomLoading} />
            </Modal>
         }
         {loading
            ? <Preloader />
            : <DragDropContext
               onDragEnd={onDrop}>
               <MyButton label={`Save`} onButtonClick={onSaveRoomsClick} labelClassName={s.buttonText} />
               <div className={s.title}>{`Choose a Doctor`}</div>
               <div className={s.select}>
                  <MySelect onChange={onChange} value={currentDoc} options={data ? data!.getByRole.map(d => ({ value: d._id, label: d.name })) : []} />
               </div>
               <Droppable direction={`grid`} droppableId={FIELD_TO_ADD_ROOM}>
                  {(provided: any) => <div
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                     className={s.dndContainer}>
                     {chosenRooms.length > 0
                        ? chosenRooms.map((d, idx) =>
                           <DndRoomCard
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