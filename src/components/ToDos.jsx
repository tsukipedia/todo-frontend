import React, { useEffect } from 'react'
import { useGetAllToDosQuery } from '../redux/slices/ApiSlice'
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import TableSortLabel from '@mui/material/TableSortLabel';
import { stableSort, getComparator } from "../utils/sort-utils";
import { visuallyHidden } from '@mui/utils';
import { Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useCheckToDoMutation } from '../redux/slices/ApiSlice';
import { useGetCountQuery } from '../redux/slices/ApiSlice';

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

export const ToDos = () => {
  return (
    <EnhancedTable />
  )
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('dueDate');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [lastFetchedIndex, setLastFetchedIndex] = React.useState(-1)
  const [visibleRows, setVisibleRows] = React.useState([])
  const [dueDateSort, setDueDateSort] = React.useState(false)
  const [prioritySort, setPrioritySort] = React.useState(false)
  const [sortBy, setSortBy] = React.useState(null);
  const [hasUserSorted, setHasUserSorted] = React.useState(false);

  const { data: list, isLoading, isFetching, refetch } = useGetAllToDosQuery({ pageSize: rowsPerPage, lastFetchedIndex: lastFetchedIndex, sortBy: sortBy })
  const [checkToDo] = useCheckToDoMutation();
  const { data: count } = useGetCountQuery();

  const handleClick = (event, id) => {
    event.stopPropagation();
    checkToDo(id).then(() => refetch());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const index = newPage * rowsPerPage;
    setLastFetchedIndex(index);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDueDateSort = (event) => {
    if (event.target.checked) {
      setDueDateSort(true);
      setPrioritySort(false);
      setSortBy('due date');
      setOrderBy('due date')
    }
    else {
      setDueDateSort(false)
      setSortBy(null)
    }
  }

  const handleChangePrioritySort = (event) => {
    if (event.target.checked) {
      setDueDateSort(false);
      setPrioritySort(true);
      setSortBy('priority');
      setOrderBy('priority')
    }
    else {
      setPrioritySort(false)
      setSortBy(null)
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setHasUserSorted(true);
  };

  useEffect(() => {
    if (hasUserSorted) {
      setVisibleRows(
        stableSort(list ?? [], getComparator(order, orderBy))
      )
    } else {
      setVisibleRows(list ?? []);
    }
  }, [isLoading, list, page, rowsPerPage, hasUserSorted, order, orderBy])

  if (isLoading) return (<h3>Loading...</h3>)

  return (
    <Box sx={{ width: '100%' }}>
      <FormControlLabel
        control={<Switch checked={dueDateSort} onChange={handleChangeDueDateSort} />}
        label="Sort all by due date"
      />
      <FormControlLabel
        control={<Switch checked={prioritySort} onChange={handleChangePrioritySort} />}
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
              rowCount={list?.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
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
                    <TableCell>Edit/Delete</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{
            className: "brand-icon",
            disabled: isFetching
          }}
        />
      </Paper>
    </Box>
  );
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (

              <TableSortLabel
                active={orderBy === headCell.id}
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
