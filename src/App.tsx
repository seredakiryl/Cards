import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Registration } from './components/auth/registration/Registration'
import { Profile } from './components/profile/Profile'
import { Login } from './components/auth/login/Login'
import { NewPassword } from './components/auth/newPassword/NewPassword'
import { PasswordRecovery } from './components/auth/passwordRecovery/PasswordRecovery'
import { Error404 } from './components/error404/Error404'
import { Header } from './components/Header/Header'
import { Alert } from 'antd'
import { useAppSelector } from './store/store'

const App = () => {
  const isLoggedIn = useAppSelector((state) => state.app.error)

  return (
    <div>
      <Header />
      {isLoggedIn ? <Alert type="error" message={isLoggedIn} banner closable /> : ''}
      <Routes>
        <Route path={'/Registration'} element={<Registration />}></Route>
        <Route path={'/Login'} element={<Login />}></Route>
        <Route path={'/NewPassword'} element={<NewPassword />}></Route>
        <Route path={'/PasswordRecovery'} element={<PasswordRecovery />}></Route>
        <Route path={'/Profile'} element={<Profile />}></Route>
        <Route path={'/Error404'} element={<Error404 />}></Route>
      </Routes>
    </div>
  )
}

export default App
