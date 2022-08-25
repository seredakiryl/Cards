import s from './buttonLogOut.module.css'
import { useAppDispatch } from '../../../store/store'
import { logOutTC } from '../../../store/auth-reducer'

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
