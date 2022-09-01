import React from 'react'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import s from './Cards.module.css'

export const Cards = () => {
  const onclickHandler = () => {
    console.log('tratata')
  }

  return (
    <div className={s.wrapper}>
      <div>
        <ArrowLeftOutlined />
        <span>Back to Packs List</span>
      </div>
      <h1>Name Pack</h1>
      <Button type="primary" shape="round" size={'middle'} onClick={onclickHandler}>
        Add new card
      </Button>
    </div>
  )
}
