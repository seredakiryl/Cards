import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Input } from 'antd'
import { Button } from 'antd'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { useFormik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'
import { loginTC } from '../../../Store/auth-reducer'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../../../Store/store'
import s from './Login.module.css'

export type FormikLoginType = {
  email?: string
  password?: string
  checkbox?: boolean
}

export const Login = (props: any): JSX.Element => {
  const isLoggedIn = useAppSelector((state: AppRootStateType) => state.auth.isLoggedIn)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      checkbox: false,
    },
    validate: (values) => {
      const errors: FormikLoginType = {}
      switch (true) {
        case !values.email: {
          errors.email = 'Required'
          break
        }
        case !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email): {
          errors.email = 'Invalid email address'
          break
        }
        case !values.password: {
          errors.password = 'enter password'
          break
        }
        case values.password.length < 5: {
          errors.password = 'The password must contain at least 5 symbols.'
          break
        }
      }
      return errors
    },
    onSubmit: (values) => {
      dispatch(loginTC(values))
      navigate('/Profile')
    },
  })

  if (isLoggedIn) {
    return <Navigate to="/Profile" />
  }

  const RedirectToRegistration = () => {
    navigate('/Registration')
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
