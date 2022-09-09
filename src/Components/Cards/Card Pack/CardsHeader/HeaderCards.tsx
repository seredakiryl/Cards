import React, { ChangeEvent, useState } from 'react'

import { Button, Modal } from 'antd'

import { addNewCardTC } from '../../../../Store/cards-reducer'
import { useAppDispatch } from '../../../../Store/store'
import { BackArrow } from '../../../BackArrow/BackArrow'
import { Title } from '../../../Profile/Title/Title'

import s from './HeaderCards.module.css'

type PropsType = {
  cardsPackId: string
  packName: string | null
}
export const HeaderCards = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const [isAddCardModalVisible, setAddCardModalVisible] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const showAddCardModal = () => {
    setAddCardModalVisible(true)
  }
  const handleAddCardOk = () => {
    setAddCardModalVisible(false)
    dispatch(
      addNewCardTC({
        cardsPack_id: props.cardsPackId,
        question: question,
        answer: answer,
        grade: 0,
        shots: 0,
        answerImg: '',
        questionImg: '',
        questionVideo: '',
        answerVideo: '',
      })
    )
  }
  const handleCancel = () => {
    setAddCardModalVisible(false)
  }
  const onSetCardQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }
  const onSetCardAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }

  return (
    <div className={s.wrapper}>
      <BackArrow url={'/packs'} />
      <div className={s.inner}>
        <Title text={props.packName} />
        <div>
          <Button type="primary" onClick={showAddCardModal}>
            Add new card
          </Button>
          <Modal
            title="Add new card"
            visible={isAddCardModalVisible}
            onOk={handleAddCardOk}
            onCancel={handleCancel}
          >
            <div>
              <input
                type={'text'}
                onChange={onSetCardQuestionHandler}
                placeholder={'enter new question'}
                value={question}
              ></input>
              <input
                type={'text'}
                onChange={onSetCardAnswerHandler}
                placeholder={'enter the answer'}
                value={answer}
              ></input>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}
