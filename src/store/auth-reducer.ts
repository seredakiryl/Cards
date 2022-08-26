import { authAPI } from '../api/auth-api'
import { AppThunk } from './store'
import { isInitializedAC, setAppErrorAC } from './app-reducer'
import { FormikLoginType } from '../components/auth/login/Login'

const initialState = {
  isLoggedIn: false,
  name: 'enter your name',
  avatar: '',
  password: '',
  resetPasswordToken: '',
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
    case 'LOGIN/SET-NEW-PASSWORD':
      return { ...state, password: action.password }
    default:
      return state
  }
}
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'LOGIN/SET-IS-LOGGED-IN', value } as const)

type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetNewNameACType | SetNewPasswordActionType

export const isLoggedInTC = (): AppThunk => (dispatch) => {
  dispatch(isInitializedAC(true))
  authAPI
    .me()
    .then((res) => {
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
  (dispatch) => {
    dispatch(isInitializedAC(true))
    authAPI
      .changeName(name, avatar)
      .then((res) => {
        dispatch(setNewNameAC(name, avatar))
      })
      .catch((res) => {
        dispatch(setAppErrorAC(res.message))
      })
      .finally(() => {
        dispatch(isInitializedAC(false))
      })
  }
export const logOutTC = (): AppThunk => (dispatch) => {
  dispatch(isInitializedAC(true))
  authAPI
    .logout()
    .then((res) => {
      dispatch(setIsLoggedInAC(false))
    })
    .catch((res) => {
      dispatch(setAppErrorAC(res.message))
    })
    .finally(() => {
      dispatch(isInitializedAC(false))
    })
}

export const registrationTC =
  (email: string, password: string): AppThunk =>
  (dispatch) => {
    dispatch(isInitializedAC(true))
    authAPI
      .registration({ email, password })
      .then((res) => console.log(res))
      .catch((res) => dispatch(setAppErrorAC(res.message)))
      .finally(() => {
        dispatch(isInitializedAC(false))
      })
  }
export const setNewPasswordAC = (password: string, resetPasswordToken: string) =>
  ({ type: 'LOGIN/SET-NEW-PASSWORD', password, resetPasswordToken } as const)

type SetNewPasswordActionType = ReturnType<typeof setNewPasswordAC>

export const setNewPasswordTC =
  (password: string, resetPasswordToken: string | undefined): AppThunk =>
  (dispatch) => {
    dispatch(isInitializedAC(true))
    authAPI
      .newPassword({ password, resetPasswordToken })
      .then((res) => {
        dispatch(setNewPasswordAC(password, 'some-token-from-url'))
      })
      .catch((res) => {
        dispatch(setAppErrorAC(res.message))
      })
      .finally(() => {
        dispatch(isInitializedAC(false))
      })
  }

export const loginTC =
  (values: FormikLoginType): AppThunk =>
  (dispatch) => {
    dispatch(isInitializedAC(true))
    authAPI
      .login(values)
      .then((res) => {
        dispatch(setIsLoggedInAC(true))
      })
      .catch((res) => {
        dispatch(setAppErrorAC(res.message))
      })
      .finally(() => {
        dispatch(isInitializedAC(false))
      })
  }

export const forgotPasswordTC =
  (email: string, admin: string, messageStyle: string): AppThunk =>
  (dispatch) => {
    dispatch(isInitializedAC(true))
    authAPI
      .forgotPassword({ email, from: admin, message: messageStyle })
      .then((res) => {
        console.log(res.data.info)
      })
      .catch((res) => dispatch(setAppErrorAC(res.message)))
      .finally(() => {
        dispatch(isInitializedAC(false))
      })
  }
