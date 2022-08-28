import { FormikLoginType } from '../components/auth/login/Login'
import { instance } from './baseInstance'

export const authAPI = {
  login(model: FormikLoginType) {
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
  forgotPassword(model: ForgotPasswordModelType) {
    return instance.post<ForgotPasswordResponseType>('/auth/forgot', model)
  },
  newPassword(model: NewPasswordModelType) {
    return instance.post<NewPasswordResponseType>('/auth/set-new-password', model)
  },
  changeName(name: string, avatar: string) {
    return instance.put<ChangeNameResponseType>('/auth/me', { name, avatar })
  },
}

type NewPasswordModelType = {
  password: string
  resetPasswordToken?: string
}
type NewPasswordResponseType = {
  info: string
  error?: string
}
type ForgotPasswordModelType = {
  email: string
  from: string
  message: string
}
type ForgotPasswordResponseType = {
  info: string
  error: string
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
