import React from 'react'

import { Button } from 'antd'

import { addNewPack } from '../../../Store/packs-reducer'
import { useAppDispatch } from '../../../Store/store'
import { Title } from '../../Profile/Title/Title'

import s from './PacksHeader.module.css'

export const PacksHeader = () => {
  const dispatch = useAppDispatch()
  const addNewPackHandler = () => {
    dispatch(addNewPack({ cardsPack: { name: 'the best pack ever!!!', private: false } }))
  }

  return (
    <div className={s.wrapper}>
      <Title text={'Packs list'} />
      <Button
        type="primary"
        htmlType="submit"
        shape="round"
        className={s.button}
        onClick={addNewPackHandler}
      >
        Add new pack
      </Button>
    </div>
  )
}
