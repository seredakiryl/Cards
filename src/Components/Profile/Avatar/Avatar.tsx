// eslint-disable-next-line import/no-unresolved
import Statham from '../../../Assets/Images/Statham.png'

import s from './Avatar.module.css'
type PropsType = {
  avatar?: string
  className?: any
}
export const Avatar = (props: PropsType) => {
  return <img src={props.avatar || Statham} className={props.className || s.avatar}></img>
}
