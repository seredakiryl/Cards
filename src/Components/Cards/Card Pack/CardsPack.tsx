import React, { useEffect } from 'react'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useNavigate } from 'react-router-dom'

import { getCardsTC } from '../../../Store/cards-reducer'
import { setPacksPageAC, setPageCountAC } from '../../../Store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../Store/store'
import { ActionsPacks } from '../../Packs/PacksTable/ActionsPacks/ActionPacks'

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

  const baseModel = {
    cardAnswer: '',
    // cardQuestion: '',
    cardsPack_id: '5eb6a2f72f849402d46c6ac7',
    // min: 1,
    // max: 100,
    // sortCards: '0grade',
    // page: 1,
    // pageCount: 8,
  }

  useEffect(() => {
    dispatch(getCardsTC(baseModel))
    console.log(cards)
  }, [])

  let data = cards.map(p => {
    return {
      key: p._id,
      question: p.question,
      cardsCount: p.answer,
      lastUpdated: p.updated.slice(0, 10),
      createdBy: p.grade,
      /* actions: (
        <ActionsPacks packId={p._id} question={p.question} userId={userId} creatorUserId={p.user_id} />
      ),*/
    }
  })

  return (
    <div className={s.wrapper}>
      <div>
        <ArrowLeftOutlined onClick={onClickHandlerBackToPackList} />
        <span>Back to Packs List</span>

        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          // pagination={{
          //   current: props.page,
          //   pageSize: props.pageCount,
          //   total: totalCountPacks,
          //   position: ['bottomLeft'],
          //   onChange: (page, pageSize) => {
          //     dispatch(setPacksPageAC(page))
          //     dispatch(setPageCountAC(pageSize))
          //   },
          //}}
        />
      </div>
    </div>
  )
}
