import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/RTKQuery/query'
import { Area } from '../types/Area'

export const AreaApi = createApi({
    reducerPath: 'Areas',
    baseQuery: baseQuery,
    tagTypes: ['Area'],
    endpoints: (builder) => ({
        fetchAllAreas: builder.query<Area[], void>({
            query: () => ({
                url: 'Areas'
            }),
            providesTags: ['Area']
        })
    })
})

export const { useFetchAllAreasQuery } = AreaApi;