import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/RTKQuery/query'
import { Procedure } from '../types/Procedure'

export const ProcedureApi = createApi({
    reducerPath: 'Procedures',
    baseQuery: baseQuery,
    tagTypes: ['Procedures'],
    endpoints: (builder) => ({
        fetchAllProcedures: builder.query<Procedure[], void>({
            query: () => ({
                url: 'Procedures'
            }),
            providesTags: ['Procedures']
        })
    })
})

export const { useFetchAllProceduresQuery } = ProcedureApi;