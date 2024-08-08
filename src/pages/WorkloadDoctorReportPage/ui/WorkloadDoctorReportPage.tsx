import { useEffect, useState } from "react";
import dayjs from "dayjs";
import cls from "./WorkloadDoctorReportPage.module.scss";
import { DatePicker } from "@mui/x-date-pickers";
import { Select } from "../../../shared/ui/Select";
import { SpecializationApi } from "../../../entities/Specialization/api/SpecializationApi";
import classNames from "classnames";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ReportApi } from "../../../entities/Report/api/ReportApi";
import { WorkloadDoctorReport } from "../../../entities/Report";

export const WorkloadDoctorReportPage = () => {
  const [beginDate, setBeginDate] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs(new Date()));
  const [specId, setSpecId] = useState<string>();
  const { data: specializations } =
    SpecializationApi.useFetchAllSpecializationsQuery();
  const { data: report } = ReportApi.useMakeWorkloadDoctorReportQuery({
    beginDate,
    endDate,
    specId,
  });
  const [chartData, setChartData] = useState<WorkloadDoctorReport[]>();

  useEffect(() => {
    console.log(report);
    setChartData(
      report?.map((el) => ({
        doctor: el.doctor,
        name: el.name,
        workload: el.workload * 100,
      }))
    );
  }, [report]);

  const selectClasses = classNames("Select").split(" ");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderLable = (entry: WorkloadDoctorReport) => entry.workload + "%";

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
        <div className={cls.inputs}>
          <label>Специализация: </label>
          <Select
            data={specializations}
            selectValue={"id"}
            selectLabel={"name"}
            value={specId}
            onChange={(e) => {
              setSpecId(e);
            }}
            classes={selectClasses}
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
