import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/RTKQuery/query'
import { Schedule } from '../types/Schedule'

export const ScheduleApi = createApi({
    reducerPath: 'Schedule',
    baseQuery: baseQuery,
    tagTypes: ['Schedules'],
    endpoints: (builder) => ({
        fetchAllSchedules: builder.query<Schedule[], string | undefined>({
            query: (id) => ({
                url: `Shedules/?doctorId=${id}`
            }),
            providesTags: ['Schedules']
        })
    })
})

export const { useFetchAllSchedulesQuery } = ScheduleApi;