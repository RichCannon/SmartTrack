import { FC } from 'react'

import DeleteIcon from './assets/DeleteIcon'
import EditIcon from './assets/EditIcon'
import s from './StuffCard.module.css'

type StuffCard = {
   number: number
   name: string,
   email: string
   phoneNum: string
   rooms: string[],
   statuses: string[]
   onEditClick: () => void
   onDeleteClick: () => void
}

const StuffCard: FC<StuffCard> = ({
   number,
   name,
   email,
   phoneNum,
   rooms,
   statuses,
   onEditClick,
   onDeleteClick }) => {

   return (
      <div className={s.container}>
         <div className={s.index}>{number}</div>
         <div className={s.content}>
            <div className={s.iconsWrapper}>
               <div onClick={onEditClick} className={s.iconWrapper}><EditIcon /></div>
               <div onClick={onDeleteClick} className={s.iconWrapper}><DeleteIcon /></div>
            </div>
            <div className={s.name}>{name}</div>
            <div className={s.email}>{email}</div>
            <div className={s.phoneNum}>{phoneNum}</div>
            <div className={s.roomsWrapper}>
               <div>{`Rooms: ${rooms.join(`,`)}`}</div>
            </div>
            <div className={s.statusesWrapper}>
               {statuses.map(d => (
                  <div key={d} className={s.statuses} style={{ background: d }} />
               ))}
            </div>
         </div>
      </div>
   )
}

export default StuffCard