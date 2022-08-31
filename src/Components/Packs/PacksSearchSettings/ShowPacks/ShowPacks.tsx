import React, { useState } from 'react'

import { Radio, RadioChangeEvent } from 'antd'

import { findCardsIdPackAC } from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'
const options = [
  {
    label: 'ALL',
    value: 'ALL',
  },
  {
    label: 'MY',
    value: 'MY',
  },
]

export const ShowPacks = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('MY')

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value)
    dispatch(findCardsIdPackAC(value))
  }

  return (
    <div>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  )
}
