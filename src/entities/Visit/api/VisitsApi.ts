import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../shared/RTKQuery/query";
import { Visit } from "../types/Visit";
import dayjs from "dayjs";

interface TalonsArgs {
  doctorId: string | undefined;
  date: dayjs.Dayjs | null;
}

export const VisitsApi = createApi({
  reducerPath: "Visits",
  baseQuery: baseQuery,
  tagTypes: ["Visits"],
  endpoints: (builder) => ({
    getTalons: builder.query<Visit[], TalonsArgs>({
      query: (args) => {
        const { doctorId, date } = args;
        return {
          url: `Visits/Talons?doctorId=${doctorId}&date=${date?.format(
            "YYYY-MM-DD"
          )}`,
        };
      },
      providesTags: ["Visits"]
    }),
    deleteVisit: builder.mutation<void, number | undefined>({
      query: (id) => ({
        url: `Visits/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Visits"],
    }),
    createVisit: builder.mutation<Visit, Visit>({
      query: (visit) => ({
        url: "Visits",
        method: "POST",
        body: visit,
      }),
      invalidatesTags: ["Visits"],
    }),
    completeVisit: builder.mutation<Visit, Visit>({
      query: (visit) => ({
        url: `Visits/completeVisit/${visit.id}`,
        method: "PUT",
        body: visit,
      }),
      invalidatesTags: ["Visits"],
    }),
  }),
});

export const { useGetTalonsQuery } = VisitsApi;
export const { useDeleteVisitMutation } = VisitsApi;
export const { useCreateVisitMutation } = VisitsApi;
export const { useCompleteVisitMutation } = VisitsApi;
