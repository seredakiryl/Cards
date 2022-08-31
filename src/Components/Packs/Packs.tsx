import React, { useEffect } from 'react'

import { getPacksTC } from '../../Store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../Store/store'

import s from './Packs.module.css'
import { PacksHeader } from './PacksHeader/PacksHeader'
import { SearchInput } from './PacksSearchSettings/SearchInput/SearchInput'
import { SearchRangePacks } from './PacksSearchSettings/SearchRangePacks/SearchRangePacks'
import { ShowPacks } from './PacksSearchSettings/ShowPacks/ShowPacks'
import { PacksTable } from './PacksTable/PacksTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const packName = useAppSelector(state => state.packs.packName)
  const minCards = useAppSelector(state => state.packs.minCardsCount)
  const maxCards = useAppSelector(state => state.packs.maxCardsCount)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const mycard = useAppSelector(state => state.packs.user_id)

  const getModel: any = {
    params: {
      packName: packName,
      min: minCards,
      max: maxCards,
      sortPacks: '0updatet',
      page: 1,
      pageCount: 8,
      user_id: mycard,
    },
  }

  useEffect(() => {
    isLoggedIn && dispatch(getPacksTC(getModel))
  }, [getModel])

  return (
    <div className={s.wrapper}>
      <PacksHeader />
      <div className={s.searchSettings}>
        <SearchInput />
        <ShowPacks />
        <SearchRangePacks />
      </div>
      <PacksTable />
    </div>
  )
}
