import { useMutation } from '@apollo/client'
import { useContext, useRef, useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';

import MyButton from '../../components/MyButton/MyButton'
import MyInput from '../../components/MyInput/MyInput'
import { AuthContext } from '../../context/AuthContext'
import { LOGIN, LoginPayload, LoginResponse } from '../../graphql/auth'
import { ErrorValidateT } from '../../types/types';
import s from './LoginPage.module.css'

const initError = {
   email: null,
   password: null
}

const LoginPage = () => {

   const { current: validate } = useRef(new SimpleReactValidator())
   const [errors, setErrors] = useState<ErrorValidateT>(initError)
   const [email, setEmail] = useState(`admin@gmail.com`)
   const [password, setPassword] = useState(`r5xlu4m2`)

   const [loginReq, { loading }] = useMutation<LoginResponse, LoginPayload>(LOGIN)

   const { login } = useContext(AuthContext)

   const onPasswordChange = (value: string) => {
      if (errors[`password`]) {
         setErrors({ ...errors, password: null })
      }
      setPassword(value)
   }

   const onEmailChange = (value: string) => {
      if (errors[`email`]) {
         setErrors({ ...errors, email: null })
      }
      setEmail(value)
   }

   const onLoginClick = async () => {

      validate.message(`email`, email, `required|email`)
      validate.message(`password`, password, `required`)

      if (!validate.allValid()) {
         setErrors(validate.getErrorMessages())
         return
      }


      const { data } = await loginReq({ variables: { data: { email, password } } })
      if (data?.login.isAuth) {
         login(data.login.role)
      }
      else {
         setErrors({ ...errors, password: data!.login.message || null })
      }
   }

   return (
      <div className={s.container}>
         <MyInput errorText={errors[`email`]}
            onEnterPress={onLoginClick} label={`Email`}
            onTextChange={onEmailChange}
            value={email} placeholder={`Email`} />
         <MyInput errorText={errors[`password`]}
            onEnterPress={onLoginClick} label={`Password`}
            onTextChange={onPasswordChange}
            value={password} placeholder={`Password`} />
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