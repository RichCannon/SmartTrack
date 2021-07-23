import { FC } from 'react'
import EditIcon from '../StuffCard/assets/EditIcon'
import s from './StatusCard.module.css'

type StatusCard = {
   idx: number
   description: string
   color: string
   onEditClick: () => void
}

const StatusCard: FC<StatusCard> = ({ idx, description, color, onEditClick }) => {
   return (
      <div className={s.container}>
         <div className={s.idxWrapper}>{idx}</div>
         <div className={s.description}>{description}</div>
         <div className={s.circleWrapper}>
            <div className={s.circle}
               onClick={onEditClick}
               style={{ background: `${color}33`, border: `1px solid ${color}` }} />
         </div>
         <div className={s.editIcon}><EditIcon /></div>
      </div>
   )
}

export default StatusCard