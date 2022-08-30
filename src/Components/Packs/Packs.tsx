import { useEffect } from 'react'

import { packsAPI } from '../../Api/packs-api'

import s from './Packs.module.css'
import { PacksHeader } from './PacksHeader/PacksHeader'
import { SearchInput } from './PacksSearchSettings/SearchInput/SearchInput'

export const Packs = () => {
  useEffect(() => {
    packsAPI
      .getPack()
      .then((res) => {
        console.log(res.data)
      })
      .catch(() => console.log('error'))
  }, [])

  return (
    <div className={s.wrapper}>
      <PacksHeader />
      <SearchInput />
    </div>
  )
}
