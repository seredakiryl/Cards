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

type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
type SetNewNameACType = ReturnType<typeof setNewNameAC>
type SetEmailACType = ReturnType<typeof setEmailAC>
type SetIsFetchingACType = ReturnType<typeof setIsFetchingAC>
type ActionsType = SetIsLoggedInACType | SetNewNameACType | SetIsFetchingACType | SetEmailACType

export const setNewNameTC =
  (name: string, avatar: string): AppThunk =>
  (dispatch) => {
    dispatch(setIsFetchingAC(true))
    authAPI
      .changeName(name, avatar)
      .then(() => {
        dispatch(setNewNameAC(name, avatar))
      })
      .catch((res) => {
        dispatch(setAppErrorAC(res.message))
      })
      .finally(() => {
        dispatch(setIsFetchingAC(false))
      })
  }
export const logOutTC = (): AppThunk => (dispatch) => {
  dispatch(setIsFetchingAC(true))
  authAPI
    .logout()
    .then(() => {
      dispatch(setIsLoggedInAC(false))
    })
    .catch((res) => {
      dispatch(setAppErrorAC(res.message))
    })
    .finally(() => {
      dispatch(setIsFetchingAC(false))
    })
}

export const registrationTC =
  (email: string, password: string): AppThunk =>
  (dispatch) => {
    dispatch(setIsFetchingAC(true))
    authAPI
      .registration({ email, password })
      .then(() => setSuccessAC('Registration successfully completed'))
      .catch((res) => dispatch(setAppErrorAC(res.message)))
      .finally(() => {
        dispatch(setIsFetchingAC(false))
      })
  }

export const setNewPasswordTC =
  (password: string, resetPasswordToken: string | undefined): AppThunk =>
  (dispatch) => {
    dispatch(setIsFetchingAC(true))
    authAPI
      .newPassword({ password, resetPasswordToken })
      .then((res) => {})
      .catch((res) => {
        dispatch(setAppErrorAC(res.message))
      })
      .finally(() => {
        dispatch(setIsFetchingAC(false))
      })
  }

export const loginTC =
  (values: FormikLoginType): AppThunk =>
  (dispatch) => {
    dispatch(setIsFetchingAC(true))
    authAPI
      .login(values)
      .then((res) => {
        dispatch(setIsLoggedInAC(true))
      })
      .catch((res) => {
        dispatch(setAppErrorAC(res.message))
      })
      .finally(() => {
        dispatch(setIsFetchingAC(false))
      })
  }

export const forgotPasswordTC =
  (email: string, admin: string, messageStyle: string): AppThunk =>
  (dispatch) => {
    dispatch(setIsFetchingAC(true))
    authAPI
      .forgotPassword({ email, from: admin, message: messageStyle })
      .then((res) => {})
      .catch((res) => dispatch(setAppErrorAC(res.message)))
      .finally(() => {
        dispatch(setIsFetchingAC(false))
      })
  }
