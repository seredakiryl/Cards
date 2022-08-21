import React from 'react'
import s from './BackArrow.module.css'

export const BackArrow = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.arrowBlock}>
        <div className={s.arrow}></div>
        <div className={s.text}>Back to Packs List</div>
      </div>
    </div>
  )
}
