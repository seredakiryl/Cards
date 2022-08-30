import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './BackArrow.module.css'
type PropsType = {
  url: string
}
export const BackArrow = (props: PropsType) => {
  const navigate = useNavigate()

  const navigateToLogin = () => {
    navigate(props.url)
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
