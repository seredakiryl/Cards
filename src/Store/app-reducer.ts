import { AxiosError } from 'axios'

import { authAPI } from '../Api/auth-api'
import { handleServerNetworkError } from '../Common/ErrorUtils/ErrorUtils'

import { setEmailAC, setIsLoggedInAC, setNewNameAC } from './auth-reducer'
import { catchMyIdAC } from './packs-reducer'
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

type ActionsType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setSuccessAC>
  | ReturnType<typeof isFetchingAppAC>

export const setAppErrorAC = (error: string) => ({ type: 'APP/SET-ERROR', error } as const)
export const setSuccessAC = (success: string) => ({ type: 'APP/SET-SUCCESS', success } as const)
export const isFetchingAppAC = (value: boolean) => ({ type: 'APP/SET-INITIALIZED', value } as const)

export const isLoggedInTC = (): AppThunk => async dispatch => {
  try {
    dispatch(isFetchingAppAC(true))
    const res = await authAPI.me()
    let { name, avatar, email, _id } = res.data

    dispatch(setIsLoggedInAC(true))
    dispatch(setNewNameAC(name, avatar))
    dispatch(setEmailAC(email))
    dispatch(catchMyIdAC(_id))
  } finally {
    dispatch(isFetchingAppAC(false))
  }
}
