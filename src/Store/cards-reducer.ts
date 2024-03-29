import { AxiosError } from 'axios'


import { packsAPI } from '../Api/packs-api'

import { handleServerNetworkError } from '../Common/ErrorUtils/ErrorUtils'

import { cardsAPI, CardType } from './../Api/cards-api'
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
    case 'CARDS/SET_NEW_CARD_QUESTION/ANSWER': {
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          cardQuestion: action.question,
          cardAnswer: action.answer,
        },
      }
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
export const editCardAC = (id: string, question: string, answer: string) => {
  return { type: 'CARDS/SET_NEW_CARD_QUESTION/ANSWER', id, question, answer } as const
}

type ActionsType =
  | ReturnType<typeof getCardsAC>
  | ReturnType<typeof getTotalCardsAC>
  | ReturnType<typeof setCardsPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setCardsPackIdAC>
  | ReturnType<typeof setCardQustionAC>
  | ReturnType<typeof setIsFetchingAC>
  | ReturnType<typeof editCardAC>

export const getCardsTC =
  (id?: string): AppThunk =>
  async (dispatch, getState) => {
    let params = getState().cards.queryParams

    if (id) {
      params = { ...params, cardsPack_id: id }
    }
    dispatch(setIsFetchingAC(true))
    try {
      const res = await cardsAPI.getCards({ params: params })

      dispatch(getCardsAC(res.data.cards))
      dispatch(getTotalCardsAC(res.data.cardsTotalCount))
    } catch (error) {
      handleServerNetworkError(error as AxiosError | Error, dispatch)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }

export const addNewCardTC =
  (card: CardType): AppThunk =>
  async dispatch => {
    dispatch(setIsFetchingAC(true))
    try {
      await cardsAPI.addCard({ card: card })
      dispatch(getCardsTC())
    } catch (error) {
      handleServerNetworkError(error as AxiosError | Error, dispatch)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }


export const editCardQuestionOrAnswerTC =

  (id: string, question: string, answer: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsFetchingAC(true))
      await cardsAPI.editCard(id, question, answer)
      dispatch(getCardsTC())
    } catch (error) {
      handleServerNetworkError(error as AxiosError | Error, dispatch)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }

export const addGradeTC =
  (grade: any): AppThunk =>
  async dispatch => {
    dispatch(setIsFetchingAC(true))
    try {
      await cardsAPI.addGrade(grade)
      console.log('оценка отправилась')
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }

export const deleteCardTC =
  (id: string): AppThunk =>
  async dispatch => {
    let params = {
      id: id,
    }

    try {
      dispatch(setIsFetchingAC(true))
      await cardsAPI.deleteCart({ params })
      console.log('sent id card for delete')
      dispatch(getCardsTC())
    } catch (error) {
      handleServerNetworkError(error as AxiosError | Error, dispatch)
    } finally {
      dispatch(setIsFetchingAC(false))
    }
  }
