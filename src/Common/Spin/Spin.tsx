import { Spin } from 'antd/es'

export const Spiner = () => {
  return (
    <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
      <Spin size="large" />
    </div>
  )
}
