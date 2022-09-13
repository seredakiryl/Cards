import { AxiosError } from 'axios'

import { packsAPI } from '../Api/packs-api'
import { handleServerNetworkError } from '../Common/ErrorUtils/ErrorUtils'

import { AppThunk } from './store'

export type PacksType = {
  cardsCount: number
  created: string
  grade: number
  more_id: string
  name: string | null
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  user_name: string
  __v: number
  _id: string
}

type InitialStateType = {
  isFetching: boolean
  packs: Array<PacksType>
  cardPacksTotalCount: number
  token: string
  tokenDeathTime: number
  myAndAll: string
  queryParams: any
}

const initialState: InitialStateType = {
  isFetching: false,
  packs: [],
  cardPacksTotalCount: 11,
  token: '',
  tokenDeathTime: 1661891431872,
  myAndAll: '',
  queryParams: {
    packName: null,
    minCardsCount: 0,
    maxCardsCount: 8,
    sortPacks: '0updated',
    page: 1,
    pageCount: 8,
    user_id: '',
  },
}

export const packsReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-IS-FETCHING':
      return { ...state, isFetching: action.value }
    case 'PACKS/FIND_PACK_INPUT': {
      return { ...state, queryParams: { ...state.queryParams, packName: action.inputValue } }
    }
    case 'PACKS/FIND_MIN_CARDS_IN_PACKS': {
      return { ...state, queryParams: { ...state.queryParams, minCardsCount: action.value } }
    }
    case 'PACKS/FIND_MAX_CARDS_IN_PACKS': {
      return { ...state, queryParams: { ...state.queryParams, maxCardsCount: action.value } }
    }
    case 'PACKS/CATCH_MY_ID': {
      return { ...state, queryParams: { ...state.queryParams, user_id: action.user_id } }
    }
    case 'PACKS/FIND_CARDS_ID': {
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          user_id: action.value === 'ALL' ? '' : state.queryParams.user_id,
        },
      }
    }
    case 'PACKS/SET_PACKS': {
      return {
        ...state,
        packs: action.packs,
      }
    }
    case 'PACKS/SET_PACKS_PAGE': {
      return { ...state, queryParams: { ...state.queryParams, page: action.value } }
    }
    case 'PACKS/GET_TOTAL_PACKS': {
      return { ...state, cardPacksTotalCount: action.totalNumberPacks }
    }
    case 'PACKS/SET_PAGE_COUNT': {
      return { ...state, queryParams: { ...state.queryParams, pageCount: action.value } }
    }
    case 'PACKS/SET_SORT_PACKS': {
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          sortPacks: state.queryParams.sortPacks === action.value ? '0updated' : '1updated',
        },
      }
    }
    case 'PACKS/SET_MY_AND_ALL': {
      return { ...state, myAndAll: action.myAndAll == 'MY' ? state.queryParams.user_id : '' }
    }
    case 'PACKS/SET_PACKS_NAME_AND_PRIVATE': {
      return {
        ...state,
        packs: state.packs.map(el => {
          return el._id === action.id ? { ...el, name: action.name, private: action.isPrivate } : el
        }),
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
export const setPacksAC = (packs: Array<PacksType>) => {
  return { type: 'PACKS/SET_PACKS', packs } as const
}
export const getTotalPacksAC = (totalNumberPacks: number) => {
  return { type: 'PACKS/GET_TOTAL_PACKS', totalNumberPacks } as const
}
export const setPacksPageAC = (value: number) => {
  return { type: 'PACKS/SET_PACKS_PAGE', value } as const
}
export const setPageCountAC = (value: number) => {
  return { type: 'PACKS/SET_PAGE_COUNT', value } as const
}
export const setSortPackstAC = (value: string) => {
  return { type: 'PACKS/SET_SORT_PACKS', value } as const
}
export const setmyAndAllAC = (myAndAll: string) => {
  return { type: 'PACKS/SET_MY_AND_ALL', myAndAll } as const
}
export const editPackNameAC = (id: string, name: string, isPrivate: boolean) => {
  return { type: 'PACKS/SET_PACKS_NAME_AND_PRIVATE', id, name, isPrivate } as const
}

type ActionsType =
  | ReturnType<typeof findPacksThroughInputAC>
  | ReturnType<typeof findMinCardsInPackAC>
  | ReturnType<typeof findMaxCardsInPackAC>
  | ReturnType<typeof catchMyIdAC>
  | ReturnType<typeof findCardsIdPackAC>
  | ReturnType<typeof setIsFetchingAC>
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof setPacksPageAC>
  | ReturnType<typeof getTotalPacksAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setSortPackstAC>
  | ReturnType<typeof setmyAndAllAC>
  | ReturnType<typeof editPackNameAC>

export const getPacksTC =
  (model: any): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsFetchingAC(true))
      const res = await packsAPI.getPack(model)

      console.log(res.data)
      dispatch(setPacksAC(res.data.cardPacks))
      dispatch(getTotalPacksAC(res.data.cardPacksTotalCount))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }

export const deletePackTC =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const model = getState().packs.queryParams

    try {
      dispatch(setIsFetchingAC(true))
      await packsAPI.deletePack(id)
      dispatch(getPacksTC({ params: model }))
    } catch (error) {
      handleServerNetworkError(error as AxiosError | Error, dispatch)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }

export const editPackNameTC =
  (id: string, packName: string, isPrivate: boolean): AppThunk =>
  async (dispatch, getState) => {
    const model = getState().packs.queryParams

    try {
      dispatch(setIsFetchingAC(true))
      await packsAPI.editPackName(id, packName, isPrivate)
      dispatch(getPacksTC({ params: model }))
    } catch (error) {
      handleServerNetworkError(error as AxiosError | Error, dispatch)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }

export const addNewPack =
  (newCard: any): AppThunk =>
  async (dispatch, getState) => {
    const model = getState().packs.queryParams

    try {
      dispatch(setIsFetchingAC(true))
      await packsAPI.addPack(newCard)
      dispatch(getPacksTC({ params: model }))
    } catch (error) {
      handleServerNetworkError(error as AxiosError | Error, dispatch)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }
