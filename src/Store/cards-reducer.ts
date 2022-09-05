import { cardsAPI, GetCardsType } from './../Api/cards-api'
import { AppThunk } from './store'
type InitialStateType = {
  cards: Array<CardsType>
}
type CardsType = {
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
  cards: [
    {
      answer: '',
      question: '',
      cardsPack_id: '',
      grade: 0,
      shots: 1,
      user_id: '',
      created: '',
      updated: '',
      _id: '',
    },
  ],
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerType) => {
  switch (action.type) {
    case 'CARDS/GET_CARDS': {
      return { ...state, cards: action.card }
    }
    default:
      return state
  }
}

type CardsReducerType = GetCardsACType
type GetCardsACType = ReturnType<typeof getCardsAC>

export const getCardsAC = (card: any) => {
  return { type: 'CARDS/GET_CARDS', card } as const
}

export const getCardsTC =
  (model: any): AppThunk =>
  dispatch => {
    cardsAPI.getCards(model).then(res => {
      console.log(res)

      dispatch(getCardsAC(res.data.cards))
    })
  }
