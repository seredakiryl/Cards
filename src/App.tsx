import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Registration } from './Components/Auth/Registration/Registration'
import { Profile } from './Components/Profile/Profile'
import { Login } from './Components/Auth/Login/Login'
import { Error404 } from './Components/Error404/Error404'
import { Header } from './Components/Header/Header'
import { Alert } from 'antd'
import { useAppDispatch, useAppSelector } from './Store/store'
import { useEffect } from 'react'
import { isLoggedInTC } from './Store/auth-reducer'
import { Spin } from 'antd/es'
import { ForgotPassword } from './Components/Auth/ForgotPassword/ForgotPassword'
import { CheckEmail } from './Components/Auth/CheckEmail/CheckEmail'
import { CreateNewPassword } from './Components/Auth/CreateNewPassword/CreateNewPassword'
import { Packs } from './Components/Packs/Packs'

const App = () => {
  const error = useAppSelector((state) => state.app.error)
  const isInitialized = useAppSelector((state) => state.app.initialized)
  // const isLoggedIn = useAppSelector((state) => state.Auth.isLoggedIn)

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
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/set-new-password/:token" element={<CreateNewPassword />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/check-email" element={<CheckEmail />}></Route>
        <Route path="/packs" element={<Packs />}></Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
