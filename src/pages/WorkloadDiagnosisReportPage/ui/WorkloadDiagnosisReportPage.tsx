import cls from "./WorkloadDiagnosisReportPage.module.scss";
import { DatePicker } from "@mui/x-date-pickers";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { UserApi } from "../../../entities/User/api/UserApi";
import { ReportApi } from "../../../entities/Report/api/ReportApi";
import { WorkloadDiagnosisReport } from "../../../entities/Report";
import { ReactElement } from "react";
import { saveAs } from "file-saver";
import classNames from "classnames";
import { pdf } from "@react-pdf/renderer";
import { TableColumn } from "../../../shared/types/TableColumn";
import { Button } from "../../../shared/ui/Button";
import { PdfReport } from "../../../features/PdfReport";
import { ReportTypes } from "../../../shared/types/ReportTypes";
import { DoctorApi } from "../../../entities/Doctor/api/DoctorApi";

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
  const { data: doctors } = DoctorApi.useFetchAllDoctorsQuery();

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

  const createPdfButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "createPdfButton"
  ).split(" ");

  const handleCreatePdfButton = async (pdfDocumentComponent: ReactElement) => {
    const blob = await pdf(pdfDocumentComponent).toBlob();
    saveAs(blob, "WorkloadDiagnosisReport.pdf");
  };

  const head: TableColumn[] = [
    {
      index: "name",
      name: "Название",
    },
    {
      index: "workload",
      name: "Частота",
    },
  ];

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
                  type={ReportTypes.WorkloadDiagnosisReport}
                  doctor={doctors?.find(d => d.id === user?.doctorId)}
                  spec={doctors?.find(d => d.id === user?.doctorId)?.specialization?.name}
                />
              )
            }
            classes={createPdfButtonClasses}
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
