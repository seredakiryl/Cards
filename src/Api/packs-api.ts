import { instance } from './baseInstance'

export const packsAPI = {
  addPack(model: AddPackModelType) {
    return instance.post('/cards/pack', model)
  },
  getPack(model1: any) {
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
