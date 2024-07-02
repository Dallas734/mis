import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/RTKQuery/query'
import { Specialization } from '../types/Specialization'

export const SpecializationApi = createApi({
    reducerPath: 'Specializations',
    baseQuery: baseQuery,
    tagTypes: ['Specialization'],
    endpoints: (builder) => ({
        fetchAllSpecializations: builder.query<Specialization[], void>({
            query: () => ({
                url: 'Specializations'
            }),
            providesTags: ['Specialization']
        })
    })
})

export const { useFetchAllSpecializationsQuery } = SpecializationApi;