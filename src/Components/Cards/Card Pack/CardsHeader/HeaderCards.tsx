import {Button, Modal} from 'antd'
import { BackArrow } from '../../../BackArrow/BackArrow'
import {Title} from "../../../Profile/Title/Title";
import React, {useState} from "react";
import s from './HeaderCards.module.css'

type PropsType = {
  cardsPackId: string
}
export const HeaderCards = (props: PropsType) => {

    const [isAddCardModalVisible, setAddCardModalVisible] = useState(false)

    const showAddCardModal = () => {
        setAddCardModalVisible(true)
    }

    const handleAddCardOk = () => {
        setAddCardModalVisible(false)

    }
    const handleCancel = () => {
        setAddCardModalVisible(false)
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
                </Modal>
            </div>
        </div>
    </div>
  )
}
