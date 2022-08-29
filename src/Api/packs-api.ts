import { instance } from './baseInstance'

export const packsAPI = {
  addPack(model: AddPackModelType) {
    return instance.post('/cards/pack', model)
  },
  getPack() {
    return instance.get('/cards/pack')
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
