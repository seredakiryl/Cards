import React, { useEffect } from 'react'

import { getPacksTC } from '../../Store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../Store/store'

import s from './Packs.module.css'
import { PacksHeader } from './PacksHeader/PacksHeader'

export const Packs = React.memo(() => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  const dispatch = useAppDispatch()
  useEffect(() => {
    isLoggedIn && dispatch(getPacksTC())
  }, [isLoggedIn])

  return (
    <div className={s.wrapper}>
      <PacksHeader />
    </div>
  )
})
