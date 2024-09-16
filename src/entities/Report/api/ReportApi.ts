import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../shared/RTKQuery/query";
import { WorkloadAreaReport } from "../types/WorkloadAreaReport";
import dayjs from "dayjs";
import { WorkloadDoctorReport } from "../types/WorkloadDoctorReport";
import { WorkloadDiagnosisReport } from "../types/WorkloadDiagnosisReport";

interface WorkloadAreaReportArgs {
  beginDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}

interface WorkloadDoctorReportArgs {
  beginDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  specId?: string;
}

interface WorkloadDiagnosisReportArgs {
  beginDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  doctorId?: string;
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
         if (beginDate > endDate) {throw new Error("Error in dates")}
         return {
          url: `Reports/WorkLoadAreaReport?begin=${beginDate?.format(
            "YYYY-MM-DD"
          )}&end=${endDate?.format("YYYY-MM-DD")}`,
        };
      },
      providesTags: ["Reports"],
    }),
    makeWorkloadDoctorReport: builder.query<
      WorkloadDoctorReport[],
      WorkloadDoctorReportArgs
    >({
      query: (args) => {
        const { beginDate, endDate, specId } = args;
        if (beginDate > endDate) {throw new Error("Error in dates")}
        return {
          url: `Reports/WorkloadDoctorReport?begin=${beginDate?.format(
            "YYYY-MM-DD"
          )}&end=${endDate?.format("YYYY-MM-DD")}&specId=${specId}`,
        };
      },
      providesTags: ["Reports"],
    }),
    makeWorkloadDiagnosisReport: builder.query<
      WorkloadDiagnosisReport[],
      WorkloadDiagnosisReportArgs
    >({
      query: (args) => {
        const { beginDate, endDate, doctorId } = args;
        if (beginDate > endDate) {throw new Error("Error in dates")}
        return {
          url: `Reports/WorkloadDiagnosisReport?begin=${beginDate?.format(
            "YYYY-MM-DD"
          )}&end=${endDate?.format("YYYY-MM-DD")}&doctorId=${doctorId}`,
        };
      },
      providesTags: ["Reports"],
    }),
  }),
});
