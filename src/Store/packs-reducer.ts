type InitialStateType = {
  packs: Array<PacksType>
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
  packName: string
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
  cardPacksTotalCount: 11,
  maxCardsCount: 8,
  minCardsCount: 0,
  page: 1,
  pageCount: 8,
  token: '',
  tokenDeathTime: 1661891431872,
  packName: '',
}

type ActionsType =
  | findPacksThroughInputACType
  | findMinCardsInPackACType
  | findMaxCardsInPackACType
  | findCardsIdPackACType

export const packsReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/FIND_PACK_INPUT': {
      return { ...state, packName: action.inputValue }
    }
    case 'PACKS/FIND_MIN_CARDS_IN_PACKS': {
      return { ...state, minCardsCount: action.value }
    }
    case 'PACKS/FIND_MAX_CARDS_IN_PACKS': {
      return { ...state, maxCardsCount: action.value }
    }
    case 'PACKS/FIND_CARDS_ID': {
      // let user_id = ''
      //
      // if (action.value === 'ALL') {
      //   user_id = ''
      // } else {
      //   user_id = action.value
      // }

      return {
        ...state,
        packs: [...state.packs, {user_id:action.value==='ALL':" "?"MY"}] /*[...packs, user_id: action.value==='ALL':""?"MY"]*/,
      }
    }
    default:
      return state
  }
}

type findPacksThroughInputACType = ReturnType<typeof findPacksThroughInputAC>
export const findPacksThroughInputAC = (inputValue: string) => {
  return {
    type: 'PACKS/FIND_PACK_INPUT',
    inputValue,
  } as const
}

type findMinCardsInPackACType = ReturnType<typeof findMinCardsInPackAC>
export const findMinCardsInPackAC = (value: number) => {
  return { type: 'PACKS/FIND_MIN_CARDS_IN_PACKS', value } as const
}

type findMaxCardsInPackACType = ReturnType<typeof findMaxCardsInPackAC>
export const findMaxCardsInPackAC = (value: number) => {
  return { type: 'PACKS/FIND_MAX_CARDS_IN_PACKS', value } as const
}

type findCardsIdPackACType = ReturnType<typeof findCardsIdPackAC>
export const findCardsIdPackAC = (value: string) => {
  return { type: 'PACKS/FIND_CARDS_ID', value } as const
}
