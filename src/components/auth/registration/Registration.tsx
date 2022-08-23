import React from 'react'
import { Button } from 'antd'
import s from './Regisration.module.css'
import { Input } from 'antd'
import { useFormik } from 'formik'
import { authAPI } from '../../../api/auth-api'
import { setAppErrorAC } from '../../../store/app-reducer'
import { useDispatch } from 'react-redux'
import { FormikErrorType } from '../login/Login'

export const Registration = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        console.log('validate', values)
        errors.email = 'Invalid email address'
      }

      if (values.password !== values.confirm_password) {
        errors.password = '!!!!'
      }
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
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          )}

          <div className={s.headerPassword}>Password</div>
          <Input.Password
            className={s.inputPassword}
            type="password"
            {...formik.getFieldProps('password')}
          />
          <div className={s.headerConfirmPassword}>Confirm password</div>
          <Input.Password
            className={s.inputConfirmPassword}
            type="confirm_password"
            {...formik.getFieldProps('confirm_password')}
          />
          {formik.touched.email && formik.errors.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}

          <Button
            disabled={true}
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
