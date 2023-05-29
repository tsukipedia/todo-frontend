import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dialogType: 'edit',
  isOpen: false,
  toDo: null
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    changeDialogState(state) {
      state.isOpen = !(state.isOpen)
    },
    setDialogType(state, action) {
      state.dialogType = action.payload
    },
    setDialogToDo(state, action) {
      state.toDo = action.payload
    },
  },
})

export const { changeDialogState, setDialogType, setDialogToDo } = dialogSlice.actions
export default dialogSlice.reducer
