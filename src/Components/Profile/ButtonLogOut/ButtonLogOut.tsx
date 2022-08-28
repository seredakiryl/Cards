import s from './ButtonLogOut.module.css'
import { useAppDispatch } from '../../../Store/store'
import { logOutTC } from '../../../Store/auth-reducer'

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
