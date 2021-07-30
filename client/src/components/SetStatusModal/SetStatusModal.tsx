import { FC } from 'react'
import { StatusT } from '../../graphql/allerts'

import s from './SetStatusModal.module.css'

type SetStatusModalP = {
   alerts: StatusT[]
   onAlertClick: (_id: string) => void
   isLoading: boolean
}

const SetStatusModal: FC<SetStatusModalP> = ({ alerts, onAlertClick, isLoading }) => {


   return (
      <div className={s.container}>
         <div className={s.alertContainer}>
            {alerts.map((d, idx) => (
               <div onClick={isLoading ? () => null : () => onAlertClick(d._id)}
                  key={`ALERT_${idx}`}
                  className={s.alert}>
                  <div className={s.bigCircleWrapper}>
                     <div className={s.bigCircle} style={{
                        background: d.color ? `${d.color}33` : `#DDDDDD33`, // 20% opacity === 33 in hex
                        border: d.color ? `2px solid ${d.color}` : `2px solid #DDDDDD`
                     }}>
                        <div style={{ color: d.color }} className={s.number}>
                           {d.description ? d.description[0] : ``}
                        </div>
                     </div>
                  </div>
                  <div className={s.description}>
                     {d.description}
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default SetStatusModal