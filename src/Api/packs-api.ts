import { instance } from './baseInstance'

export const packsAPI = {
  addPack(postModel: AddPackModelType) {
    return instance.post('/cards/pack', postModel)
  },
  getPack(getModel: ArrayCardsType) {
    return instance.get('/cards/pack', getModel)
  },
  deletePack(id: string) {
    return instance.delete(`/cards/pack?id=${id}`)
  },
  editPackName(id: string, packMame: string) {
    return instance.put(`/cards/pack`, {
      cardsPack: {
        _id: id,
        name: packMame,
      },
    })
  },
}

type AddPackModelType = {
  cardsPack: CardsPackType
}

type EditNamePackType = {
  cardsPack: {
    _id: string
    name: string
  }
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
