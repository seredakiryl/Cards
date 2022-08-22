import { Button } from 'antd'

export const Registration = () => {
  return (
    <div>
      <div>Sign Up</div>
      <div>
        <input type="email" />
      </div>
      <div>
        <input type="password" />
      </div>
      <div>
        <input type="password" />
      </div>
      <div>
        <Button type="primary" shape="round" size={'large'}>
          Sing up
        </Button>
      </div>
      <div>
        <Button type="dashed">Already have an account?</Button>
      </div>
      <div>
        <Button type="link">Sign in</Button>
      </div>
    </div>
  )
}
