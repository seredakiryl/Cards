import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './BackArrow.module.css'

export const BackArrow = () => {
  const navigate = useNavigate()

  const navigateToLogin = () => {
    navigate('/')
  }
  return (
    <div className={s.wrapper}>
      <div className={s.arrowBlock} onClick={navigateToLogin}>
        <div className={s.arrow}></div>
        <div className={s.text} onClick={navigateToLogin}>
          Back to Packs List
        </div>
      </div>
    </div>
  )
}
