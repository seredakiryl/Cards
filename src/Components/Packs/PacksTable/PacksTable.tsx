import path from 'path'

import React from 'react'

import { Spin, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useNavigate } from 'react-router-dom'

import { Path } from '../../../Common/Navigate/Path'
import { setCardsPackIdAC } from '../../../Store/cards-reducer'
import { setPacksPageAC, setPageCountAC } from '../../../Store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../Store/store'

import { ActionPacks } from './ActionPacks/ActionPacks'
import s from './PacksTable.module.css'
import { SortPacks } from './SortPacks/SortPacks'

type DataType = {
  name: string
  cardsCount: number
  lastUpdated: string
  userName: string
}

type PropsType = {
  pageCount: number
  page: number
  isFetching: boolean
}
export const PacksTable = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const totalCountPacks = useAppSelector(state => state.packs.cardPacksTotalCount)
  const userId = useAppSelector(state => state.packs.queryParams.user_id)
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
      title: 'User name',
      dataIndex: 'userName',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ]

  let data = packs.map(p => {
    return {
      key: p._id,
      pack_id: p._id,
      name: p.name.slice(0, 20),
      cardsCount: p.cardsCount,
      lastUpdated: p.updated.slice(0, 10),
      userName: p.user_name,
      actions: (
        <ActionPacks
          packId={p._id}
          name={p.name}
          userId={userId}
          creatorUserId={p.user_id}
          private={p.private}
        />
      ),
    }
  })
  const onClickPack = (record: any) => {
    dispatch(setCardsPackIdAC(record.pack_id))
    navigate(Path.CARDS)
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        size="large"
        loading={props.isFetching}
        onRow={record => {
          return {
            onClick: () => onClickPack(record),
          }
        }}
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
