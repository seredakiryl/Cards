const initialState: InitialStateType = {
  error: '',
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}

export type InitialStateType = {
  error: string
}

export const setAppErrorAC = (error: string) => ({ type: 'APP/SET-ERROR', error } as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type ActionsType = SetAppErrorActionType
