import React, { useCallback, useEffect } from 'react'

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
  const { packName, maxCardsCount, minCardsCount, page, pageCount, user_id } = useAppSelector(
    state => state.packs
  )
  const minCards = useDebounce(minCardsCount, 1000)
  const maxCards = useDebounce(maxCardsCount, 1000)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


  const getTableData = useCallback(() => {
    const getModel: any = {
      params: {
        packName: packName,
        min: minCardsCount,
        max: maxCardsCount,
        sortPacks: '0updatet',
        page: page,
        pageCount: pageCount,
        user_id: user_id,
      },
    }


    isLoggedIn && dispatch(getPacksTC(getModel))
  }, [])

  useEffect(() => {
    getTableData()
  }, [minCards, maxCards])

  return (
    <div className={s.wrapper}>
      <PacksHeader />
      <div className={s.searchSettings}>
        <SearchInput packName={packName} />
        <ShowPacks />
        <SearchRangePacks min={minCardsCount} max={maxCardsCount} />
        <ResetFiler />
      </div>
      <PacksTable pageCount={pageCount} page={page} />
    </div>
  )
}
