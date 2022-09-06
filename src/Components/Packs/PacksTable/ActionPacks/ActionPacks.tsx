import React, { ChangeEvent, useState } from 'react'

import { BookOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'

import { setCardsPackIdAC } from '../../../../Store/cards-reducer'
import { deletePackTC, editPackNameTC } from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'
import { Cards } from '../../../Cards/Cards'
import s from '../../PacksHeader/PacksHeader.module.css'

type PropsType = {
  packId: string
  name: string
  userId: string
  creatorUserId: string
}

export const ActionPacks = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  const showEditModal = () => {
    setIsEditModalVisible(true)
  }
  const showDeleteModal = () => {
    setIsDeleteModalVisible(true)
  }

  const handleEditOk = () => {
    setIsEditModalVisible(false)
    dispatch(editPackNameTC(props.packId, packName))
  }
  const handleDeleteOk = () => {
    setIsDeleteModalVisible(false)
    dispatch(deletePackTC(props.packId))
  }
  const handleCancel = () => {
    setIsEditModalVisible(false)
    setIsDeleteModalVisible(false)
  }
  const [packName, setPackName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }
  const setPrivatePack = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.currentTarget.checked)
  }
  const getCards = () => {
    navigate('/cards')
    dispatch(setCardsPackIdAC(props.packId))
  }

  return (
    <div>
      <Tooltip title="learn">
        <Button
          type="primary"
          shape="circle"
          icon={<BookOutlined style={{ fontSize: '18px', padding: '4px' }} />}
          onClick={getCards}
        />
      </Tooltip>
      {props.userId == props.creatorUserId && (
        <Tooltip title="edit">
          <Button
            type="primary"
            shape="circle"
            onClick={showEditModal}
            icon={<EditOutlined style={{ fontSize: '18px', padding: '4px' }} />}
          />
          <Modal
            title="Edit pack"
            visible={isEditModalVisible}
            onOk={handleEditOk}
            onCancel={handleCancel}
          >
            <div className={s.modalInner}>
              <div className={s.modalInputBlock}>
                <span>Name pack</span>
                <input
                  type="text"
                  onChange={onHandleChange}
                  className={s.modalInput}
                  placeholder={props.name}
                  autoFocus
                />
              </div>
              <div className={s.modalCheckbox}>
                <input type="checkbox" onChange={setPrivatePack} />
                <span className={s.modalCheckboxText}>Private pack</span>
              </div>
            </div>
          </Modal>
        </Tooltip>
      )}
      {props.userId == props.creatorUserId && (
        <Tooltip title="delete">
          <Button
            type="primary"
            shape="circle"
            onClick={showDeleteModal}
            icon={<DeleteOutlined style={{ fontSize: '18px', padding: '4px' }} />}
          />
          <Modal
            title="Delete pack"
            visible={isDeleteModalVisible}
            onOk={handleDeleteOk}
            onCancel={handleCancel}
          >
            <span>Do you really want to remove Pack Name? All cards will be deleted.</span>
          </Modal>
        </Tooltip>
      )}
    </div>
  )
}
