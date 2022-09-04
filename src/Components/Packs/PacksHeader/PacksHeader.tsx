import React, { ChangeEvent, useState } from 'react'

import { CustomModal } from '../../../Common/CustomModal/CustomModal'
import { addNewPack } from '../../../Store/packs-reducer'
import { useAppDispatch } from '../../../Store/store'
import { Title } from '../../Profile/Title/Title'

import s from './PacksHeader.module.css'

export const PacksHeader = () => {
  const dispatch = useAppDispatch()

  const addNewPackHandler = () => {
    dispatch(addNewPack({ cardsPack: { name: packName, private: isPrivate } }))
  }
  const [packName, setPackName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }
  const setPrivatePack = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.currentTarget.checked)
  }

  return (
    <div className={s.wrapper}>
      <Title text={'Packs list'} />
      <CustomModal
        buttonName={'Add new pack'}
        onCallback={addNewPackHandler}
        packName={packName}
        isPrivate={isPrivate}
      >
        <div className={s.modalInner}>
          <div className={s.modalInputBlock}>
            <span>Name pack</span>
            <input type="text" onChange={onHandleChange} className={s.modalInput} placeholder={'Yor new pack name here'} autoFocus />
          </div>
          <div className={s.modalCheckbox}>
            <input type="checkbox" onChange={setPrivatePack} />
            <span className={s.modalCheckboxText}>Private pack</span>
          </div>
        </div>
      </CustomModal>
    </div>
  )
}
