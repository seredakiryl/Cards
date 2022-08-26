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
import { useAppDispatch, useAppSelector } from './store/store'
import { useEffect } from 'react'
import { isLoggedInTC } from './store/auth-reducer'
import { Spin } from 'antd/es'
import { ForgotPassword } from './components/auth/ForgotPassword/ForgotPassword'
import { CheckEmail } from './components/auth/CheckEmail/CheckEmail'
import { CreateNewPassword } from './components/auth/CreateNewPassword/CreateNewPassword'

const App = () => {
  const error = useAppSelector((state) => state.app.error)
  const isInitialized = useAppSelector((state) => state.app.initialized)
  // const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(isLoggedInTC())
  }, [])

  if (isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div>
      <Header />
      {error ? <Alert type="error" message={error} banner closable /> : ''}
      <Routes>
        <Route path="/Registration" element={<Registration />}></Route>
        <Route path="/SetNewPassword/:token" element={<NewPassword />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/PasswordRecovery" element={<PasswordRecovery />}></Route>
        <Route path={'/CreateNewPassword'} element={<CreateNewPassword />}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/CheckEmail" element={<CheckEmail />}></Route>
        <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
