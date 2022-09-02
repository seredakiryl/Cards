import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input } from 'antd'

import { findPacksThroughInputAC } from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'

import { useDebounce } from './UseDebounce'

type SearchInputType = {
  packName: string
}

export const SearchInput = (props: SearchInputType) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 1000)
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
    // dispatch(findPacksThroughInputAC(event.currentTarget.value))
  }

  useEffect(() => {
    setValue(props.packName)
  }, [props.packName])

  useEffect(() => {
    dispatch(findPacksThroughInputAC(debouncedValue))
  }, [debouncedValue])

  return (
    <div>
      <span>Search</span>
      <Input placeholder="Provide your text" onChange={onChangeHandler} value={value} />
    </div>
  )
}
