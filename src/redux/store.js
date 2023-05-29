import { configureStore } from '@reduxjs/toolkit'
import { toDoApi } from './slices/ApiSlice'
import dialogReducer from './slices/DialogSlice'
import queryParamsReducer from './slices/ToDosQueryParamsSlice';

export default configureStore({
  reducer: {
    dialog: dialogReducer,
    toDoQueryParams: queryParamsReducer,
    [toDoApi.reducerPath]: toDoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(toDoApi.middleware),
});