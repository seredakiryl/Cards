export const cardsReducer = (state: any, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}
export const addNewCardAC = (model: any) => {
  return { type: 'CARDS/ADD_NEW_CARD', model } as const
}
