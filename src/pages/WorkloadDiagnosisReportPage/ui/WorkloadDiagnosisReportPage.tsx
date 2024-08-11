import cls from "./WorkloadDiagnosisReportPage.module.scss";
import { DatePicker } from "@mui/x-date-pickers";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { UserApi } from "../../../entities/User/api/UserApi";
import { ReportApi } from "../../../entities/Report/api/ReportApi";
import { WorkloadDiagnosisReport } from "../../../entities/Report";

export const WorkloadDiagnosisReportPage = () => {
  const [beginDate, setBeginDate] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs(new Date()));
  const { data: user } = UserApi.useIsAuthQuery();
  const { data: report } = ReportApi.useMakeWorkloadDiagnosisReportQuery({
    beginDate,
    endDate,
    doctorId: user?.doctorId?.toString(),
  });
  const [chartData, setChartData] = useState<WorkloadDiagnosisReport[]>();

  useEffect(() => {
    setChartData(
      report?.map((el) => ({
        name: el.name,
        workload: Math.round((el.workload + Number.EPSILON) * 100 * 100) / 100,
      }))
    );
  }, [report, chartData]);

  const renderLable = (entry: WorkloadDiagnosisReport) => entry.workload + "%";

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
          <PieChart width={1030} height={600}>
            <Pie
              data={chartData}
              dataKey="workload"
              cx="50%"
              cy="50%"
              outerRadius={250}
              fill="#8884d8"
              label={renderLable}
              nameKey="name"
              style={{ cursor: "pointer", outline: "none" }}
            >
              {report?.map((el, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="top" align="right" />
          </PieChart>
        </div>
      </div>
    </>
  );
};
