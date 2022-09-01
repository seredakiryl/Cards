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
    case 'PACKS/SET_PACKS': {
      return {
        ...state,
        packs: action.packs,
      }
    }
    case 'PACKS/SET_PACKS_PAGE': {
      return { ...state, page: action.value }
    }
    case 'PACKS/GET_TOTAL_PACKS': {
      return { ...state, cardPacksTotalCount: action.totalNumberPacks }
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
export const setPacksAC = (packs: Array<PacksType>) => {
  return { type: 'PACKS/SET_PACKS', packs } as const
}

export const getTotalPacksAC = (totalNumberPacks: number) => {
  return { type: 'PACKS/GET_TOTAL_PACKS', totalNumberPacks } as const
}

export const setPacksPageAC = (value: number) => {
  return { type: 'PACKS/SET_PACKS_PAGE', value } as const
}
type SetIsFetchingACType = ReturnType<typeof setIsFetchingAC>
type FindPacksThroughInputACType = ReturnType<typeof findPacksThroughInputAC>
type FindMinCardsInPackACType = ReturnType<typeof findMinCardsInPackAC>
type FindMaxCardsInPackACType = ReturnType<typeof findMaxCardsInPackAC>
type CatchMyIdACType = ReturnType<typeof catchMyIdAC>
type FindCardsIdPackACType = ReturnType<typeof findCardsIdPackAC>
type SetPacksACType = ReturnType<typeof setPacksAC>
type SetPacksPageACType = ReturnType<typeof setPacksPageAC>
type GetTotalPacksACType = ReturnType<typeof getTotalPacksAC>

type ActionsType =
  | FindPacksThroughInputACType
  | FindMinCardsInPackACType
  | FindMaxCardsInPackACType
  | CatchMyIdACType
  | FindCardsIdPackACType
  | SetIsFetchingACType
  | SetPacksACType
  | SetPacksPageACType
  | GetTotalPacksACType

export const getPacksTC =
  (model: any): AppThunk =>
  dispatch => {
    packsAPI
      .getPack(model)
      .then(res => {
        console.log(res)
        dispatch(setPacksAC(res.data.cardPacks))
        dispatch(getTotalPacksAC(res.data.cardPacksTotalCount))
      })
      .finally(() => {})
  }
export const setPacksPageTC =
  (model: any): AppThunk =>
  dispatch => {
    packsAPI.getPack(model).then(res => {
      dispatch(setPacksPageAC(res.data.packs.page))
    })
  }
