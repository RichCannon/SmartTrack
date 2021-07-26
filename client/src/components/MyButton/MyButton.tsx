import { FC } from 'react';
import Preloader from '../Preloader/Preloader';

import style from './MyButton.module.css';

type MyButtonProps = {
   label: string
   onButtonClick: (...args: any) => void
   isDisabled?: boolean
   isLoading?: boolean
   className?: string
   labelClassName?: string
}


const MyButton: FC<MyButtonProps> = ({  label, onButtonClick, isDisabled, isLoading = false, className = ``, labelClassName = `` }) => {

   return (
      <div key={`myButton`} onClick={isDisabled ? () => 1 : onButtonClick} className={`${style.container} ${className}`} >
         {isLoading
            ? <Preloader size={`1.6em`} color={`#fff`} />
            : <div className={`${style.label} ${labelClassName}`}>{label}</div>
         }
      </div>
   )
}



export default MyButton;
