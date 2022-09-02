import { CaretDownOutlined } from '@ant-design/icons'

import { setSortPackstAC } from '../../../../Store/packs-reducer'
import { useAppDispatch } from '../../../../Store/store'

export const SortPacks = () => {
  const dispatch = useAppDispatch()

  return (
    <div>
      Last Updated
      <CaretDownOutlined
        onClick={() => {
          dispatch(setSortPackstAC('1updated'))
        }}
      />
    </div>
  )
}
