import { Button, Rate, Table, Tooltip } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import { CardsType, setCardsPageAC } from '../../../../Store/cards-reducer'
import { setPageCountAC } from '../../../../Store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../../Store/store'

import { ActionCards } from './ActionsCards/ActionCards'
import s from './CardsTable.module.css'

interface DataType {
  question: string
  answer: string
  lastUpdated: string
}

type PropsType = {
  page: number
  pageCount: number
}
export const CardsTable = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const cards = useAppSelector<Array<CardsType>>(state => state.cards.cards)
  const isFetching = useAppSelector(state => state.cards.isFetching)

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
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ]

  let data = cards.map(p => {
    return {
      key: p._id,
      question: p.question,
      answer: p.answer,
      lastUpdated: p.updated.slice(0, 10),
      grade: <Rate disabled defaultValue={p.grade} />,
      actions: (
        <ActionCards cardID={p._id} udserID={p.user_id} answer={p.answer} question={p.question} />
      ),
    }
  })

  return (
    <div className={s.wrapper}>
      <Table
        className={s.wrapper}
        columns={columns}
        loading={isFetching}
        dataSource={data}
        size="large"
        pagination={{
          current: props.page,
          pageSize: props.pageCount,
          total: cardsTotalCount,
          position: ['bottomLeft'],
          onChange: (page, pageSize) => {
            dispatch(setCardsPageAC(page))
            dispatch(setPageCountAC(pageSize))
          },
        }}
      />
    </div>
  )
}
