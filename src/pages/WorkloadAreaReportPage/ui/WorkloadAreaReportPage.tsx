import { useEffect } from "react";
import { ReportApi } from "../../../entities/Report/api/ReportApi";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs from "dayjs";
import { BarChart } from "recharts";
import { BarChartData } from "../../../shared/types/BarChartData";
import { CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import cls from "./WorkloadAreaReportPage.module.scss";

export const WorkloadAreaReportPage = () => {
  const [beginDate, setBeginDate] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs(new Date()));

  const { data: report } = ReportApi.useMakeWorkloadAreaReportQuery({
    beginDate,
    endDate,
  });

  const [chartData, setChartData] = useState<BarChartData[]>();

  useEffect(() => {
    setChartData(
      report?.map((el) => ({
        name: el.area.id.toString(),
        value: el.workload * 100,
      }))
    );
  }, [chartData, report]);

  return (
    <>
      <div className={cls.page}>
        <div className={cls.inputs}>
          <label className={cls.label}>Начало: </label>
          <DatePicker
            value={beginDate}
            onChange={(newValue) => setBeginDate(newValue)}
          />
          <label className={cls.label}>Конец: </label>
          <DatePicker
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </div>
        <div className={cls.chart}>
          <BarChart width={1030} height={630} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={"Участки"}/>
            <YAxis tickFormatter={(tick) => `${tick}%`} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </>
  );
};
