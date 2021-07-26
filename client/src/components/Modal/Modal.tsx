import { FC } from 'react'

import s from './Modal.module.css'


type Modal = {
   onDismissClick: () => void
}

const Modal: FC<Modal> = ({ onDismissClick, children }) => {
   return (
      <div className={s.container} onClick={onDismissClick}>
         <div onClick={e => e.stopPropagation()} className={s.content}>
            {children}
         </div>
      </div>
   )
}

export default Modal