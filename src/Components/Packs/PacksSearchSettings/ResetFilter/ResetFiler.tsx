import React from 'react'

import {
  findMaxCardsInPackAC,
  findMinCardsInPackAC,
  findPacksThroughInputAC,
  getPacksTC,
  setPacksPageAC,
} from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'

import s from './ResetFilter.module.css'

export const ResetFiler = () => {
  const dispatch = useAppDispatch()

  const resetFiltersHandle = () => {
    dispatch(findMinCardsInPackAC(0))
    dispatch(findMaxCardsInPackAC(8))
    dispatch(findPacksThroughInputAC(''))
    dispatch(setPacksPageAC(1))
  }

  return <div className={s.filter} onClick={resetFiltersHandle}></div>
}
