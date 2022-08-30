import { packsAPI } from '../Api/packs-api'

import { AppThunk } from './store'

type InitialStateType = {
  isFetching: boolean
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
  pageCount: 8,
  page: 1,
  packName: '',
  minCardsCount: 0,
  maxCardsCount: 8,
  sortPacks: '',
}

export const packsReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-IS-FETCHING':
      return { ...state, isFetching: action.value }
    default:
      return state
  }
}

export const setIsFetchingAC = (value: boolean) =>
  ({ type: 'PACKS/SET-IS-FETCHING', value } as const)

type SetIsFetchingACType = ReturnType<typeof setIsFetchingAC>
type ActionsType = SetIsFetchingACType

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
