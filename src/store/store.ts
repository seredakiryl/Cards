import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export type AppRootStateType = ReturnType<typeof rootReducer>;
