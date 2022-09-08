import { cardsAPI, CardType} from './../Api/cards-api'
import { AppThunk } from './store'
type InitialStateType = {
  cards: CardsType[]
  queryParams: any
  cardsTotalCount: number
  isFetching: boolean
}
export type CardsType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
const initialState: InitialStateType = {
  cards: [],
  queryParams: {
    cardQuestion: '',
    cardAnswer: '',
    cardsPack_id: '',
    pageCount: 8,
    page: 1,
  },
  cardsTotalCount: 1,
  isFetching: false,
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'CARDS/SET_IS_FETCHING':
      return { ...state, isFetching: action.value }
    case 'CARDS/GET_CARDS': {
      return { ...state, cards: action.cards }
    }
    case 'CARDS/GET_TOTAL_CARDS': {
      return { ...state, cardsTotalCount: action.cardsTotalCount }
    }
    case 'CARDS/SET_CARDS_PAGE': {
      return { ...state, queryParams: { ...state.queryParams, page: action.value } }
    }
    case 'CARDS/SET_PAGE_COUNT': {
      return { ...state, queryParams: { ...state.queryParams, pageCount: action.value } }
    }
    case 'CARDS/SET_CARDS_PACK_ID': {
      return { ...state, queryParams: { ...state.queryParams, cardsPack_id: action.cardsPackId } }
    }

    case 'CARDS/SET_CARD_QUESTION': {
      return { ...state, queryParams: { ...state.queryParams, cardQuestion: action.question } }
    }
    default:
      return state
  }
}

export const setIsFetchingAC = (value: boolean) => {
  return { type: 'CARDS/SET_IS_FETCHING', value } as const
}
export const getCardsAC = (cards: any) => {
  return { type: 'CARDS/GET_CARDS', cards } as const
}
export const getTotalCardsAC = (cardsTotalCount: number) => {
  return { type: 'CARDS/GET_TOTAL_CARDS', cardsTotalCount } as const
}
export const setCardsPageAC = (value: number) => {
  return { type: 'CARDS/SET_CARDS_PAGE', value } as const
}
export const setPageCountAC = (value: number) => {
  return { type: 'CARDS/SET_PAGE_COUNT', value } as const
}
export const setCardsPackIdAC = (cardsPackId: string) => {
  return { type: 'CARDS/SET_CARDS_PACK_ID', cardsPackId } as const
}
export const setCardQustionAC = (question: string) => {
  return { type: 'CARDS/SET_CARD_QUESTION', question } as const
}

type ActionsType =
  | ReturnType<typeof getCardsAC>
  | ReturnType<typeof getTotalCardsAC>
  | ReturnType<typeof setCardsPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setCardsPackIdAC>
  | ReturnType<typeof setCardQustionAC>
  | ReturnType<typeof setIsFetchingAC>

export const getCardsTC = (): AppThunk => async (dispatch, getState) => {
  const params = getState().cards.queryParams

  dispatch(setIsFetchingAC(true))
  try {
    const res = await cardsAPI.getCards({ params: params })

    dispatch(getCardsAC(res.data.cards))
    dispatch(getTotalCardsAC(res.data.cardsTotalCount))
  } catch (error) {
    console.log(error)
  } finally {
    dispatch(setIsFetchingAC(false))
  }
}
export const addNewCardTC = (card: CardType): AppThunk => async (dispatch) => {
  dispatch(setIsFetchingAC(true))
  try {
    await cardsAPI.addCard({ card: card })
    dispatch(getCardsTC())
  } catch (error) {
      console.log(error)
  } finally {
      dispatch(setIsFetchingAC(false))
  }
}
