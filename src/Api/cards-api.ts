import { instance } from './baseInstance'

export const cardsAPI = {
  addCard(postModel: AddCardModelType) {
    return instance.post('/cards/card', postModel)
  },
  getCards(getCards: GetCardsType) {
    return instance.get('/cards/card', getCards)
  },
  addGrade(grade: any) {
    return instance.put('/cards/grade', grade)
  },
}

export type AddCardModelType = {
  card: CardType
}
export type CardType = {
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
