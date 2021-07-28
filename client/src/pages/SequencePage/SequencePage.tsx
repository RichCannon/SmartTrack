
import { useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
// @ts-ignore
import { DragDropContext, Droppable, DropResult } from 'aligned-rbd'

import DndRoomCard from '../../components/DndRoomCard/DndRoomCard'
import s from './SequencePage.module.css'
import MySelect, { OptionsT } from '../../components/MySelect/MySelect'
import { CreateRoomPayload, CreateRoomResponse, CREATE_ROOM, GetDoctorSequencePayload, GetDoctorSequenceResponse, GET_DOCTORS_SEQUENCE, GET_ROOM_WOTHOUT_ONE_DOC, RoomWithoutOneDocPayload, RoomWithoutOneDocResponse, RoomWithoutOneDocT } from '../../graphql/sequence'
import Preloader from '../../components/Preloader/Preloader'
import Modal from '../../components/Modal/Modal'
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal'

export type DndRoomCardDataT = {
   idx: number
   roomName: string
   doctor: string
}


//const doctors = [`Alex Sample`, `Alex Sample2`, `Alex Sample3`]

const roomCard = new Array(20).fill(null).map((d, idx) => ({
   idx,
   roomName: `${idx + 1}b`,
   doctor: `Alex${idx + 1}`
}))




const FIELD_TO_ADD_ROOM = `fieldToAddRoom`
const FIELD_WITH_AVAIB_ROOMS = `fieldWithAvailableRooms`

type CurrentDocT = OptionsT



const SequencePage = () => {
   const [currentDoc, setCurrentDoc] = useState<CurrentDocT | null>(null)

   const [roomsList, setRoomsList] = useState<RoomWithoutOneDocT[]>([])
   const [chosenRooms, setChosenRooms] = useState<RoomWithoutOneDocT[]>([])

   const [isVisible, setIsVisible] = useState(false)

   const onCompletedGetDoctor = (response: GetDoctorSequenceResponse) => {
      setCurrentDoc({ value: response.getByRole[0]._id, label: response.getByRole[0].name })
      setChosenRooms(response.getByRole[0].docRooms.map(d => ({ ...d, doc: { _id: response.getByRole[0]._id, name: response.getByRole[0].name } })))
      getRoomsWithoutOneDoc({ variables: { docId: response.getByRole[0]._id } })
   }

   const onCompletedGetRooms = (response: RoomWithoutOneDocResponse) => {
      console.log(`withonedoc:`, response.getRoomsWithoutOneDoc)
      setRoomsList(response.getRoomsWithoutOneDoc)
   }

   const { data, loading, error } =
      useQuery<GetDoctorSequenceResponse, GetDoctorSequencePayload>(GET_DOCTORS_SEQUENCE, {
         onCompleted: onCompletedGetDoctor,
         variables: { role: `doctor` }
      })

   const [getRoomsWithoutOneDoc, { data: roomsData, loading: roomsLoading }] =
      useLazyQuery<RoomWithoutOneDocResponse, RoomWithoutOneDocPayload>(GET_ROOM_WOTHOUT_ONE_DOC, {
         onCompleted: onCompletedGetRooms,
      })

   const [createRoom, { data: createRoomdata, loading: createRoomLoading }] = useMutation<CreateRoomResponse, CreateRoomPayload>(CREATE_ROOM)

   console.log(`getByRole: `, data?.getByRole)

   //   const [currentDndCard, setCurrentDndCard] = useState<typeof roomCard[0] | null>(null)

   const onChange = (value: OptionsT | null) => {
      setCurrentDoc(value)
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
      //console.log(`e.source.index`, e.source.index)

      // const index = e.source.index - 1

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
      getRoomsWithoutOneDoc({ variables: { docId: currentDoc!.value } })
   }

   return (
      <div className={s.container}>
         {isVisible &&
            <Modal onDismissClick={onDismissClick}>
               <AddRoomModal
                  onSaveClick={onSaveClick}
                  roomName={roomName}
                  onRoomNameChange={onRoomNameChange}
                  isLoading={loading || roomsLoading || createRoomLoading} />
            </Modal>
         }
         {loading || roomsLoading
            ? <Preloader />
            : <DragDropContext
               onDragEnd={onDrop}>
               <div className={s.title}>{`Choose a Doctor`}</div>
               <div className={s.select}>
                  <MySelect onChange={onChange} value={currentDoc} options={data!.getByRole.map(d => ({ value: d._id, label: d.name }))} />
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
                        {roomsList.map((d, idx) => <DndRoomCard
                           idx={idx}
                           key={d._id}
                           roomName={d.name}
                           doctor={d.doc.name} />)
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