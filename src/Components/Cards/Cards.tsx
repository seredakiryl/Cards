import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'

import s from './Cards.module.css'

export const Cards = () => {
  const dispatch = useDispatch()
  const baseModel = {
    card: {
      cardsPack_id: '630e99065141d700040db4c0',
      question: 'no question',
      answer: 'no answer',
      grade: 0,
      shots: 0,
      answerImg: 'url or base 64',
      questionImg: 'url or base 64',
      questionVideo: 'url or base 64',
      answerVideo: 'url or base 64',
    },
  }

  return (
    <div className={s.wrapper}>
      <div>
        <ArrowLeftOutlined />
        <span>Back to Packs List</span>
      </div>
      <h1>Name Pack</h1>
      <Button type="primary" shape="round" size={'middle'} /**onClick={onclickHandlerAddNewCard}*/>
        Add new card
      </Button>
    </div>
  )
}
