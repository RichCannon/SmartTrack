import { useContext, useState } from 'react'
import MyButton from '../../components/MyButton/MyButton'

import MyInput from '../../components/MyInput/MyInput'
import { AuthContext } from '../../context/AuthContext'
import s from './LoginPage.module.css'

const LoginPage = () => {
   const [email, setEmail] = useState(``)
   const [password, setPassword] = useState(``)

   const { login } = useContext(AuthContext)

   const onPasswordChange = (value: string) => {
      setPassword(value)
   }

   const onEmailChange = (value: string) => {
      setEmail(value)
   }

   const onLoginClick = () => {
      login()
   }

   return (
      <div className={s.container}>
         <MyInput label={`Email`} onTextChange={onEmailChange} value={email} placeholder={`Email`} />
         <MyInput label={`Password`} onTextChange={onPasswordChange} value={password} placeholder={`Password`} />
         <div className={s.button}>
            <MyButton label={`Log in`} onButtonClick={onLoginClick} />
         </div>
      </div>
   )
}

export default LoginPage