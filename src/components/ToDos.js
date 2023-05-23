import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchToDos } from '../redux/slices/ToDoSlice'

export const ToDos = () => {
  const list = useSelector(state => state.todoList)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchToDos())
  }, [dispatch])

  return (
    <div>
      {list.loading && <h2>Loading...</h2>}
      {!list.loading && list.error ? <h2>Error: {list.error}</h2> : null}
      {!list.loading && list.todos.length ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Is done</th>
              <th scope="col">Content</th>
              <th scope="col">Priority</th>
              <th scope="col">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {list.todos.map(toDo => (
                <tr key={toDo.id}>
                  <th scope="row"><input className='form-check-input' type='checkbox' id='flexCheckbox' checked={toDo.done} onChange /></th>
                  <th scope="row">{toDo.content}</th>
                  <th scope="row">{toDo.priority}</th>
                  <th scope="row">{toDo.dueDate}</th>
                </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  )
}
