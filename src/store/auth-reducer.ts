export type InitialStateType = any
type ActionsType = any
const a = 2
const initialState: InitialStateType = {}

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    default:
      return state
  }
}
