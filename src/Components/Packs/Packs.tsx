import { useEffect } from 'react'

import useDebounce from '../../Hooks/useDebounce'
import { getPacksTC } from '../../Store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../Store/store'

import s from './Packs.module.css'
import { PacksHeader } from './PacksHeader/PacksHeader'
import { ResetFiler } from './PacksSearchSettings/ResetFilter/ResetFiler'
import { SearchInput } from './PacksSearchSettings/SearchInput/SearchInput'
import { SearchRangePacks } from './PacksSearchSettings/SearchRangePacks/SearchRangePacks'
import { ShowPacks } from './PacksSearchSettings/ShowPacks/ShowPacks'
import { PacksTable } from './PacksTable/PacksTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const { packName, maxCardsCount, minCardsCount, page, pageCount, sortPacks } = useAppSelector(
    state => state.packs.queryParams
  )
  const myAndAll = useAppSelector(state => state.packs.myAndAll)
  const isFetching = useAppSelector(state => state.packs.isFetching)
  const minCards = useDebounce(minCardsCount, 1000)
  const maxCards = useDebounce(maxCardsCount, 1000)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const getModel: any = {
    params: {
      packName: packName,
      min: minCards,
      max: maxCards,
      sortPacks: sortPacks,
      page: page,
      pageCount: pageCount,
      user_id: myAndAll,
    },
  }

  useEffect(() => {
    isLoggedIn && dispatch(getPacksTC(getModel))
  }, [packName, minCards, maxCards, sortPacks, page, pageCount, myAndAll])

  return (
    <div className={s.wrapper}>
      <PacksHeader />
      <div className={s.searchSettings}>
        <SearchInput packName={packName} />
        <ShowPacks />
        <SearchRangePacks min={minCardsCount} max={maxCardsCount} />
        <ResetFiler />
      </div>
      <PacksTable pageCount={pageCount} page={page} isFetching={isFetching} />
    </div>
  )
}
