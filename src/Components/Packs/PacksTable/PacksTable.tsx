import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import { setPacksPageAC, setPageCountAC } from '../../../Store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../Store/store'

interface DataType {
  name: string
  cardsCount: number
  lastUpdated: string
  createdBy: string
}
export const PacksTable = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.packs.packs)
  const totalCountPacks = useAppSelector(state => state.packs.cardPacksTotalCount)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const page = useAppSelector(state => state.packs.page)

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
      lastUpdated: p.updated.slice(0, 10),
      createdBy: p.created.slice(0, 10),
    }
  })

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        scroll={{ y: 450 }}
        pagination={{
          current: page,
          pageSize: pageCount,
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
