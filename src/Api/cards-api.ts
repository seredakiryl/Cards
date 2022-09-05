import { instance } from './baseInstance'

export const cardsAPI = {
  addCard(postModel: AddCardModelType) {
    return instance.post('/cards/card', postModel)
  },
  getCards(getCards: GetCardsType) {
    return instance.get('/cards/card', getCards)
  },
}

type AddCardModelType = {
  card: CardType
}
type CardType = {
  cardsPack_id: string
  question: string
  answer: string
  grade: number
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
}

export type GetCardsType = {
  params: {
    cardAnswer?: 'string'
    cardQuestion?: 'string'
    cardsPack_id: 'string'
    min?: number
    max?: number
    sortCards?: 'string'
    page?: number
    pageCount?: number
  }
}
