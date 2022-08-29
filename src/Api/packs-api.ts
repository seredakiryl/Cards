import { instance } from './baseInstance'

export const packsAPI = {
  addPack(model: AddPackModelType) {
    return instance.post('/cards/pack', model)
  },
  getPack() {
    return instance.get('/cards/pack', model1)
  },
}

type AddPackModelType = {
  cardsPack: CardsPackType
}
type CardsPackType = {
  name: string
  deckCover?: string
  private: boolean
}
const model1: arrayCardsType = {
  params: {
    packName: 'english',
    min: 3,
    max: 9,
    sortPacks: '0updatet',
    page: 1,
    pageCount: 8,
  },
}

type arrayCardsType = {
  params: {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id?: string
  }
}
