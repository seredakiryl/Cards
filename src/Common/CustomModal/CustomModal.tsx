import { Button, Modal} from 'antd';
import React, { ReactNode, useState} from 'react';

type CustomModalType = {
    onCallback: (packName: string, isPrivate: boolean) => void
    buttonName: string
    children: ReactNode
    packName: string
    isPrivate: boolean
}
export const CustomModal = (props: CustomModalType) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        props.onCallback(props.packName, props.isPrivate)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {props.buttonName}
            </Button>
            <Modal title="Add new pack" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {props.children}
            </Modal>
        </>
    );
};
