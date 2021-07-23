
import { useState } from 'react'
// @ts-ignore
import { DragDropContext, Droppable, DropResult } from 'aligned-rbd'

import DndRoomCard from '../../components/DndRoomCard/DndRoomCard'
import s from './SequencePage.module.css'

export type DndRoomCardDataT = {
   idx: number
   roomName: string
   doctor: string
}


const doctors = [`Alex Sample`, `Alex Sample2`, `Alex Sample3`]

const roomCard = new Array(20).fill(null).map((d, idx) => ({
   idx,
   roomName: `${idx + 1}b`,
   doctor: `Alex${idx + 1}`
}))




const FIELD_TO_ADD_ROOM = `fieldToAddRoom`
const FIELD_WITH_AVAIB_ROOMS = `fieldWithAvailableRooms`


const SequencePage = () => {
   const [currentDoc, setCurrentDoc] = useState(doctors[0])

   const [roomsList, setRoomsList] = useState(roomCard)
   const [chosenRooms, setChosenRooms] = useState<typeof roomCard>([])

  //   const [currentDndCard, setCurrentDndCard] = useState<typeof roomCard[0] | null>(null)

   const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentDoc(e.currentTarget.value)
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

   function getStyle(style:any, snapshot:any) {
      if (!snapshot.isDropAnimating) {
        return style;
      }
      return {
        ...style,
        // cannot be 0, but make it super tiny
        transitionDuration: `0.001s`,
      };
    }


   return (
      <div className={s.container}>
         <DragDropContext

            onDragEnd={onDrop}>
            <div className={s.title}>{`Choose a Doctor`}</div>
            <select onChange={onChange} value={currentDoc} className={s.select}>
               {doctors.map(doc => <option value={doc} key={doc}>{doc}</option>)}
            </select>
            <Droppable direction={`grid`} droppableId={FIELD_TO_ADD_ROOM}>
               {(provided: any, snapshot: any) => <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={s.dndContainer}>
                  {chosenRooms.length > 0
                     ? chosenRooms.map((d, idx) => <DndRoomCard
                        idx={idx}
                        key={d.roomName}
                        roomName={d.roomName}
                        doctor={d.doctor} />)
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
                     <div className={s.circlePlusWrapper}>
                        <div className={s.circlePlus}>
                           <div className={s.plus} />
                           <div className={s.minus} />
                        </div>
                        <div className={s.addText}>{`Add a room`}</div>
                     </div>
                     {roomsList.map((d, idx) => <DndRoomCard
                        idx={idx}
                        key={d.roomName}
                        roomName={d.roomName}
                        doctor={d.doctor} />)
                     }
                     {provided.placeholder}
                  </div>}
            </Droppable>
         </DragDropContext>
      </div >
   )
}

export default SequencePage