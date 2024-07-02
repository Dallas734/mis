import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/RTKQuery/query'
import { Doctor } from '../types/Doctor'

export const DoctorApi = createApi({
    reducerPath: 'Doctors',
    baseQuery: baseQuery,
    tagTypes: ['Doctor'],
    endpoints: (builder) => ({
        fetchAllDoctors: builder.query<Doctor[], void>({
            query: () => ({
                url: 'Doctors'
            }),
            providesTags: ['Doctor']
        })
    })
})

export const { useFetchAllDoctorsQuery } = DoctorApi;