import { configureStore } from '@reduxjs/toolkit'
import toDoReducer from './slices/ToDoSlice'

export default configureStore({
  reducer: {
    todoList: toDoReducer
  },
});