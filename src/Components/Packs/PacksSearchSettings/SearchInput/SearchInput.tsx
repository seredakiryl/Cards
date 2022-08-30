import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input } from 'antd'

import { useDebounce } from './UseDebounce'

export const SearchInput = () => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 1000)
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  useEffect(() => {
    console.log(debouncedValue) //todo:delete console.log
  }, [debouncedValue])

  return (
    <div>
      <span>Search</span>
      <Input placeholder="Provide your text" onChange={onChangeHandler} />
    </div>
  )
}
