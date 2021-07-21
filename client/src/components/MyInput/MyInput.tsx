import { FC, KeyboardEvent, useState } from 'react';

import style from './MyInput.module.css';

type MyInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
   label: string
   value: string
   onTextChange: (value: string) => void
   errorText?: string | null
   onEnterPress?: () => void
   isFocused?: boolean
}


const MyInput: FC<MyInputProps> = ({ label, value, onTextChange, onEnterPress, errorText, ...restProps }) => {

   const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.nativeEvent.key === `Enter` && onEnterPress) {
         onEnterPress()
      }
   }

   const [isFocused, setIsFocused] = useState(false)

   const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      !!restProps.onFocus && restProps.onFocus(e)
   }

   const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      !!restProps.onFocus && restProps.onFocus(e)
   }



   return (
      <div className={style.container}>
         <div className={style.label}>{label}</div>
         <input data-testid={`myInput`} onFocus={onFocus} onBlur={onBlur}
            className={
            `${style.input}
             ${!!errorText ? style.inputError : ``}
             ${restProps.disabled ? style.disabledInput : ``}
             ${isFocused ? style.focusedInput : ``}`
            }
            value={value} onChange={(e) => onTextChange(e.target.value)}
            onKeyPress={onKeyPress}
            {...restProps} />
         <div data-testid={`errorField`} className={style.error}>{errorText || ``}</div>
      </div>
   )
}


export default MyInput;
