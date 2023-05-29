import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const toDoApi = createApi({
  reducerPath: "toDoApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9090/' }),
  tagTypes: ['getToDos', 'metrics'],
  endpoints: (builder) => ({
    getAllToDos: builder.query({
      query: (params) => {
        let endpoint = `todo`
        if (params.name || params.priority || params.isDone !== undefined) {
          endpoint += `/filter`
        }
        endpoint += `?pageSize=${params.pageSize}&lastFetchedIndex=${params.lastFetchedIndex}`
        if (params.sortBy) {
          endpoint += `&sortBy=${params.sortBy}`;
        }
        if (params.name) {
          endpoint += `&name=${params.name}`;
        }
        if (params.priority) {
          endpoint += `&priority=${params.priority}`;
        }
        if (params.isDone !== undefined) {
          endpoint += `&isDone=${params.isDone}`;
        }
        return endpoint
      },
      providesTags: ['getToDos']
    }),
    getMetrics: builder.query({
      query: () => `todo/metrics`,
      providesTags: ['metrics']
    }),
    checkToDo: builder.mutation({
      query: (id) => ({
        url: `todo/check/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['getToDos', 'metrics'],
    }),
    addToDo: builder.mutation({
      query: (todo) => ({
        url: `todo`,
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['getToDos'],
    }),
    editToDo: builder.mutation({
      query: (editEntity) => ({
        url: `todo/${editEntity.id}`,
        method: 'PATCH',
        body: editEntity.body
      }),
      invalidatesTags: ['getToDos'],
    }),
    deleteToDo: builder.mutation({
      query: (id) => ({
        url: `todo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getToDos', 'metrics'],
    })
  })
})

export const { useGetAllToDosQuery,
  useGetMetricsQuery, useCheckToDoMutation, 
  useEditToDoMutation, useDeleteToDoMutation, 
  useAddToDoMutation } = toDoApi
