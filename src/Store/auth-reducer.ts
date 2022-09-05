import { authAPI } from '../Api/auth-api'
import { FormikLoginType } from '../Components/Auth/Login/Login'

import { setAppErrorAC, setSuccessAC } from './app-reducer'
import { AppThunk } from './store'

const initialState = {
  isLoggedIn: false,
  isFetching: false,
  name: 'enter your name',
  email: '',
  avatar: '',
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'AUTH/SET-NEW-NAME':
      return { ...state, name: action.name }
    case 'AUTH/SET-EMAIL':
      return { ...state, email: action.email }
    case 'AUTH/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'AUTH/SET-IS-FETCHING':
      return { ...state, isFetching: action.value }
    default:
      return state
  }
}
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'AUTH/SET-IS-LOGGED-IN', value } as const)

export const setNewNameAC = (name: string, avatar: string) =>
  ({ type: 'AUTH/SET-NEW-NAME', name, avatar } as const)

export const setEmailAC = (email: string) => ({ type: 'AUTH/SET-EMAIL', email } as const)

export const setIsFetchingAC = (value: boolean) =>
  ({ type: 'AUTH/SET-IS-FETCHING', value } as const)

type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setNewNameAC>
  | ReturnType<typeof setIsFetchingAC>
  | ReturnType<typeof setEmailAC>

export const setNewNameTC =
  (name: string, avatar: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsFetchingAC(true))
      await authAPI.changeName(name, avatar)

      dispatch(setNewNameAC(name, avatar))
    } catch (res) {
      console.log(res)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }

export const logOutTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setIsFetchingAC(true))
    await authAPI.logout()
    dispatch(setIsLoggedInAC(false))
  } catch (error) {
    console.log(error)
  } finally {
    dispatch(setIsFetchingAC(false))
  }
}

export const registrationTC =
  (email: string, password: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsFetchingAC(true))
      await authAPI.registration({ email, password })

      dispatch(setSuccessAC('Registration successfully completed'))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }

export const setNewPasswordTC =
  (password: string, resetPasswordToken: string | undefined): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsFetchingAC(true))
      await authAPI.newPassword({ password, resetPasswordToken })
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }

export const loginTC =
  (values: FormikLoginType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsFetchingAC(true))
      await authAPI.login(values)
      dispatch(setIsLoggedInAC(true))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }

export const forgotPasswordTC =
  (email: string, admin: string, messageStyle: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsFetchingAC(true))
      await authAPI.forgotPassword({ email, from: admin, message: messageStyle })
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }
