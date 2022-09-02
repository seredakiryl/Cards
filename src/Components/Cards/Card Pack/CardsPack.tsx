import { useEffect } from 'react'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { useNavigate } from 'react-router-dom'

import { getCardsTC } from '../../../Store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../Store/store'

import s from './CardsPack.module.css'
interface DataType {
  question: string
  answer: string
  lastUpdated: string
  grade: number
}
export const CardsPack = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)

  const onClickHandlerBackToPackList = () => {
    navigate('/packs')
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Question',
      dataIndex: 'question',
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
    },
  ]

  //   let data = packs.map(p => {
  //     return {
  //       question: p.question,
  //       cardsCount: p.cardsCount,
  //       lastUpdated: p.updated.slice(0, 10),
  //       grade: p.grade.slice(0, 10),
  //     }
  //   })
  const baseModel = {
    // cardAnswer: '',
    // cardQuestion: '',
    cardsPack_id: '6311e399bd3a3b1ebc2ac280',
    min: 1,
    max: 100,
    // sortCards: '0grade',
    // page: 1,
    // pageCount: 8,
  }

  useEffect(() => {
    dispatch(getCardsTC(baseModel))
    console.log(cards)
  }, [])

  return (
    <div className={s.wrapper}>
      <div>
        <ArrowLeftOutlined onClick={onClickHandlerBackToPackList} />
        <span>Back to Packs List</span>
      </div>
    </div>
  )
}
