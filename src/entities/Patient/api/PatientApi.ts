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
        }),
        deletePatient: builder.mutation<void, number | undefined>({
            query: (id) => ({
                url: `Patients/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Patient']
        }),
        createPatient: builder.mutation<Patient, Patient>({
            query: (patient) => ({
                url: 'Patients',
                method: 'POST',
                body: patient
            }),
            invalidatesTags: ['Patient']
        }),
        updatePatient: builder.mutation<Patient, Patient>({
            query: (patient) => ({
                url: `Patients/${patient.id}`,
                method: 'PUT',
                body: patient
            }),
            invalidatesTags: ['Patient']
        })
    })
})

export const { useFetchAllPatientsQuery } = PatientApi;
export const { useUpdatePatientMutation } = PatientApi;
export const { useDeletePatientMutation } = PatientApi;
export const { useCreatePatientMutation } = PatientApi;