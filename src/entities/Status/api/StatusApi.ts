import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/RTKQuery/query'
import { Status } from '../types/Status'

export const StatusApi = createApi({
    reducerPath: 'Statuses',
    baseQuery: baseQuery,
    tagTypes: ['Status'],
    endpoints: (builder) => ({
        fetchAllStatuses: builder.query<Status[], void>({
            query: () => ({
                url: 'Statuses'
            }),
            providesTags: ['Status']
        })
    })
})

export const { useFetchAllStatusesQuery } = StatusApi;