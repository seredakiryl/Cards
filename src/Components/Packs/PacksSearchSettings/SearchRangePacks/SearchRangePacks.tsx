import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input, Slider } from 'antd'

import { findMaxCardsInPackAC, findMinCardsInPackAC } from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'

import s from './SearchRangePacks.module.css'
type SearchRangePacksType = {
  min: number
  max: number
}
export const SearchRangePacks = (props: SearchRangePacksType) => {
  const dispatch = useAppDispatch()
  const onChange = (value: [number, number]) => {
    dispatch(findMinCardsInPackAC(value[0]))
    dispatch(findMaxCardsInPackAC(value[1]))
  }
  const onChangeMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(findMinCardsInPackAC(+e.currentTarget.value))
  }
  const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(findMaxCardsInPackAC(+e.currentTarget.value))
  }

  return (
    <div>
      <span>Number of cards</span>
      <div className={s.wrapper}>
        <Input className={s.input} value={props.min} onChange={onChangeMinHandler} />
        <Slider
          className={s.slider}
          range
          step={1}
          value={[props.min, props.max]}
          onChange={onChange}
          onAfterChange={onChange}
        />
        <Input className={s.input} value={props.max} onChange={onChangeMaxHandler} />
      </div>
    </div>
  )
}
