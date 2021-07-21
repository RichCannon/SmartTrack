import RoomCard from '../RoomCard/RoomCard'
import s from './DashboardCard.module.css'

const DashboardCard = () => {
   return (
      <div className={s.container}>
         <div className={s.nameAndReset}>
            <div className={s.name}>{`Benedict Cumberbatch`}</div>
            <div className={s.reset}><p className={s.resetText}>{`Reset`}</p></div>
         </div>
         <div className={s.jobName}>
            {`Therapist`}
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
               <RoomCard /> 
               <RoomCard /> 
               <RoomCard /> 
               <RoomCard />
            </div>
         </div>
      </div>
   )
}

export default DashboardCard