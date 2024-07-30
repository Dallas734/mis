import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/RTKQuery/query'
import { Diagnosis } from '../types/Diagnosis'

export const DiagnosisApi = createApi({
    reducerPath: 'Diagnoses',
    baseQuery: baseQuery,
    tagTypes: ['Diagnoses'],
    endpoints: (builder) => ({
        fetchAllDiagnoses: builder.query<Diagnosis[], void>({
            query: () => ({
                url: 'Diagnoses'
            }),
            providesTags: ['Diagnoses']
        })
    })
})

export const { useFetchAllDiagnosesQuery } = DiagnosisApi;