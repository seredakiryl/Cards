import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

export const ActionCards = () => {
  return (
    <div>
      <Tooltip title="edit">
        <Button
          type="primary"
          shape="circle"
          onClick={() => {}}
          icon={<EditOutlined style={{ fontSize: '18px', padding: '4px' }} />}
        />
      </Tooltip>
      <Tooltip title="delete">
        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined style={{ fontSize: '18px', padding: '4px' }} />}
        />
      </Tooltip>
    </div>
  )
}
