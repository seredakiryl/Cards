import { Spin } from 'antd'
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
  let email = useAppSelector(state => state.auth.email)
  let isFetching = useAppSelector(state => state.auth.isFetching)

  if (isLoggedIn === false) {
    return <Navigate to="/" />
  }

  if (isFetching) {
    return (
      <div className={s.spin}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div>
      <BackArrow url={'/packs'} />
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
