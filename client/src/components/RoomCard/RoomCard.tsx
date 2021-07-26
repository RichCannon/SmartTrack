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
               background: color ? `${color}33` : `#DDDDDD33`, // 20% opacity === 33 in hex
               border: color ? `2px solid ${color}` : `2px solid #DDDDDD`
            }}>
               <div className={s.number}>
                  {description ? description[0] : ``}
               </div>
            </div>
         </div>
         <div className={s.status}>{`${description ? description : `Empty`} ▼`}</div>
      </div>
   )
}

export default RoomCard