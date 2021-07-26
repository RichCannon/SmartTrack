import { ReactElement, useContext, useMemo, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

import { RoutesT } from '../../types/types'
import DrawerTab from '../DrawerTab/DrawerTab'
import AllertsIcon from './assets/AllertsIcon'
import DashboardIcon from './assets/DashboardIcon'
import LogOutIcon from './assets/LogOutIcon'
import SequenceIcon from './assets/SequenceIcon'
import StuffIcon from './assets/StuffIcon'

import s from './Drawer.module.css'




type RoutesArrT = {
   route: RoutesT, icon: (isPressed: boolean) => ReactElement
}


const routesArr: RoutesArrT[] = [
   { route: `Dashboard`, icon: (isPressed) => <DashboardIcon isPressed={isPressed} /> },
   { route: `Stuff`, icon: (isPressed) => <StuffIcon isPressed={isPressed} /> },
   { route: `Allerts`, icon: (isPressed) => <AllertsIcon isPressed={isPressed} /> },
   { route: `Sequence`, icon: (isPressed) => <SequenceIcon isPressed={isPressed} /> },
]

const Drawer = () => {

   const [isExpanded, setIsExpanded] = useState(false)

   //  const [route, setRoute] = useState<RoutesT>(`Dashboard`)
   const { logout } = useContext(AuthContext)

   const onLogOutPress = () => {
      logout()
   }


   return (
      <div className={`${s.container} ${isExpanded ? s.expanded : ``}`}>
         <div className={s.header}>
            <p className={s.logoText}>
               {`Logo`}
            </p>
            <div onClick={() => setIsExpanded(!isExpanded)} className={s.burger}>
               <div className={s.line}></div>
               <div className={`${s.line} ${s.midLine}`}></div>
               <div className={s.line}></div>
            </div>
         </div>
         <div className={isExpanded ? `` : s.drawerTabscontainer}>
            {routesArr.map(d => (
               <DrawerTab
                  onClick={(() => setIsExpanded(false))}
                  key={`DRAWER_TAB_${d.route}`}
                  icon={d.icon}
                  label={d.route}
                  routeTo={d.route.toLowerCase() as RoutesT}
               // currentRoute={route}
               />)
            )}
            <div className={s.signOutWrapper}>
               <DrawerTab preventDefault color={`#8484D8`} label={`Sign Out`} onClick={onLogOutPress} icon={LogOutIcon} />
            </div>
         </div>
      </div>
   )
}

export default Drawer