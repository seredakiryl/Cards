import React, {ChangeEvent, useState} from 'react'

import { Button } from 'antd'

import { packsAPI } from '../../../Api/packs-api'
import { Title } from '../../Profile/Title/Title'
import { CustomModal } from "../../../Common/CustomModal/CustomModal";

import s from './PacksHeader.module.css';


export const PacksHeader = () => {
    const [packName, setPackName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
  const addNewPackHandler = (packName: string, isPrivate: boolean) => {
    packsAPI.addPack({ cardsPack: { name: packName, private: isPrivate } })
  }
  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
  }
  const setPrivatePack = (e: ChangeEvent<HTMLInputElement>) => {
      setIsPrivate(e.currentTarget.checked)
  }
  return (
    <div className={s.wrapper}>
      <Title text={'Packs list'} />
      <CustomModal buttonName={'Add new pack'} onCallback={addNewPackHandler} packName={packName} isPrivate={isPrivate}>
        <input type="text" onChange={onHandleChange} />
        <input type="checkbox" onChange={setPrivatePack}/>
      </CustomModal>
    </div>
  )
}
