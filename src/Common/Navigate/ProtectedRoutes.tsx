import { Outlet } from 'react-router-dom'

import { CreateNewPassword } from '../../Components/Auth/CreateNewPassword/CreateNewPassword'
import { ForgotPassword } from '../../Components/Auth/ForgotPassword/ForgotPassword'
import { Login } from '../../Components/Auth/Login/Login'
import { Registration } from '../../Components/Auth/Registration/Registration'
import { useAppSelector } from '../../Store/store'

// const useAuth = () => {
//   const user = { loggedIn: false }
//
//   return user && user.loggedIn
// }

export const ProtectedRoutes = () => {
  // const isAuth = useAuth()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Login /> || <Registration /> || <ForgotPassword /> || <CreateNewPassword />
  )
}
