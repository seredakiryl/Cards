import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input, Slider } from 'antd'

import { findMaxCardsInPackAC, findMinCardsInPackAC } from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'

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
      <Input value={min} onChange={onChangeMinHandler} />
      <Slider
        range
        step={1}
        defaultValue={[min, max]}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
      <Input value={max} onChange={onChangeMaxHandler} />
    </div>
  )
}
