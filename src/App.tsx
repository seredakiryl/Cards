import { useEffect } from 'react'

import { Alert } from 'antd'
import { Route, Routes } from 'react-router-dom'

import { Spiner } from './Common/Spin/Spin'
import { CheckEmail } from './Components/Auth/CheckEmail/CheckEmail'
import { CreateNewPassword } from './Components/Auth/CreateNewPassword/CreateNewPassword'
import { ForgotPassword } from './Components/Auth/ForgotPassword/ForgotPassword'
import { Login } from './Components/Auth/Login/Login'
import { Registration } from './Components/Auth/Registration/Registration'
import { Cards } from './Components/Cards/Cards'
import { Error404 } from './Components/Error404/Error404'
import { Header } from './Components/Header/Header'
import { Packs } from './Components/Packs/Packs'
import { Profile } from './Components/Profile/Profile'
import { isLoggedInTC } from './Store/app-reducer'
import { useAppDispatch, useAppSelector } from './Store/store'
import './App.css'

const App = () => {
  const error = useAppSelector(state => state.app.error)
  const success = useAppSelector(state => state.app.success)
  const isFetching = useAppSelector(state => state.app.isFetching)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(isLoggedInTC())
  }, [])

  if (isFetching) {
    return <Spiner />
  }

  return (
    <div>
      <Header />
      {error && <Alert type="error" message={error} banner closable />}
      {success && <Alert message="Success Tips" type="success" showIcon />}
      <Routes>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/set-new-password/:token" element={<CreateNewPassword />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/check-email" element={<CheckEmail />}></Route>
        <Route path="/packs" element={<Packs />}></Route>
        <Route path="/cards" element={<Cards />}></Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
