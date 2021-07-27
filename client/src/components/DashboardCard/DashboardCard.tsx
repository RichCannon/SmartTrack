import { FC } from 'react'

import { UserT, RoomT } from '../../graphql/dashboard'
import RoomCard from '../RoomCard/RoomCard'
import s from './DashboardCard.module.css'

type DashboardCard = {
   docRooms: RoomT[]
} & UserT

const DashboardCard: FC<DashboardCard> = ({ name, specialization, docRooms }) => {



   return (
      <div className={s.container}>
         <div className={s.nameAndReset}>
            <div className={s.name}>{name}</div>
            <div className={s.reset}><p className={s.resetText}>{`Reset`}</p></div>
         </div>
         <div className={s.jobName}>
            {specialization}
         </div>
         <div className={s.contentWrapper}>
            <div className={s.lineWrapper}>
               <div className={s.iterator}>
                  <div className={s.plusMinus}>{`-`}</div>
                  <div className={s.iteratorText}>{`5`}</div>
                  <div className={s.plusMinus}>{`+`}</div>
                  <p className={s.inLine}>{`in line`}</p>
               </div>
               <div className={s.stopLine}>
                  <div className={s.stopLineText}>{`Stop the line`}</div>
               </div>
            </div>
            <div className={s.statusCards}>
               {docRooms ? docRooms.map((d, idx) => <RoomCard key={`ROOM_CARD_${idx}`} {...d} />) : []}
            </div>
         </div>
      </div>
   )
}

export default DashboardCard