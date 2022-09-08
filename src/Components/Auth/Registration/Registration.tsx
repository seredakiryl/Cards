import { Button, Input } from 'antd'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { Path } from '../../../Common/Navigate/Path'
import { registrationTC } from '../../../Store/auth-reducer'
import { useAppDispatch } from '../../../Store/store'

import s from './Regisration.module.css'

export type FormikRegistrationType = {
  email?: string
  password?: string
  confirm_password?: string
}

export const Registration = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const rederectToLogin = () => {
    navigate(Path.LOGIN)
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    validate: values => {
      const errors: FormikRegistrationType = {}

      switch (true) {
        case !values.email:
          return {
            ...errors,
            email: 'Required',
          }
        /* 2 вариант - переписываем значение ошибки и делаем брейк, возвращаем в конце ошибку
         errors.email = 'Required'
         break
         */
        case !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email):
          return {
            ...errors,
            email: 'Invalid email address',
          }
        case !values.password:
          return {
            ...errors,
            password: 'Required',
          }
        case values.password.length < 5:
          return {
            ...errors,
            password: 'password must be at least 5 characters long',
          }
        case !values.confirm_password:
          return {
            ...errors,
            confirm_password: 'Required',
          }
        case values.confirm_password !== values.password:
          return {
            ...errors,
            confirm_password: 'password and confirm password have must be the same',
          }
        default:
          return errors
      }
    },

    onSubmit: values => {
      dispatch(registrationTC(values.email, values.password))
    },
  })

  return (
    <div className={s.wrapper}>
      <form onSubmit={formik.handleSubmit} className={s.container}>
        <h3 className={s.headerSignUp}>Sign Up</h3>
        <label htmlFor={'email'} className={s.label}>
          Email
        </label>
        <Input
          id={'email'}
          type="email"
          bordered={false}
          size="middle"
          className={s.input}
          {...formik.getFieldProps('email')}
        />
        <div className={s.strip}></div>
        {formik.touched.email && formik.errors.email && (
          <div className={s.errorStyle}>{formik.errors.email}</div>
        )}
        <label htmlFor={'password'} className={s.label}>
          Password
        </label>
        <Input.Password
          id={'password'}
          className={s.input}
          bordered={false}
          size="middle"
          type="password"
          {...formik.getFieldProps('password')}
        />
        <div className={s.strip}></div>
        {formik.touched.password && formik.errors.password && (
          <div className={s.errorStyle}>{formik.errors.password}</div>
        )}

        <label htmlFor={'confirmPassword'} className={s.label}>
          Confirm password
        </label>
        <Input.Password
          id={'confirmPassword'}
          className={s.input}
          type="confirm_password"
          bordered={false}
          size="middle"
          {...formik.getFieldProps('confirm_password')}
        />
        <div className={s.strip}></div>
        {formik.touched.confirm_password && formik.errors.confirm_password && (
          <div className={s.errorStyle}>{formik.errors.confirm_password}</div>
        )}

        <Button
          disabled={!!(formik.touched.password && formik.errors.password)}
          htmlType="submit"
          type="primary"
          shape="round"
          size={'middle'}
          className={s.buttonSingUp}
        >
          Sing up
        </Button>

        <span className={s.buttonHaveAccaunt}>Already have an account?</span>
        <a onClick={rederectToLogin} className={s.singIn}>
          Sign in
        </a>
      </form>
    </div>
  )
}
