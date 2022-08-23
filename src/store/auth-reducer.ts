import { Dispatch } from 'redux'
import { authAPI } from '../api/auth-api'
import { Simulate } from 'react-dom/test-utils'
import error = Simulate.error

const initialState = {
  isLoggedIn: false,
  name: '',
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

export const isLoggedInTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data._id) {
      dispatch(setIsLoggedInAC(true))
    }
  })
}
export const setNewNameAC = (name: string) => ({ type: 'PROFILE/SET-NEW-NAME', name } as const)

type SetNewNameACType = ReturnType<typeof setNewNameAC>

export const setNewNameTC = (name: string) => (dispatch: Dispatch) => {
  authAPI.changeName(name).then((res) => {
    dispatch(setNewNameAC(name))
  })
}
