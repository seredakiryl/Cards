import React, { ChangeEvent, useState } from 'react'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'

import { deleteCardTC, editCardQuestionOrAnswerTC } from '../../../../../Store/cards-reducer'
import { useAppDispatch } from '../../../../../Store/store'

type PropsType = {
  cardID: string
  userID: string
  answer: string
  question: string
}

export const ActionCards = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isQuestion, setQuestion] = useState(props.question)
  const [isAnswer, setAnswer] = useState(props.answer)

  console.log(props.cardID)
  const handleEditOk = () => {
    setIsEditModalVisible(false)
    console.log('press ok')
    dispatch(editCardQuestionOrAnswerTC(props.cardID, isQuestion, isAnswer))
  }
  const showEditModal = () => {
    setIsEditModalVisible(true)
  }
  const handleCancel = () => {
    setIsEditModalVisible(false)
  }
  const onHandleChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }
  const onHandleChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }
  const showDeleteModal = () => {
    setIsDeleteModalVisible(true)
  }
  const handleEditDelete = () => {
    setIsDeleteModalVisible(false)
    console.log('deleteCardTC' + props.cardID)
    dispatch(deleteCardTC(props.cardID))
    // dispatch(editCardQuestionOrAnswerTC(props.cardID, isQuestion, isAnswer))
  }
  const handleСancellationDelete = () => {
    setIsDeleteModalVisible(false)
  }

  return (
    <div>
      <Tooltip title="edit">
        <Button
          type="primary"
          shape="circle"
          onClick={showEditModal}
          icon={<EditOutlined style={{ fontSize: '18px', padding: '4px' }} />}
        />
      </Tooltip>
      <Modal
        title="Edit card"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleCancel}
      >
        <div>
          <div>
            <span>Question</span>
            <input
              type="text"
              onChange={onHandleChangeQuestion}
              placeholder={props.question}
              value={isQuestion}
              autoFocus
            />
          </div>
          <div>
            <span>Answer</span>
            <input
              type="text"
              onChange={onHandleChangeAnswer}
              placeholder={props.answer}
              value={isAnswer}
              autoFocus
            />
          </div>
        </div>
      </Modal>
      <Tooltip title="delete">
        <Button
          type="primary"
          shape="circle"
          onClick={showDeleteModal}
          icon={<DeleteOutlined style={{ fontSize: '18px', padding: '4px' }} />}
        />
      </Tooltip>
      <Modal
        title="Delete card"
        visible={isDeleteModalVisible}
        onOk={handleEditDelete}
        onCancel={handleСancellationDelete}
      >
        <span>Do you really want to remove Card? Cards will be deleted.</span>
      </Modal>
    </div>
  )
}
