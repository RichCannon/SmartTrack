import { FC, ReactElement, useState } from "react"

import s from './DrawerTab.module.css'
import { RoutesT } from "../../types/types"
import { NavLink } from "react-router-dom"

type DrawerTabP = {
   routeTo?: RoutesT
   label: string
   onClick?: () => void
   currentRoute?: RoutesT
   icon: (isPressed: boolean) => ReactElement
   color?: string
   preventDefault?: boolean
}

const DrawerTab: FC<DrawerTabP> = ({ routeTo, label, onClick, icon, color,preventDefault }) => {

   const [isActive, setIsActive] = useState(false)

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
         isActive={(match) => {
            setIsActive(!!match)
            return !!match
         }}
         activeClassName={`${s.tab} ${s.activeTab}`}
      >
         {icon(isActive)}
         <p style={{ color }} className={s.tabText}>{label}</p>
      </NavLink>
   )
}


export default DrawerTab