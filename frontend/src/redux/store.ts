import { configureStore } from '@reduxjs/toolkit'
import { AuthorizationApi } from './AuthorizationApi' 
import setAuthSlice from './setAuth-slice'

export const store = configureStore({
    reducer: {
        [AuthorizationApi.reducerPath]: AuthorizationApi.reducer,
        setAuth: setAuthSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthorizationApi.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch