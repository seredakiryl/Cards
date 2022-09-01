import React, { useEffect, useState } from 'react'

import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import { getPacksTC, setPacksPageTC } from '../../../Store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../Store/store'

interface DataType {
  name: string
  cardsCount: number
  lastUpdated: string
  createdBy: string
}
export const PacksTable = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const packs = useAppSelector(state => state.packs.packs)
  const totalCountPacks = useAppSelector(state => state.packs.cardPacksTotalCount)
  const initialPage = useAppSelector(state => state.packs.page)
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(8)

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
      title: 'Last Updated',
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
      name: p.name,
      cardsCount: p.cardsCount,
      lastUpdated: p.updated,
      createdBy: p.created,
    }
  })

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={{
          current: page,
          pageSize: pageSize,
          total: totalCountPacks,
          position: ['bottomLeft'],
          onChange: (page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          },
        }}
      />
    </div>
  )
}
