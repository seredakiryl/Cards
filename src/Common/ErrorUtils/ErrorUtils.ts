import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppErrorAC } from '../../Store/app-reducer'

export const handleServerNetworkError = (
  error: Error | AxiosError<{ error: string }>,
  dispatch: Dispatch
): void => {
  const err = error as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    dispatch(setAppErrorAC(err.response?.data ? err.message : 'Some error occurred'))
  } else {
    dispatch(setAppErrorAC(`Native error ${err.message}`))
  }
}
