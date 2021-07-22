import { FC, useState } from 'react'
import MyButton from '../../components/MyButton/MyButton'
import StuffCard from '../../components/StuffCard/StuffCard'

import s from './StuffPage.module.css'

type StuffPage = {

}

type RouteT = `Doctors` | `Assistans` | `Receptionist`

const routes: RouteT[] = [`Doctors`, `Assistans`, `Receptionist`]


const StuffPage: FC<StuffPage> = () => {

   const [route, setRoute] = useState<RouteT>(`Doctors`)

   const onButtonClick = () => {

   }

   const stuffdata = [
      {
         name: `Alex Sample2`,
         email: `frontdesk@gmail.com`,
         phoneNum: `0959423146`,
         rooms: [`1a`, `1b`, `3f`],
         statuses: [`red`, `yellow`, `blue`]

      },
      {
         name: `Alex Sample2`,
         email: `frontdesk2@gmail.com`,
         phoneNum: `0959423146`,
         rooms: [`1a`, `1b`, `3f`],
         statuses: [`red`, `yellow`, `blue`]

      },
      {
         name: `Alex Sample3`,
         email: `frontdesk3@gmail.com`,
         phoneNum: `0959423146`,
         rooms: [`1a`, `1b`, `3f`],
         statuses: [`red`, `yellow`, `blue`]

      },
   ]

   const onEditClick = () => [

   ]

   const onDeleteClick = () => {

   }

   return (
      <div className={s.container}>
         <div className={s.routeWrapper}>
            {routes.map(d => (
               <div onClick={() => setRoute(d)} className={`${s.routeTab} ${route === d ? s.routeTabActive : ``}`}>
                  <div>{d}</div>
                  {route === d && <div className={s.underLine} />}
               </div>
            ))}
         </div>
         <div className={s.content}>
            <MyButton label={`Add new`} onButtonClick={onButtonClick} className={s.button} labelClassName={s.buttonText} />
            <div>
               {stuffdata.map((d, idx) => (
                  <StuffCard onDeleteClick={onDeleteClick}
                     onEditClick={onEditClick}
                     number={idx + 1}
                     {...d} />
               ))}
            </div>
         </div>
      </div>
   )
}

export default StuffPage