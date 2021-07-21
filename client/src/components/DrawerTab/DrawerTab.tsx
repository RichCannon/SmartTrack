import { FC, ReactElement } from "react"

import s from './DrawerTab.module.css'
import { RoutesT } from "../../types/types"

type DrawerTab = {
   route?: RoutesT | string
   onClick: (r: any) => void
   currentRoute?: RoutesT
   icon: (isPressed: boolean) => ReactElement
   color?: string
}

const DrawerTab: FC<DrawerTab> = ({ route, onClick, currentRoute, icon, color }) => {
   return (
      <div onClick={() => onClick(route)} className={`${s.tab} ${route === currentRoute ? s.activeTab : ``}`}>
         {icon(route === currentRoute)}
         <p style={{ color }} className={s.tabText}>{route}</p>
      </div>
   )
}

export default DrawerTab