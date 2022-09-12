import React, { ChangeEvent, MouseEvent, SyntheticEvent, useState } from 'react'

import { BookOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'

import { Path } from '../../../../Common/Navigate/Path'
import { setCardsPackIdAC } from '../../../../Store/cards-reducer'
import { deletePackTC, editPackNameTC } from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'
import s from '../../PacksHeader/PacksHeader.module.css'

type PropsType = {
  packId: string
  name: string
  userId: string
  creatorUserId: string
  private: boolean
}

export const ActionPacks = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  const showEditModal = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setIsEditModalVisible(true)
  }
  const showDeleteModal = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setIsDeleteModalVisible(true)
  }

  const handleEditOk = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setIsEditModalVisible(false)
    dispatch(editPackNameTC(props.packId, packName, isPrivate))
  }
  const handleDeleteOk = (e: SyntheticEvent) => {
    e.stopPropagation()

    setIsDeleteModalVisible(false)
    dispatch(deletePackTC(props.packId))
  }
  const handleCancel = () => {
    setIsEditModalVisible(false)
    setIsDeleteModalVisible(false)
  }
  const [packName, setPackName] = useState(props.name)
  const [isPrivate, setIsPrivate] = useState<boolean>(props.private)

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }
  const setPrivatePack = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.currentTarget.checked)
  }
  const learnCards = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    navigate(Path.LEARN_CARDS)
    dispatch(setCardsPackIdAC(props.packId))
  }

  const test = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  return (
    <div>
      <Tooltip title="learn">
        <Button
          type="primary"
          shape="circle"
          icon={<BookOutlined style={{ fontSize: '18px', padding: '4px' }} />}
          onClick={e => learnCards(e)}
        />
      </Tooltip>
      {props.userId == props.creatorUserId && (
        <Tooltip title="edit">
          <Button
            type="primary"
            shape="circle"
            onClick={e => showEditModal(e)}
            icon={<EditOutlined style={{ fontSize: '18px', padding: '4px' }} />}
          />

          <Modal
            z-index={10}
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
                  value={packName}
                  autoFocus
                />
              </div>
              <div className={s.modalCheckbox}>
                <input type="checkbox" onChange={setPrivatePack} checked={isPrivate} />
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
            onClick={e => showDeleteModal(e)}
            icon={<DeleteOutlined style={{ fontSize: '18px', padding: '4px' }} />}
          />
          <Modal
            title="Delete pack"
            visible={isDeleteModalVisible}
            onOk={e => handleDeleteOk(e)}
            onCancel={handleCancel}
          >
            <span>Do you really want to remove Pack Name? All cards will be deleted.</span>
          </Modal>
        </Tooltip>
      )}
    </div>
  )
}
