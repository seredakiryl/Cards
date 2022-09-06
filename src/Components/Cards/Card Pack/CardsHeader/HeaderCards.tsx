import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { BackArrow } from '../../../BackArrow/BackArrow'

import s from './HeaderCards.module.css'

type PropsType = {
  cardsPackId: string
}
export const HeaderCards = (props: PropsType) => {
  const onclickHandlerAddNewCard = () => {
    console.log('Create New Card in cardsPackId')
  }

  return (
    <div className={s.wrapper}>
      <BackArrow url={'/packs'} />
      <h2>Name Pack</h2>
      <Button type="primary" shape="round" size={'middle'}>
        Add new card
      </Button>
    </div>
  )
}
