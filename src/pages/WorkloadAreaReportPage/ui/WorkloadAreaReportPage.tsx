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
import { ReportTypes } from "../../../shared/types/ReportTypes";
import toast from "react-hot-toast";

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

  const [beginDate, setBeginDate] = useState<dayjs.Dayjs>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs(new Date()));

  useEffect(() => {
    if (beginDate > endDate) {
      toast.error("Начальная дата, не может быть больше конечной!");
    }
  }, [beginDate, endDate]);

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
    saveAs(blob, "WorkloadAreaReport.pdf");
  };

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
                  type={ReportTypes.WorkloadAreaReport}
                />
              )
            }
            classes={createPdfButtonClasses}
            disabled={beginDate > endDate ? true : false}
          />
        </div>
        <div className={cls.chart}>
          <Chart data={chartData} />
        </div>
      </div>
    </>
  );
};
