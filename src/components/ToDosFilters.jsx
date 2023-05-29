import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useGetAllToDosQuery } from '../redux/slices/ApiSlice';
import { setName, setPriority, setDone, setSortBy } from '../redux/slices/ToDosQueryParamsSlice';

export function ToDosFilters() {
  const [nameFilter, setNameFilter] = React.useState('')
  const [priorityFilter, setPriorityFilter] = React.useState('')
  const [state, setState] = React.useState('')
  
  const queryParams = useSelector((state) => { return state.toDoQueryParams })
  const dispatch = useDispatch()
  const { refetch } = useGetAllToDosQuery(queryParams)
  
  React.useEffect(() => {
    refetch();
  }, [queryParams, refetch]);

  const handleSearch = () => {
    if (queryParams.sortBy) dispatch(setSortBy(null))
    if (nameFilter) dispatch(setName(nameFilter))
    if (priorityFilter && priorityFilter !== 'All') dispatch(setPriority(priorityFilter))
    const isDone = state === 'Done' ? true : state === 'Undone' ? false : undefined
    dispatch(setDone(isDone))
  }

  return (
    <Paper sx={{ marginBottom: "24px", padding: "24px" }}>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          value={nameFilter}
          variant="outlined"
          placeholder='Name'
          onChange={(event) => {
            setNameFilter(event.target.value)
          }}
          sx={{ marginBottom: "24px" }}
        />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel id="priority-select-label">Priority</InputLabel>
        <Select
          labelId="priority-select-label"
          id="priority-select-helper"
          value={priorityFilter}
          label="Priority"
          onChange={(event) => {
            setPriorityFilter(event.target.value)
          }}
          renderValue={(selected) => {
            if (selected === "") {
              return <em>Priority</em>;
            }

            return selected;
          }}
          sx={{ minWidth: "240px", marginBottom: "24px" }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel id="state-select-label">State</InputLabel>
        <Select
          labelId="state-select-label"
          id="state-select-helper"
          value={state}
          label="state"
          onChange={(event) => {
            setState(event.target.value)
          }}
          renderValue={(selected) => {
            if (selected === "") {
              return <em>State</em>;
            }

            return selected;
          }}
          sx={{ minWidth: "240px", marginBottom: "24px" }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
          <MenuItem value="Undone">Undone</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ float: "right", marginRight: "24px" }}>
        <Button onClick={handleSearch} variant='outlined'>Search</Button>
      </Box>
    </Paper>
  )
}