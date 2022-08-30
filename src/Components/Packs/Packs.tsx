import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { packsAPI } from '../../Api/packs-api'
import { store, useAppSelector } from '../../Store/store'

import s from './Packs.module.css'
import { PacksHeader } from './PacksHeader/PacksHeader'
import { SearchInput } from './PacksSearchSettings/SearchInput/SearchInput'
import { SearchRangePacks } from './PacksSearchSettings/SearchRangePacks/SearchRangePacks'
import { ShowPacks } from './PacksSearchSettings/ShowPacks/ShowPacks'

export const Packs = () => {
  const packName = useAppSelector(state => state.packs.packName)
  const minCards = useAppSelector(state => state.packs.minCardsCount)
  const maxCards = useAppSelector(state => state.packs.maxCardsCount)
  const getModel: any = {
    params: {
      packName: packName,
      min: minCards,
      max: maxCards,
      sortPacks: '0updatet',
      page: 1,
      pageCount: 8,
    },
  }

  useEffect(() => {
    packsAPI
      .getPack(getModel)
      .then(res => {
        console.log(res.data)
      })
      .catch(() => console.log('error'))
  }, [getModel])

  return (
    <div className={s.wrapper}>
      <PacksHeader />
      <SearchInput />
      <ShowPacks />
      <SearchRangePacks />
    </div>
  )
}
