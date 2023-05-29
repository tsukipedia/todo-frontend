import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { changeDialogState } from '../redux/slices/DialogSlice';
import { useEditToDoMutation } from '../redux/slices/ApiSlice';
import { MenuItem } from '@mui/material';

export function ToDoFormDialog() {
  const [content, setContent] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');

  const dialog = useSelector((state) => { return state.dialog })
  const dispatch = useDispatch()
  const [editToDo] = useEditToDoMutation();

  React.useEffect(() => {
    if (dialog.isOpen && dialog.dialogType === 'edit') {
      setContent(dialog.toDo?.content)
      setPriority(dialog.toDo?.priority)
      setDueDate(dialog.toDo?.dueDate)
    }
  }, [dialog]);

  const handleClose = () => {
    setContent('')
    setPriority('')
    setDueDate('')
    dispatch(changeDialogState())
  };

  const handleSubmit = () => {
    if (dialog.dialogType === 'edit') {
      editToDo({
        id: dialog.toDo.id,
        body: {
          content: content,
          dueDate: dueDate,
          priority: priority
        }
      })
    }
    handleClose()
  }

  return (
    <Dialog open={dialog.isOpen} onClose={handleClose}>
      <DialogTitle className='text-primary mt-4'>{dialog.dialogType.toUpperCase()} TO DO</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Content"
          type="text"
          fullWidth
          variant="standard"
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <TextField
          select
          autoFocus
          mb={12}
          margin="dense"
          id="priority"
          label="Priority"
          type="text"
          fullWidth
          variant="standard"
          required
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <MenuItem value='LOW'>Low</MenuItem>
          <MenuItem value='MEDIUM'>Medium</MenuItem>
          <MenuItem value='HIGH'>High</MenuItem>
        </TextField>
        <TextField
          type="datetime-local"
          autoFocus
          margin="dense"
          id="dueDate"
          label="Due Date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          variant="standard"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}