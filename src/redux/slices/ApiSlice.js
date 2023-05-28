import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const toDoApi = createApi({
  reducerPath: "toDoApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9090/' }),
  endpoints: (builder) => ({
    getAllToDos: builder.query({
      query: (params) => {
        let endpoint = `todo?pageSize=${params.pageSize}&lastFetchedIndex=${params.lastFetchedIndex}`
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
      }
    }),
    getMetrics: builder.query({
      query: () => `todo/metrics`
    }),
    getCount: builder.query({
      query: () => `todo/count`
    }),
    checkToDo: builder.mutation({
      query: (id) => ({
        url: `todo/check/${id}`,
        method: 'PATCH',
      }),
    }),
    editToDo: builder.mutation({
      query: (id, ...newValues) => ({
        url: `todo/${id}`,
        method: 'PATCH',
        body: newValues
      }),
    }),
  })
})

export const { useGetAllToDosQuery, useGetCountQuery, useGetMetricsQuery, useCheckToDoMutation, useEditToDoMutation  } = toDoApi
