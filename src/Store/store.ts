import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'
import { cardsReducer } from './cards-reducer'
import { packsReducer } from './packs-reducer'
const rootReducer = combineReducers({
  packs: packsReducer,
  auth: authReducer,
  app: appReducer,
  cards: cardsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>
