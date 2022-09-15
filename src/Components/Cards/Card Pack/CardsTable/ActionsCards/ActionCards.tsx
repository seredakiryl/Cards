import React, { ChangeEvent, useState } from 'react'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'

import { editCardQuestionOrAnswer } from '../../../../../Store/cards-reducer'
import { useAppDispatch } from '../../../../../Store/store'

type PropsType = {
  cardID: string
  udserID: string
  answer: string
  question: string
}
export const ActionCards = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isQuestion, setQuestion] = useState(props.question)
  const [isAnswer, setAnswer] = useState(props.answer)

  const handleEditOk = () => {
    setIsEditModalVisible(false)

    dispatch(editCardQuestionOrAnswer(props.cardID, isQuestion, isAnswer))
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
          onClick={() => {
            alert('пока заглушка)')
          }}
          icon={<DeleteOutlined style={{ fontSize: '18px', padding: '4px' }} />}
        />
      </Tooltip>
    </div>
  )
}
