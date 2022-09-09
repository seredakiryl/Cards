import axios, { AxiosError } from 'axios'
import { useAppDispatch } from '../../Store/store'
import { setAppErrorAC } from '../../Store/app-reducer'
import { Dispatch } from 'redux'

export const handleServerNetworkError = (
    error: Error | AxiosError<{ error: string }>,
    dispatch: Dispatch,
): void => {
    const err = error as Error | AxiosError<{ error: string }>;

    if (axios.isAxiosError(err)) {
        dispatch(setAppErrorAC(err.response?.data ? err.message : 'Some error occurred'));
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`));
    }
};