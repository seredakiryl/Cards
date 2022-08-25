import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Alert, Input, message } from 'antd'
import { Button, Radio } from 'antd'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { authAPI } from '../../../api/auth-api'
import { setAppErrorAC } from '../../../store/app-reducer'
import { setIsLoggedInAC } from '../../../store/auth-reducer'
import { AppRootStateType, useAppSelector } from '../../../store/store'
import s from './Login.module.css'

export type FormikErrorType = {
  email?: string
  password?: string
  checkbox?: boolean
}

export const Login = (props: any): JSX.Element => {
  const isLoggedIn = useAppSelector((state: AppRootStateType) => state.auth.isLoggedIn)

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      checkbox: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'enter password'
      } else if (values.password.length < 3) {
        errors.password = 'The password must contain at least 6 symbols.'
      }
      return errors
    },
    onSubmit: (values) => {
      authAPI
        .login(values)
        .then((res) => {
          dispatch(setIsLoggedInAC(true))
        })
        .catch((res) => {
          dispatch(setAppErrorAC(res.message))
        })
    },
  })

  if (isLoggedIn) {
    return <Navigate to="/Profile" />
  }
  const navigate = useNavigate()
  const RedirectToRegistration = () => {
    navigate('/registration')
  }
  const navigateToForrgotPassword = () => {
    navigate('/ForgotPassword')
  }

  return (
    <div className={s.wrapper}>
      <div>
        <form className={s.loginContainer} onSubmit={formik.handleSubmit}>
          <h3 className={s.title}>Sign in</h3>
          <label htmlFor={'email'} className={s.label}>
            Email
          </label>
          <Input
            id={'email'}
            placeholder="Your Email"
            type="email"
            size="middle"
            bordered={false}
            className={s.input}
            {...formik.getFieldProps('email')}
          />
          <div className={s.strip}></div>
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          ) : null}
          <label htmlFor={'password'} className={s.label}>
            Password
          </label>
          <Input.Password
            id={'password'}
            placeholder="Your Password"
            size="middle"
            type="password"
            bordered={false}
            className={s.input}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            {...formik.getFieldProps('password')}
          />
          <div className={s.strip}></div>
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}
          <div className={s.checkbox}>
            <Checkbox checked={formik.values.checkbox} {...formik.getFieldProps('checkbox')}>
              Remember me
            </Checkbox>
          </div>
          <a className={s.forgotPassword} onClick={navigateToForrgotPassword}>
            Forgot Password?
          </a>
          <Button type="primary" htmlType="submit" shape="round" className={s.Button}>
            Sign in
          </Button>
          <span className={s.newAccount}>Already have an account?</span>
          <a onClick={RedirectToRegistration} className={s.signUp}>
            Sign Up
          </a>
        </form>
      </div>
    </div>
  )
}
