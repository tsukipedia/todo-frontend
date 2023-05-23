import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  todos: [],
  error: ''
}

export const fetchToDos = createAsyncThunk('todo/fetchList', () => {
  return fetch('todo').then(function (response) { return response.json() })
})

const toDoSlice = createSlice({
  name: 'todo',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchToDos.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchToDos.fulfilled, (state, action) => {
      state.loading = false
      state.todos = action.payload
      state.error = ''
    })
    builder.addCase(fetchToDos.rejected, (state, action) => {
      state.loading = false
      state.todos = []
      state.error = action.error.message
    })
  },
})

export default toDoSlice.reducer