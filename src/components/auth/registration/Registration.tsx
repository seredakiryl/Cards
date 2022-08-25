import React from 'react'
import s from './Regisration.module.css'
import { Input } from 'antd'
import { useFormik } from 'formik'
import { authAPI } from '../../../api/auth-api'
import { setAppErrorAC } from '../../../store/app-reducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

export type FormikRegistrationType = {
  email?: string
  password?: string
  confirm_password?: string
}

export const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rederectToLogin = () => {
    navigate('/Login')
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    validate: (values) => {
      const errors: FormikRegistrationType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        console.log('validate', values)
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 5) {
        errors.password = 'Must be 15 characters or less'
      } else if (values.password !== values.confirm_password) {
        errors.password = 'password and confirm password have must be the same'
      }

      if (!values.confirm_password) {
        errors.confirm_password = 'Required'
      } else if (values.password.length < 5) {
        errors.confirm_password = 'Must be 15 characters or less'
      }
      return errors
    },

    onSubmit: (values) => {
      authAPI
        .registration({ email: values.email, password: values.password })
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
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}
          {/*вот этот допустим отработает, а вот ниже нет или наоборот*/}
          <div className={s.headerConfirmPassword}>Confirm password</div>
          <Input.Password
            className={s.inputConfirmPassword}
            type="confirm_password"
            {...formik.getFieldProps('confirm_password')}
          />
          {formik.touched.confirm_password && formik.errors.confirm_password && (
            <div style={{ color: 'red' }}>{formik.errors.confirm_password}</div>
          )}
          {/*а это не отработает, а вот ниже нет или наоборот, а хочется чтобы каждое поле обрабатывалось*/}

          {/*{formik.values.password === formik.values.confirm_password ? (*/}
          {/*  <div>It`s work</div>*/}
          {/*) : (*/}
          {/*  <div>It`s work</div>*/}
          {/*)}*/}
          {/*это кусок тестовый, что так можно!!!
           */}

          <Button
            disabled={formik.touched.password && formik.errors.password ? true : false}
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
          <Button type="link" className={s.buttonSingIn} onClick={rederectToLogin}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}
