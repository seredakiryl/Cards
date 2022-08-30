import React from 'react'

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

import { setNewPasswordTC } from '../../../Store/auth-reducer'
import { useAppDispatch } from '../../../Store/store'
import { Title } from '../../Profile/Title/Title'
import s from '../CreateNewPassword/CreateNewPassword.module.css'

export type FormikCreateNewPasswordType = {
  password?: string
  token?: string
}

export const CreateNewPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const param = useParams()

  const formik: any = useFormik({
    initialValues: {
      password: '',
      token: param.token,
    },
    validate: values => {
      const errors: FormikCreateNewPasswordType = {}

      if (!values.password) {
        errors.password = 'enter password'
      } else if (values.password.length < 3) {
        errors.password = 'The password must contain at least 6 symbols.'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(setNewPasswordTC(values.password, values.token))
      navigate('/')
    },
  })

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <Title text={'Create new password'} />
          <Input.Password
            id={'password'}
            placeholder="Password"
            size="middle"
            type="password"
            bordered={false}
            className={s.input}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            {...formik.getFieldProps('password')}
          />
          <div className={s.strip}></div>
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}

          <div className={s.text}>
            Create new password and we will send you further instructions to email
          </div>
          <Button type="primary" htmlType="submit" shape="round" className={s.Button}>
            Create new password
          </Button>
        </form>
      </div>
    </div>
  )
}
