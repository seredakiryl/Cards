import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Input } from 'antd'
import { Button, Radio } from 'antd'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import s from './Login.module.css'

export const Login = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.loginContainer}>
        <h3 className={s.title}>Sign in</h3>
        <label className={s.label}>Email</label>
        <Input placeholder="Your Email" size="middle" className={s.input} bordered={false} />
        <span className={s.strip}></span>
        <label className={s.label}>Password</label>
        <Input.Password
          placeholder="Your Password"
          size="middle"
          bordered={false}
          className={s.input}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
        <span className={s.strip}></span>
        <Checkbox className={s.checkbox}>Remember me</Checkbox>
        <a className={s.forgotPassword}>Forgot Password?</a>
        <Button type="primary" shape="round" className={s.Button}>
          Sign in
        </Button>
        <a className={s.newAccount}>Already have an account?</a>
        <a className={s.signUp}>Sign Up</a>
      </div>
    </div>
  )
}
