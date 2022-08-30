import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../Store/store'
import { BackArrow } from '../BackArrow/BackArrow'

import { Avatar } from './Avatar/Avatar'
import { ButtonLogOut } from './ButtonLogOut/ButtonLogOut'
import { EditableSpan } from './EditableSpan/EditableSpan'

import { Title } from './Title/Title'
import s from './Profile.module.css'

export const Profile = () => {
  let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  let email = useAppSelector((state) => state.auth.email)
  if (isLoggedIn === false) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <BackArrow url={'/registration'} />
      <div className={s.wrapper}>
        <Title text={'Personal Information'} />
        <Avatar />
        <EditableSpan />
        <div>
          <span className={s.mail}>{email}</span>
        </div>
        <ButtonLogOut />
      </div>
    </div>
  )
}
