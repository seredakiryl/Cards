import React, { useState, KeyboardEvent, ChangeEvent } from 'react'
import s from './editableSpan.module.css'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { setNewNameTC } from '../../../store/auth-reducer'

export const EditableSpan = () => {
  let [isEdit, setIsEdit] = useState<boolean>(false)
  const initialName = useAppSelector((state) => state.auth.name)
  let [name, setName] = useState(initialName)
  const dispatch = useAppDispatch()

  const onDoubleClickHandler = () => {
    setIsEdit(!isEdit)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }
  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setNewNameTC(name, ''))
      setIsEdit(!isEdit)
    }
  }
  const onClickHandler = () => {
    dispatch(setNewNameTC(name, ''))
    setIsEdit(!isEdit)
  }

  return (
    <div>
      {isEdit ? (
        <div className={s.inputBlock}>
          <input
            className={s.input}
            type={'text'}
            onKeyPress={onEnterHandler}
            onChange={onChangeHandler}
            autoFocus
          />
          <button className={s.button} onClick={onClickHandler}>
            SAVE
          </button>
        </div>
      ) : (
        <div className={s.wrapper} onDoubleClick={onDoubleClickHandler}>
          <span>{name}</span>
          <span className={s.icon}></span>
        </div>
      )}
    </div>
  )
}
