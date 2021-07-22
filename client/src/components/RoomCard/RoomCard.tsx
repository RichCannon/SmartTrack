import { FC } from 'react'

import { RoomT } from '../../graphql/dashboard'
import s from './RoomCard.module.css'



const RoomCard: FC<RoomT> = ({ description, name, color }) => {


   return (
      <div className={s.container}>
         <div className={s.header}>
            <div className={s.name}>{name}</div>
            <div className={s.rank}><div className={s.circle}>{`R`}</div></div>
            <div className={s.time}>{`10:56`}</div>
         </div>
         <div className={s.bigCircleWrapper}>
            <div className={s.bigCircle} style={{
               background: `${color}33`, // 20% opacity === 33 in hex
               border: `2px solid ${color}`
            }}>
               <div className={s.number}>
                  {name ? name[0] : ``}
               </div>
            </div>
         </div>
         <div className={s.status}>{`${description} ▼`}</div>
      </div>
   )
}

export default RoomCard