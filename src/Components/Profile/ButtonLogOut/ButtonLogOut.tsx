import { logOutTC } from '../../../Store/auth-reducer'
import { useAppDispatch } from '../../../Store/store'

import s from './ButtonLogOut.module.css'

export const ButtonLogOut = () => {
  const dispatch = useAppDispatch()
  const onClickHandler = () => {
    dispatch(logOutTC())
  }

  return (
    <button className={s.wrapper} onClick={onClickHandler}>
      <span className={s.logo}></span>
      Log out
    </button>
  )
}
