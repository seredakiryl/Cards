import s from './Header.module.css'
import { Avatar } from '../profile/Avatar/Avatar'
import { useAppSelector } from '../../store/store'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const name = useAppSelector((state) => state.auth.name)
  const navigate = useNavigate()
  const navigateToRegistration = () => {
    navigate('/Registration')
  }

  return (
    <div className={s.wrapper}>
      <div className={s.logo}></div>
      {isLoggedIn ? (
        <div className={s.userBlock}>
          <div className={s.userName}>{name}</div>
          <div className={s.userAva}></div>
        </div>
      ) : (
        <Button
          onClick={navigateToRegistration}
          type="primary"
          htmlType="submit"
          shape="round"
          className={s.Button}
        >
          Sign in
        </Button>
      )}
    </div>
  )
}
