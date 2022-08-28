import { Result } from 'antd'
import { Button } from 'antd/lib/radio'

export const Error404 = () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    </>
  )
}
