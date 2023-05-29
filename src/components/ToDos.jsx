import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';

import { getComparator, stableSort } from "../utils/sort-utils";
import { useCheckToDoMutation, useGetAllToDosQuery, useDeleteToDoMutation } from '../redux/slices/ApiSlice';
import { changeDialogState, setDialogToDo, setDialogType } from '../redux/slices/DialogSlice';
import { setPageSize, setLastFetchedIndex, setSortBy, resetFilters } from '../redux/slices/ToDosQueryParamsSlice';

const headCells = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'priority',
    label: 'Priority',
    sortable: true
  },
  {
    id: 'dueDate',
    label: 'Due Date',
    sortable: true
  },
  {
    id: 'action',
    label: 'Action',
  },
];

export function ToDos() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('dueDate');
  const [page, setPage] = React.useState(0);
  const [visibleRows, setVisibleRows] = React.useState([])
  const [dueDateSort, setDueDateSort] = React.useState(false)
  const [prioritySort, setPrioritySort] = React.useState(false)
  const [hasUserSorted, setHasUserSorted] = React.useState(false);

  const queryParams = useSelector((state) => { return state.toDoQueryParams })
  const { data: todos, isLoading } = useGetAllToDosQuery(queryParams)
  const [checkToDo] = useCheckToDoMutation();
  const [deleteToDo] = useDeleteToDoMutation();
  const dispatch = useDispatch()

  const handleCheck = (event, id) => {
    event.stopPropagation();
    checkToDo(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const index = newPage * queryParams.pageSize - 1;
    dispatch(setLastFetchedIndex(index))
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setPageSize(parseInt(event.target.value)))
    setPage(0);
  };

  const handleDueDateSortSwitch = (event) => {
    if (event.target.checked) {
      setDueDateSort(true);
      setPrioritySort(false);
      dispatch(resetFilters())
      dispatch(setSortBy('due date'))
      setOrderBy('due date')
    }
    else {
      setDueDateSort(false)
      dispatch(setSortBy(null))
    }
  }

  const handlePrioritySortSwitch = (event) => {
    if (event.target.checked) {
      setDueDateSort(false);
      setPrioritySort(true);
      dispatch(resetFilters())
      dispatch(setSortBy('priority'))
      setOrderBy('priority')
    }
    else {
      setPrioritySort(false)
      dispatch(setSortBy(null))
    }
  }

  const handleEditAction = (event, toDo) => {
    event.stopPropagation();
    dispatch(changeDialogState())
    dispatch(setDialogType('edit'))
    dispatch(setDialogToDo(toDo))
  }

  const handleDeleteAction = (event, id) => {
    event.stopPropagation();
    deleteToDo(id)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setHasUserSorted(true);
  };

  const handleNewToDo = () => {
    dispatch(changeDialogState())
    dispatch(setDialogType('add'))
  }

  useEffect(() => {
    if (hasUserSorted) {
      setVisibleRows(
        stableSort(todos?.list ?? [], getComparator(order, orderBy))
      )
    } else {
      setVisibleRows(todos?.list ?? []);
    }
  }, [isLoading, todos, page, queryParams, hasUserSorted, order, orderBy])

  if (isLoading) return (<h3>Loading...</h3>)

  return (
    <Box sx={{ width: '100%' }} mb={5}>
      <Button
        fullWidth
        className='mb-4 mt-2'
        onClick={() => handleNewToDo()}
        variant='outlined'>
        + new to do
      </Button>
      <FormControlLabel
        control={<Switch checked={dueDateSort && !!queryParams.sortBy} onChange={handleDueDateSortSwitch} />}
        label="Sort all by due date"
      />
      <FormControlLabel
        control={<Switch checked={prioritySort && !!queryParams.sortBy} onChange={handlePrioritySortSwitch} />}
        label="Sort all by priority"
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={todos.list?.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleCheck(event, row.id)}
                    role="checkbox"
                    aria-checked={row.done}
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={row.done}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.content}</TableCell>
                    <TableCell>{row.priority}</TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                    <TableCell>
                      <Button onClick={(event) => handleEditAction(event, row)}>Edit</Button>
                      <Button onClick={(event) => handleDeleteAction(event, row.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={isLoading ? 0 : todos.totalToDos}
          rowsPerPage={queryParams.pageSize}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={true}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography>
                {headCell.label}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
