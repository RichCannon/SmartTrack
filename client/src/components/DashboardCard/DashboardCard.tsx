import { FC } from 'react'

import { UserT } from '../../graphql/dashboard'
import RoomCard from '../RoomCard/RoomCard'
import s from './DashboardCard.module.scss'

type DashboardCardP = UserT & {
   onRoomCardClick: (_id: string) => void
}


const DashboardCard: FC<DashboardCardP> = ({ name, specialization, docRooms, onRoomCardClick }) => {


   return (
      <div className={s.container}>
         <div className={s.infoWrapper}>
            <div className={s.nameAndReset}>
               <div className={s.name}>{name}</div>
               <div className={s.reset}><p className={s.resetText}>{`Reset`}</p></div>
            </div>
            <div className={s.jobName}>
               {specialization}
            </div>
            <div className={s.lineWrapper}>
               <div className={s.iterator}>
                  <div className={s.plusMinus}>{`-`}</div>
                  <div className={s.iteratorText}>{docRooms.length}</div>
                  <div className={s.plusMinus}>{`+`}</div>
                  <div className={s.inLine}>{`in line`}</div>
               </div>
               <div className={s.stopLine}>
                  <div className={s.stopLineText}>{`Stop the line`}</div>
               </div>
            </div>
         </div>
         <div className={s.statusCards}>
            {docRooms ? docRooms.map((d, idx) => <RoomCard onClick={onRoomCardClick} key={`ROOM_CARD_${idx}`} {...d} />) : []}
         </div>
      </div>
   )
}

export default DashboardCard