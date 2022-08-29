import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../Store/store'
import { BackArrow } from '../BackArrow/BackArrow'

import { Avatar } from './Avatar/Avatar'
import { ButtonLogOut } from './ButtonLogOut/ButtonLogOut'
import { EditableSpan } from './EditableSpan/EditableSpan'
import s from './Profile.module.css'
import { Title } from './Title/Title'

export const Profile = () => {
  let isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (isLoggedIn === false) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <BackArrow />
      <div className={s.wrapper}>
        <Title text={'Personal Information'} />
        <Avatar />
        <EditableSpan />
        <div>
          <span className={s.mail}>your-email@gmail.com</span>
        </div>
        <ButtonLogOut />
      </div>
    </div>
  )
}
