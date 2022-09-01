import { instance } from './baseInstance'

export const packsAPI = {
  addPack(postModel: AddPackModelType) {
    return instance.post('/cards/pack', postModel)
  },
  getPack(getModel: ArrayCardsType) {
    return instance.get('/cards/pack', getModel)
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

type ArrayCardsType = {
  params: {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
  }
}
