import {Button, Modal} from 'antd'
import { BackArrow } from '../../../BackArrow/BackArrow'
import {Title} from "../../../Profile/Title/Title";
import React, {ChangeEvent, useState} from "react";
import s from './HeaderCards.module.css'

type PropsType = {
  cardsPackId: string
}
export const HeaderCards = (props: PropsType) => {

    const [isAddCardModalVisible, setAddCardModalVisible] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const showAddCardModal = () => {
        setAddCardModalVisible(true)
    }

    const handleAddCardOk = () => {
        setAddCardModalVisible(false)

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
            <Title text={'Name Pack'} />
            <div>
                <Button type="primary" onClick={showAddCardModal}>Add new card</Button>
                <Modal
                    title="Add new card"
                    visible={isAddCardModalVisible}
                    onOk={handleAddCardOk}
                    onCancel={handleCancel}
                >
                    <input type={'text'} onChange={onSetCardQuestionHandler} placeholder={'enter new question'}></input>
                    <input type={'text'} onChange={onSetCardAnswerHandler} placeholder={'enter the answer'}></input>
                </Modal>
            </div>
        </div>
    </div>
  )
}
