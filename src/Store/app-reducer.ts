import { authAPI } from '../Api/auth-api'
import { setEmailAC, setIsLoggedInAC, setNewNameAC } from './auth-reducer'
import { AppThunk } from './store'

export type InitialStateType = {
  error: string
  success: string
  isFetching: boolean
}
const initialState: InitialStateType = {
  error: '',
  success: '',
  isFetching: false,
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-SUCCESS':
      return { ...state, success: action.success }
    case 'APP/SET-INITIALIZED':
      return { ...state, isFetching: action.value }
    default:
      return state
  }
}
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetSuccessActionType = ReturnType<typeof setSuccessAC>
export type IsFetchingActionType = ReturnType<typeof isFetchingAppAC>

type ActionsType = SetAppErrorActionType | IsFetchingActionType | SetSuccessActionType

export const setAppErrorAC = (error: string) => ({ type: 'APP/SET-ERROR', error } as const)
export const setSuccessAC = (success: string) => ({ type: 'APP/SET-SUCCESS', success } as const)
export const isFetchingAppAC = (value: boolean) => ({ type: 'APP/SET-INITIALIZED', value } as const)

export const isLoggedInTC = (): AppThunk => (dispatch) => {
  dispatch(isFetchingAppAC(true))
  authAPI
    .me()
    .then((res) => {
      let { name, avatar, email } = res.data
      dispatch(setIsLoggedInAC(true))
      dispatch(setNewNameAC(name, avatar))
      dispatch(setEmailAC(email))
    })
    .catch((res) => console.log(res))
    .finally(() => {
      dispatch(isFetchingAppAC(false))
    })
}
