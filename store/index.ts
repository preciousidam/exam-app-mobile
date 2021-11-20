import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import appReducer from "./app";
import { subApi } from "./subscription/api";
import { authApi } from "./auth/api";
import reducers from './reducers';

const reducer = combineReducers({
	...reducers,
	[subApi.reducerPath]: subApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	auth: authReducer,
	app: appReducer,
})

export const store = configureStore({
	reducer: reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
	.concat(subApi.middleware)
	.concat(authApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;