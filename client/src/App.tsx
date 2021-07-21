import { useState } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

import s from './App.module.css';
import Drawer from './components/Drawer/Drawer';
import { AuthContext } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { RoleT } from './types/types';


type UserDataT = {
   role: RoleT 
   isAuth: boolean
}

const App = () => {


   const [userData, setUserData] = useState<UserDataT>({
      isAuth: false,
      role: `receptionist`
   })


   return (
      <div className={s.mainContainer}>
         <AuthContext.Provider value={{
            ...userData,
            login: () => setUserData({ ...userData, isAuth: true }),
            logout: () => setUserData({ ...userData, isAuth: false }),
            setRole: (role: RoleT) => setUserData({ ...userData, role })
         }}>
            <BrowserRouter>
               {
                  userData.isAuth
                     ? <>
                        <Drawer />
                        <div className={s.container}>
                           <Switch>
                              <Route path={`/dashboard`}>
                                 <DashboardPage />
                              </Route>
                              <Redirect to={`/dashboard`} />
                           </Switch>
                        </div>
                     </>
                     :
                     <div className={s.authContainer}>
                        <Switch>
                           <Route path={`/login`}>
                              <LoginPage />
                           </Route>
                           <Redirect to={`/login`} />
                        </Switch>
                     </div>

               }
            </BrowserRouter>
         </AuthContext.Provider>
      </div >
   )
}

export default App;