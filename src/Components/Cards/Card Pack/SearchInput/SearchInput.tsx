import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input } from 'antd'

import useDebounce from '../../../../Hooks/useDebounce'
import { setCardQustionAC } from '../../../../Store/cards-reducer'
import { useAppDispatch } from '../../../../Store/store'

type SearchInputType = {
  cardQuestion: string
}

export const SearchInput = (props: SearchInputType) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce(value, 1000)
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  useEffect(() => {
    setValue(props.cardQuestion)
  }, [props.cardQuestion])

  useEffect(() => {
    dispatch(setCardQustionAC(debouncedValue))
  }, [debouncedValue])

  return (
    <div>
      <span>Search</span>
      <Input placeholder="Provide your text" onChange={onChangeHandler} value={value} />
    </div>
  )
}
