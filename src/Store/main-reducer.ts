type InitialStateType = {
  packs: Array<PacksType>
  pageCount: number
  page: number
  packName: string
  minCardsCount: number
  maxCardsCount: number
  sortPacks: string
}

type PacksType = {
  cardsCount: number
  created: string
  grade: number
  more_id: string
  name: string
  path: string
  private: false
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  user_name: string
  __v: number
  _id: string
}
const initialState: InitialStateType = {
  packs: [
    {
      cardsCount: 3,
      created: '',
      grade: 0,
      more_id: '',
      name: '',
      path: '',
      private: false,
      rating: 0,
      shots: 0,
      type: '',
      updated: '',
      user_id: '',
      user_name: '',
      __v: 0,
      _id: '',
    },
  ],
  pageCount: 8,
  page: 1,
  packName: '',
  minCardsCount: 0,
  maxCardsCount: 8,
  sortPacks: '',
}

type ActionsType = any
export const mainReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    default:
      return state
  }
}
