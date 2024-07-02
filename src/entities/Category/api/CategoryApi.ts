import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../shared/RTKQuery/query'
import { Category } from '../types/Category'

export const CategoryApi = createApi({
    reducerPath: 'Categories',
    baseQuery: baseQuery,
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        fetchAllCategories: builder.query<Category[], void>({
            query: () => ({
                url: 'Categories'
            }),
            providesTags: ['Category']
        })
    })
})

export const { useFetchAllCategoriesQuery } = CategoryApi;