import { configureStore } from '@reduxjs/toolkit'
import { toDoApi } from './slices/ApiSlice'
import dialogReducer from './slices/DialogSlice'

export default configureStore({
  reducer: {
    dialog: dialogReducer,
    [toDoApi.reducerPath]: toDoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(toDoApi.middleware),
});