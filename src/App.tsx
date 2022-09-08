import React, { useEffect } from 'react'

import { Alert, Spin } from 'antd'
import { Route, Routes } from 'react-router-dom'

import s from './App.module.css'
import { Path } from './Common/Navigate/Path'
import { ProtectedRoutes } from './Common/Navigate/ProtectedRoutes'
import { CheckEmail } from './Components/Auth/CheckEmail/CheckEmail'
import { CreateNewPassword } from './Components/Auth/CreateNewPassword/CreateNewPassword'
import { ForgotPassword } from './Components/Auth/ForgotPassword/ForgotPassword'
import { Login } from './Components/Auth/Login/Login'
import { Registration } from './Components/Auth/Registration/Registration'
import { Cards } from './Components/Cards/Cards'
import { Error404 } from './Components/Error404/Error404'
import { Header } from './Components/Header/Header'
import LearnPage from './Components/LearnPage/LearnPage'
import { Packs } from './Components/Packs/Packs'
import { Profile } from './Components/Profile/Profile'
import { isLoggedInTC } from './Store/app-reducer'
import { useAppDispatch, useAppSelector } from './Store/store'

const App = () => {
  const error = useAppSelector(state => state.app.error)
  const success = useAppSelector(state => state.app.success)
  const isFetching = useAppSelector(state => state.app.isFetching)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(isLoggedInTC())
  }, [])

  if (isFetching) {
    return (
      <div className={s.spin}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div>
      <Header />
      {error && <Alert type="error" message={error} banner closable />}
      {success && <Alert message="Success Tips" type="success" showIcon />}
      <Routes>
        <Route path={Path.REGISTRATION} element={<Registration />}></Route>
        <Route path={Path.LOGIN} element={<Login />}></Route>
        <Route path={Path.NEW_PASSWORD} element={<CreateNewPassword />}></Route>
        <Route path={Path.FORGOT_PASSWORD} element={<ForgotPassword />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path={Path.PROFILE} element={<Profile />}></Route>
          <Route path={Path.CHECK_EMAIL} element={<CheckEmail />}></Route>
          <Route path={Path.PACKS} element={<Packs />}></Route>
          <Route path={Path.CARDS} element={<Cards />}></Route>
          <Route path="/learn-page" element={<LearnPage />}></Route>
          <Route path={Path.ERROR_404} element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
