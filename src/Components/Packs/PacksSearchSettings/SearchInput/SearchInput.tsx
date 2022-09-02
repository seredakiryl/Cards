import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input } from 'antd'

import useDebounce from '../../../../Hooks/useDebounce'
import { findPacksThroughInputAC } from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'

type SearchInputType = {
  packName: string
}

export const SearchInput = (props: SearchInputType) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce(value, 1000)
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
