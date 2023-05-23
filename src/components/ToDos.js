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
        <ul className='list-group mb-4'>
          {list.todos.map(toDo => (
            <li key={toDo.id} className='list-group-item'>
              <div className='form-check'>
                <input className='form-check-input' type='checkbox' id='flexCheckbox' value='' />
                <label className='form-check-label' htmlFor='flexCheckbox'>
                  {toDo.content}
                </label>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
