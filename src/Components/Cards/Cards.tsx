import { useEffect } from 'react'

import { getCardsTC } from '../../Store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../Store/store'

import { HeaderCards } from './Card Pack/CardsHeader/HeaderCards'
import { CardsTable } from './Card Pack/CardsTable/CardsTable'
import { SearchInput } from './Card Pack/SearchInput/SearchInput'
import s from './Cards.module.css'

export const Cards = () => {
  const dispatch = useAppDispatch()

  const { page, pageCount, cardQuestion, cardsPack_id } = useAppSelector(
    state => state.cards.queryParams
  )
  const currentPack = useAppSelector(state => state.packs.packs.find(el => el._id === cardsPack_id))

  useEffect(() => {
    dispatch(getCardsTC())
  }, [page, pageCount, cardQuestion, currentPack])

  return (
    <div className={s.wrapper}>
      <HeaderCards cardsPackId={cardsPack_id} packName={currentPack.name} />
      <SearchInput cardQuestion={cardQuestion} />
      <CardsTable page={page} pageCount={pageCount} />
    </div>
  )
}
