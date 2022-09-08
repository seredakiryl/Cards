import { Result } from 'antd'
import { Button } from 'antd/lib/radio'
import { useNavigate } from 'react-router-dom'

import { Path } from '../../Common/Navigate/Path'

export const Error404 = () => {
  const navigate = useNavigate()
  const onClickHandler = () => navigate(Path.PROFILE)

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={onClickHandler}>
            Back Home
          </Button>
        }
      />
    </>
  )
}
