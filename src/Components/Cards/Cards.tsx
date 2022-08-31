import React from 'react'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import s from './Cards.module.css'

export const Cards = () => {
  return (
    <div className={s.wrapper}>
      <div>
        <ArrowLeftOutlined />
        <span>Back to Packs List</span>
      </div>
      <h1>Name Pack</h1>
      <Button type="primary" shape="round" size={'middle'}>
        Download
      </Button>
    </div>
  )
}
