import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pageSize: 5,
  lastFetchedIndex: -1,
  sortBy: undefined,
  name: undefined,
  priority: undefined,
  isDone: undefined
}

const toDosQueryParamsSlice = createSlice({
  name: 'toDosQueryParams',
  initialState,
  reducers: {
    setPageSize(state, action) {
      state.pageSize = action.payload
    },
    setLastFetchedIndex(state, action) {
      state.lastFetchedIndex = action.payload
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
    setName(state, action) {
      state.name = action.payload
    },
    setPriority(state, action) {
      state.priority = action.payload
    },
    setDone(state, action) {
      state.isDone = action.payload
    },
    resetFilters(state) {
      state.name = undefined
      state.priority = undefined
      state.isDone = undefined
    }
  }
})

export const { setPageSize, setLastFetchedIndex, 
  setSortBy, setName, setPriority, setDone, resetFilters } = toDosQueryParamsSlice.actions
export default toDosQueryParamsSlice.reducer
