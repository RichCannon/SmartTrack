import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useState } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

import s from './App.module.css';
import Drawer from './components/Drawer/Drawer';
import { AuthContext } from './context/AuthContext';
import AllertsPage from './pages/AllertsPage/AllertsPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SequencePage from './pages/SequencePage/SequencePage';
import StuffPage from './pages/StuffPage/StuffPage';
import { RoleT } from './types/types';


type UserDataT = {
   role: RoleT
   isAuth: boolean
}

//const uri = `http://localhost:5000`

const client = new ApolloClient({
   uri: `http://localhost:5000/graphql`,
   cache: new InMemoryCache({
      addTypename: false
   }),
   credentials: 'include'
})

const App = () => {


   const [userData, setUserData] = useState<UserDataT>({
      isAuth: false,
      role: `receptionist`
   })


   return (

      <div className={s.mainContainer}>
         <ApolloProvider client={client}>
            <AuthContext.Provider value={{
               ...userData,
               login: (role: RoleT) => setUserData({ ...userData, isAuth: true }),
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
                                 <Route path={`/stuff`}>
                                    <StuffPage />
                                 </Route>
                                 <Route path={`/allerts`}>
                                    <AllertsPage />
                                 </Route>
                                 <Route path={`/sequence`}>
                                    <SequencePage />
                                 </Route>
                                 <Redirect to={`/dashboard`} />
                              </Switch>
                           </div>
                        </>
                        : <div className={s.authContainer}>
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
         </ApolloProvider>
      </div >
   )
}

export default App;
