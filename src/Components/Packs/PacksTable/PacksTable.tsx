import React from 'react'

import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import { setPacksPageAC, setPageCountAC } from '../../../Store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../Store/store'

import { ActionsPacks } from './ActionsPacks/ActionPacks'
import { SortPacks } from './SortPacks/SortPacks'

type DataType = {
  name: string
  cardsCount: number
  lastUpdated: string
  createdBy: string
}

type PropsType = {
  pageCount: number
  page: number
}
export const PacksTable = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const totalCountPacks = useAppSelector(state => state.packs.cardPacksTotalCount)
  const userId = useAppSelector(state => state.packs.user_id)
  const packs = useAppSelector(state => state.packs.packs)
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Cards',
      dataIndex: 'cardsCount',
    },
    {
      title: <SortPacks />,
      dataIndex: 'lastUpdated',
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ]

  let data = packs.map(p => {
    return {
      key: p._id,
      name: p.name,
      cardsCount: p.cardsCount,
      lastUpdated: p.updated.slice(0, 10),
      createdBy: p.created.slice(0, 10),
      actions: (
        <ActionsPacks packId={p._id} name={p.name} userId={userId} creatorUserId={p.user_id} />
      ),
    }
  })

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={{
          current: props.page,
          pageSize: props.pageCount,
          total: totalCountPacks,
          position: ['bottomLeft'],
          onChange: (page, pageSize) => {
            dispatch(setPacksPageAC(page))
            dispatch(setPageCountAC(pageSize))
          },
        }}
      />
    </div>
  )
}
