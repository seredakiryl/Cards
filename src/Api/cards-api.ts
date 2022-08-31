import { instance } from './baseInstance'

export const cardsAPI = {
  addCard(postModel: AddCardModelType) {
    return instance.post('/cards/card', postModel)
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
