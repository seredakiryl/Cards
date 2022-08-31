import { packsAPI } from '../Api/packs-api'

import { AppThunk } from './store'

type InitialStateType = {
  isFetching: boolean
  packs: Array<PacksType>
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
  packName: string
  user_id: string
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
  isFetching: false,
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
  user_id: '',
}

export const packsReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-IS-FETCHING':
      return { ...state, isFetching: action.value }
    case 'PACKS/FIND_PACK_INPUT': {
      return { ...state, packName: action.inputValue }
    }
    case 'PACKS/FIND_MIN_CARDS_IN_PACKS': {
      return { ...state, minCardsCount: action.value }
    }
    case 'PACKS/FIND_MAX_CARDS_IN_PACKS': {
      return { ...state, maxCardsCount: action.value }
    }
    case 'PACKS/CATCH_MY_ID': {
      return { ...state, user_id: action.user_id }
    }
    case 'PACKS/FIND_CARDS_ID': {
      return {
        ...state,
        user_id: action.value === 'ALL' ? '' : state.user_id,
      }
    }
    default:
      return state
  }
}

export const setIsFetchingAC = (value: boolean) =>
  ({ type: 'PACKS/SET-IS-FETCHING', value } as const)

export const findPacksThroughInputAC = (inputValue: string) => {
  return {
    type: 'PACKS/FIND_PACK_INPUT',
    inputValue,
  } as const
}

export const findMinCardsInPackAC = (value: number) => {
  return { type: 'PACKS/FIND_MIN_CARDS_IN_PACKS', value } as const
}
export const findMaxCardsInPackAC = (value: number) => {
  return { type: 'PACKS/FIND_MAX_CARDS_IN_PACKS', value } as const
}
export const catchMyIdAC = (user_id: string) => {
  return { type: 'PACKS/CATCH_MY_ID', user_id } as const
}
export const findCardsIdPackAC = (value?: string) => {
  return { type: 'PACKS/FIND_CARDS_ID', value } as const
}
type SetIsFetchingACType = ReturnType<typeof setIsFetchingAC>
type findPacksThroughInputACType = ReturnType<typeof findPacksThroughInputAC>
type findMinCardsInPackACType = ReturnType<typeof findMinCardsInPackAC>
type findMaxCardsInPackACType = ReturnType<typeof findMaxCardsInPackAC>
type catchMyIdACType = ReturnType<typeof catchMyIdAC>
type findCardsIdPackACType = ReturnType<typeof findCardsIdPackAC>

type ActionsType =
  | findPacksThroughInputACType
  | findMinCardsInPackACType
  | findMaxCardsInPackACType
  | catchMyIdACType
  | findCardsIdPackACType
  | SetIsFetchingACType

export const getPacksTC = (): AppThunk => (dispatch) => {
  packsAPI
    .getPack({
      params: {
        packName: 'english',
        min: 3,
        max: 9,
        sortPacks: '0updatet',
        page: 1,
        pageCount: 8,
      },
    })
    .then((res) => {
      console.log(res.data)
    })
    .finally(() => {})
}
