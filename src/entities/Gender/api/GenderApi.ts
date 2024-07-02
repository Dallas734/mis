import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/RTKQuery/query'
import { Gender } from '../types/Gender'

export const GenderApi = createApi({
    reducerPath: 'Genders',
    baseQuery: baseQuery,
    tagTypes: ['Gender'],
    endpoints: (builder) => ({
        fetchAllGenders: builder.query<Gender[], void>({
            query: () => ({
                url: 'Genders'
            }),
            providesTags: ['Gender']
        })
    })
})

export const { useFetchAllGendersQuery } = GenderApi;