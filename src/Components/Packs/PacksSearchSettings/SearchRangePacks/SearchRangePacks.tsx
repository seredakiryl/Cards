import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input, Slider } from 'antd'

import { findMaxCardsInPackAC, findMinCardsInPackAC } from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'

import s from './SearchRangePacks.module.css'
export const SearchRangePacks = () => {
  const dispatch = useAppDispatch()
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(15)
  const onChange = (value: [number, number]) => {
    setMin(value[0])
    setMax(value[1])
  }

  const onAfterChange = (value: [number, number]) => {
    setMin(value[0])
    setMax(value[1])
  }
  const onChangeMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMin(+e.currentTarget.value)
  }
  const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMax(+e.currentTarget.value)
  }

  useEffect(() => {
    dispatch(findMinCardsInPackAC(min))
    dispatch(findMaxCardsInPackAC(max))
  }, [min, max])

  return (
    <div>
      <span>Number of cards</span>
      <div className={s.wrapper}>
        <Input className={s.input} value={min} onChange={onChangeMinHandler} />
        <Slider
          className={s.slider}
          range
          step={1}
          defaultValue={[min, max]}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <Input className={s.input} value={max} onChange={onChangeMaxHandler} />
      </div>
    </div>
  )
}
