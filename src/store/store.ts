import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { mainReducer } from './main-reducer'
import { authReducer } from './auth-reducer'
import { appReducer } from './app-reducer'
const rootReducer = combineReducers({
  main: mainReducer,
  auth: authReducer,
  app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppRootStateType = ReturnType<typeof rootReducer>
