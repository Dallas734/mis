import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/RTKQuery/query'
import { Patient } from '../types/Patient'

export const PatientApi = createApi({
    reducerPath: 'Patients',
    baseQuery: baseQuery,
    tagTypes: ['Patient'],
    endpoints: (builder) => ({
        fetchAllPatients: builder.query<Patient[], void>({
            query: () => ({
                url: 'Patients'
            }),
            providesTags: ['Patient']
        })
    })
})

export const { useFetchAllPatientsQuery } = PatientApi;