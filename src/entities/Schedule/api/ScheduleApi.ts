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
        }),
        updateSchedule: builder.mutation<void, Schedule[] | undefined>({
            query: (schedules) => ({
                url: 'Shedules',
                method: 'PUT',
                body: schedules
            }),
            invalidatesTags: ['Schedules']
        })
    })
})

export const { useFetchAllSchedulesQuery } = ScheduleApi;
export const { useUpdateScheduleMutation } = ScheduleApi;