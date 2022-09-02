import React, { useEffect, useState } from 'react'

import { Segmented } from 'antd'

import { setmyAndAllAC } from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'

import s from './ShowPacks.module.css'

export const ShowPacks = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<any>('MY')

  useEffect(() => {
    dispatch(setmyAndAllAC(value))
  }, [value])

  return (
    <div className={s.wrapper}>
      <span>Show packs cards</span>
      <Segmented options={['ALL', 'MY']} value={value} onChange={setValue} />;
    </div>
  )
}
