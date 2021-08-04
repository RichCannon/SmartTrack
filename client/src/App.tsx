import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

import s from './App.module.scss';
import Drawer from './components/Drawer/Drawer';
import Preloader from './components/Preloader/Preloader';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import AllertsPage from './pages/AllertsPage/AllertsPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SequencePage from './pages/SequencePage/SequencePage';
import StuffPage from './pages/StuffPage/StuffPage';





const App = () => {


   const { login, logout, userData, isReady } = useAuth()


   return (
      <div className={s.mainContainer}>
         <AuthContext.Provider value={{
            ...userData,
            login,
            logout,
         }}>
            <BrowserRouter>
               {isReady ? <> {
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
               }</>
                  : <Preloader />
               }
            </BrowserRouter>
         </AuthContext.Provider>
      </div >
   )
}

export default App;
