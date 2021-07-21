import s from './RoomCard.module.css'

const RoomCard = () => {
   return (
      <div className={s.container}>
         <div className={s.header}>
            <div className={s.name}>{`1b`}</div>
            <div className={s.rank}><div className={s.circle}>{`R`}</div></div>
            <div className={s.time}>{`10:56`}</div>
         </div>
         <div className={s.bigCircleWrapper}>
            <div className={s.bigCircle}>
               <div className={s.number}>
                  {`5`}
               </div>
            </div>
         </div>
            <div className={s.status}>{`Assistant Required`}</div>
      </div>
   )
}

export default RoomCard