import React from 'react'
import { Button } from 'antd'
import s from './Regisration.module.css'
import { Input } from 'antd'
import { useFormik } from 'formik'
import { authAPI } from '../../../api/auth-api'
import { setAppErrorAC } from '../../../store/app-reducer'
import { useDispatch } from 'react-redux'

export const Registration = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      authAPI
        .registration(values)
        .then((res) => console.log(res))
        .catch((res) => dispatch(setAppErrorAC(res.message)))
    },
  })
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <form onSubmit={formik.handleSubmit}>
          <div className={s.headerSignUp}>Sign Up</div>
          <div className={s.headerEmail}>Email</div>
          <input type="email" className={s.inputEmail} {...formik.getFieldProps('email')} />
          <div className={s.headerPassword}>Password</div>
          <Input.Password
            className={s.inputPassword}
            type="password"
            {...formik.getFieldProps('password')}
          />
          <div className={s.headerConfirmPassword}>Confirm password</div>
          <Input.Password className={s.inputConfirmPassword} />
          <Button
            htmlType="submit"
            type="primary"
            shape="round"
            size={'large'}
            className={s.buttonSingUp}
          >
            Sing up
          </Button>
          <Button type="link" className={s.buttonHaveAccaunt}>
            Already have an account?
          </Button>
          <Button type="link" className={s.buttonSingIn}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}
