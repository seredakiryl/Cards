const initialState: InitialStateType = {
  error: '',
  initialized: false,
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-INITIALIZED':
      return { ...state, initialized: action.value }
    default:
      return state
  }
}

export type InitialStateType = {
  error: string
  initialized: boolean
}

export const setAppErrorAC = (error: string) => ({ type: 'APP/SET-ERROR', error } as const)
export const isInitializedAC = (value: boolean) => ({ type: 'APP/SET-INITIALIZED', value } as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type IsInitializedActionType = ReturnType<typeof isInitializedAC>

type ActionsType = SetAppErrorActionType | IsInitializedActionType
