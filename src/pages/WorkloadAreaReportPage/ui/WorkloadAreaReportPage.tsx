import React, { ReactElement, useEffect } from "react";
import { ReportApi } from "../../../entities/Report/api/ReportApi";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs from "dayjs";
import { BarChart } from "recharts";
import { BarChartData } from "../../../shared/types/BarChartData";
import { CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import cls from "./WorkloadAreaReportPage.module.scss";
import { Button } from "../../../shared/ui/Button";
import classNames from "classnames";
import { pdf } from "@react-pdf/renderer";
import { PdfReport } from "../../../features/PdfReport";
import { saveAs } from "file-saver";
import { TableColumn } from "../../../shared/types/TableColumn";

interface ChartProps {
  data: BarChartData[] | undefined;
}

const Chart = (props: ChartProps) => {
  const { data } = props;

  return (
    <BarChart width={1030} height={630} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" label={"Участки"} />
      <YAxis tickFormatter={(tick) => `${tick}%`} />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export const WorkloadAreaReportPage = () => {
  const createPdfButtonClasses = classNames(
    "icon",
    "crud",
    "border-radius",
    "createPdfButton"
  ).split(" ");

  const [beginDate, setBeginDate] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs(new Date()));

  const { data: report } = ReportApi.useMakeWorkloadAreaReportQuery({
    beginDate,
    endDate,
  });

  const head: TableColumn[] = [
    {
      index: "area.id",
      name: "Участок",
    },
    {
      index: "workload",
      name: "Загруженность",
    },
  ];

  const [chartData, setChartData] = useState<BarChartData[]>();

  useEffect(() => {
    setChartData(
      report?.map((el) => ({
        name: el.area.id.toString(),
        value: Math.round((el.workload + Number.EPSILON) * 100 * 100) / 100,
      }))
    );
  }, [chartData, report]);

  const handleCreatePdfButton = async (pdfDocumentComponent: ReactElement) => {
    const blob = await pdf(pdfDocumentComponent).toBlob();
    saveAs(blob, "example.pdf");
  };

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
            children="PDF"
            onClick={() =>
              handleCreatePdfButton(<PdfReport head={head} data={report} />)
            }
            classes={createPdfButtonClasses}
          />
        </div>
        <div className={cls.chart}>
          <Chart data={chartData} />
        </div>
      </div>
    </>
  );
};
