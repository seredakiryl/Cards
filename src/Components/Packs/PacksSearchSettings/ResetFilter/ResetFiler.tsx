import React from 'react'

import {
  findCardsIdPackAC,
  findMaxCardsInPackAC,
  findMinCardsInPackAC,
  findPacksThroughInputAC,
  setPacksPageAC,
  setPageCountAC,
} from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'

import s from './ResetFilter.module.css'

export const ResetFiler = () => {
  const dispatch = useAppDispatch()

  const resetFiltersHandle = () => {
    dispatch(findMinCardsInPackAC(0))
    dispatch(findMaxCardsInPackAC(8))
    dispatch(findCardsIdPackAC(''))
    dispatch(findPacksThroughInputAC(''))
    dispatch(setPacksPageAC(1))
    console.log('click')
  }

  return <div className={s.filter} onClick={resetFiltersHandle}></div>
}
