import React, { useEffect, useState } from 'react'

import { Radio, RadioChangeEvent } from 'antd'

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
  const [value, setValue] = useState('ALL')

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio3 checked', value)
    setValue(value)
  }

  useEffect(() => {
    dispatch()
  }, [value])

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
