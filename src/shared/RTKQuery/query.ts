import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:44390/api/',
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        //headers.set('Authorization', 'Basic Y2xpZW50OnNlY3JldA==')
        return headers;
    },
})