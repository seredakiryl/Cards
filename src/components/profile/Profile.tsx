import { ButtonLogOut } from './ButtonLogOut/ButtonLogOut'
import s from './profile.module.css'
import { Title } from './Title/Title'
import { Avatar } from './Avatar/Avatar'
import { EditableSpan } from './EditableSpan/EditableSpan'
import { BackArrow } from '../BackArrow/BackArrow'

import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../store/store'
import { Navigate } from 'react-router-dom'

export const Profile = () => {
  let isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
  if (!isLoggedIn) {
    ;<Navigate to={'/login'} />
  }
  return (
    <div>
      <BackArrow />
      <div className={s.wrapper}>
        <Title text={'Personal Information'} />
        <Avatar />
        <EditableSpan />
        <div>
          <div>test git</div>

          <span className={s.mail}>your-email@gmail.com</span>
        </div>
        <ButtonLogOut />
      </div>
    </div>
  )
}
