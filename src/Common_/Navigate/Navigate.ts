import { useNavigate } from 'react-router-dom'

export const redirect = (url: string) => {
  const navigate = useNavigate()
  navigate(url)
}
