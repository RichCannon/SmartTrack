import { FC, memo, ReactElement } from "react"
import { NavLink, useLocation } from "react-router-dom"

import s from './DrawerTab.module.css'
import { RoutesT } from "../../types/types"

type DrawerTabP = {
   routeTo?: RoutesT
   label: string
   onClick?: () => void
   currentRoute?: RoutesT
   icon: (isPressed: boolean) => ReactElement
   color?: string
   preventDefault?: boolean
}

const DrawerTab: FC<DrawerTabP> = memo(({ routeTo, label, onClick, icon, color, preventDefault }) => {

   const location = useLocation()

   const onPress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (onClick) {
         preventDefault && e.preventDefault()
         onClick()
      }
   }

   return (
      <NavLink to={`/${routeTo}`}
         className={`${s.tab}`}
         onClick={onPress}
         activeClassName={`${s.tab} ${s.activeTab}`}
      >
         {icon(location.pathname === `/${routeTo}`)}
         <p style={{ color }} className={s.tabText}>{label}</p>
      </NavLink>
   )
})


export default DrawerTab