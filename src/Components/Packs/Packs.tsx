import { useEffect } from 'react'

import { packsAPI } from '../../Api/packs-api'

import s from './Packs.module.css'
import { PacksHeader } from './PacksHeader/PacksHeader'

export const Packs = () => {
  useEffect(() => {
    packsAPI.getPack().then(res => {
      console.log(res.data)
    })
  }, [])

  return (
    <div className={s.wrapper}>
      <PacksHeader />
    </div>
  )
}
