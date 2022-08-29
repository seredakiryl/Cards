import React from 'react'
import { Title } from '../../Profile/Title/Title'
import { Button } from 'antd'
import s from './PacksHeader.module.css'
import { packsAPI } from '../../../Api/packs-api'

export const PacksHeader = () => {
  const addNewPackHandler = () => {
    packsAPI.addPack({ cardsPack: { name: 'the best pack ever!!!', private: false } })
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
