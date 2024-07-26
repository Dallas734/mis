import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/RTKQuery/query'
import { Day } from '../types/Day'

export const DayApi = createApi({
    reducerPath: 'Days',
    baseQuery: baseQuery,
    tagTypes: ['Days'],
    endpoints: (builder) => ({
        fetchAllDays: builder.query<Day[], void>({
            query: () => ({
                url: 'Days'
            }),
            providesTags: ['Days']
        })
    })
})

export const { useFetchAllDaysQuery } = DayApi;