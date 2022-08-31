import React from 'react'

import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import { useAppSelector } from '../../../Store/store'

interface DataType {
  name: string
  cardsCount: number
  lastUpdated: string
  createdBy: string
}
export const PacksTable = () => {
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

  console.log(data)

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={{ pageSize: 10, total: 80, position: ['bottomLeft'] }}
      />
    </div>
  )
}
