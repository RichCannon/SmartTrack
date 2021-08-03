import { useQuery } from "@apollo/client"
import { useState } from "react"
import { CheckTokenResponse, CHECK_TOKEN, } from "../graphql/auth"
import { RoleT } from "../types/types"



export const useAuth = () => {

   const [isReady, setIsReady] = useState(false)

   const [userData, setUserData] = useState<CheckTokenResponse["checkToken"]>({
      isAuth: false,
      role: `receptionist`
   })

   const onCompleted = (response: CheckTokenResponse) => {
      if (response.checkToken.isAuth) {
         login(response.checkToken.role)
      }
      else {
         logout()
      }
      setIsReady(true)
   }


   const data = useQuery<CheckTokenResponse>(CHECK_TOKEN, {
      onCompleted
   })


   const login = (role: RoleT) => {
      setUserData({ role, isAuth: true })
   }

   const logout = () => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUserData({ ...userData, isAuth: false })
   }

   return {
      userData,
      login,
      logout,
      isReady
   }
}