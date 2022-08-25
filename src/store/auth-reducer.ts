import { authAPI } from '../api/auth-api'
import { AppThunk } from './store'
import { isInitializedAC, setAppErrorAC } from './app-reducer'

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

export const isLoggedInTC = (): AppThunk => (dispatch) => {
  dispatch(isInitializedAC(true))
  authAPI
    .me()
    .then((res) => {
      dispatch(setIsLoggedInAC(true))
      dispatch(setNewNameAC(res.data.name, res.data.avatar))
    })
    .catch((res) => {
      dispatch(setAppErrorAC(res.message))
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
