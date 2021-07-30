import { FC } from 'react'
// @ts-ignore
import { Draggable } from 'aligned-rbd'
import EditIcon from '../StuffCard/assets/EditIcon'
import CrossIcon from './assets/CrossIcon'
import s from './DndRoomCard.module.css'

type DndRoomCardP = {
   roomName: string
   doctor: string
   idx: number
}

const DndRoomCard: FC<DndRoomCardP> = ({
   idx,
   roomName,
   doctor,
}) => {



   return (
      <Draggable draggableId={roomName} index={idx}>{
         (provided:any) =>
            <div
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               ref={provided.innerRef}
               className={s.container}>
               <div className={s.header}>
                  <div><CrossIcon /></div>
                  <div><EditIcon /></div>
               </div>
               <div className={s.circle}>
                  <div className={s.roomName}>
                     {roomName}
                  </div>
               </div>
               <div className={s.doctorName}>
                  {doctor}
               </div>
            </div>}
      </Draggable>
   )
}

export default DndRoomCard