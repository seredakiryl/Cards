import { BookOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { deletePackTC, editPackNameTC } from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'

type PropsType = {
  packId: string
  name: string
}

export const ActionsPacks = (props: PropsType) => {
  const dispatch = useAppDispatch()

  //   const getPackCards = () => {
  //     dispatch(PackCards())
  //     navigate('/PackCards')
  //   }

  return (
    <div>
      <BookOutlined
        style={{ fontSize: '18px', padding: '4px' }}
        onClick={() => {
          console.log('tratata')
        }}
      />
      <EditOutlined
        style={{ fontSize: '18px', padding: '4px' }}
        onClick={() => {
          dispatch(editPackNameTC(props.packId, `${props.name}+1`))
        }}
      />
      <DeleteOutlined
        style={{ fontSize: '18px', padding: '4px' }}
        onClick={() => {
          dispatch(deletePackTC(props.packId))
        }}
      />
    </div>
  )
}
