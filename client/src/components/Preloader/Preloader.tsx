import { FC } from 'react'
import s from './Preloader.module.css'


type PreloaderProps = {
   style?: React.CSSProperties
   size?: string
   color?: string
}

const Preloader: FC<PreloaderProps> = ({ size = `4em`, color = `#212155`, style = {} }) => {
   return (
      <div className={s.container}><div className={s.ldsCircle}><div style={{ ...style, width: size, height: size, background: color }}></div></div></div>
   )
}

export default Preloader