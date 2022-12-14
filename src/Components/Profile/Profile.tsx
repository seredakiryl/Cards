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
  let { isLoggedIn, email, isFetching, avatar } = useAppSelector(state => state.auth)

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
    <div className={s.wrapper}>
      <BackArrow url={'/packs'} />
      <div className={s.content}>
        <Title text={'Personal Information'} />
        <Avatar avatar={avatar} />
        <EditableSpan />
        <span className={s.mail}>{email}</span>
        <ButtonLogOut />
      </div>
    </div>
  )
}
