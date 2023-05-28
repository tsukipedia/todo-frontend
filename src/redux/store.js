import { configureStore } from '@reduxjs/toolkit'
import { toDoApi } from './slices/ApiSlice'

export default configureStore({
  reducer: {
    [toDoApi.reducerPath]: toDoApi.reducer
  },
});