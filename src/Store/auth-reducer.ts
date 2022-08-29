import { authAPI } from '../Api/auth-api'
import { FormikLoginType } from '../Components/Auth/Login/Login'

import { isInitializedAC, setAppErrorAC } from './app-reducer'
import { AppThunk } from './store'

const initialState = {
  isLoggedIn: false,
  name: 'enter your name',
  avatar: '',
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'PROFILE/SET-NEW-NAME':
      return { ...state, name: action.name }
    default:
      return state
  }
}
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'LOGIN/SET-IS-LOGGED-IN', value } as const)

type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetNewNameACType

export const isLoggedInTC = (): AppThunk => dispatch => {
  dispatch(isInitializedAC(true))
  authAPI
    .me()
    .then(res => {
      dispatch(setIsLoggedInAC(true))
      dispatch(setNewNameAC(res.data.name, res.data.avatar))
    })
    .finally(() => {
      dispatch(isInitializedAC(false))
    })
}
export const setNewNameAC = (name: string, avatar: string) =>
  ({ type: 'PROFILE/SET-NEW-NAME', name, avatar } as const)

type SetNewNameACType = ReturnType<typeof setNewNameAC>

export const setNewNameTC =
  (name: string, avatar: string): AppThunk =>
  dispatch => {
    dispatch(isInitializedAC(true))
    authAPI
      .changeName(name, avatar)
      .then(() => {
        dispatch(setNewNameAC(name, avatar))
      })
      .catch(res => {
        dispatch(setAppErrorAC(res.message))
      })
      .finally(() => {
        dispatch(isInitializedAC(false))
      })
  }
export const logOutTC = (): AppThunk => dispatch => {
  dispatch(isInitializedAC(true))
  authAPI
    .logout()
    .then(() => {
      dispatch(setIsLoggedInAC(false))
    })
    .catch(res => {
      dispatch(setAppErrorAC(res.message))
    })
    .finally(() => {
      dispatch(isInitializedAC(false))
    })
}

export const registrationTC =
  (email: string, password: string): AppThunk =>
  dispatch => {
    dispatch(isInitializedAC(true))
    authAPI
      .registration({ email, password })
      .then(res => console.log(res))
      .catch(res => dispatch(setAppErrorAC(res.message)))
      .finally(() => {
        dispatch(isInitializedAC(false))
      })
  }

export const setNewPasswordTC =
  (password: string, resetPasswordToken: string | undefined): AppThunk =>
  dispatch => {
    dispatch(isInitializedAC(true))
    authAPI
      .newPassword({ password, resetPasswordToken })
      .then(res => {})
      .catch(res => {
        dispatch(setAppErrorAC(res.message))
      })
      .finally(() => {
        dispatch(isInitializedAC(false))
      })
  }

export const loginTC =
  (values: FormikLoginType): AppThunk =>
  dispatch => {
    dispatch(isInitializedAC(true))
    authAPI
      .login(values)
      .then(res => {
        dispatch(setIsLoggedInAC(true))
      })
      .catch(res => {
        dispatch(setAppErrorAC(res.message))
      })
      .finally(() => {
        dispatch(isInitializedAC(false))
      })
  }

export const forgotPasswordTC =
  (email: string, admin: string, messageStyle: string): AppThunk =>
  dispatch => {
    dispatch(isInitializedAC(true))
    authAPI
      .forgotPassword({ email, from: admin, message: messageStyle })
      .then(res => {})
      .catch(res => dispatch(setAppErrorAC(res.message)))
      .finally(() => {
        dispatch(isInitializedAC(false))
      })
  }
