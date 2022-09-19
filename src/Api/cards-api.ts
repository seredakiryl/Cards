import { instance } from './baseInstance'

export const cardsAPI = {
  addCard(postModel: AddCardModelType) {
    return instance.post('/cards/card', postModel)
  },
  getCards(getCards: GetCardsType) {
    return instance.get('/cards/card', getCards)
  },
  editCard(_id: string, question: string, answer: string) {
    return instance.put('/cards/card', { card: { _id: _id, question: question, answer: answer } })
  },
  addGrade(grade: any) {
    return instance.put('/cards/grade', grade)
  },
  deleteCart(deleteCard: deleteCardType) {
    return instance.delete('/cards/card', deleteCard)
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
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
  }
}
export type EditCardModelType = {
  card: EditCardType
}
export type EditCardType = {
  _id: string
  question: string
  answer: string
}
export type deleteCardType = {
  params: {
    id: string
  }
}
