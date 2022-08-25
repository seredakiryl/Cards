import s from './Header.module.css'

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.logo}></div>
      <div className={s.userBlock}>
        <div className={s.userName}>Name</div>
        <div className={s.userAva}></div>
      </div>
    </div>
  )
}
