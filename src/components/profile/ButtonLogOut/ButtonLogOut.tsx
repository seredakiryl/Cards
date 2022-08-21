import s from './buttonLogOut.module.css'

const logout = require('./../../../assets/icons/logout.png')

export const ButtonLogOut = () => {
  return (
    <div className={s.wrapper}>
      <div>
        <img src={logout} alt="logout" />
      </div>
      <button className={s.button}>Log out</button>
    </div>
  )
}
