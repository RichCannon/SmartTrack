import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'

import MyButton from '../../components/MyButton/MyButton'
import StuffCard from '../../components/StuffCard/StuffCard'
import { GetByRolePayload } from '../../graphql/dashboard'
import s from './StuffPage.module.css'
import { RoleT } from '../../types/types'
import { ByRoleResponseStuff, USER_BY_ROLE_STUFF_PAGE } from '../../graphql/allerts'

type StuffPage = {

}

type RouteT = `Doctors` | `Assistans` | `Receptionist`

const routes: RouteT[] = [`Doctors`, `Assistans`, `Receptionist`]

type VariableRolesT = {
   "Doctors": RoleT
   "Assistans": RoleT
   "Receptionist": RoleT
}


const variableRoles: VariableRolesT = {
   "Doctors": `doctor`,
   "Assistans": `assistan`,
   "Receptionist": `receptionist`
}




const StuffPage: FC<StuffPage> = () => {

   const [route, setRoute] = useState<RouteT>(`Doctors`)



   const { loading, error, data } = useQuery<ByRoleResponseStuff, GetByRolePayload>(USER_BY_ROLE_STUFF_PAGE, {
      variables: { role: variableRoles[route] }
   })




   const onButtonClick = () => {
      console.log(`onButtonClick`)
   }


   const onEditClick = () => {
      console.log(`onEditClick`)
   }

   const onDeleteClick = () => {
      console.log(`onDeleteClick`)

   }

   const onDoctorClick = () => {

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
               {data && data?.getByRole.map((d, idx) => (
                  <div key={`STUFF_CARD_${idx}`} className={s.stuffCard}>
                     <StuffCard
                        onDoctorClick={route === `Assistans` ? onDoctorClick : undefined}
                        onDeleteClick={onDeleteClick}
                        onEditClick={onEditClick}
                        number={idx + 1}
                        name={d.name}
                        email={d.email}
                        phoneNum={"+38054545554"}
                        rooms={d.docRooms}
                     />
                  </div>)
               )}
            </div>
         </div>
      </div>
   )
}

export default StuffPage



   // const stuffdata = [
   //    {
   //       name: `Alex Sample2`,
   //       email: `frontdesk@gmail.com`,
   //       phoneNum: `0959423146`,
   //       rooms: [`1a`, `1b`, `3f`],
   //       statuses: [`red`, `yellow`, `blue`]

   //    },
   //    {
   //       name: `Alex Sample2`,
   //       email: `frontdesk2@gmail.com`,
   //       phoneNum: `0959423146`,
   //       rooms: [`1a`, `1b`, `3f`],
   //       statuses: [`red`, `yellow`, `blue`]

   //    },
   //    {
   //       name: `Alex Sample3`,
   //       email: `frontdesk3@gmail.com`,
   //       phoneNum: `0959423146`,
   //       rooms: [`1a`, `1b`, `3f`],
   //       statuses: [`red`, `yellow`, `blue`]

   //    },
   // ]
