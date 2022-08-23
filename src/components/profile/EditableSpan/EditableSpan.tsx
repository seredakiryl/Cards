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
      dispatch(setNewNameTC(name))
      setIsEdit(!isEdit)
    }
  }
  const onClickHandler = () => {
    dispatch(setNewNameTC(name))
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={s.icon}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.3449 0.958172C11.1228 0.858708 11.9097 1.17678 12.7093 1.92915L12.7102 1.93002C13.5125 2.68875 13.8778 3.45841 13.823 4.24233C13.77 4.99983 13.3309 5.64097 12.8301 6.17001M12.8301 6.17001L7.35951 11.9605C7.20529 12.1284 6.99762 12.2706 6.80076 12.3759C6.60137 12.4825 6.37072 12.5738 6.1542 12.6122L6.15087 12.6128L4.00497 12.9794C3.48459 13.0691 2.98559 12.939 2.63012 12.6019C2.27515 12.2653 2.11829 11.7744 2.1764 11.2514L2.17657 11.2499L2.42431 9.08054C2.45308 8.86474 2.53323 8.63122 2.6277 8.42864C2.72183 8.22679 2.85027 8.01276 3.00226 7.85096L3.00323 7.84993L8.47656 2.05659C8.97759 1.52734 9.59328 1.05429 10.3449 0.958172M9.20312 2.7437C9.20303 2.74379 9.2032 2.74362 9.20312 2.7437L3.7311 8.53564C3.73099 8.53576 3.73122 8.53552 3.7311 8.53564C3.67646 8.59395 3.60139 8.70678 3.53399 8.85129C3.46782 8.99319 3.42807 9.12446 3.41616 9.20884L3.17029 11.3618C3.17026 11.3621 3.17024 11.3623 3.17021 11.3625C3.14187 11.6192 3.22163 11.7847 3.31824 11.8763C3.41444 11.9676 3.5821 12.0375 3.83506 11.9939L3.83583 11.9938L5.98057 11.6274C6.06408 11.6123 6.19276 11.567 6.32927 11.494C6.46765 11.42 6.57176 11.3402 6.62387 11.2831L6.62984 11.2765L12.1032 5.48326C12.549 5.01236 12.7967 4.58326 12.8254 4.1726C12.8523 3.78829 12.6943 3.29146 12.0237 2.6571C11.3568 2.02977 10.8539 1.90123 10.4718 1.95009C10.0635 2.0023 9.64866 2.27312 9.20312 2.7437Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.84971 2.87261C8.12256 2.8301 8.37821 3.01683 8.42072 3.28968C8.67213 4.90342 9.98182 6.1385 11.6101 6.3025C11.8849 6.33017 12.0852 6.57534 12.0575 6.85009C12.0298 7.12484 11.7847 7.32514 11.5099 7.29746C9.43154 7.08813 7.75455 5.50987 7.43264 3.44362C7.39013 3.17077 7.57686 2.91512 7.84971 2.87261Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.5 14.6666C1.5 14.3905 1.72386 14.1666 2 14.1666H14C14.2761 14.1666 14.5 14.3905 14.5 14.6666C14.5 14.9428 14.2761 15.1666 14 15.1666H2C1.72386 15.1666 1.5 14.9428 1.5 14.6666Z"
              fill="black"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
