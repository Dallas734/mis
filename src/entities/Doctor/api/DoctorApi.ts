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
        }),
        deleteDoctor: builder.mutation<void, number | undefined>({
            query: (id) => ({
                url: `Doctors/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Doctor']
        }),
        createDoctor: builder.mutation<Doctor, Doctor>({
            query: (doctor) => ({
                url: 'Doctors',
                method: 'POST',
                body: doctor
            }),
            invalidatesTags: ['Doctor']
        }),
        updateDoctor: builder.mutation<Doctor, Doctor>({
            query: (doctor) => ({
                url: `Doctors/${doctor.id}`,
                method: 'PUT',
                body: doctor
            }),
            invalidatesTags: ['Doctor']
        })
    })
})

export const { useFetchAllDoctorsQuery } = DoctorApi;