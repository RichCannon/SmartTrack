import { useMutation } from '@apollo/client'
import { useContext, useState } from 'react'

import MyButton from '../../components/MyButton/MyButton'
import MyInput from '../../components/MyInput/MyInput'
import { AuthContext } from '../../context/AuthContext'
import { LOGIN, LoginPayload, LoginResponse } from '../../graphql/auth'
import s from './LoginPage.module.css'

const LoginPage = () => {
   const [email, setEmail] = useState(``)
   const [password, setPassword] = useState(``)

   const [loginReq, { loading }] = useMutation<LoginResponse, LoginPayload>(LOGIN)

   const { login } = useContext(AuthContext)

   const onPasswordChange = (value: string) => {
      setPassword(value)
   }

   const onEmailChange = (value: string) => {
      setEmail(value)
   }

   const onLoginClick = async () => {
      try {
         const { data, errors } = await loginReq({ variables: { data: { email } } })
         if (data?.login.isAuth) {
            login(data.login.role)
         }
         else {
            throw `Wrong auth data`
         }
         if(errors) {
            throw errors
         }
      } catch (error) {
         window.alert(`Wrong auth data`)
         console.log(error)
      }
   }

   return (
      <div className={s.container}>
         <MyInput onEnterPress={onLoginClick} label={`Email`} onTextChange={onEmailChange} value={email} placeholder={`Email`} />
         <MyInput onEnterPress={onLoginClick} label={`Password`} onTextChange={onPasswordChange} value={password} placeholder={`Password`} />
         <div className={s.button}>
            <MyButton isLoading={loading}
               isDisabled={loading} 
               label={`Log in`}
               onButtonClick={onLoginClick} />
         </div>
      </div>
   )
}

export default LoginPage