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
import { ReactElement } from "react";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { Button } from "../../../shared/ui/Button";
import { PdfReport } from "../../../features/PdfReport";
import { TableColumn } from "../../../shared/types/TableColumn";
import { ReportTypes } from "../../../shared/types/ReportTypes";
import toast from "react-hot-toast";

export const WorkloadDoctorReportPage = () => {
  const [beginDate, setBeginDate] = useState<dayjs.Dayjs>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs(new Date()));
  const [specId, setSpecId] = useState<string>();
  const { data: specializations } =
    SpecializationApi.useFetchAllSpecializationsQuery();
  const { data: report } = ReportApi.useMakeWorkloadDoctorReportQuery({
    beginDate,
    endDate,
    specId,
  });
  const [chartData, setChartData] = useState<WorkloadDoctorReport[]>();

  const createPdfButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "createPdfButton"
  ).split(" ");

  const handleCreatePdfButton = async (pdfDocumentComponent: ReactElement) => {
    const blob = await pdf(pdfDocumentComponent).toBlob();
    saveAs(blob, "WorkloadDoctorReport.pdf");
  };

  useEffect(() => {
    setChartData(
      report?.map((el) => ({
        doctor: el.doctor,
        name: el.name,
        workload: Math.round((el.workload + Number.EPSILON) * 100 * 100) / 100,
      }))
    );
  }, [report]);

  useEffect(() => {
    if (beginDate > endDate) {
      toast.error("Начальная дата, не может быть больше конечной!");
    }
  }, [beginDate, endDate]);

  const selectClasses = classNames("Select").split(" ");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderLable = (entry: WorkloadDoctorReport) => entry.workload + "%";

  const head: TableColumn[] = [
    {
      index: "doctor.fullName",
      name: "ФИО",
    },
    {
      index: "workload",
      name: "Загруженность",
    },
  ];

  return (
    <>
      <div className={cls.page}>
        <div className={cls.inputs}>
          <label className={cls.label}>Начало: </label>
          <DatePicker
            value={beginDate}
            onChange={(newValue) =>
              setBeginDate(newValue ? newValue : dayjs(new Date()))
            }
          />
          <label className={cls.label}>Конец: </label>
          <DatePicker
            value={endDate}
            onChange={(newValue) =>
              setEndDate(newValue ? newValue : dayjs(new Date()))
            }
          />
          <Button
            children="Экспорт в PDF"
            onClick={() =>
              handleCreatePdfButton(
                <PdfReport
                  head={head}
                  data={report}
                  dates={[
                    beginDate?.format("DD-MM-YYYY"),
                    endDate?.format("DD-MM-YYYY"),
                  ]}
                  type={ReportTypes.WorkloadDoctorReport}
                  spec={
                    specializations?.find((s) => s.id.toString() === specId)
                      ?.name
                  }
                />
              )
            }
            classes={createPdfButtonClasses}
            disabled={specId && beginDate < endDate ? false : true}
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
