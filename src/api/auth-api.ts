import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})

export const authAPI = {
  login(model: LoginModelType) {
    return instance.post('/auth/login', { ...model, rememberMe: model.checkbox })
  },
  registration(model: RegistrationModelType) {
    return instance.post('/auth/register', model)
  },
  me() {
    return instance.post<MeType>('/auth/me')
  },
  logout() {
    return instance.delete('/auth/me')
  },
  forgotPassword(model: any) {
    return instance.post('/auth/forgot', model)
  },
  newPassword(model: any) {
    return instance.post('/auth/set-new-password', model)
  },
  changeName(name: string, avatar: string) {
    return instance.put<ChangeNameResponseType>('/auth/me', { name, avatar })
  },
}

type LoginModelType = {
  email: string
  password: string
  checkbox: boolean
}

type RegistrationModelType = {
  email: string
  password: string
}

type ChangeNameResponseType = {
  updatedUser: MeType
  error?: string
}
type MeType = {
  _id: string
  email: string
  name: string
  avatar: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}
