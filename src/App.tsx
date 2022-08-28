import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Registration } from './Components_/Auth_/Registration_/Registration'
import { Profile } from './Components_/Profile_/Profile'
import { Login } from './Components_/Auth_/Login_/Login'
import { Error404 } from './Components_/Error404_/Error404'
import { Header } from './Components_/Header/Header'
import { Alert } from 'antd'
import { useAppDispatch, useAppSelector } from './Store_/store'
import { useEffect } from 'react'
import { isLoggedInTC } from './Store_/auth-reducer'
import { Spin } from 'antd/es'
import { ForgotPassword } from './Components_/Auth_/ForgotPassword/ForgotPassword'
import { CheckEmail } from './Components_/Auth_/CheckEmail/CheckEmail'
import { CreateNewPassword } from './Components_/Auth_/CreateNewPassword/CreateNewPassword'

const App = () => {
  const error = useAppSelector((state) => state.app.error)
  const isInitialized = useAppSelector((state) => state.app.initialized)
  // const isLoggedIn = useAppSelector((state) => state.Auth_.isLoggedIn)

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
        <Route path="/" element={<Login />}></Route>
        <Route path="/SetNewPassword/:token" element={<CreateNewPassword />}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/CheckEmail" element={<CheckEmail />}></Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
