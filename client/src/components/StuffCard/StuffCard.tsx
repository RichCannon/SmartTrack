import { FC } from 'react'

import { RoomsStuff } from '../../graphql/stuff'
import DeleteIcon from './assets/DeleteIcon'
import DoctorIcon from './assets/DoctorIcon'
import EditIcon from './assets/EditIcon'
import s from './StuffCard.module.scss'

type StuffCardP = {
   number: number
   name: string,
   email: string
   phoneNum: string
   rooms: RoomsStuff[] | null
   onEditClick: () => void
   onDeleteClick: () => void
   onDoctorClick?: () => void
}

const StuffCard: FC<StuffCardP> = ({
   number,
   name,
   email,
   phoneNum,
   rooms,
   onEditClick,
   onDeleteClick,
   onDoctorClick }) => {



   return (
      <div className={s.container}>
         <div className={s.index}>{number}</div>
         <div className={s.content}>
            <div className={s.iconsWrapper}>
               <div onClick={onEditClick} className={s.iconWrapper}><EditIcon /></div>
               <div onClick={onDeleteClick} className={s.iconWrapper}><DeleteIcon /></div>
               {onDoctorClick &&
                  <div onClick={onDoctorClick} className={s.iconWrapper}><DoctorIcon /></div>
               }
            </div>
            <div className={s.nameAndEmail}>
               <div className={s.name}>{name}</div>
               <div className={s.email}>{email}</div>
               <div className={s.phoneNum}>{phoneNum}</div>
            </div>
            {rooms &&
               <div className={s.roomsWrapper}>
                  <div className={s.roomNamesWrapper}>
                     <div>{`Rooms:`}</div>{rooms.map((d, idx) => <div>{d.name + (idx === rooms.length - 1 ? '' : `,`)}</div>)}
                  </div>
                  <div className={s.statusesWrapper}>
                     {rooms.map((d, idx) => (
                        <div key={`STATUSES_${idx}`}
                           className={s.statuses}
                           style={{ background: d.statusData.color ? d.statusData.color : `#ddd` }} />
                     ))}
                  </div>
               </div>
            }
         </div>
      </div>
   )
}

export default StuffCard