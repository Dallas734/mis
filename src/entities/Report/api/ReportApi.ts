import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../shared/RTKQuery/query";
import { WorkloadAreaReport } from "../types/WorkloadAreaReport";
import dayjs from "dayjs";

interface WorkloadAreaReportArgs {
  beginDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
}

export const ReportApi = createApi({
  reducerPath: "Reports",
  baseQuery: baseQuery,
  tagTypes: ["Reports"],
  endpoints: (builder) => ({
    makeWorkloadAreaReport: builder.query<
      WorkloadAreaReport[],
      WorkloadAreaReportArgs
    >({
      query: (args) => {
        const { beginDate, endDate } = args;
        return {
          url: `Reports/WorkLoadAreaReport?begin=${beginDate?.format(
            "YYYY-MM-DD"
          )}&end=${endDate?.format("YYYY-MM-DD")}`,
        };
      },
      providesTags: ["Reports"]
    }),
  }),
});
